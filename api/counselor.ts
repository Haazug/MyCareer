type Provider = 'groq' | 'cloudflare';
type ApiRequest = { method?: string; body?: unknown };
type ApiResponse = { status: (code: number) => ApiResponse; setHeader: (name: string, value: string) => void; json: (value: unknown) => void; end: () => void };
type Body = { provider: Provider; role: 'player-agent'|'manager-assistant'; message: string; context: unknown; consentGroq: boolean; consentCloudflare: boolean };

function object(value: unknown): Record<string, unknown> | null { return value && typeof value === 'object' && !Array.isArray(value) ? value as Record<string, unknown> : null; }
function parseBody(value: unknown): Body | null {
  try { const body = object(typeof value === 'string' ? JSON.parse(value) : value); if (!body) return null;
    if (!['groq','cloudflare'].includes(String(body.provider)) || !['player-agent','manager-assistant'].includes(String(body.role)) || typeof body.message !== 'string' || body.message.trim().length < 2 || body.message.length > 1800 || typeof body.consentGroq !== 'boolean' || typeof body.consentCloudflare !== 'boolean' || !object(body.context)) return null;
    return body as unknown as Body;
  } catch { return null; }
}
function scrub(value: unknown, depth = 0): unknown {
  if (depth > 5) return undefined;
  if (typeof value === 'string') return value.replace(/[\u0000-\u001f]/g, ' ').slice(0, 240);
  if (typeof value === 'number') return Number.isFinite(value) ? value : undefined;
  if (typeof value === 'boolean' || value === null) return value;
  if (Array.isArray(value)) return value.slice(0, 25).map(v => scrub(v, depth + 1)).filter(v => v !== undefined);
  const record = object(value); if (!record) return undefined;
  return Object.fromEntries(Object.entries(record).slice(0, 40).map(([key, child]) => [key.slice(0, 48), scrub(child, depth + 1)]).filter(([, child]) => child !== undefined));
}

function systemPrompt(role: Body['role']) {
  return role === 'player-agent'
    ? 'És o empresário de carreira no MyCareer. Responde sempre em português europeu, de forma humana, direta e ponderada. Ajuda a avaliar objetivos, forma, confiança, minutos e decisões de transferência sem tomar a decisão pelo jogador. Usa apenas os dados do save enviados e conhecimento geral; não inventes propostas, clubes interessados, valores, regras do jogo ou factos atuais. Se faltarem dados, diz isso. Dá um parecer curto, opções e um próximo passo concreto. Não peças dados pessoais.'
    : 'És o auxiliar técnico de carreira no MyCareer. Responde sempre em português europeu, com análise prática de tática, onze, banco, gestão de minutos, scout, forma e orçamento. Usa apenas os dados do save enviados e conhecimento geral; não inventes atributos, lesões, preços, notícias, propostas, regras do jogo ou factos atuais. Se faltarem dados, diz isso. Dá um parecer curto, alternativas e um próximo passo concreto. Não peças dados pessoais.';
}

async function requestWithTimeout(url: string, init: RequestInit) {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 22000);
  try { return await fetch(url, { ...init, signal: controller.signal }); } finally { clearTimeout(timer); }
}
async function callGroq(apiKey: string, role: Body['role'], message: string, context: unknown): Promise<string> {
  const response = await requestWithTimeout('https://api.groq.com/openai/v1/chat/completions', { method: 'POST', headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ model: 'openai/gpt-oss-20b', messages: [{ role: 'system', content: systemPrompt(role) }, { role: 'user', content: `Contexto resumido do save (dados não verificados): ${JSON.stringify(context)}\n\nPergunta: ${message}` }], max_completion_tokens: 650, temperature: 0.65 }) });
  if (!response.ok) throw new Error('O serviço Groq está indisponível.');
  const data = await response.json() as { choices?: Array<{ message?: { content?: string } }> };
  const text = data.choices?.[0]?.message?.content; if (!text) throw new Error('Resposta vazia da Groq.'); return String(text).slice(0, 6000);
}
async function callCloudflare(apiToken: string, accountId: string, role: Body['role'], message: string, context: unknown): Promise<string> {
  const response = await requestWithTimeout(`https://api.cloudflare.com/client/v4/accounts/${encodeURIComponent(accountId)}/ai/run/@cf/zai-org/glm-4.7-flash`, { method: 'POST', headers: { 'Authorization': `Bearer ${apiToken}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: [{ role: 'system', content: systemPrompt(role) }, { role: 'user', content: `Contexto resumido do save (dados não verificados): ${JSON.stringify(context)}\n\nPergunta: ${message}` }], max_completion_tokens: 650, temperature: 0.65, store: false }) });
  if (!response.ok) throw new Error('O serviço Cloudflare Workers AI está indisponível.');
  const data = await response.json() as { result?: { response?: string; choices?: Array<{ message?: { content?: string } }> }; choices?: Array<{ message?: { content?: string } }> };
  const text = data.result?.response ?? data.result?.choices?.[0]?.message?.content ?? data.choices?.[0]?.message?.content; if (!text) throw new Error('Resposta vazia da Cloudflare AI.'); return String(text).slice(0, 6000);
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'no-store');
  if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); return res.status(405).json({ error: 'Método não permitido.' }); }
  const body = parseBody(req.body);
  if (!body) return res.status(400).json({ error: 'Pedido inválido. Revê a pergunta e tenta novamente.' });
  if ((body.provider === 'groq' && !body.consentGroq) || (body.provider === 'cloudflare' && !body.consentCloudflare)) return res.status(403).json({ error: 'Autoriza o fornecedor escolhido antes de enviar a pergunta.' });
  const size = JSON.stringify(body.context).length;
  if (size > 9000) return res.status(413).json({ error: 'O resumo da carreira é demasiado grande para enviar.' });
  const context = scrub(body.context);
  const providers: Provider[] = [body.provider, body.provider === 'groq' ? 'cloudflare' : 'groq'];
  const errors: string[] = [];
  for (const provider of providers) {
    const consent = provider === 'groq' ? body.consentGroq : body.consentCloudflare;
    const apiKey = provider === 'groq' ? process.env.GROQ_API_KEY : process.env.CLOUDFLARE_API_TOKEN;
    const accountId = provider === 'cloudflare' ? process.env.CLOUDFLARE_ACCOUNT_ID : undefined;
    if (!consent || !apiKey || (provider === 'cloudflare' && !accountId)) continue;
    try {
      const answer = provider === 'groq' ? await callGroq(apiKey, body.role, body.message.trim(), context) : await callCloudflare(apiKey, accountId!, body.role, body.message.trim(), context);
      return res.status(200).json({ answer, provider, fallback: provider !== body.provider });
    } catch { errors.push(provider); }
  }
  const primaryKey = body.provider === 'groq' ? process.env.GROQ_API_KEY : process.env.CLOUDFLARE_API_TOKEN && process.env.CLOUDFLARE_ACCOUNT_ID;
  if (!primaryKey && !errors.length) return res.status(503).json({ error: 'Este conselheiro ainda não está ativo: falta configurar as chaves de IA no servidor Vercel.' });
  return res.status(503).json({ error: errors.length ? 'O fornecedor escolhido falhou. A reserva só é usada se também estiver configurada e autorizada.' : 'Não há um fornecedor de reserva autorizado e configurado para este pedido.' });
}

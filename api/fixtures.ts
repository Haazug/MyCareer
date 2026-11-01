type ApiRequest = { method?: string; query?: Record<string, string | string[] | undefined> };
type ApiResponse = { status: (code: number) => ApiResponse; setHeader: (name: string, value: string) => void; json: (value: unknown) => void };
type Fixture = { date: string; round?: string; team1: string; team2: string };
type Dataset = { name?: string; matches?: unknown[] };

const leagues = new Set(['de.1', 'en.1', 'en.2', 'en.3', 'en.4', 'es.1', 'fr.1', 'it.1', 'nl.1', 'pt.1']);
function queryValue(value: string | string[] | undefined) { return typeof value === 'string' ? value : ''; }
function isFixture(value: unknown): value is Fixture {
  if (!value || typeof value !== 'object') return false;
  const f = value as Record<string, unknown>;
  return typeof f.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(f.date) && typeof f.team1 === 'string' && f.team1.length <= 100 && typeof f.team2 === 'string' && f.team2.length <= 100 && (f.round === undefined || typeof f.round === 'string');
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  res.setHeader('Cache-Control', 'public, s-maxage=21600, stale-while-revalidate=86400');
  if (req.method !== 'GET') { res.setHeader('Allow', 'GET'); return res.status(405).json({ error: 'Método não permitido.' }); }
  const league = queryValue(req.query?.league); const season = queryValue(req.query?.season);
  const match = /^(20\d{2})-(\d{2})$/.exec(season);
  if (!leagues.has(league) || !match || Number(match[2]) !== (Number(match[1]) + 1) % 100) return res.status(400).json({ error: 'Liga ou época não suportada.' });
  const url = `https://raw.githubusercontent.com/openfootball/football.json/master/${season}/${league}.json`;
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(url, { signal: controller.signal, headers: { Accept: 'application/json' } });
    if (!response.ok) return res.status(502).json({ error: 'O calendário desta liga ainda não está disponível na fonte.' });
    const data = await response.json() as Dataset;
    if (typeof data.name !== 'string' || !Array.isArray(data.matches) || data.matches.length > 800) return res.status(502).json({ error: 'A fonte devolveu um calendário inválido.' });
    const matches = data.matches.filter(isFixture).map(f => ({ date: f.date, round: typeof f.round === 'string' ? f.round.slice(0, 80) : '', team1: f.team1.slice(0, 100), team2: f.team2.slice(0, 100) }));
    return res.status(200).json({ competition: data.name.slice(0, 120), source: 'OpenFootball / football.json (CC0 1.0)', matches });
  } catch {
    return res.status(502).json({ error: 'Não foi possível carregar o calendário agora. Tenta novamente mais tarde.' });
  } finally { clearTimeout(timer); }
}

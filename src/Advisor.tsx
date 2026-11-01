import { useMemo, useState } from 'react';
import { Bot, CircleHelp, LoaderCircle, Send, Sparkles, Trash2 } from 'lucide-react';
import { PageHeader, SectionTitle } from './ui';
import { balance, playerStats, stats, type Career } from './model';

type Provider = 'groq' | 'cloudflare';
type Props = { career: Career };
type Answer = { text: string; provider: Provider; fallback: boolean };

function careerContext(c: Career) {
  if (c.mode === 'player') {
    const player = c.players.find(p => p.id === c.playerId);
    const record = c.playerRecord;
    const performance = player ? playerStats(c, player.id) : null;
    return {
      role: 'player-agent', club: c.club, game: c.game, season: c.season,
      player: player && { name: player.name, position: player.position, overall: player.overall, age: player.age, nation: player.nation },
      seasonStats: performance,
      goals: (c.goals ?? []).filter(g => g.season === c.season).map(g => ({ title: g.title, status: g.status, progress: g.progress, target: g.target })),
      confidence: record?.coachConfidence,
      discipline: record && { yellowCards: record.yellowCards, redCards: record.redCards, matchesMissed: record.matchesMissed },
      recentMatches: c.matches.filter(m => m.status === 'played').slice(-5).map(m => ({ opponent: m.opponent, result: `${m.goalsFor}-${m.goalsAgainst}`, competition: m.competition }))
    };
  }
  const s = stats(c);
  return {
    role: 'manager-assistant', club: c.club, game: c.game, season: c.season,
    formation: c.formation, record: { played: s.played, wins: s.wins, draws: s.draws, losses: s.losses, goalsFor: s.goalsFor, goalsAgainst: s.goalsAgainst },
    budget: balance(c), squad: c.lineup.map(id => c.players.find(p => p.id === id)).filter(Boolean).map(p => ({ name: p!.name, position: p!.position, overall: p!.overall })),
    bench: (c.bench ?? []).slice(0, 9).map(id => c.players.find(p => p.id === id)).filter(Boolean).map(p => ({ name: p!.name, position: p!.position, overall: p!.overall })),
    prospects: (c.scouting ?? []).filter(p => p.status !== 'Descartado').slice(0, 8).map(p => ({ name: p.name, position: p.position, overall: p.overall, potential: p.potential, estimatedFee: p.estimatedFee })),
    nextMatch: c.matches.filter(m => m.status === 'scheduled').sort((a, b) => a.date.localeCompare(b.date)).slice(0, 1).map(m => ({ opponent: m.opponent, competition: m.competition, venue: m.venue })),
    recentMatches: c.matches.filter(m => m.status === 'played').slice(-5).map(m => ({ opponent: m.opponent, result: `${m.goalsFor}-${m.goalsAgainst}`, competition: m.competition }))
  };
}

export function AdvisorPage({ career }: Props) {
  const isPlayer = career.mode === 'player';
  const roleLabel = isPlayer ? (career.gender === 'female' ? 'Empresária' : 'Empresário') : (career.gender === 'female' ? 'Auxiliar técnica' : 'Auxiliar técnico');
  const [provider, setProvider] = useState<Provider>('groq');
  const [consentGroq, setConsentGroq] = useState(false);
  const [consentCloudflare, setConsentCloudflare] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<Answer | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const context = useMemo(() => careerContext(career), [career]);
  const canAsk = provider === 'groq' ? consentGroq : consentCloudflare;

  async function ask(e: React.FormEvent) {
    e.preventDefault();
    const message = question.trim();
    if (!message || !canAsk || loading) return;
    setLoading(true); setError(''); setAnswer(null);
    try {
      const response = await fetch('/api/counselor', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ provider, role: isPlayer ? 'player-agent' : 'manager-assistant', message, context, consentGroq, consentCloudflare })
      });
      const data = await response.json() as { answer?: string; provider?: Provider; fallback?: boolean; error?: string };
      if (!response.ok || !data.answer || !data.provider) throw new Error(data.error || 'Não foi possível obter uma opinião agora.');
      setAnswer({ text: data.answer, provider: data.provider, fallback: Boolean(data.fallback) });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Não foi possível contactar os conselheiros.');
    } finally { setLoading(false); }
  }

  return <>
    <PageHeader eyebrow={`${career.person} / CONSELHEIRO DE CARREIRA`} title={isPlayer ? 'Uma voz do teu lado.' : 'Pensa o próximo passo.'} description={isPlayer ? 'O teu empresário ajuda a ponderar objetivos, forma e decisões de carreira.' : 'O teu auxiliar analisa o plantel, a tática, o scout e os jogos registados.'}/>
    <div className="advisor-layout">
      <section className="panel advisor-compose">
        <div className="advisor-identity"><span className="advisor-icon"><Sparkles size={21}/></span><div><span className="eyebrow">CONSELHEIRO DE IA</span><h2>{roleLabel}</h2></div><span className="advisor-local-badge">A tua carreira continua local</span></div>
        <form onSubmit={ask}>
          <label className="advisor-label" htmlFor="advisor-question">O que queres discutir?</label>
          <textarea id="advisor-question" rows={5} maxLength={1800} required value={question} onChange={e => setQuestion(e.target.value)} placeholder={isPlayer ? 'Devo aceitar a proposta? Como posso recuperar a confiança do treinador? Qual é um objetivo realista para esta época?' : 'Que ajuste faria contra este adversário? Que posição devo reforçar? Quem pode beneficiar de mais minutos?'}/>
          <div className="advisor-form-meta"><span>{question.length}/1800 · Não guardamos esta conversa na carreira</span><label>IA principal<select value={provider} onChange={e => setProvider(e.target.value as Provider)}><option value="groq">Groq · principal</option><option value="cloudflare">Cloudflare AI · reserva</option></select></label></div>
          <div className="advisor-consents">
            <label><input type="checkbox" checked={consentGroq} onChange={e => setConsentGroq(e.target.checked)}/><span>Autorizo o envio da pergunta e do resumo desta carreira à Groq. A inferência padrão não retém os pedidos segundo a documentação do serviço.</span></label>
            <label><input type="checkbox" checked={consentCloudflare} onChange={e => setConsentCloudflare(e.target.checked)}/><span>Autorizo o envio à Cloudflare Workers AI (modelo GLM-4.7 Flash), como principal ou reserva. A Cloudflare declara não reter pedidos normais após a resposta nem usar o conteúdo para treino. <a href="https://developers.cloudflare.com/workers-ai/platform/data-usage/" target="_blank" rel="noreferrer">Ver condições</a>.</span></label>
          </div>
          <div className="advisor-submit"><button className="button primary" type="submit" disabled={!canAsk || !question.trim() || loading}>{loading?<LoaderCircle className="spin" size={16}/>:<Send size={16}/>} {loading?'A preparar opinião…':'Pedir opinião'}</button><span><CircleHelp size={14}/>A IA aconselha; tu decides.</span></div>
        </form>
        {error&&<div className="advisor-error" role="alert">{error}</div>}
        {answer&&<article className="advisor-answer" aria-live="polite"><div className="section-title"><h3><Bot size={17}/> Opinião do {answer.provider==='groq'?(isPlayer?'empresário':'auxiliar técnico'):'Cloudflare AI'}{answer.fallback?' · reserva ativada':''}</h3><button className="icon-button" aria-label="Apagar resposta" onClick={()=>setAnswer(null)}><Trash2 size={15}/></button></div><p>{answer.text}</p><small>Resposta gerada a partir dos registos atuais do save. Confirma os dados antes de tomar decisões.</small></article>}
      </section>
      <aside className="panel advisor-aside"><SectionTitle>Como funciona</SectionTitle><div className="advisor-step"><span>01</span><p>O resumo inclui só dados úteis da carreira, como OVR, estatísticas, forma, tática, plantel ou objetivos.</p></div><div className="advisor-step"><span>02</span><p>A pergunta só sai do navegador depois de marcares a autorização do fornecedor que escolheste.</p></div><div className="advisor-step"><span>03</span><p>Groq é a opção principal. Cloudflare AI pode ser escolhida como principal ou usada como reserva, se autorizares também.</p></div><div className="notice"><strong>Limites gratuitos.</strong> Ambos exigem chave privada configurada pelo dono do site no servidor e têm quotas que podem mudar. Esta versão não ativa faturação.</div><p className="micro-copy">As respostas podem errar, não consultam notícias nem dados ao vivo e não substituem o que aconteceu no teu jogo.</p></aside>
    </div>
  </>;
}

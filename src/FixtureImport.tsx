import { useMemo, useState } from 'react';
import { CalendarPlus, Check, LoaderCircle } from 'lucide-react';
import { Modal } from './ui';
import { clubs, uid, type Career, type Match } from './model';

type Fixture = { date: string; round: string; team1: string; team2: string };
type Dataset = { competition: string; matches: Fixture[]; error?: string };
type League = { id: string; label: string; domestic: string };
const leagues: League[] = [
  { id: 'pt.1', label: 'Liga Portugal', domestic: 'Portugal' }, { id: 'en.1', label: 'Premier League', domestic: 'Inglaterra' },
  { id: 'en.2', label: 'Championship', domestic: 'Inglaterra' }, { id: 'es.1', label: 'La Liga', domestic: 'Espanha' },
  { id: 'de.1', label: 'Bundesliga', domestic: 'Alemanha' }, { id: 'fr.1', label: 'Ligue 1', domestic: 'França' },
  { id: 'it.1', label: 'Serie A', domestic: 'Itália' }, { id: 'nl.1', label: 'Eredivisie', domestic: 'Países Baixos' },
  { id: 'en.3', label: 'League One', domestic: 'Inglaterra' }, { id: 'en.4', label: 'League Two', domestic: 'Inglaterra' }
];
function seasonCode(label: string) {
  const start = /20\d{2}/.exec(label)?.[0] ?? '2025';
  return `${start}-${String((Number(start) + 1) % 100).padStart(2, '0')}`;
}
function normalizeTeam(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/\b(fc|cf|afc|sc|sl|ac|club|clube|de|da|do|the)\b/g, ' ').replace(/[^a-z0-9]+/g, ' ').trim().replace(/\s+/g, ' ');
}
function sameTeam(a: string, b: string) {
  const left = normalizeTeam(a); const right = normalizeTeam(b);
  return left === right || (left.length > 4 && right.includes(left)) || (right.length > 4 && left.includes(right));
}
function dateLabel(value: string) { return new Date(`${value}T12:00:00`).toLocaleDateString('pt-PT', { day: '2-digit', month: 'short', year: 'numeric' }); }
function roundLabel(value: string) { return value.replace(/^Matchday/i, 'Jornada'); }

export function FixtureImport({ career, existing, onImport }: { career: Career; existing: Match[]; onImport: (matches: Match[]) => void }) {
  const [open, setOpen] = useState(false); const suggested = clubs.find(c => c.name === career.club)?.league;
  const [leagueId, setLeagueId] = useState(leagues.find(l => l.label === suggested)?.id ?? 'pt.1');
  const [season, setSeason] = useState(seasonCode(career.season)); const [dataset, setDataset] = useState<Dataset | null>(null);
  const [team, setTeam] = useState(''); const [selected, setSelected] = useState<string[]>([]); const [loading, setLoading] = useState(false); const [error, setError] = useState('');
  const selectedLeague = leagues.find(l => l.id === leagueId)!;
  const teams = useMemo(() => [...new Set((dataset?.matches ?? []).flatMap(f => [f.team1, f.team2]))].sort((a, b) => a.localeCompare(b)), [dataset]);
  const fixtures = useMemo(() => (dataset?.matches ?? []).filter(f => f.team1 === team || f.team2 === team).sort((a, b) => a.date.localeCompare(b.date)), [dataset, team]);
  const isSaved = (f: Fixture, selectedTeam: string) => existing.some(m => m.date === f.date && sameTeam(m.opponent, f.team1 === selectedTeam ? f.team2 : f.team1));
  const alreadySaved = (f: Fixture) => isSaved(f, team);
  function chooseTeam(value: string) {
    setTeam(value);
    setSelected((dataset?.matches ?? []).filter(f => f.team1 === value || f.team2 === value).filter(f => !isSaved(f, value)).map(f => `${f.date}|${f.team1}|${f.team2}`));
  }

  async function load() {
    setLoading(true); setError(''); setDataset(null); setTeam(''); setSelected([]);
    try {
      const response = await fetch(`/api/fixtures?league=${encodeURIComponent(leagueId)}&season=${encodeURIComponent(season)}`);
      const data = await response.json() as Dataset;
      if (!response.ok || !Array.isArray(data.matches)) throw new Error(data.error || 'Calendário indisponível.');
      setDataset(data);
      const matching = [...new Set(data.matches.flatMap(f => [f.team1, f.team2]))].find(name => sameTeam(name, career.club));
      if (matching) {
        setTeam(matching);
        setSelected(data.matches.filter(f => f.team1 === matching || f.team2 === matching).filter(f => !isSaved(f, matching)).map(f => `${f.date}|${f.team1}|${f.team2}`));
      }
    } catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível carregar o calendário.'); }
    finally { setLoading(false); }
  }
  function toggleFixture(key: string) { setSelected(current => current.includes(key) ? current.filter(x => x !== key) : [...current, key]); }
  function toggleAll() {
    const available = fixtures.filter(f => !alreadySaved(f)).map(f => `${f.date}|${f.team1}|${f.team2}`);
    setSelected(current => current.length === available.length ? [] : available);
  }
  function importSelected() {
    const matches = fixtures.filter(f => selected.includes(`${f.date}|${f.team1}|${f.team2}`) && !alreadySaved(f)).map(f => ({
      id: uid(), opponent: f.team1 === team ? f.team2 : f.team1, date: f.date, competition: dataset!.competition,
      venue: f.team1 === team ? 'home' as const : 'away' as const, status: 'scheduled' as const,
      goalsFor: 0, goalsAgainst: 0, performances: [], notes: `${roundLabel(f.round) || 'Jornada por definir'} · calendário OpenFootball CC0.`, season: career.season
    }));
    onImport(matches); setOpen(false);
  }

  return <>
    <button className="button subtle" onClick={() => setOpen(true)}><CalendarPlus size={16}/>Importar calendário</button>
    {open && <Modal title="Calendário de uma liga." subtitle="Usa os jogos reais como ponto de partida para a tua época no FC." onClose={() => setOpen(false)} wide>
      {career.gender === 'female' ? <div className="notice">A fonte OpenFootball consultada não tem cobertura feminina suficiente. Continua a adicionar estes jogos manualmente para não receberes um calendário de outra competição.</div> : <>
        <div className="notice fixture-source-note"><strong>OpenFootball · CC0 1.0.</strong> Importa só datas, jornadas e adversários; resultados reais não entram no save. O calendário de futebol real pode diferir do que aparece no teu FC.</div>
        <div className="fixture-load-fields">
          <label>Liga<select value={leagueId} onChange={e => setLeagueId(e.target.value)}>{leagues.map(l => <option key={l.id} value={l.id}>{l.label} · {l.domestic}</option>)}</select></label>
          <label>Época<input value={season} onChange={e => setSeason(e.target.value)} placeholder="2026-27" inputMode="numeric"/></label>
          <button className="button primary" type="button" onClick={load} disabled={loading || !/^20\d{2}-\d{2}$/.test(season)}>{loading ? <LoaderCircle className="spin" size={16}/> : <CalendarPlus size={16}/>}Carregar jogos</button>
        </div>
        {loading && <p className="fixture-state">A consultar o calendário público…</p>}
        {error && <p className="form-error" role="alert">{error}</p>}
        {dataset && <>
          <div className="fixture-team-select"><label>Identificar a tua equipa<select value={team} onChange={e => chooseTeam(e.target.value)}><option value="">Escolher equipa no calendário</option>{teams.map(t => <option key={t}>{t}</option>)}</select></label><span>{dataset.competition} · {dataset.matches.length} jogos na fonte</span></div>
          {team && <div className="fixture-results"><div className="fixture-results-head"><span>{fixtures.length} jogos de {team} · {fixtures.filter(alreadySaved).length} já existentes</span><button className="text-link" type="button" onClick={toggleAll}>{selected.length ? 'Limpar seleção' : 'Selecionar novos jogos'}</button></div>
            {fixtures.length ? fixtures.map(f => { const key = `${f.date}|${f.team1}|${f.team2}`; const duplicate = alreadySaved(f); return <label className={`fixture-row ${duplicate ? 'duplicate' : ''}`} key={key}><input type="checkbox" disabled={duplicate} checked={duplicate || selected.includes(key)} onChange={() => toggleFixture(key)}/><span className="fixture-date">{dateLabel(f.date)}</span><strong>{f.team1 === team ? f.team2 : f.team1}</strong><span>{f.team1 === team ? 'Casa' : 'Fora'}</span><small>{roundLabel(f.round)}</small>{duplicate && <Check size={14}/>}</label>; }) : <div className="notice">Sem jogos para esta equipa na época selecionada. Confirma a competição e a época.</div>}
          </div>}
        </>}
        <div className="fixture-import-footer"><a href="https://github.com/openfootball/football.json" target="_blank" rel="noreferrer">Ver OpenFootball e a licença CC0</a>{team && <button className="button primary" type="button" onClick={importSelected} disabled={!selected.length}><CalendarPlus size={16}/>Adicionar {selected.length} jogos</button>}</div>
      </>}
    </Modal>}
  </>;
}

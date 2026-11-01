export type Mode = 'manager' | 'player';
export type Gender = 'male' | 'female';
export type Player = { id: string; name: string; number: number; position: string; overall: number; age: number; nation: string; salary: number; contract: string; active?: boolean };
export type Performance = { playerId: string; goals: number; assists: number; minutes: number; rating: number };
export type Match = { id: string; opponent: string; date: string; competition: string; venue: 'home' | 'away'; status: 'scheduled' | 'played'; goalsFor: number; goalsAgainst: number; performances: Performance[]; notes: string };
export type Transaction = { id: string; label: string; amount: number; date: string; category: string };
export type Transfer = { id: string; player: string; club: string; direction: 'in' | 'out'; fee: number; date: string; position: string };
export type Trophy = { id: string; name: string; season: string; kind: 'team' | 'individual' };
export type Note = { id: string; title: string; body: string; date: string };
export type Career = { id: string; name: string; mode: Mode; gender: Gender; game: string; season: string; person: string; club: string; color: string; created: boolean; playerId: string; players: Player[]; matches: Match[]; transactions: Transaction[]; transfers: Transfer[]; trophies: Trophy[]; notes: Note[]; formation: string; lineup: string[]; budget: number; demo: boolean };
export type Store = { version: 1; activeId: string; careers: Career[] };
export const STORAGE_KEY = 'touchline-career-v1';
export const uid = () => crypto.randomUUID();
export const today = () => new Date().toISOString().slice(0, 10);
export const money = (amount: number) => new Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(amount);
export const compactMoney = (amount: number) => Math.abs(amount) >= 1e6 ? `${(amount / 1e6).toLocaleString('pt-PT', { maximumFractionDigits: 1 })} M€` : money(amount);
export const shortDate = (date: string) => new Date(date + 'T12:00:00').toLocaleDateString('pt-PT', { day: '2-digit', month: 'short' });
export const clubInitials = (club: string) => club.replace(/\b(SL|FC|CF|SC|de|da|do)\b/gi, '').trim().split(/\s+/).slice(0, 3).map(n => n[0]).join('').toUpperCase() || 'FC';
export const clubs = [
  { name: 'SL Benfica', country: 'Portugal', league: 'Liga Portugal', color: '#df302e' },
  { name: 'Sporting CP', country: 'Portugal', league: 'Liga Portugal', color: '#25936a' },
  { name: 'FC Porto', country: 'Portugal', league: 'Liga Portugal', color: '#3176d1' },
  { name: 'Real Madrid', country: 'Espanha', league: 'La Liga', color: '#d6c99e' },
  { name: 'FC Barcelona', country: 'Espanha', league: 'La Liga', color: '#9f3658' },
  { name: 'Arsenal', country: 'Inglaterra', league: 'Premier League', color: '#d33b38' },
  { name: 'Manchester United', country: 'Inglaterra', league: 'Premier League', color: '#bf342e' },
  { name: 'Paris Saint-Germain', country: 'França', league: 'Ligue 1', color: '#3c5a92' },
];
export const positions = ['GR', 'DD', 'DC', 'DE', 'MDC', 'MC', 'MCO', 'MD', 'ME', 'ED', 'EE', 'PL'];
export const formations: Record<string, { position: string; x: number; y: number }[]> = {
  '4-3-3': [{position:'GR',x:50,y:88},{position:'DE',x:15,y:69},{position:'DC',x:38,y:72},{position:'DC',x:62,y:72},{position:'DD',x:85,y:69},{position:'MC',x:25,y:48},{position:'MDC',x:50,y:54},{position:'MC',x:75,y:48},{position:'EE',x:19,y:23},{position:'PL',x:50,y:17},{position:'ED',x:81,y:23}],
  '4-2-3-1': [{position:'GR',x:50,y:88},{position:'DE',x:15,y:70},{position:'DC',x:38,y:73},{position:'DC',x:62,y:73},{position:'DD',x:85,y:70},{position:'MDC',x:35,y:53},{position:'MDC',x:65,y:53},{position:'ME',x:17,y:33},{position:'MCO',x:50,y:35},{position:'MD',x:83,y:33},{position:'PL',x:50,y:15}],
  '4-4-2': [{position:'GR',x:50,y:88},{position:'DE',x:15,y:70},{position:'DC',x:38,y:73},{position:'DC',x:62,y:73},{position:'DD',x:85,y:70},{position:'ME',x:15,y:45},{position:'MC',x:38,y:49},{position:'MC',x:62,y:49},{position:'MD',x:85,y:45},{position:'PL',x:35,y:20},{position:'PL',x:65,y:20}],
};
export function seedPlayers(gender: Gender, club: string): Player[] {
  const male = ['Anatoliy Trubin','Samuel Dahl','Nicolás Otamendi','Tomás Araújo','Amar Dedić','Fredrik Aursnes','Florentino Luís','Leandro Barreiro','Kerem Aktürkoğlu','Vangelis Pavlidis','Andreas Schjelderup','Samuel Soares','António Silva','Renato Sanches','Bruma','Gianluca Prestianni','Henrique Araújo','João Rego'];
  const female = ['Lena Pauels','Lucia Alves','Carole Costa','Christy Ucheibe','Catarina Amado','Andreia Faria','Pauleta','Kika Nazareth','Jéssica Silva','Marie-Yasmine Alidou','Nycole Raysla','Rute Costa','Ana Seiça','Anna Gasper','Lara Martins','Andrea Falcón','Beatriz Cameirão','Cristina Martín-Prieto'];
  const slots = ['GR','DE','DC','DC','DD','MC','MDC','MC','EE','PL','ED','GR','DC','MC','EE','MCO','PL','MCO'];
  const numbers = [1,26,30,44,17,8,61,18,7,14,21,24,4,85,27,25,39,84];
  return (club === 'SL Benfica' ? gender === 'male' ? male : female : slots.map((_, i) => `${gender === 'male' ? 'Jogador' : 'Jogadora'} ${i + 1}`)).map((name,i) => ({ id: uid(), name, position: slots[i], number: numbers[i], overall: 75 + (i % 9), age: 21 + (i % 13), nation: 'Portugal', salary: 0, contract: '2027-06-30' }));
}
export function createCareer(input: Pick<Career, 'name'|'mode'|'gender'|'game'|'season'|'person'|'club'|'color'|'created'> & { position?: string; number?: number }): Career {
  const players = seedPlayers(input.gender, input.club);
  let playerId = '';
  if (input.mode === 'player') {
    const existing = !input.created && players.find(p => p.name === input.person);
    if (existing) playerId = existing.id;
    else { const player = { id: uid(), name: input.person, number: input.number ?? 10, position: input.position ?? 'MC', overall: 70, age: 18, nation: 'Portugal', salary: 0, contract: '2027-06-30' }; players.push(player); playerId = player.id; }
  }
  return { ...input, id: uid(), playerId, players, matches: [], transactions: [], transfers: [], trophies: [], notes: [], formation: '4-3-3', lineup: players.slice(0,11).map(p => p.id), budget: 0, demo: false };
}
export function demoCareer(): Career {
  const c = createCareer({ name:'Uma nova era',mode:'manager',gender:'male',game:'FC 26',season:'2026/27',person:'O meu treinador',club:'SL Benfica',color:'#df302e',created:true });
  c.demo = true; c.budget = 35000000;
  const opponents = ['SC Braga','FC Porto','Rio Ave','Sporting CP','Vitória SC'];
  const scores = [[3,1],[1,1],[2,0],[2,1],[0,1]];
  c.matches = opponents.map((opponent,i) => ({ id:uid(),opponent,date:`2026-10-${String(3+i*5).padStart(2,'0')}`,competition:'Liga Portugal',venue:i%2?'away':'home',status:'played',goalsFor:scores[i][0],goalsAgainst:scores[i][1],performances:[{playerId:c.players[9].id,goals:Math.min(1,scores[i][0]),assists:0,minutes:90,rating:7+i/10}],notes:'' }));
  c.matches.push({id:uid(),opponent:'FC Arouca',date:'2026-11-08',competition:'Liga Portugal',venue:'home',status:'scheduled',goalsFor:0,goalsAgainst:0,performances:[],notes:''});
  c.notes = [{id:uid(),title:'Construir o futuro',body:'Dar minutos aos jovens e manter a identidade da equipa. Cada jogo conta.',date:today()}];
  c.trophies = [{id:uid(),name:'Supertaça',season:'2026/27',kind:'team'}];
  return c;
}
export function matchResult(m: Match) { return m.goalsFor > m.goalsAgainst ? 'V' : m.goalsFor < m.goalsAgainst ? 'D' : 'E'; }
export function stats(c: Career) {
  const games = c.matches.filter(m => m.status === 'played');
  return { played:games.length,wins:games.filter(m=>matchResult(m)==='V').length,draws:games.filter(m=>matchResult(m)==='E').length,losses:games.filter(m=>matchResult(m)==='D').length,goalsFor:games.reduce((a,m)=>a+m.goalsFor,0),goalsAgainst:games.reduce((a,m)=>a+m.goalsAgainst,0),points:games.reduce((a,m)=>a+(matchResult(m)==='V'?3:matchResult(m)==='E'?1:0),0) };
}
export function playerStats(c: Career, playerId: string) {
  const performances = c.matches.filter(m=>m.status==='played').flatMap(m=>m.performances.filter(p=>p.playerId===playerId));
  const rated = performances.filter(p=>p.rating>0);
  return { played:performances.filter(p=>p.minutes>0).length,goals:performances.reduce((a,p)=>a+p.goals,0),assists:performances.reduce((a,p)=>a+p.assists,0),minutes:performances.reduce((a,p)=>a+p.minutes,0),rating:rated.length?rated.reduce((a,p)=>a+p.rating,0)/rated.length:0 };
}
export function balance(c: Career) { return c.budget+c.transactions.reduce((a,t)=>a+t.amount,0); }
export function assignSlot(lineup: string[], index: number, id: string) {
  const next=[...lineup]; const previous=next.indexOf(id); const old=next[index]; next[index]=id;
  if(id && previous!==-1 && previous!==index) next[previous]=old;
  return next;
}
function finite(value: unknown, min=0, max=1e12): value is number { return typeof value==='number' && Number.isFinite(value) && value>=min && value<=max; }
function string(value: unknown): value is string { return typeof value==='string' && value.length<=20000; }
function date(value: unknown): value is string { return string(value) && /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value)); }
export function parseStore(raw: string): Store {
  const data=JSON.parse(raw) as Store;
  if(data?.version!==1 || !Array.isArray(data.careers) || data.careers.length>100 || !string(data.activeId)) throw new Error('Formato de cópia de segurança inválido.');
  const ids = new Set<string>();
  for(const c of data.careers) {
    if(!c || !['id','name','game','season','person','club','playerId'].every(k=>string(c[k as keyof Career])) || !/^#[\da-f]{6}$/i.test(c.color) || !['player','manager'].includes(c.mode) || !['male','female'].includes(c.gender) || typeof c.created!=='boolean' || typeof c.demo!=='boolean' || !finite(c.budget) || !formations[c.formation] || !Array.isArray(c.lineup) || c.lineup.length!==11 || !c.lineup.every(string) || ids.has(c.id)) throw new Error('A carreira contém dados inválidos.');
    ids.add(c.id);
    if(!Array.isArray(c.players) || c.players.length>1000 || !c.players.every(p=>p && ['id','name','position','nation'].every(k=>string(p[k as keyof Player])) && positions.includes(p.position) && finite(p.number,1,99) && Number.isInteger(p.number) && finite(p.overall,1,99) && finite(p.age,14,99) && finite(p.salary) && date(p.contract))) throw new Error('Plantel inválido.');
    const pids = new Set(c.players.map(p=>p.id));
    if(pids.size!==c.players.length || c.lineup.some(id=>id && !pids.has(id)) || new Set(c.lineup.filter(Boolean)).size!==c.lineup.filter(Boolean).length || (c.mode==='player' && !pids.has(c.playerId))) throw new Error('Referências do plantel inválidas.');
    if(!Array.isArray(c.matches) || c.matches.length>10000 || !c.matches.every(m=>m && ['id','opponent','competition','notes'].every(k=>string(m[k as keyof Match])) && date(m.date) && ['scheduled','played'].includes(m.status) && ['home','away'].includes(m.venue) && finite(m.goalsFor,0,99) && Number.isInteger(m.goalsFor) && finite(m.goalsAgainst,0,99) && Number.isInteger(m.goalsAgainst) && Array.isArray(m.performances) && new Set(m.performances.map(p=>p.playerId)).size===m.performances.length && m.performances.every(p=>pids.has(p.playerId) && finite(p.goals,0,99) && finite(p.assists,0,99) && finite(p.minutes,0,130) && finite(p.rating,0,10)) && m.performances.reduce((a,p)=>a+p.goals,0)<=m.goalsFor && m.performances.reduce((a,p)=>a+p.assists,0)<=m.goalsFor)) throw new Error('Registos de jogos inválidos.');
    if(!Array.isArray(c.transactions) || !c.transactions.every(t=>t && string(t.id) && string(t.label) && string(t.category) && date(t.date) && finite(t.amount,-1e12))) throw new Error('Movimentos financeiros inválidos.');
    if(!Array.isArray(c.transfers) || !c.transfers.every(t=>t && string(t.id) && string(t.player) && string(t.club) && positions.includes(t.position) && ['in','out'].includes(t.direction) && finite(t.fee) && date(t.date))) throw new Error('Transferências inválidas.');
    if(!Array.isArray(c.notes) || !c.notes.every(n=>n && string(n.id) && string(n.title) && string(n.body) && date(n.date))) throw new Error('Notas inválidas.');
    if(!Array.isArray(c.trophies) || !c.trophies.every(t=>t && string(t.id) && string(t.name) && string(t.season) && ['team','individual'].includes(t.kind))) throw new Error('Troféus inválidos.');
  }
  if(data.activeId && !ids.has(data.activeId)) throw new Error('Carreira ativa não encontrada.');
  return data;
}

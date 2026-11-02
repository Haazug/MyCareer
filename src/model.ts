export type Mode = 'manager' | 'player';
export type Gender = 'male' | 'female';
export type Player = { id: string; name: string; number: number; position: string; overall: number; age: number; nation: string; salary: number; contract: string; potential?: number; marketValue?: number; attributes?: Record<string, number>; portraitDataUrl?: string; portraitUrl?: string; portraitAttribution?: AssetCredit; active?: boolean; loanedFrom?: string; loanedTo?: string; loanUntil?: string };
export type Performance = { playerId: string; goals: number; assists: number; minutes: number; rating: number };
export type Match = { id: string; opponent: string; date: string; competition: string; venue: 'home' | 'away'; status: 'scheduled' | 'played'; goalsFor: number; goalsAgainst: number; performances: Performance[]; notes: string; season?: string; watchSeconds?: number };
export type Transaction = { id: string; label: string; amount: number; date: string; category: string; status?: 'paid'|'scheduled' };
export type Transfer = { id: string; player: string; club: string; direction: 'in' | 'out'; fee: number; date: string; position: string; operation?: 'permanent'|'free'|'loan'; installments?: number; loanUntil?: string; loanOption?: number };
export type Trophy = { id: string; name: string; season: string; kind: 'team' | 'individual' };
export type Note = { id: string; title: string; body: string; date: string };
export type PlayerSeasonSummary = { playerId: string; played: number; goals: number; assists: number; minutes: number; rating: number };
export type SeasonArchive = { season: string; closedAt: string; played: number; wins: number; draws: number; losses: number; goalsFor: number; goalsAgainst: number; points: number; players?: PlayerSeasonSummary[] };
export type SquadPlan = { id: string; name: string; formation: string; lineup: string[]; bench?: string[] };
export type ScoutReport = { id: string; name: string; club: string; position: string; age: number; overall: number; estimatedFee: number | null; estimateNote: string; folder: string; status: string; potential: string; notes: string; date: string };
export type AcademyProspect = { id: string; name: string; position: string; age: number; overall: number; potential: string; nation: string; appearances: number; goals: number; assists: number; status: string; notes: string };
export type CareerGoal = { id: string; title: string; kind: 'personal'|'club-target'; target: number; progress: number; season: string; status: string; notes: string };
export type PlayerInjury = { id: string; name: string; startDate: string; returnDate: string; matchesMissed: number; status: string };
export type PlayerCareerRecord = { yellowCards: number; redCards: number; matchesMissed: number; coachConfidence: number; injuries: PlayerInjury[] };
export type MuseumItem = { id: string; kind: 'shirt'|'scarf'|'ball'|'award'|'phrase'; title: string; club: string; season: string; number: number; color: string; detail: string; match: string };
export type CatalogCredit = { title: string; author: string; url: string; license: string; licenseUrl: string };
export type AssetCredit = { author: string; sourceUrl: string; fileUrl: string; license: string; licenseUrl: string };
export type LockerStyle = { wallColor:string; accentColor:string; ceilingColor:string; lightColor:string; lighting:number; symbol:string; motto:string };
export const DEFAULT_LOCKER_STYLE:LockerStyle={wallColor:'#242424',accentColor:'#c8bda9',ceilingColor:'#e6e1d7',lightColor:'#fff0d2',lighting:68,symbol:'MC',motto:'A TUA HISTÓRIA COMEÇA AQUI'};
export type CareerChallenge = { title: string; description: string; duration: 'short'|'long'; transferBan: boolean };
export type Career = { id: string; name: string; mode: Mode; gender: Gender; game: string; season: string; challenge?: CareerChallenge; seasons?: SeasonArchive[]; squadPlans?: SquadPlan[]; bench?:string[]; lockerStyle?:LockerStyle; scouting?: ScoutReport[]; academy?:AcademyProspect[]; goals?:CareerGoal[]; playerRecord?:PlayerCareerRecord; playerMuseum?:MuseumItem[]; crestDataUrl?:string; crestAttribution?:AssetCredit; catalogCredit?:CatalogCredit; catalogCredits?:CatalogCredit[]; person:string; club:string; color:string; created:boolean; playerId:string; players:Player[]; matches:Match[]; transactions:Transaction[]; transfers:Transfer[]; trophies:Trophy[]; notes:Note[]; formation:string; lineup:string[]; budget:number; demo:boolean };
export type Store = { version: 1; activeId: string; careers: Career[] };
export const STORAGE_KEY = 'touchline-career-v1';
export const uid = () => crypto.randomUUID();
export const today = () => new Date().toISOString().slice(0, 10);
export function isAvailable(player:Player) { const now=today(); if(player.active===false)return false;if(player.loanedTo&&(!player.loanUntil||now<=player.loanUntil))return false;if(player.loanedFrom&&player.loanUntil&&now>player.loanUntil)return false;return true; }
export function isTransferAllowed(career:Pick<Career,'challenge'>,direction:Transfer['direction']) { return !(direction==='in'&&career.challenge?.transferBan); }
export function splitPayment(total:number,count:number,startDate:string) {const cents=Math.round(total*100);const base=Math.floor(cents/count);let remainder=cents-base*count;const [year,month,day]=startDate.split('-').map(Number);return Array.from({length:count},(_,i)=>{const monthIndex=month-1+i;const y=year+Math.floor(monthIndex/12);const m=monthIndex%12;const maxDay=new Date(y,m+1,0).getDate();const d=Math.min(day,maxDay);const amount=(base+(remainder-->0?1:0))/100;return {date:`${y}-${String(m+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`,amount};});}
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
export function createCareer(input: Pick<Career, 'name'|'mode'|'gender'|'game'|'season'|'person'|'club'|'color'|'created'> & { position?: string; number?: number; challenge?:CareerChallenge; initialPlayers?:Player[]; catalogCredit?:CatalogCredit; catalogCredits?:CatalogCredit[]; crestDataUrl?:string; crestAttribution?:AssetCredit }): Career {
  const { initialPlayers, ...careerInput } = input;
  const players = initialPlayers?.length ? initialPlayers : seedPlayers(input.gender, input.club);
  let playerId = '';
  if (input.mode === 'player') {
    const existing = !input.created && players.find(p => p.name === input.person);
    if (existing) playerId = existing.id;
    else { const player = { id: uid(), name: input.person, number: input.number ?? 10, position: input.position ?? 'MC', overall: 70, age: 18, nation: 'Portugal', salary: 0, contract: '2027-06-30' }; players.push(player); playerId = player.id; }
  }
  const { catalogCredit, catalogCredits, ...remainingInput } = careerInput;
  return { ...remainingInput, ...(catalogCredit?{catalogCredit}:{}), ...(catalogCredits?.length?{catalogCredits}:{}), id: uid(), playerId, players, matches: [], seasons: [], squadPlans: [], bench:players.slice(11).map(p=>p.id), lockerStyle:{...DEFAULT_LOCKER_STYLE}, scouting: [], academy: [], goals: [], playerMuseum: [], ...(input.mode==='player'?{playerRecord:{yellowCards:0,redCards:0,matchesMissed:0,coachConfidence:50,injuries:[]}}:{}), transactions: [], transfers: [], trophies: [], notes: [], formation: '4-3-3', lineup: players.slice(0,11).map(p => p.id), budget: 0, demo: false };
}
export function demoCareer(): Career {
  const c = createCareer({ name:'Uma nova era',mode:'manager',gender:'male',game:'FC 26',season:'2025/26',person:'O meu treinador',club:'SL Benfica',color:'#df302e',created:true });
  c.demo = true; c.budget = 35000000;
  const opponents = ['SC Braga','FC Porto','Rio Ave','Sporting CP','Vitória SC'];
  const scores = [[3,1],[1,1],[2,0],[2,1],[0,1]];
  c.matches = opponents.map((opponent,i) => ({ id:uid(),opponent,date:`2025-10-${String(3+i*5).padStart(2,'0')}`,competition:'Liga Portugal',venue:i%2?'away':'home',status:'played',goalsFor:scores[i][0],goalsAgainst:scores[i][1],performances:[{playerId:c.players[9].id,goals:Math.min(1,scores[i][0]),assists:0,minutes:90,rating:7+i/10}],notes:'' }));
  c.matches.push({id:uid(),opponent:'FC Arouca',date:'2025-11-08',competition:'Liga Portugal',venue:'home',status:'scheduled',goalsFor:0,goalsAgainst:0,performances:[],notes:''});
  c.notes = [{id:uid(),title:'Construir o futuro',body:'Dar minutos aos jovens e manter a identidade da equipa. Cada jogo conta.',date:today()}];
  c.trophies = [{id:uid(),name:'Supertaça',season:'2025/26',kind:'team'}];
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
export function balance(c: Career) { return c.budget+c.transactions.filter(t=>t.date<=today()&&(t.status!=='scheduled'||t.date<=today())).reduce((a,t)=>a+t.amount,0); }
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
    if(c.catalogCredit!==undefined&&(!c.catalogCredit||!['title','author','url','license','licenseUrl'].every(k=>string(c.catalogCredit?.[k as keyof CatalogCredit])))) throw new Error('Crédito do catálogo inválido.');
    if(c.catalogCredits!==undefined&&(!Array.isArray(c.catalogCredits)||c.catalogCredits.some(credit=>!credit||!['title','author','url','license','licenseUrl'].every(k=>string(credit[k as keyof CatalogCredit]))))) throw new Error('Créditos dos catálogos inválidos.');
    if(c.crestAttribution!==undefined&&(!c.crestAttribution||!['author','sourceUrl','fileUrl','license','licenseUrl'].every(k=>string(c.crestAttribution?.[k as keyof AssetCredit])))) throw new Error('Crédito do emblema inválido.');
    if(!Array.isArray(c.players) || c.players.length>1000 || !c.players.every(p=>p && ['id','name','position','nation'].every(k=>string(p[k as keyof Player])) && (p.portraitDataUrl===undefined||typeof p.portraitDataUrl==='string'&&p.portraitDataUrl.length<=180000&&p.portraitDataUrl.startsWith('data:image/')) && (p.portraitUrl===undefined||typeof p.portraitUrl==='string'&&p.portraitUrl.startsWith('https://upload.wikimedia.org/')) && (p.portraitAttribution===undefined||p.portraitAttribution&&['author','sourceUrl','fileUrl','license','licenseUrl'].every(k=>string(p.portraitAttribution?.[k as keyof AssetCredit]))) && (p.potential===undefined||finite(p.potential,1,99)) && (p.marketValue===undefined||finite(p.marketValue)) && (p.attributes===undefined||p.attributes!==null&&typeof p.attributes==='object'&&!Array.isArray(p.attributes)&&Object.values(p.attributes).every(v=>finite(v,0,99))) && (p.loanUntil===undefined||date(p.loanUntil)) && (p.loanedFrom===undefined||string(p.loanedFrom)) && (p.loanedTo===undefined||string(p.loanedTo)) && positions.includes(p.position) && finite(p.number,1,99) && Number.isInteger(p.number) && finite(p.overall,1,99) && finite(p.age,14,99) && finite(p.salary) && date(p.contract))) throw new Error('Plantel inválido.');
    const pids = new Set(c.players.map(p=>p.id));
    if(pids.size!==c.players.length || c.lineup.some(id=>id && !pids.has(id)) || new Set(c.lineup.filter(Boolean)).size!==c.lineup.filter(Boolean).length || (c.mode==='player' && !pids.has(c.playerId))) throw new Error('Referências do plantel inválidas.');
    if(!Array.isArray(c.matches) || c.matches.length>10000 || !c.matches.every(m=>m && ['id','opponent','competition','notes'].every(k=>string(m[k as keyof Match])) && (m.season===undefined||string(m.season)) && date(m.date) && ['scheduled','played'].includes(m.status) && ['home','away'].includes(m.venue) && finite(m.goalsFor,0,99) && Number.isInteger(m.goalsFor) && finite(m.goalsAgainst,0,99) && Number.isInteger(m.goalsAgainst) && (m.watchSeconds===undefined||finite(m.watchSeconds,0,14400)) && Array.isArray(m.performances) && new Set(m.performances.map(p=>p.playerId)).size===m.performances.length && m.performances.every(p=>pids.has(p.playerId) && finite(p.goals,0,99) && finite(p.assists,0,99) && finite(p.minutes,0,130) && finite(p.rating,0,10)) && m.performances.reduce((a,p)=>a+p.goals,0)<=m.goalsFor && m.performances.reduce((a,p)=>a+p.assists,0)<=m.goalsFor)) throw new Error('Registos de jogos inválidos.');
    if(!Array.isArray(c.transactions) || !c.transactions.every(t=>t && string(t.id) && string(t.label) && string(t.category) && date(t.date) && finite(t.amount,-1e12) && (t.status===undefined||['paid','scheduled'].includes(t.status)))) throw new Error('Movimentos financeiros inválidos.');
    if(!Array.isArray(c.transfers) || !c.transfers.every(t=>t && string(t.id) && string(t.player) && string(t.club) && positions.includes(t.position) && ['in','out'].includes(t.direction) && finite(t.fee) && date(t.date) && (t.operation===undefined||['permanent','free','loan'].includes(t.operation)) && (t.installments===undefined||finite(t.installments,1,60)&&Number.isInteger(t.installments)) && (t.loanUntil===undefined||date(t.loanUntil)) && (t.loanOption===undefined||finite(t.loanOption)))) throw new Error('Transferências inválidas.');
    if(!Array.isArray(c.notes) || !c.notes.every(n=>n && string(n.id) && string(n.title) && string(n.body) && date(n.date))) throw new Error('Notas inválidas.');
    if(!Array.isArray(c.trophies) || !c.trophies.every(t=>t && string(t.id) && string(t.name) && string(t.season) && ['team','individual'].includes(t.kind))) throw new Error('Troféus inválidos.');
    if(c.seasons!==undefined&&(!Array.isArray(c.seasons)||c.seasons.length>15||!c.seasons.every(s=>s&&string(s.season)&&date(s.closedAt)&&['played','wins','draws','losses','goalsFor','goalsAgainst','points'].every(k=>finite(s[k as keyof SeasonArchive]))&&(s.players===undefined||Array.isArray(s.players)&&s.players.every(p=>pids.has(p.playerId)&&['played','goals','assists','minutes','rating'].every(k=>finite(p[k as keyof PlayerSeasonSummary]))))))) throw new Error('Arquivo de épocas inválido.');
    if(c.lockerStyle!==undefined&&(!c.lockerStyle||!['wallColor','accentColor','ceilingColor','lightColor'].every(k=>/^#[\da-f]{6}$/i.test(String((c.lockerStyle as LockerStyle)[k as keyof LockerStyle])))||!finite(c.lockerStyle.lighting,20,100)||!string(c.lockerStyle.symbol)||c.lockerStyle.symbol.length>20||!string(c.lockerStyle.motto)||c.lockerStyle.motto.length>80)) throw new Error('Personalização do balneário inválida.');
    if(c.bench!==undefined&&(!Array.isArray(c.bench)||!c.bench.every(id=>string(id)&&pids.has(id))||new Set(c.bench).size!==c.bench.length||c.bench.some(id=>c.lineup.includes(id)))) throw new Error('Banco de suplentes inválido.');
    if(c.squadPlans!==undefined&&(!Array.isArray(c.squadPlans)||c.squadPlans.length>30||!c.squadPlans.every(p=>p&&string(p.id)&&string(p.name)&&formations[p.formation]&&Array.isArray(p.lineup)&&p.lineup.length===11&&p.lineup.every(id=>string(id)&&(!id||pids.has(id)))&&(p.bench===undefined||Array.isArray(p.bench)&&p.bench.every(id=>string(id)&&pids.has(id))&&new Set(p.bench).size===p.bench.length&&!p.bench.some(id=>p.lineup.includes(id)))))) throw new Error('Planos táticos inválidos.');
    if(c.scouting!==undefined&&(!Array.isArray(c.scouting)||c.scouting.length>3000||!c.scouting.every(p=>p&&['id','name','club','position','estimateNote','folder','status','potential','notes'].every(k=>string(p[k as keyof ScoutReport]))&&date(p.date)&&positions.includes(p.position)&&finite(p.age,14,99)&&finite(p.overall,1,99)&&(p.estimatedFee===null||finite(p.estimatedFee))))) throw new Error('Relatórios de observação inválidos.');
    if(c.academy!==undefined&&(!Array.isArray(c.academy)||c.academy.length>1000||!c.academy.every(p=>p&&['id','name','position','potential','nation','status','notes'].every(k=>string(p[k as keyof AcademyProspect]))&&positions.includes(p.position)&&finite(p.age,14,23)&&finite(p.overall,1,99)&&['appearances','goals','assists'].every(k=>finite(p[k as keyof AcademyProspect]))))) throw new Error('Registos da academia inválidos.');
    if(c.goals!==undefined&&(!Array.isArray(c.goals)||c.goals.length>300||!c.goals.every(g=>g&&['id','title','season','status','notes'].every(k=>string(g[k as keyof CareerGoal]))&&['personal','club-target'].includes(g.kind)&&finite(g.target)&&finite(g.progress)))) throw new Error('Objetivos de carreira inválidos.');
    if(c.playerRecord!==undefined&&(!c.playerRecord||!finite(c.playerRecord.yellowCards,0,999)||!finite(c.playerRecord.redCards,0,999)||!finite(c.playerRecord.matchesMissed,0,9999)||!finite(c.playerRecord.coachConfidence,0,100)||!Array.isArray(c.playerRecord.injuries)||!c.playerRecord.injuries.every(i=>i&&string(i.id)&&string(i.name)&&string(i.status)&&date(i.startDate)&&date(i.returnDate)&&finite(i.matchesMissed,0,999)))) throw new Error('Registo da carreira de jogador inválido.');
    if(c.playerMuseum!==undefined&&(!Array.isArray(c.playerMuseum)||c.playerMuseum.length>1000||!c.playerMuseum.every(i=>i&&string(i.id)&&string(i.title)&&string(i.club)&&string(i.season)&&string(i.detail)&&string(i.match)&&/^#[\da-f]{6}$/i.test(i.color)&&finite(i.number,0,99)&&['shirt','scarf','ball','award','phrase'].includes(i.kind)))) throw new Error('Peças do museu inválidas.');
    if(c.challenge!==undefined&&(!c.challenge||!string(c.challenge.title)||!string(c.challenge.description)||!['short','long'].includes(c.challenge.duration)||typeof c.challenge.transferBan!=='boolean')) throw new Error('Desafio de carreira inválido.');
    if(c.crestDataUrl!==undefined&&c.crestDataUrl!==''&&(typeof c.crestDataUrl!=='string'||c.crestDataUrl.length>140000||!/^data:image\/webp;base64,[A-Za-z0-9+/]+=*$/.test(c.crestDataUrl))) throw new Error('Imagem de emblema inválida. Usa uma imagem pequena em formato suportado.');
  }
  if(data.activeId && !ids.has(data.activeId)) throw new Error('Carreira ativa não encontrada.');
  return { ...data, careers: data.careers.map(c => { const bench=c.bench??c.players.filter(p=>isAvailable(p)&&!c.lineup.includes(p.id)).map(p=>p.id); return { ...c, lockerStyle:c.lockerStyle??{...DEFAULT_LOCKER_STYLE}, bench, seasons: c.seasons ?? [], squadPlans:(c.squadPlans??[]).map(p=>({...p,bench:p.bench??c.players.filter(x=>isAvailable(x)&&!p.lineup.includes(x.id)).map(x=>x.id)})), scouting:c.scouting??[], academy:c.academy??[], goals:c.goals??[], playerMuseum:c.playerMuseum??[], ...(c.mode==='player'?{playerRecord:c.playerRecord??{yellowCards:0,redCards:0,matchesMissed:0,coachConfidence:50,injuries:[]}}:{}), matches: c.matches.map(m => ({ ...m, season: m.season ?? c.season })) }; }) };
}

export function seasonLabel(game: string, season: string, language: 'pt'|'en'|'fr'|'es'|'it' = 'pt') {
  const labels={pt:'Época',en:'Season',fr:'Saison',es:'Temporada',it:'Stagione'};
  return `${labels[language]} ${season}`;
}
export function nextSeason(game: string, season: string) {
  const start=game==='FC 27'?2026:2025;const first=Number(season.slice(0,4));
  if(!Number.isFinite(first)||first<start||first>=start+14) return null;
  return `${first+1}/${String(first+2).slice(-2)}`;
}

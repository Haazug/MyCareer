import test from 'node:test';
import assert from 'node:assert/strict';
import { balance, createCareer, isAvailable, isTransferAllowed, nextSeason, parseStore, seasonLabel, splitPayment, today } from '../src/model.ts';

const initialCareer = () => createCareer({
  name: 'Carreira de teste', mode: 'manager', gender: 'female', game: 'FC 26',
  season: '2025/26', person: 'Treinadora', club: 'SL Benfica', color: '#df302e', created: true,
});

test('careers created for each game start in the correct first season and stop at 15', () => {
  assert.equal(nextSeason('FC 26', '2025/26'), '2026/27');
  assert.equal(nextSeason('FC 26', '2038/39'), '2039/40');
  assert.equal(nextSeason('FC 26', '2039/40'), null);
  assert.equal(nextSeason('FC 27', '2026/27'), '2027/28');
  assert.equal(nextSeason('FC 27', '2040/41'), null);
});

test('season names are available in all requested languages', () => {
  assert.deepEqual(['pt', 'en', 'fr', 'es', 'it'].map(language => seasonLabel('FC 27', '2026/27', language as 'pt'|'en'|'fr'|'es'|'it')), [
    'Época 2026/27', 'Season 2026/27', 'Saison 2026/27', 'Temporada 2026/27', 'Stagione 2026/27',
  ]);
});

test('older browser saves migrate without losing games and add season tags', () => {
  const career = initialCareer();
  delete career.bench;
  delete career.lockerStyle;
  career.matches.push({
    id: 'legacy-match', opponent: 'SC Braga', date: '2025-09-01', competition: 'Liga Portugal',
    venue: 'home', status: 'played', goalsFor: 2, goalsAgainst: 0,
    performances: [], notes: '',
  });
  const raw = JSON.stringify({ version: 1, activeId: career.id, careers: [career] });
  const restored = parseStore(raw).careers[0];
  assert.equal(restored.matches.length, 1);
  assert.equal(restored.matches[0].season, '2025/26');
  assert.deepEqual(restored.seasons, []);
  assert.deepEqual(restored.squadPlans, []);
  assert.deepEqual(restored.scouting, []);
  assert.deepEqual(restored.academy, []);
  assert.deepEqual(restored.goals, []);
  assert.deepEqual(restored.playerMuseum, []);
  assert.equal(restored.bench.length, restored.players.length - 11);
  assert.equal(restored.lockerStyle.symbol,'MC');
});

test('installments split cents exactly and keep valid month-end dates', async () => {
  const payments = splitPayment(100, 3, '2026-01-31');
  assert.deepEqual(payments.map(p => p.amount), [33.34, 33.33, 33.33]);
  assert.deepEqual(payments.map(p => p.date), ['2026-01-31', '2026-02-28', '2026-03-31']);
  assert.equal(payments.reduce((sum, p) => sum + p.amount, 0), 100);
});

test('legacy player careers receive a manual discipline and confidence record', () => {
  const career = createCareer({ name:'Jogadora',mode:'player',gender:'female',game:'FC 27',season:'2026/27',person:'Atleta',club:'SL Benfica',color:'#df302e',created:true });
  delete career.playerRecord;
  const restored = parseStore(JSON.stringify({version:1,activeId:career.id,careers:[career]})).careers[0];
  assert.deepEqual(restored.playerRecord,{yellowCards:0,redCards:0,matchesMissed:0,coachConfidence:50,injuries:[]});
});


test('loans temporarily remove and restore a player from selection', () => {
  const base = {id:'p',name:'Test',number:10,position:'MC',overall:70,age:20,nation:'PT',salary:0,contract:'2027-06-30'};
  const future = new Date(Date.now()+30*86400000).toISOString().slice(0,10);
  const past = new Date(Date.now()-30*86400000).toISOString().slice(0,10);
  assert.equal(isAvailable({...base,loanedTo:'Other FC',loanUntil:future}),false);
  assert.equal(isAvailable({...base,loanedTo:'Other FC',loanUntil:past}),true);
  assert.equal(isAvailable({...base,loanedFrom:'Other FC',loanUntil:future}),true);
  assert.equal(isAvailable({...base,loanedFrom:'Other FC',loanUntil:past}),false);
});

test('scheduled installments do not reduce the available balance early', () => {
  const career=initialCareer();career.budget=1000;career.transactions=[
    {id:'paid',label:'Pago',amount:-100,date:today(),category:'Transferências',status:'paid'},
    {id:'future',label:'Futuro',amount:-200,date:'2099-01-01',category:'Transferências',status:'scheduled'},
  ];
  assert.equal(balance(career),900);
});

test('transfer ban challenges block incoming signings, including loans and free agents', () => {
  const challenge={title:'Transfer ban',description:'No signings',duration:'long' as const,transferBan:true};
  assert.equal(isTransferAllowed({challenge},'in'),false);
  assert.equal(isTransferAllowed({challenge},'out'),true);
  assert.equal(isTransferAllowed({},'in'),true);
});

test('saved squad plans retain an ordered bench and old plans migrate', () => {
  const career=initialCareer();
  const bench=career.players.slice(11,15).map(p=>p.id);
  career.bench=bench;
  career.squadPlans=[{id:'plan',name:'Jogo grande',formation:'4-3-3',lineup:[...career.lineup],bench:[...bench].reverse()}];
  const restored=parseStore(JSON.stringify({version:1,activeId:career.id,careers:[career]})).careers[0];
  assert.deepEqual(restored.squadPlans[0].bench,[...bench].reverse());
  assert.deepEqual(restored.bench,bench);
});

test('locker palette and ceiling identity persist and reject unsafe colors', () => {
  const career=initialCareer();career.lockerStyle={...career.lockerStyle!,wallColor:'#111111',accentColor:'#d2c4aa',ceilingColor:'#f2eee6',lightColor:'#fff1d5',lighting:82,symbol:'AFC',motto:'North London forever'};
  const restored=parseStore(JSON.stringify({version:1,activeId:career.id,careers:[career]})).careers[0];
  assert.equal(restored.lockerStyle?.symbol,'AFC');
  assert.equal(restored.lockerStyle?.lighting,82);
  career.lockerStyle={...career.lockerStyle!,wallColor:'url(javascript:alert(1))'};
  assert.throws(()=>parseStore(JSON.stringify({version:1,activeId:career.id,careers:[career]})),/balneário inválida/);
});

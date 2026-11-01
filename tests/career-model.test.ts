import test from 'node:test';
import assert from 'node:assert/strict';
import { createCareer, nextSeason, parseStore, seasonLabel } from '../src/model.ts';

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
});

import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/fixtures.ts';

function call(query: Record<string, string>, method = 'GET') {
  let status = 200; let payload: unknown; const headers: Record<string, string> = {};
  const res = { status(code: number) { status = code; return this; }, setHeader(name: string, value: string) { headers[name] = value; }, json(value: unknown) { payload = value; } };
  return handler({ method, query }, res).then(() => ({ status, payload: payload as Record<string, unknown>, headers }));
}
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });

test('fixture endpoint only accepts known leagues and consecutive season labels', async () => {
  let called = false; globalThis.fetch = async () => { called = true; return new Response('{}'); };
  assert.equal((await call({ league: 'https://example.com', season: '2026-27' })).status, 400);
  assert.equal((await call({ league: 'pt.1', season: '2026-28' })).status, 400);
  assert.equal(called, false);
});

test('fixture endpoint returns schedules without importing real-world scores', async () => {
  let requested = '';
  globalThis.fetch = async input => { requested = String(input); return new Response(JSON.stringify({ name: 'Liga Portugal 2026/27', matches: [{ date: '2026-08-07', round: 'Matchday 1', team1: 'Benfica', team2: 'Porto', score: { ft: [4, 0] } }, { date: 'invalid', team1: 'x', team2: 'y' }] }), { status: 200 }); };
  const result = await call({ league: 'pt.1', season: '2026-27' });
  const matches = result.payload.matches as Array<Record<string, unknown>>;
  assert.equal(result.status, 200); assert.match(requested, /2026-27\/pt\.1\.json$/); assert.equal(matches.length, 1);
  assert.equal(matches[0].team1, 'Benfica'); assert.equal('score' in matches[0], false);
  assert.equal(result.payload.source, 'OpenFootball / football.json (CC0 1.0)');
  assert.match(result.headers['Cache-Control'], /s-maxage/);
});

test('fixture endpoint reports unavailable source data cleanly', async () => {
  globalThis.fetch = async () => new Response('{}', { status: 404 });
  const result = await call({ league: 'pt.1', season: '2025-26' });
  assert.equal(result.status, 502); assert.match(String(result.payload.error), /não está disponível/);
});

import { afterEach, test } from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/counselor.ts';

function call(body: unknown, method = 'POST') {
  let status = 200; let payload: unknown; const headers: Record<string, string> = {};
  const res = { status(code: number) { status = code; return this; }, setHeader(name: string, value: string) { headers[name] = value; }, json(value: unknown) { payload = value; }, end() {} };
  return handler({ method, body }, res).then(() => ({ status, payload: payload as Record<string, unknown>, headers }));
}

const env = { groq: process.env.GROQ_API_KEY, token: process.env.CLOUDFLARE_API_TOKEN, account: process.env.CLOUDFLARE_ACCOUNT_ID };
const originalFetch = globalThis.fetch;
afterEach(() => {
  globalThis.fetch = originalFetch;
  for (const [key, value] of Object.entries({ GROQ_API_KEY: env.groq, CLOUDFLARE_API_TOKEN: env.token, CLOUDFLARE_ACCOUNT_ID: env.account })) {
    if (value === undefined) delete process.env[key]; else process.env[key] = value;
  }
});

test('counselor endpoint rejects an unconsented provider', async () => {
  delete process.env.GROQ_API_KEY;
  const result = await call({ provider: 'groq', role: 'player-agent', message: 'Devo mudar de clube?', context: {}, consentGroq: false, consentCloudflare: false });
  assert.equal(result.status, 403);
});

test('counselor endpoint calls Groq and returns the answer without logging it', async () => {
  process.env.GROQ_API_KEY = 'test-secret'; delete process.env.CLOUDFLARE_API_TOKEN; delete process.env.CLOUDFLARE_ACCOUNT_ID;
  let requestBody = '';
  globalThis.fetch = async (_input, init) => { requestBody = String(init?.body); return new Response(JSON.stringify({ choices: [{ message: { content: 'Avalia primeiro os minutos.' } }] }), { status: 200, headers: { 'Content-Type': 'application/json' } }); };
  const result = await call({ provider: 'groq', role: 'player-agent', message: 'Como posso ter mais minutos?', context: { club: 'SL Benfica' }, consentGroq: true, consentCloudflare: false });
  assert.equal(result.status, 200); assert.equal(result.payload.answer, 'Avalia primeiro os minutos.'); assert.equal(result.payload.provider, 'groq'); assert.match(requestBody, /player-agent|empresário/); assert.equal(result.headers['Cache-Control'], 'no-store');
});

test('counselor uses Cloudflare as reserve only after separate consent', async () => {
  process.env.GROQ_API_KEY = 'test-groq'; process.env.CLOUDFLARE_API_TOKEN = 'test-cloudflare'; process.env.CLOUDFLARE_ACCOUNT_ID = 'test-account'; let calls = 0;
  globalThis.fetch = async () => { calls++; if (calls === 1) return new Response('{}', { status: 429 }); return new Response(JSON.stringify({ result: { response: 'Mantém a estrutura.' } }), { status: 200, headers: { 'Content-Type': 'application/json' } }); };
  const result = await call({ provider: 'groq', role: 'manager-assistant', message: 'Que ajuste tático sugeres?', context: { formation: '4-3-3' }, consentGroq: true, consentCloudflare: true });
  assert.equal(result.status, 200); assert.equal(result.payload.provider, 'cloudflare'); assert.equal(result.payload.fallback, true); assert.equal(calls, 2);
});

test('counselor reports missing server credentials without contacting a provider', async () => {
  delete process.env.GROQ_API_KEY; delete process.env.CLOUDFLARE_API_TOKEN; delete process.env.CLOUDFLARE_ACCOUNT_ID; let called = false;
  globalThis.fetch = async () => { called = true; return new Response('{}'); };
  const result = await call({ provider: 'groq', role: 'manager-assistant', message: 'Como devo preparar o jogo?', context: {}, consentGroq: true, consentCloudflare: false });
  assert.equal(result.status, 503); assert.match(String(result.payload.error), /configurar as chaves/); assert.equal(called, false);
});

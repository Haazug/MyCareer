import type { Store } from './model.ts';

const env = (import.meta as ImportMeta & { env?: Record<string, string | undefined> }).env ?? {};
export const SUPABASE_URL = (env.VITE_SUPABASE_URL ?? '').trim().replace(/\/$/, '');
export const SUPABASE_PUBLIC_KEY = (env.VITE_SUPABASE_ANON_KEY ?? '').trim();
export const cloudConfigured = Boolean(SUPABASE_URL && SUPABASE_PUBLIC_KEY);
export const AUTH_STORAGE_KEY = 'mycareer-supabase-session-v1';

export type CloudSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; email?: string };
};

type AuthPayload = { access_token?: string; refresh_token?: string; expires_at?: number; expires_in?: number; user?: { id?: string; email?: string } };
function apiError(value: unknown) {
  const data = value && typeof value === 'object' ? value as Record<string, unknown> : {};
  const message = data.msg ?? data.message ?? data.error_description ?? data.error;
  return typeof message === 'string' ? message : 'O Supabase não conseguiu concluir o pedido.';
}
function sessionFrom(payload: AuthPayload): CloudSession | null {
  if (!payload.access_token || !payload.refresh_token || !payload.user?.id) return null;
  return { access_token: payload.access_token, refresh_token: payload.refresh_token, expires_at: payload.expires_at ?? Math.floor(Date.now() / 1000) + (payload.expires_in ?? 3600), user: { id: payload.user.id, email: payload.user.email } };
}
export function readSavedSession(): CloudSession | null {
  if (!cloudConfigured || typeof localStorage === 'undefined') return null;
  try {
    const value = JSON.parse(localStorage.getItem(AUTH_STORAGE_KEY) ?? 'null') as CloudSession | null;
    return value && typeof value.access_token === 'string' && typeof value.refresh_token === 'string' && typeof value.user?.id === 'string' ? value : null;
  } catch { return null; }
}
export function writeSavedSession(session: CloudSession | null) {
  if (typeof localStorage === 'undefined') return;
  if (session) localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(session)); else localStorage.removeItem(AUTH_STORAGE_KEY);
}

async function authRequest(path: string, body: Record<string, unknown>) {
  const response = await fetch(`${SUPABASE_URL}/auth/v1/${path}`, { method: 'POST', headers: { apikey: SUPABASE_PUBLIC_KEY, Authorization: `Bearer ${SUPABASE_PUBLIC_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  const data = await response.json() as AuthPayload & Record<string, unknown>;
  if (!response.ok) throw new Error(apiError(data));
  return data;
}
export async function signIn(email: string, password: string) {
  if (!cloudConfigured) throw new Error('Falta configurar o Supabase na Vercel.');
  return sessionFrom(await authRequest('token?grant_type=password', { email: email.trim(), password }));
}
export async function signUp(email: string, password: string) {
  if (!cloudConfigured) throw new Error('Falta configurar o Supabase na Vercel.');
  return sessionFrom(await authRequest('signup', { email: email.trim(), password }));
}
export async function signOut(session: CloudSession | null) {
  if (session && cloudConfigured) {
    try { await fetch(`${SUPABASE_URL}/auth/v1/logout`, { method: 'POST', headers: { apikey: SUPABASE_PUBLIC_KEY, Authorization: `Bearer ${session.access_token}` } }); } catch { /* Limpa a sessão local mesmo sem rede. */ }
  }
  writeSavedSession(null);
}
export async function freshSession(session: CloudSession): Promise<CloudSession> {
  if (session.expires_at > Math.floor(Date.now() / 1000) + 90) return session;
  const data = await authRequest('token?grant_type=refresh_token', { refresh_token: session.refresh_token });
  const next = sessionFrom(data);
  if (!next) throw new Error('A sessão expirou. Inicia sessão novamente.');
  return next;
}
function restHeaders(session: CloudSession, prefer?: string) {
  return { apikey: SUPABASE_PUBLIC_KEY, Authorization: `Bearer ${session.access_token}`, 'Content-Type': 'application/json', ...(prefer ? { Prefer: prefer } : {}) };
}
export async function readCloudStore(session: CloudSession): Promise<unknown | null> {
  const url = `${SUPABASE_URL}/rest/v1/career_saves?select=save_data&user_id=eq.${encodeURIComponent(session.user.id)}&limit=1`;
  const response = await fetch(url, { headers: restHeaders(session) });
  const data = await response.json() as Array<{ save_data?: unknown }> | Record<string, unknown>;
  if (!response.ok) throw new Error(apiError(data));
  return Array.isArray(data) && data[0] && 'save_data' in data[0] ? data[0].save_data ?? null : null;
}
export async function writeCloudStore(session: CloudSession, store: Store) {
  const response = await fetch(`${SUPABASE_URL}/rest/v1/career_saves?on_conflict=user_id`, { method: 'POST', headers: restHeaders(session, 'resolution=merge-duplicates,return=minimal'), body: JSON.stringify({ user_id: session.user.id, save_data: store, updated_at: new Date().toISOString() }) });
  if (!response.ok) throw new Error(apiError(await response.json()));
}

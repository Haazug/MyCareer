import { useEffect, useRef, useState } from 'react';
import { parseStore, type Store } from './model.ts';
import { cloudConfigured, freshSession, readCloudStore, readSavedSession, signIn, signOut, signUp, writeCloudStore, writeSavedSession, type CloudSession } from './cloud.ts';

export type CloudStatus = 'local'|'syncing'|'synced'|'error';
const OWNER_STORAGE_KEY = 'mycareer-cloud-owner-v1';
const OWNER_BACKUP_PREFIX = 'mycareer-offline-backup-';
const EMPTY_STORE: Store = { version: 1, activeId: '', careers: [] };
function mergeStores(local: Store, remote: Store): Store {
  const careers = new Map(remote.careers.map(c => [c.id, c]));
  for (const career of local.careers) careers.set(career.id, career);
  const activeId = local.activeId && careers.has(local.activeId) ? local.activeId : remote.activeId;
  return parseStore(JSON.stringify({ version: 1, activeId, careers: [...careers.values()] }));
}
export function mergeForAccount(local: Store, remoteValue: unknown|null, accountId: string): Store {
  const previousOwner = localStorage.getItem(OWNER_STORAGE_KEY);
  if (previousOwner && previousOwner !== accountId) {
    // Keep any unsynced local work recoverable, but never upload it to another account.
    localStorage.setItem(`${OWNER_BACKUP_PREFIX}${previousOwner}`, JSON.stringify(local));
    const nextBackupKey = `${OWNER_BACKUP_PREFIX}${accountId}`;
    const nextBackupRaw = localStorage.getItem(nextBackupKey);
    const accountLocal = nextBackupRaw ? parseStore(nextBackupRaw) : EMPTY_STORE;
    const remote = remoteValue ? parseStore(JSON.stringify(remoteValue)) : accountLocal;
    const merged = nextBackupRaw && remoteValue ? mergeStores(accountLocal, remote) : remote;
    localStorage.removeItem(nextBackupKey);
    localStorage.setItem(OWNER_STORAGE_KEY, accountId);
    return merged;
  }
  localStorage.setItem(OWNER_STORAGE_KEY, accountId);
  return remoteValue ? mergeStores(local, parseStore(JSON.stringify(remoteValue))) : local;
}

export function useCloudSync(store: Store, applyStore: (next: Store) => boolean) {
  const [session, setSession] = useState<CloudSession|null>(readSavedSession);
  const [ready, setReady] = useState(false); const [status, setStatus] = useState<CloudStatus>(readSavedSession() ? 'syncing' : 'local'); const [error, setError] = useState('');
  const storeRef = useRef(store); const applyRef = useRef(applyStore); const sessionRef = useRef(session);
  storeRef.current = store; applyRef.current = applyStore; sessionRef.current = session;
  function cacheSession(next: CloudSession) { writeSavedSession(next); sessionRef.current = next; setSession(next); }

  useEffect(() => {
    const current = sessionRef.current;
    if (!current || !cloudConfigured) { setReady(false); setStatus('local'); return; }
    let active = true; setReady(false); setStatus('syncing'); setError('');
    void (async () => {
      try {
        const valid = await freshSession(current);
        if (valid.access_token !== current.access_token) cacheSession(valid);
        const raw = await readCloudStore(valid);
        if (!active) return;
        const merged = mergeForAccount(storeRef.current, raw, valid.user.id);
        if (!applyRef.current(merged)) throw new Error('Não foi possível guardar localmente a cópia recebida do Supabase.');
        storeRef.current = merged;
        setReady(true); setStatus('synced');
      } catch (e) {
        if (!active) return;
        setError(e instanceof Error ? e.message : 'Não foi possível carregar a cópia na nuvem.'); setStatus('error');
      }
    })();
    return () => { active = false; };
  }, [session?.user.id]);

  useEffect(() => {
    const current = sessionRef.current;
    if (!ready || !current || !cloudConfigured) return;
    let active = true;
    const timer = setTimeout(() => {
      setStatus('syncing'); setError('');
      void (async () => {
        try {
          const valid = await freshSession(current);
          if (valid.access_token !== current.access_token) cacheSession(valid);
          await writeCloudStore(valid, store);
          if (active) setStatus('synced');
        } catch (e) {
          if (active) { setError(e instanceof Error ? e.message : 'Não foi possível sincronizar agora.'); setStatus('error'); }
        }
      })();
    }, 900);
    return () => { active = false; clearTimeout(timer); };
  }, [store, session?.user.id, ready]);

  async function authenticate(email: string, password: string, create: boolean) {
    const next = create ? await signUp(email, password) : await signIn(email, password);
    if (!next) return false;
    cacheSession(next); setReady(false); setStatus('syncing'); setError(''); return true;
  }
  async function logout() {
    await signOut(sessionRef.current); sessionRef.current = null; setSession(null); setReady(false); setError(''); setStatus('local');
  }
  async function syncNow() {
    const current = sessionRef.current;
    if (!current) throw new Error('Inicia sessão para sincronizar as carreiras.');
    setStatus('syncing'); setError('');
    try {
      const valid = await freshSession(current);
      if (valid.access_token !== current.access_token) cacheSession(valid);
      const raw = await readCloudStore(valid);
      const merged = mergeForAccount(storeRef.current, raw, valid.user.id);
      if (!applyRef.current(merged)) throw new Error('Não foi possível validar os dados locais antes da sincronização.');
      storeRef.current = merged;
      await writeCloudStore(valid, merged);
      setReady(true); setStatus('synced');
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Não foi possível sincronizar agora.';
      setError(message); setStatus('error'); throw new Error(message);
    }
  }
  return { session, status, error, authenticate, logout, syncNow };
}

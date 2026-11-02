import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { createCareer, type Store } from '../src/model.ts';
import { mergeForAccount } from '../src/useCloudSync.ts';

const ownerKey = 'mycareer-cloud-owner-v1';
const backupPrefix = 'mycareer-offline-backup-';
const originalStorage = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
const localCareer = () => createCareer({ name:'Carreira A local',mode:'manager',gender:'male',game:'FC 26',season:'2025/26',person:'Local',club:'Benfica',color:'#df302e',created:true });
const store = (career: ReturnType<typeof localCareer>): Store => ({ version:1, activeId:career.id, careers:[career] });
function storage(values: Record<string,string> = {}) {
  const data = new Map(Object.entries(values));
  Object.defineProperty(globalThis, 'localStorage', { configurable:true, value:{
    getItem:(key:string) => data.get(key) ?? null,
    setItem:(key:string,value:string) => { data.set(key,String(value)); },
    removeItem:(key:string) => { data.delete(key); },
  }});
  return data;
}
afterEach(() => {
  if (originalStorage) Object.defineProperty(globalThis,'localStorage',originalStorage);
  else Reflect.deleteProperty(globalThis,'localStorage');
});

test('switching accounts does not merge another account’s local careers into the new save', () => {
  const data = storage({[ownerKey]:'user-a'});
  const a = localCareer();
  const b = localCareer(); b.id='career-b'; b.name='Carreira B';
  const result = mergeForAccount(store(a), store(b), 'user-b');
  assert.deepEqual(result.careers.map(c=>c.id), ['career-b']);
  assert.equal(data.get(ownerKey), 'user-b');
  assert.deepEqual(JSON.parse(data.get(`${backupPrefix}user-a`) ?? '{}'), store(a));
});

test('returning to an account restores its local save and merges its cloud copy', () => {
  const data = storage({[ownerKey]:'user-b'});
  const localA = localCareer();
  const backupA = store(localA);
  const cloudA = localCareer(); cloudA.id=localA.id; cloudA.name='Cloud copy';
  data.set(`${backupPrefix}user-a`, JSON.stringify(backupA));
  const b = localCareer(); b.id='career-b';
  const result = mergeForAccount(store(b), store(cloudA), 'user-a');
  assert.deepEqual(result.careers.map(c=>c.id), [localA.id]);
  assert.equal(result.careers[0].name, localA.name);
  assert.equal(data.has(`${backupPrefix}user-a`), false);
  assert.equal(data.get(ownerKey), 'user-a');
});

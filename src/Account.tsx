import { useState, type FormEvent } from 'react';
import { Cloud, LoaderCircle, LogIn, LogOut, Mail, RefreshCw, ShieldCheck, UserPlus } from 'lucide-react';
import { Modal } from './ui';
import type { CloudSession } from './cloud';

type Props = {
  configured: boolean; session: CloudSession | null; status: 'local'|'syncing'|'synced'|'error'; error: string;
  onClose: () => void; onAuthenticate: (email: string, password: string, create: boolean) => Promise<boolean>;
  onSignOut: () => Promise<void>; onSync: () => Promise<void>;
};

export function AccountDialog({ configured, session, status, error, onClose, onAuthenticate, onSignOut, onSync }: Props) {
  const [create, setCreate] = useState(false); const [email, setEmail] = useState(session?.user.email ?? ''); const [password, setPassword] = useState('');
  const [busy, setBusy] = useState(false); const [message, setMessage] = useState(''); const [formError, setFormError] = useState('');
  async function submit(e: FormEvent) {
    e.preventDefault(); setBusy(true); setFormError(''); setMessage('');
    try {
      const signedIn = await onAuthenticate(email.trim(), password, create);
      if (signedIn) { setMessage(create ? 'Conta criada e carreiras sincronizadas.' : 'Sessão iniciada e carreiras sincronizadas.'); setPassword(''); }
      else setMessage('Conta criada. Confirma o endereço no email e depois inicia sessão.');
    } catch (e) { setFormError(e instanceof Error ? e.message : 'Não foi possível concluir o pedido.'); }
    finally { setBusy(false); }
  }
  async function sync() {
    setBusy(true); setFormError(''); setMessage('');
    try { await onSync(); setMessage('Cópia na nuvem atualizada.'); }
    catch (e) { setFormError(e instanceof Error ? e.message : 'Não foi possível sincronizar agora.'); }
    finally { setBusy(false); }
  }
  async function logout() { setBusy(true); setFormError(''); setMessage(''); try { await onSignOut(); setMessage('Sessão terminada. A cópia local continua neste dispositivo.'); } catch (e) { setFormError(e instanceof Error ? e.message : 'Não foi possível terminar a sessão neste momento.'); } finally { setBusy(false); } }
  const statusText = status === 'synced' ? 'Sincronizada' : status === 'syncing' ? 'A sincronizar…' : status === 'error' ? 'Sem ligação à nuvem' : 'Só neste dispositivo';

  return <Modal title="A tua carreira, em todos os teus dispositivos." subtitle="Uma conta privada sincroniza os teus saves." onClose={onClose}>
    <div className="account-status"><span className={`account-status-icon ${status==='error'?'error':''}`}><Cloud size={19}/></span><div><strong>{statusText}</strong><span>{session?.user.email ?? 'As carreiras ficam neste navegador até iniciares sessão.'}</span></div><span className={`live-dot ${status==='error'?'offline':''}`}/></div>
    {session ? <div className="account-cloud-actions"><div className="notice"><ShieldCheck size={17}/><span>O Supabase só recebe as tuas carreiras após autenticação. A política RLS limita a linha da base de dados à tua conta.</span></div><button className="button primary full" type="button" onClick={sync} disabled={busy}>{busy?<LoaderCircle className="spin" size={16}/>:<RefreshCw size={16}/>}Sincronizar agora</button>{status==='error'&&error&&<p className="form-error" role="alert">{error}</p>}<button className="button subtle full" type="button" onClick={logout} disabled={busy}><LogOut size={16}/>Terminar sessão neste dispositivo</button></div>
      : configured ? <>
        <div className="account-mode"><button type="button" className={!create?'active':''} onClick={()=>{setCreate(false);setMessage('');setFormError('');}}><LogIn size={15}/>Iniciar sessão</button><button type="button" className={create?'active':''} onClick={()=>{setCreate(true);setMessage('');setFormError('');}}><UserPlus size={15}/>Criar conta</button></div>
        <form className="account-form" onSubmit={submit}><label>Email<input type="email" autoComplete="email" required maxLength={254} value={email} onChange={e=>setEmail(e.target.value)} placeholder="tu@email.com"/></label><label>Palavra-passe<input type="password" autoComplete={create?'new-password':'current-password'} required minLength={8} maxLength={128} value={password} onChange={e=>setPassword(e.target.value)} placeholder="Mínimo 8 caracteres"/></label><button className="button primary full" type="submit" disabled={busy}>{busy?<LoaderCircle className="spin" size={16}/>:create?<UserPlus size={16}/>:<LogIn size={16}/>} {create?'Criar conta':'Iniciar sessão'}</button></form>
        <p className="account-confirmation"><Mail size={14}/>Se a confirmação por email estiver ativa no Supabase, confirma o endereço antes de iniciares sessão.</p>
      </> : <div className="notice"><Cloud size={17}/><span>Para ativar sincronização, adiciona o URL do projeto e a chave pública do Supabase às variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` na Vercel.</span></div>}
    {formError&&<p className="form-error" role="alert">{formError}</p>}{message&&<p className="account-message" role="status">{message}</p>}
    <p className="micro-copy account-footnote">A palavra-passe é enviada diretamente ao Supabase Auth por HTTPS; o MyCareer não a guarda. A chave pública fica no navegador e só dá acesso limitado pelas políticas RLS.</p>
  </Modal>;
}

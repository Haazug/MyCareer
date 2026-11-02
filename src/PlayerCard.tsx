import { useState } from 'react';
import type { CSSProperties, PointerEvent } from 'react';
import { clubKitDesign } from './kitDesign';
import { primaryPlayerName, type Player } from './model';

type Props = { player: Player; club: string; color: string; crestUrl?: string };
const OUTFIELD: [string, string][] = [['PAC','pace'],['SHO','shooting'],['PAS','passing'],['DRI','dribbling'],['DEF','defending'],['PHY','physicality']];
const KEEPER: [string, string][] = [['DIV','goalkeeping_diving'],['HAN','goalkeeping_handling'],['KIC','goalkeeping_kicking'],['REF','goalkeeping_reflexes'],['POS','goalkeeping_positioning'],['SPE','pace']];
const lum = (hex: string) => { if (!/^#[0-9a-f]{6}$/i.test(hex)) return .5; const v = parseInt(hex.slice(1), 16); return (((v >> 16) & 255) * .299 + ((v >> 8) & 255) * .587 + (v & 255) * .114) / 255; };

export function PlayerCard({ player, club, color, crestUrl }: Props) {
  const [broken, setBroken] = useState(false);
  const kit = clubKitDesign(club, color);
  const bright = lum(kit.primary) >= lum(kit.secondary) ? kit.primary : kit.secondary;
  const accent = lum(bright) > .45 ? bright : '#f1e9c9';
  const face = player.portraitDataUrl || player.portraitUrl;
  const attrs = player.attributes as Record<string, number> | undefined;
  const stats = player.position === 'GR' ? KEEPER : OUTFIELD;
  const name = primaryPlayerName(player.name);
  const initials = name.split(' ').map((w) => w[0]).join('').slice(0, 2);
  const move = (e: PointerEvent<HTMLElement>) => {
    const el = e.currentTarget; const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height;
    el.style.setProperty('--rx', `${(.5 - y) * 14}deg`); el.style.setProperty('--ry', `${(x - .5) * 16}deg`);
    el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`);
  };
  const leave = (e: PointerEvent<HTMLElement>) => { e.currentTarget.style.setProperty('--rx', '0deg'); e.currentTarget.style.setProperty('--ry', '0deg'); };
  return (
    <article className="pcard" style={{ '--c1': kit.primary, '--c2': kit.secondary, '--ac': accent } as CSSProperties} onPointerMove={move} onPointerLeave={leave}>
      <div className="pcard-foil" />
      <header className="pcard-top">
        <div className="pcard-ovr"><strong>{player.overall}</strong><span>{player.position}</span></div>
        <div className="pcard-meta">
          {crestUrl && <img src={crestUrl} alt="" className="pcard-crest" />}
          <small>{player.nation}</small>
        </div>
      </header>
      <div className="pcard-face">
        <b className="pcard-num">{player.number}</b>
        {face && !broken ? <img src={face} alt={name} onError={() => setBroken(true)} /> : <span className="pcard-mono">{initials}</span>}
      </div>
      <h2 className="pcard-name">{name}</h2>
      <div className="pcard-stats">
        {stats.map(([label, key]) => <div key={label}><b>{attrs?.[key] ?? '—'}</b><span>{label}</span></div>)}
      </div>
      <footer className="pcard-foot"><span>{player.age} ANOS</span><span>{club}</span><span>{player.potential ? `POT ${player.potential}` : `Nº ${player.number}`}</span></footer>
    </article>
  );
}

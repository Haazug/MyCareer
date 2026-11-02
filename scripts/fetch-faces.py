#!/usr/bin/env python3
"""Descarrega faces do Futwiz (fc27, com fallback fc26) pelo sourceId do catálogo.
Uso de teste:  python3 scripts/fetch-faces.py --club "SL Benfica"
Uso completo:  python3 scripts/fetch-faces.py
Pode ser interrompido e retomado."""
import argparse, json, time
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

CATALOG = Path('public/data/fc27-catalog.json')
OUT = Path('public/faces')
MAP = Path('public/data/face-map.json')
MISSES = Path('work/face-misses.txt')
SOURCES = [
    ('fc27', 'https://cdn.futwiz.com/assets/img/fc27/faces/{}.png'),
    ('fc26', 'https://cdn.futwiz.com/assets/img/fc26/faces/{}.png'),
]
UA = 'Mozilla/5.0 (projeto pessoal MyCareer)'

ap = argparse.ArgumentParser()
ap.add_argument('--club', help='só jogadores deste clube (nome exato do catálogo)')
ap.add_argument('--workers', type=int, default=3)
ap.add_argument('--delay', type=float, default=0.5, help='pausa por pedido, em segundos')
ap.add_argument('--retry-misses', action='store_true')
args = ap.parse_args()

def get(url):
    try:
        with urlopen(Request(url, headers={'User-Agent': UA}), timeout=20) as r:
            data = r.read()
            return data if r.headers.get_content_type() == 'image/png' and len(data) > 500 else None
    except HTTPError as e:
        if e.code in (403, 404):
            return None
        raise
    except URLError:
        return None

def job(sid):
    dest = OUT / f'{sid}.png'
    if dest.exists():
        return sid, 'cache'
    for edition, tpl in SOURCES:
        data = get(tpl.format(sid))
        time.sleep(args.delay)
        if data:
            dest.write_bytes(data)
            return sid, edition
    return sid, None

OUT.mkdir(parents=True, exist_ok=True)
MISSES.parent.mkdir(exist_ok=True)
players = json.load(open(CATALOG, encoding='utf-8'))['players']
if args.club:
    players = [p for p in players if p.get('club') == args.club]
ids = [str(p['sourceId']) for p in players]
misses = set(MISSES.read_text().split()) if MISSES.exists() and not args.retry_misses else set()
todo = [i for i in ids if i not in misses]
print(f'{len(ids)} jogadores, {len(todo)} a tentar')

stats = {}
with ThreadPoolExecutor(args.workers) as ex:
    for n, (sid, res) in enumerate(ex.map(job, todo), 1):
        stats[res] = stats.get(res, 0) + 1
        if res is None:
            misses.add(sid)
        if n % 50 == 0:
            print(f'  {n}/{len(todo)}', stats)

MISSES.write_text('\n'.join(sorted(misses)))
face_map = {}
if MAP.exists():
    face_map = json.load(open(MAP, encoding='utf-8'))
for sid in ids:
    if (OUT / f'{sid}.png').exists():
        face_map[sid] = f'/faces/{sid}.png'
json.dump(face_map, open(MAP, 'w', encoding='utf-8'))
print('resultado:', stats, '| faces no mapa:', len(face_map))
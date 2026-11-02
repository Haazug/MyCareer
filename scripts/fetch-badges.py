#!/usr/bin/env python3
"""python3 scripts/fetch-badges.py --dry-run  -> só índice + casamento
   python3 scripts/fetch-badges.py            -> descarrega e grava"""
import argparse, collections, difflib, io, json, re, time, unicodedata, urllib.request
from pathlib import Path

SITE = 'https://football-logos.cc'
UA = {'User-Agent': 'MyCareer-experimental/0.1 (projeto pessoal)'}
DELAY = 1.0
CATALOGS = ['public/data/fc26-catalog.json', 'public/data/fc27-catalog.json']
INDEX = Path('work/logo-index.json')
OUT = Path('public/badges')
MAP = Path('public/data/badge-map.json')
OVERRIDES = Path('scripts/badge-overrides.json')  # {"Nome do clube": "pais/slug"}
UNMATCHED = Path('work/badges-unmatched.txt')
IMG = re.compile(r'https://assets\.football-logos\.cc/logos/([a-z0-9-]+)/(\d+)x\d+/([a-z0-9-]+)\.([0-9a-f]{8})\.png')
STOP = {'fc','cf','sc','ac','as','afc','sv','fk','sk','cd','ud','rc','ss','us','ssc','vfb','vfl','tsv','fsv','sg','bsc','ca','sl','1','club','de','del','la','the'}

def get(url, binary=False):
    time.sleep(DELAY)
    with urllib.request.urlopen(urllib.request.Request(url, headers=UA), timeout=30) as r:
        data = r.read()
    return data if binary else data.decode('utf-8', 'replace')

def norm(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower().replace('&', ' and ')
    return re.sub(r'[^a-z0-9 ]+', ' ', s)

def toks(s):
    t = [w for w in norm(s).split() if w not in STOP]
    return t or norm(s).split()

def score(a, t):
    if a == t:
        return 1.0
    sa, sb = set(a), set(t)
    small, big = (sa, sb) if len(sa) <= len(sb) else (sb, sa)
    if small <= big and len(''.join(small)) >= 4:
        return 0.93
    m = difflib.SequenceMatcher(None, ' '.join(a), ' '.join(t))
    if m.real_quick_ratio() < 0.86 or m.quick_ratio() < 0.86:
        return 0.0
    return m.ratio()

def build_index():
    if INDEX.exists():
        return json.loads(INDEX.read_text(encoding='utf-8'))
    html = get(SITE + '/all/')
    slugs = sorted(set(re.findall(r'href="(?:https://football-logos\.cc)?/([a-z0-9-]+)/"', html)))
    if not slugs:
        raise SystemExit('Sem países em /all/. Cola-me: curl -s https://football-logos.cc/all/ | head -c 2000')
    index = {}
    for c in slugs:
        try:
            page = get(f'{SITE}/{c}/')
        except Exception as e:
            print('  falhou', c, e)
            continue
        best = {}
        for country, size, slug, h in IMG.findall(page):
            if country != c:
                continue
            size = int(size)
            rank = (0, size) if size >= 256 else (1, -size)
            if slug not in best or rank < best[slug][0]:
                best[slug] = (rank, size, h)
        for slug, (_, size, h) in best.items():
            index[f'{c}/{slug}'] = {'url': f'https://assets.football-logos.cc/logos/{c}/{size}x{size}/{slug}.{h}.png', 'size': size}
        if best:
            print(f'  {c}: {len(best)} logos')
    INDEX.parent.mkdir(exist_ok=True)
    INDEX.write_text(json.dumps(index), encoding='utf-8')
    return index

def load_clubs():
    clubs = {}
    for f in CATALOGS:
        p = Path(f)
        if p.exists():
            for c in json.loads(p.read_text(encoding='utf-8')).get('clubs', []):
                if c.get('name'):
                    clubs.setdefault(c['name'], c.get('league', ''))
    return clubs

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--dry-run', action='store_true')
    ap.add_argument('--reindex', action='store_true')
    args = ap.parse_args()
    if args.reindex and INDEX.exists():
        INDEX.unlink()
    index = build_index()
    print(len(index), 'logos no índice')
    clubs = load_clubs()
    cands = [(k, k.split('/')[0], toks(k.split('/')[1].replace('-', ' '))) for k in index]
    overrides = json.loads(OVERRIDES.read_text(encoding='utf-8')) if OVERRIDES.exists() else {}
    ct = {n: toks(n) for n in clubs}
    result, votes = {}, collections.defaultdict(collections.Counter)

    for name, league in clubs.items():  # passagem 1: nome exato e único
        if name in overrides:
            result[name] = overrides[name]
            continue
        hits = [k for k, c, t in cands if t == ct[name]]
        if len(hits) == 1:
            result[name] = hits[0]
            votes[league][hits[0].split('/')[0]] += 1

    league_country = {}
    for league, cnt in votes.items():
        country, n = cnt.most_common(1)[0]
        if n >= 2 and n / sum(cnt.values()) >= 0.5:
            league_country[league] = country

    unmatched = []
    for name, league in clubs.items():  # passagem 2: semelhança, com o país da liga
        if name in result:
            continue
        scored = sorted(((score(ct[name], t), k, c) for k, c, t in cands), reverse=True)
        pick = None
        lc = league_country.get(league)
        if lc:
            local = [s for s in scored if s[2] == lc]
            if local and local[0][0] >= 0.86 and (len(local) < 2 or local[1][0] < local[0][0] - 0.02):
                pick = local[0][1]
        if not pick and scored and scored[0][0] >= 0.93 and (len(scored) < 2 or scored[1][0] < scored[0][0] - 0.02):
            pick = scored[0][1]
        if pick:
            result[name] = pick
        else:
            unmatched.append((league, name))

    print(f'{len(result)} clubes casados, {len(unmatched)} sem logo (de {len(clubs)})')
    UNMATCHED.parent.mkdir(exist_ok=True)
    UNMATCHED.write_text('\n'.join(f'{l} | {n}' for l, n in sorted(unmatched)), encoding='utf-8')
    for name in ('SL Benfica', 'Sporting CP', 'FC Porto', '1. FC Köln', 'Real Madrid'):
        print('  ', name, '->', result.get(name))
    if args.dry_run:
        return

    from PIL import Image
    OUT.mkdir(parents=True, exist_ok=True)
    badge_map = {}
    for name, key in sorted(result.items()):
        if key not in index:
            print('  override inválido:', name, key)
            continue
        country, slug = key.split('/', 1)
        dest = OUT / f'{country}-{slug}.png'
        if not dest.exists():
            try:
                img = Image.open(io.BytesIO(get(index[key]['url'], binary=True))).convert('RGBA')
                img.thumbnail((256, 256), Image.LANCZOS)
                img.save(dest, optimize=True)
            except Exception as e:
                print('  falhou', key, e)
                continue
        badge_map[name] = f'/badges/{dest.name}'
    MAP.write_text(json.dumps(badge_map, ensure_ascii=False, indent=0), encoding='utf-8')
    print(len(badge_map), 'emblemas ligados em', MAP)

main()
import json, re, difflib, unicodedata
from pathlib import Path

index = json.load(open('work/logo-index.json', encoding='utf-8'))
lines = Path('work/badges-unmatched.txt').read_text(encoding='utf-8').splitlines()

ABBR = {'sheffield wed': 'sheffield wednesday', 'west brom': 'west bromwich albion',
        'm gladbach': 'monchengladbach', 'spurs': 'tottenham', 'qpr': 'queens park rangers',
        'frankfurt': 'eintracht frankfurt', 'utd': 'united', 'dep': 'deportivo',
        'indep': 'independiente', 'ind': 'independiente', 'uni': 'universidad'}

def norm(s):
    s = unicodedata.normalize('NFKD', s).encode('ascii', 'ignore').decode().lower().replace('&', ' and ')
    return re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]+', ' ', s)).strip()

def expand(name):
    n = norm(name)
    for k in sorted(ABBR, key=len, reverse=True):
        n = re.sub(rf'\b{k}\b', ABBR[k], n)
    return n

cands = [(k, norm(k.split('/')[1].replace('-', ' '))) for k in index]
draft, report = {}, []
for line in lines:
    league, name = line.split(' | ', 1)
    q = expand(name)
    qt = set(q.split())
    scored = []
    for k, t in cands:
        r = difflib.SequenceMatcher(None, q, t).ratio()
        if len(q) >= 4 and qt <= set(t.split()):
            r = max(r, 0.95)
        scored.append((r, k))
    scored.sort(reverse=True)
    top = scored[:3]
    report.append(f'{league} | {name}\n' + '\n'.join(f'    {r:.2f}  {k}' for r, k in top))
    if top[0][0] >= 0.85 and top[0][0] - top[1][0] >= 0.03:
        draft[name] = top[0][1]

Path('work/overrides-suggestions.txt').write_text('\n'.join(report), encoding='utf-8')
Path('work/overrides-draft.json').write_text(json.dumps(draft, ensure_ascii=False, indent=1), encoding='utf-8')
print(len(draft), 'sugestões fortes em work/overrides-draft.json')
print('lista completa em work/overrides-suggestions.txt')
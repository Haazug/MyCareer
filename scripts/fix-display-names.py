import json, re, sys, unicodedata
from pathlib import Path

def clean(s):
    return re.sub(r'\s*\([^)]*\)', '', s or '').strip()

def base(ch):
    return unicodedata.normalize('NFKD', ch)[0].lower()

def popular(full, short):
    full, short = clean(full), clean(short)
    m = re.match(r'^((?:\w\.\s*)+)(.+)$', short)
    if m:
        initial = base(m.group(1).strip()[0])
        surname = m.group(2).strip()
        skip = {w.lower() for w in surname.split()}
        for tok in full.split():
            if tok.lower() not in skip and base(tok[0]) == initial:
                return f'{tok} {surname}'
        return short
    return short or full

files = sys.argv[1:] or ['public/data/fc26-catalog.json', 'public/data/fc27-catalog.json']
for f in files:
    p = Path(f)
    if not p.exists():
        continue
    data = json.loads(p.read_text(encoding='utf-8'))
    n = 0
    for pl in data.get('players', []):
        if 'fullName' in pl:
            continue
        new = popular(pl.get('name'), pl.get('shortName'))
        if new and new != pl.get('name'):
            pl['fullName'] = pl['name']
            pl['name'] = new
            n += 1
    if n:
        p.write_text(json.dumps(data, ensure_ascii=False, separators=(',', ':')), encoding='utf-8')
    print(f, n, 'nomes alterados')

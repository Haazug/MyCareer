"""Build internal research registers from a decoded candidate snapshot.

Usage: python audit/scripts/build-registers.py /path/to/extracted.json
Does not download assets or approve their licences. Raw snapshot registrations
must not be mistaken for the official licensed/playable roster of either game.
"""
import collections
import csv
import hashlib
import json
import pathlib
import sys

base = pathlib.Path(__file__).resolve().parents[1]
source = pathlib.Path(sys.argv[1])
snapshots = json.loads(source.read_text())
outdir = base / 'registers'
outdir.mkdir(exist_ok=True)
source_url = 'https://registry.npmjs.org/eafc-db-kit/-/eafc-db-kit-1.1.0.tgz'
technical = {111, 382, 383, 384, 2000, 2028, 2092, 2240, 2255, 2260, 2261, 2262, 2263}
records = {'teams': [], 'kits': [], 'competition-overrides': [], 'fonts': [], 'leagues': [], 'managers': []}
summary = {'source': source_url, 'package': 'eafc-db-kit@1.1.0', 'scope': 'UNVALIDATED_CANDIDATE_SNAPSHOTS', 'permission_to_republish_game_assets': 'NOT_ESTABLISHED', 'versions': {}}

for version, payload in snapshots.items():
    tables = {table['name']: table['records'] for table in payload['tables']}
    teams = {row['teamid']: row for row in tables['teams']}
    leagues = {row['leagueid']: row for row in tables['leagues']}
    team_leagues = collections.defaultdict(list)
    for row in tables['leagueteamlinks']:
        team_leagues[row['teamid']].append(row['leagueid'])
    kits = collections.defaultdict(list)
    for row in tables['teamkits']:
        kits[row['teamtechid']].append(row)
    counts = collections.Counter()
    for team_id, team in teams.items():
        lids = team_leagues[team_id]
        international = any(leagues.get(i, {}).get('isinternationalleague') == 1 for i in lids)
        special = bool(lids) and all(i in technical for i in lids)
        kind = 'NATIONAL_TEAM_CANDIDATE' if international else 'TECHNICAL_OR_SPECIAL_CANDIDATE' if special else 'CLUB_CANDIDATE'
        counts[kind] += 1
        krows = kits[team_id]
        records['teams'].append(dict(edition=version, team_id=team_id, name=team['teamname'], gender_source=team.get('gender'), entity_kind=kind,
            league_ids='|'.join(map(str, lids)), league_names='|'.join(leagues.get(i, {}).get('leaguename', '') for i in lids),
            candidate_kit_records=len(krows), kit_record_ids='|'.join(str(k['teamkitid']) for k in krows),
            number_font_ids='|'.join(map(str, sorted({k['numberfonttype'] for k in krows}))),
            name_font_ids='|'.join(map(str, sorted({k['jerseynamefonttype'] for k in krows}))),
            game_licence_status='NOT_INDIVIDUALLY_VERIFIED', career_availability='NOT_VERIFIED',
            kit_textures='MISSING', font_files='MISSING', patches='MISSING', crest='MISSING', reuse_permission='NOT_VERIFIED', source=source_url))
    for league_id, league in leagues.items():
        trows = [t for t in teams if league_id in team_leagues[t]]
        records['leagues'].append(dict(edition=version, league_id=league_id, league_name=league['leaguename'],
            women_source_flag=league.get('iswomencompetition'), international_source_flag=league.get('isinternationalleague'),
            category='TECHNICAL_OR_SPECIAL' if league_id in technical else 'INTERNATIONAL' if league.get('isinternationalleague') else 'FOOTBALL_CANDIDATE',
            team_records=len(trows), font_mapping='NOT_VISUALLY_VERIFIED', file_permission='NOT_ESTABLISHED', source=source_url))
    font_uses = collections.defaultdict(lambda: {'teams': set(), 'kits': set(), 'competitions': set()})
    for table_name, out_name in [('teamkits', 'kits'), ('competitionkits', 'competition-overrides')]:
        for row in tables[table_name]:
            team_id = row['teamtechid']
            team = teams.get(team_id)
            core = dict(edition=version, teamtechid=team_id, matched_team_name=team['teamname'] if team else '',
                linkage='DIRECT_ID_CANDIDATE' if team else 'UNMATCHED_SNAPSHOT_REFERENCE', type_id=row['teamkittypetechid'],
                raw_year=row['year'], year_interpretation='NOT_VERIFIED;0_IS_NOT_A_CALENDAR_YEAR',
                number_font_id=row['numberfonttype'], name_font_id=row['jerseynamefonttype'], shorts_font_id=row['shortsnumberfonttype'],
                asset_files='NOT_PRESENT_IN_PROJECT', reuse_permission='NOT_VERIFIED', source=source_url)
            if table_name == 'teamkits':
                core.update(kit_record_id=row['teamkitid'], generic_flag_source=row.get('isgeneric'),
                    left_patch_id=row.get('jerseyleftsleevebadge'), right_patch_id=row.get('jerseyrightsleevebadge'), chest_patch_id=row.get('chestbadge'))
            else:
                core.update(competition_id=row['competitionid'])
            records[out_name].append(core)
            for field, kind in [('numberfonttype', 'NUMBER'), ('jerseynamefonttype', 'NAME'), ('shortsnumberfonttype', 'SHORTS_NUMBER')]:
                info = font_uses[(kind, row[field])]
                info['teams'].add(team_id)
                if table_name == 'teamkits':
                    info['kits'].add(row['teamkitid'])
                else:
                    info['competitions'].add(row['competitionid'])
    for (kind, font_id), uses in sorted(font_uses.items()):
        records['fonts'].append(dict(edition=version, kind=kind, raw_font_id=font_id, candidate_team_count=len(uses['teams']),
            kit_record_count=len(uses['kits']), competition_override_count=len(uses['competitions']),
            font_family='UNRESOLVED_ID', source_file='MISSING', file_permission='NOT_ESTABLISHED', visual_verification='NOT_DONE', source=source_url))
    for manager in tables.get('manager', []):
        tid = manager.get('teamid')
        records['managers'].append(dict(edition=version, manager_id=manager.get('managerid'), team_id=tid,
            team_name=teams.get(tid, {}).get('teamname', ''),
            name=' '.join(str(manager.get(k, '')).strip() for k in ['firstname', 'surname']).strip(),
            common_name=manager.get('commonname'), gender_source=manager.get('gender'), licensed_flag_source=manager.get('islicensed'),
            selectable_career_status='NOT_VERIFIED', redistribution_permission='NOT_ESTABLISHED', source=source_url))
    summary['versions'][version] = dict(team_records=len(teams), team_categories=dict(counts), league_records=len(leagues),
        league_candidate_count=sum(i not in technical and not l.get('isinternationalleague') for i,l in leagues.items()),
        kit_records=len(tables['teamkits']), competition_overrides=len(tables['competitionkits']),
        distinct_number_font_ids=len({r['numberfonttype'] for r in tables['teamkits']}),
        distinct_name_font_ids=len({r['jerseynamefonttype'] for r in tables['teamkits']}),
        manager_records=len(tables.get('manager', [])), manager_licensed_flags=dict(collections.Counter(str(m.get('islicensed')) for m in tables.get('manager', []))),
        player_records=payload['playerCount'], nation_reference_records=len(tables['nations']),
        warnings=payload.get('warnings', []), kit_records_with_unmatched_team_id=sum(k['teamtechid'] not in teams for k in tables['teamkits']),
        records_marked_visual_ready=0)

for kind, rows in records.items():
    if not rows:
        continue
    fields = list(dict.fromkeys(key for row in rows for key in row))
    with (outdir / f'{kind}.csv').open('w', newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=fields)
        writer.writeheader()
        writer.writerows(rows)
    summary.setdefault('register_rows', {})[kind] = len(rows)
summary['decoded_evidence_sha256'] = hashlib.sha256(source.read_bytes()).hexdigest()
(base / 'evidence-summary.json').write_text(json.dumps(summary, indent=2, ensure_ascii=False)+'\n')
print(json.dumps(summary, indent=2, ensure_ascii=False))

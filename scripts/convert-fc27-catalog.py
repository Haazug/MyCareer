#!/usr/bin/env python3
"""Build the FC 27 player catalogue from the source CSV."""
import csv
import json
import sys
from collections import Counter
from datetime import datetime
from pathlib import Path

source = Path(sys.argv[1] if len(sys.argv) > 1 else 'work/fc27-players.csv')
out = Path(sys.argv[2] if len(sys.argv) > 2 else 'public/data/fc27-catalog.json')
position_map = {
    'GK':'GR','RB':'DD','RWB':'DD','CB':'DC','LB':'DE','LWB':'DE','CDM':'MDC',
    'CM':'MC','CAM':'MCO','RM':'MD','LM':'ME','RW':'ED','LW':'EE','ST':'PL','CF':'PL',
    'RF':'ED','LF':'EE','ATA':'PL','AT':'PL','EXT':'ED','EI':'EE','MCD':'MDC',
    'LD':'DD','LI':'DE','DFC':'DC'
}
palette = ['#b84b42','#347aa6','#28795b','#94633b','#77569b','#b85c83','#627b42','#a17e2e','#427c7d','#8b4d62','#4f67a1','#a65637']
def color(name):
    return palette[sum((i + 1) * ord(char) for i, char in enumerate(name)) % len(palette)]
def numeric(value):
    try:
        return int(float(value)) if value not in ('', None) else None
    except (TypeError, ValueError):
        return None
def age_at(birthdate, snapshot):
    try:
        born = datetime.strptime(birthdate, '%d-%m-%Y').date()
        snap = datetime.strptime(snapshot, '%d-%m-%Y').date()
        return snap.year - born.year - ((snap.month, snap.day) < (born.month, born.day))
    except (TypeError, ValueError):
        return 18
players, clubs = [], {}
stat_fields = ('pace','shooting','passing','dribbling','defending','physicality','attacking_crossing','attacking_finishing','attacking_heading_accuracy','attacking_short_passing','attacking_volleys','skill_dribbling','skill_curve','skill_fk_accuracy','skill_long_passing','skill_ball_control','movement_acceleration','movement_sprint_speed','movement_agility','movement_reactions','movement_balance','power_shot_power','power_jumping','power_stamina','power_strength','power_long_shots','mentality_aggression','mentality_interceptions','mentality_positioning','mentality_vision','mentality_penalties','mentality_composure','defending_awareness','defending_standing_tackle','defending_sliding_tackle','goalkeeping_diving','goalkeeping_handling','goalkeeping_kicking','goalkeeping_positioning','goalkeeping_reflexes')
with source.open(encoding='utf-8-sig', newline='') as handle:
    for row in csv.DictReader(handle):
        name = (row.get('common_name') or ' '.join(filter(None, (row.get('first_name'), row.get('last_name'))))).strip()
        club, league = row.get('club','').strip(), row.get('league','').strip()
        if not name or not club:
            continue
        gender = 'female' if 'women' in row.get('gender','').lower() else 'male'
        key = (club, league, gender)
        clubs[key] = {'name':club,'league':league,'gender':gender,'color':color(club)}
        raw_positions = [row.get('position','')] + row.get('alternate_positions','').split()
        positions = list(dict.fromkeys(position_map[p.strip().upper()] for p in raw_positions if p.strip().upper() in position_map)) or ['MC']
        stats = {field:numeric(row.get(field)) for field in stat_fields if numeric(row.get(field)) is not None}
        overall = numeric(row.get('overall_rating')) or 1
        players.append({
            'sourceId':row.get('player_id',''), 'name':name, 'shortName':row.get('common_name') or name,
            'club':club, 'league':league, 'gender':gender, 'positions':positions, 'position':positions[0],
            'overall':overall, 'age':age_at(row.get('birthdate'),row.get('snapshot_date')),
            'nation':row.get('nationality',''), 'number':0, 'salary':0, 'contract':'2027-06-30',
            'preferredFoot':row.get('preferred_foot',''), 'weakFoot':numeric(row.get('weak_foot')) or 0,
            'skillMoves':numeric(row.get('skill_moves')) or 0, 'heightCm':numeric(row.get('height_cm')) or 0,
            'weightKg':numeric(row.get('weight_kg')) or 0, 'attributes':stats
        })
players.sort(key=lambda player:(player['club'].casefold(),-player['overall'],player['name'].casefold()))
source_info = {
    'title':'EA FC 27 Player Ratings Dataset',
    'author':'Lakshmi Kanth',
    'url':'https://github.com/LakshmiKanth11/EA_FC_ANALYSIS',
    'license':'No separate CC license declared in the source repository; user-provided rights assumed for this private test.',
    'licenseUrl':'https://github.com/LakshmiKanth11/EA_FC_ANALYSIS',
    'derivedFrom':'EA public ratings API; snapshot 2026-09-12. This CSV contains no potential, wage, contract, crest or portrait data.'
}
package = {'schemaVersion':1,'edition':'FC 27','snapshot':'2026-09-12','source':source_info,'clubs':sorted(clubs.values(),key=lambda club:(club['league'].casefold(),club['name'].casefold())),'players':players,'managers':[]}
out.parent.mkdir(parents=True,exist_ok=True)
with out.open('w',encoding='utf-8') as handle:
    json.dump(package,handle,ensure_ascii=False,separators=(',',':'))
print(f"{len(players):,} players; {len(clubs):,} club variants; {len({c['league'] for c in clubs.values()}):,} leagues; {out.stat().st_size:,} bytes")

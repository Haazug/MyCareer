import argparse, csv, json, colorsys, hashlib
from pathlib import Path
parser=argparse.ArgumentParser(description='Convert the attributed Kaggle FC 26 CSV to the compact MyCareer catalog.')
parser.add_argument('input', nargs='?', default='work/FC26_20250921.csv')
parser.add_argument('--output', default='public/data/fc26-catalog.json')
args=parser.parse_args()
source=Path(args.input)
out=Path(args.output)
position_map={'GK':'GR','RB':'DD','CB':'DC','LB':'DE','CDM':'MDC','CM':'MC','CAM':'MCO','RM':'MD','LM':'ME','RW':'ED','LW':'EE','ST':'PL','RWB':'DD','LWB':'DE','CF':'PL','RF':'ED','LF':'EE'}
women_terms=('women','frauen','feminine','feminin','liga f','arkema','nwsl','wsl','a-league women')
known={
 'SL Benfica':'#d71920','Sporting CP':'#14834b','FC Porto':'#0750a4','Real Madrid':'#e5e4df','FC Barcelona':'#7b1636','Atlético de Madrid':'#cb1f36','Manchester United':'#d21c2b','Manchester City':'#62b5e5','Arsenal':'#d82028','Liverpool':'#c8102e','Chelsea':'#0754a5','Tottenham Hotspur':'#f2f2f2','Paris Saint-Germain':'#15376b','Bayern München':'#dc1e30','Borussia Dortmund':'#f4d400','Juventus':'#171717','Inter':'#0754a5','AC Milan':'#c61b2b','AFC Ajax':'#d42131','Ajax':'#d42131','Celtic':'#168448','Rangers':'#1854a5','Atalanta':'#141e56','Athletic Club':'#d71920','Sevilla FC':'#d81920','Valencia CF':'#f36f21','Olympique de Marseille':'#2e80c2','Olympique Lyonnais':'#d51832','AS Monaco':'#d71932','Newcastle United':'#222222','Aston Villa':'#8d1c36','West Ham United':'#7e253d','Everton':'#164194','Leicester City':'#1641a0','Wolverhampton Wanderers':'#d6a600','Brighton & Hove Albion':'#0057b8','Brentford':'#d71e2b','Fulham':'#f1f1ed','Crystal Palace':'#1b3e88','Nottingham Forest':'#e53236','Leeds United':'#f2f2ed','Burnley':'#642e43','Sunderland':'#d20b28','Real Sociedad':'#267bb2','Villarreal CF':'#f0d31a','Girona FC':'#d6202d','Real Betis':'#16804b','CA Osasuna':'#a20d26','Bayer 04 Leverkusen':'#e2231a','Borussia Mönchengladbach':'#178d51','RB Leipzig':'#d21e2b','VfB Stuttgart':'#e11927','Eintracht Frankfurt':'#d82027','AS Roma':'#9c1c35','Napoli':'#168dc2','Lazio':'#76c0ea','Fiorentina':'#5d3b8c','Benfica Women':'#d71920','Arsenal Women':'#d82028','Chelsea Women':'#0754a5','Manchester City Women':'#62b5e5'}
def color_for(name):
 if name in known:return known[name]
 digest=hashlib.md5(name.encode()).digest(); hue=int.from_bytes(digest[:2],'big')/65535
 # Keep original concept palettes legible against the dark UI.
 r,g,b=colorsys.hls_to_rgb(hue,.48,.61)
 return '#%02x%02x%02x'%(round(r*255),round(g*255),round(b*255))
def is_women(league):
 s=(league or '').lower()
 return any(x in s for x in women_terms)
club_map={}; players=[]
with source.open(encoding='utf-8-sig',newline='') as f:
 for row in csv.DictReader(f):
  club=(row.get('club_name') or '').strip(); league=(row.get('league_name') or '').strip()
  gender='female' if is_women(league) else 'male'
  key=(club,league,gender)
  if club: club_map[key]={'name':club,'league':league,'gender':gender,'color':color_for(club)}
  raw_positions=[p.strip() for p in (row.get('player_positions') or '').split(',') if p.strip()]
  normalized=[position_map[p] for p in raw_positions if p in position_map]
  if not normalized: normalized=['MC']
  stats={}
  for field in ('pace','shooting','passing','dribbling','defending','physic','attacking_crossing','attacking_finishing','attacking_heading_accuracy','attacking_short_passing','attacking_volleys','skill_dribbling','skill_curve','skill_fk_accuracy','skill_long_passing','skill_ball_control','movement_acceleration','movement_sprint_speed','movement_agility','movement_reactions','movement_balance','power_shot_power','power_jumping','power_stamina','power_strength','power_long_shots','mentality_aggression','mentality_interceptions','mentality_positioning','mentality_vision','mentality_penalties','mentality_composure','defending_marking_awareness','defending_standing_tackle','defending_sliding_tackle','goalkeeping_diving','goalkeeping_handling','goalkeeping_kicking','goalkeeping_positioning','goalkeeping_reflexes','goalkeeping_speed'):
   value=row.get(field)
   if value and value.isdigit(): stats[field]=int(value)
  try: number=int(float(row.get('club_jersey_number') or '0'))
  except ValueError: number=0
  try: contract_year=int(float(row.get('club_contract_valid_until_year') or '2027'))
  except ValueError: contract_year=2027
  if not 1<=contract_year<=2100: contract_year=2027
  def num(field,default=0):
   try:return int(float(row.get(field) or default))
   except ValueError:return default
  players.append({'sourceId':row.get('player_id',''),'name':row.get('long_name') or row.get('short_name') or '','shortName':row.get('short_name') or '','club':club,'league':league,'gender':gender,'positions':normalized,'position':normalized[0],'overall':num('overall',1),'potential':num('potential',1),'age':num('age',18),'nation':row.get('nationality_name') or '', 'number':number if 1<=number<=99 else 0,'value':num('value_eur'),'salary':num('wage_eur'),'contract':f'{contract_year}-06-30','preferredFoot':row.get('preferred_foot') or '','weakFoot':num('weak_foot'),'skillMoves':num('skill_moves'),'heightCm':num('height_cm'),'weightKg':num('weight_kg'),'attributes':stats})
players.sort(key=lambda p:(p['club'].casefold(), -p['overall'], p['name'].casefold()))
clubs=sorted(club_map.values(),key=lambda c:(c['league'].casefold(),c['name'].casefold()))
package={'schemaVersion':1,'edition':'FC 26','snapshot':'2025-09-19','source':{'title':'FC 26 (FIFA 26) Player Data','author':'rovnez','url':'https://www.kaggle.com/datasets/rovnez/fc-26-fifa-26-player-data','license':'CC BY 4.0','licenseUrl':'https://creativecommons.org/licenses/by/4.0/','derivedFrom':'SoFIFA public player pages; no portraits or image URLs included.'},'clubs':clubs,'players':players,'managers':[]}
out.parent.mkdir(parents=True,exist_ok=True)
with out.open('w',encoding='utf-8') as target: json.dump(package,target,ensure_ascii=False,separators=(',',':'))
print(f'{len(players)} players; {len(clubs)} clubs; {len({c["league"] for c in clubs})} leagues; {out.stat().st_size:,} bytes')

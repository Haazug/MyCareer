"""Record group-level supplier leads without claiming per-kit clearance."""
import csv
from pathlib import Path

base = Path(__file__).resolve().parents[1]
pl = 'https://www.premierleague.com/en/news/4299181/premier-league-and-avery-dennison-extend-licensing-partnership-for-five-more-years'
id_group = 'https://id-unlimited.ie/'
national = 'https://www.averydennison.com/na/en/industries/apparel/perspectives/fifa-world-cup-official-federation-names-and-numbers'
barca = 'https://www.fcbarcelona.com/en/news/4588557/special-typeface-for-each-kit'
leads = {
    '13': ('Avery Dennison', pl, 'Físico confirmado pela liga; nenhuma licença web gratuita obtida'),
    '308': ('Avery Dennison', 'https://www.averydennison.com/na/en/industries/apparel/news/press-release-avery-dennison-liga-portugal-strategic-partnership-agreement', 'Parceria encontrada; validar conjunto doméstico/europeu por equipa'),
    '39': ('Avery Dennison', 'https://www.averydennison.com/en/home/news/press-releases/major-league-soccer-and-avery-dennison-extend-licensing-agreement.html', 'Fornecedor físico; condições digitais não demonstradas'),
    '14': ('ID UNLIMITED — pista EFL', id_group, 'Parceria não comprova fonte/variante atual de cada clube'),
    '60': ('ID UNLIMITED — pista EFL', id_group, 'Parceria não comprova fonte/variante atual de cada clube'),
    '61': ('ID UNLIMITED — pista EFL', id_group, 'Parceria não comprova fonte/variante atual de cada clube'),
    '2216': ('ID UNLIMITED — pista WSL', id_group, 'Não herdar fontes da equipa masculina; ficheiros atuais não obtidos'),
    '31': ('Regulamento Lega Serie A; pista Stilscreen/ID UNLIMITED Italy', 'https://img.legaseriea.it/vimages/686538c6/1%20-%20Regolamento%20Divise%20da%20Gioco%202024-2027.pdf', 'Norma não concede fonte nem licença digital; competições alternativas pendentes'),
    '53': ('Normas LaLiga; exceções do clube', barca, 'Barcelona confirma variantes; uma fonte única de clube/liga não resolve todas as camisolas'),
    '54': ('Documentação histórica LaLiga', 'https://assets.laliga.com/assets/2019/08/06/originals/ef8c50c6026e4b826ef20933dff15220.pdf', 'Documento antigo; conjunto 2025/26 e 2026/27 não certificado'),
    '16': ('Referência institucional LFP', 'https://ligue1.com/fr/articles/l1_article_2837-noms-numeros-flocages-tout-savoir-sur-les-maillots', 'Referência não equivale a ficheiro com licença gratuita'),
    '17': ('Referência institucional LFP', 'https://www.lfp.fr/assets/24_25_Reglement_Integral_26_07_2024_1_2c3930f8d5.pdf', 'Regulamento anterior; fonte atual e licença não certificadas'),
    '78': ('Avery Dennison — apenas algumas federações identificadas', national, 'Espanha/Brasil/EUA/Canadá/Noruega; não cobre automaticamente todas as seleções'),
    '2136': ('Correspondência feminina por federação ainda não confirmada', national, 'Não extrapolar automaticamente conjuntos do Mundial masculino para seleções femininas'),
}
with (base / 'registers/leagues.csv').open() as file:
    groups = list(csv.DictReader(file))
rows = []
for group in groups:
    if group['category'] == 'TECHNICAL_OR_SPECIAL':
        continue
    supplier, source, finding = leads.get(group['league_id'], (
        'SEM_CONJUNTO_ATUAL_VERIFICADO', '',
        'Triagem sem conjunto completo aprovado; investigação individual de clubes/equipamentos pendente'))
    rows.append(dict(
        edition=group['edition'], candidate_group_id=group['league_id'],
        candidate_group=group['league_name'], candidate_team_records=group['team_records'],
        women_source_flag=group['women_source_flag'], category=group['category'],
        review_depth='GROUP_TRIAGE_NOT_EACH_KIT', supplier_or_reference=supplier,
        reference_url=source, finding=finding,
        game_licensed_universe='NOT_INDIVIDUALLY_CERTIFIED',
        exact_font_files='MISSING', current_season_textures='MISSING',
        free_public_digital_reuse='NOT_CONFIRMED',
        all_teams_and_variants_covered='NO', reviewed_date='2026-11-01'))
with (base / 'league-source-review.csv').open('w', newline='') as file:
    writer = csv.DictWriter(file, fieldnames=list(rows[0]))
    writer.writeheader()
    writer.writerows(rows)
print(f'{len(rows)} group/edition review rows; none marked as complete coverage')

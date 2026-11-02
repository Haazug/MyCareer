import json
from pathlib import Path

index = list(json.load(open('work/logo-index.json', encoding='utf-8')))

# (nomes no catálogo, fragmentos que têm de aparecer no slug "pais/slug")
Q = [
 (['Man Utd'], 'england/ manchester-united'),
 (["Nott'm Forest"], 'england/ nottingham-forest'),
 (['Wolverhampton Wanderers'], 'england/ wolverhampton'),
 (['Milton Keynes Dons'], 'england/ milton-keynes'),
 (['Olympique Lyonnais', 'OL', 'OL Lyonnes'], 'france/ lyon'),
 (['OM'], 'france/ marseille'),
 (['Stade Brestois 29'], 'france/ brest'),
 (['Stade Rennais FC'], 'france/ rennes'),
 (['Amiens SC'], 'france/ amiens'),
 (['Rodez Aveyron Football'], 'france/ rodez'),
 (['Laval MFC'], 'france/ laval'),
 (['Latium'], 'italy/ lazio'),
 (['Bergamo Calcio'], 'italy/ atalanta'),
 (['Lombardia FC'], 'italy/inter'),
 (['D. Alavés'], 'spain/ alaves'),
 (['R. Sporting'], 'spain/ sporting-gijon'),
 (['DUX Logroño'], 'spain/ logrono'),
 (['Madrid CFF'], 'spain/ madrid-cff'),
 (['Atltico de SL'], 'mexico/ san-luis'),
 (['Düsseldorf'], 'germany/ dusseldorf'),
 (['AZ'], 'netherlands/ az'),
 (['Excelsior'], 'netherlands/ excelsior'),
 (['OH Leuven'], 'belgium/ leuven'),
 (['R. Union St.-G.'], 'belgium/ union'),
 (['STVV'], 'belgium/ truiden'),
 (['Blau-Weiß Linz'], 'austria/ linz'),
 (['SK Rapid'], 'austria/ rapid'),
 (['WSG Tirol'], 'austria/ wsg'),
 (['Wolfsberger AC'], 'austria/ wolfsberger'),
 (['SC Austria'], 'austria/ austria'),
 (['Djurgårdens IF'], 'sweden/ djurgarden'),
 (['Halmstads BK'], 'sweden/ halmstad'),
 (['BK Hcken'], 'sweden/ hacken'),
 (['Hamarkameratene'], 'norway/ hamar'),
 (['Strømsgodset IF'], 'norway/ stromsgodset'),
 (['Tromsø IL'], 'norway/ tromso'),
 (['Brøndby IF'], 'denmark/ brondby'),
 (['FC København', 'F.C. København'], 'denmark/ copenhagen'),
 (['Odense BK'], 'denmark/ odense'),
 (['Sønderjyske Fodbold'], 'denmark/ sonderjyske'),
 (['Aarhus Gymnastikforening'], 'denmark/ aarhus'),
 (['HJK Helsinki'], 'finland/ hjk'),
 (['FC Lugano'], 'switzerland/ lugano'),
 (['Ferencvárosi TC', 'Ferencvárosi Torna Club'], 'hungary/ ferencvaros'),
 (['UTA Arad'], 'romania/ uta'),
 (['Universitatea Cluj', 'FC Univ. Cluj'], 'romania/ cluj'),
 (['Universitatea Craiova'], 'romania/ craiova'),
 (['Asociația Clubul Sportiv Petrolul 52'], 'romania/ petrolul'),
 (['FC Dinamo 1948'], 'romania/ dinamo'),
 (['FC Rapid 1923'], 'romania/ rapid'),
 (['Omonia FC'], 'cyprus/ omonia'),
 (['SJ Earthquakes'], 'usa/ san-jose'),
 (['Sporting KC'], 'usa/ sporting-kansas'),
 (['KC Current'], 'usa/ kansas-city'),
 (['NC Courage'], 'usa/ north-carolina'),
 (['Melb. Victory'], 'australia/ melbourne-victory'),
 (['WS Wanderers'], 'australia/ western-sydney'),
 (['Well. Phoenix'], 'wellington'),
 (['St. Pats'], 'ireland/ patrick'),
 (['Glasgow City FC'], 'scotland/ glasgow-city'),
 (['Argentinos Jrs.'], 'argentina/ argentinos'),
 (['Estudiantes', 'Asociación Atlética Estudiantes'], 'argentina/ estudiantes'),
 (['Gimnasia'], 'argentina/ gimnasia'),
 (["Newell's"], 'argentina/ newell'),
 (['Club Atlético San Martín'], 'argentina/ san-martin'),
 (['Instituto Atlético Central Córdoba'], 'argentina/ instituto'),
 (['IDV'], 'ecuador/ independiente-del-valle'),
 (['Nacional'], 'uruguay/ nacional'),
 (['UCV FC'], 'venezuela/ ucv'),
 (['Recoleta'], 'recoleta'),
 (['Gualberto Villarroel SJ'], 'bolivia/ villarroel'),
 (['Atl. Nacional'], 'colombia/ nacional'),
 (['LDU Quito'], 'ecuador/ ldu'),
 (['Beijing FC'], 'china/ beijing'),
 (['Chongqing FC'], 'china/ chongqing'),
 (['SZ Peng City'], 'china/ shenzhen'),
 (['Tianjin JMT FC'], 'china/ tianjin'),
 (['Zhejiang Pro'], 'china/ zhejiang'),
 (['Al Akhdoud Saudi Club'], 'saudi-arabia/ okhdood'),
 (['Mohammedan SC'], 'india/ mohammedan'),
]

draft, ambiguous, missing = {}, [], []
for names, spec in Q:
    terms = spec.split()
    hits = [k for k in index if all(t in k for t in terms)]
    for n in names:
        if len(hits) == 1:
            draft[n] = hits[0]
        elif hits:
            ambiguous.append((n, hits[:6]))
        else:
            missing.append(n)

Path('work/overrides-draft2.json').write_text(json.dumps(draft, ensure_ascii=False, indent=1), encoding='utf-8')
print(f'\n{len(draft)} certos (work/overrides-draft2.json)')
print(f'\n{len(ambiguous)} AMBÍGUOS (escolher à mão):')
for n, h in ambiguous:
    print(f'  {n}: ' + ' | '.join(h))
print(f'\n{len(missing)} NÃO EXISTEM no índice (ficam com emblema gerado):')
print('  ' + ', '.join(missing))
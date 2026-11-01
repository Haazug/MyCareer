# Touchline — auditoria antes da luz verde

Revisão: 1 de novembro de 2026. Âmbito: dependências do plano aprovado, sem iniciar a construção ou publicar o site.

## Resultado

**Não está demonstrada cobertura gratuita, autêntica e reutilizável de todos os equipamentos/fontes dos clubes e seleções licenciados de FC 26 e FC 27.** O plano funcional está definido; a biblioteca visual e a autorização do catálogo continuam incompletas. A recomendação anterior de tratar os recursos externos como um detalhe a resolver durante a construção era demasiado otimista para este requisito.

Foi criado um inventário interno por edição, equipa, equipamento e alteração por competição. Identificar um registo numa base não significa obter o respetivo modelo, textura ou fonte, confirmar a licença desse clube no jogo, nem obter autorização de utilização no nosso site. A pesquisa de fornecedores abaixo é uma triagem; não é uma validação visual manual concluída de cada camisola.

## 1. Universo e limites do inventário

Foram consultadas as páginas oficiais de [autenticidade FC 26](https://www.ea.com/games/ea-sports-fc/fc-26/news/fc-26-authenticity) e [FC 27](https://www.ea.com/games/ea-sports-fc/fc-27/news/fc-27-authenticity). Estas confirmam o âmbito geral, mas não constituem um manifesto completo de ficheiros/licenças por clube, equipamento e atualização. Seleções adicionadas num torneio ou no jogo rápido não passam automaticamente a estar disponíveis na carreira.

O leitor `eafc-db-kit@1.1.0` foi efetivamente executado sobre os snapshots que o próprio pacote distribui para as duas edições. A leitura terminou sem avisos. Não foram usados saves do utilizador, nem extraídas texturas/fontes do jogo. O pacote foi analisado numa pasta temporária, fora da aplicação.

| Registos da amostra candidata | FC 26 | FC 27 |
| --- | ---: | ---: |
| Equipas, incluindo grupos técnicos/especiais | 799 | 870 |
| Clubes candidatos | 742 | 774 |
| Seleções candidatas | 45 | 69 |
| Equipas técnicas/especiais candidatas | 12 | 27 |
| Linhas de equipamentos | 3 745 | 4 054 |
| Alterações de equipamento por competição | 950 | 1 029 |
| IDs distintos de lettering de números, tabela de equipamentos | 112 | 122 |
| IDs distintos de lettering de nomes, tabela de equipamentos | 69 | 79 |
| Jogadores | 20 201 | 21 623 |
| Linhas de treinadores | 799 | 870 |
| Equipamentos aprovados visualmente e prontos no projeto | **0** | **0** |

Os totais são medidas destes snapshots, **não contagens oficiais de clubes licenciados nem de fontes físicas diferentes**. Incluem dados técnicos/legados. A data e a correspondência exata à atualização oficial ainda não foram autenticadas.

Limitações concretas encontradas:

- Há 1 260 referências de equipamento no FC 26 e 1 368 no FC 27 sem equipa correspondente na tabela de equipas da mesma amostra. Foram preservadas como não resolvidas; não foram atribuídas a clubes por adivinhação.
- `year=0` não é uma temporada de calendário. É necessário identificar a temporada real através do recurso e de uma referência verificável.
- `isgeneric=0` não comprova licença, autenticidade ou disponibilidade na carreira. Os grupos incluem equipas técnicas e personalizadas.
- A tabela de nacionalidades tem 218/219 entradas; não representa a lista de seleções jogáveis.
- O sinalizador de treinador `islicensed` não comprova que a identidade seja selecionável como treinador/treinadora real na carreira. Isso ainda precisa de validação por edição/modo.
- A licença MIT da ferramenta abrange o código da ferramenta. Não resolve os direitos sobre as bases do jogo, retratos, marcas, fontes ou equipamentos distribuídos com ela.

### Ficheiros produzidos

- [Resumo e hash da evidência](evidence-summary.json).
- [Equipas](registers/teams.csv): 1 669 linhas, com género de origem, grupo, equipamento e estados de falta.
- [Equipamentos](registers/kits.csv): 7 799 linhas, com IDs de fontes de nome/número/calção e patches existentes na origem.
- [Variantes por competição](registers/competition-overrides.csv): 1 979 linhas. IDs de competição ainda não equivalem a uma correspondência visual validada.
- [Lettering](registers/fonts.csv): 665 combinações de edição/tipo/ID; todas com ficheiro em falta. Não são 665 ficheiros obtidos.
- [Grupos/ligas](registers/leagues.csv) e [treinadores](registers/managers.csv).
- [Triagem de fontes por grupo](league-source-review.csv), incluindo grupos femininos e seleções, com lacunas explícitas.
- [Verificação dos campos de jogadores](player-field-check.json), incluindo a lacuna do preço antes do scout.
- [Script de geração](scripts/build-registers.py). Requer o JSON candidato previamente descodificado; não descarrega recursos nem concede licenças.

Os CSV derivados estão em `audit/registers/`, com exclusão preparada em `.gitignore` para evitar republicar dados de origem cuja reutilização ainda não está estabelecida. Esta exclusão não significa que os dados estejam aprovados para uso privado ou público: é apenas uma medida para não os enviar por engano.

## 2. Fontes e uniformes: resultado da pesquisa

Não foi encontrado um pacote gratuito com autorização clara para incorporar, personalizar e distribuir no browser o lettering e os uniformes de todo este universo.

| Grupo | Evidência encontrada | O que continua em falta |
| --- | --- | --- |
| Premier League | [Liga confirma Avery Dennison para nomes, números e patches até 2029/30](https://www.premierleague.com/en/news/4299181/premier-league-and-avery-dennison-extend-licensing-partnership-for-five-more-years) | Ficheiros/glifos e condições de uso digital; cores, variantes e alternativas de competições europeias por clube |
| Liga Portugal | [Parceria oficial com Avery Dennison](https://www.averydennison.com/na/en/industries/apparel/news/press-release-avery-dennison-liga-portugal-strategic-partnership-agreement) | Recursos utilizáveis e autorização; distinguir lettering doméstico e europeu, masculino/feminino e temporada |
| MLS | [Fornecedor confirma extensão da licença](https://www.averydennison.com/en/home/news/press-releases/major-league-soccer-and-avery-dennison-extend-licensing-agreement.html) | Não foi encontrada oferta pública de fonte digital com licença gratuita compatível |
| EFL, WSL e competições UEFA | [ID UNLIMITED, anteriormente Sporting iD, apresenta parcerias e produtos](https://id-unlimited.ie/) | Parceria/fornecimento físico não comprova fonte web disponível nem identidade de todos os conjuntos atuais |
| Serie A | [Regulamento de equipamentos 2024–2027](https://img.legaseriea.it/vimages/686538c6/1%20-%20Regolamento%20Divise%20da%20Gioco%202024-2027.pdf); [Stilscreen redireciona para ID UNLIMITED Italy](https://www.stilscreen.com/) | Fonte/glifos utilizáveis, condições e exceções por competição; o redirecionamento não certifica sozinho uma licença digital atual |
| LaLiga e Ligue 1/2 | Regras/documentos de lettering e referências institucionais encontrados | Documentos antigos não certificam por si só 2025/26 e 2026/27; faltam ficheiros, cores e licença digital verificável |
| Clubes com lettering próprio | [Barcelona confirma fontes diferentes por equipamento](https://www.fcbarcelona.com/en/news/4588557/special-typeface-for-each-kit); [Villarreal apresenta La Grogueta](https://villarrealcf.es/es/la-grogueta-una-nueva-tipografia-para-el-villarreal-cf/) | Validar cada combinação clube/temporada/equipamento/competição; não aplicar uma fonte única a todo o clube |
| Seleções | [Avery identifica conjuntos de Espanha, Brasil, EUA, Canadá e Noruega em 2026](https://www.averydennison.com/na/en/industries/apparel/perspectives/fifa-world-cup-official-federation-names-and-numbers) | Oferta refere personalização física; faltam ficheiros e direitos digitais, restantes seleções e variantes femininas/masculinas |
| Benfica 2025/26 | [Candidato com download anunciado](https://nerodesignapparel.com/?p=2167), limitado a uso pessoal/não comercial | Não descarregado; origem e permissão de incorporação/redistribuição pública por esclarecer. Uso pessoal não equivale automaticamente ao nosso site público |
| Restantes ligas/clubes e seleções | IDs candidatos registados, com pesquisa de fontes ainda sem cobertura confirmada | Nenhum conjunto completo foi aprovado. Falta verificação individual; não assumir que Adidas/Nike/Puma impõem a mesma fonte a todas as equipas |

Uma fonte descarregável de um fórum ou uma reprodução vendida por terceiros não comprova autorização do titular. Converter OTF em WOFF2, vetorizar números ou usar um atlas de glifos não resolve uma licença em falta. Um conjunto autorizado de glifos/texturas pode servir tecnicamente; não é obrigatório que a entrega seja TTF.

O registo final terá de guardar, por recurso: edição e atualização; clube/seleção e equipa masculina/feminina; temporada real; principal/alternativo/terceiro/guarda-redes; competição; gola e corte; nome/número e cores; patches, emblemas e patrocinadores; autor/titular; URL de origem; ficheiro e hash; licença/condições; atribuição; permissão de adaptação, cache, exposição pública e distribuição; data da verificação e evidência visual.

Não basta encontrar uma fotografia frontal de uma camisola para a considerar uma textura 3D pronta: faltam costas, mangas, UVs e detalhes de estampagem. Nomes criados pelo utilizador exigem os glifos adequados, incluindo diacríticos e as regras reais de inscrição no equipamento.

### Relação com a política EA

A [política oficial de conteúdo EA](https://help.ea.com/en/articles/security-and-rules/ea-content-policy/) admite determinados projetos de fãs sob condições, mas proíbe obter assets por data mining e esclarece que não concede direitos sobre conteúdo de terceiros presente nos jogos. Logo, extrair uniformes/fontes do FC não foi adotado como solução de produção. Os créditos e o aviso de não afiliação serão necessários quando aplicáveis; não substituem condições de reutilização dos recursos.

## 3. Bases e APIs

| Fonte | Estado verificado | Decisão no plano |
| --- | --- | --- |
| eafc-db-kit | Leitura das duas amostras testada; publicação do catálogo e fidelidade à atualização ainda não validadas | Candidato técnico, não base de produção aprovada nem importador de qualquer save/plataforma |
| [SoFIFA](https://sofifa.com/document) | Plano gratuito condicionado a projeto não comercial, base própria e atribuição; acesso não testado com credenciais | Complemento condicionado; não presumir que resolve o arranque sem base própria autorizada |
| [EA Community API](https://help.ea.com/en/articles/ea-sports-fc/community-api/) | Ligação oficial reservada a parceiros aprovados | Não disponível para este projeto; não prometer sincronização automática do save/login EA |
| [EA Ratings](https://www.ea.com/games/ea-sports-fc/ratings) | Consulta oficial; não se demonstrou licença de republicação em massa nem API aberta suportada para todos os campos de carreira | Referência; endpoints usados pelo site público não são automaticamente uma API autorizada para terceiros |
| [API-Football](https://www.api-football.com/pricing) | Plano gratuito com 100 pedidos/dia e temporadas limitadas; [termos](https://www.api-football.com/terms) não concedem direitos gerais de imagem | Complemento de futebol real, condicionado; não substitui OVR/potencial/PlayStyles do FC |
| [TheSportsDB](https://www.thesportsdb.com/documentation) | API pública 123 respondeu; teste de equipamentos limitado a dois resultados por equipa | Não aprovada como fonte principal de uniformes atuais |
| [zerozero](https://api.zerozero.pt/contact) | API oficial por contacto; acesso gratuito permanente não confirmado; páginas da API devolveram 403 | Sem dependência funcional até existir acesso compatível |
| [Transfermarkt](https://www.transfermarkt.com/intern/anb) | Não se confirmou API pública gratuita autorizada; termos restringem acesso automatizado | Referência e ligações externas; sem scraping |
| [BeSoccer](https://api.besoccer.com/en/budgets) | Página declara não ter contas gratuitas | Excluída como dependência gratuita permanente |
| [FCScoutDB](https://fcscoutdb.com/terms) | Consulta pessoal gratuita, mas termos proíbem scraping e republicação da base | Não é fonte de importação nem reserva autorizada |
| FCRadar | Condições identificadas na pesquisa anterior restringem produtos concorrentes de base/scouting | Não selecionada como núcleo deste tracker |
| [OpenFootball](https://github.com/openfootball/clubs/blob/master/LICENSE.md) | Dados de clubes em domínio público | Complemento possível de identidade; não fornece catálogo FC, uniformes ou direitos das marcas |
| [Frankfurter](https://frankfurter.dev/) | Conversão EUR→GBP/USD/BRL respondeu HTTP 200 sem chave | Candidato verificado para câmbio de apresentação, ainda não integrado |

### Testes de API executados

Resultados reduzidos em [public-api-checks.json](public-api-checks.json):

- TheSportsDB encontrou Arsenal e Benfica. Equipamentos: Arsenal 2019/20; Benfica 2021/22. São resultados efetivos da amostra gratuita, inadequados à regra atual/anterior de 2025/26 ou 2026/27. O teste não demonstra ausência desses recursos em outros planos, apenas que a chamada gratuita ensaiada não os forneceu.
- A resposta de equipamento não trouxe um ficheiro de fonte nem licença de reutilização por imagem. Os [termos do serviço](https://www.thesportsdb.com/docs_terms_of_use.php) exigem atenção à origem de cada imagem.
- Frankfurter devolveu taxas datadas de 30/10/2026. Data do câmbio terá de aparecer; taxa indisponível não deve tornar valores desconhecidos em zero. Valores originais do save permanecem preservados.

A reserva continua a exigir fonte equivalente e autorizada. Uma API de futebol real não substitui silenciosamente atributos FC. Uma cópia local só é reserva se pudermos conservá-la e reutilizá-la nas condições da origem.

### Jogadores, preços e dados do save

A segunda leitura técnica confirmou campos de atributos, OVR, potencial, posições, identificação de nomes e relações equipa/jogador. Foram lidas 145 propriedades por registo FC 26 e 152 por registo FC 27 nesta amostra. Os campos de traits e a tabela de PlayStyles existem, mas a descodificação, os nomes traduzidos e a correspondência visual ainda não foram validados.

**O preço estimado antes de adicionar ao scout continua pendente.** A tabela de jogadores FC 26 examinada não trouxe um campo direto de valor de mercado; a tabela de contratos de carreira desta amostra está vazia. No FC 27 foram encontrados `wage` e `releaseclause`, que não equivalem ao preço de transferência. Não se demonstrou uma importação de valor de carreira/xTV nem um estimador próprio calibrado. Precisamos de um valor FC de fonte compatível ou de uma estimativa própria identificada, com método/data e testes; não apresentar salário, cláusula ou valor real do Transfermarkt como se fossem esse preço.

IDs de cabeça/rosto não fornecem retratos nem ficheiros de face 3D. Presença num plantel de uma base não comprova identidade real/licença individual. OVR observado com mínimo 1 na amostra também exige filtrar registos técnicos antes de publicar a pesquisa de jogadores.

Jogos, golos, assistências, classificações, lesões, confiança do técnico, transferências, academia e alterações do save serão registados pelo utilizador ou importados de formatos efetivamente testados. Nenhuma API de resultados reais pode preencher automaticamente esses acontecimentos da carreira. Esquema histórico, regras de cálculo e importação segura são trabalho de construção, sem necessidade de contratar uma API para cada menu.

## 4. Restantes recursos em falta

| Recurso | Existe / foi verificado | Falta antes de declarar pronto |
| --- | --- | --- |
| Retratos reais | Wikimedia Commons: API respondeu HTTP 200; [amostra e metadados](portrait-api-check.json). [Fotografia de 2010](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo,_2010.jpg) permite reutilização com atribuição; [outra de 2018](https://commons.wikimedia.org/wiki/File:Cristiano_Ronaldo_2018.jpg) tem CC BY-SA 3.0 | Correspondência inequívoca de pessoas, cobertura feminina/masculina, qualidade do recorte e licença por foto. Não há retratos de todos os atletas nem faces 3D obtidas |
| Jogadores criados, jovens e regens | Dados pertencem ao save e podem ser registados manualmente | Não existem fotos reais desses indivíduos. Suportar imagem escolhida pelo utilizador/sem retrato; não gerar uma falsa fotografia oficial |
| Emblemas, patches, bolas e patrocínios | Referências de fornecedores e IDs | Ficheiros corretos, variantes e condições por elemento; foto de catálogo/loja não concede redistribuição |
| Balneário e museu 3D | Referência visual recebida; Blender disponível neste ambiente | Modelação própria cuidada, UVs, materiais, iluminação, cabines, navegação, acessibilidade e avaliação visual. Nenhum GLB/GLTF/FBX está no projeto |
| Camisolas, casacos, polos e cachecóis | Especificação aprovada | Modelos/cortes e texturas reais; aprovar frente/costas, gola, mangas, tecido e detalhes próximos; não usar os SVG de protótipo como entrega final |
| Troféus e prémios 3D | Candidato [troféu Premier League no Sketchfab](https://sketchfab.com/3d-models/epl-trophy-2cc08290825643018413bba2ef165b9f), licença indicada CC BY | Ficheiro não adquirido; verificar autor/versão, direitos representados, qualidade e otimização. Nenhuma coleção completa aprovada |
| Materiais e iluminação | [Poly Haven](https://polyhaven.com/license) e [ambientCG](https://docs.ambientcg.com/license/) confirmam CC0 para os seus recursos | Selecionar materiais fotografados/adequados e ficheiros concretos, registar autoria e otimizar. Estas licenças não abrangem marcas dos clubes |
| Fonte da interface | [Manrope/OFL](https://github.com/google/fonts/blob/main/ofl/manrope/OFL.txt) é candidata gratuita com licença clara | Ficheiros locais e integração; não substitui as fontes dos equipamentos |
| Física e transições | Solução técnica prevista: React Three Fiber/Three.js e simulação seletiva com Rapier | Bibliotecas ainda não instaladas, nem testes de colisões, toque/click, movimento reduzido ou desempenho |
| Fotografias de decoração/ídolos | Podem ser substituídas por frases/símbolos reais escolhidos, conforme aprovado | Proveniência e direitos das peças efetivas. `public/stadium.jpg` tem origem numa URL Unsplash, mas fotógrafo/página original ainda não identificados para os créditos |
| Traduções | Seis idiomas e terminologia definidos | Textos efetivos pt-PT/pt-BR/en/fr/es/it e revisão de datas, plurais, género e vocabulário de época/temporada/season/saison/temporada/stagione |
| Áudio | Não é requisito aprovado | Não acrescentar música ou sons licenciados como dependência surpresa |

## 5. Contas, IA, alojamento e legal

| Dependência | Condições confirmadas | Configuração/trabalho pendente |
| --- | --- | --- |
| [Vercel Hobby](https://vercel.com/docs/plans/hobby) | Gratuito para projetos pessoais não comerciais, com quotas; a documentação consultada indica 100 GB de transferência | Importar o GitHub depois de existir build válido, testar rotas/funções e medir transferência dos assets. Sem upgrades automáticos nem promessa de tráfego ilimitado |
| [Supabase Free](https://supabase.com/pricing) | 500 MB de base, 1 GB de ficheiros e 5 GB de egress, além de 5 GB em cache; projetos podem pausar por inatividade | Utilizador configura projeto; faltam esquema/migrações/RLS, região, chaves públicas apropriadas, storage privado, conflitos e sincronização entre dispositivos |
| Email de autenticação | [SMTP padrão não é serviço para produção](https://supabase.com/docs/guides/auth/auth-smtp): restringe destinatários à equipa do projeto e tem limites baixos | Configurar SMTP próprio compatível com orçamento ou um fluxo OAuth adequado. Não desativar confirmações como atalho, nem anunciar login público por email antes do teste |
| Cópias e eliminação | Exportação local prevista | Não presumir backups geridos de um plano pago. Preparar cópias autorizadas, teste de restauro e eliminação coerente com a retenção anunciada |
| [Groq Free](https://console.groq.com/docs/billing-faqs) | Plano gratuito documentado, quotas partilhadas pela organização e [condições de dados](https://console.groq.com/docs/your-data) a refletir no produto | Sem chave, chamadas reais, escolha de modelo e avaliação de respostas; limitar contexto, chamadas e custos a zero |
| [WebLLM](https://webllm.mlc.ai/docs/user/get_started.html) | Opção local via WebGPU; exige descarregar modelo | Modelo/licença específicos, tamanho, compatibilidade e desempenho em conjunto com o 3D por verificar; não ativar download grande silenciosamente |
| Reserva IA | Requisito de custo zero preservado | Testar titular/reserva; passagem de local para remoto tem de ser explícita. Não transmitir dados privados inesperadamente nem depender da IA para calcular estatísticas |
| Privacidade UE/Brasil | Mercados confirmados pelo utilizador | Identidade e contacto do responsável, fornecedores reais, finalidade/bases legais, região, transferências internacionais, retenções, exportação/eliminação e canal de contacto |
| Cookies | Mecânica depende das integrações realmente usadas | Inventariar cookies/local storage e requests externos. Consentimento/rejeição para o que o exigir, com revogação; não afirmar genericamente que nenhum fornecedor recolhe dados |
| Créditos e marcas | Utilizador pede crédito para todas as marcas representadas | Registo por recurso, autor, licença e alteração. Lista de marcas separada da licença dos ficheiros; aviso de projeto não afiliado quando aplicável |
| Nome do produto | “Touchline” é provisório | Disponibilidade do nome/marca não foi verificada; não pressupor domínio comprado. Subdomínio gratuito basta para o requisito de custo zero |

Estas são dependências concretas do produto pedido, não serviços contratados nem contas criadas. Nenhum fornecedor foi contactado e não foi assumido um custo pago.

O [registo de lacunas](missing-dependencies.csv) separa obtenção de recursos/licenças, configuração de contas e criação durante a implementação. “Em falta” não quer dizer que tudo dependa de um serviço externo.

## 6. Estado técnico real

O [inventário local e resultado do build](local-inventory.json) confirma:

- React/TypeScript/Vite com páginas e formulários iniciais, anteriores a boa parte do plano.
- Nenhum ficheiro de fonte tipográfica ou modelo 3D nas pastas do produto; apenas `public/stadium.jpg` como imagem fotográfica local.
- `npm run build` falhou porque `src/main.tsx` importa `./styles.css`, que não existe. TypeScript passou nessa execução; a aplicação completa não foi validada.
- Não estão ligados fornecedores de dados, autenticação, sincronização ou IA.
- O modelo atual ainda usa época em texto, um único onze e operações financeiras simples. Não implementa o esquema histórico aprovado.
- Ainda faltam os testes dos percursos completos, dos quatro papéis, do isolamento entre contas, dos cálculos/edições e do desempenho 3D.
- O código local não foi enviado para GitHub nem publicado na Vercel nesta auditoria.

Não foi corrigido o protótipo nem iniciada a modelação nesta fase: a construção continua dependente da luz verde pedida pelo utilizador.

## 7. Condições para fechar esta auditoria

1. Fixar o catálogo oficial verificável por edição/atualização/modo, distinguindo licença de liga, clube, atleta e seleção. Confrontá-lo com os candidatos; resolver referências em falta sem contar grupos técnicos como clubes.
2. Completar cada linha do catálogo de equipamentos e lettering com ficheiro real, temporada/variante/equipa correta, direitos compatíveis e evidência visual. Incluir guarda-redes, variantes de competição e seleções masculinas/femininas. Não marcar como coberto um clube por existir apenas a camisola principal sem costas/fontes.
3. Obter licença pública compatível ou autorização dos titulares para lacunas proprietárias. Nenhuma pesquisa adicional, crédito ou conversão de formato substitui uma autorização que não existe nos termos encontrados.
4. Selecionar recursos reais de retratos, patches, troféus e decoração; fechar o manifesto de recursos. Nenhum candidato foi aprovado para todo o catálogo.
5. Distinguir o que só será criado/testado durante a construção — modelos 3D próprios, física, interface, cálculos e sincronização — das fontes externas que precisamos de comprovar antes de prometer cobertura total.
6. Configurar contas/chaves, autenticação e dados legais quando o utilizador preparar o Supabase e o alojamento; testar o percurso público antes de publicar.

**Estado atual: pesquisa e inventário realizados; validação individual e obtenção de toda a biblioteca pendentes.** O requisito de todos os uniformes autênticos mantém-se. Não foi trocado por “alguns clubes”, camisolas genéricas, fontes aproximadas ou um plano pago.

Foi preparada uma [minuta concreta de pedido de recursos](RESOURCE-PERMISSION-DRAFT.md), sem envio nem contacto com terceiros. Eventuais respostas e condições terão de ser registadas por recurso; ausência de resposta não é aprovação.

# MyCareer — plano do produto

## Estado

A luz verde para a construção foi recebida em 1 de novembro de 2026. O projeto avança por etapas, sem publicitar como autêntico nenhum catálogo ou recurso visual que ainda não tenha fonte/licença confirmada. O utilizador aprovou as recomendações de organização/entrega, a comparação das duas IAs e a possibilidade de titular/reserva. Repositório escolhido: https://github.com/Haazug/CAREERTRACKER. Destino pretendido: Vercel; não publicar nem configurar serviços sem necessidade de entrega.

## Direção visual aprovada

- Estilo minimalista com 3D chamativo: espaço, tipografia clara, poucas cores e navegação simples; camisolas, iluminação e troféus são os elementos de destaque.
- Autenticidade visual explicitamente exigida: fotografia real e recursos identificados, materiais 3D credíveis, equipamentos e emblemas corretos quando disponíveis. Evitar imagens com aparência de IA, colagens genéricas, escudos inventados e patrocínios fictícios apresentados como equipamento real.
- A direção é elegante e sóbria: composição cuidada, escala e iluminação realistas, acabamentos de tecido/metal/madeira e tipografia legível, com cores do clube usadas de forma contida.
- Os SVG de camisolas genéricas, emblemas por iniciais e atributos de demonstração do código atual são protótipos. Não satisfazem os requisitos finais de autenticidade; substituir por recursos adequados na versão final.
- Balneário inspirado na referência enviada: camisolas penduradas e ficha individual ao selecionar um jogador.
- Referência arquitetónica principal: balneário do Estádio da Luz. Aguardar as imagens adicionais prometidas antes de fechar a composição. Adaptar cores, números, nomes e emblemas ao clube escolhido, mantendo a estrutura visual aprovada.
- Separar cenário, equipamento, emblema, tipografia e cores em recursos configuráveis; trocar de clube não deve exigir reconstruir a cena. Não afirmar fidelidade exata nem reutilizar assets oficiais sem os recursos adequados.
- Decoração personalizável do balneário, inspirada nas molduras da referência: pode usar fotografia real de ídolo/momento, frase/mote do clube, emblema ou símbolo/mascote. Fotografias de ídolos não são obrigatórias.
- Exemplos pedidos pelo utilizador: COYS para Tottenham, diabo vermelho para Manchester United e águia para Benfica. Usar recursos identificados/permitidos ou texto definido pelo utilizador, sem gerar imitações de fotografias oficiais por IA.
- Guardar temas por clube com imagem/texto, fonte/autor quando aplicável, cores, localização e visibilidade dos elementos decorativos. Permitir trocar decoração sem alterar o plantel ou as recordações do museu.
- Manter decoração contida, coerente com a arquitetura da Luz e com leitura limpa das camisolas; não transformar todas as superfícies em painéis informativos.
- Esclarecimento da referência: o vestiário deve ser um recinto 3D contínuo inspirado na arquitetura da Luz, com cabines individuais. A experiência solicitada é percorrer esse espaço com a câmara, não apenas apresentar camisolas/cabides isolados como cartões de uma galeria.
- Regra de equipamentos flexibilizada pelo utilizador: é aceitável usar camisola autêntica do clube da temporada corrente da biblioteca ou da temporada imediatamente anterior, mesmo quando a passagem do atleta no museu pertence a outra época. Identificar discretamente a temporada real do equipamento como representação visual; não apresentar uma réplica histórica exata sem confirmação.
- Tipografia de nomes/números é uma dependência própria do equipamento: identificar clube, temporada, variante e competição, com ficheiro tipográfico ou conjunto de glifos/texturas autorizado e verificação visual em frente/costas.
- Estado verificado dos ficheiros: o projeto ainda não contém fontes oficiais de camisolas; o SVG de protótipo usa Arial/Impact. Não anunciar tipografia autêntica integrada enquanto esses recursos não forem obtidos e validados.
- Pesquisa de candidato Benfica 2025/26: https://nerodesignapparel.com/?p=2167 anuncia download gratuito de OTF/PDF/CDR, mas declara apenas uso pessoal/não comercial. Isso não confirma autorização para incorporar ou redistribuir o ficheiro num site público; condições e legitimidade da disponibilização ainda por esclarecer. Não descarregado nem integrado.
- A flexibilização do ano do equipamento permite escolher a versão atual/anterior cujo conjunto completo de recursos seja utilizável; não autoriza chamar fonte oficial a uma aproximação genérica. Guardar autor, origem e condições da fonte nos créditos.
- Reservar cenários imersivos para balneário, sala de troféus e museu do percurso; manter formulários, estatísticas e finanças limpos.
- Funcionar em computador e telemóvel.
- Camisolas e troféus 3D reais com rotação e interação; os SVG atuais são apenas protótipos, não satisfazem este requisito final.
- Requisito de qualidade reforçado pelo utilizador: modelos 3D bem executados e identificáveis, sem aparência genérica ou de placeholder. Exigir proporções, silhueta, golas, mangas, costuras e caimento credíveis nas camisolas; acabamentos e formas adequados em troféus, bolas, casacos e cachecóis.
- Preparar geometria, UVs e texturas com resolução adequada; representar tecido, metal, madeira e vidro com materiais/iluminação coerentes, evitando brilho plástico uniforme, estampas deformadas e emblemas ilegíveis.
- Reutilizar geometria entre variantes quando apropriado é uma decisão técnica, não autorização para uniformizar todos os clubes. Identidade visual, estampas, cores, tipografia e detalhes devem corresponder ao recurso real escolhido.
- Modelar/adaptar recursos próprios ou usar modelos de autores cujas condições permitam a integração. O requisito de custo zero mantém-se; recursos pagos não são uma dependência assumida.
- Antes de tratar o cenário como versão final, rever camisola de frente/costas, vista próxima e no balneário, além de uma peça do museu, em resoluções de computador e telemóvel. Prototipagem temporária não equivale à aprovação do modelo final.
- As variantes de desempenho preservam silhueta e identidade; otimizar texturas, luzes e complexidade sem trocar os recursos finais por camisolas ou emblemas inventados.
- Transições e animações fluidas: priorizar transformações e opacidade, carregar cenas sob demanda, reutilizar modelos e texturas e reduzir qualidade conforme o dispositivo.
- Validar fluidez em dispositivos representativos, com objetivo de 60 fps quando o hardware permitir, sem prometer esse desempenho universalmente.
- Respeitar movimento reduzido, pausar animações fora do ecrã e oferecer apresentação estática quando WebGL não estiver disponível. O movimento não deve bloquear ações nem a leitura.

## Físicas e transições aprovadas

- Adicionar comportamento físico aos objetos 3D quando melhorar a interação: peso/inércia, gravidade, amortecimento e colisões adequadas ao objeto e cenário.
- Camisolas e cachecóis podem oscilar suavemente nos suportes e reagir à interação com flexão/caimento credíveis. Não prometer simulação completa de tecido para todos os modelos/dispositivos; avaliar rig/deformação controlada ou simulação seletiva conforme a qualidade e o desempenho obtidos.
- Bolas podem rolar, girar e ressaltar ao interagir; troféus e outros objetos rígidos têm peso e limites de movimento coerentes. Não fazer todas as peças flutuar, rodar continuamente ou saltar como brinquedos.
- Vitrines, molduras e suportes delimitam o movimento; peças de exposição mantêm a posição estável por predefinição. Arrastar/girar uma peça para inspeção não pode fazê-la atravessar superfícies nem perder-se fora da cena.
- Separar movimento de inspeção/apresentação de operações sobre dados: tocar, mover ou deixar cair uma peça não altera uma conquista, transferência ou registo de partida.
- Transições entre balneário, ficha e museu com aproximação/recuo de câmara, orientação e enquadramento consistentes; no UI, usar transições curtas de entrada/saída, foco e hierarquia preservados, sem atrasar o acesso ao conteúdo.
- Transições de chegada/promoção/despedida reutilizam o modelo real, com movimento amortecido e possibilidade de saltar. A passagem de uma camisola para a sua ficha pode manter continuidade visual, sem carregar toda a aplicação 3D a cada navegação.
- Aplicar físicas apenas aos objetos ativos/próximos/interativos; deixar objetos em repouso e pausar cenas invisíveis. Utilizar colisores simplificados, recursos reutilizados e atualização temporal estável quando houver motor físico.
- Avaliar um motor físico compatível com a stack Three.js/React Three Fiber durante a construção; a escolha e os parâmetros dependem dos testes. Não adicionar dependências pesadas apenas para efeitos decorativos que possam ser obtidos com animação controlada.
- Permitir qualidade automática e modo de desempenho; reduzir primeiro a simulação/efeitos mantendo os modelos e identidade visual. Coordenar a carga de físicas, 3D e WebLLM para não bloquear formulários nem navegação.
- Respeitar movimento reduzido, oferecer ações equivalentes por toque/teclado e evitar interações dependentes apenas de hover ou arrasto. Uma apresentação estática deve permitir abrir a mesma ficha.
- Validar estabilidade, colisões, fluidez, retorno ao enquadramento e navegação em computador/telemóvel. Não declarar físicas completas ou 60 fps universais antes dos testes.

## Vestiário navegável e acesso às fichas

- Criar uma cabine própria para cada atleta do plantel ativo, com identidade estável associada ao ID do jogador/jogadora, nome, número e equipamento adequado. Distinguir a posição física da cabine da posição tática no onze.
- A câmara pode deslocar-se pelo recinto e visitar as várias cabines, mantendo continuidade espacial e orientação reconhecível. Não reduzir a navegação a uma troca de imagens sem deslocação na cena.
- Preparar percursos/pontos de câmara adequados à arquitetura, com altura e enquadramentos confortáveis, limites que respeitem paredes, bancos e objetos e movimento suave sem atravessar o cenário.
- Navegação em computador por arrasto para explorar e controlos visíveis de anterior/seguinte; oferecer teclado quando a cena tem foco. Em telemóvel, permitir gesto de deslizar e os mesmos botões. A rota de câmara é da cena real, mesmo que existam controlos discretos de visita às cabines.
- Clicar/tocar numa cabine ou na sua camisola abre a PÁGINA da pessoa correspondente, com atributos, evolução, estatísticas, contrato e percurso segundo as permissões do modo. Esta exigência substitui a ficha apenas em modal como destino principal no protótipo atual.
- Separar arrasto de navegação e clique de seleção, evitando abrir fichas acidentalmente ao mover a câmara. Indicar discretamente a cabine focada e o atleta disponível para abrir, com alternativa acessível em lista.
- A página do atleta deve ter identidade/rota estável dentro da carreira e ação de voltar ao vestiário. Preservar a cabine visitada, posição/orientação da câmara e filtros relevantes ao regressar, em vez de reiniciar sempre à entrada.
- Nos modos de treinador/treinadora, permitir editar/gerir conforme as permissões. Nos de jogador/jogadora, a consulta de colegas não concede controlo do plantel, mercado ou atributos que o utilizador não deva gerir naquele contexto.
- O número de cabines acompanha o plantel sem duplicar atletas. Atualizar a ocupação após movimentos efetivos, preservando históricos e evitando mover inesperadamente o foco durante uma interação.
- Renderizar prioritariamente a zona visível e reduzir físicas/animações distantes. Carregar setores ou recursos conforme necessário para suportar plantéis maiores sem comprometer o percurso.
- Respeitar movimento reduzido com deslocações abreviadas/instantâneas entre posições e acesso às mesmas páginas por lista. Os controlos não devem exigir hover nem movimentos de rato contínuos.

## Vestiário por contexto: dia normal, pré-jogo e pós-jogo

- Estados visuais aprovados: dia normal com cabines sem camisolas; dia de jogo/pré-jogo com equipamentos preparados; pós-jogo com recordações dos feitos efetivamente registados.
- Usar a data do calendário do save e o encontro selecionado, não a data real do dispositivo, para determinar o contexto. Mostrar discretamente o contexto ativo e permitir regressar à vista normal ou rever outro encontro.
- Em dias normais, manter as cabines individuais e a identidade do atleta, com a camisola ausente. A cabine continua clicável e abre a página do jogador/jogadora; decoração permanente, nome/número da cabine e funções de navegação não desaparecem.
- Em dia de jogo, apresentar as camisolas com as costas voltadas para a câmara, nomes e números legíveis. Equipamentos de campo e de guarda-redes, variante casa/fora/alternativa e detalhes devem corresponder à seleção do jogo e aos recursos autênticos disponíveis.
- Preparar as cabines dos convocados conforme a escalação/plano associado à partida. Se não houver convocatória definida, indicar que a preparação ainda está por completar e permitir escolher um plano, em vez de inventar titulares.
- Patches, marcas e detalhes de competição podem variar segundo competição e variante de equipamento. Só aplicar os recursos efetivamente disponíveis e adequados; não inventar badges oficiais nem afirmar fidelidade a um patch ausente.
- Guardar a configuração visual do equipamento preparado (recurso, número, nome, patches, variante e competição) ligada ao contexto da partida, permitindo rever o cenário sem substituir silenciosamente os recursos de outra época/encontro.
- No pós-jogo, manter o contexto da partida e colocar na cabine do atleta correspondente a bola de hat-trick e a peça/distinção de Man of the Match / melhor em campo quando existirem registos que as sustentem.
- Hat-trick: três ou mais golos válidos daquele atleta na partida, com as regras já definidas de exclusão de autogolos e desempate por penáltis. Identificar autor e total real; não atribuir a bola ao protagonista se o feito foi de um colega.
- Man of the Match depende de indicação/importação validada do prémio. Não o atribuir automaticamente ao jogador com maior nota quando não houver informação suficiente de todos os participantes. Usar uma peça adequada ao prémio real quando disponível ou identificar uma representação comemorativa do tracker, sem inventar um troféu oficial.
- Considerar vários premiados/hat-tricks quando registados, tanto no universo masculino como feminino, com termos e autoria corretos. Os objetos pós-jogo são apresentados no lugar do respetivo atleta e não adicionados a todas as cabines.
- A peça pós-jogo abre a ficha da partida/feito e pode ser guardada no museu. Partilhar a identidade da conquista entre vestiário e museu para evitar duplicar prémios, bolas ou estatísticas.
- Distinguir exibição temporária pós-jogo de recordação permanente escolhida para o museu. Ao mudar para um dia normal, as recordações temporárias saem da cena sem apagar os seus registos ou peças guardadas.
- Rever um jogo antigo recria o contexto histórico guardado; correções posteriores de golos/prémios sinalizam e atualizam as peças afetadas conforme as regras de consistência do museu.
- As mudanças de estado usam transições suaves, respeitam movimento reduzido e não obrigam a assistir a animações antes de abrir a página de um atleta.

## Âmbito da carreira

- Entrada, iniciar/continuar carreira, jogador/treinador, masculino/feminino, existente/criado, escolha de equipa.
- Central, balneário, fichas de jogadores, formação e onze, adicionar/agendar/editar jogos, escritório, transferências, anotações, finanças, troféus e histórico.
- A carreira de jogador deve destacar o atleta, evolução, minutos, estatísticas pessoais, contrato e prémios. A de treinador destaca a equipa e gestão.
- Dados reais do jogo e fontes externas são complementos; não substituir os acontecimentos registados no save.

## Separação explícita das quatro experiências

- Entradas e experiências identificadas como Jogador, Jogadora, Treinador e Treinadora, com concordância correta em navegação, criação de carreira, fichas, mensagens e traduções.
- Partilhar componentes e infraestrutura quando adequado, mantendo dados, objetivos e menus específicos de cada carreira. Não mostrar ferramentas de gestão do clube como se fossem ações do atleta.
- Jogador/Jogadora: desempenho pessoal, posição na equipa, confiança do técnico ou técnica, minutos, golos, assistências, cartões, lesões, ausências, contrato, finanças pessoais, agente, seleção, prémios e museu pessoal.
- Treinador/Treinadora: plantel completo, tática e escalação, orçamento e contratos do clube, mercado, olheiros, academia, objetivos de direção, desempenho coletivo, seleção quando aplicável e percurso de gestão.
- No modo atleta, observar clubes/propostas no contexto do agente; a gestão de olheiros e academia pertence ao modo de gestão. Uma consulta informativa do plantel não concede ao atleta poderes de treinador.
- Identidade do protagonista e universo da equipa são campos separados: ser treinadora não obriga a gerir futebol feminino, nem ser treinador implica futebol masculino. Oferecer escolha compatível com o jogo sem confundir estas dimensões.
- Jogadora e jogador usam catálogos e equipas do universo correspondente; suportar atletas criados e entradas manuais quando não houver cobertura externa.
- Dados de demonstração, catálogos, pesquisa, estatísticas e assets devem respeitar equipa/competição e género correto, sem misturar IDs ou assumir cobertura equivalente.
- A separação é funcional e linguística; recursos como nível de detalhe, qualidade 3D e ferramentas de análise devem ter o mesmo cuidado nas quatro experiências.

## Funcionalidade aprovada para depois: sortear carreira

- Adicionar "Sortear carreira" ao ecrã inicial, junto da criação manual e de continuar carreiras.
- O utilizador escolhe edição do jogo, masculino/feminino e jogador/jogadora ou treinador/treinadora. Manter identidade do protagonista e universo da equipa separados, conforme as regras das quatro experiências.
- Filtro de identidade: pessoa existente, criar do zero ou sortear entre essas opções. Para existente, escolher apenas identidades disponíveis no catálogo compatível; para criado, permitir rever/completar nome, nacionalidade e restantes campos antes de iniciar, identificando os dados gerados.
- Treinadores e treinadoras existentes devem vir da database do FC selecionado e da atualização correspondente, com IDs do jogo, nome, nacionalidade, clube e imagem quando disponíveis. O mesmo catálogo alimenta a escolha manual e o sorteio.
- Substituir a lista curta de treinadores de exemplo atualmente escrita em Welcome.tsx por importação validada da edição. Não substituir ausentes por nomes famosos de uma lista genérica nem apresentar uma pessoa real sem confirmação de que é selecionável nessa edição.
- Separar personagens selecionáveis de carreira, treinadores associados a clubes, membros de comissão técnica e personagens genéricas. A presença de um registo na base não prova que seja uma opção selecionável no jogo.
- Via prevista: extrair/importar os registos da base/ficheiros compatíveis do FC e manter catálogo local versionado; validar nomes, IDs, associação ao clube e disponibilidade. eafc-db-kit é um candidato de leitura de ficheiros, não uma API de treinadores já ligada. Referências de investigação: https://github.com/ViniMacacari/eafc-db-kit e https://github.com/mhirst1992/fc26-save-parser . No momento desta atualização, ainda não foi extraído nem validado o catálogo de treinadores.
- Caso o catálogo da edição esteja indisponível, oferecer importação ou identidade criada, explicitamente identificada. Não trocar silenciosamente a database do FC 27 pela do FC 26, nem completar a de treinadoras com nomes inventados.
- Filtro "Com desafio / Sem desafio". A equipa deve aparecer SEMPRE no resultado, nos dois casos.
- Sem desafio: sortear uma carreira normal dentro dos filtros, com equipa e identidade/modo de criação, sem impor objetivos adicionais.
- Com desafio: permitir sortear o desafio e os restantes elementos ou escolher um desafio concreto e sortear apenas o resto.
- Filtros adicionais: país, liga, divisão/nível, perfil ou dimensão do clube, condições de orçamento quando conhecidas, existentes/criados e duração do desafio. Cada filtro deve depender de dados reais disponíveis, com opção "Qualquer".
- Duração como filtro: curto/longo (e indiferente), acompanhada do número de temporadas ou prazo definido no desafio. Parametrizar os intervalos sem confundir duração do desafio com duração máxima da carreira: concluir um desafio curto não encerra obrigatoriamente o save.
- Exemplos de desafios: reconstruir uma equipa, começar nas divisões inferiores e subir, apostar na academia, contratações de uma nacionalidade, recuperar um clube histórico e conquistar um título dentro de determinado prazo.
- Objetivos devem ser adequados ao papel: gestão/mercado/academia para treinador ou treinadora; minutos, titularidade, evolução, golos/assistências ou percurso para jogador ou jogadora. Não atribuir ao atleta poder sobre contratações ou formação da equipa.
- Só sortear equipas, divisões e competições disponíveis para a edição e universo escolhidos. Não presumir que divisões inferiores masculinas e femininas têm a mesma cobertura ou são jogáveis.
- Usar catálogo com tags de elegibilidade e dados versionados. Rótulos como "clube histórico" ou "reconstrução" devem provir de uma seleção curada ou critérios declarados, não de factos inventados pelo sorteio.
- Respeitar o ano inicial (FC 26: 2025; FC 27: 2026), o máximo de épocas do save e prazos viáveis. Não sortear objetivos dependentes de mais épocas do que as disponíveis.
- Mostrar prévia do resultado com equipa/emblema/camisola disponível, protagonista existente ou criado, modo, edição, época inicial e, quando aplicável, desafio, regras, duração e objetivos.
- Ações: aceitar e criar carreira, sortear novamente ou alterar filtros. Permitir manter escolhas específicas (ex.: desafio ou equipa) e voltar a sortear as restantes, respeitando as dependências de compatibilidade.
- Se não houver combinações válidas, explicar quais filtros limitam o resultado e permitir ajustá-los. Não relaxar filtros silenciosamente, trocar de género/edição ou usar equipa indisponível apenas para produzir um resultado.
- O sorteio não deve criar vários saves ao experimentar resultados: só guardar uma nova carreira depois de o utilizador aceitar e completar a ficha necessária. O desafio escolhido fica ligado à carreira para acompanhamento de progresso.
- Implementar o sorteio sobre dados locais/cache compatíveis, sem depender de IA paga nem de uma API em tempo real para cada tentativa.

## Catálogo ampliado de desafios

Cada desafio tem nome traduzido, descrição, regras, metas ajustáveis, duração, dificuldade, modos elegíveis, posições elegíveis quando necessário, requisitos de dados e condições de sucesso. Curto/longo são filtros; a duração concreta aparece antes de aceitar. As regras são do tracker e não devem ser apresentadas como desafios oficiais da EA.

### Treinador e treinadora

| Desafio | Objetivo/regras de exemplo | Duração sugerida |
| --- | --- | --- |
| Mercado a custo zero | Contratar apenas agentes livres e empréstimos durante uma época | Curto |
| Contas verdes | Terminar a época com saldo de transferências positivo e cumprir o objetivo desportivo escolhido | Curto |
| Teto salarial | Cumprir objetivo mantendo a massa salarial abaixo do teto definido | Curto/longo |
| A vida depois da estrela | Registar saída do principal jogador e cumprir objetivo sem ultrapassar o orçamento de reposição | Curto |
| Transfer ban / embargo de transferências | Cumprir o objetivo sem contratações durante uma ou mais janelas ou temporadas definidas | Curto/longo |
| Oportunidade à formação | Promover três jovens e atingir uma meta de minutos com eles na equipa principal | Curto/longo |
| Especialista em taças | Ganhar uma taça com clube elegível fora do grupo de favoritos definido | Curto/longo |
| Caça-gigantes | Vencer um número definido de adversários com OVR médio superior, se houver dados comparáveis | Curto |
| Identidade nacional | Cumprir objetivo usando uma proporção definida de atletas da nacionalidade escolhida | Longo |
| Clube vendedor | Vender jogadores com valorização registada e manter o desempenho desportivo definido | Longo |
| Passaporte europeu | Conquistar ligas em três países, mudando de clube dentro da mesma carreira | Longo |
| Dinastia | Ganhar três campeonatos consecutivos | Longo |
| Da periferia à Europa | Conseguir a primeira qualificação europeia do percurso registado de um clube elegível | Longo |
| Sem atalhos | Vencer um título com teto de OVR nas contratações e limite anual de despesa | Longo |

Reconstrução, divisões inferiores e academia continuam disponíveis. Clubes favoritos, estrela principal, objetivos de classificação e metas financeiras devem ser definidos/confirmados antes de iniciar, sem inventar classificações ou história de clubes.

- Transfer ban é um desafio explicitamente aprovado para treinador e treinadora, disponível no sorteio e na escolha manual. Pode integrar uma reconstrução ou outro desafio compatível.
- Antes de aceitar, indicar início, fim e âmbito: uma janela, várias janelas ou temporadas, respeitando o calendário da competição e o limite restante do save.
- Configurar se proíbe todas as entradas ou apenas compras; declarar expressamente o tratamento de empréstimos, jogadores livres e opções/obrigações de compra previamente acordadas.
- Por predefinição, renovações, promoções da academia e regressos de empréstimo não são novas contratações externas; vendas podem continuar. Mostrar estas regras e permitir variantes antes de iniciar, evitando exceções implícitas.
- A central mostra o embargo ativo, o período e as operações permitidas. Uma operação registada que infrinja a regra gera aviso e opção de corrigir o registo ou marcar incumprimento; o tracker não afirma impor o embargo dentro do FC.
- Não combinar metas obrigatórias de novas contratações com um embargo que as torne impossíveis no mesmo período. A etiqueta "transfer ban" representa uma regra do desafio escolhido, sem alegar sanção oficial real de um clube.

### Jogador e jogadora

| Desafio | Objetivo/regras de exemplo | Duração sugerida |
| --- | --- | --- |
| Arma secreta | Somar cinco participações em golos entrando como suplente | Curto |
| Conquistar o onze | Passar de suplente a uma sequência de titularidades definida | Curto |
| Maestro | Atingir uma meta de assistências apropriada à posição | Curto/longo |
| Dupla ameaça | Alcançar dez golos e dez assistências numa época, para posições elegíveis | Curto |
| Regularidade | Manter nota média mínima em pelo menos dez atuações avaliadas | Curto |
| Disciplina | Completar uma sequência definida de participações sem expulsões | Curto |
| Voltar mais forte | Após lesão registada, cumprir metas de minutos e desempenho no regresso | Curto |
| Nova posição, nova história | Registar reconversão e cumprir metas de atuação na nova posição | Curto/longo |
| Muralha | Para guarda-redes, atingir meta de jogos sem sofrer e minutos, com dados adequados | Curto/longo |
| Passaporte internacional | Registar primeira convocatória e primeira participação pela seleção | Longo |
| Ídolo de um clube | Alcançar número de jogos e marcos de desempenho no mesmo clube | Longo |
| Caminho para a elite | Partir de clube de menor dimensão e registar transferência para um clube do perfil definido | Longo |
| Lealdade | Permanecer no mesmo clube pelo período definido e cumprir objetivos | Longo |
| Noites grandes | Cumprir metas de boas atuações em eliminatórias/finais elegíveis | Longo |

- Parametrizar metas para guarda-redes, defesas, médios e avançados; não sortear desafios de golos/assistências inadequados para todas as posições.
- Validar se o jogo/universo suporta seleção, academia, competições e equipas necessárias. A mesma regra pode ser usada no masculino/feminino quando os requisitos se verificarem; não forçar uma competição inexistente para preservar o nome do desafio.
- Quando uma meta exigir estatística ainda não recolhida (ex.: jogos sem sofrer do guarda-redes), permitir registo explícito e validado ou tornar o desafio inelegível até existir suporte; não deduzir de informação insuficiente.
- Jogador/a real da base mantém identidade e estado inicial do jogo; objetivos acompanham o save do utilizador, sem inventar feitos anteriores. Treinador/a real da base pode ter desafios atribuídos sem presumir feitos biográficos não importados.
- Permitir escolher um desafio, personalizar metas e sortear o restante, ou sortear um conjunto pequeno de regras compatíveis. Evitar combinações contraditórias (ex.: proibição total de contratações e meta obrigatória de contratações na mesma janela).
- Guardar regras e metas aceites como versão da carreira; uma atualização do catálogo não muda retroativamente as condições de um desafio iniciado.

## Novos requisitos: plantel, posições e PlayStyles

- Interpretar provisoriamente "fórmulas do plantel" como formações táticas. Confirmar apenas se surgirem indícios de outro significado.
- Mudar e guardar formações, titulares, banco e reservas. Incluir predefinições adicionais e permitir ajustar posições no campo.
- Nos modos treinador/treinadora, criar, nomear, duplicar, editar e apagar múltiplos planos de equipa (ex.: Principal, Rotação, Taça, Europa), escolher um ativo e alternar entre eles sem perder os restantes.
- Cada plano guarda formação, posições/coordenadas no campo, onze titular, banco, reservas não convocadas e funções/bolas paradas quando registadas. Permitir mudar quem é titular, suplente ou reserva, com indicação de indisponibilidades conhecidas.
- Os planos usam o mesmo plantel real da carreira e os mesmos IDs de atletas. A mesma pessoa pode constar em vários planos, mas não aparecer duas vezes entre titulares e banco dentro do mesmo plano. Criar um plano não duplica o atleta, o contrato ou os seus totais.
- Distinguir plano tático (alternativa de escalação) de grupo de plantel (principal, reservas, academia). Um jovem promovido mantém identidade e histórico; ter uma equipa B tática não promove automaticamente a academia nem cria um novo clube.
- Ajustar posição de um jogador naquele plano não altera automaticamente a sua posição principal/secundária global. Reconversões e treino de posição pertencem à evolução do atleta, com data e histórico.
- Ao registar um jogo, selecionar o plano utilizado e guardar uma cópia da convocatória/escalação efetiva, permitindo alterações próprias da partida. Editar depois o plano Principal não modifica jogos anteriores.
- Ao transferir, dispensar, promover ou tornar indisponível um atleta, sinalizar os planos afetados e permitir corrigir posições/banco. Preservar as cópias históricas; não preencher vagas com atletas inventados nem duplicar suplentes silenciosamente.
- Para o auxiliar técnico, permitir comparar os planos existentes e sugerir escalação ou rotação, com revisão e aplicação explícita. Não gravar um novo onze sem decisão do utilizador.
- Arrastar/trocar jogadores com alternativa acessível por seleção. Impedir o mesmo jogador em duas posições.
- Guardar o onze usado em cada jogo para que alterações posteriores não modifiquem fichas antigas.
- Editar posição principal, posições secundárias e alterações por reconversão, guardando a data e o histórico.
- Adicionar/remover PlayStyles e PlayStyles+, respeitando a edição do jogo e distinguindo uma mudança no save de uma atualização do catálogo externo.
- Guardar evolução de overall e potencial registado sem substituir o histórico de temporadas anteriores.
- Todos os atributos, overall/OVR atual e potencial devem poder ser alterados manualmente ou através de importação validada, em jogadores/jogadoras existentes, criados e jovens da academia. Dados iniciais não são valores imutáveis.
- Incluir atributos de campo e específicos de guarda-redes, conforme a edição e os dados disponíveis; permitir atualização individual ou em lote, com validação dos limites aplicáveis ao jogo.
- Para acomodar variações dinâmicas de OVR, especialmente as referidas pelo utilizador no FC 27, guardar observações datadas: valor anterior, novo valor, temporada, fonte e motivo opcional (evolução, forma, reconversão ou correção). Não alegar conhecimento da fórmula interna da EA sem validação.
- Distinguir o OVR inicial/de catálogo do OVR atual registado no save. Quando o jogo fornecer um modificador temporário ou um OVR efetivo diferente, guardar esses valores separadamente, com período/data e contexto; não interpretar toda a variação como crescimento permanente.
- O potencial registado e o intervalo estimado do scout também podem mudar. Não impor o potencial do catálogo como teto permanente nem converter uma estimativa do olheiro num valor exato conhecido.
- A ficha exibe OVR atual, diferença em relação ao último registo e histórico de evolução. Gráficos e comparações usam observações reais; dados ausentes não são interpolados como factos.
- Guardar os atributos/OVR relevantes no contexto de cada partida e no fecho da época. Uma atualização atual não pode alterar o OVR mostrado num jogo antigo, numa passagem anterior ou no resumo de uma temporada encerrada.
- Distinguir OVR da nota/rating de uma partida: têm escalas e significados diferentes. Não usar a nota do jogo para alterar automaticamente o overall, o potencial ou a confiança do técnico.
- Editar atributos não recalcula automaticamente um OVR supostamente oficial. Só usar cálculo por posição/edição quando existir fórmula validada e fonte identificada; qualquer estimativa futura precisa de rótulo explícito e não substitui o valor introduzido pelo utilizador.
- Atualizações externas oferecem comparação e importação seletiva; preservar sempre as alterações específicas do save. Corrigir um registo antigo deve ser diferente de adicionar uma nova evolução, com recálculo dos resumos afetados.

## Novos requisitos: registo dos jogos

- Adicionar golos e assistências por jogador, tanto no modo jogador como treinador, com edição e remoção.
- Permitir minuto do evento, penáltis e autogolos. Separar desempate por penáltis do resultado do encontro e dos golos individuais.
- Não exigir assistência para todos os golos; um golo pode não ter assistência.
- Impedir contagens duplicadas entre eventos e totais introduzidos. A soma dos golos conhecidos não pode exceder o resultado; permitir golos sem autor identificado.
- Estatísticas por jogo, competição, temporada e carreira, recalculadas após correção ou eliminação.
- Adicionar nota/rating da atuação na partida (0–10, com uma casa decimal) por atleta. Interpretar "ranking da partida" prioritariamente como esta nota; permitir também posição no ranking da partida quando o utilizador a tiver, sem a confundir com a nota ou classificação da liga.
- Usar avaliação desconhecida/não preenchida como ausência de valor, e não nota zero. A média só inclui avaliações registadas; posição num ranking exige informação efetiva.
- Permitir marcar melhor em campo, separadamente da nota. Não inferir um prémio oficial a partir de dados incompletos dos restantes jogadores.
- Registar local como casa, fora ou campo neutro e permitir indicar estádio, fase, final e importância do encontro, para suportar prévias e recordações no museu.

## Novos requisitos: olheiros e observação

- Área de scouting com olheiros adicionados pelo utilizador, país/região, experiência e avaliação registadas, missão e datas.
- Mostrar candidatos em cartões ou lista pesquisável, com nome, idade, posição, clube, overall conhecido e potencial conhecido ou intervalo estimado.
- Mostrar valor de mercado/preço estimado do jogador ou jogadora nos resultados e na ficha ANTES de adicionar à observação. Não exigir adicioná-lo ao scout para revelar esse valor.
- Identificar moeda, data/atualização e origem do valor. Separar valor de mercado, estimativa de contratação, salário e cláusula de rescisão; não confundir valores de Ultimate Team em moedas com o modo carreira.
- Quando não houver valor fiável, mostrar "valor desconhecido" e permitir estimativa manual identificada. Nunca apresentar uma estimativa como proposta real do clube vendedor.
- Adicionar jogador à lista de observação a partir do catálogo e permitir criação manual quando não for encontrado.
- Registar origem/entrada do jogador na observação, olheiro responsável, data, prioridade, notas e relatórios datados.
- Estados editáveis: por observar, em observação, relatório recebido, alvo prioritário, em negociação, contratado e descartado.
- Distinguir potencial de catálogo, estimativa de scouting e potencial registado no save. Usar "desconhecido" quando não existir valor; não inventar avaliações.
- Contratar um alvo deve usar o mesmo fluxo de transferência, evitando duplicados no plantel e no livro financeiro.

## Mercado e pagamentos — revisão FC 27

### Verificação da edição

A documentação oficial confirma negociações faseadas, prestações, pagamentos por objetivos, trocas, permanência por empréstimo no clube de origem após compra, direitos de recompra/preferência/futura venda, comissões e condições salariais. Fonte: https://www.ea.com/games/ea-sports-fc/fc-27/news/pitch-notes-fc27-career-mode-deep-dive . O desenho abaixo é a adaptação do tracker, não uma reprodução garantida de toda a contabilidade interna do jogo.

### Operação, acordo e movimento são conceitos separados

- Distinguir transferência definitiva, agente livre/sem taxa de transferência, pré-contrato/futura entrada, empréstimo e empréstimo com compra quando suportado no save. Renovação, regresso de empréstimo e rescisão são eventos próprios, sem simular uma compra nova.
- Não usar "custo zero" como sinónimo de despesa total inexistente: ausência de taxa de transferência pode coexistir com salários, prémio de assinatura e comissão.
- Permitir trocas de jogadores e acordos de compra com permanência temporária no clube vendedor por empréstimo (loan-back), preservando propriedade contratual, clube representado e data de disponibilidade separadamente.
- Separar tipo da operação da estrutura financeira: uma compra ou venda pode ser paga de imediato ou combinar entrada/prestações e condições adicionais.
- Guardar datas de acordo e de efeito distintas, incluindo próxima janela/época. Alterar o plantel ativo, contratos e planos de equipa quando o movimento efetivamente ocorrer, não apenas ao iniciar a negociação.
- Estados da negociação registados no save: consulta/interesse, conversações com clube, condições com atleta, acordo, pendente de efeito, concluída, recusada, cancelada ou expirada. Permitir revisões do acordo e histórico de propostas.
- O tracker regista o que o utilizador faz no FC; não inventa respostas de clubes nem representa uma negociação simulada da IA como proposta real.

### Estrutura financeira do tracker

- Registar montante fixo garantido, entrada, parcelas com valores/datas/temporadas e sentido a pagar/a receber. Validar que a entrada mais as parcelas corresponde ao montante fixo acordado.
- Guardar bónus condicionais à parte, com beneficiário, condição, limite/recorrência quando definidos, prazo, valor e estado: ainda não cumprido, elegível, confirmado, pago/recebido ou cancelado.
- Salários, prémio de assinatura, comissões e prémios de desempenho são componentes próprios. Não somar prémios contingentes ao montante fixo garantido como se já estivessem pagos.
- Guardar repartição salarial de empréstimos, eventual taxa, duração, opção de compra e datas de exercício quando efetivamente conhecidas. Obrigação de compra só deve ser identificada como mecânica nativa quando validada na edição/contrato do save.
- Registar cláusulas de recompra, preferência, percentagem de futura venda e rescisão com termos e prazo conhecidos; não presumir percentagem sobre lucro quando a base declarada for o valor da venda.
- Contratos podem guardar condições de aumento/redução salarial e expectativas de utilização. A elegibilidade de um gatilho pode ser sugerida a partir dos registos, mas o pagamento/mudança deve ser confirmado conforme o save.
- Painel com total fixo do acordo, movimentos liquidados, valores futuros a pagar/a receber e exposição a bónus condicionais. Guardar também o saldo/orçamento observado no jogo para conciliação, sem prometer que o ledger reproduz exatamente o orçamento da EA.
- Uma prestação prevista não é um lançamento liquidado. Ao confirmar pagamento/recebimento, gerar um único movimento ligado à obrigação, com ID estável para impedir duplicação por sincronização, edição ou importação.
- Obrigações futuras atravessam o fecho de temporada sem serem cobradas novamente; preservar o vínculo ao clube e acordo originais mesmo que o protagonista mude de equipa.
- Permitir confirmar, corrigir ou reverter liquidações com histórico e efeitos coerentes nos totais. Não apagar silenciosamente parcelas antigas quando o acordo for revisto.
- Exemplo de validação do desenho: acordo fixo de 30 M€ = 10 M€ iniciais + quatro parcelas de 5 M€; bónus condicional de 2 M€ fica separado até se verificar. O sistema não lança 30 M€ e volta a lançar as quatro parcelas.
- Desafios distinguem gasto de caixa, compromisso fixo de contratação e custo salarial, com critério escolhido antes de começar. O transfer ban verifica a operação e a data relevantes, não apenas se houve saída de dinheiro naquela janela.
- O empresário do atleta avalia o contrato pessoal e as propostas; o auxiliar do técnico avalia o compromisso financeiro do clube e necessidades do plantel. Taxa paga ao clube não é receita pessoal do atleta.
- Recursos por edição: mostrar controlos de FC 27 de acordo com a verificação realizada; manter FC 26 compatível com as suas opções confirmadas. Campos opcionais de registo personalizado não devem ser anunciados como novidade nativa do FC 26.

## Novos requisitos: academia de base

- Adicionar e editar jovens com identidade, nacionalidade, idade, posições, pé preferido, overall, intervalo de potencial e PlayStyles.
- Registar relatórios de evolução e mudanças de posição/PlayStyle ao longo do tempo.
- Guardar estatísticas introduzidas para os jogos da base (participações, minutos, golos, assistências e avaliações), sem inventar partidas inexistentes no modo carreira.
- Separar jogos da base dos jogos da equipa principal e identificar claramente o contexto de cada estatística.
- Estados: em avaliação, na academia, promovido e dispensado; preservar o histórico dos dispensados.
- Promoção transfere a mesma identidade para a equipa principal, mantendo o percurso na academia e sem duplicar totais. Nome e idade não são identificadores.

## Novos requisitos: carreira de jogador

- Registar cartões amarelos, expulsão por segundo amarelo e vermelhos diretos, evitando contar a mesma expulsão duas vezes.
- Histórico de lesões com tipo, início, retorno previsto e retorno efetivo, incluindo disponibilidade atual.
- Registar partidas sem participação e motivo: lesão, suspensão, opção técnica, banco sem entrada ou outro.
- Interpretar "jogos fora" como partidas de ausência, mantendo também o filtro casa/fora do calendário para cobrir os dois sentidos.
- Registar confiança do treinador por data ou jogo, com valor/estado e notas, incluindo perda de confiança e recuperação.
- Não inventar uma fórmula oficial da EA: a confiança real é introduzida pelo utilizador ou importada de um campo validado. Qualquer futura simulação seria uma funcionalidade separada e identificada.
- Mostrar forma e evolução pessoal por temporada, titularidades, suplências utilizadas, minutos e ausências, distinguindo partidas do clube de participações do atleta.

## Novo requisito: temporadas

- Uma carreira contém várias temporadas identificadas por ID e etiqueta editável (ex.: 2026/27 ou 2026).
- Inícios definidos pelo utilizador: FC 26 começa em 2025 (2025/26 no calendário europeu); FC 27 começa em 2026 (2026/27 no calendário europeu). A criação deve ajustar o ano inicial ao mudar a edição.
- Aplicar limite de épocas por save e edição, com configuração centralizada. A documentação atual da EA indica até 15 épocas por save: https://help.ea.com/en/articles/ea-sports-fc/career-mode/ . O hub oficial de carreira do FC 27 remete para esse guia: https://www.ea.com/games/ea-sports-fc/fc-27/guide-hub/career-hub . Rever a configuração caso a EA documente mudanças.
- Com inícios europeus padrão e 15 épocas: FC 26 vai de 2025/26 a 2039/40; FC 27 de 2026/27 a 2040/41. Estas etiquetas finais são calculadas a partir dos inícios solicitados e do limite, não datas de encerramento exatas publicadas pela EA.
- Mostrar progresso (ex.: época 4 de 15), bloquear a criação de uma 16.ª época e, após o último fecho, manter histórico e museu acessíveis. Não resetar a contagem ao mudar de clube, ao mudar de jogador para treinador dentro do mesmo save ou ao trocar o idioma.
- Separar temporadas jogáveis do save de resumos históricos anteriores inseridos manualmente; um registo retrospetivo não cria uma época jogável adicional.
- Usar regras do calendário da competição para etiquetas anuais ou partidas entre anos. Não permitir contornar o limite apenas renomeando a época.
- Jogos, estatísticas, transferências, transações, objetivos e conquistas devem associar-se à temporada correspondente, sem depender de uma etiqueta global mutável.
- Adicionar temporada, selecionar temporada, finalizar temporada e iniciar a seguinte.
- A finalização apresenta um resumo, permite rever jogos pendentes e pede confirmação antes de arquivar.
- Guardar histórico do plantel, contratos e composição da equipa no fecho; transferências futuras não podem alterar esse histórico.
- Iniciar a temporada seguinte com plantel e contratos transportados. Tornar explícitos saldo inicial e transporte do saldo final, sem duplicar receitas/despesas.
- Estatísticas da temporada separadas das estatísticas totais da carreira.
- Jogador: jogos, minutos, golos, assistências, notas médias, evolução registada e prémios.
- Treinador/equipa: jogos, vitórias, empates, derrotas, golos marcados/sofridos, desempenho por competição, destaques individuais e balanço financeiro.
- Classificação e títulos só podem ser registados pelo utilizador ou obtidos de importação validada. Não inferir classificação de liga a partir apenas dos jogos do clube.
- Permitir reabrir uma temporada para corrigir registos, recalculando o resumo. Tratar conflitos com temporadas posteriores explicitamente.
- Migrar as carreiras atuais: criar a primeira temporada e associar os registos existentes; preservar cópia antes da migração.

## Novo requisito: idiomas

Preparar tradução da interface, formulários, validações, datas, números e resumos, com preferência guardada:

| Idioma | Código | Termo |
| --- | --- | --- |
| Português de Portugal | pt-PT | Época |
| Português do Brasil | pt-BR | Temporada |
| Inglês | en | Season |
| Francês | fr | Saison |
| Espanhol | es | Temporada |
| Italiano | it | Stagione |

- Traduções centralizadas por chaves, sem textos espalhados pelos componentes.
- Alterar idioma não altera dados ou nomes introduzidos pelo utilizador.
- Separar moeda escolhida da carreira da formatação do idioma; não converter valores ao trocar a língua.
- Não alegar suporte a um idioma enquanto as páginas e os estados principais não estiverem traduzidos.

## Preferências: moedas, medidas e visibilidade

- Escolher moeda da carreira e moeda de apresentação, incluindo inicialmente EUR, GBP, USD e BRL, com extensão através de códigos ISO válidos.
- Preservar montante e moeda originais de cada contrato, movimento e estimativa. Nunca mudar apenas o símbolo mantendo valor numericamente igual como se fosse uma conversão.
- Quando houver conversão, guardar fonte, data e taxa aplicada, com opção de taxa manual explícita; distinguir visualização convertida de uma alteração aos valores do save. Sem taxa válida, manter a moeda original ou pedir definição, sem inventar câmbio.
- Definir tratamento de totais com moedas diferentes e respetivas taxas; evitar que atualização futura de câmbio reescreva silenciosamente o histórico financeiro.
- Preferir representação monetária exata (unidades mínimas/decimal adequado), com arredondamento apenas na apresentação/conversão definida.
- Sistema métrico e imperial para altura/peso: centímetros/metros ou pés/polegadas, quilogramas ou libras. Guardar valores numa unidade canónica e converter a apresentação sem alterar atributos desportivos.
- Apresentação de salários por semana, mês ou ano com período explícito e regra de conversão temporal consistente; mudar o período visual não cria pagamentos automáticos.
- Guardar preferências gerais da conta e permitir substituições por carreira, com indicação de que a carreira está a herdar ou a personalizar a preferência.
- Definições de visibilidade: mostrar jogadores masculinos, jogadoras femininas ou ambos no catálogo/pesquisa/scouting, e aplicar restrições mais específicas por carreira.
- Estes filtros não alteram a identidade do protagonista, elegibilidade das competições, dados guardados, histórico ou direitos de gestão. A seleção continua limitada às opções compatíveis com o modo/edição.
- Esconder uma categoria remove-a das listagens de descoberta; não apagar plantéis, favoritos ou peças históricas. Se um item já guardado ficar oculto, identificá-lo e permitir consultá-lo intencionalmente.
- Quando todos os resultados ficarem ocultos, mostrar estado vazio com acesso direto aos filtros, sem reativar categorias silenciosamente.

## Scouting: pesquisa e pastas

- Pesquisar jogadores/jogadoras com nome, edição, equipa/competição, posição, idade, OVR, potencial conhecido/intervalo, valor de mercado e salário quando disponíveis.
- Mostrar preço estimado e origem antes de guardar o candidato, conforme o requisito já aprovado.
- Criar, renomear e apagar pastas de observação (ex.: lateral titular, promessas, livres, próxima janela), com contagem de jogadores, notas e pesquisa interna.
- Adicionar a partir dos resultados, mover/remover entre pastas e permitir a mesma pessoa em várias pastas sem criar duplicados do atleta nem dos relatórios.
- Separar a pertença a uma pasta do estado de scouting: mover de pasta não reinicia a missão, apaga relatórios ou confirma contratação.
- Apagar uma pasta remove a organização dessa pasta, mantendo o jogador, relatórios e outras associações. Pedir confirmação se houver conteúdo.
- Pastas pertencem à conta/carreira; a gestão de recrutamento fica nos modos de treinador/treinadora. Pastas informativas de atleta, se existirem, não expõem operações de gestão do clube.
- Guardar a origem e atualização dos candidatos; um atleta temporariamente ausente do catálogo externo mantém a sua identidade e observações existentes.

## Conta, login e sincronização — Supabase

- Login e dados iguais nos dispositivos autenticados na mesma conta são requisitos finais aprovados. O utilizador pretende configurar o projeto Supabase mais tarde; preparar integração e documentação, sem criar nem ligar um projeto externo agora.
- Preparar Supabase Auth, Postgres e Storage, migrações SQL, variáveis de ambiente de exemplo e instruções de configuração para Vercel. Não expor chaves secretas de servidor no frontend.
- Fluxos de criar conta, entrar, confirmar email quando configurado, recuperar acesso, terminar sessão e gerir conta. Não representar uma sessão local de demonstração como autenticação real.
- Carreiras, temporadas, jogos, plantéis do save, pastas/scouting, academia, finanças, museu, imagens privadas e preferências devem ser associadas ao proprietário, com autorização verificada no servidor/base.
- Usar Row Level Security e políticas adequadas de Storage para isolar contas; testar que uma conta não lê nem altera dados ou ficheiros de outra. Catálogo público de referência tem política separada dos dados privados da carreira.
- Referências técnicas oficiais: https://supabase.com/docs/guides/database/postgres/row-level-security e https://supabase.com/docs/guides/storage/security/access-control .
- Supabase passa a ser a fonte principal dos dados autenticados. Cache local serve desempenho/continuidade e modo de demonstração, não substitui sincronização real.
- Recarregar dados ao abrir noutro dispositivo ou retomar a sessão; usar atualizações em tempo real onde forem úteis. A sincronização depende de ligação e sessão válidas.
- Mostrar estados reais de gravação: a guardar, sincronizado, alterações locais pendentes e falha de sincronização. Não mostrar "sincronizado" antes da confirmação remota.
- Resolver edições concorrentes por versão/revisão e informar conflitos importantes; não sobrescrever silenciosamente uma temporada, jogo ou plantel com cópia antiga de outro dispositivo.
- Preparar migração explícita das carreiras locais para a conta, com validação e prevenção de duplicados; não misturar dados de contas diferentes no mesmo navegador. Limpar/isolar cache privado ao terminar ou mudar de conta.
- Manter exportação/importação e incluir ficheiros da galeria conforme o formato de cópia definido. Definir eliminação de conta e dados associados, incluindo ficheiros, retenções e exceções documentadas.
- Sem Supabase configurado, disponibilizar apenas modos que funcionem realmente e indicar a limitação local; o requisito final de login/sincronização não fica concluído com uma simulação.

## Privacidade, cookies, créditos e documentos legais

- Pedido explícito do utilizador: preparar as páginas e os mecanismos legais necessários. Mercado confirmado pelo utilizador: Portugal / União Europeia E Brasil. Preparar requisitos aplicáveis do RGPD, regras de privacidade eletrónica portuguesas/europeias e LGPD, com documentação PT-PT e PT-BR adequada. Não afirmar conformidade universal com base apenas num modelo de texto.
- Rodapé acessível com política de privacidade, política/preferências de cookies ou armazenamento equivalente, termos de utilização, créditos/fontes/licenças e contacto do responsável.
- A política deve refletir a implementação real: identidade/contacto do responsável, dados recolhidos, finalidades e fundamentos aplicáveis, fornecedores, alojamento/transferências, retenção, direitos, eliminação/exportação e contacto/reclamação à autoridade competente. Não inventar empresa, contactos, DPO, prazos ou região do Supabase.
- Mapear dados de conta, carreiras, uploads, logs e fornecedores efetivamente ativos; minimizar a recolha e distinguir dados de pessoas reais no catálogo dos dados pessoais dos utilizadores.
- Projetar a primeira versão sem publicidade nem analytics opcionais por predefinição. Inventariar cookies, localStorage, IndexedDB e serviços incorporados, em vez de usar um banner decorativo desligado do que o site carrega.
- Para Portugal/UE, tratar separadamente os mecanismos estritamente necessários para o serviço solicitado e os não essenciais. Bloquear rastreadores não essenciais até consentimento válido; permitir aceitar, recusar e escolher categorias com opções claras e retirar/alterar escolhas depois. Não instalar rastreadores ao apenas abrir ou fechar o aviso.
- Se só houver armazenamento estritamente necessário, informar corretamente sem forçar um pedido de consentimento para finalidades inexistentes. Referências: https://europa.eu/youreurope/business/growing/digitalising/online-privacy/index_pt.htm e https://www.cnpd.pt/media/x2zdus50/nota-informativa-cnpd_cookies_20210625.pdf .
- Para o Brasil, aplicar LGPD conforme os tratamentos reais e seguir a orientação da ANPD para cookies, transparência, opções de rejeição dos não necessários e gestão de preferências: https://www.gov.br/anpd/pt-br/centrais-de-conteudo/materiais-educativos-e-publicacoes/guia-orientativo-cookies-e-protecao-de-dados-pessoais.pdf . Não presumir que todos os tratamentos exigem a mesma base legal.
- Oferecer canal de acesso/correção e demais direitos aplicáveis, com eliminação/exportação da conta conforme a implementação e as obrigações de conservação documentadas. Referência brasileira: https://www.gov.br/anpd/pt-br/assuntos/titular-de-dados-1/direito-dos-titulares .
- Consentimento de cookies/marketing não deve ser condição artificial de acesso à carreira. Não confundir consentimento para rastreio com informação de privacidade ou tratamento necessário à conta.
- Inventário de imagens, fontes tipográficas, modelos 3D e bases de dados com fonte, autor, licença/versão, alterações e atribuição necessária. Créditos não substituem a autorização exigida pelo recurso.
- Pedido explícito: todas as marcas efetivamente representadas devem constar nos créditos, com identificação dos respetivos titulares conforme informação verificada. Abranger clubes, fabricantes/patrocinadores nos equipamentos, competições, EA/FC e fornecedores representados, sem sugerir afiliação ou endosso.
- Distinguir a secção de marcas/direitos dos créditos de criação e dados: identificar autores dos modelos 3D, fotografias, texturas, fontes e bases, com links e condições aplicáveis. Citar uma marca não atribui a essa marca a autoria do modelo de terceiro.
- Manter créditos sincronizados com os recursos realmente integrados; permitir ver os créditos de uma peça a partir da sua ficha. Não listar marcas/recursos ausentes como parceiros do site.
- Verificar as condições de cada recurso antes da integração final. A presença nos créditos não torna suficiente um ficheiro cuja utilização ou redistribuição não esteja permitida; modelos temporários sem condições verificadas não são assets finais.
- Identificar projeto independente, sem alegar afiliação ou endosso da EA, clubes, atletas ou competições. Não atribuir direitos que o fornecedor não concedeu.
- Documentos finais dependem das escolhas reais de responsável, público-alvo, fornecedores e funcionalidades; validar esses pontos antes da publicação pública e atualizar quando o tratamento mudar.

## Funcionalidades adicionais aprovadas: comparação e revisão

- Comparar candidatos de scouting lado a lado, usando a mesma edição/atualização e distinguindo dados desconhecidos de valores inferiores.
- Guardar pesquisas/filtros de scouting reutilizáveis, além das pastas de pessoas já aprovadas.
- Histórico de alterações importantes com ação de desfazer, respeitando conflitos de sincronização e relações entre jogo, estatísticas e museu.

## IA: empresário para atletas e auxiliar para técnicos

- Preparar um assistente opcional que opine com base nos dados reais registados na carreira, incluindo plantel, posições, atributos/OVR atuais, escalações, jogos, disponibilidade, scouting e orçamento quando o modo permitir.
- Nos modos treinador/treinadora, funcionar como auxiliar técnico: discutir formação e onze, sugerir alternativas, identificar falta de profundidade, avaliar candidatos e ajudar a interpretar resultados e evolução dos jovens.
- Nos modos jogador/jogadora, funcionar como empresário/empresária: aconselhar sobre propostas registadas, contratos, salário, clubes pretendidos, oportunidades de minutos, percurso, evolução e objetivos de carreira. Pode analisar forma e utilização para apoiar essas decisões; não assume a função de treinador do atleta nem dá controlo de contratações, academia ou escalação.
- As propostas reais do save são introduzidas/importadas; sugestões hipotéticas do empresário são identificadas como opiniões, não como ofertas efetivas de clubes. A IA não contacta pessoas nem negoceia transferências reais.
- A proibição de imagens com aparência de IA continua em vigor; esta funcionalidade é para análise e conversa, não geração de fotografias, emblemas ou equipamentos.
- Exemplos de perguntas: "Quem devia jogar no próximo encontro?", "Onde preciso de reforçar?", "Qual destes candidatos encaixa melhor?", "Que jovem está pronto para ter minutos?" e "O que mudou nas minhas últimas atuações?".
- Calcular estatísticas exatas no código do tracker e fornecer ao modelo apenas o contexto relevante, com IDs, datas e fontes; não pedir ao modelo que invente resultados, potencial, salários, adversários ou movimentos para preencher lacunas.
- Nas respostas, separar factos registados de sugestões, explicar razões com referências às fichas/jogos, admitir dados insuficientes e evitar certezas sobre fórmulas internas da EA, vitória futura ou potencial desconhecido.
- Definir acesso de leitura à carreira selecionada; não permitir que a IA altere automaticamente o onze, confirme transferências, apague dados ou envie informação a terceiros. Sugestões de alterações podem ter prévia e aplicação explícita pelo utilizador, sujeitas às validações normais.
- Respeitar idioma, modos de carreira, universo masculino/feminino, transfer bans e regras de desafio aceites. Dados importados e anotações são conteúdo, não instruções autorizadas para o assistente.
- Manter o requisito de evitar serviços pagos. Primeira implementação gratuita usa Groq Free como principal e Cloudflare Workers AI (GLM-4.7 Flash) como reserva selecionável; ambos também podem ser escolhidos individualmente. Cloudflare tem quota gratuita diária sujeita a alteração. Não ativar billing/planos pagos nem fazer upgrade automático.
- A implementação atual está em `src/Advisor.tsx` e `api/counselor.ts`; exige `GROQ_API_KEY`, `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` privados no servidor. Sem chaves, o recurso apresenta aviso de configuração, sem falhar o restante tracker.
- Exigir autorizações independentes antes de enviar à Groq e Cloudflare. Se a primeira falhar, só chamar a reserva com consentimento específico já marcado. Enviar pergunta e resumo mínimo relevante, sem JSON completo da carreira, e nunca devolver/guardar as chaves no browser.
- Não guardar o chat na carreira ou localStorage. Respostas ficam apenas na memória da página e desaparecem ao sair. Não escrever prompts ou conteúdo das respostas em logs; manter `store:false` quando suportado.
- Empresário/a recebe apenas ficha, estatísticas, objetivos, confiança, disciplina e forma do protagonista. Auxiliar recebe esquema, onze/banco, resultados, orçamento e alvos de scout. Contexto é só leitura; o modelo não pode editar onze, confirmar negócio, apagar dados nem criar estatísticas.
- As instruções exigem distinguir factos do save e sugestões, admitir lacunas e nunca inventar propostas, interesse de clubes, valores, resultados, regras FC, notícias ou factos atuais. Não oferecer aconselhamento médico, jurídico ou financeiro profissional.
- Gemini foi considerado, mas não selecionado: a API limita clientes disponíveis no EEE/UE, Reino Unido e Suíça a Paid Services e impede aplicações direcionadas/provavelmente acessíveis a menores de 18. Não usar a quota Gemini sem pagar para um produto público de Portugal/UE. Fontes oficiais: https://ai.google.dev/gemini-api/terms e https://ai.google.dev/gemini-api/docs/pricing .
- WebLLM/WebGPU permanece uma alternativa local futura, ainda não integrada. Exigiria download de modelo, suporte de hardware, worker e testes de fluidez ao lado do 3D; não anunciar como recurso ativo.
- Antes de declarar os conselheiros prontos ao público, configurar as quotas grátis, confirmar modelos e condições atuais, testar timeout/429, testar casos PT/BR reais com dados incompletos e preservar o funcionamento do tracker quando ambas as APIs faltarem. Nenhuma quota é garantida nem ilimitada.
## Objetivos de carreira, clubes-alvo e pareceres de transferências

- Criar objetivos pessoais de curto, médio e longo prazo, além dos desafios sorteados: titularidade, minutos, evolução, mudança de liga/país, seleção, títulos, permanência e chegada a um clube pretendido.
- Cada objetivo tem responsável/protagonista, descrição, tipo, prioridade, prazo por data/temporada, estado e critérios mensuráveis quando possível. Calcular progresso a partir dos registos disponíveis e permitir confirmação manual identificada para metas qualitativas.
- Distinguir objetivos pessoais, exigências do clube/treinador efetivamente registadas e regras de desafios. A opinião da IA não cria uma obrigação oficial do FC.
- Definir clube-alvo principal e alternativas, com motivos e prazo pretendido. Preservar histórico de mudanças de preferência e permitir manter o alvo privado à carreira.
- Nos modos jogador/jogadora, o empresário ajuda a traçar o percurso até ao clube-alvo: posição, utilização atual, evolução registada, adequação à equipa e condições de uma proposta real quando conhecidas. Pode sugerir um clube intermédio, sem inventar ofertas ou prometer aceitação.
- Comparar permanecer, aceitar uma proposta registada, pedir empréstimo ou procurar outra oportunidade. Avaliar minutos/estatuto conhecidos, posição, concorrência no plantel quando houver dados, salário, duração do contrato, competição, objetivos pessoais e riscos de adaptação.
- Exibir parecer organizado com argumentos a favor, pontos de atenção, dados desconhecidos e recomendação fundamentada. A decisão é do utilizador; salário maior ou clube maior não determina automaticamente a melhor opção.
- Nos modos treinador/treinadora, clubes-alvo são próximos destinos profissionais; o auxiliar pode opinar sobre propostas de emprego e sobre contratações/vendas do plantel. Não confundir um clube pretendido para treinar com um alvo de recrutamento de atletas.
- Opiniões de mercado da gestão consideram perfil tático, posições, OVR atual, idade, potencial conhecido/estimado, profundidade, custo total conhecido, salários, orçamento, empréstimos e restrições como transfer ban.
- Permitir pedir parecer antes de confirmar uma transferência e guardar a decisão com nota opcional. Depois, comparar a expectativa registada com o desempenho observado, sem reescrever o parecer original.
- Guardar contexto/data do parecer e distingui-lo do estado atual: dados externos, propostas e atributos podem mudar. Informação ausente deve ser explicitamente desconhecida, sem percentagens inventadas de probabilidade de contratação ou sucesso.
- Integrar objetivos e clube-alvo no escritório/agente e na central, com progresso discreto e sugestões relacionadas; evitar adicionar uma aba principal para cada campo.

## Funcionalidades adicionais aprovadas: legado e percurso

- Rascunhos automáticos dos formulários longos, sobretudo registo de jogo: recuperar campos após fecho/recarregamento da página sem criar uma partida concluída nem alterar estatísticas. Distinguir rascunho de registo guardado; permitir continuar ou descartar, com isolamento por conta/carreira e tratamento de versões/conflitos.
- Peças em destaque no museu: escolher camisola, bola, cachecol, casaco ou troféu para o lugar principal da exposição. Permitir reorganizar os destaques mantendo a cronologia e as ligações aos dados; personalizar sem duplicar a peça nem os totais.
- Apresentação de contratação: após confirmação de uma chegada efetiva, mostrar nome, número e camisola 3D disponível, reutilizando os recursos da carreira. Permitir saltar/rever a apresentação e respeitar movimento reduzido; uma animação não confirma a transferência nem gera custos adicionais no ledger.
- Apresentação de promoção da academia: usar o mesmo sistema para marcar a entrada de um jovem na equipa principal, preservando a identidade e o histórico da base.
- Despedida de clube e fim de carreira: apresentação com números da passagem, momentos escolhidos e conquistas, ligada à respetiva exposição no museu. Criar o resumo a partir dos registos existentes e permitir rever depois; não encerrar uma carreira ou efetivar mudança de clube apenas por ver a apresentação.
- O encerramento da última época disponível mantém o percurso consultável; a despedida não apaga temporadas, altera totais ou reinicia o limite do save.
- Comparar duas temporadas, tanto da equipa como do jogador.
- Recordes pessoais: maior goleada, melhor série, temporada com mais golos.
- Objetivos simples por temporada com progresso calculado dos registos existentes.
- Resumo final exportável para guardar ou partilhar.
- Jornal da carreira com manchetes construídas a partir dos dados registados, por exemplo estreia com golo, sequência de vitórias e primeiro título. Usar modelos de texto traduzidos, sem depender de IA paga e sem inventar acontecimentos.
- Galeria de momentos: adicionar screenshots e legendas, associadas a jogo, atleta, conquista ou temporada, reutilizáveis no resumo final.
- Definir armazenamento e exportação dos ficheiros da galeria explicitamente: as imagens não devem ser colocadas indiscriminadamente no localStorage nem excluídas silenciosamente das cópias de segurança.
- Camisolas com história: números usados, clubes representados e momentos por jogador; permitir homenagear uma lenda com camisola emoldurada e número retirado, identificado como decisão do utilizador.
- Convocatórias à seleção, participações, golos e competições internacionais, separadas dos registos dos clubes; incluir seleção jovem ou principal quando registada.
- Percurso do treinador: propostas registadas, mudanças de clube e histórico numa só carreira. Mudar de clube não exige criar outra carreira nem apagar épocas passadas.
- Central com decisões pendentes: contratos a terminar, empréstimos a regressar e relatórios de olheiros para rever, derivados de datas e estados efetivamente registados.
- Registo rápido pós-jogo: resultado, minutos, nota, golos e assistências; cartões e ausências acessíveis no mesmo fluxo. Os detalhes opcionais podem ser completados depois, sem duplicar a partida.
- Comparar a evolução entre duas datas: overall, atributos, posições e PlayStyles, incluindo jovens da academia. Mostrar lacunas quando não houver observações suficientes.
- Resumo de temporada em apresentação visual: camisola do protagonista, onze mais utilizado, números, screenshots e troféus 3D. O onze mais utilizado deve derivar das escalações guardadas, não da escalação atual.
- Integrar estas funções nas fichas, central e histórico sempre que possível; evitar criar uma aba principal para cada detalhe.
- Central de empréstimos: jogadores cedidos/recebidos, clube representado, duração, data de regresso, opção de compra, minutos e evolução efetivamente registados. Preservar a separação entre vínculo contratual e atuações.
- Desafios de carreira personalizados: regras como apenas academia, contratações de uma nacionalidade e objetivos com prazo. Mostrar progresso derivado dos registos ou confirmação manual identificada; não dizer que o tracker impõe regras no jogo.
- Papéis no plantel: capitão, vice-capitão, referência, promessa e transferível, com moral registada e histórico quando necessário. Disponível como gestão nas carreiras de treinador/treinadora e consulta informativa nas de atleta.
- Prévia do confronto: clubes, camisolas, formação prevista, forma recente e confrontos registados. Distinguir a escalação prevista da efetivamente usada e dados históricos completos de cobertura parcial.
- Mapa do percurso com clubes, países e ligação à exposição de cada passagem no museu; alternativa em lista e tratamento de localizações desconhecidas sem inventar coordenadas.
- Comparar estimativa de contratação com valor efetivamente pago, incluindo origem e data da estimativa. A comparação não é uma previsão garantida do jogo.
- Planeamento do mercado por posição, com alvos como titular imediato, alternativa ou aposta futura, associado ao scouting existente.

## Prioridade visual aprovada: museu do percurso

- O histórico de clubes anteriores e seleção terá apresentação de museu, com objetos de cada passagem expostos em vitrines, molduras ou suportes, iluminação de galeria e placas discretas.
- Distinguir o museu do balneário: não usar filas de cacifos ou um cenário de jogadores em atividade. Reutilizar os modelos de camisolas e técnicas 3D, com composição própria de exposição.
- Nas carreiras de jogador/jogadora, cada exposição representa uma passagem por clube ou seleção, com camisola efetivamente usada, nome, número, datas e temporadas. Uma nova passagem pelo mesmo clube deve ser um capítulo separado, com opção de consultar totais agregados do clube.
- Permitir múltiplas camisolas na mesma passagem quando houver mudança de época, número ou equipamento; distinguir principal, alternativo e guarda-redes conforme os recursos disponíveis.
- Atualização explícita de âmbito: a camisola do museu não precisa de corresponder ao ano exato em que o atleta jogou. A versão autêntica corrente da biblioteca ou da temporada anterior é suficiente, conforme autorizado, com etiqueta da temporada do recurso. Uma versão histórica exata continua opcional quando disponível.
- Ao selecionar uma peça, mostrar jogos, titularidades, minutos, golos, assistências, avaliações disponíveis, cartões, títulos e momentos dessa passagem, com filtros por temporada e competição.
- Seleção tem exposição e totais próprios, com país, equipa/nível, convocatórias, jogos e títulos; não misturar estatísticas internacionais com as dos clubes.
- Nas carreiras de treinador/treinadora, representar cada clube com casacos, cachecóis, polos e recordações da função, em vez de usar camisolas como peça principal do percurso. Ao selecionar, mostrar estatísticas de gestão: jogos, vitórias, empates, derrotas, golos, aproveitamento e conquistas.
- Em empréstimos, associar as atuações ao clube representado na partida, preservando também o vínculo contratual ao clube de origem.
- Preservar o recurso escolhido para a exposição, nome, número e identidade do clube; guardar a temporada do equipamento separada da temporada da passagem. Atualizações da biblioteca não substituem silenciosamente escolhas existentes, mas o utilizador pode optar por um equipamento mais recente.
- Associar assets por clube, género/equipa, temporada real do recurso e variante. Priorizar atual e anterior, respeitando a identidade correta e guarda-redes quando aplicável. Permitir imagem/textura autorizada manual; sinalizar indisponibilidade se não existir recurso adequado, sem inventar equipamento oficial.
- Os totais da passagem derivam dos jogos associados a ela. Permitir adicionar resumos de passagens anteriores à criação do tracker, identificando-os como históricos manuais e evitando somá-los novamente a jogos já registados.
- Manter IDs estáveis de pessoa, clube/seleção, passagem, temporada, jogo e equipamento. Dados desconhecidos permanecem desconhecidos, sem preencher uma biografia real presumida.
- Navegação cronológica suave, com alternativa simples em cartões/lista para movimento reduzido, dispositivos modestos ou indisponibilidade de WebGL.

## Novos requisitos: prémios e recordações de jogos no museu

- Expor prémios individuais como peças próprias, adequadas ao protagonista: por exemplo distinções do atleta e de treinador/treinadora, apenas quando registadas ou importadas de fonte validada.
- Selecionar um prémio abre a temporada correspondente e mostra nome do prémio, pessoa, clube/seleção, competição ou entidade, período, data e estatísticas disponíveis. Prémios mensais ou anuais também mantêm a ligação à temporada.
- Não atribuir automaticamente Bola de Ouro, melhor marcador de competição ou melhor treinador a partir apenas de jogos do clube. O utilizador confirma as conquistas reais do save.
- Colecionar cachecóis de adversários como recordações de partidas marcantes: UCL, UEL, UECL, Supertaça, jogos europeus fora, finais, campo neutro e rivais importantes da liga, respeitando as competições disponíveis no universo masculino/feminino da carreira.
- O cachecol tem adversário, época, partida(s) explicitamente escolhida(s), competição, estádio/local e motivo da recordação. Ao selecionar, abrir a ficha do encontro associado ou uma pequena coleção selecionada; não listar obrigatoriamente todos os jogos contra esse adversário.
- Permitir vários momentos com o mesmo adversário, sem duplicar o encontro nem perder o motivo original. Mostrar histórico geral de confrontos apenas como ligação secundária.
- Entrada manual "Guardar recordação" em qualquer partida; após uma atuação relevante, sugerir uma recordação para confirmação do utilizador. Não encher o museu automaticamente após todos os jogos nem exigir uma vitória para recordar um momento importante.
- Importância do adversário e critérios de atuação memorável podem ser escolhidos pelo utilizador. Qualquer sugestão baseada em nota, fase ou desempenho deve explicar o motivo sem alegar que é uma conquista oficial da EA.
- Nas carreiras de atleta, relacionar recordações de boas atuações com o protagonista. Nas carreiras de gestão, usar os feitos da equipa e do treinador/treinadora, preservando a autoria dos feitos individuais de jogadores.
- Hat-trick: quando um atleta regista três ou mais golos na mesma partida, sugerir uma bola 3D comemorativa para o museu. Excluir autogolos e remates do desempate por penáltis; contar golos no tempo regulamentar e prolongamento.
- A bola pode apresentar nome/número, data, adversário e número de golos, com assinatura gráfica opcional; selecionar abre a partida e a temporada respetivas. Quatro ou mais golos mantêm a contagem real na placa.
- Nas carreiras de jogador/jogadora, destacar as bolas do protagonista; nas de treinador/treinadora, permitir expor bolas de atletas do plantel com autoria explícita.
- Evitar criar a mesma conquista duas vezes ao editar/importar um jogo, usando identidade da carreira, atleta, partida e tipo de marco. Reavaliar a elegibilidade se os golos/resultado forem corrigidos e sinalizar recordações afetadas, sem preservar silenciosamente feitos que já não correspondem aos registos.
- Todas as peças do museu devem ter ligação aos dados que representam (passagem, época, partida ou prémio), sem duplicar estatísticas apenas por aparecerem em várias exposições.

## Dados e integrações

- O protótipo atual usa persistência no navegador e exportação/importação JSON. O produto final deve ter login e sincronização Supabase, conforme a secção de contas; persistência local sozinha não cumpre esse requisito.
- O requisito de base utilizável exige um catálogo real validado e importável. Os plantéis de exemplo atuais não contam como integração de dados concluída.
- Usar uma base principal própria, normalizada e versionada por edição FC e atualização do plantel, contendo jogadores e equipas masculinas/femininas conforme a cobertura confirmada.
- Separar catálogo inicial dos dados de cada save. Atualizações de fontes nunca podem desfazer transferências, progressão ou edições do utilizador.
- Cadeia de reserva: fonte principal validada -> fonte alternativa compatível/autorizada -> última cópia local válida -> entrada/importação manual. Os menus e os registos da carreira devem continuar funcionais sem APIs.
- Não tratar aprovação, limite de plano ou proibição de licença como uma falha contornável. A alternativa deve ter acesso autorizado próprio.
- Preservar IDs internos e correspondências dos fornecedores para evitar duplicados ao trocar de fonte. Não misturar FC 26/27, atualizações incompatíveis ou equipas masculinas/femininas.
- Mostrar fonte e data do catálogo. Indicar dados em cache ou incompletos de forma discreta; um valor desconhecido não deve aparecer como zero.
- Carregamento de uma atualização deve ser validado antes de substituir a última cópia utilizável; falhas não apagam dados nem imagens existentes.
- Preparar reserva de imagens independente da reserva de dados: recurso correto e licenciado em cache ou alternativa real verificada. Quando faltar recurso autêntico, mostrar estado discreto de indisponibilidade, sem inventar uma imagem oficial, equipamento histórico ou retrato. Imagens ausentes não bloqueiam os dados do jogador.
- Validar cobertura, IDs, licença, limites, acessibilidade e qualidade dos dados de cada fornecedor antes de o anunciar como ativo. Testar falhas de rede, limites 429 e respostas incompletas.
- SoFIFA é opcional, condicionado aos seus requisitos de projeto não comercial, base própria e atribuição.
- eafc-db-kit como candidato para importações compatíveis. Auditoria de 01/11/2026: leitura dos snapshots FC 26/27 incluídos em `eafc-db-kit@1.1.0` executada sem avisos, mas não testada com saves do utilizador. Verificar atualização, plataforma, relações, direitos de reutilização e elegibilidade dos treinadores; MIT do código não concede licença aos dados/assets.
- API-Football, TheSportsDB e Wikimedia Commons são candidatos para retratos, emblemas e equipamentos, com cobertura e licenças verificadas por recurso.
- Camisolas e fontes exatas do clube não estão garantidas. Enquanto não existirem ficheiros adequados, sinalizar a limitação sem apresentar material inventado como oficial; conteúdo ilustrativo só em demonstrações explicitamente identificadas.
- Não há APIs externas ativas no código atual.

## Auditoria de dependências iniciada antes da luz verde — 01/11/2026

- Exigência reforçada pelo utilizador: investigar todos os uniformes e respetivo lettering das ligas, clubes e seleções licenciados em FC 26 e FC 27, incluindo equipas femininas e masculinas. A regra da temporada corrente/anterior mantém-se; não reduz a cobertura a alguns clubes.
- Relatório e evidências: [audit/README.md](audit/README.md). Inventário interno candidato: 1 669 linhas de equipas, 7 799 de equipamentos, 1 979 alterações por competição e 665 combinações edição/tipo/ID de fonte. Não confundir estes registos com o universo oficial, ficheiros físicos diferentes ou recursos já aprovados.
- Cada equipamento requer equipa/género, temporada real, variante, competição, lettering de nome/número, patches, emblema, origem, condições de uso, ficheiro e verificação visual. Aceitar glifos/texturas autorizados quando apropriado; converter formatos não resolve direitos em falta.
- A fonte pode mudar entre liga e Europa e entre camisolas do mesmo clube. Não herdar automaticamente a fonte da equipa masculina para a feminina ou de uma seleção para outra pelo fabricante.
- Fornecedores físicos identificados para alguns grupos: Avery Dennison e ID UNLIMITED. A existência de fornecedor/parceria não prova disponibilidade de ficheiro gratuito nem licença digital para o projeto. As restantes linhas permanecem explicitamente pendentes.
- Nenhuma biblioteca completa de fontes/uniformes autênticos com uso público gratuito foi validada. Nenhuma peça visual foi marcada pronta. A luz verde do utilizador autoriza a construção do tracker; a biblioteca completa continua a exigir ficheiros/permissões e não pode ser apresentada como pronta.
- A política EA não concede direitos sobre conteúdo de terceiros e proíbe obter assets por data mining. Não adotar extração dos ficheiros do jogo como reserva automática de uniformes, fontes ou faces. Fonte: https://help.ea.com/en/articles/security-and-rules/ea-content-policy/ .
- TheSportsDB foi testada com chave pública: a amostra gratuita de equipamentos de Arsenal/Benfica devolveu apenas duas versões antigas por equipa, sem fontes. Não selecionar como fonte suficiente da biblioteca atual/anterior.
- Wikimedia Commons teve uma chamada de metadados de retrato real bem-sucedida, mas não tem cobertura integral demonstrada. Guardar licença/autor por fotografia; fotos reais não equivalem a faces/modelos 3D.
- Materiais/iluminação podem usar recursos próprios ou CC0 de Poly Haven/ambientCG; os ficheiros concretos ainda precisam de seleção. Essas licenças não abrangem os emblemas, estampas ou designs de terceiros que lhes acrescentarmos.
- Frankfurter é candidato de câmbio gratuito com chamada EUR/GBP/USD/BRL testada; guardar data da taxa e valores originais do save. Não usar câmbio real para reescrever movimentos históricos.
- Preço antes de adicionar ao scout: as amostras lidas não demonstram valor de mercado de carreira utilizável; salário e cláusula encontrados no FC 27 não são esse valor. Validar fonte FC compatível ou estimativa própria identificada e calibrada, com origem/data. Não apresentar xTV da TransferRoom ou valor do Transfermarkt como importação disponível sem o acesso correspondente.
- Vercel Hobby/Supabase Free têm quotas. Preparar carregamento por clube/cena, cache permitido pela origem e controlo de tamanho dos uploads. Não prometer custos zero para qualquer volume de tráfego nem efetuar upgrades automáticos.
- Supabase Auth por email exige serviço de envio configurado para uso público; o SMTP padrão é limitado à equipa do projeto. Preparar SMTP compatível com o orçamento ou OAuth adequado, sem atalhos que eliminem a verificação de contas.
- Build auditado: TypeScript passou e Vite falhou por `src/styles.css` em falta. O estado existente é um protótipo incompleto, sem modelos/fontes nem integrações ligadas. Esta auditoria não autoriza construção ou publicação.

## Avaliação de Transfermarkt, zerozero e BeSoccer

- Estes serviços podem complementar informação de futebol real, referências e ligações externas, mas não substituem atributos/OVR/PlayStyles do FC nem acontecimentos do save do utilizador.
- Transfermarkt: útil como referência de valores de mercado, vínculos e percurso real. Não foi confirmada uma API pública gratuita autorizada. Os termos proíbem acesso/cópia automatizados por bots, spiders e scraping; não usar wrappers comunitários como se concedessem licença aos dados. Fonte: https://www.transfermarkt.com/intern/anb . Preço real estimado do Transfermarkt e valor no FC são conceitos separados, com fonte e data distintas.
- zerozero: possui API oficial para integração de dados desportivos; o acesso é encaminhado por contacto. A gratuitidade para este projeto não foi confirmada. Candidato a complementar biografias, clubes, competições e histórico real apenas se houver condições compatíveis. Fontes: https://api.zerozero.pt/ , https://api.zerozero.pt/contact e anúncio oficial https://www.zerozero.pt/noticias/api-para-clubes-e-media-zerozero-apresenta-nova-funcionalidade-na-expofut/1226890 . A leitura direta das páginas da API devolveu 403 nesta pesquisa; o catálogo público indexado não equivale a acesso testado com credenciais.
- BeSoccer: oferece API oficial com dados de equipas, jogadores, jogos e percurso, mas a página de planos declara que não tem contas gratuitas. Há referência a conta de teste, que não é uma oferta gratuita permanente. Não selecionar como dependência do produto sem orçamento. Fonte: https://api.besoccer.com/en/budgets .
- Não contactar os fornecedores nem criar contas sem instrução específica para isso. Nesta fase, apenas pesquisa e preparação de opções. Créditos não transformam acesso de leitura do site em autorização para republicar uma base ou imagens.

## Revisão do conceito — avaliação e recomendações

### Pontos fortes

- Separação das quatro experiências e dos papéis empresário/auxiliar dá sentido às mesmas ferramentas em contextos diferentes.
- Museu do percurso, peças ligadas aos jogos e épocas e balneário configurável são o núcleo visual que diferencia o produto.
- Registo rápido com histórico, edições e estatísticas derivadas cria utilidade diária e dados fiáveis para a IA.
- Autenticidade visual, preferências e sincronização ajudam a manter a experiência coerente em clubes, idiomas e dispositivos distintos.

### Mudanças de organização e entrega aprovadas pelo utilizador

- Agrupar navegação por tarefas, usando fichas e painéis contextuais, em vez de uma aba principal para cada requisito. Mostrar apenas as áreas relevantes para o papel da carreira.
- Entregar por etapas: núcleo de dados/conta/jogos/épocas e balneário; depois recrutamento/academia/finanças; depois museu avançado, sorteio/desafios e assistentes. Preparar o modelo histórico desde o início, mesmo que os cenários completos venham depois.
- Priorizar registo rápido e preenchimento opcional. Reutilizar os mesmos registos nas estatísticas, jornal, museu e IA; evitar tarefas de introdução repetidas.
- Manter geometria 3D reutilizável e texturas autênticas verificadas da temporada corrente/anterior. Cobertura de todos os equipamentos históricos deixou de ser requisito; versões exatas por passagem são um complemento opcional.
- Distinguir catálogo real, catálogo FC versionado, dados atuais do save e contexto fornecido à IA. Reservas entre fornecedores só podem substituir campos equivalentes.
- Avaliar a IA depois de o núcleo produzir dados consistentes, e medir qualidade/custo/desempenho antes de a tratar como parte indispensável do fluxo.

### Organização prevista da navegação

- Central reúne tarefas, objetivos, próximos jogos, forma recente e decisões pendentes; jogos/calendário são acessíveis de imediato, com registo rápido sempre visível no contexto adequado.
- Treinador/treinadora: Equipa (balneário, planos/escalações, academia), Recrutamento (catálogo, pastas, comparações, olheiros), Escritório (mercado, empréstimos, contratos, finanças, notas, auxiliar) e Legado (épocas, museu, seleção/percurso, recordes e galeria).
- Jogador/jogadora: O meu jogador/A minha jogadora (cacifo, atributos, evolução, desempenho e disponibilidade), Equipa (consulta do plantel e escalação), Empresário (objetivos, clubes-alvo, propostas, contrato e finanças pessoais) e Legado.
- Usar subnavegação e painéis contextuais, com áreas indisponíveis omitidas para o papel respetivo. Não criar quatro aplicações independentes nem copiar menus de gestão para atletas.
- Definições de conta/carreira, idiomas, moedas/medidas, privacidade e cópias ficam agrupadas. O assistente tem acesso contextual sem competir com a navegação principal.

## Etapas de construção aprovadas

1. Fundação: rever referências, esquema histórico das carreiras/épocas/passagens/atributos/equipamentos, quatro experiências, traduções, preferências, propriedade dos dados e adaptação Supabase. A ligação efetiva depende da configuração do projeto do utilizador.
2. Primeiro percurso utilizável: entrada e criação/continuação, catálogo FC validado/importação, central, balneário inicial autêntico, vários planos de equipa, registo rápido de jogos com recuperação de rascunhos, estatísticas e fecho de época. Edição, persistência e exportação/importação verificadas.
3. Gestão avançada e atleta: scouting/pastas/pesquisas/comparação, olheiros, academia, posições/PlayStyles, mercado/empréstimos/contratos/finanças, cartões/lesões/ausências/confiança, objetivos e clubes-alvo. Preservar a separação dos papéis.
4. Legado e descoberta: museu completo com peças em destaque, prémios, cachecóis, bolas, recordes, jornal, galeria, mapa, resumo de época, apresentações de chegada/promoção/despedida, catálogo de desafios e sorteio compatível de carreiras.
5. IA: testar a rota já integrada para Groq Free e Cloudflare Workers AI com saves reais, ajustar qualidade e segurança dos conselheiros e, opcionalmente, avaliar WebLLM local. Empresário para jogador/a e auxiliar para treinador/a. Não ativar Gemini gratuito no site UE nem fornecedor pago.
6. Verificação contínua em todas as etapas: permissões/sincronização/conflitos, recálculo sem duplicados, acessibilidade, móvel, movimento reduzido, desempenho 3D, autenticidade/licenças e documentos/mecanismos de privacidade para UE/Brasil. Não adiar isolamento de contas e proteção dos registos para o final.
7. Validar build, enviar para Haazug/CAREERTRACKER e documentar a importação na Vercel. Indicar o que estiver efetivamente operacional e as integrações ainda dependentes de configuração, sem prometer conclusão do âmbito inteiro numa única entrega.

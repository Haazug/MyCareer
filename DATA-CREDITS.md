# Dados, imagens e créditos

## Base FC 26 incluída

- Título: **FC 26 (FIFA 26) Player Data**
- Autor/publicador: **rovnez**
- Fonte: [Kaggle dataset](https://www.kaggle.com/datasets/rovnez/fc-26-fifa-26-player-data)
- Licença declarada pelo dataset: [Creative Commons Attribution 4.0 International (CC BY 4.0)](https://creativecommons.org/licenses/by/4.0/)
- Ficheiro adaptado: `public/data/fc26-catalog.json`
- Conteúdo: 18 405 jogadores, 662 clubes e 42 ligas
- Alterações: nomes e atributos colocados num catálogo JSON, posições mapeadas para as posições da app, cores conceptuais derivadas/adaptadas, URLs de retratos excluídos.
- A descrição do dataset diz que a recolha de dados veio de páginas SoFIFA. O site e os retratos de SoFIFA não são incorporados.

Atribuição curta para reutilização: **“FC 26 (FIFA 26) Player Data”, por rovnez, Kaggle, CC BY 4.0. Dados adaptados para MyCareer; retratos removidos. Origem descrita pelo autor: SoFIFA.**

## Base FC 27 incluída

- Snapshot: **12 de setembro de 2026**
- Conteúdo: **19 789 jogadores, 702 clubes e 62 ligas** (homens e mulheres)
- Ficheiro processado: `public/data/fc27-catalog.json`
- Origem publicada: [EA_FC_ANALYSIS por Lakshmi Kanth](https://github.com/LakshmiKanth11/EA_FC_ANALYSIS), com `players.csv` descrito como recolhido da API pública de ratings da EA.
- Atribuição: **“EA FC 27 Player Ratings Dataset”, por Lakshmi Kanth; snapshot de 2026-09-12, origem descrita como EA public ratings API. Adaptado para MyCareer; sem retratos ou emblemas.**
- Alterações: posições e atributos mapeados para o modelo da app; idade calculada pela data de nascimento e snapshot; URLs de imagem excluídos.
- Limitações do CSV de origem: não contém potencial, salários, contratos ou treinadores. Estes campos ficam vazios/estimados pelo modelo básico, e podem ser completados por importação local.
- O repositório de origem não declara uma licença Creative Commons separada; os direitos de uso deste rascunho privado foram indicados pelo utilizador. Os dados e marcas de jogo são atribuídos aos respetivos titulares.

## Treinadores incluídos e lista reutilizada

A lista selecionável inclui 779 pares treinador/clube da página [FC 26 Managers, da FIFPlay](https://www.fifplay.com/fc-26-managers/), capturada em 2026-11-02. Os nomes e clubes são editáveis e servem como ponto de partida; a licença Creative Commons não é indicada pela página. Para FC 27, a lista FC 26 é reutilizada como base do ano anterior, pelo pedido do utilizador, e pode conter clubes ou treinadores desatualizados. Crédito explícito: **FIFPlay, “FC 26 Managers - List & Cards Guide”, https://www.fifplay.com/fc-26-managers/**. Não é apresentada como base CC.

## Catálogo FC 27 e treinadores

O MyCareer aceita JSON ou CSV fornecido localmente pelo utilizador no assistente de carreira. Se a carreira usa dados do [FC Tools Hub](https://fctoolshub.com/pt/database/fc27/players), preenche os campos de autor, link e autorização no importador. A aplicação guarda essa atribuição com a carreira e mostra-a em **Créditos & dados**. Há páginas de [jogadores FC 27](https://fctoolshub.com/pt/database/fc27/players), [treinadores FC 27](https://fctoolshub.com/pt/database/fc27/managers) e [treinadores FC 26](https://fctoolshub.com/pt/database/fc26/managers).

A edição FC 27 pode ser adicionada pelo importador local em JSON (incluindo respostas paginadas em formato Inertia) ou CSV; a aplicação suporta jogadores, equipas, treinadores e atributos aninhados no formato do FC Tools Hub. A base incluída é um snapshot de uma fonte distinta do FC Tools Hub. Nenhum dump do FC Tools Hub está embutido e a app não recolhe essas páginas automaticamente. A publicação do Hub descreve a sua base como dados extraídos de ficheiros de elenco do jogo e não declara uma licença Creative Commons para redistribuição. O importador guarda a autorização/licença indicada pelo utilizador em cada carreira.

## Emblemas

O criador de carreira pesquisa no [Wikimedia Commons](https://commons.wikimedia.org/wiki/Special:MediaSearch). A lista só inclui ficheiros cuja API indica CC0 ou Creative Commons BY. A carreira guarda autor, página original, licença e URL da licença. A imagem fica reduzida localmente. Confirma a página original e o âmbito da licença antes de reutilizares o ficheiro fora do teste.

[football-logos.cc](https://football-logos.cc/license/) é usado como referência visual; o próprio aviso do site não licencia a redistribuição dos seus ficheiros.

## Kits e símbolos

As camisolas mostradas no balneário, no resumo de carreira, na ficha de jogador e no museu são designs conceptuais criados em código. Cada clube tem padrões, cores e um motivo simbólico; os detalhes não copiam os kits oficiais nem incluem patrocínios, patches ou lettering do jogo. Os motivos mais reconhecíveis (por exemplo, ave, urso ou tridente) são ilustrações conceptuais do MyCareer.

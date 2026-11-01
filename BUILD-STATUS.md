# Estado da construção

Atualizado em 1 de novembro de 2026. Repositório-alvo: [Haazug/CAREERTRACKER](https://github.com/Haazug/CAREERTRACKER), ramo `main`. Nenhuma publicação na Vercel foi feita.

## Versão funcional, sem publicação na Vercel

- O build original foi recuperado com folha de estilos responsiva e aplicação inicial em React, TypeScript e Vite.
- O assistente de carreira inicia FC 26 em 2025/26 e FC 27 em 2026/27; as carreiras podem guardar no máximo 15 épocas. A entrada inclui sorteio de carreira, seleção de desafio curto/longo e cenários distintos de jogador/a e treinador/a; o desafio fica visível na carreira e o transfer ban bloqueia novas contratações (incluindo gratuitas e empréstimos).
- Carreiras antigas migram ao carregar, mantendo jogos e adicionando época aos registos antigos; exportação/importação passa pela validação do modelo.
- A nova página de épocas permite fechar temporadas, guardar resumos coletivos e individuais, consultar resultados de jogadores e manter partidas no histórico. Os nomes Época, Season, Saison, Temporada e Stagione estão disponíveis.
- A página de tática permite guardar e carregar até 30 plantéis com formação, onze e banco de suplentes ordenável (só aparece em carreira de treinador/treinadora); planos antigos migram automaticamente.
- A carreira de jogador/a tem uma página separada para objetivos pessoais e clubes-alvo, com progresso editável; a carreira de treinador/a tem scout e academia próprios. Ainda não há parecer de agente ou auxiliar gerado por IA.
- A academia de formação permite adicionar jovens, acompanhar OVR/potencial/estatísticas manualmente e promovê-los ao plantel.
- O scout permite criar observações manuais em pastas, pesquisar, editar estados, registar potencial e adicionar uma estimativa de preço antes de guardar. O preço fica marcado como manual ou desconhecido porque nenhuma cotação licenciada está ligada.
- A identidade visível agora é MyCareer, com tipografia de sistema, modo wordmark provisório e paleta preta, branca e bege. O balneário 3D original é percorrível por teclado, rato e toque; a câmara também inclina, e cada carreira pode editar paredes, detalhes, teto, luz, símbolo e frase. Dias normais mostram apenas cabines; dias de jogo penduram camisolas com nomes/números; pós-jogo expõe bola geométrica de hat-trick e taça ilustrativa com rotação e balanço suaves se os registos individuais existirem. As camisolas penduradas têm movimento inercial simples. Os planos de sala migram sem apagar saves; a cena continua sem asset oficial.
- Minutas de privacidade, cookies e termos estão acessíveis desde a entrada e no interior da aplicação. Identificação e contacto do responsável, alojamento final e eventuais fornecedores ainda precisam de ser preenchidos antes de uma publicação real.
- O registo [SOURCES-AND-RIGHTS.md](SOURCES-AND-RIGHTS.md) compara as bases/API e documenta licenças, limites, fallbacks e estado de cada integração; termos de TheSportsDB e encerramento da FKAPI foram revistos em novembro de 2026; o detalhe de equipamentos e lettering continua na [auditoria](audit/README.md).

## Fontes visuais e de dados

Não existe aqui uma biblioteca autenticada de camisolas, fontes de números/nomes, emblemas ou faces FC 26/27. A auditoria de duas amostras encontrou 7 799 linhas candidatas de kits e 665 combinações de IDs de lettering, mas nenhum ficheiro aprovado para produção. IDs de bases do jogo e um leitor sob licença MIT não liberam o conteúdo subjacente. Não extraímos nem republicamos assets do FC.

As formas, texturas 3D, troféu ilustrativo e brasões genéricos são placeholders próprios; o lettering atual é genérico. A documentação das fontes gratuitas destaca OpenFootball para calendários/resultados públicos com licença CC0, TheSportsDB apenas para metadados e artwork cuja licença individual seja demonstrada, e fontes com SIL Open Font License para eventual tipografia de interface. Nenhuma dessas fontes é apresentada como completa ou autenticada para o modo carreira FC.

## Verificação

- `npm test`: testes de migração, épocas/traduções/limites, prestações, empréstimos, banco ordenado, transfer ban, paleta/letreiro de teto e saldo futuro passam.
- `npm run build`: TypeScript e Vite passam.
- O build separa o balneário 3D do carregamento inicial. O chunk de Three.js continua com cerca de 532 KB minificados (133 KB gzip); a compilação sinaliza-o para otimização posterior. O módulo do balneário tem 15,3 KB (5,8 KB gzip).
- A cena não foi testada visualmente num browser ou em vários dispositivos nesta sessão. Movimento/fps, colisões e qualidade em telemóvel precisam de ensaio real.

## O que ainda falta para chamar isto de completo

1. Catálogo real por edição, temporada, género e modo, com procedência e direitos de distribuição; extensível a clubes/ligas/seleções FC 26 e 27.
2. Uniformes, logos, faces e fontes oficiais por kit/competição com licença de exibição e adaptação confirmada. O registo não tem tal biblioteca, pelo que a versão atual usa peças próprias.
3. Autenticação/sincronização Supabase, isolamento entre contas, recuperação de senha e política de retenção; nenhuma conta está configurada.
4. IA generativa do agente e do auxiliar: WebLLM e Groq foram registados como opções candidatas, mas ainda não foram integrados, avaliados com saves reais ou oferecidos na aplicação.
5. Evolução e validação dos fluxos de jogador versus treinador/treinadora; progressão automática de objetivos/desafios e fim de transfer ban por período ainda não existem. A gestão aprofundada de contratos/lesões/suspensões, scout com dados reais, museu jogável e vista completa de partidas também permanece por construir.
6. Personalização completa de moedas, unidades, idiomas por toda a aplicação e filtros de género nas definições da carreira.
7. Política legal final adaptada à identidade do operador e fornecedores ativos; teste visual/acessibilidade, compatibilidade móvel, cópias de segurança e navegação completa.
8. Deploy na Vercel, definição dos domínios e preenchimento dos dados legais do operador.

Este é um build de desenvolvimento já funcional em vários percursos, mas não uma entrega final nem um catálogo/licenciamento concluído.

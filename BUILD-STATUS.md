# Estado da construção

Atualizado em 2 de novembro de 2026. Repositório-alvo: [Haazug/CAREERTRACKER](https://github.com/Haazug/CAREERTRACKER), ramo `main`. Nenhuma publicação na Vercel foi feita.

## Versão funcional, sem publicação na Vercel

- O build original foi recuperado com folha de estilos responsiva e aplicação inicial em React, TypeScript e Vite.
- O assistente de carreira inicia FC 26 em 2025/26 e FC 27 em 2026/27; as carreiras podem guardar no máximo 15 épocas. A entrada inclui sorteio de carreira, seleção de desafio curto/longo e cenários distintos de jogador/a e treinador/a; o desafio fica visível na carreira e o transfer ban bloqueia novas contratações (incluindo gratuitas e empréstimos).
- Carreiras antigas migram ao carregar, mantendo jogos e adicionando época aos registos antigos; exportação/importação passa pela validação do modelo.
- A nova página de épocas permite fechar temporadas, guardar resumos coletivos e individuais, consultar resultados de jogadores e manter partidas no histórico. Os nomes Época, Season, Saison, Temporada e Stagione estão disponíveis.
- A página de tática permite guardar e carregar até 30 plantéis com formação, onze e banco de suplentes ordenável (só aparece em carreira de treinador/treinadora); planos antigos migram automaticamente.
- A carreira de jogador/a tem objetivos e clube-alvo próprios; a de treinador/a tem scout e academia. A nova página de conselheiro separa empresário e auxiliar e transmite apenas resumo mínimo depois de consentimento.
- A academia de formação permite adicionar jovens, acompanhar OVR/potencial/estatísticas manualmente e promovê-los ao plantel.
- O scout permite observações em pastas, potencial, preço antes de guardar e atalhos de pesquisa manual para SoFIFA, Transfermarkt e BeSoccer. Não coleta dados automaticamente: restrições/licenças não permitem a integração pretendida sem base/licença próprias.
- As camisolas mostram apenas a frente; nome, número, posição e OVR ficam na placa acima do cabide/cabine e na lista do plantel. Não existe vista de costas. Um emblema próprio/licenciado pode ser carregado na carreira. A identidade visível agora é MyCareer, com tipografia de sistema, modo wordmark provisório e paleta preta, branca e bege. O balneário 3D original é percorrível por teclado, rato e toque; a câmara também inclina, e cada carreira pode editar paredes, detalhes, teto, luz, símbolo e frase. Dias normais mostram apenas cabines; dias de jogo penduram camisolas com nomes/números; pós-jogo expõe bola geométrica de hat-trick e taça ilustrativa com rotação e balanço suaves se os registos individuais existirem. As camisolas penduradas têm movimento inercial simples. Os planos de sala migram sem apagar saves; a cena continua sem asset oficial.
- Minutas de privacidade, cookies e termos estão acessíveis desde a entrada e no interior da aplicação; a privacidade explica armazenamento local, conta opcional, sincronização Supabase e consentimento para Groq/Cloudflare AI. Gemini foi excluído por termos incompatíveis com a audiência UE/menores no plano gratuito. Identificação/contacto do responsável e alojamento final ainda precisam de ser preenchidos antes de uma publicação pública.
- Login email/palavra-passe e sincronização Supabase estão implementados com sessão local, sincronização automática/manual, schema SQL e RLS por utilizador. A configuração e os passos copiáveis estão em [SUPABASE-SETUP.md](SUPABASE-SETUP.md). Nenhuma chave/projeto real foi fornecida ou configurada; falta testar a integração contra o projeto Supabase do operador. A recuperação de palavra-passe e a eliminação de conta pela interface ainda não existem.
- O registo [SOURCES-AND-RIGHTS.md](SOURCES-AND-RIGHTS.md) compara as bases/API e documenta licenças, limites, fallbacks e estado de cada integração; termos de TheSportsDB e encerramento da FKAPI foram revistos em novembro de 2026; o detalhe de equipamentos e lettering continua na [auditoria](audit/README.md).

## Fontes visuais e de dados

Atualizado em 2 de novembro de 2026. O repositório agora inclui 18 405 registos de jogadores FC 26 e 662 clubes de um dataset Kaggle sob CC BY 4.0, com atribuição, URLs de retratos removidos e posições convertidas para as posições da app. Não é uma lista completa verificada de todos os clubes licenciados nem traz treinadores FC 26/27. O assistente aceita ficheiros locais CSV/JSON para dados FC 27 e treinadores, guardando créditos com a carreira.

Não existe uma biblioteca autenticada de camisolas oficiais, lettering ou faces FC 26/27. Os emblemas podem ser pesquisados no Wikimedia Commons, filtrados por CC0/CC BY, com autor e licença guardados na carreira. As texturas 3D, camisolas, troféu e brasões sem imagem são ilustrações conceptuais próprias; nenhuma imagem de kit ou face foi copiada do jogo. O calendário inclui OpenFootball (CC0) para dez competições masculinas; guarda datas, jornadas e adversários e descarta resultados reais. Kits DLS do football-logos.cc, Footy Headlines e Football Kit Archive servem apenas de referência manual.

## Verificação

- `npm test`: testes de migração, épocas/traduções/limites, prestações, empréstimos, banco ordenado, transfer ban, paleta/letreiro de teto e saldo futuro passam.
- `npm run build`: TypeScript e Vite passam.
- O build separa o balneário 3D do carregamento inicial. O chunk de Three.js continua com cerca de 532 KB minificados (133 KB gzip); a compilação sinaliza-o para otimização posterior. O módulo do balneário tem 15,3 KB (5,8 KB gzip).
- A cena não foi testada visualmente num browser ou em vários dispositivos nesta sessão. Movimento/fps, colisões e qualidade em telemóvel precisam de ensaio real.

## O que ainda falta para chamar isto de completo

1. Completar o catálogo por edição, temporada, género, clube e treinadores; FC 27 ainda depende de ficheiro fornecido localmente. Validar os direitos de todos os dados antes de qualquer reutilização fora do teste privado.
2. Os kits e motivos atuais são conceptuais. Emblemas CC são escolhidos e creditados por carreira; kits, faces e lettering oficiais não estão incluídos.
3. Recuperação de palavra-passe, eliminação de conta pela interface e política de retenção; a primeira versão já isola a leitura/escrita com RLS e evita misturar saves locais quando se troca de conta no mesmo navegador.
4. IA: endpoint Vercel implementado para Groq e Cloudflare Workers AI, com roles separados, consentimento independente, fallback autorizado, limites e sem histórico persistido. Precisa de chaves de servidor; não está ativo sem configuração e ainda não foi avaliado com contas/modelos reais.
5. Evolução e validação dos fluxos de jogador versus treinador/treinadora; progressão automática de objetivos/desafios e fim de transfer ban por período ainda não existem. A gestão aprofundada de contratos/lesões/suspensões, scout com dados reais, museu jogável e vista completa de partidas também permanece por construir.
6. Personalização completa de moedas, unidades, idiomas por toda a aplicação e filtros de género nas definições da carreira.
7. Política legal final adaptada à identidade do operador e fornecedores ativos; teste visual/acessibilidade, compatibilidade móvel, cópias de segurança e navegação completa.
8. Deploy na Vercel, definição dos domínios e preenchimento dos dados legais do operador.

Este é um build de desenvolvimento já funcional em vários percursos, mas não uma entrega final nem um catálogo/licenciamento concluído.

# MyCareer

Tracker independente para guardar carreiras de futebol no FC 26/27. A versão atual inclui carreiras guardadas localmente, cópias JSON, assistente de carreira e sorteio de desafios, calendário e registo de jogos, resumos/arquivo de épocas, planos táticos múltiplos com banco de suplentes ordenável, scout manual, academia de formação para treinadores, objetivos e museu pessoal para jogador/a, registos de disciplina e lesões, empréstimos e pagamentos faseados, finanças, troféus e balneário 3D procedural.

## Correr localmente

```sh
npm install
npm run dev
```

Verificações locais: `npm test` e `npm run build`. O diretório de saída do Vite é `dist/`. O projeto inclui configuração para Vercel.

## Estado dos dados

Os catálogos incluem FC 26 (18 405 jogadores, 662 clubes, 42 ligas; Kaggle/rovnez, CC BY 4.0) e FC 27 (19 789 jogadores, 702 clubes, 62 ligas; snapshot 12/09/2026 de Lakshmi Kanth, origem descrita como EA public ratings API). Em ambos, os retratos e URLs de imagem foram removidos; cada carreira nova pode receber até 36 jogadores do clube selecionado. O snapshot FC 27 não fornece potencial, contratos, salários ou treinadores. Podes completar os dados FC 26/27 com JSON/CSV local, incluindo treinadores, com créditos guardados na carreira. Não há recolha automática de dados do FC Tools Hub nem ligação ao jogo. Os registos continuam no armazenamento local do browser; se configurares Supabase, as carreiras também podem ser sincronizadas na conta autenticada.

Os plantéis FC 26 e FC 27 são editáveis e mantêm os atributos disponíveis no snapshot. Os uniformes do balneário e museu são designs conceptuais originais por clube; emblemas marcados no Commons são pesquisados apenas entre ficheiros CC0/CC BY e guardam autor, origem e licença na carreira. Os catálogos carregados pelo utilizador podem creditar o FC Tools Hub ou outra fonte indicada. A atribuição do snapshot FC 27 embutido está descrita em [DATA-CREDITS.md](DATA-CREDITS.md). O calendário tem um importador opcional OpenFootball (CC0) para dez ligas masculinas: importa datas, jornadas e adversários como jogos agendados, sem resultados reais. A conta e a sincronização Supabase são opcionais e ficam desativadas até configurares as variáveis públicas indicadas em [SUPABASE-SETUP.md](SUPABASE-SETUP.md). Os conselheiros de IA estão implementados como funções opcionais de servidor (Groq principal e Cloudflare Workers AI de reserva), mas só ficam operacionais quando o operador configurar as chaves privadas; nenhum segredo vem no repositório. As fontes e atribuições estão em [DATA-CREDITS.md](DATA-CREDITS.md) e [SOURCES-AND-RIGHTS.md](SOURCES-AND-RIGHTS.md). Os kits 26/27 servem de inspiração para padrões conceptuais sem patches, marcas ou lettering oficial. A validação dos equipamentos e tipos de letra está em [audit/README.md](audit/README.md) e [GREENLIGHT-REPORT.md](GREENLIGHT-REPORT.md).

## Deploy na Vercel

Importar o repositório, selecionar Vite e manter o comando de build `npm run build` e diretório de saída `dist`. Para ativar conta e sincronização, configurar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` e executar `supabase/schema.sql` no SQL Editor. O guia copiável está em [SUPABASE-SETUP.md](SUPABASE-SETUP.md). Para ativar os conselheiros, adicionar `GROQ_API_KEY`, `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` como variáveis privadas no servidor Vercel. Criar cada conta no plano gratuito; quotas excedidas apenas interrompem o serviço. Para testar as funções localmente, usar `vercel dev` com um `.env.local` próprio (não versionar chaves). Os formulários de consentimento permitem selecionar o fornecedor e autorizar a reserva separadamente. As minutas legais não estão prontas para lançamento até preencher a identidade/contacto do operador e rever fornecedores de alojamento.

## Identidade visual e balneários

A aplicação chama-se MyCareer. O visual usa preto, branco-chalk e bege; cada carreira pode personalizar as cores, a luz, as iniciais e a frase do teto do balneário. As referências documentadas incluem Benfica (imagem enviada), Real Madrid, Barcelona, Inter e AC Milan. Os modelos atuais são originais e não usam escudos, camisolas ou fontes oficiais. É possível carregar um emblema PNG/JPG/WebP próprio na carreira; a imagem é reduzida e fica no navegador. Detalhes em [ROOM-INSPIRATION.md](ROOM-INSPIRATION.md).

## Direitos e créditos

O projeto não é afiliado à EA Sports, às competições nem aos clubes. Kits, fontes, faces, escudos ou estatísticas provenientes de terceiros só podem ser publicados com direitos verificados; nenhum asset oficial do FC está incluído. O balneário, camisolas e troféus atuais são modelos demonstrativos próprios. A imagem ilustrativa de estádio veio de Unsplash, ficheiro `photo-1522778119026-d647f0596c20`; créditos e políticas encontram-se na aplicação e em `SOURCES-AND-RIGHTS.md`.

# MyCareer

Tracker independente para guardar carreiras de futebol no FC 26/27. A versão atual inclui carreiras guardadas localmente, cópias JSON, assistente de carreira e sorteio de desafios, calendário e registo de jogos, resumos/arquivo de épocas, planos táticos múltiplos com banco de suplentes ordenável, scout manual, academia de formação para treinadores, objetivos e museu pessoal para jogador/a, registos de disciplina e lesões, empréstimos e pagamentos faseados, finanças, troféus e balneário 3D procedural.

## Correr localmente

```sh
npm install
npm run dev
```

Verificações locais: `npm test` e `npm run build`. O diretório de saída do Vite é `dist/`. O projeto inclui configuração para Vercel; ainda não foi publicado.

## Estado dos dados

O catálogo curto de equipas e os plantéis-semente são editáveis, demonstrativos e não oficiais. A aplicação não está ligada ao FC nem importa saves. Os registos ficam no armazenamento local do browser. Se configurares Supabase, também podem ser sincronizados na conta autenticada; exporta uma cópia antes de mudares de dispositivo ou apagares dados do site.

Jogadores, OVR, preços de scout e movimentos são introduzidos pelo utilizador. O calendário tem um importador opcional OpenFootball (CC0) para dez ligas masculinas: importa datas, jornadas e adversários como jogos agendados, sem resultados reais. Não há catálogo automático de jogadores. A conta e a sincronização Supabase são opcionais e ficam desativadas até configurares as variáveis públicas indicadas em [SUPABASE-SETUP.md](SUPABASE-SETUP.md). Os conselheiros de IA estão implementados como funções opcionais de servidor (Groq principal e Cloudflare Workers AI de reserva), mas só ficam operacionais quando o operador configurar as chaves privadas; nenhum segredo vem no repositório. As opções investigadas, termos, licenças e estado de cada dependência estão em [SOURCES-AND-RIGHTS.md](SOURCES-AND-RIGHTS.md). Os índices de kits 26/27 são usados apenas para pesquisa visual manual; imagens não são copiadas. A validação dos equipamentos e tipos de letra está em [audit/README.md](audit/README.md) e [GREENLIGHT-REPORT.md](GREENLIGHT-REPORT.md).

## Deploy na Vercel

Importar o repositório, selecionar Vite e manter o comando de build `npm run build` e diretório de saída `dist`. Para ativar conta e sincronização, configurar `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` e executar `supabase/schema.sql` no SQL Editor. O guia copiável está em [SUPABASE-SETUP.md](SUPABASE-SETUP.md). Para ativar os conselheiros, adicionar `GROQ_API_KEY`, `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` como variáveis privadas no servidor Vercel. Criar cada conta no plano gratuito; quotas excedidas apenas interrompem o serviço. Para testar as funções localmente, usar `vercel dev` com um `.env.local` próprio (não versionar chaves). Os formulários de consentimento permitem selecionar o fornecedor e autorizar a reserva separadamente. As minutas legais não estão prontas para lançamento até preencher a identidade/contacto do operador e rever fornecedores de alojamento.

## Identidade visual e balneários

A aplicação chama-se MyCareer. O visual usa preto, branco-chalk e bege; cada carreira pode personalizar as cores, a luz, as iniciais e a frase do teto do balneário. As referências documentadas incluem Benfica (imagem enviada), Real Madrid, Barcelona, Inter e AC Milan. Os modelos atuais são originais e não usam escudos, camisolas ou fontes oficiais. É possível carregar um emblema PNG/JPG/WebP próprio na carreira; a imagem é reduzida e fica no navegador. Detalhes em [ROOM-INSPIRATION.md](ROOM-INSPIRATION.md).

## Direitos e créditos

O projeto não é afiliado à EA Sports, às competições nem aos clubes. Kits, fontes, faces, escudos ou estatísticas provenientes de terceiros só podem ser publicados com direitos verificados; nenhum asset oficial do FC está incluído. O balneário, camisolas e troféus atuais são modelos demonstrativos próprios. A imagem ilustrativa de estádio veio de Unsplash, ficheiro `photo-1522778119026-d647f0596c20`; créditos e políticas encontram-se na aplicação e em `SOURCES-AND-RIGHTS.md`.

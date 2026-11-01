# Touchline

Tracker independente para guardar carreiras de futebol no FC 26/27. A versão atual inclui carreiras guardadas localmente, cópias JSON, assistente de carreira e sorteio de desafios, calendário e registo de jogos, resumos/arquivo de épocas, planos táticos múltiplos, scout manual, academia de formação para treinadores, objetivos e museu pessoal para jogador/a, registos de disciplina e lesões, empréstimos e pagamentos faseados, finanças, troféus e balneário 3D procedural.

## Correr localmente

```sh
npm install
npm run dev
```

Verificações locais: `npm test` e `npm run build`. O diretório de saída do Vite é `dist/`. O projeto inclui configuração para Vercel; ainda não foi publicado.

## Estado dos dados

O catálogo curto de equipas e os plantéis-semente são editáveis, demonstrativos e não oficiais. A aplicação não está ligada ao FC nem importa saves. Os registos ficam no armazenamento local do browser; exporta uma cópia antes de mudares de dispositivo ou apagares os dados do site.

Jogadores, jogos, OVR, preços de scout e movimentos são introduzidos pelo utilizador. Não há conta, sincronização Supabase, IA generativa ou API externa ativa nesta versão. As opções investigadas, termos, licenças e estado de cada dependência estão em [SOURCES-AND-RIGHTS.md](SOURCES-AND-RIGHTS.md). A validação dos equipamentos e tipos de letra está em [audit/README.md](audit/README.md) e [GREENLIGHT-REPORT.md](GREENLIGHT-REPORT.md).

## Deploy na Vercel

Importar o repositório, selecionar Vite e manter o comando de build `npm run build` e diretório de saída `dist`. Não são necessárias variáveis de ambiente para as funções atuais. As minutas legais não estão prontas para lançamento até preencher a identidade/contacto do operador e rever fornecedores de alojamento.

## Direitos e créditos

O projeto não é afiliado à EA Sports, às competições nem aos clubes. Kits, fontes, faces, escudos ou estatísticas provenientes de terceiros só podem ser publicados com direitos verificados; nenhum asset oficial do FC está incluído. O balneário, camisolas e troféus atuais são modelos demonstrativos próprios. A imagem ilustrativa de estádio veio de Unsplash, ficheiro `photo-1522778119026-d647f0596c20`; créditos e políticas encontram-se na aplicação e em `SOURCES-AND-RIGHTS.md`.

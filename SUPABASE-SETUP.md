# Configuração do Supabase e da Vercel

Este guia ativa contas por email e sincronização opcional das carreiras MyCareer. A aplicação continua a guardar uma cópia local no navegador. A sincronização usa uma linha JSON por conta e políticas RLS para que cada pessoa só leia e altere os próprios dados.

## 1. Criar a tabela e as políticas

1. Abre o projeto no Supabase.
2. Vai a **SQL Editor → New query**.
3. Abre `supabase/schema.sql` neste repositório, copia o ficheiro inteiro e cola na query.
4. Carrega em **Run**. A query cria `public.career_saves`, ativa RLS e limita leitura e escrita à conta autenticada.

Não precisas de criar tabelas ou políticas manualmente além deste SQL.

## 2. Ativar contas por email

1. No Supabase, vai a **Authentication → Providers → Email** e deixa Email ativo.
2. Em **Authentication → URL Configuration**, define o **Site URL** para o endereço principal publicado pela Vercel, por exemplo `https://mycareer.vercel.app`.
3. Adiciona esse mesmo domínio aos **Redirect URLs**. Se usares um domínio próprio, adiciona-o também.
4. A confirmação de email pode ficar ativa. Nesse caso, depois de criar conta, confirma o link recebido e regressa ao site para iniciar sessão. O SMTP de origem do Supabase tem limites e pode enviar apenas para endereços verificados da equipa do projeto; para permitir registos públicos, configura um SMTP próprio em Authentication → SMTP Settings (o preço depende do fornecedor).

## 3. Obter as duas variáveis públicas

No Supabase abre **Project Settings → API** (em algumas versões, **API Keys**). Copia:

- **Project URL** → valor de `VITE_SUPABASE_URL`.
- A chave pública **anon / publishable** → valor de `VITE_SUPABASE_ANON_KEY`.

A chave `anon`/`publishable` é entregue ao navegador e pode ser visível no código compilado. A segurança dos dados vem das políticas RLS do SQL acima. **Nunca uses `service_role` / `secret` no navegador, em `VITE_*` ou no repositório.** O MyCareer não precisa dessa chave administrativa.

## 4. Colar as variáveis na Vercel

1. Abre o projeto na Vercel e vai a **Settings → Environment Variables**.
2. Cria `VITE_SUPABASE_URL` e cola o Project URL.
3. Cria `VITE_SUPABASE_ANON_KEY` e cola a chave pública.
4. Marca os ambientes onde vais usar a app: **Production**, **Preview** e **Development**.
5. Guarda e faz **Redeploy**. As variáveis `VITE_*` são incorporadas durante o build; guardar as variáveis sem novo deploy não altera o site já publicado.

Para desenvolvimento local, copia `.env.example` para `.env.local` e preenche as mesmas duas variáveis. O `.env.local` está ignorado pelo Git. Não coloques valores reais em `.env.example`.

## 5. Variáveis opcionais dos conselheiros de IA

Para ativar os modelos de IA, adiciona apenas na Vercel, como variáveis privadas do servidor:

- `GROQ_API_KEY` — fornecedor principal.
- `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID` — fornecedor de reserva.

Não lhes acrescentes o prefixo `VITE_`. Não é necessário configurar IA para login ou sincronização. As quotas gratuitas dependem dos fornecedores.

## 6. Confirmar que funciona

1. Abre o domínio da Vercel e entra em **Conta e sincronização**.
2. Cria uma conta com email e palavra-passe; confirma o email se o Supabase pedir.
3. Inicia sessão, cria ou altera uma carreira e espera pelo estado **Sincronizada na nuvem**.
4. Abre o mesmo domínio noutro navegador/dispositivo e inicia sessão na mesma conta. A carreira deve aparecer; **Sincronizar agora** permite pedir uma sincronização manual.
5. No Supabase, **Table Editor → career_saves** mostra apenas uma linha por conta autenticada, com o save guardado em `save_data`.

O site guarda a sessão neste navegador e mantém a cópia local. Ao ligar uma conta diferente no mesmo navegador, a aplicação separa os saves e mantém uma cópia local específica por conta; ao regressares à conta anterior, volta a carregá-la sem misturar as carreiras entre utilizadores. A sincronização é automática após alterações, com botão manual de recuperação. Esta primeira versão não tem colaboração em tempo real nem histórico de versões; mantém também as cópias JSON do menu **Cópias de segurança**.

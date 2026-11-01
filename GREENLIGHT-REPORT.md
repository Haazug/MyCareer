# MyCareer — relatório para a luz verde

## Veredicto

**Luz verde recebida em 1 de novembro de 2026: iniciar a construção por etapas.** Cobertura gratuita e autêntica de todos os uniformes/fontes ainda não está demonstrada. Esta limitação define o que pode ser chamado de pronto e permanece no roteiro, sem suspender a construção da base funcional.

O plano funcional está definido. Foram agora testadas bases candidatas das duas edições, inventariados os registos de equipamentos e ensaiadas APIs públicas. Faltam a validação do universo oficial por atualização/modo, os ficheiros e as condições de uso de toda a biblioteca visual. **Inventário de IDs não é biblioteca pronta.** O detalhe, evidências e lacunas estão na [auditoria de dependências](audit/README.md).

## 1. Alterações finais incorporadas

### Mercado FC 27

A EA documenta prestações, condições de pagamento, direitos futuros, comissões, trocas e movimentos diferidos no [Career Deep Dive oficial](https://www.ea.com/games/ea-sports-fc/fc-27/news/pitch-notes-fc27-career-mode-deep-dive). O plano foi revisto para acomodar essas operações.

Decisões do nosso tracker:

- Separar operação (compra, venda, livre, pré-contrato, empréstimo, renovação, regresso ou rescisão) da forma de pagamento.
- Registar entrada e parcelas, obrigações a pagar/a receber, bónus condicionais, salários, prémios e comissões em componentes distintos.
- Registar troca de atletas e compra com permanência no clube anterior por empréstimo quando aplicável.
- Mostrar compromisso fixo total, caixa já movimentado, obrigações futuras e condições ainda por cumprir.
- Confirmar uma liquidação uma única vez; transportar obrigações para a época seguinte sem repetir lançamentos.
- Guardar o orçamento observado no save para conciliação. Uma estimativa financeira do tracker não será apresentada como reprodução garantida do cálculo interno do FC.
- Transferência sem taxa não significa contrato sem salário ou sem outros encargos.
- O auxiliar analisa o acordo do clube; o empresário analisa a situação contratual do atleta. As duas perspetivas usam os dados apropriados.

O detalhe de campos, validações e fronteiras por edição está em PRODUCT-PLAN.md.

### Decoração do balneário

- A arquitetura continua inspirada na referência da Luz, com adaptação ao clube.
- O vestiário é uma sala 3D navegável com uma cabine por atleta; a câmara percorre o espaço e as cabines, por gestos/controlos e com alternativa acessível.
- Selecionar uma cabine/camisola abre a página daquele jogador ou jogadora. Ao voltar, recuperar a posição de câmara e a cabine visitada; distinguir clique de arrasto para evitar aberturas acidentais.
- Estados do calendário do save: dia normal só com as cabines; pré-jogo com camisolas viradas de costas, nomes, números e patches/variante adequados quando disponíveis; pós-jogo com bolas de hat-trick e distinções de melhor em campo junto dos respetivos atletas, quando registadas.
- Peças pós-jogo abrem a partida e podem integrar o museu sem duplicar conquistas. A mudança para a vista normal remove a exposição temporária, preservando os dados e o museu.
- Molduras/painéis podem mostrar fotografia real, uma frase, emblema ou símbolo/mascote, conforme o tema e os recursos disponíveis.
- Exemplos fornecidos pelo utilizador: COYS, diabo vermelho e águia.
- Ídolos são uma opção de decoração, não um requisito para todos os clubes.
- Recursos identificados, materiais cuidados e composição contida. Não inventar fotografias oficiais com IA.

### Equipamentos

- A camisola pode ser a da temporada corrente da biblioteca ou da temporada anterior, inclusive no museu de uma passagem mais antiga.
- Mostrar a temporada real do recurso e tratá-lo como representação daquela passagem quando os anos diferirem.
- Manter em separado o ano do equipamento, o período representado, o nome e o número do atleta.
- Uma biblioteca completa de uniformes de todos os anos futuros/anteriores deixa de ser condição de entrega. Equipamentos históricos exatos são opcionais.
- Reutilizar geometria 3D e aplicar texturas corretas e verificadas, mantendo a distinção entre clube, equipa e guarda-redes.

### Últimos refinamentos aprovados

- Rascunhos automáticos para recuperar formulários interrompidos, sem contabilizar jogos por terminar.
- Peças escolhidas pelo utilizador para destaque no museu, sem duplicar objetos nem estatísticas.
- Apresentações de contratação e promoção da academia, reutilizando as camisolas/modelos e associadas a movimentos já confirmados.
- Apresentações de despedida de clube e fim de carreira com números, momentos e conquistas, preservando os capítulos no museu.
- Animações saltáveis e compatíveis com movimento reduzido; visualizar uma apresentação não confirma operações nem apaga dados.
- Critério final de qualidade 3D: modelos com proporções, detalhes, materiais e estampas cuidados, identidade do clube preservada e avaliação próxima/de contexto. Os SVG genéricos atuais não são os recursos finais.
- Créditos para todas as marcas efetivamente representadas e, separadamente, autores de modelos, texturas, fotografias, fontes e dados, com condições verificadas por recurso. Atribuição não substitui a permissão necessária para uso.
- Físicas seletivas dos objetos: caimento/oscilações de camisolas e cachecóis, peso/inércia de peças rígidas e rolamento/ressalto de bolas, com limites e colisões adequados ao cenário.
- Transições contínuas de câmara e interface entre cena, ficha e museu, com apresentações saltáveis. Ajustar simulação e efeitos ao dispositivo, respeitar movimento reduzido e testar em conjunto com a IA local.

## 2. Âmbito consolidado

| Área | Aprovado |
| --- | --- |
| Início | Iniciar, continuar e sortear carreira; quatro experiências; existente/criado; equipa e desafios compatíveis |
| Papéis | Jogador e jogadora com empresário; treinador e treinadora com auxiliar, ferramentas e linguagem próprias |
| Temporadas | Início por edição, limite do save, adicionar/fechar/reabrir, arquivo e comparação |
| Plantel | Vestiário 3D navegável com cabines individuais e acesso às páginas dos atletas, várias equipas táticas, titulares/banco/reservas, posições, funções e convocatória histórica por jogo |
| Atletas | Atributos/OVR/potencial editáveis e datados, posições/PlayStyles, forma, moral, cartões, lesões, ausências e confiança registada |
| Jogos | Agendar, adicionar, corrigir/apagar, rascunhos automáticos, golos/assistências, minutos, notas, melhor em campo, casa/fora/neutro e prévias |
| Mercado | Operações, negociações e pagamentos revistos, contratos, empréstimos, cláusulas e finanças |
| Recrutamento | Pesquisa, preço antes de guardar, olheiros, relatórios, pastas, filtros guardados e comparação de candidatos |
| Academia | Jovens, evolução, estatísticas, promoção/dispensa e histórico preservado |
| Percurso | Clubes-alvo, objetivos, propostas, mudanças de clube, seleção e pareceres de transferência |
| Legado | Museu com camisolas ou casacos/cachecóis, peças em destaque, troféus, prémios, bolas de hat-trick e recordações ligadas a jogos |
| Memórias | Jornal, screenshots, mapa, recordes, homenagens, apresentações de chegada/promoção/despedida e resumo final da temporada |
| Desafios | Catálogo por papel, duração e condições, com transfer ban e sorteio filtrado |
| Preferências | Seis idiomas, moedas, medidas, visibilidade do catálogo e definições por carreira |
| Conta | Login, sincronização Supabase, isolamento por utilizador, cópias, histórico e desfazer alterações |
| IA | Testar Groq Free e WebLLM; possível configuração titular/reserva; decisões continuam com o utilizador |
| Legal e apresentação | Recursos autênticos, créditos/licenças, privacidade e cookies para UE/Brasil, fluidez e acessibilidade |

## 3. Decisões de implementação fechadas

1. **Uma aplicação com experiências por papel.** Partilhar infraestrutura e componentes; mostrar apenas ferramentas apropriadas a cada carreira.
2. **Histórico desde a base.** IDs e relações entre carreira, época, passagem, atleta, observação de atributos, plano de equipa, partida, acordo, obrigação financeira e peça do museu.
3. **Catálogo separado do save.** Atualizações de futebol real ou da base FC não substituem alterações do utilizador.
4. **Registo rápido primeiro.** Detalhes opcionais podem ser completados mais tarde. O mesmo registo alimenta estatísticas, jornal, museu e IA.
5. **Autenticidade sem exigir todos os anos de equipamentos.** A regra atual/anterior reduz a dependência de arquivos extensos.
6. **3D em áreas escolhidas.** Balneário e museu recebem destaque; formulários, finanças e tabelas ficam leves.
7. **Privacidade e permissões desde o início.** Não deixar o isolamento entre contas para a fase de acabamento.
8. **Custos controlados.** Preferir planos gratuitos, com limites e pausa quando esgotados. Não ativar automaticamente fornecedores pagos.
9. **IA com contexto verificável.** Estatísticas calculadas pelo código, opiniões justificadas e dados em falta identificados.
10. **Entrega por percursos completos.** Validar operações de ponta a ponta em cada etapa.

## 4. Base técnica prevista

- Manter React + TypeScript e Vite do código inicial, compatíveis com Vercel.
- Three.js/React Three Fiber para as cenas 3D, com carregamento a pedido, adaptação de qualidade e alternativa estática.
- Supabase Auth, Postgres e Storage para contas, dados e ficheiros, com migrações e políticas de acesso.
- Funções de servidor na Vercel ou Supabase para segredos e pedidos autorizados a fornecedores, incluindo IA remota. Validar as rotas e o encaminhamento da aplicação durante a implementação.
- WebLLM num worker quando o dispositivo for compatível e a opção estiver ativada.
- Adaptadores para catálogo, imagens, persistência e IA, evitando acoplar o produto a um único fornecedor.

## 5. Fontes e configurações: o que está decidido e o que falta executar

| Dependência | Decisão | Estado real / passo necessário |
| --- | --- | --- |
| Jogadores e treinadores FC | Usar catálogo da edição correta, com importação e versão; apenas identidades elegíveis | Leitura de snapshots candidatos testada: 20 201/21 623 jogadores e 799/870 linhas de treinadores. Datas/atualizações, direito de republicação e treinadores selecionáveis por modo ainda não validados; demonstrativos não contam como base concluída |
| eafc-db-kit | Candidato para ler ficheiros compatíveis | Versão 1.1.0 executada nas duas amostras distribuídas pelo pacote, sem avisos. Não testada com saves do utilizador; licença MIT do código não autoriza os dados/assets subjacentes |
| Preço antes do scout | Valor FC de fonte compatível ou estimativa própria identificada | Amostras não demonstram valor de mercado de carreira/xTV utilizável. Salário e cláusula do FC 27 não são preço de transferência; estimador próprio ainda não calibrado |
| SoFIFA | Complemento opcional | Requisitos de acesso precisam de ser cumpridos. Não é API já ligada nem acesso garantido |
| zerozero | Candidato a complemento de futebol real | Tem API oficial com acesso por contacto; gratuitidade para o projeto não confirmada. Não é dependência da primeira entrega |
| Transfermarkt | Consulta e referência externa | Não foi confirmada API pública gratuita autorizada. Não integrar scraping proibido pelos termos |
| BeSoccer | Não usar como dependência gratuita permanente | A página oficial declara ausência de contas gratuitas; uma conta de teste não resolve o funcionamento permanente |
| Recursos visuais | Todos os clubes/seleções licenciados de cada edição, biblioteca atual/anterior correta e decoração configurável | Inventário candidato: 7 799 linhas de equipamentos e 1 979 alterações por competição. Zero equipamentos aprovados como prontos. API gratuita de equipamentos testada devolveu versões antigas de Arsenal/Benfica; não resolve a cobertura |
| Tipografia das camisolas | Letras e números adequados ao equipamento escolhido, incluindo variantes por competição | IDs identificados, mas nenhum ficheiro de fonte/glifos obtido. Fornecedores físicos identificados para alguns grupos; não foi encontrada licença gratuita compatível para todo o universo. Candidato Benfica limitado a uso pessoal permanece por validar. Arial/Impact não são solução final |
| Materiais 3D | Modelação própria cuidada, materiais e iluminação reais | Poly Haven/ambientCG com CC0 verificado para os próprios recursos; ficheiros específicos e modelos finais ainda por criar/selecionar. Não abrangem marcas/troféus de terceiros |
| Câmbio | Frankfurter para apresentação noutras moedas, preservando valores originais | Endpoint público testado sem chave com EUR/GBP/USD/BRL; ainda não integrado |
| Supabase | Preparar esquema, migrações, políticas e integração | O utilizador configurará o projeto. Faltam projeto/chaves e testes; armazenamento/tráfego gratuitos têm limites. O SMTP padrão restringe destinatários à equipa: configurar envio próprio ou OAuth adequado antes de anunciar autenticação pública |
| Groq Free | Testar adaptador remoto gratuito | Plano documentado, sem chave/configuração nem teste de respostas neste site |
| WebLLM | Testar adaptador local e eventual reserva | Sem download de modelo, integração ou avaliação de desempenho realizada |
| Documentos legais | Adaptar ao serviço real em UE/Brasil | Identidade/contacto do responsável, fornecedores ativos, região de armazenamento e retenções precisam de corresponder à configuração final |

As dependências não resolvidas não serão escondidas com dados inventados. Não há autorização de construção nesta auditoria. O pedido de todos os recursos autênticos não foi reduzido a alguns clubes nem substituído por um plano pago ou recursos genéricos.

### Referências de pesquisa

- [eafc-db-kit](https://github.com/ViniMacacari/eafc-db-kit)
- [Requisitos da API SoFIFA](https://sofifa.com/document)
- [Contacto da API zerozero](https://api.zerozero.pt/contact)
- [Termos Transfermarkt](https://www.transfermarkt.com/intern/anb)
- [Planos BeSoccer](https://api.besoccer.com/en/budgets)
- [Groq: faturação](https://console.groq.com/docs/billing-faqs), [limites](https://console.groq.com/docs/rate-limits) e [dados](https://console.groq.com/docs/your-data)
- [WebLLM](https://webllm.mlc.ai/docs/user/get_started.html)
- [Supabase: RLS](https://supabase.com/docs/guides/database/postgres/row-level-security) e [ficheiros](https://supabase.com/docs/guides/storage/security/access-control)

## 6. Primeiro percurso a aceitar

Depois da luz verde, a primeira entrega deve permitir:

1. Criar uma carreira com papel, identidade, edição e equipa compatíveis.
2. Reabrir os registos guardados e preparar integração da conta; verificar sincronização real quando o Supabase estiver configurado.
3. Percorrer o vestiário com a câmara, abrir a página do atleta pela sua cabine, editar os dados permitidos com atributos/OVR datados e regressar ao mesmo ponto do recinto.
4. Nos modos de gestão, guardar e alternar pelo menos dois planos de equipa.
5. Registar uma partida com resultado e estatísticas individuais, e corrigir esse registo sem duplicar totais.
6. Consultar estatísticas da época e da carreira, fechar a temporada e manter o histórico intacto.
7. Exportar/importar uma cópia validada e preservar dados anteriores.
8. Utilizar a navegação em computador e telemóvel, com estados vazios e erros claros.

As fases seguintes acrescentam a gestão financeira detalhada, recrutamento/academia, museu completo, desafios/sorteio e comparação das IAs, preservando os requisitos já aprovados no plano mestre.

## 7. Critérios de validação para as fases seguintes

- Um contrato parcelado não cobra duas vezes; obrigações atravessam temporadas corretamente.
- Uma contratação com data futura não aparece prematuramente no onze; um empréstimo não troca indevidamente o proprietário do atleta.
- Alterar OVR, plano de equipa ou clube atual não reescreve fichas antigas.
- Um golo ou assistência não se duplica por importação, edição, museu ou sincronização.
- Fechar/reabrir temporada e desfazer alterações mantêm relações e totais coerentes.
- Trocar moeda, medida, idioma ou filtro não muda os valores originais nem apaga dados.
- Duas contas não acedem aos dados privados uma da outra.
- Falta de imagem, de rede, de API ou de quota de IA não impede consultar e gerir a carreira.
- A resposta da IA cita contexto existente, distingue opinião e não inventa ofertas nem ignora transfer bans.
- O desempenho do 3D e da IA é medido em dispositivos disponíveis; não declarar 60 fps ou suporte universal sem testes.

## 8. Situação do trabalho existente

- Há código inicial no workspace com modelos, formulários e páginas, anterior a muitas decisões deste plano.
- O protótipo ainda usa época como texto, um só onze e taxa única de transferência; terá de ser adaptado ao modelo aprovado.
- O ficheiro de estilos importado pela entrada ainda não existe; não se trata de uma versão pronta a demonstrar ou publicar.
- Não há APIs externas, Supabase ou IA ligados. Nesta auditoria, `npm run build` foi executado: TypeScript passou e Vite falhou por falta de `src/styles.css`. Não foram efetuados testes funcionais da aplicação completa nem validação de produção.
- O repositório [Haazug/CAREERTRACKER](https://github.com/Haazug/CAREERTRACKER) foi consultado nesta revisão: continua com tamanho reportado de 0 e permissão de escrita disponível. O código local ainda não foi enviado.
- Primeira fundação implementada: folha de estilos responsiva, percurso de criação com os quatro papéis, época de arranque por edição, biblioteca de equipas de exemplo explicitamente identificada, seleção de treinador existente desativada até validação, créditos do recurso fotográfico e instruções para correr e publicar. Build Vite aprovado nesta etapa.
- Primeiros ficheiros enviados para [Haazug/CAREERTRACKER](https://github.com/Haazug/CAREERTRACKER), ramo `main`. A documentação deixa claro que o catálogo demonstrativo, as camisolas e a sincronização não são oficiais nem estão ligados a serviços externos.
- Próximo trabalho: substituir o estado visual de grelha por balneário 3D original navegável; estruturar épocas/arquivo e contextos de carreira antes de sincronização; aprofundar a base de dados e construir fluxos de scouting, finanças, IA e privacidade. Não há autenticação, conta Supabase ou assistente ligado nesta etapa.

## Decisão recomendada

**Estado: construção autorizada; primeira fundação compilada e enviada para o repositório.** A cobertura integral de equipamentos/fontes permanece por validar e está documentada na [auditoria](audit/README.md). O primeiro build de produção desta base passa.

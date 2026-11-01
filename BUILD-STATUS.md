# Estado da construção

Atualizado em 1 de novembro de 2026. A luz verde foi recebida e o trabalho de código começou. Repositório: [Haazug/CAREERTRACKER](https://github.com/Haazug/CAREERTRACKER), ramo `main`.

## Primeiro marco entregue

- Recuperado o build de produção: a aplicação tinha o import de `styles.css` sem a folha correspondente. A folha nova dá um estilo uniforme à entrada, ao assistente de criação, às páginas internas, formulários, tabelas, salas, diálogo e vistas móveis. Respeita a preferência de movimento reduzido e não descarrega fontes externas.
- Mantido o modo local: carreiras guardadas no browser e cópias JSON sem configuração. A interface informa que não há autenticação, ligação à EA nem sincronização entre dispositivos.
- Corrigidas as temporadas iniciais do assistente: FC 26 começa em 2025/26 e FC 27 em 2026/27. A lista permite no máximo 15 temporadas por edição.
- Diferenciados treinador, treinadora, jogador e jogadora nos pontos de entrada traduzidos já existentes.
- Separadas demonstrações e fonte verificada: as equipas disponíveis no assistente são identificadas como amostras e não como universo completo; treinador/treinadora existente fica indisponível enquanto não há catálogo confirmado. Não há camisolas, atributos ou faces anunciados como dados oficiais.
- Créditos do estádio indicam que a fotografia é ilustrativa e não corresponde a um clube. A imagem existente foi otimizada de cerca de 864 KB para 301 KB.
- README preparado com instalação, build e encaminhamento de Vercel. O relatório de pesquisa foi levado junto do código, com os CSV de dados candidatos fora do Git.

## Verificação

- `npm run build`: TypeScript e Vite concluíram com sucesso; saída principal JS ~321 KB antes de gzip e CSS ~37 KB antes de gzip.
- Não foi verificada a página num browser visual neste ambiente.
- Não foi configurado Supabase, IA, domínio, serviço SMTP ou chave externa.
- Não foi feita publicação na Vercel. A pessoa utilizadora pode importar o repositório quando quiser apresentar o build atual.

## Próximos marcos do plano

1. Modelo estável de temporadas, arquivos e histórico sem perda de registos existentes.
2. Central de equipa com vários planos guardados e cenários reais para os quatro papéis.
3. Balneário original em 3D, percorrível com controlos de teclado/toque, usando apenas recursos cuja licença esteja registada.
4. Scout com estimativas identificadas; registo de jogos, objetivos, transferências e finanças ligados aos cálculos do próprio save.
5. Recrutamento, academia, museu e assistentes gratuitos com os dados privados sob controlo explícito.
6. Sincronização opcional quando o Supabase for configurado, com isolamento de contas, exportação, restauro e eliminação.
7. Biblioteca de todos os uniformes licenciados FC 26/27 apenas conforme a validação de recursos e direitos por equipa/variante descrita em `audit/README.md`.

Cada marco deve voltar a gerar um build de produção e atualizar este ficheiro. O estado da marca de um recurso mostra fonte, temporada e licença; se a origem não puder ser demonstrada, a interface não o apresenta como oficial.

# node_marmitas
Projeto desenvolvido em nodejs

LOGIN (usuário: teste / senha: 123456): funcionamento remoto e local

BACKEND
nodejs
express (boa opção para servidor http e escalabilidade)
express-session (permitir escalar o site)
body-parser (parser de querystring e forms elements em requisições ao servidor)
redis (performance e utilização de dados em memória)
passport, passport-facebook, passport-local (autenticação disponível em Facebook e local)
npmlog (log customizado)

FRONTEND
HTML5 (forms modernos)
javascript (essencial)
jquery (biblioteca de manipulação de elementos, poderia ter usado angular)
jquery-validation (validação de formulários)
ag-grid (grid javascript permite ordenação, paginação e customização, versão enterprise)
bootstrap(oferece css, fontes, ícones, design sofisticado e responsivo)

BANCO DE DADOS
MS SQL SERVER 2017 com replicação de dados e alta disponibilidade (tolerância à falhas é essencial em soluções escaláveis)
Ainda possibilidade inúmeras opções para melhoria de consultas, índices, segurança, procedures, views, análise de performance, jobs

HOSPEDAGEM SITE
Site hospedado em Amazon AWS

API (principais métodos)
/auth/local autenticação local
/auth/facebook autenticação facebook
/auth/logout logout
/api/criarseautenticado verifica se usuário está autenticado e permite acesso à uma funcionalidade autenticada
/api/criar criar marmita
/api/lista listar marmitas
/api/detalhe/:idmarmita detalhe de uma marmita
/api/excluir/:idmarmita excluir uma marmita
/api/atualizar/:idmarmita atualizar uma marmita

ENTIDADES
Poderia ter criado entidades para utilizar padrão MVC, mas estava com tempo apertado nessa última semana. Se houver tempo eu criarei entidade marmita.

TESTE
Foi utilizado nodeunit para criação de testes de unidade. Para executar basta estar no diretório raiz e digitar nodeunit ./test/test-db-list.js
O nodeunit deve estar instalado

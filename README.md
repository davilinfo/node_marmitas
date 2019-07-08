# node_marmitas
Projeto desenvolvido em nodejs

LOGIN (usu�rio: teste / senha: 123456): funcionamento remoto e local

BACKEND
nodejs
express (boa op��o para servidor http e escalabilidade)
express-session (permitir escalar o site)
body-parser (parser de querystring e forms elements em requisi��es ao servidor)
redis (performance e utiliza��o de dados em mem�ria)
passport, passport-facebook, passport-local (autentica��o dispon�vel em Facebook e local)
npmlog (log customizado)

FRONTEND
HTML5 (forms modernos)
javascript (essencial)
jquery (biblioteca de manipula��o de elementos, poderia ter usado angular)
jquery-validation (valida��o de formul�rios)
ag-grid (grid javascript permite ordena��o, pagina��o e customiza��o, vers�o enterprise)
bootstrap(oferece css, fontes, �cones, design sofisticado e responsivo)

BANCO DE DADOS
MS SQL SERVER 2017 com replica��o de dados e alta disponibilidade (toler�ncia � falhas � essencial em solu��es escal�veis)
Ainda possibilidade in�meras op��es para melhoria de consultas, �ndices, seguran�a, procedures, views, an�lise de performance, jobs

HOSPEDAGEM SITE
Site hospedado em Amazon AWS

API (principais m�todos)
/auth/local autentica��o local
/auth/facebook autentica��o facebook
/auth/logout logout
/api/criarseautenticado verifica se usu�rio est� autenticado e permite acesso � uma funcionalidade autenticada
/api/criar criar marmita
/api/lista listar marmitas
/api/detalhe/:idmarmita detalhe de uma marmita
/api/excluir/:idmarmita excluir uma marmita
/api/atualizar/:idmarmita atualizar uma marmita

ENTIDADES
Poderia ter criado entidades para utilizar padr�o MVC, mas estava com tempo apertado nessa �ltima semana. Se houver tempo eu criarei entidade marmita.

TESTE
Foi utilizado nodeunit para cria��o de testes de unidade. Para executar basta estar no diret�rio raiz e digitar nodeunit ./test/test-db-list.js
O nodeunit deve estar instalado

SERVIDOR HTTP
Online o servi�o est� sendo executado utilizando pm2 (assim se houver falhar de servidor, este reiniciar� automaticamente)

SCRIPT BANCO DE DADOS
Inclu�do em github script do banco de dados e script tabela marmita

# node_marmitas
Projeto desenvolvido em nodejs

ACESSO
URL: http://18.231.112.208:8080/
LOGIN (usu�rio: teste / senha: 123456): funcionamento remoto e local
BANCO DE DADOS: usu�rio: usrmarmita / senha:Beleaf2019
Arquivo start.sh (deve ser atualizado para execut�vel)

REQUISITOS
Site disponibiliza lista de marmitas, ordena��o de marmitas, pagina��o de marmitas sem solicitar autentica��o
Site disponibiliza consulta de detalhe de marmita sem solicitar autentica��o
Site disponibiliza cria��o de marmita, atualiza��o de marmita, exclus�o de marmita apenas com autentica��o de usu�rio
N�o ser� listada marmita que n�o esteja com quantidade dispon�vel
Pre�o de desconto de marmita � disponibilizado a partir de c�lculo

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
Criado entidade marmita e atualizado apis para utilizar entidade e m�todos de model

TESTE
Foi utilizado nodeunit para cria��o de testes de unidade. Para executar basta estar no diret�rio raiz e digitar nodeunit ./test/test-db-list.js
O nodeunit deve estar instalado

SERVIDOR HTTP
Online: o servi�o est� sendo executado utilizando pm2 (assim se houver falhar de servidor, este reiniciar� automaticamente)

SCRIPT BANCO DE DADOS
Inclu�do em github script do banco de dados e script tabela marmita

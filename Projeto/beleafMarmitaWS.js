'use strict';
    
const            
    mssql = require('mssql'),
    express = require('express'),
    express_session = require('express-session'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    //redisClient = require('redis').createClient(),
    //RedisStore = require('connect-redis')(express_session),
    passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy,
    GoogleStrategy = require('passport-google').Strategy,
    LocalStrategy = require('passport-local').Strategy,
    log = require('npmlog'),
    app = express();
    
    var hostpc = 'localhost';
    var port = 2000;

    //middleware
    app.use(express_session({
        resave: true,
        saveUninitialized: false,
        secret: 'nao_advinhe'/*,
        store: new RedisStore({
            client: redisClient
        })*/
    }));
    //app.use(cookieParser);
    app.use(passport.initialize());
    app.use(passport.session());

    app.use(express.static(__dirname.concat('/view')));
    app.use(express.static(__dirname.concat('/bower_components')));

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json());

    passport.serializeUser(function(user, done){
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done){
        //localizar user em banco de dados
        done(null, { identifier: id});
    });    

    passport.use(
        new FacebookStrategy({
            clientID: '316488025742270',
            clientSecret: '9337e5d68a1f0379b5d2b7ed3296fb83',
            callbackURL: 'http://'.concat(hostpc).concat(':').concat(port).concat('/auth/facebook/callback')
        },
        function(accessToken, refreshToken, profile, done){
            log.info('Usuario', profile);
            return done(null, profile);
        })
    );

    passport.use(
        new LocalStrategy(
            {
                passReqToCallback: true,
                session: true,
                callbackURL: 'http://'.concat(hostpc).concat(':').concat(port).concat('/auth/local')
            },
            function(req, username, password, done){
                console.log('local strategy');
                if (username === 'teste' && password === '123456'){
                    console.log('logado');
                    return done(null, {username: username, id: 1});
                }else{
                    return done(null, false);
                }
            }
        )
    )

    var config = {
        server:'localhost', 
        database:'MarmitaBeleaf',
        user:'usrmarmita',
        password:'Beleaf2019',
        port: 1433
    };

    /*redisClient
        .on('ready', function(){
        log.info('REDIS', 'ready');
    })
        .on('error', function(err){
            log.error('REDIS', err.message);
    });*/

    const authed = function(req, res, next){
        if (req.isAuthenticated()){
            return next();
        /*}else if (redisClient.ready){
            res.status(403).json({
                error: 'acesso_proibido',
                reason: 'nao_autenticado'
            });*/
        }else{
            log.info('AUTENTICAR', 'Usuário não autenticado ou redis inacessível');
            res.redirect('/');
        }
    }

    mssql.on('error', err =>{
        log.info('DATABASE', 'Erro: '.concat(err.message));
    });    

    //inicia login facebook
    app.get('/auth/facebook', passport.authenticate('facebook'));
    //retorno do facebook e redirecionamento usuário autenticado ou não
    app.get('/auth/facebook/callback', 
        passport.authenticate('facebook', {
            successRedirect: '/',
            failureRedirect: '/?naoAutenticado'
        })
    );

    //inicia login local
    app.post('/auth/local', passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/?naoAutenticado'
    }),
    function(req, res) {
        res.redirect('/');
      }
    );

    app.get('/auth/logout/', function(req, res){
        req.logout();
        res.redirect('/');
    });

    //autenticado
    app.post('/api/criar/', authed, function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        log.info('API', '/api/criar');

        mssql.connect(config).then(pool =>{
            return pool.request()
            .input('nome', mssql.VarChar, req.body.nome)
            .input('descricao', mssql.VarChar, req.body.descricao)
            .input('preco', mssql.Money, req.body.preco)
            .input('precoDesconto', mssql.Money, req.body.preco * (100 - req.body.porcentagem) / 100)
            .input('ingredientes', mssql.VarChar, req.body.ingredientes)
            .input('quantidade', mssql.Float, req.body.quantidade)
            .input('url', mssql.VarChar, req.body.url)
            .input('porcentagemDesconto', mssql.Float, req.body.porcentagem === undefined ? 0 : req.body.porcentagem)
                .query('insert into marmita(nome, descricao, preco, ingredientes, quantidade, url, porcentagemDesconto, precoDesconto) '
                .concat('values(@nome, @descricao, @preco, @ingredientes, @quantidade, @url, @porcentagemDesconto, @precoDesconto) '));
        }).then(result =>
            {
                res.status(200).json({resultado: true});
                mssql.close();
                log.info('API', '/api/criar: registro incluído');
            }).catch(err =>{
                res.status(501);
                console.log('Erro:'.concat(err.message));
                log.error('API', '/api/criar: '.concat('\n Erro: ') .concat(err.message));
                mssql.close();
            });
    });

    //autenticado
    app.put('/api/atualizar/:idmarmita', authed, function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        log.info('API', '/api/atualizar');

        mssql.connect(config).then(pool =>{
            return pool.request()
                .input('codigo', mssql.Int, req.params.idmarmita)
                .input('nome', mssql.VarChar, req.body.nome)
                .input('descricao', mssql.VarChar, req.body.descricao)
                .input('preco', mssql.Money, req.body.preco)
                .input('precoDesconto', mssql.Money, req.body.preco * (100 - req.body.porcentagem) / 100)
                .input('ingredientes', mssql.VarChar, req.body.ingredientes)
                .input('quantidade', mssql.Float, req.body.quantidade)
                .input('url', mssql.VarChar, req.body.url)
                .input('porcentagemDesconto', mssql.Float, req.body.porcentagem)
                .query('update marmita set '
                .concat('nome = @nome, descricao = @descricao, preco = @preco, ingredientes = @ingredientes, ')
                .concat('quantidade = @quantidade, url = @url, porcentagemDesconto = @porcentagemDesconto, ')
                .concat('precoDesconto = @precoDesconto ')
                .concat('where codigo = @codigo')
                );
        }).then(result =>
            {
                console.log(result);
                res.status(200).json({resultado: true});
                mssql.close();
                log.info('API', '/api/atualizar: registro atualizado');
            }).catch(err =>{
                res.status(501);
                console.log('Erro:'.concat(err.message));
                log.error('API', '/api/atualizar: '.concat('\n Erro: ') .concat(err.message));
                mssql.close();
            });
    });

    //autenticado
    app.delete('/api/excluir/:idmarmita', authed, function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        log.info('API', 'request recebido: excluir');        
        mssql.connect(config).then(pool =>{
            return pool.request()
                .input('codigo', mssql.Int, req.params.idmarmita)
                .query('delete from marmita '
                .concat('where codigo = @codigo')
                );
        }).then(result =>
            {                
                res.status(200).json({resultado: true});
                mssql.close();
                log.info('API', '/api/excluir: registro excluído');
            }).catch(err =>{
                res.status(501);
                console.log('Erro:'.concat(err.message));
                log.error('API', '/api/excluir: '.concat('\n Erro: ') .concat(err.message));
                mssql.close();
            });
    });

    app.get('/api/criarseautenticado', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        log.info('API','api/criarseautenticado');
        if (req.isAuthenticated()){
            log.info('API', 'autenticado');
            res.status(200).json({resultado: true})
        }else{
            log.info('API', 'não autenticado');
            res.status(403).json({resultado: false})
        }
    });

    //nao requer autenticação
    app.get('/api/listar', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        log.info('API','api/listar');
        
        mssql.connect(config).then(pool =>{
            return pool.request()
                .query("select * from marmita");
        }).then(result =>
            {
                res.status(200).json(result.recordsets);
                mssql.close();
            }).catch(err =>{
                console.log('Erro:'.concat(err.message));
                log.error('API', '/api/listar: '.concat('\n Erro: ') .concat(err.message));
                mssql.close();
            }) ;
    });

    //nao requer autenticação
    app.get('/api/detalhe/:idmarmita', function(req, res){
        res.setHeader('Access-Control-Allow-Origin', '*');
        log.info('API','api/detalhe');
        
        var codigo_marmita = req.params.idmarmita;
        mssql.connect(config).then(pool =>{
            return pool.request()
                .input('input_parameter', mssql.Int, codigo_marmita)
                .query('select * from marmita where codigo = @input_parameter');
        }).then(result =>
            {
                console.log(result.rowsAffected[0]);
                res.status(200).json(result.recordsets);
                mssql.close();
            }).catch(err =>{
                console.log('Erro:'.concat(err.message));
                res.status(501);
                log.error('API', '/api/detalhe: '.concat('\n Erro: ') .concat(err.message));
                mssql.close();
            });
    });

    //inicia servidor
    app.listen(port, function(){
        console.log("backend ready");
    });

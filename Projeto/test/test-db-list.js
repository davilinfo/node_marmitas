'use strict';
const
mssql = require('mssql');

    var config = {
        server:'localhost', 
        database:'MarmitaBeleaf',
        user:'usrmarmita',
        password:'Beleaf2019',
        port: 1433
    };

    exports.testDbListar = function(test){
        mssql.connect(config).then(pool =>{
            return pool.request()
                .query("select * from marmita");
        }).then(result =>
            {
                var expectedValue = result.recordsets[0].length;
                mssql.close();

                test.expect(1);
                test.ok(expectedValue >= 0, 'total de livros encontrados '.concat(expectedValue));
                test.done();
            }).catch(err =>{
                mssql.close();
                test.ok(false, 'Erro:'.concat(err.message));
                test.done();
            }) ;
    };

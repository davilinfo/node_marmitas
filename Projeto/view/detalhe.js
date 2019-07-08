$("form[id=formCriar]").validate({
    rules: {
        nome: 'required',
        descricao: 'required',
        quantidade: 'required',
        ingredientes: 'required',
        url: {
            required: true
        },
        preco: {
            required: true
        }
    },
    submitHandler: function(form){
        return false;
    }
});

$("form[id=formAtualizar]").validate({
    rules: {
        nomedetalhe: 'required',
        descricaodetalhe: 'required',
        quantidadedetalhe: 'required',
        ingredientesdetalhe: 'required',
        urldetalhe: {
            required: true
        },
        precodetalhe: {
            required: true
        }
    },
    submitHandler: function(form){
        return false;
    }
});


function sendit(e) {
    if ($('#formCriar')[0].checkValidity()){
        
        $.ajax({
            type: 'POST',
            data: { 
                nome: $('#nome').val(), 
                descricao: $('#descricao').val(),
                preco: $('#preco').val(),
                ingredientes: $('#ingredientes').val(),
                quantidade: $('#quantidade').val(),
                porcentagem: $('#porcentagem').val(),
                url: $('#url').val(),
            },                    
            url: "/api/criar/",
            accepts: "application/json"
        }).done(function (result) {
            if (result.resultado === true){
                $('#resultado').text("Registro incluído");
                document.location.href='/';
            }
        }).fail(function (result){
            document.location.href='/?naoautenticado';
        });;
    }
}

function atualizar(e){
    if ($('#formAtualizar')[0].checkValidity()){
        
        $.ajax({
            type: 'PUT',
            data:JSON.stringify({
                nome: $('#nomedetalhe').val(), 
                descricao: $('#descricaodetalhe').val(),
                preco: $('#precodetalhe').val(),
                ingredientes: $('#ingredientesdetalhe').val(),
                quantidade: $('#quantidadedetalhe').val(),
                porcentagem: $('#porcentagemdetalhe').val(),
                url: $('#urldetalhe').val(),
            }),                    
            url: "/api/atualizar/".concat($('#codigo').val()),
            accepts: "application/json",
            contentType: "application/json"
        }).done(function (result) {
            if (result.resultado === true){
                $('#resultado').text("Registro atualizado");
                document.location.href='/';
            }
        }).fail(function (result){
            document.location.href='/?naoautenticado';
        });
    }
}

function excluir(){
    
    $.ajax({
        type: 'DELETE',
        url: "/api/excluir/".concat($('#codigo').val()),
        accepts: "application/json",
        contentType: "application/json"
    })
    .done(function (result) {
        if (result.resultado === true){
            $('#resultado').text("Registro excluído");
            document.location.href='/';
        }
    }).fail(function (result){
        document.location.href='/?naoautenticado';
    });;
}

function detalhe(){
    $.ajax({
        type: 'GET',
        url: "/api/detalhe/".concat($('#codigo').val()),
        accepts: "application/json"
    })
    .done(function (result) {
        if (result !== null){
            var marmita = result[0][0];            
            $('#resultado').text("Dados recebidos");
            $("#codigo").val(marmita.Codigo);
            $('#nomedetalhe').val(marmita.Nome); 
            $('#descricaodetalhe').val(marmita.Descricao);
            $('#precodetalhe').val(marmita.Preco);            
            $('#precodescontodetalhe').val(marmita.PrecoDesconto);
            $('#ingredientesdetalhe').val(marmita.Ingredientes);
            $('#quantidadedetalhe').val(marmita.Quantidade);
            $('#porcentagemdetalhe').val(marmita.PorcentagemDesconto);
            $('#urldetalhe').val(marmita.Url);
            $('#urlimgdetalhe').attr('src', marmita.Url);
        }
    });
}
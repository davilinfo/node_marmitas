function criar_autenticado(){
    event.preventDefault = true;
    $.ajax({
        url: '/api/criarseautenticado',
        type: 'GET',
        contentType: 'application/json'
    }).done(function(result){
        if (result.resultado === true){
            $('#usuario > label')[0].innerText = 'autenticado';
            document.location.href = '/detalhe.html?criar';
        }
    }).fail(function(result){
        console.log(result.resultado);
        $('#usuario > label')[0].innerText = 'não autenticado';
        
    });
}

function detalheLink(params){
    var element = document.createElement('a');
    element.setAttribute('href', '/detalhe.html?id='.concat(params.value));
    element.id = 'detalhe_'.concat(params.value);
    element.innerText = "clique";
    return element;
}

function listar(){
    $.ajax({
        type:'GET',
        url: '/api/listar/',
        contentType: "application/json",
        accepts: "application/json"
    }).done(function(result){
        var columnDefs = [
            {headerName: "Nome", field:"Nome", sortable: true, width: 150},
            {headerName: "Imagem", field:"Url", width: 150},
            {headerName: "Preço", field:"Preco", sortable: true, width: 80},
            {headerName: "Promoção", field:"PrecoDesconto", sortable: true, width: 100},
            {headerName: "Detalhe", field:"Codigo", width:90, cellRenderer: 'detalheLink'}
        ];
        var gridOptions = {                        
            columnDefs: columnDefs,
            pagination: true,                        
            paginationPageSize:10,
            rowData: result,
            components: {
                detalheLink: detalheLink
            } 
        };

        var eGridDiv = document.querySelector('#listagem');
        new agGrid.Grid(eGridDiv, gridOptions);                    
    });
}

function login(){
    $.ajax({
        type:'GET',
        url: '/auth/facebook',
        contentType: "application/json",
        accepts: "application/json"
    }).done(function(result){                    
        console.log(result);
    });
}
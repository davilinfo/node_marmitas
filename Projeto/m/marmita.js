module.exports = { 
    marmita : {
        Codigo: undefined,
        Nome: undefined,
        Descricao: undefined,
        Preco: undefined,
        PrecoDesconto: undefined,
        Ingredientes: undefined,
        Quantidade: undefined,
        Url: undefined,
        PorcentagemDesconto: undefined,

        toModel : function toModel(objMarmita){
            this.Codigo = objMarmita.Codigo;
            this.Descricao = objMarmita.Descricao;
            this.Nome = objMarmita.Nome;
            this.Preco = objMarmita.Preco;
            this.PrecoDesconto = objMarmita.PrecoDesconto;
            this.Ingredientes = objMarmita.Ingredientes;
            this.Quantidade = objMarmita.Quantidade;
            this.Url = objMarmita.Url;
            this.PorcentagemDesconto = objMarmita.PorcentagemDesconto;
        },
        fromView : function fromView(objMarmita, codigoMarmita){
            this.Codigo = codigoMarmita;
            this.Descricao = objMarmita.descricao;
            this.Nome = objMarmita.nome;
            this.Preco = objMarmita.preco;
            this.PrecoDesconto = objMarmita.preco * (100 - objMarmita.porcentagem) / 100;
            this.Ingredientes = objMarmita.ingredientes;
            this.Quantidade = objMarmita.quantidade;
            this.Url = objMarmita.url;
            this.PorcentagemDesconto = objMarmita.porcentagem || 0;
        }
    }
}
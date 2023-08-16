class CaixaDaLanchonete {
    constructor() {
        this.cardapio = {
            cafe:      { descricao: 'Café',                        valor: 3.00 },
            chantily:  { descricao: 'Chantily (extra do Café)',    valor: 1.50 },
            suco:      { descricao: 'Suco Natural',                valor: 6.20 },
            sanduiche: { descricao: 'Sanduíche',                   valor: 6.50 },
            queijo:    { descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            salgado:   { descricao: 'Salgado',                     valor: 7.25 },
            combo1:    { descricao: '1 Suco e 1 Sanduíche',        valor: 9.50 },
            combo2:    { descricao: '1 Café e 1 Sanduíche',        valor: 7.50 }
        }
        this.formasDePagamento = ['dinheiro', 'credito', 'debito']
        this.descontosETaxas = {
            dinheiro: -0.05,
            credito : 0.03,
        }
        this.itensExtras = {
            chantily: 'cafe',
            queijo:   'sanduiche',
        }
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        if (!this.formasDePagamento.includes(formaDePagamento)) {
            return "Forma de pagamento inválida!"
        }

        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!"
        }

        let total = 0
        let temCafe = false
        let temSanduiche = false

        for (let item of itens) {
            const [codigo, quantidade] = item.split(",")
            if (!this.cardapio[codigo]) {
                return "Item inválido!"
            }
            if (quantidade <= 0) {
                return "Quantidade inválida!"
            }
            switch (codigo) {
                case "cafe":
                    temCafe = true
                    break
                case "sanduiche":
                    temSanduiche = true
                    break
            }
            total += this.cardapio[codigo].valor * quantidade
        }

        for (let item of itens) {
            const [codigo, quantidade] = item.split(",")
            if ((codigo === "chantily" && !temCafe) || (codigo === "queijo" && !temSanduiche)) {
                return "Item extra não pode ser pedido sem o principal"
            }
        }

        if (formaDePagamento === "dinheiro") {
            total *= 0.95
        } else if (formaDePagamento === "credito") {
            total *= 1.03
        }

        return `R$ ${total.toFixed(2).replace(".", ",")}`
    }
}

export { CaixaDaLanchonete }

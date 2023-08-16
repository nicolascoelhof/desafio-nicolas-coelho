import cardapioLanchonete from './cardapio.js';

class CaixaDaLanchonete {

    calcularValorDaCompra(metodoDePagamento, itens) {
        
        if(metodoDePagamento !="dinheiro" && metodoDePagamento != "debito" && metodoDePagamento != "credito"){
         return "Forma de pagamento inválida!";
        }

        const invalidItem = itens.find(item => {
            const nameItem = item.split(",")[0];
            if(cardapioLanchonete.get(nameItem) == null){
                return true
            }
            return false   
        })

        if(invalidItem){
            return "Item inválido!"
        }
        
        const invalidQuantity = itens.find(item => item.split(",")[1] === "0");

        if(invalidQuantity){
            return "Quantidade inválida!"
        }
        
        if(itens.length == 0){
            return "Não há itens no carrinho de compra!"
        }
        
        let nameItens = []
        itens.forEach(item => {
            const name = item.split(",")[0];
            nameItens.push(name)
        });

        const extraItens = ["combo1", "combo2", "chantily", "queijo"]
        const existExtraItem = extraItens.some(item => nameItens.includes(item));

        if (existExtraItem && (!nameItens.includes("cafe") || !nameItens.includes("sanduiche"))) {
                return "Item extra não pode ser pedido sem o principal"
        }

        let valor = 0
        if(metodoDePagamento == "credito"){
            itens.forEach(item => {
                const arrayItem = item.split(",");
                valor += cardapioLanchonete.getValor(arrayItem[0]) * arrayItem[1]   
            });
            valor += valor * 0.03

        } 

        if(metodoDePagamento == "dinheiro"){
            itens.forEach(item => {
                const arrayItem = item.split(",");
                valor += cardapioLanchonete.getValor(arrayItem[0]) * arrayItem[1]
                
            });
            valor -= valor * 0.05

        }
        if(metodoDePagamento == "debito"){
            itens.forEach(item => {
                const arrayItem = item.split(",");
                valor += cardapioLanchonete.getValor(arrayItem[0]) * arrayItem[1]
            });
        } 
        return "R$ " + valor.toFixed(2).replace(".",",");
    }
    
}

export { CaixaDaLanchonete };

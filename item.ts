import { Venda } from "./venda";
import { Produto } from "./produto";


export class Item {

    constructor (
        
        private venda : Venda,
        private item : number,
        private produto : Produto,
        private quantidade : number){}


    public getItem(): number {
        return this.item;
    }

    public getProduto(): Produto {
        return this.produto;
    }

    public getQuantidade(): number {
        return this.quantidade;
    }

    public valor_final_item() {
        return this.quantidade * this.produto.getValorUnitario();
    }

    public dados_item(): string {
        return `${this.getItem()} ${this.produto.getCodigo()} ${this.produto.getDescricao()} `+
               `${this.getQuantidade()} ${this.produto.getUnidade()} ${this.produto.getValorUnitario().toFixed(2)} `+
               `${this.produto.getSubstituicaoTributaria()} ${this.valor_final_item().toFixed(2)}\n`;
    }    
}
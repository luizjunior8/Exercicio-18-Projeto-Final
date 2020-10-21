
export class Pagamento {


    constructor (

        public metodoPagamento: string,
        public valorRecebido: number,
        public valorTotal: number) {}

    public getMetodoPagamento(): string {
        return this.metodoPagamento;
    }   
     
    public getValorRecebido(): number {
        return this.valorRecebido;
    }


    public formaPagamento(): string {

        const credito : string = "Cartão de Crédito"
        const debito : string = "Cartão de Débito"
        const dinheiro : string = "Dinheiro"

        let pagamento : string = ""

        if (this.metodoPagamento == credito){
            pagamento = credito
        }else if(this.metodoPagamento == debito){
            pagamento = debito
        }else if(this.metodoPagamento == dinheiro){
            pagamento = dinheiro
        }else{
            throw new Error ("Forma de pagamento não aceita")
        }

        return pagamento
    }


    public validarPagamento(): void {

        if(this.valorTotal > this.valorRecebido){
            throw new Error ("O pagamento é insuficiente para a compra")
        }
    }
    
    
    public calculaTroco(): number {

        let valorTroco = 0

        if (this.formaPagamento() != "Dinheiro"){
            valorTroco = 0   
        }

        this.validarPagamento()

        valorTroco = this.valorRecebido - this.valorTotal

        return valorTroco      
    }
}
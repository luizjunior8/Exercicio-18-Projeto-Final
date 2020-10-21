
export class Produto {

    
    constructor(

        public codigo: number,
        public descricao: string,
        public unidade: string,
        public valor_unitario: number,
        public substituicao_tributaria: string){}


    public getCodigo(): number {
        return this.codigo;
    }

    public getDescricao(): string {
        return this.descricao;
    }

    public getUnidade(): string {
        return this.unidade;
    }

    public getValorUnitario(): number {
        return this.valor_unitario;
    }
    
    public getSubstituicaoTributaria(): string {
        return this.substituicao_tributaria;
    }
}
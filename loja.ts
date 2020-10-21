import { Caixa } from "./caixa";
import { Endereco } from "./endereco";
import { Venda } from "./venda";


export class Loja {

    constructor(

        public nome_loja: string,
        public endereco: Endereco,
        public telefone: string,
        public observacao: string,
        public cnpj: string,
        public inscricao_estadual: string,
        public vendas: Array<Venda> = []) { }


    public makeVenda(datahora: string, ccf: number, coo: number, caixa: Caixa): Venda {
        let venda = new Venda (this, datahora, ccf, coo, caixa);
        this.vendas.push(venda);
        return venda;
    }


    public valida_dados_obrigatorios(): void {
    
        if (!this.nome_loja){
            throw new Error (`O campo nome da loja é obrigatório`)
        }
        if (!this.cnpj){
            throw new Error (`O campo CNPJ da loja é obrigatório`)
        }
        if (!this.inscricao_estadual){
            throw new Error (`O campo inscrição estadual da loja é obrigatório`)
        }
    }


    public dados_loja(): string {

        this.valida_dados_obrigatorios()

        let _telefone : String = this.telefone ? `Tel ${this.telefone}` : ""
        
        _telefone = this.endereco.cep && _telefone ? " " + _telefone : _telefone 
        
        let _observacao : String = this.observacao ? `${this.observacao}` : ""

        let _cnpj : String = this.cnpj ? `CNPJ: ${this.cnpj}` : ""

        let _inscricao_estadual : String = this.inscricao_estadual ? `IE: ${this.inscricao_estadual}` : ""


    return `${this.nome_loja}
${this.endereco.dados_endereco()}${_telefone}
${_observacao}
${_cnpj}
${_inscricao_estadual}
`     
    }
} 
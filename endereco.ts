export class Endereco {


    constructor(
        public logradouro: string,
        public numero: number,
        public complemento: string,
        public bairro: string,
        public municipio: string,
        public estado: string,
        public cep: string) { }


    public validar_dados_obrigatorios(): void {

        if (!this.logradouro){
            throw new Error (`O campo logradouro do endereço é obrigatório`)
        }
        if (!this.municipio){
            throw new Error (`O campo município do endereço é obrigatório`)
        }
        if (!this.estado){
            throw new Error (`O campo estado do endereço é obrigatório`)
        }
    }

    
    public dados_endereco(): string {

        this.validar_dados_obrigatorios()

        let _logradouro : string = this.logradouro + ", "

        let _numero : string = this.numero ? `${this.numero}` : "s/n"

        let _complemento : string = this.complemento ? ` ${this.complemento}` : ""

        let _bairro : string = this.bairro ? `${this.bairro} - ` :  ""

        let _municipio : string = this.municipio ? `${this.municipio} - ` : ""

        let _cep : string = this.cep ? `CEP:${this.cep}` : ""

        return (
`${_logradouro}${_numero}${_complemento}
${_bairro}${_municipio}${this.estado}
${_cep}`
        )
    }
} 
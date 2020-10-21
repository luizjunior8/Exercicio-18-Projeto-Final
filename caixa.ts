export class Caixa{


    constructor(

        public operador: number,
        public impressora: string,
        public ecf_if: string,
        public ecf: string,
        public serial: string) {}


    public validar_dados_obrigatorios(): void {

        if (!this.operador){
            throw new Error (`O código do operador é obrigatório`)
        }

        if (!this.impressora){
            throw new Error (`A informação do modelo da impressora fiscal é obrigatória`)
        }

        if (!this.ecf_if){
            throw new Error (`A informação do ecf_if da impressora é obrigatória`)
        }

        if (!this.ecf){
            throw new Error (`A informação do ecf da impressora é obrigatória`)
        }

        if (!this.serial){
            throw new Error (`A informação do serial da impressora é obrigatória`)
        }
    }

    
    public dados_caixa(): string {

        this.validar_dados_obrigatorios()

        let _operador : string = "OPERADOR: " + this.operador

        let _firmware : string = "ECF-IF VERSÃO: " + this.ecf_if + " ECF: " + this.ecf

        let _serial : string =  "FAB: " + this.serial

        let _trace : string = "-".repeat(30)

        return (
`${_trace}
${_operador}
${_trace}
${this.impressora}
${_firmware}
${_serial}`
         )
    }
}
import { Venda } from './venda';
import { Loja } from './loja';
import { Endereco } from './endereco';
import { Produto } from './produto';
import { Caixa } from './caixa';


function verificaCampoObrigatorio(mensagemEsperada: string, venda: Venda) {
    try {
        venda.dados_venda();
    } catch (e) {
        expect(e.message).toBe(mensagemEsperada);
    }
}

function verificaCampoObrigatorioVenda(mensagemEsperada: string, venda: Venda, item: number, produto: Produto, quantidade: number) {
    try {
        venda.montarCompra(item, produto, quantidade);
    } catch (e) {
        expect(e.message).toBe(mensagemEsperada);
    }
}

function verificaCampoObrigatorioCupom(mensagemEsperada: string, venda: Venda) {
    try {
        venda.imprimeCupom();
    } catch (e) {
        expect(e.message).toBe(mensagemEsperada);
    }
}

let NOME_LOJA = "Loja 1"
let LOGRADOURO = "Log 1"
let NUMERO = 10
let COMPLEMENTO = "C1"
let BAIRRO = "Bai 1"
let MUNICIPIO = "Mun 1"
let ESTADO = "E1"
let CEP = "11111-111"
let TELEFONE = "(11) 1111-1111"
let OBSERVACAO = "Obs 1"
let CNPJ = "11.111.111/1111-11"
let INSCRICAO_ESTADUAL = "123456789"
let DATA_HORA = "25/11/2020 10:30:40V"
let CCF = 123456
let COO = 654321
let METODO_PAG_CREDITO = "Cartão de Crédito"
let METODO_PAG_DEBITO = "Cartão de Débito"
let METODO_PAG_DINHEIRO = "Dinheiro"
let VALOR_RECEBIDO = 100.00
let OPERADOR = 494715
let IMPRESSORA = "SWEDA IF ST200"
let ECF_IF = "01.00.05"
let ECF = "067"
let SERIAL = "SW031300000000045629"


let exProd1 : Produto = new Produto(10, "Banana", "cx", 7.45, "ST");
let exProd2 : Produto = new Produto(20, "Laranja", "cx", 3.32, "ST");
let exProd3 : Produto = new Produto(30, "Chocolate", "un", 0, ""); 


let enderecoMod : Endereco = new Endereco (LOGRADOURO, NUMERO, COMPLEMENTO, BAIRRO,
  MUNICIPIO, ESTADO, CEP)

let lojaMod : Loja = new Loja (NOME_LOJA, enderecoMod, TELEFONE, OBSERVACAO, CNPJ,
  INSCRICAO_ESTADUAL)

let caixaMod : Caixa = new Caixa (OPERADOR, IMPRESSORA, ECF_IF, ECF, SERIAL)

let vendaMod : Venda = new Venda (lojaMod, DATA_HORA, CCF, COO, caixaMod)

test('data_hora_vazio', () => {
    let data_hora_vazio: Venda = new Venda (lojaMod, "", CCF, COO, caixaMod);
    verificaCampoObrigatorio(`Data e hora da venda são obrigatórias`, data_hora_vazio)
});

test('ccf_vazio', () => {
    let ccf_vazio: Venda = new Venda (lojaMod, DATA_HORA, 0, COO, caixaMod);
    verificaCampoObrigatorio(`O campo ccf é obrigatório`, ccf_vazio)
});

test('coo_vazio', () => {
    let coo_vazio: Venda = new Venda (lojaMod, DATA_HORA, CCF, 0, caixaMod);
    verificaCampoObrigatorio(`O campo coo é obrigatório`, coo_vazio)
}); 

test ('Venda_valor_item_0', () => {
    let venda = lojaMod.makeVenda(DATA_HORA, CCF, COO, caixaMod);
    verificaCampoObrigatorioVenda("Valor do produto inválido", venda, 1, exProd3, 3)
})

test ('Venda_vazia', () => {
    let venda = lojaMod.makeVenda(DATA_HORA, CCF, COO, caixaMod);
    verificaCampoObrigatorioVenda("A lista de itens da venda está vazia", venda, 0, exProd2, 3)
})

test ('Venda_item_duplo', () => {
    let venda = lojaMod.makeVenda(DATA_HORA, CCF, COO, caixaMod);
    venda.montarCompra(1, exProd1, 10);
    verificaCampoObrigatorioVenda("Dois itens não podem conter o mesmo produto", venda, 2, exProd1, 3)
})

test ('Venda_quantidade_0', () => {
    let venda = lojaMod.makeVenda(DATA_HORA, CCF,COO, caixaMod);
    verificaCampoObrigatorioVenda("Quantidade de itens inválida", venda, 1, exProd2, 0)
})

test ('Metodo_Pagamento_Invalido', () => {
    let venda = lojaMod.makeVenda(DATA_HORA, CCF, COO, caixaMod)
    venda.montarCompra(1, exProd1, 10);
    venda.montarCompra(2, exProd2, 5);
    venda.montarPagamento("Boleto", VALOR_RECEBIDO);
    verificaCampoObrigatorioCupom("Forma de pagamento não aceita", venda);
})

test ('Valor_Pagamento_Insuficiente', () => {
    let venda = lojaMod.makeVenda(DATA_HORA, CCF, COO, caixaMod)
    venda.montarCompra(1, exProd1, 10);
    venda.montarCompra(2, exProd2, 5);
    venda.montarPagamento(METODO_PAG_DINHEIRO, 50);
    verificaCampoObrigatorioCupom("O pagamento é insuficiente para a compra", venda);
})

const TEXTO_ESPERADO_CUPOM_COMPLETO_DINHEIRO = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
25/11/2020 10:30:40V CCF:123456 COO: 654321
   CUPOM FISCAL   
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 10 Banana 10 cx 7.45 ST 74.50
2 20 Laranja 5 cx 3.32 ST 16.60
------------------------------
TOTAL R$ 91.10
Dinheiro 100.00
Troco R$ 8.90
Lei 12.741, Valor aprox.,Imposto F=6.87 (7.54%),E=4.38 (4.81%)
------------------------------
OPERADOR: 494715
------------------------------
SWEDA IF ST200
ECF-IF VERSÃO: 01.00.05 ECF: 067
FAB: SW031300000000045629`

test ('cupom_completo_dinheiro', () => {
    let venda = lojaMod.makeVenda(DATA_HORA, CCF, COO, caixaMod);
    venda.montarCompra(1, exProd1, 10);
    venda.montarCompra(2, exProd2, 5);
    venda.montarPagamento(METODO_PAG_DINHEIRO, VALOR_RECEBIDO);
    expect(venda.imprimeCupom()).toBe(TEXTO_ESPERADO_CUPOM_COMPLETO_DINHEIRO);
})

const TEXTO_ESPERADO_CUPOM_COMPLETO_CREDITO = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
25/11/2020 10:30:40V CCF:123456 COO: 654321
   CUPOM FISCAL   
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 10 Banana 10 cx 7.45 ST 74.50
2 20 Laranja 5 cx 3.32 ST 16.60
------------------------------
TOTAL R$ 91.10
Cartão de Crédito
Troco R$ 0
Lei 12.741, Valor aprox.,Imposto F=6.87 (7.54%),E=4.38 (4.81%)
------------------------------
OPERADOR: 494715
------------------------------
SWEDA IF ST200
ECF-IF VERSÃO: 01.00.05 ECF: 067
FAB: SW031300000000045629`

test ('cupom_completo_credito', () => {
    try{
        let venda = lojaMod.makeVenda(DATA_HORA, CCF, COO,caixaMod);
        venda.montarCompra(1, exProd1, 10);
        venda.montarCompra(2, exProd2, 5);
        venda.montarPagamento(METODO_PAG_CREDITO, VALOR_RECEBIDO);
        venda.imprimeCupom();
    }catch(e){
        expect(e.message).toBe(TEXTO_ESPERADO_CUPOM_COMPLETO_CREDITO);
    }
})

const TEXTO_ESPERADO_CUPOM_COMPLETO_DEBITO = `Loja 1
Log 1, 10 C1
Bai 1 - Mun 1 - E1
CEP:11111-111 Tel (11) 1111-1111
Obs 1
CNPJ: 11.111.111/1111-11
IE: 123456789
------------------------------
25/11/2020 10:30:40V CCF:123456 COO: 654321
   CUPOM FISCAL   
ITEM CODIGO DESCRICAO QTD UN VL UNIT(R$) ST VL ITEM(R$)
1 10 Banana 10 cx 7.45 ST 74.50
2 20 Laranja 5 cx 3.32 ST 16.60
------------------------------
TOTAL R$ 91.10
Cartão de Débito
Troco R$ 0
Lei 12.741, Valor aprox.,Imposto F=6.87 (7.54%),E=4.38 (4.81%)
------------------------------
OPERADOR: 494715
------------------------------
SWEDA IF ST200
ECF-IF VERSÃO: 01.00.05 ECF: 067
FAB: SW031300000000045629`

test ('cupom_completo_debito', () => {
    try{
        let venda = lojaMod.makeVenda(DATA_HORA, CCF, COO, caixaMod);
        venda.montarCompra(1, exProd1, 10);
        venda.montarCompra(2, exProd2, 5);
        venda.montarPagamento(METODO_PAG_DEBITO, VALOR_RECEBIDO);
        venda.imprimeCupom();
    }catch(e){
        expect(e.message).toBe(TEXTO_ESPERADO_CUPOM_COMPLETO_DEBITO);
    }
})

test ('caixa_sem_operador', () => {
    let caixaMod : Caixa = new Caixa (0, IMPRESSORA, ECF_IF, ECF, SERIAL)
    let vendaMod : Venda = new Venda (lojaMod, DATA_HORA, CCF, COO, caixaMod) 
    vendaMod.montarCompra(10, exProd1, 10) 
    vendaMod.montarCompra(2, exProd2, 5);
    vendaMod.montarPagamento(METODO_PAG_DINHEIRO, VALOR_RECEBIDO);   
    verificaCampoObrigatorioCupom("O código do operador é obrigatório", vendaMod)
})

test ('caixa_sem_impressora', () => {
    let caixaMod : Caixa = new Caixa (OPERADOR, "", ECF_IF, ECF, SERIAL)
    let vendaMod : Venda = new Venda (lojaMod, DATA_HORA, CCF, COO, caixaMod)
    vendaMod.montarCompra(10, exProd1, 10) 
    vendaMod.montarCompra(2, exProd2, 5);
    vendaMod.montarPagamento(METODO_PAG_DINHEIRO, VALOR_RECEBIDO);  
    verificaCampoObrigatorioCupom("A informação do modelo da impressora fiscal é obrigatória", vendaMod)
})

test ('caixa_sem_ecf_if', () => {
    let caixaMod : Caixa = new Caixa (OPERADOR, IMPRESSORA, "", ECF, SERIAL)
    let vendaMod : Venda = new Venda (lojaMod, DATA_HORA, CCF, COO, caixaMod)
    vendaMod.montarCompra(10, exProd1, 10) 
    vendaMod.montarCompra(2, exProd2, 5);
    vendaMod.montarPagamento(METODO_PAG_DINHEIRO, VALOR_RECEBIDO);  
    verificaCampoObrigatorioCupom("A informação do ecf_if da impressora é obrigatória", vendaMod)
})

test ('caixa_sem_ecf', () => {
    let caixaMod : Caixa = new Caixa (OPERADOR, IMPRESSORA, ECF_IF, "", SERIAL)
    let vendaMod : Venda = new Venda (lojaMod, DATA_HORA, CCF, COO, caixaMod)
    vendaMod.montarCompra(10, exProd1, 10)  
    vendaMod.montarCompra(2, exProd2, 5);
    vendaMod.montarPagamento(METODO_PAG_DINHEIRO, VALOR_RECEBIDO); 
    verificaCampoObrigatorioCupom("A informação do ecf da impressora é obrigatória", vendaMod)
})

test ('caixa_sem_serial', () => {
    let caixaMod : Caixa = new Caixa (OPERADOR, IMPRESSORA, ECF_IF, ECF, "")
    let vendaMod : Venda = new Venda (lojaMod, DATA_HORA, CCF, COO, caixaMod)
    vendaMod.montarCompra(10, exProd1, 10)
    vendaMod.montarCompra(2, exProd2, 5);
    vendaMod.montarPagamento(METODO_PAG_DINHEIRO, VALOR_RECEBIDO);   
    verificaCampoObrigatorioCupom("A informação do serial da impressora é obrigatória", vendaMod)
})
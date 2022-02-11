 
let menuModal = addEventListener('click', modal)
let formata = document.getElementById('valorMercadoria')
    formata.addEventListener('keyup', () => {
    let valor = formata.value
    formata.value = formatarMoeda(valor)
})

 
function modal(e) {
    let el = e.target.classList    
    if (el.contains('modal')) {
        let nav = document.querySelector('nav')
        nav.classList.toggle('active')   // toggle cria uma classe no elemento caso ela não exista, caso exista ele remove   
    }     
}


function enviaForm(){

    let select = document.getElementById('tipoTransacao');
    let opcaoSelecionada = select.options[select.selectedIndex];
    let nomeMercadoria = document.getElementById('nomeMercadoria')
    let valorMercadoria = document.getElementById('valorMercadoria')
    let dados = JSON.parse(localStorage.getItem("dadosProdutos"))

    let valores = {
        transacao: opcaoSelecionada.value,
        mercadoria: nomeMercadoria.value,
        valor: valorMercadoria.value.replace(/[^0-9]/g, '')
    }

    if(opcaoSelecionada == '') return
    
    if (dados == null) {
        localStorage.setItem('dadosProdutos', [])
        dados = [] 
    }  
        
    dados.push(valores)
    localStorage.setItem('dadosProdutos', JSON.stringify(dados))
    
    select.value = ''
    nomeMercadoria.value = ''
    valorMercadoria.value = ''

    atualizaLista() 
}


function atualizaLista() {
    
    let lista = JSON.parse(localStorage.getItem('dadosProdutos'))
    let listArea = document.getElementById('listagem')
    let valorCompra = 0
    let valorVenda = 0

    if (lista == null) return

    listArea.innerHTML = `
        <h3>Extrato de transação</h3>
        <div class="listaTilulo">
            <div>Mercadoria</div>
            <div>Valor</div>
        </div>
    `

    for (let key in lista) {    
        let elemento = lista[key];
        let valor = parseInt(elemento.valor)
        
         if (elemento.transacao == 'Compra') {
            valorCompra += valor
        } else {
            valorVenda += valor
        }


        listArea.innerHTML += `                
            <div class="lista">
                <div class="trasacao">${(elemento.transacao == 'Compra'? '-' : '+' )}</div>
                <div class="conteudo">${elemento.mercadoria}</div>
                <div class="valor">R$ ${formatarMoeda(valor)}</div>
            </div>
        `        
       
    }      

    let valorTotal = valorVenda - valorCompra

    listArea.innerHTML += `
        <div class="listaTilulo">
            <div>Total</div>                    
            <div id="total">
                <div class="valor">R$ ${formatarMoeda(valorTotal)}</div>
                <div>[${valorTotal >= 0 ? 'LUCRO': 'PREJUÍZO'}]</div>
            </div>
        </div>
    `
}


function limparDados() {
    localStorage.clear();
    atualizaLista()   
}


function formatarMoeda(elemento) {
    let valor = elemento + '';
        
    valor = parseInt(valor.replace(/[^-0-9]+/g, ''));
    valor = valor + '';

    if (valor.length == 1) {            
        valor = valor.replace(/([0-9]{1})$/g, "0,0$1");
    }
    else if (valor.length == 2) {
        valor = valor.replace(/([0-9]{2})$/g, "0,$1"); 
    } else if (valor.length >= 3 && valor.length < 6) {
        valor = valor.replace(/([0-9]{2})$/g, ",$1");             
    }      
    else if (valor.length >= 6 ) {
        valor = valor.replace(/([0-9]{3})([0-9]{2})$/g, ".$1,$2");
    }
    
    if (valor == 'NaN') valor = '';
    
    return valor        
}
    





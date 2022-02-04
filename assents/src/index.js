let menuModal = addEventListener('click', modal)



function modal(e) {
    let el = e.target.classList    
    if (el.contains('modal')) {
        let nav = document.querySelector('nav')
        nav.classList.toggle('active')   // toggle cria uma classe no elemento caso ela não exista, caso exista ele remove   
    }     
}


function enviaForm(e){
    //e.preventDefault()

    let select = document.getElementById('tipoTransacao');
    let opcaoSelecionada = select.options[select.selectedIndex].value;
    let nomeMercadoria = document.getElementById('nomeMercadoria').value
    let valorMercadoria = document.getElementById('valorMercadoria').value

    let dados = JSON.parse(localStorage.getItem("dadosProdutos"))
    let valores = {
        transacao: opcaoSelecionada,
        mercadoria: nomeMercadoria,
        valor: valorMercadoria
    }
    if(opcaoSelecionada == '') return
    
    if (dados == null) {
        localStorage.setItem('dadosProdutos', [])
        dados = [] 
    }
    
    
    
    dados.push(valores)
    localStorage.setItem('dadosProdutos', JSON.stringify(dados))
}


function atualizaLista() {
    let lista = JSON.parse(localStorage.getItem('dadosProdutos'))
    let listArea = document.getElementById('tabela')
    let valorCompra = 0
    let valorVenda = 0

    listArea.innerHTML = `
        <h3>Extrato de transação</h3>
        <div class="topBottom">
            <div>Mercadoria</div>
            <div>Valor</div>
        </div>
    `

    for (let key in lista) {    
        let elemento = lista[key];
        listArea.innerHTML += `                
            <div class="lista">
                <div class="trasacao">${(elemento.transacao == 'Compra'? '+' : '-' )}</div>
                <div class="conteudo">${elemento.mercadoria}</div>
                <div class="valor">R$ ${elemento.valor}</div>
            </div>
        `        
        if (elemento.transacao == 'Compra') {
            valorCompra += parseInt(elemento.valor)
        } else {
            valorVenda += parseInt(elemento.valor)
        }
    }      

    let valorTotal = (valorCompra) - (valorVenda) 
    console.log(valorCompra)

    listArea.innerHTML += `
        <div class="topBottom">
            <div>Total</div>                    
            <div id="total">
                <div class="valor">R$ ${valorTotal}</div>
                <div>[${valorTotal >= 0? 'LUCRO': 'PREJUÍZO'}]</div>
            </div>
        </div>
    `
}

    
atualizaLista()
    
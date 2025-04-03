
async function getData() {
    try {
        const response = await fetch("https://fastapi-teste1.onrender.com/products");
        const data = await response.json();

        const responseCar = await fetch("https://fastapi-teste1.onrender.com/carrinho");
        const dataCar = await responseCar.json();

        gerarCard(data.products);
        gerarCarrinho(dataCar);

        const btnsCard = document.querySelectorAll(".btn-card");
        btnsCard.forEach(btn => {
            btn.addEventListener('click', () =>{
                adicionarCarrinho(btn.getAttribute('id'), data.products,dataCar)
            });
        });

        const btnsMenosQtd = document.querySelectorAll(".menos");
        btnsMenosQtd.forEach(btn => {
            btn.addEventListener('click', () =>{
                alterarQtdProduto(btn.getAttribute('id'), dataCar.carrinho, '-')
            });
        });
        const btnsMaisQtd = document.querySelectorAll(".mais");
        btnsMaisQtd.forEach(btn => {
            btn.addEventListener('click', () =>{
                alterarQtdProduto(btn.getAttribute('id'), dataCar.carrinho, '+')
            });
        });
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

async function gerarCard(produtos) {
    for (const produto of produtos) {
        document.querySelector(".produtos").innerHTML+=`<span id=${produto.id} class="card">
        <img src=${produto.image} alt="">
        <h3>${produto.name}</h3>
        <p>R$ ${produto.price}</p>
        <button id=${produto.id} class="btn-card">Adicionar ao carrinho</button>
    </span>`
    }  
}

async function gerarCarrinho(dataCar) {
    
    const htmlCarrinho = document.querySelector("#carrinho");
    htmlCarrinho.innerHTML = '';

    visibilidadeCarrinho(htmlCarrinho, dataCar);
    
    for (const produtoCar of dataCar.carrinho) {
        htmlCarrinho.innerHTML+=`
        <span id=${produtoCar.id} class="mini-card">
            <img src=${produtoCar.image} alt="">
            <h3>${produtoCar.name}</h3>
            <p>R$ ${produtoCar.price}</p>
            <div class='flex'>
                <button id=${produtoCar.id} class='menos'>-</button>
                <p>${produtoCar.qtd}</p>
                <button id=${produtoCar.id} class='mais'>+</button>
            </div>
        </span>`
    }
}

function isEmpty(dataCar) {
    if (Array.isArray(dataCar?.carrinho) && dataCar.carrinho.length > 0) {
        return false;
    }
    else{
        return true;
    }
}

async function visibilidadeCarrinho(htmlCarrinho,dataCar) {
    if(!isEmpty(dataCar) && htmlCarrinho.classList.contains('oculto'))
    {
        htmlCarrinho.classList.remove('oculto');
        htmlCarrinho.classList.add('visivel');
    }
    else if(htmlCarrinho.classList.contains('visivel'))
    {
        htmlCarrinho.classList.add('oculto');
        htmlCarrinho.classList.remove('visivel');
    }
}

async function adicionarCarrinho(id, produtos, dataCar) {
    const existeNoCarrinho = verificarCarrinho(id,dataCar);
    if(!existeNoCarrinho){
        for(const prod of produtos){
            if(prod['id']==id){
                const response = await fetch("https://fastapi-teste1.onrender.com/carrinho", {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(prod)
                });
                const data = await response.json();
                console.log(data);
            }
        }
        refresh();
        // gerarCarrinho(dataCar);
    }
}

function verificarCarrinho(id, dataCar){
    const prod = dataCar.carrinho.find(prod => prod.id == id)
    if(prod){
        return true;
    }
    else{
        return false;
    }
}

async function alterarQtdProduto(id,dataCar,op) {
    try{
        console.log('entrou na function');
        const prod = dataCar.find(prod => prod.id == id);
        
        if(prod.qtd==1 && op=='-'){
            const response = await fetch(`https://fastapi-teste1.onrender.com/carrinho/${id}`,{
                method: 'DELETE',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prod)
            })
            const data = await response.json();
            console.log(data);
        }
        else if(op=='-' || op=='+'){
            if(op=='-') prod.qtd-=1;
            else prod.qtd+=1;
            
            const response = await fetch(`https://fastapi-teste1.onrender.com/carrinho/${id}`,{
                method: 'PUT',  
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(prod)
            })
            const data = await response.json();
            // console.log(data);
        }
        refresh();
    }
    catch{
        console.log('Falha ao excluir');
    }
}

function refresh() {
    setTimeout(() => {
        window.location.reload();
      }, 10);
}

getData();

async function getData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/products");
        const data = await response.json();

        const responseCar = await fetch("http://127.0.0.1:8000/carrinho");
        const dataCar = await responseCar.json()

        gerarCard(data.products);

        if(!isEmpty(dataCar)){
            gerarCarrinho(dataCar);
        }

    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

async function gerarCard(produtos) {
    for (const produto of produtos) {
        document.querySelector(".produtos").innerHTML+=`<span id=${produto.id} class="card">
        <img src=${produto.image} alt="">
        <h3>${produto.name}</h3>
        <p>${produto.price}</p>
        <button id=${produto.id}>Adicionar ao carrinho</button>
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

async function isEmpty(dataCar) {
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

getData();
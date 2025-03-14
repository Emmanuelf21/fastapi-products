
async function getData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/products");
        const data = await response.json();

        const responseCar = await fetch("http://127.0.0.1:8000/carrinho");
        const dataCar = await responseCar.json()
        
        
        gerarCard(data.products);
        
        if(data.products){
            gerarCarrinho(dataCar)
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
    htmlCarrinho.classList.remove('oculto');
    htmlCarrinho.classList.add('visivel');
    for (const produto of dataCar.carrinho) {
        htmlCarrinho.innerHTML+=`<span id=${produto.id} class="mini-card">
        <img src=${produto.image} alt="">
        <h3>${produto.name}</h3>
        <p>${produto.price}</p>
    </span>`
    }
}

getData();
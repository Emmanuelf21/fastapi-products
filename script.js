
async function getData() {
    try {
        const response = await fetch("http://127.0.0.1:8000/products");
        const data = await response.json();
        gerarCard(data.products);      
    } catch (error) {
        console.error("Erro ao buscar dados:", error);
    }
}

async function gerarCard(produtos) {
    for (const produto of produtos) {
        console.log(produto)
        document.querySelector(".produtos").innerHTML+=`<span id=${produto.id} class="card">
        <img src=${produto.image} alt="">
        <h3>${produto.name}</h3>
        <p>${produto.price}</p>
        <button id=${produto.id}>Adicionar ao carrinho</button>
    </span>`
    }  
}
getData();
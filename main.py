from fastapi import FastAPI
from product import Product
from carrinho import Carrinho
from json_db import JsonDB
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
productDB = JsonDB(path='./data/products.json')
carrinhoDB = JsonDB(path='./data/carrinho.json')

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Permite requisições de qualquer origem (use com cuidado em produção)
    allow_credentials=True,
    allow_methods=["*"],  # Permite todos os métodos (GET, POST, PUT, DELETE, etc.)
    allow_headers=["*"],  # Permite todos os headers
)

@app.get("/products")
def get_products():
    products = productDB.read()
    return products

@app.post("/products")
def create_product(product: Product):
    productDB.insert(product)
    return {"status": 'inserted'}

@app.get("/carrinho")
def get_carrinho():
    carrinho = carrinhoDB.read()
    print(carrinho)
    return carrinho


@app.post("/carrinho")
def create_carrinho(carrinho: Carrinho):
    carrinhoDB.insert(carrinho)
    return {"status": 'inserido no carrinho'}

@app.put("/carrinho/{id}")
def att_carrinho(carrinho: Carrinho):
    carrinhoDB.read()
    
@app.delete("/carrinho/{id}")
def delete_carrinho(id:int):
    for car in carrinhoDB:
        if car['id'] == id:
            carrinhoDB.remover(car)
            return {"status": 'produto removido'}
        else:
             return {"status": 'produto não encontrado'}
    
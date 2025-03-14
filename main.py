from fastapi import FastAPI
from product import Product
from json_db import JsonDB
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
productDB = JsonDB(path='./data/products.json')

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


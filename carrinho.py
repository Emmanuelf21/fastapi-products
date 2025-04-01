from pydantic import BaseModel

class Carrinho(BaseModel):
    id:int
    name:str
    price:float
    image:str
    qtd: int
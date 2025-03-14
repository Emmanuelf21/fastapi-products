from pydantic import BaseModel
import json
from product import Product
from carrinho import Carrinho

class JsonDB(BaseModel):
    path: str
    
    def read(self):
        f = open(self.path)
        data = json.loads(f.read())
        f.close
        return data
    
    def insert(self, product: Product):
        data = self.read()
        data['products'].append(product.dict())
        f = open(self.path, 'w') #pega o path dos produtos com permição de escrita
        f.write(json.dumps(data)) 
        f.close
    
    def insert(self, carrinho:Carrinho):
        data = self.read()
        data['carrinho'].append(carrinho.dict())
        f = open(self.path, 'w') #pega o path dos produtos com permição de escrita
        f.write(json.dumps(data)) 
        f.close
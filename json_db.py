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
    
    def insert_carrinho(self, product:Product):
        data = self.read()
        newProduct = product.dict()
        newProduct['qtd']=1
        data['carrinho'].append(newProduct)
        f = open(self.path, 'w') #pega o path dos produtos com permição de escrita
        f.write(json.dumps(data)) 
        f.close
    
    def att_carrinho(self,product:Carrinho):
        data = self.read()
        attProduct = product.dict()
        for prod in data['carrinho']:
            if prod['id']==attProduct['id']:
                pos = data['carrinho'].index(prod)
        data['carrinho'].pop(pos)
        data['carrinho'].insert(pos,attProduct)
        f = open(self.path, 'w')
        f.write(json.dumps(data))
        f.close
        
    
    def remover(self, produto: Carrinho):
        data = self.read()
        data['carrinho'].remove(produto.dict())
        f = open(self.path,'w')
        f.write(json.dumps(data))
        f.close
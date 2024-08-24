from pydantic import BaseModel

# As schemas servem como instanciação das tuplas do banco de dados
# na forma de objetos para manipulação e edição,
# mantendo ainda a possibilidade de serem convertidas para uma query sql ou uma resposta json  
class ItemBase(BaseModel):
    name: str
    description: str

#instancia um dummy item para receber os dados de criação
class ItemCreate(ItemBase):
    pass

#item efetivo e auto indexado por int em ordem crescente
class Item(ItemBase):
    id: int

    class Config:
        from_attributes = True

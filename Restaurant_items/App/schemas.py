from pydantic import BaseModel
from typing import Optional
# As schemas servem como instanciação das tuplas do banco de dados
# na forma de objetos para manipulação e edição,
# mantendo ainda a possibilidade de serem convertidas para uma query sql ou uma resposta json  
class ItemBase(BaseModel):
    name: str
    description: str
    price: float
    cnpj_restaurant: str

#instancia um dummy item para receber os dados de criação
class ItemCreate(ItemBase):
    photo: str

class ItemUpdate(BaseModel):
    name: Optional[str]
    description: Optional[str]
    price: Optional[float]
    photo: Optional[str]
    cnpj_restaurant: Optional[str]

#item efetivo e auto indexado por int em ordem crescente
class Item(ItemBase):
    id: int
    photo: str

    class Config:
        from_attributes = True

class Authorization(BaseModel):
    user_id: str
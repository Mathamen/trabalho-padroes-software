from pydantic import BaseModel
from typing import List

# As schemas servem como instanciação das tuplas do banco de dados
# na forma de objetos para manipulação e edição,
# mantendo ainda a possibilidade de serem convertidas para uma query sql ou uma resposta json  
class OrderBase(BaseModel):
    listitems: str
    cnpj_restaurant: str
    cpf_client: str

#instancia um dummy item para receber os dados de criação
class OrderCreate(BaseModel):
    listitems: List[int]

#item efetivo e auto indexado por int em ordem crescente
class Order(OrderBase):
    state: str = "solicitado"
    id: int
    finalizado: bool = False
    pagamento: bool = True

    class Config:
        orm_mode = True

class Authorization(BaseModel):
    user_id: str

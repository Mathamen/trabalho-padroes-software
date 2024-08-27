from pydantic import BaseModel
from typing import Optional
# As schemas servem como instanciação das tuplas do banco de dados
# na forma de objetos para manipulação e edição,
# mantendo ainda a possibilidade de serem convertidas para uma query sql ou uma resposta json  
class ClientBase(BaseModel):
    name: str
    email: str
    cpf: str
    phone_number: str
    address: str

#instancia um dummy item para receber os dados de criação
class ClientCreate(ClientBase):
    password: str

#item efetivo e auto indexado por int em ordem crescente
class Client(ClientBase):
    id: int
    password: str 

    class Config:
        orm_mode = True

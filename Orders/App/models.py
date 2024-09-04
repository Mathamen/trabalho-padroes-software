from sqlalchemy import Column, Integer, String, Boolean, List
from .database import Base

# Criação de modelos a partir da base do sqlalchemy
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String, index=True)
    listitems = Column(List[int])
    cnpj_restaurant = Column(String, index=True)
    cpf_client = Column(String, index=True)
    finalizado = Column(Boolean, index=True)
    pagamento = Column(Boolean, index = True)
    #name = Column(String, index=True)
    #description = Column(String, index=True)

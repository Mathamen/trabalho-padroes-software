from sqlalchemy import Column, Integer, String, Boolean, ARRAY
from .database import Base

# Criação de modelos a partir da base do sqlalchemy
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String, default="solicitado")
    listitems = Column(ARRAY[int])
    cnpj_restaurant = Column(String)
    cpf_client = Column(String)
    finalizado = Column(Boolean, default=False)
    pagamento = Column(Boolean, default=False)
    #name = Column(String)
    #description = Column(String)

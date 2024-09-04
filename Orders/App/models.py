from sqlalchemy import Column, Integer, String, Boolean
from .database import Base

# Criação de modelos a partir da base do sqlalchemy
class Order(Base):
    __tablename__ = "orders"

    id = Column(Integer, primary_key=True, index=True)
    state = Column(String, default="solicitado")
    listitems = Column(String)
    cnpj_restaurant = Column(String)
    cpf_client = Column(String)
    finalizado = Column(Boolean, default=False)
    pagamento = Column(Boolean, default=True)
    #name = Column(String)
    #description = Column(String)

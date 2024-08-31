from sqlalchemy import Column, Integer, String
from .database import Base

# Criação de modelos a partir da base do sqlalchemy
#class Item(Base):
   # __tablename__ = "items"
   # id = Column(Integer, primary_key=True, index=True)
   # name = Column(String, index=True)
   # description = Column(String, index=True)

class Client(Base):
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    cpf = Column(String, unique=True, index=True)
    phone_number = Column(String, index=True)
    address = Column(String, index=True)
    password = Column(String) #Armazena hash da senha    
    # description = Column(String, index=True)

class Restaurant(Base):
    __tablename__ = "restaurants"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    cnpj = Column(String, unique=True, index=True)
    phone_number = Column(String, index=True)
    address = Column(String, index=True)
    password = Column(String) #Armazena hash da senha    
    # description = Column(String, index=True)
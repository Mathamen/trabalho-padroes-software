from sqlalchemy import Column, Integer, String, Float
from .database import Base

# Criação de modelos a partir da base do sqlalchemy
class Item(Base):
    __tablename__ = "items"

    id = Column(Integer, primary_key=True, index=True)
    photo = Column(String, nullable=False)
    name = Column(String, index=True)
    description = Column(String, index=True)
    price = Column(Float, nullable=False)
    cnpj_restaurant = Column(String, index=True)

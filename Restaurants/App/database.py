from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

#cria arquivo .db na raiz, use o nome que quiser
SQLALCHEMY_DATABASE_URL = "sqlite:///./data/cardapio.db"

# Inicialização do banco de dados
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Criação de uma base que será usada para a criação de modelos
Base = declarative_base()

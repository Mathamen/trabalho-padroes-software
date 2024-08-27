from sqlalchemy.orm import Session
from . import models, schemas

# Bem auto explicativo, esses são os métodos responsáveis pelas operações de CRUD no banco de dados 
def get_client(db: Session, client_id: int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()

def create_client(db: Session, client: schemas.ClientCreate):
    db_client = models.Client(
        name=client.name, 
        email=client.email,
        cpf=client.cpf,
        phone_number=client.phone_number,
        address=client.address,
        password=client.password
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def update_client(db: Session, client_id: int, client: schemas.ClientCreate):
    db_client= db.query(models.Client).filter(models.Client.id == client_id).first()
    if db_client is None:
        return None
    db_client.name = client.name
    db_client.description = client.description
    db.commit()
    db.refresh(db_client)
    return db_client

def delete_client(db: Session, client_id: int):
    db_client = db.query(models.Client).filter(models.Client.id == client_id).first()
    if db_client == None:
        return False #error ocurred
    db.delete(db_client)
    db.commit()
    return True #no errors
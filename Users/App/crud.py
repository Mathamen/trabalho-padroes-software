from sqlalchemy.orm import Session
from . import models, schemas

# Bem auto explicativo, esses são os métodos responsáveis pelas operações de CRUD no banco de dados 
def get_client(db: Session, client_id: int):
    return db.query(models.Client).filter(models.Client.id == client_id).first()

def create_client(db: Session, client: schemas.ClientCreate, credencial: str, password: str):
    db_client = models.Client(
        name=client.name, 
        email=client.email,
        cpf=client.cpf,
        phone_number=client.phone_number,
        address=client.address,
        password=password
    )
    db.add(db_client)
    db.commit()
    db.refresh(db_client)
    return db_client

def update_client(db: Session, client_id: int, client: schemas.ClientUpdate):
    db_client= db.query(models.Client).filter(models.Client.id == client_id).first()
    if db_client is None:
        return None
    for key, value in client.dict(exclude_unset=True).items():
        setattr(db_client, key, value)
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


def get_restaurant(db: Session, restaurant_id: int):
    return db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()

def create_restaurant(db: Session, restaurant: schemas.RestaurantCreate):
    db_restaurant = models.Restaurant(
        name=restaurant.name, 
        email=restaurant.email,
        cnpj=restaurant.cnpj,
        phone_number=restaurant.phone_number,
        address=restaurant.address,
        password=restaurant.password
    )
    db.add(db_restaurant)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

def update_restaurant(db: Session, restaurant_id: int, restaurant: schemas.RestaurantUpdate):
    db_restaurant= db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    if db_restaurant is None:
        return None
    for key, value in restaurant.dict(exclude_unset=True).items():
        setattr(db_restaurant, key, value)
    db.commit()
    db.refresh(db_restaurant)
    return db_restaurant

def delete_restaurant(db: Session, restaurant_id: int):
    db_restaurant = db.query(models.Restaurant).filter(models.Restaurant.id == restaurant_id).first()
    if db_restaurant == None:
        return False #error ocurred
    db.delete(db_restaurant)
    db.commit()
    return True #no errors
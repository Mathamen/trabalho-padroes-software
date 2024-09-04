from sqlalchemy.orm import Session
from . import models, schemas

# Bem auto explicativo, esses são os métodos responsáveis pelas operações de CRUD no banco de dados 
def get_item(db: Session, item_id: int):
    return db.query(models.Item).filter(models.Item.id == item_id).first()

#Retorna todos os itens do restaurante_id
def get_items(db: Session, restaurant_id=str):
    return db.query(models.Item).filter(models.Item.cnpj_restaurant == restaurant_id).all()

def create_item(db: Session, item: schemas.ItemCreate, user_id: str):
    db_item = models.Item(
        name=item.name, 
        description=item.description,
        price=item.price,
        photo=item.photo,
        cnpj_restaurant=user_id
        )
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def update_item(db: Session, item_id: int, item: schemas.ItemUpdate):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item is None:
        return None
    for key, value in item.dict(exclude_unset=True).items():
        setattr(db_item, key, value)
    db.commit()
    db.refresh(db_item)
    return db_item

def delete_item(db: Session, item_id: int):
    db_item = db.query(models.Item).filter(models.Item.id == item_id).first()
    if db_item == None:
        return False #error ocurred
    db.delete(db_item)
    db.commit()
    return True #no errors
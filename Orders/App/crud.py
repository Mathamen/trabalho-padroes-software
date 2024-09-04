from sqlalchemy.orm import Session
from . import models, schemas

# Bem auto explicativo, esses são os métodos responsáveis pelas operações de CRUD no banco de dados 
def get_order(db: Session, order_id: int):
    return db.query(models.Order).filter(models.Order.id == order_id).first()

def create_order(db: Session, order: schemas.OrderCreate):
    db_order = models.Order(
        state = order.state,
        listitems = ",".join(map(int, order.listitems)),
        cnpj_restaurant = order.cnpj_restaurant,
        cpf_client = order.cpf_client,
        finalizado = order.finalizado,
        pagamento = order.pagamento
    )
    db.add(db_order)
    db.commit()
    db.refresh(db_order)
    return db_order

def update_order(db: Session, order_id: int, order: schemas.OrderCreate):
    db_order = db.query(models.order).filter(models.Order.id == order_id).first()
    if db_order is None:
        return None
    db_order.state = order.state,
    db_order.listitems = ",".join(map(str, order.listitems)),
    db_order.cnpj_restaurant = order.cnpj_restaurant,
    db_order.cpf_client = order.cpf_client,
    db_order.finalizado = order.finalizado,
    db_order.pagamento = order.pagamento
    db.commit()
    db.refresh(db_order)
    return db_order

def delete_order(db: Session, order_id: int):
    db_order = db.query(models.Order).filter(models.Order.id == order_id).first()
    if db_order == None:
        return False #error ocurred
    db.delete(db_order)
    db.commit()
    return True #no errors
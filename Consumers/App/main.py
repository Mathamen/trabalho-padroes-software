# A main é onde as requisições http são tratadas
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from . import models, schemas, crud, database


#instanciação de tabelas baseadas nos modelos declarados
models.Base.metadata.create_all(bind=database.engine)

# Criação do app
app = FastAPI()

# Dependência para acessar a sessão do banco de dados
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.post("/clients/", response_model=schemas.Client)
def create_client(client: schemas.ClientCreate, db: Session = Depends(get_db)):
    return crud.create_client(db=db, client=client)

@app.get("/clients/{client_id}", response_model=schemas.Client)
def read_client(client_id: int, db: Session = Depends(get_db)):
    db_client = crud.get_client(db, client_id=client_id)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_client

@app.put("/clients/{client_id}", response_model=schemas.Client)
def update_client(client_id: int, client: schemas.ClientCreate, db: Session = Depends(get_db)):
    db_client = crud.update_client(db, client_id=client_id, client=client)
    if db_client is None:
        raise HTTPException(status_code=404, detail="Client not found")
    return db_client

@app.delete("/clients/{client_id}", response_model=schemas.Client)
def delete_client(client_id: int, db: Session = Depends(get_db)):
    if crud.delete_client(db, client_id=client_id):
        return JSONResponse(content= {"message":f"client {client_id}: deleted successfully"})
    raise HTTPException(status_code=404, detail="Client not found")


#restaurant

@app.post("/restaurants/", response_model=schemas.Restaurant)
def create_restaurant(restaurant: schemas.RestaurantCreate, db: Session = Depends(get_db)):
    return crud.create_restaurant(db=db, restaurant=restaurant)

@app.get("restaurants/{restaurant_id}", response_model=schemas.Restaurant)
def read_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    db_restaurant = crud.get_restaurant(db, restaurant_id=restaurant_id)
    if db_restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return db_restaurant

@app.put("/restaurants/{restaurant_id}", response_model=schemas.Restaurant)
def update_restaurant(restaurant_id: int, restaurant: schemas.RestaurantCreate, db: Session = Depends(get_db)):
    db_restaurant= crud.update_restaurant(db, restaurant_id=restaurant_id, restaurant=restaurant)
    if db_restaurant is None:
        raise HTTPException(status_code=404, detail="Restaurant not found")
    return db_restaurant

@app.delete("/restaurants/{restaurant_id}", response_model=schemas.Restaurant)
def delete_restaurant(restaurant_id: int, db: Session = Depends(get_db)):
    if crud.delete_restaurant(db, restaurant_id=restaurant_id):
        return JSONResponse(content= {"message":f"restaurant {restaurant_id}: deleted successfully"})
    raise HTTPException(status_code=404, detail="Restaurant not found")
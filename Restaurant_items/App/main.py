# A main é onde as requisições http são tratadas
from fastapi import FastAPI, Depends, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud, database

#instanciação de tabelas baseadas nos modelos declarados
models.Base.metadata.create_all(bind=database.engine)

# Criação do app
app = FastAPI()

#middleware CORS
origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Dependência para acessar a sessão do banco de dados
def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

@app.get("/")
def ping_response():
    return JSONResponse(content={},status_code=200)

@app.post("/{user_id}/", response_model=schemas.Item)
def create_item(user_id:str, item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db, item, user_id)

#Retorna um item 
@app.get("/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

#Retorna todos os itens do restaurant
@app.get("/{restaurant_id}", response_model=list[schemas.Item])
def read_items(restaurant_id: str, db: Session = Depends(get_db)):
    db_items = crud.get_items(db, restaurant_id=restaurant_id)
    if db_items is None:
        raise HTTPException(status_code = 404, datail="Restaurant items not found")
    return db_items

@app.put("/{item_id}", response_model=schemas.Item)
def update_item(item_id: int, item: schemas.ItemUpdate, db: Session = Depends(get_db)):
    db_item = crud.update_item(db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@app.delete("/{user_id}/{item_id}", response_model=schemas.Item)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    if crud.delete_item(db, item_id=item_id):
        return JSONResponse(content= {"message":f"item {item_id}: deleted successfully"})
    raise HTTPException(status_code=404, detail="Item not found")
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

@app.put("/items/", response_model=schemas.Item)
def create_item(item: schemas.ItemCreate, db: Session = Depends(get_db)):
    return crud.create_item(db=db, item=item)

@app.get("/items/{item_id}", response_model=schemas.Item)
def read_item(item_id: int, db: Session = Depends(get_db)):
    db_item = crud.get_item(db, item_id=item_id)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@app.post("/items/{item_id}", response_model=schemas.Item)
def update_item(item_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)):
    db_item = crud.update_item(db, item_id=item_id, item=item)
    if db_item is None:
        raise HTTPException(status_code=404, detail="Item not found")
    return db_item

@app.delete("/items/{item_id}", response_model=schemas.Item)
def delete_item(item_id: int, db: Session = Depends(get_db)):
    if crud.delete_item(db, item_id=item_id):
        return JSONResponse(content= {"message":f"item {item_id}: deleted successfully"})
    raise HTTPException(status_code=404, detail="Item not found")
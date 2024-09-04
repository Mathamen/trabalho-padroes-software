# A main é onde as requisições http são tratadas
from fastapi import FastAPI, Depends, HTTPException, BackgroundTasks
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, schemas, crud, database
import asyncio


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

@app.get("/{order_id}", response_model=schemas.Order)
def read_order(order_id: int, db: Session = Depends(get_db)):
    db_order = crud.get_order(db, order_id=order_id)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@app.put("/orders/{order_id}", response_model=schemas.Order)
def update_order(order_id: int, order: schemas.OrderCreate, db: Session = Depends(get_db)):
    db_order = crud.update_order(db, order_id=order_id, order=order)
    if db_order is None:
        raise HTTPException(status_code=404, detail="Order not found")
    return db_order

@app.delete("/orders/{order_id}", response_model=schemas.Order)
def delete_order(order_id: int, db: Session = Depends(get_db)):
    if crud.delete_order(db, order_id=order_id):
        return JSONResponse(content= {"message":f"order {order_id}: deleted successfully"})
    raise HTTPException(status_code=404, detail="Order not found")

@app.post("/{restaurant_id}/{user_id}", response_model=schemas.Order)
def make_order(restaurant_id:str, user_id:str, order: schemas.OrderCreate, db: Session = Depends(get_db)):
    return crud.create_order(db, order, restaurant_id, user_id)

@app.put("/{order_id}/prepare")
def prepare_order(order_id, auth:schemas.Authorization, db: Session = Depends(get_db)):
    db_order = crud.get_order(db=db, order_id=order_id)
    if db_order.cnpj_restaurant == auth.user_id:
        db_order.state = "em preparo"
        db.commit()
        db.refresh(db_order)
        return db_order
    

@app.put("/{order_id}/ship")
def prepare_order(order_id, auth:schemas.Authorization, background_tasks: BackgroundTasks, db: Session = Depends(get_db)):
    db_order = crud.get_order(db=db, order_id=order_id)
    if db_order.cnpj_restaurant == auth.user_id:
        db_order.state = "enviado"
        db.commit()
        db.refresh(db_order)
        background_tasks.add_task(deliver, order_id=order_id, db=db)
        return db_order
    
async def deliver(order_id:int, db: Session = Depends(get_db)):
    await asyncio.sleep(15)
    db_order = crud.get_order(db=db, order_id=order_id)
    db_order.state = "entregue"
    db_order.finalizado = True
    db.commit()
    db.refresh(db_order)
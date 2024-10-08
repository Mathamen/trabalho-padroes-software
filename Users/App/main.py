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

@app.post("/", response_model=schemas.Client)
def create_client(client: schemas.User, db: Session = Depends(get_db)):
    try:
        return crud.create_client(db=db, client=client)
    except RuntimeError as e:
        print(e)
        raise HTTPException(status_code=409, detail="User already exists")



@app.post("/login")
def login(auth:schemas.Authorization, db: Session = Depends(get_db)):
    db_client = db.query(models.Client).filter(models.Client.email == auth.email).first()
    if db_client == None:
        raise HTTPException(status_code=404, detail="Client not found")
    elif db_client.password == auth.password:
        return JSONResponse(content={"user_id":db_client.email},status_code=200)
    else:
        raise HTTPException(status_code=401, detail="Password incorrect")

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
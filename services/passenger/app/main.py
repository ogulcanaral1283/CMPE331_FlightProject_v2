from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import passenger_router
from app.database import Base, engine
from app import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Passenger Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000", "*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(passenger_router.router)

@app.get("/")
def root():
    return {"message": "Passenger Service is running!"}

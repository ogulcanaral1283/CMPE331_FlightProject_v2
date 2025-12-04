from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import flight_router
from app.database import Base, engine
from app import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Flight Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(flight_router.router)

@app.get("/")
def root():
    return {"message": "Flight Service is running!"}

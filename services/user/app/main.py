from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import user_router
from app.database import Base, engine
from app import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="User Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(user_router.router)

@app.get("/")
def root():
    return {"message": "User Service is running!"}

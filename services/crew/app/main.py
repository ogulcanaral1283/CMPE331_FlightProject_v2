from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import pilot_router, cabin_crew_router
from app.database import Base, engine
from app import models

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Crew Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(pilot_router.router)
app.include_router(cabin_crew_router.router)

@app.get("/")
def root():
    return {"message": "Crew Service is running!"}

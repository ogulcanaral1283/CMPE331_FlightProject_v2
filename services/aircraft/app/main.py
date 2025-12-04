from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routers import aircraft_router, airline_router

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Aircraft Service")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(aircraft_router.router)
app.include_router(airline_router.router)

@app.get("/")
def root():
    return {"message": "Aircraft Service is running!"}

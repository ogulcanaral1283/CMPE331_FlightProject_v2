from fastapi import FastAPI
from app.routers import flights_router, pilots_router, cabin_router, passenger_router
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers.auth_router import router as auth_router
from app.routers.users_router import router as users_router





Base.metadata.create_all(bind=engine)


app = FastAPI(title="Airline Management API")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # geliştirme için tüm origin'lere izin
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(flights_router.router)
app.include_router(pilots_router.router)
app.include_router(cabin_router.router)
app.include_router(passenger_router.router)
app.include_router(auth_router)
app.include_router(users_router)


@app.get("/")
def root():
    return {"message": "✈️ Airline Management API is running!"}
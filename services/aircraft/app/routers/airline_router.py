from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.db_dependency import get_db
from app.models.airline_model import Airline
from pydantic import BaseModel

from typing import Optional

class AirlineBase(BaseModel):
    airline_name: str
    country: str
    airline_iata: Optional[str] = None
    airline_icao: Optional[str] = None

class AirlineCreate(AirlineBase):
    pass

class AirlineResponse(AirlineBase):
    airline_id: int
    class Config:
        from_attributes = True

router = APIRouter(prefix="/airlines", tags=["Airlines"])

@router.post("/", response_model=AirlineResponse)
def create_airline(airline: AirlineCreate, db: Session = Depends(get_db)):
    db_airline = Airline(
        airline_name=airline.airline_name,
        country=airline.country,
        airline_iata=airline.airline_iata,
        airline_icao=airline.airline_icao
    )
    db.add(db_airline)
    db.commit()
    db.refresh(db_airline)
    return db_airline

@router.get("/", response_model=list[AirlineResponse])
def get_all_airlines(db: Session = Depends(get_db)):
    return db.query(Airline).all()

from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.db_dependency import get_db
from app.models.airline_model import Airline
from pydantic import BaseModel

class AirlineBase(BaseModel):
    airline_name: str
    country: str

class AirlineResponse(AirlineBase):
    airline_id: int
    class Config:
        from_attributes = True

router = APIRouter(prefix="/airlines", tags=["Airlines"])

@router.get("/", response_model=list[AirlineResponse])
def get_all_airlines(db: Session = Depends(get_db)):
    return db.query(Airline).all()

from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import Flight, Pilot, CabinCrew, Passenger, Aircraft

router = APIRouter()

@router.get("/stats")
def get_stats(db: Session = Depends(get_db)):
    stats = {
        "total_flights": db.query(Flight).count(),
        "total_pilots": db.query(Pilot).count(),
        "total_crew": db.query(CabinCrew).count(),
        "total_passengers": db.query(Passenger).count(),
        "total_aircrafts": db.query(Aircraft).count(),
    }
    return stats
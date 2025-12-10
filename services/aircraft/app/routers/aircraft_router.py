from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.db_dependency import get_db
from app.models.aircraft_model import Aircraft
from app.schemas.aircraft_schema import AircraftCreate, AircraftResponse

router = APIRouter(prefix="/aircrafts", tags=["Aircrafts"])

@router.get("/", response_model=list[AircraftResponse])
def get_all_aircrafts(airline_id: int = None, db: Session = Depends(get_db)):
    query = db.query(Aircraft)
    if airline_id:
        query = query.filter(Aircraft.airline_id == airline_id)
    return query.all()

@router.get("/{aircraft_id}", response_model=AircraftResponse)
def get_aircraft(aircraft_id: int, db: Session = Depends(get_db)):
    aircraft = db.query(Aircraft).filter(Aircraft.aircraft_id == aircraft_id).first()
    if not aircraft:
        raise HTTPException(status_code=404, detail="Aircraft not found")
    return aircraft

@router.post("/", response_model=AircraftResponse)
def create_aircraft(aircraft: AircraftCreate, db: Session = Depends(get_db)):
    new_aircraft = Aircraft(**aircraft.dict())
    db.add(new_aircraft)
    db.commit()
    db.refresh(new_aircraft)
    return new_aircraft

@router.delete("/{aircraft_id}")
def delete_aircraft(aircraft_id: int, db: Session = Depends(get_db)):
    aircraft = db.query(Aircraft).filter(Aircraft.aircraft_id == aircraft_id).first()
    if not aircraft:
        raise HTTPException(status_code=404, detail="Aircraft not found")
    db.delete(aircraft)
    db.commit()
    return {"detail": "Aircraft deleted successfully"}

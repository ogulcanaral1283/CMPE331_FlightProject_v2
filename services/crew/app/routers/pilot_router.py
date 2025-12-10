from fastapi import APIRouter, Depends, HTTPException
from typing import Optional
from sqlalchemy.orm import Session
from app.dependencies.db_dependency import get_db
from app.schemas.pilot_schema import PilotCreate, PilotResponse
from app.services import pilot_service

router = APIRouter(prefix="/pilots", tags=["Pilots"])

@router.get("/", response_model=list[PilotResponse])
def get_all_pilots(db: Session = Depends(get_db)):
    return pilot_service.get_all_pilots(db)

@router.get("/airline/{airline_id}", response_model=list[PilotResponse])
def get_pilots_by_airline(airline_id: int, db: Session = Depends(get_db)):
    return pilot_service.get_pilots_by_airline(db, airline_id)

@router.get("/{pilot_id}", response_model=PilotResponse)
def get_pilot(pilot_id: int, db: Session = Depends(get_db)):
    pilot = pilot_service.get_pilot(pilot_id, db)
    if not pilot:
        raise HTTPException(status_code=404, detail="Pilot not found")
    return pilot

@router.post("/", response_model=PilotResponse)
def create_pilot(pilot: PilotCreate, db: Session = Depends(get_db)):
    return pilot_service.create_pilot(pilot, db)

@router.put("/{pilot_id}", response_model=PilotResponse)
def update_pilot(pilot_id: int, pilot_data: PilotCreate, db: Session = Depends(get_db)):
    pilot = pilot_service.update_pilot(pilot_id, pilot_data, db)
    if not pilot:
        raise HTTPException(status_code=404, detail="Pilot not found")
    return pilot

@router.delete("/{pilot_id}")
def delete_pilot(pilot_id: int, db: Session = Depends(get_db)):
    result = pilots_service.delete_pilot(pilot_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Pilot not found")
    return {"detail": "Pilot deleted successfully"}

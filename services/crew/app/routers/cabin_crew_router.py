from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies.db_dependency import get_db
from app.schemas.cabin_crew_schema import CabinCrewCreate, CabinCrewResponse
from app.services import cabin_crew_service

router = APIRouter(prefix="/cabin-crews", tags=["Cabin Crews"])

@router.get("/", response_model=list[CabinCrewResponse])
def get_all_cabin_crews(db: Session = Depends(get_db)):
    return cabin_crew_service.get_all_cabin_crews(db)

@router.get("/{attendant_id}", response_model=CabinCrewResponse)
def get_cabin_crew(attendant_id: int, db: Session = Depends(get_db)):
    crew = cabin_crew_service.get_cabin_crew(attendant_id, db)
    if not crew:
        raise HTTPException(status_code=404, detail="Crew member not found")
    return crew

@router.post("/", response_model=CabinCrewResponse)
def create_cabin_crew(crew: CabinCrewCreate, db: Session = Depends(get_db)):
    return cabin_crew_service.create_cabin_crew(crew, db)

@router.put("/{attendant_id}", response_model=CabinCrewResponse)
def update_cabin_crew(attendant_id: int, crew_data: CabinCrewCreate, db: Session = Depends(get_db)):
    crew = cabin_crew_service.update_cabin_crew(attendant_id, crew_data, db)
    if not crew:
        raise HTTPException(status_code=404, detail="Crew member not found")
    return crew

@router.delete("/{attendant_id}")
def delete_cabin_crew(attendant_id: int, db: Session = Depends(get_db)):
    result = cabin_service.delete_cabin_crew(attendant_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Crew member not found")
    return {"detail": "Crew member deleted successfully"}

from sqlalchemy.orm import Session
from app.models.cabin_crews import CabinCrew
from app.schemas.cabin_schemas import CabinCrewCreate

def get_all_cabin_crews(db: Session):
    return db.query(CabinCrew).all()

def get_cabin_crew(attendant_id: int, db: Session):
    return db.query(CabinCrew).filter(CabinCrew.attendant_id == attendant_id).first()

def create_cabin_crew(cabin_data: CabinCrewCreate, db: Session):
    new_crew = CabinCrew(**cabin_data.dict())
    db.add(new_crew)
    db.commit()
    db.refresh(new_crew)
    return new_crew

def update_cabin_crew(attendant_id: int, cabin_data: CabinCrewCreate, db: Session):
    crew = get_cabin_crew(attendant_id, db)
    if not crew:
        return None
    for key, value in cabin_data.dict().items():
        setattr(crew, key, value)
    db.commit()
    db.refresh(crew)
    return crew

def delete_cabin_crew(attendant_id: int, db: Session):
    crew = get_cabin_crew(attendant_id, db)
    if not crew:
        return None
    db.delete(crew)
    db.commit()
    return True
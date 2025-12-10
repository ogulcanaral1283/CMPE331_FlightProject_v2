from sqlalchemy.orm import Session
from app.models.pilot_model import Pilot, PilotDetail
from app.schemas.pilot_schema import PilotCreate

def get_all_pilots(db: Session):
    return db.query(Pilot).all()

def get_pilots_by_airline(db: Session, airline_id: int):
    # Query User's View directly using airline_id
    # Distinct pilot_id because view has one row per assignment
    return db.query(PilotDetail).filter(PilotDetail.airline_id == airline_id).distinct(PilotDetail.pilot_id).all()

def get_pilot(pilot_id: int, db: Session):
    return db.query(Pilot).filter(Pilot.pilot_id == pilot_id).first()

def create_pilot(pilot_data: PilotCreate, db: Session):
    pilot = Pilot(**pilot_data.dict())
    db.add(pilot)
    db.commit()
    db.refresh(pilot)
    return pilot

def update_pilot(pilot_id: int, pilot_data: PilotCreate, db: Session):
    pilot = get_pilot(pilot_id, db)
    if not pilot:
        return None
    for key, value in pilot_data.dict().items():
        setattr(pilot, key, value)
    db.commit()
    db.refresh(pilot)
    return pilot

def delete_pilot(pilot_id: int, db: Session):
    pilot = get_pilot(pilot_id, db)
    if not pilot:
        return None
    db.delete(pilot)
    db.commit()
    return True

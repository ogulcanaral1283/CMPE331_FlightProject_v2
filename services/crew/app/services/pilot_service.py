from sqlalchemy.orm import Session
from app.models.pilot_model import Pilot
from app.schemas.pilot_schema import PilotCreate

def get_pilots(db: Session):
    return db.query(Pilot).all()

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

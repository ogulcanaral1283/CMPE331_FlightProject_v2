from sqlalchemy.orm import Session
from app.models.passenger_model import Passenger
from app.schemas.passenger_schema import PassengerCreate

def get_all_passengers(db: Session):
    return db.query(Passenger).all()

def get_passenger(passenger_id: int, db: Session):
    return db.query(Passenger).filter(Passenger.passenger_id == passenger_id).first()

def create_passenger(passenger_data: PassengerCreate, db: Session):
    new_passenger = Passenger(**passenger_data.dict())
    db.add(new_passenger)
    db.commit()
    db.refresh(new_passenger)
    return new_passenger

def update_passenger(passenger_id: int, passenger_data: PassengerCreate, db: Session):
    passenger = get_passenger(passenger_id, db)
    if not passenger:
        return None
    for key, value in passenger_data.dict().items():
        setattr(passenger, key, value)
    db.commit()
    db.refresh(passenger)
    return passenger



def delete_passenger(passenger_id: int, db: Session):
    passenger = get_passenger(passenger_id, db)
    if not passenger:
        return None
    db.delete(passenger)
    db.commit()
    return True

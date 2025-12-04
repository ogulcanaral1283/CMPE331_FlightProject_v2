from sqlalchemy.orm import Session
from app.models.flights import Flight
from app.schemas.flight_schemas import FlightCreate
from app.models.passengers import Passenger
from app.models.aircrafts import Aircraft
from fastapi import HTTPException

def get_all_flights(db: Session):
    return db.query(Flight).all()

def get_flight_by_id(flight_id: int, db: Session):
    return db.query(Flight).filter(Flight.flight_id == flight_id).first()

def get_flight_by_number(flight_number: str, db: Session):
    flight = db.query(Flight).filter(Flight.flight_number == flight_number).first()
    return flight

def get_passengers_by_flight_number(flight_number: str, db: Session):
    passengers = (
        db.query(Passenger)
        .filter(Passenger.flight_number == flight_number)
        .all()
    )
    return passengers  


def get_flight_details_service(flight_number: str, db: Session):
    result = (
        db.query(
            Flight.flight_number,
            Flight.origin_airport,
            Flight.destination_airport,
            Flight.departure_time,
            Flight.arrival_time,
            Aircraft.model.label("aircraft_model"),
            Aircraft.capacity.label("capacity")
        )
        .join(Aircraft, Flight.aircraft_id == Aircraft.aircraft_id)
        .filter(Flight.flight_number == flight_number)
        .first()
    )

    if not result:
        raise HTTPException(status_code=404, detail="Flight not found")

    fuselage_type = "Wide-Body" if result.capacity >= 220 else "Narrow-Body"

    return {
        "flight_number": result.flight_number,
        "origin_airport": result.origin_airport,
        "destination_airport": result.destination_airport,
        "departure_time": result.departure_time,
        "arrival_time": result.arrival_time,
        "aircraft_model": result.aircraft_model,
        "capacity": result.capacity,
        "fuselage_type": fuselage_type,
    }

def create_flight(flight_data: FlightCreate, db: Session):
    new_flight = Flight(**flight_data.dict())
    db.add(new_flight)
    db.commit()
    db.refresh(new_flight)
    return new_flight

def update_flight(flight_id: int, flight_data: FlightCreate, db: Session):
    flight = get_flight_by_id(flight_id, db)
    if not flight:
        return None
    for key, value in flight_data.dict().items():
        setattr(flight, key, value)
    db.commit()
    db.refresh(flight)
    return flight

def delete_flight(flight_number: str, db: Session):
    flight = get_flight_by_number(flight_number, db)
    if not flight:
        return None
    db.delete(flight)
    db.commit()
    return True
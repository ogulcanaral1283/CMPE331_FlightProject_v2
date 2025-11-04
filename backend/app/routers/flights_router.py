from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.flight_schemas import FlightCreate, FlightResponse
from app.services import flights_service
from app.schemas.passenger_schemas import PassengerResponse 
from app.services.flights_service import get_flight_details_service
from app.models.flights import Flight
from app.models.flight_pilot import FlightPilot
from app.models.flight_crews import FlightCrew
from app.schemas.flight_schemas import FlightDetailsSchema


router = APIRouter(prefix="/flights", tags=["Flights"])

@router.get("/", response_model=list[FlightResponse])
def get_all_flights(db: Session = Depends(get_db)):
    return flights_service.get_all_flights(db)

@router.get("/id/{flight_id}", response_model=FlightResponse)
def get_flight(flight_id: int, db: Session = Depends(get_db)):
    flight = flights_service.get_flight_by_id(flight_id, db)
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return flight

@router.get("/{flight_number}")
def get_flight(flight_number: str, db: Session = Depends(get_db)):
    flight = flights_service.get_flight_by_number(flight_number, db)
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return flight

@router.get("/detail/{flight_number}")
def get_flight_details(flight_number: str, db: Session = Depends(get_db)):
    return get_flight_details_service(flight_number, db)

@router.get("/{flight_number}/passengers", response_model=list[PassengerResponse])
def get_passengers_by_flight_number(flight_number: str, db: Session = Depends(get_db)):
    passengers = flights_service.get_passengers_by_flight_number(flight_number, db)
    if passengers is None:
        raise HTTPException(status_code=404, detail="No Passengers not found")
    return passengers

@router.post("/", response_model=FlightResponse)
def create_flight(flight: FlightCreate, db: Session = Depends(get_db)):
    return flights_service.create_flight(flight, db)

@router.put("/{flight_id}", response_model=FlightResponse)
def update_flight(flight_id: int, flight_data: FlightCreate, db: Session = Depends(get_db)):
    flight = flights_service.update_flight(flight_id, flight_data, db)
    if not flight:
        raise HTTPException(status_code=404, detail="Flight not found")
    return flight

@router.delete("/{flight_id}")
def delete_flight(flight_id: int, db: Session = Depends(get_db)):
    result = flights_service.delete_flight(flight_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Flight not found")
    return {"detail": "Flight deleted successfully"}

@router.get("/{flight_id}/details", response_model=FlightDetailsSchema)
def get_flight_details(flight_id: int, db: Session = Depends(get_db)):
    # 1️⃣ Flight
    flight = db.query(Flight).filter(Flight.flight_id == flight_id).first()
    if not flight:
        return {"error": "Flight not found"}

    # 2️⃣ Pilots
    pilots = (
        db.query(FlightPilot)
        .filter(FlightPilot.flight_id == flight_id)
        .all()
    )
    pilot_list = [fp.pilot for fp in pilots]

    # 3️⃣ Cabin Crew
    crews = (
        db.query(FlightCrew)
        .filter(FlightCrew.flight_id == flight_id)
        .all()
    )
    crew_list = [fc.cabin_crews for fc in crews]


    return {
        "flight_number": flight.flight_number,
        "origin_airport": flight.origin_airport,
        "destination_airport": flight.destination_airport,
        "departure_time": flight.departure_time,
        "arrival_time": flight.arrival_time,
        "pilots": pilot_list,
        "crew": crew_list,
    }
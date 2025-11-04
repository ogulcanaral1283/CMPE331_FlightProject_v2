from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.schemas.passenger_schemas import PassengerCreate, PassengerResponse
from app.services import passenger_service
from app.models.passengers import Passenger
from datetime import datetime
from fastapi import status

router = APIRouter(prefix="/passengers", tags=["Passengers"])

@router.get("/", response_model=list[PassengerResponse])
def get_all_passengers(db: Session = Depends(get_db)):
    return passenger_service.get_all_passengers(db)

@router.get("/{passenger_id}", response_model=PassengerResponse)
def get_passenger(passenger_id: int, db: Session = Depends(get_db)):
    passenger = passenger_service.get_passenger(passenger_id, db)
    if not passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")
    return passenger

@router.get("/by-flight/{flight_number}")
def get_passengers_by_flight(flight_number: str, db: Session = Depends(get_db)):
    passengers = db.query(Passenger).filter(Passenger.flight_number == flight_number).all()
    return passengers

@router.put("/{passenger_id}", response_model=PassengerResponse)
def update_passenger(passenger_id: int, passenger_data: PassengerCreate, db: Session = Depends(get_db)):
    passenger = passenger_service.update_passenger(passenger_id, passenger_data, db)
    if not passenger:
        raise HTTPException(status_code=404, detail="Passenger not found")
    return passenger

@router.post("/", response_model=PassengerResponse, status_code=status.HTTP_201_CREATED)
def create_passenger(passenger: PassengerCreate, db: Session = Depends(get_db)):
    # Aynı uçuşta aynı koltuk daha önce seçilmiş mi kontrol et
    existing = db.query(Passenger).filter(
        Passenger.flight_number == passenger.flight_number,
        Passenger.seat_number == passenger.seat_number
    ).first()

    if existing:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail=f"Koltuk {passenger.seat_number} zaten rezerve edilmiş."
        )

    new_passenger = Passenger(
        flight_number=passenger.flight_number,
        full_name=passenger.full_name,
        age=passenger.age,
        gender=passenger.gender,
        nationality=passenger.nationality,
        seat_type=passenger.seat_type,
        seat_number=passenger.seat_number,
        parent_id=passenger.parent_id,
        affiliated_passenger_ids=passenger.affiliated_passenger_ids,
        created_at=datetime.now(),
    )

    db.add(new_passenger)
    db.commit() 
    db.refresh(new_passenger)
    return new_passenger        

@router.delete("/{passenger_id}")
def delete_passenger(passenger_id: int, db: Session = Depends(get_db)):
    result = passenger_service.delete_passenger(passenger_id, db)
    if not result:
        raise HTTPException(status_code=404, detail="Passenger not found")
    return {"detail": "Passenger deleted successfully"}

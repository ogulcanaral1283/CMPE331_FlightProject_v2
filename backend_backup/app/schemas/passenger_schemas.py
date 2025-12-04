from pydantic import BaseModel
from datetime import datetime

class PassengerBase(BaseModel):
    flight_number: str
    full_name: str
    age: int
    gender: str
    nationality: str | None = None
    seat_type: str | None = None
    seat_number: str | None = None
    parent_id: int | None = None
    affiliated_passenger_ids: list[int] | None = None

class PassengerCreate(PassengerBase):
    pass

class PassengerResponse(PassengerBase):
    passenger_id: int
    created_at: datetime

    class Config:
        from_attributes = True
from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class PassengerBase(BaseModel):
    flight_number: str
    full_name: str
    age: int
    gender: str
    nationality: Optional[str] = None
    seat_type: Optional[str] = None
    seat_number: Optional[str] = None
    parent_id: Optional[int] = None
    affiliated_passenger_ids: Optional[List[int]] = None

class PassengerCreate(PassengerBase):
    pass

class PassengerResponse(PassengerBase):
    passenger_id: int
    created_at: datetime

    class Config:
        from_attributes = True

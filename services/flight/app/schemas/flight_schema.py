from pydantic import BaseModel
from datetime import datetime
from typing import List, Optional
from app.schemas.pilot_schema import PilotBase
from app.schemas.cabin_crew_schema import CabinCrewBase



class FlightBase(BaseModel):
    airline_id: int
    flight_number: str
    origin_airport: str
    destination_airport: str
    departure_time: datetime
    arrival_time: datetime
    aircraft_id: int
    status: str
    distance_km: Optional[float] = None


class FlightDetailsSchema(BaseModel):
    flight_number: str
    origin_airport: str
    destination_airport: str
    departure_time: datetime
    arrival_time: datetime
    pilots: List[PilotBase]
    crew: List[CabinCrewBase]

    class Config:
        from_attributes = True

class FlightCreate(FlightBase):
    pass

class FlightResponse(FlightBase):
    flight_id: int

    class Config:
        from_attributes = True

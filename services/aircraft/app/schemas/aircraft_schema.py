from pydantic import BaseModel
from typing import Optional

class AircraftBase(BaseModel):
    airline_id: int
    model: str
    capacity: int
    range_km: Optional[int] = None

class AircraftCreate(AircraftBase):
    pass

class AircraftResponse(AircraftBase):
    aircraft_id: int

    class Config:
        from_attributes = True

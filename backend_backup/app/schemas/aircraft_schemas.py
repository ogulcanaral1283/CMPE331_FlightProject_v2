from pydantic import BaseModel

class AircraftBase(BaseModel):
    airline_id: int
    model: str
    capacity: int
    range_km: int | None = None

class AircraftCreate(AircraftBase):
    pass

class AircraftResponse(AircraftBase):
    aircraft_id: int

    class Config:
        from_attributes = True
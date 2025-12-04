from pydantic import BaseModel

class AirportDistanceBase(BaseModel):
    origin_airport: str
    destination_airport: str
    distance_km: int

class AirportDistanceCreate(AirportDistanceBase):
    pass

class AirportDistanceResponse(AirportDistanceBase):
    id: int

    class Config:
        from_attributes = True

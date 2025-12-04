from pydantic import BaseModel


class FlightCrewBase(BaseModel):
    flight_id: int
    attendant_id: int
   

class FlightCrewCreate(FlightCrewBase):
    pass

class FlightCrewResponse(FlightCrewBase):
    id: int

    class Config:
        from_attributes = True

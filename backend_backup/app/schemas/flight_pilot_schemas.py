from pydantic import BaseModel

class FlightPilotBase(BaseModel):
    flight_id: int
    pilot_id: int

class FlightPilotCreate(FlightPilotBase):
    pass

class FlightPilotResponse(FlightPilotBase):
    id: int

    class Config:
        from_attributes = True
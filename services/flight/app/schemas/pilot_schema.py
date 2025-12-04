from pydantic import BaseModel
from typing import Optional, List

class PilotBase(BaseModel):
    full_name: str
    age: int
    gender: str
    nationality: Optional[str] = None
    license_level: str  # Captain, First Officer, Relief Pilot
    flight_hours: int
    known_aircrafts: Optional[List[str]] = None

class PilotCreate(PilotBase):
    pass

class PilotResponse(PilotBase):
    pilot_id: int

    class Config:
        from_attributes = True

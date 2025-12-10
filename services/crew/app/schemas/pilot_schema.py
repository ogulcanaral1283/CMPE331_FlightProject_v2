from pydantic import BaseModel
from typing import Optional, List

class PilotBase(BaseModel):
    full_name: Optional[str] = None
    age: Optional[int] = None
    gender: Optional[str] = None
    nationality: Optional[str] = None
    license_level: Optional[str] = None
    flight_hours: Optional[int] = None
    known_aircrafts: Optional[List[str]] = None


class PilotCreate(PilotBase):
    pass

class PilotResponse(PilotBase):
    pilot_id: int

    class Config:
        from_attributes = True

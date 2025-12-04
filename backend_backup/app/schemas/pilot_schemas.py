from pydantic import BaseModel

class PilotBase(BaseModel):
    full_name: str
    age: int
    gender: str
    nationality: str | None = None
    license_level: str  # Captain, First Officer, Relief Pilot
    flight_hours: int
    known_aircrafts: list[str] | None = None

class PilotCreate(PilotBase):
    pass

class PilotResponse(PilotBase):
    pilot_id: int

    class Config:
        from_attributes = True
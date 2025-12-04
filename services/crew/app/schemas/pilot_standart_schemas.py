from pydantic import BaseModel

class PilotStandardBase(BaseModel):
    aircraft_model: str
    captains: int
    first_officers: int
    relief_pilots: int

class PilotStandardCreate(PilotStandardBase):
    pass

class PilotStandardResponse(PilotStandardBase):
    id: int

    class Config:
        from_attributes = True

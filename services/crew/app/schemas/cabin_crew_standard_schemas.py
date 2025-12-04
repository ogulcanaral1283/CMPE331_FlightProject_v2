from pydantic import BaseModel

class CabinCrewStandardBase(BaseModel):
    aircraft_model: str
    chiefs: int
    regulars: int
    chefs: int

class CabinCrewStandardCreate(CabinCrewStandardBase):
    pass

class CabinCrewStandardResponse(CabinCrewStandardBase):
    id: int

    class Config:
        from_attributes = True

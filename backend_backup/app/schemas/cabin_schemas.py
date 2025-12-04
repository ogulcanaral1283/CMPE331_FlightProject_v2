from pydantic import BaseModel

class CabinCrewBase(BaseModel):
    full_name: str
    age: int
    gender: str
    nationality: str | None = None
    known_languages: list[str] | None = None
    attendant_type: str  # chief, regular, chef
    vehicle_restrictions: list[str] | None = None

class CabinCrewCreate(CabinCrewBase):
    """POST istekleri için kullanılacak schema"""
    pass

class CabinCrewResponse(CabinCrewBase):
    """GET/PUT yanıtları için"""
    attendant_id: int

    class Config:
        from_attributes = True
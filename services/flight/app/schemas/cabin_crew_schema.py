from pydantic import BaseModel
from typing import Optional, List

class CabinCrewBase(BaseModel):
    full_name: str
    age: int
    gender: str
    nationality: Optional[str] = None
    known_languages: Optional[List[str]] = None
    attendant_type: str  # chief, regular, chef
    vehicle_restrictions: Optional[List[str]] = None

class CabinCrewCreate(CabinCrewBase):
    """POST istekleri için kullanılacak schema"""
    pass

class CabinCrewResponse(CabinCrewBase):
    """GET/PUT yanıtları için"""
    attendant_id: int

    class Config:
        from_attributes = True

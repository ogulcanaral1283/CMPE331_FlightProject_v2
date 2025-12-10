from pydantic import BaseModel, Field
from typing import Optional


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str
    airline_id: Optional[int] = None


class UserResponse(UserBase):
    id: int
    role: Optional[str]
    airline_id: Optional[int]

    class Config:

        from_attributes = True


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None

from pydantic import BaseModel, Field
from typing import Optional


class UserBase(BaseModel):
    username: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: int
    role: Optional[str]

    class Config:

        from_attributes = True


class TokenData(BaseModel):
    username: Optional[str] = None
    role: Optional[str] = None

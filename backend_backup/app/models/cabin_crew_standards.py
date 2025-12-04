from sqlalchemy import Column, Integer, String
from app.database import Base

class CabinCrewStandard(Base):
    __tablename__ = "cabin_crew_standards"

    id = Column(Integer, primary_key=True)
    aircraft_model = Column(String, unique=True)
    chiefs = Column(Integer)
    regulars = Column(Integer)
    chefs = Column(Integer)
from sqlalchemy import Column, Integer, String
from app.database import Base

class PilotStandard(Base):
    __tablename__ = "pilot_standards"

    id = Column(Integer, primary_key=True)
    aircraft_model = Column(String, unique=True)
    captains = Column(Integer)
    first_officers = Column(Integer)
    relief_pilots = Column(Integer)

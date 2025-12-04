from sqlalchemy import Column, Integer, String, ARRAY
from app.database import Base

class Pilot(Base):
    __tablename__ = "pilots"

    pilot_id = Column(Integer, primary_key=True)
    full_name = Column(String, nullable=False)
    age = Column(Integer)
    gender = Column(String)
    nationality = Column(String)
    license_level = Column(String)  # Captain, First Officer, Relief Pilot
    flight_hours = Column(Integer)
    known_aircrafts = Column(ARRAY(String))  # Uçabileceği modeller
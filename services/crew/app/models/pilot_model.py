from sqlalchemy import Column, Integer, String, ARRAY, ForeignKey
from sqlalchemy.orm import relationship
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

class PilotDetail(Base):
    __tablename__ = "flight_pilot_details"
    
    assignment_id = Column(Integer, primary_key=True)
    flight_id = Column(Integer)
    flight_number = Column(String)
    airline_id = Column(Integer)
    pilot_id = Column(Integer)
    full_name = Column("pilot_name", String)
    age = Column(Integer)
    gender = Column(String)
    nationality = Column(String)
    flight_hours = Column(Integer)
    known_aircrafts = Column(ARRAY(String))
    license_level = Column(String)

from sqlalchemy import Column, Integer, ForeignKey, String
from app.database import Base
from sqlalchemy.orm import relationship

class FlightCrew(Base):
    __tablename__ = "flight_crews"

    flight_id = Column(Integer, ForeignKey("flights.flight_id"), primary_key=True)
    attendant_id = Column(Integer, ForeignKey("cabin_crews.attendant_id"), primary_key=True)
    role = Column(String)

    flight = relationship("Flight", back_populates="flight_crews")
    cabin_crews = relationship("CabinCrew", back_populates="flight_crews")
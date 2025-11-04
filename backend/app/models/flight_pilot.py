from sqlalchemy import Column, Integer, ForeignKey, String
from app.database import Base
from sqlalchemy.orm import relationship

class FlightPilot(Base):
    __tablename__ = "flight_pilot"

    id = Column(Integer, primary_key=True)
    flight_id = Column(Integer, ForeignKey("flights.flight_id"))
    pilot_id = Column(Integer, ForeignKey("pilots.pilot_id"))
    role = Column(String)


    flight = relationship("Flight", back_populates="flight_pilots")
    pilot = relationship("Pilot")
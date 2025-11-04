from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from app.database import Base
from sqlalchemy.orm import relationship

class Flight(Base):
    __tablename__ = "flights"

    flight_id = Column(Integer, primary_key=True)
    airline_id = Column(Integer, ForeignKey("airlines.airline_id"))
    flight_number = Column(String,  unique=True, nullable=False)
    origin_airport = Column(String)
    destination_airport = Column(String)
    departure_time = Column(DateTime)
    arrival_time = Column(DateTime)
    aircraft_id = Column(Integer, ForeignKey("aircrafts.aircraft_id"))
    status = Column(String)
    distance_km = Column(Integer)

    flight_crews = relationship("FlightCrew", back_populates="flight")
    flight_pilots = relationship("FlightPilot", back_populates="flight")
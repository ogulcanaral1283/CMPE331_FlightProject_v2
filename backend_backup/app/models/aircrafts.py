from sqlalchemy import Column, Integer, String, ForeignKey
from app.database import Base

class Aircraft(Base):
    __tablename__ = "aircrafts"

    aircraft_id = Column(Integer, primary_key=True, index=True)
    airline_id = Column(Integer, ForeignKey("airlines.airline_id"))
    model = Column(String, nullable=False)
    capacity = Column(Integer, nullable=False)
    range_km = Column(Integer)
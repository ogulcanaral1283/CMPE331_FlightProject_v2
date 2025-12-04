from sqlalchemy import Column, String, Integer
from app.database import Base

class AirportDistance(Base):
    __tablename__ = "airport_distances"

    id = Column(Integer, primary_key=True)
    origin_airport = Column(String, nullable=False)
    destination_airport = Column(String, nullable=False)
    distance_km = Column(Integer, nullable=False)
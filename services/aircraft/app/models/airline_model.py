from sqlalchemy import Column, Integer, String
from app.database import Base

class Airline(Base):
    __tablename__ = "airlines"

    airline_id = Column(Integer, primary_key=True, index=True)
    airline_name = Column(String, nullable=False)
    airline_iata = Column(String(3))
    airline_icao = Column(String(4))
    country = Column(String)

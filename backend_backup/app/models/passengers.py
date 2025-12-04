from sqlalchemy import Column, Integer, String, ForeignKey, ARRAY, CheckConstraint, DateTime
from app.database import Base

class Passenger(Base):
    __tablename__ = "passengers"

    passenger_id = Column(Integer, primary_key=True)
    flight_number = Column(String, ForeignKey("flights.flight_number", ondelete="CASCADE"))
    full_name = Column(String, nullable=False)
    age = Column(Integer)
    gender = Column(String)
    nationality = Column(String)
    seat_type = Column(String)
    seat_number = Column(String)
    parent_id = Column(Integer, ForeignKey("passengers.passenger_id"))
    affiliated_passenger_ids = Column(ARRAY(Integer))
    created_at = Column(DateTime)
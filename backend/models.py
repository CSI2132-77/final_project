from sqlalchemy import Column, Integer, String, Text
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class HotelChain(Base):
  __tablename__ = "Hotel_Chain"

  chain_id = Column(Integer, primary_key=True, index=True)
  name = Column(String(100), nullable=False)
  central_office_address = Column(Text, nullable=False)
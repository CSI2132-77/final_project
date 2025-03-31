import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
import database
from models import (AvailableRoomsPerArea, HotelRoomCapacity, RevenueByChain)
from schema import (CustomerCreate, CustomerResponse, EmployeeCreate, EmployeeResponse,
                    HotelCreate, HotelResponse, RoomCreate, RoomResponse)
from sqlalchemy.future import select

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

# Initialize the FastAPI router
router = APIRouter()

@router.get("/hotel-room-capacity")
async def get_hotel_room_capacity(db: Session = Depends(database.get_db)):
    result = db.execute(select(HotelRoomCapacity))
    return result.scalars().all()

@router.get("/available-rooms-per-area")
async def get_available_rooms_per_area(db: Session = Depends(database.get_db)):
    result = db.execute(select(AvailableRoomsPerArea))
    return result.scalars().all()

@router.get("/revenue-by-chain")
async def get_revenue_by_chain(db: Session = Depends(database.get_db)):
    result = db.execute(select(RevenueByChain))
    return result.scalars().all()

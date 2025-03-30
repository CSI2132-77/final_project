import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from models import (
    HotelChain,
    ChainContact,
    Hotel,
    HotelContact,
    Room,
    RoomAmenity,
    RoomProblem,
    Booking,
    Renting,
    Employee,
    Customer
)
import database
from schema import (
    RoomCreate,
    RoomUpdate,
    RoomResponse
)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

# Initialize the FastAPI router
router = APIRouter()

#* PATCH request to modify a room
#* curl -X PATCH "http://localhost:8000/room/update" -H "Content-Type: application/json" -d '{"room_id": 224, "price": 1.0}'
@router.patch("/room/update", tags=["update_room"], response_model=RoomResponse)
async def update_room(room: RoomUpdate, db: Session = Depends(database.get_db)):
    try:
        # Fetch the room to be updated
        existing_room = db.query(Room).filter(Room.room_id == room.room_id).first()
        if not existing_room:
            raise HTTPException(status_code=404, detail="Room not found")

        # Update the room attributes
        for key, value in room.model_dump(exclude_unset=True).items():
            setattr(existing_room, key, value)

        # Commit the changes to the database
        db.commit()
        db.refresh(existing_room)
        logging.info(f"Updated room with ID {existing_room.room_id}")
        return existing_room
    except Exception as e:
        logging.error(f"Error updating room: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
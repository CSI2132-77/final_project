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
#* curl -X DELETE "http://localhost:8000/room/delete" -H "Content-Type: application/json" -d '{"room_id": 224}'
@router.delete("/room/delete", tags=["delete_room"], response_model=RoomResponse)
async def delete_room(room: RoomUpdate, db: Session = Depends(database.get_db)):
    try:
        # Fetch the room to be deleted
        room_to_delete = db.query(Room).filter(Room.room_id == room.room_id).first()
        if not room_to_delete:
            raise HTTPException(status_code=404, detail="Room not found")

        # Delete the room from the database
        db.delete(room_to_delete)
        db.commit()
        logging.info(f"Deleted room with ID {room_to_delete.room_id}")
        return room_to_delete
    except Exception as e:
        logging.error(f"Error deleting room: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
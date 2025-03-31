import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
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
    RoomResponse
)
import json
# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

# Initialize the FastAPI router
router = APIRouter()
# db = Database()

#* Query to see all available rooms based on input
# the dates (start, end) of booking or renting, the room capacity, the area, the
# hotel chain, the category of the hotel,
# the total number of rooms in the hotel,
# the price of the rooms.
#* curl -X GET "http://localhost:8000/room/available?chain_id=1&hotel_id=1&start_date=2023-10-01&end_date=2023-10-05&capacity=suite&address=100%20Park%20Avenue%2C%20New%20York%2C%20NY&category=5&total_rooms=6&price=600.00"
#* curl -X GET "http://localhost:8000/room/available?chain_id=1&hotel_id=1&start_date=2023-10-01&end_date=2023-10-05&address=100%20Park%20Avenue%2C%20New%20York%2C%20NY&category=5&total_rooms=6&price=600.00"
#* curl -X GET "http://localhost:8000/room/available?chain_id=1"
#* curl -X GET "http://localhost:8000/room/available?hotel_id=99"
#* curl -X GET "http://localhost:8000/room/available?chain_id=1&hotel_id=1&start_date=2025-04-02&end_date=2025-04-05&capacity=suite&address=100%20Park%20Avenue%2C%20New%20York%2C%20NY&category=5&total_rooms=6&price=600.00"
@router.get("/room/available", tags=["rooms"])
async def get_available_rooms(
    chain_id: int = None,
    hotel_id: int = None,
    start_date: str = None,
    end_date: str = None,
    capacity: str = None,
    address: str = None,
    category: int = None,
    total_rooms: int = None,
    price: float = None,
    db: Session = Depends(database.get_db)
    ) -> list[dict[str, Any]]:
    """
    ### Retrieve available rooms based on various criteria such as hotel chain, hotel ID,
    booking dates, room capacity, address, category, total rooms in hotel, and price.

    **Args**:
    - `chain_id` (int, optional): The unique identifier of the hotel chain.
    - `hotel_id` (int, optional): The unique identifier of the hotel.
    - `start_date` (str, optional): The start date of the booking (in 'YYYY-MM-DD' format).
    - `end_date` (str, optional): The end date of the booking (in 'YYYY-MM-DD' format).
    - `capacity` (str, optional): The required capacity of the room.
    - `address` (str, optional): The address of the hotel.
    - `category` (int, optional): The category of the hotel.
    - `total_rooms` (int, optional): The minimum number of rooms in the hotel.
    - `price` (float, optional): The maximum price of the room.
    - `db` (Session): The database session dependency.

    **Returns**:
    - `List[Dict[str, Any]]`: A list of available rooms, with each room represented by a dictionary containing its details.

    **Raises**:
    - `HTTPException (404)`: If no rooms match the provided criteria.
    - `HTTPException (500)`: If an error occurs while querying the database.

    This endpoint retrieves rooms based on the provided query parameters. If any criteria are not provided, the function will return all rooms from the database. The final result contains only the rooms that match all of the criteria, ensuring availability based on the given filters (e.g., booking dates, price, room capacity, etc.).
    """
    try:
        # Filter rooms based on the provided criteria
        rooms_by_chain_id = []
        rooms_by_hotel_id = []
        rooms_by_empty = []
        rooms_by_capacity = []
        rooms_by_address = []
        rooms_by_category = []
        rooms_by_total_rooms = []
        rooms_by_price = []

        # Filter by hotel chain
        if chain_id:
            # Join rooms with hotels and filter by chain_id
            rooms_by_chain_id = db.query(Room).join(Hotel).filter(Hotel.chain_id == chain_id).all()
            if not rooms_by_chain_id:
                raise HTTPException(status_code=404, detail=f"No rooms found for the specified chain ID: {chain_id}")
        if hotel_id:
            # Filter rooms by hotel_id
            rooms_by_hotel_id = db.query(Room).filter(Room.hotel_id == hotel_id).all()
            if not rooms_by_hotel_id:
                raise HTTPException(status_code=404, detail=f"No rooms found for the specified hotel ID: {hotel_id}")
        if start_date and end_date:
            # Filter rooms by booking dates
            booked_rooms = db.query(Booking.room_id).filter(
                Booking.check_in_date <= end_date,
                Booking.check_out_date >= start_date
            ).all()
            booked_room_ids = [room[0] for room in booked_rooms]
            rooms_by_empty = db.query(Room).filter(Room.room_id.notin_(booked_room_ids)).all()
            if not rooms_by_empty:
                raise HTTPException(status_code=404, detail=f"No rooms available for the specified dates: {start_date} to {end_date}")
        if capacity:
            # Filter rooms by capacity
            rooms_by_capacity = db.query(Room).filter(Room.capacity == capacity).all()
            if not rooms_by_capacity:
                raise HTTPException(status_code=404, detail=f"No rooms found for the specified capacity: {capacity}")
        if address:
            # Filter rooms by address
            rooms_by_address = db.query(Room).join(Hotel).filter(Hotel.address == address).all()
            if not rooms_by_address:
                raise HTTPException(status_code=404, detail=f"No rooms found for the specified address: {address}")
        if category:
            # Filter rooms by category
            rooms_by_category = db.query(Room).join(Hotel).filter(Hotel.category == category).all()
            if not rooms_by_category:
                raise HTTPException(status_code=404, detail=f"No rooms found for the specified category: {category}")
        if total_rooms:
            # Filter rooms by total rooms in hotel
            total_rooms_query = (db.query(Hotel.hotel_id, func.count(Room.room_id).label("total_rooms"))
                .outerjoin(Room, Hotel.hotel_id == Room.hotel_id)
                .group_by(Hotel.hotel_id)
                .having(func.count(Room.room_id) >= total_rooms).all())
            for hotel in total_rooms_query:
                rooms_by_total_rooms = db.query(Room).filter(Room.hotel_id == hotel.hotel_id).all()
            if not rooms_by_total_rooms:
                raise HTTPException(status_code=404, detail=f"No rooms found for the specified total rooms: {total_rooms}")
        if price:
            # Filter rooms by price
            rooms_by_price = db.query(Room).filter(Room.price <= price).all()
            if not rooms_by_price:
                raise HTTPException(status_code=404, detail=f"No rooms found for the specified price: {price}")

        #* If there are any criteria not provided, set the corresponding list to the full list of rooms
        if not chain_id: rooms_by_chain_id = db.query(Room).all()
        if not hotel_id: rooms_by_hotel_id = db.query(Room).all()
        if not start_date and not end_date: rooms_by_empty = db.query(Room).all()
        if not capacity: rooms_by_capacity = db.query(Room).all()
        if not address: rooms_by_address = db.query(Room).all()
        if not category: rooms_by_category = db.query(Room).all()
        if not total_rooms: rooms_by_total_rooms = db.query(Room).all()
        if not price: rooms_by_price = db.query(Room).all()

        #* So now we have several non-empty lists of rooms based on different criteria
        #* We want to find the consistant room witht he same room_id across all the lists
        #* Find rooms that are present in all lists
        # Make a list where each element is a set of room_ids from each list
        # This will remove duplicates and allow us to find the intersection
        room_sets = [
            set(room.room_id for room in rooms_by_chain_id),
            set(room.room_id for room in rooms_by_hotel_id),
            set(room.room_id for room in rooms_by_empty),
            set(room.room_id for room in rooms_by_capacity),
            set(room.room_id for room in rooms_by_address),
            set(room.room_id for room in rooms_by_category),
            set(room.room_id for room in rooms_by_total_rooms),
            set(room.room_id for room in rooms_by_price)
        ]
        # Create a set of room IDs that are present in all lists
        common_room_ids = set.intersection(*room_sets)
        # Query the database to get the room details for the common room IDs
        available_rooms = db.query(Room).filter(Room.room_id.in_(common_room_ids)).all()
        # Convert SQLAlchemy objects to dictionaries for JSON response
        available_rooms = [
            {
                "room_id": room.room_id,
                "hotel_id": room.hotel_id,
                "price": str(room.price),
                "capacity": room.capacity,
                "view_type": room.view_type,
                "is_extendable": room.is_extendable
            } for room in available_rooms
        ]
        logging.info(f"Available rooms: {json.dumps(available_rooms, indent=2)}")
        logging.info(f"Fetched {len(available_rooms)} available rooms")
        return available_rooms
    except Exception as e:
        logging.error(f"Error fetching available rooms: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

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

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

# Initialize the FastAPI router
router = APIRouter()
# db = Database()

#* TEST URL: /hotel-chain/cid=1/contacts
@router.get("/hotel-chain/cid={chain_id}/contacts", tags=["hotel_chain_contacts"])
async def get_contacts_by_chain(chain_id: int, db: Session = Depends(database.get_db)):
    try:
        contacts = db.query(ChainContact).filter(ChainContact.chain_id == chain_id).all()
        logging.info(f"Fetched {len(contacts)} contacts for chain ID {chain_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        contacts = {
            contact.contact_type: contact.value
            for contact in contacts
        }
        return contacts
    except Exception as e:
        logging.error(f"Error fetching contacts for chain ID {chain_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /hotel-chain/cid=1/hotels
@router.get("/hotel-chain/cid={chain_id}/hotels", tags=["hotel_chain_hotels"])
async def get_hotels_by_chain(chain_id: int, db: Session = Depends(database.get_db)):
    try:
        hotels = db.query(Hotel).filter(Hotel.chain_id == chain_id).all()
        logging.info(f"Fetched {len(hotels)} hotels for chain ID {chain_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        hotels = {
            hotel.hotel_id: {
                "chain_id": hotel.chain_id,
                "address": hotel.address,
                "category": hotel.category
            }
            for hotel in hotels
        }
        return hotels
    except Exception as e:
        logging.error(f"Error fetching hotels for chain ID {chain_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /hotel-chain/cid=1/hid=1/contacts
@router.get("/hotel-chain/cid={chain_id}/hid={hotel_id}/contacts", tags=["hotel_contacts"])
async def get_contacts_by_hotel(hotel_id: int, db: Session = Depends(database.get_db)):
    try:
        contacts = db.query(HotelContact).filter(HotelContact.hotel_id == hotel_id).all()
        logging.info(f"Fetched {len(contacts)} contacts for hotel ID {hotel_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        contacts = {
            contact.contact_type: contact.value
            for contact in contacts
        }
        return contacts
    except Exception as e:
        logging.error(f"Error fetching contacts for hotel ID {hotel_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


#* TEST URL: /hotel-chain/cid=1/hid=1/rooms
@router.get("/hotel-chain/cid={chain_id}/hid={hotel_id}/rooms", tags=["hotel_rooms"])
async def get_rooms_by_hotel(hotel_id: int, db: Session = Depends(database.get_db)):
    try:
        rooms = db.query(Room).filter(Room.hotel_id == hotel_id).all()
        logging.info(f"Fetched {len(rooms)} rooms for hotel ID {hotel_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        rooms = {
            room.room_id: {
                "hotel_id": room.hotel_id,
                "price": str(room.price),
                "capacity": room.capacity,
                "view_type": room.view_type,
                "is_extendable": room.is_extendable
            }
            for room in rooms
        }
        return rooms
    except Exception as e:
        logging.error(f"Error fetching rooms for hotel ID {hotel_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


#* TEST URL: /hotel-chain/cid=1/hid=1/rooms/rid=1/amenity
@router.get("/hotel-chain/cid={chain_id}/hid={hotel_id}/rooms/rid={room_id}/amenity", tags=["hotel_room_ammenity"])
async def get_amenity_by_room(room_id: int, db: Session = Depends(database.get_db)):
    try:
        ammenities = db.query(RoomAmenity).filter(RoomAmenity.room_id == room_id).all()
        logging.info(f"Fetched {len(ammenities)} ammenities for room ID {room_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        list_of_ammenities = [amenity.amenity for amenity in ammenities]
        return list_of_ammenities
    except Exception as e:
        logging.error(f"Error fetching ammenities for room ID {room_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /hotel-chain/cid=1/hid=1/rooms/rid=3/problems
# This endpoint fetches problems for a specific room in a hotel
@router.get("/hotel-chain/cid={chain_id}/hid={hotel_id}/rooms/rid={room_id}/problems", tags=["hotel_room_problems"])
async def get_problems_by_room(hotel_id: int, room_id: int, db: Session = Depends(database.get_db)):
    try:
        problems = (
            db.query(RoomProblem)
            .join(Room, RoomProblem.room_id == Room.room_id)
            .filter(Room.hotel_id == hotel_id, RoomProblem.room_id == room_id)
            .all())
        logging.info(f"Fetched {len(problems)} problems for room ID {room_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        problems = [
            {
                "problem_description": problem.problem_description,
                "reported_date": problem.reported_date
            }
            for problem in problems
        ]
        return problems
    except Exception as e:
        logging.error(f"Error fetching problems for room ID {room_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /hotel-chain/cid=1/hid=1/rooms/rid=1/bookings
@router.get("/hotel-chain/cid={chain_id}/hid={hotel_id}/rooms/rid={room_id}/bookings", tags=["hotel_room_rentings"])
async def get_bookings_by_room(hotel_id: int, room_id: int, db: Session = Depends(database.get_db)):
    try:
        # Join Booking and Room tables to get bookings for a specific room in a hotel
        # Filter by hotel_id and room_id
        bookings = (
            db.query(Booking)
            .join(Room, Booking.room_id == Room.room_id)
            .filter(Room.hotel_id == hotel_id, Booking.room_id == room_id)
            .all()
        )
        logging.info(f"Fetched {len(bookings)} bookings for room ID {room_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        bookings = [
            {
                "booking_id": booking.booking_id,
                "customer_id": booking.customer_id,
                "room_id": booking.room_id,
                "check_in_date": booking.check_in_date,
                "check_out_date": booking.check_out_date,
                "status": booking.status
            }
            for booking in bookings
        ]
        return bookings
    except Exception as e:
        logging.error(f"Error fetching bookings for room ID {room_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /hotel-chain/cid=1/hid=1/rooms/rid=1/rentings
@router.get("/hotel-chain/cid={chain_id}/hid={hotel_id}/rooms/rid={room_id}/rentings", tags=["hotel_room_rentings"])
async def get_rentings_by_room(room_id: int, db: Session = Depends(database.get_db)):
    try:
        rentings = db.query(Renting).filter(Renting.room_id == room_id).all()
        logging.info(f"Fetched {len(rentings)} rentings for room ID {room_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        rentings = {
            renting.renting_id: {
                "customer_id": renting.customer_id,
                "start_date": renting.start_date,
                "end_date": renting.end_date
            }
            for renting in rentings
        }
        return rentings
    except Exception as e:
        logging.error(f"Error fetching rentings for room ID {room_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /hotel-chain/cid=1/hid=1/employee
@router.get("/hotel-chain/cid={chain_id}/hid={hotel_id}/employee", tags=["hotel_employees"])
async def get_employees_by_hotel(hotel_id: int, db: Session = Depends(database.get_db)):
    try:
        employees = db.query(Employee).filter(Employee.hotel_id == hotel_id).all()
        logging.info(f"Fetched {len(employees)} employees for hotel ID {hotel_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        employees = {
            employee.employee_id: {
                "full_name": employee.full_name,
                "address": employee.address,
                "ssn_sin": employee.ssn_sin,
                "role": employee.role
            }
            for employee in employees
        }
        return employees
    except Exception as e:
        logging.error(f"Error fetching employees for hotel ID {hotel_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /customers/cusid=1
@router.get("/customers/cusid={customer_id}", tags=["customers"])
async def get_customers_by_id(customer_id: int, db: Session = Depends(database.get_db)):
    try:
        customers = db.query(Customer).filter(Customer.customer_id == customer_id).all()
        logging.info(f"Fetched {len(customers)} customers for customer ID {customer_id}")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        customers = {
            customer.customer_id: {
            "full_name": customer.full_name,
            "address": customer.address,
            "id_type": customer.id_type,
            "id_number": customer.id_number,
            "registration_date": customer.registration_date
            }
            for customer in customers
        }
        return customers
    except Exception as e:
        logging.error(f"Error fetching customers for customer ID {customer_id}: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")
import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database
from models import (HotelChain, ChainContact, Hotel, HotelContact,
                    Room, RoomAmenity, RoomProblem, Booking, Renting, Employee, Customer)
from schema import (CustomerCreate, CustomerResponse, EmployeeCreate, EmployeeResponse,
                    HotelCreate, HotelResponse, RoomCreate, RoomResponse)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

# Initialize the FastAPI router
router = APIRouter()
# db = Database()

#* TEST URL: /hotel-chain
# This endpoint fetches all hotel chains from the database.
@router.get("/hotel-chain", tags=["hotel_chain"])
async def get_hotel_chains(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        hotel_chains = db.query(HotelChain).all()
        logging.info(f"Fetched {len(hotel_chains)} hotel chains")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        hotel_chains = [
            {
                "chain_id": chain.chain_id,
                "name": chain.name,
                "central_office_address": chain.central_office_address,
                "hotel_count": chain.hotel_count,
            }
        for chain in hotel_chains ]
        return hotel_chains
    except Exception as e:
        logging.error(f"Error fetching hotel chains: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /chain-contact
# This endpoint fetches all hotel chain contacts from the database.
@router.get("/chain-contact", tags=["chain_contact"])
async def get_hotel_chain_contacts(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        hotel_chain_contacts = db.query(ChainContact).all()
        logging.info(f"Fetched {len(hotel_chain_contacts)} contacts")
        # Convert SQLAlchemy object to dictionary for JSON response
        hotel_chain_contacts = [
            {
                "chain_id": contact.chain_id,
                "contact_type": contact.contact_type,
                "value": contact.value
            }
            for contact in hotel_chain_contacts
        ]
        return hotel_chain_contacts
    except Exception as e:
        logging.error(f"Error fetching hotel_chain_contacts: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /hotel
# This endpoint fetches all hotels from the database.
@router.get("/hotel", tags=["hotel"])
async def get_hotels(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        hotels = db.query(Hotel).all()
        logging.info(f"Fetched {len(hotels)} hotels")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        hotels = [
            {
                "hotel_id": hotel.hotel_id,
                "chain_id": hotel.chain_id,
                "address": hotel.address,
                "room_count": hotel.room_count,
                "category": hotel.category
            }
            for hotel in hotels
        ]
        return hotels
    except Exception as e:
        logging.error(f"Error fetching hotels: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /hotel-contact
# This endpoint fetches all hotel contacts from the database.
@router.get("/hotel-contact", tags=["hotel_contact"])
async def get_hotel_contacts(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        hotel_contacts = db.query(HotelContact).all()
        logging.info(f"Fetched {len(hotel_contacts)} contacts")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        hotel_contacts = [
            {
                "hotel_id": contact.hotel_id,
                "contact_type": contact.contact_type,
                "value": contact.value
            }
            for contact in hotel_contacts
        ]
        return hotel_contacts
    except Exception as e:
        logging.error(f"Error fetching hotel contacts: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /room
# This endpoint fetches all rooms from the database.
@router.get("/room", tags=["room"])
async def get_rooms(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        rooms = db.query(Room).all()
        logging.info(f"Fetched {len(rooms)} rooms")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        rooms = [
            {
                "room_id": room.room_id,
                "hotel_id": room.hotel_id,
                "price": str(room.price),
                "capacity": room.capacity,
                "view_type": room.view_type,
                "is_extendable": room.is_extendable
            }
            for room in rooms
        ]
        return rooms
    except Exception as e:
        logging.error(f"Error fetching rooms: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /room-amenity
# This endpoint fetches all room amenities from the database.
@router.get("/room-amenity", tags=["room_ammenity"])
async def get_room_amenities(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        room_amenities = db.query(RoomAmenity).all()
        logging.info(f"Fetched {len(room_amenities)} room amenities")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        room_amenities = [
            {
                "room_id": amenity.room_id,
                "amenity": amenity.amenity
            }
            for amenity in room_amenities
        ]
        return room_amenities
    except Exception as e:
        logging.error(f"Error fetching room amenities: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /room-problem
# This endpoint fetches all room problems from the database.
@router.get("/room-problem", tags=["room_problem"])
async def get_room_problems(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        room_problems = db.query(RoomProblem).all()
        logging.info(f"Fetched {len(room_problems)} room problems")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        room_problems = [
            {
                "room_id": problem.room_id,
                "problem_description": problem.problem_description,
                "reported_date": problem.reported_date
            }
            for problem in room_problems
        ]
        return room_problems
    except Exception as e:
        logging.error(f"Error fetching room problems: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /booking
# This endpoint fetches all bookings from the database.
@router.get("/booking", tags=["booking"])
async def get_bookings(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        bookings = db.query(Booking).all()
        logging.info(f"Fetched {len(bookings)} bookings")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        bookings = [
            {
                "booking_id": booking.booking_id,
                "customer_id": booking.customer_id,
                "room_id": booking.room_id,
                "check_in_date": booking.check_in_date.isoformat(),
                "check_out_date": booking.check_out_date.isoformat(),
                "status": booking.status
            }
            for booking in bookings
         ]
        return bookings
    except Exception as e:
        logging.error(f"Error fetching bookings: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /renting
# This endpoint fetches all rentings from the database.
@router.get("/renting", tags=["renting"])
async def get_rentings(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        rentings = db.query(Renting).all()
        logging.info(f"Fetched {len(rentings)} rentings")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        rentings = [
            {
                "renting_id": renting.renting_id,
                "booking_id": renting.booking_id,
                "customer_id": renting.customer_id,
                "room_id": renting.room_id,
                "employee_id": renting.employee_id,
                "start_date": renting.start_date,
                "end_date": renting.end_date
            }
            for renting in rentings
        ]
        return rentings
    except Exception as e:
        logging.error(f"Error fetching rentings: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /employee
# This endpoint fetches all employees from the database.
@router.get("/employee", tags=["employee"])
async def get_employees(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        employees = db.query(Employee).all()
        logging.info(f"Fetched {len(employees)} employees")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        employees = [
            {
                "employee_id": employee.employee_id,
                "hotel_id": employee.hotel_id,
                "full_name": employee.full_name,
                "address": employee.address,
                "ssn_sin": employee.ssn_sin,
                "role": employee.role
            }
            for employee in employees
        ]
        return employees
    except Exception as e:
        logging.error(f"Error fetching employees: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* TEST URL: /customer
# This endpoint fetches all customers from the database.
@router.get("/customer", tags=["customer"])
async def get_customers(db: Session = Depends(database.get_db)) -> list[dict[str, Any]]:
    try:
        customers = db.query(Customer).all()
        logging.info(f"Fetched {len(customers)} customers")
        # Convert SQLAlchemy objects to dictionaries for JSON response
        customers = [
            {
                "customer_id": customer.customer_id,
                "full_name": customer.full_name,
                "address": customer.address,
                "id_type": customer.id_type,
                "id_number": customer.id_number,
                "registration_date": customer.registration_date
            }
            for customer in customers
        ]
        return customers
    except Exception as e:
        logging.error(f"Error fetching customers: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

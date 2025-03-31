import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database
from models import (HotelChain, ChainContact, Hotel, HotelContact,
                    Room, RoomAmenity, RoomProblem, Booking, Renting, Employee, Customer)
from schema import (CustomerUpdate, CustomerResponse, EmployeeUpdate, EmployeeResponse,
                    HotelUpdate, HotelResponse, RoomUpdate, RoomResponse)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

# Initialize the FastAPI router
router = APIRouter()

#* PATCH request to modify a customer
#* curl -X PATCH "http://localhost:8000/customer/update" -H "Content-Type: application/json" -d '{"customer_id": 30, "name": "John DOOOOOOOOE", "address": "1337 Pwned St.", "id_type": "SSN", "id_number": "777-31-5733"}'
#* curl -X PATCH "http://localhost:8000/customer/update" -H "Content-Type: application/json" -d '{"customer_id": 30, "name": "John DOOOOOOOOE", "registration_date": "2011-11-11"}'
@router.patch("/customer/update", tags=["update_customer"], response_model=CustomerResponse)
async def update_customer(
    customer: CustomerUpdate,
    db: Session = Depends(database.get_db)
    ) -> CustomerResponse:
    try:
        # Fetch the customer to be updated
        existing_customer = db.query(Customer).filter(Customer.customer_id == customer.customer_id).first()
        if not existing_customer:
            raise HTTPException(status_code=404, detail=f"Customer not found with customer_id: {customer.customer_id}")

        # Update the customer attributes, excluding 'customer_id' since its unique
        for key, value in customer.model_dump(exclude_unset=True).items():
            if key != "customer_id":
                setattr(existing_customer, key, value)

        # Commit the changes to the database
        db.commit()
        db.refresh(existing_customer)
        logging.info(f"Updated customer with customer_id: {existing_customer.customer_id}")
        return existing_customer
    except Exception as e:
        logging.error(f"Error updating customer: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* PATCH request to modify a employee
#* curl -X PATCH "http://localhost:8000/employee/update" -H "Content-Type: application/json" -d '{"employee_id": 1, "hotel_id": 2, "full_name": "Jane Doe", "address": "456 Elm St", "ssn_sin": "777-45-6789", "role": "manager"}'
@router.patch("/employee/update", tags=["update_employee"], response_model=EmployeeResponse)
async def update_employee(
    employee: EmployeeUpdate,
    db: Session = Depends(database.get_db)
    ) -> EmployeeResponse:
    try:
        # Fetch the employee to be updated
        existing_employee = db.query(Employee).filter(Employee.employee_id == employee.employee_id).first()
        if not existing_employee:
            raise HTTPException(status_code=404, detail=f"Employee not found with employee_id: {employee.employee_id}")
        # Update the employee attributes
        for key, value in employee.model_dump(exclude_unset=True).items():
            if key != "employee_id":
                setattr(existing_employee, key, value)
        # Commit the changes to the database
        db.commit()
        db.refresh(existing_employee)
        logging.info(f"Updated employee with employee_id: {existing_employee.employee_id}")
        return existing_employee
    except Exception as e:
        logging.error(f"Error updating employee: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* PATCH request to modify a hotel
#* curl -X PATCH "http://localhost:8000/hotel/update" -H "Content-Type: application/json" -d '{"hotel_id": 42, "chain_id": 2, "address": "789 Pwn St", "category": 4}'
@router.patch("/hotel/update", tags=["update_hotel"], response_model=HotelResponse)
async def update_hotel(
    hotel: HotelUpdate,
    db: Session = Depends(database.get_db)
    ) -> HotelResponse:
    try:
        # Fetch the hotel to be updated
        existing_hotel = db.query(Hotel).filter(Hotel.hotel_id == hotel.hotel_id).first()
        if not existing_hotel:
            raise HTTPException(status_code=404, detail=f"Hotel not found with hotel_id: {hotel.hotel_id}")
        # Update the hotel attributes
        for key, value in hotel.model_dump(exclude_unset=True).items():
            if key != "hotel_id":
                setattr(existing_hotel, key, value)
        # Commit the changes to the database
        db.commit()
        db.refresh(existing_hotel)
        logging.info(f"Updated hotel with hotel_id: {existing_hotel.hotel_id}")
        return existing_hotel
    except Exception as e:
        logging.error(f"Error updating hotel: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


#* PATCH request to modify a room
#* curl -X PATCH "http://localhost:8000/room/update" -H "Content-Type: application/json" -d '{"room_id": 221, "price": 1.0}'
@router.patch("/room/update", tags=["update_room"], response_model=RoomResponse)
async def update_room(
    room: RoomUpdate,
    db: Session = Depends(database.get_db)
    ) -> RoomResponse:
    try:
        # Fetch the room to be updated
        existing_room = db.query(Room).filter(Room.room_id == room.room_id).first()
        if not existing_room:
            raise HTTPException(status_code=404, detail=f"Room not found with room_id: {room.room_id}")

        # Update the room attributes
        for key, value in room.model_dump(exclude_unset=True).items():
            if key != "room_id":
                setattr(existing_room, key, value)

        # Commit the changes to the database
        db.commit()
        db.refresh(existing_room)
        logging.info(f"Updated room with room_id: {existing_room.room_id}")
        return existing_room
    except Exception as e:
        logging.error(f"Error updating room: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

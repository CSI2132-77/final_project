import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database
from models import (HotelChain, ChainContact, Hotel, HotelContact,
                    Room, RoomAmenity, RoomProblem, Booking, Renting, Employee, Customer)
from schema import (CustomerDelete, CustomerResponse, EmployeeDelete, EmployeeResponse,
                    HotelDelete, HotelResponse, RoomDelete, RoomResponse)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

# Initialize the FastAPI router
router = APIRouter()

#* DELETE request to remove a customer
#* curl -X DELETE "http://localhost:8000/customer/delete" -H "Content-Type: application/json" -d '{"customer_id": 30}'
@router.delete("/customer/delete", tags=["delete_customer"], response_model=CustomerResponse)
async def delete_customer(
    customer: CustomerDelete,
    db: Session = Depends(database.get_db)
    ) -> CustomerResponse:
    try:
        # Fetch the customer to be deleted
        customer_to_delete = db.query(Customer).filter(Customer.customer_id == customer.customer_id).first()
        if not customer_to_delete:
            raise HTTPException(status_code=404, detail=f"Customer not found with ID: {customer.customer_id}")

        # Delete the customer from the database
        db.delete(customer_to_delete)
        db.commit()
        logging.info(f"Deleted customer with customer_id: {customer_to_delete.customer_id}")
        return customer_to_delete
    except Exception as e:
        logging.error(f"Error deleting customer: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* DELETE request to remove a employee
#* curl -X DELETE "http://localhost:8000/employee/delete" -H "Content-Type: application/json" -d '{"employee_id": 123}'
@router.delete("/employee/delete", tags=["delete_employee"], response_model=EmployeeResponse)
async def delete_employee(
    employee: EmployeeDelete,
    db: Session = Depends(database.get_db)
    ) -> EmployeeResponse:
    try:
        # Fetch the employee to be deleted
        employee_to_delete = db.query(Employee).filter(Employee.employee_id == employee.employee_id).first()
        if not employee_to_delete:
            raise HTTPException(status_code=404, detail=f"Employee not found with employee_id: {employee.employee_id}")

        # Delete the employee from the database
        db.delete(employee_to_delete)
        db.commit()
        logging.info(f"Deleted employee with employee_id: {employee_to_delete.employee_id}")
        return employee_to_delete
    except Exception as e:
        logging.error(f"Error deleting employee: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* DELETE request to remove a hotel
#* curl -X DELETE "http://localhost:8000/hotel/delete" -H "Content-Type: application/json" -d '{"hotel_id": 41}'
@router.delete("/hotel/delete", tags=["delete_hotel"], response_model=HotelResponse)
async def delete_hotel(
    hotel: HotelDelete,
    db: Session = Depends(database.get_db)
    ) -> HotelResponse:
    try:
        # Fetch the hotel to be deleted
        hotel_to_delete = db.query(Hotel).filter(Hotel.hotel_id == hotel.hotel_id).first()
        if not hotel_to_delete:
            raise HTTPException(status_code=404, detail=f"Hotel not found with hotel_id: {hotel.hotel_id}")

        # Delete the hotel from the database
        db.delete(hotel_to_delete)
        db.commit()
        logging.info(f"Deleted hotel with hotel_id: {hotel_to_delete.hotel_id}")
        return hotel_to_delete
    except Exception as e:
        logging.error(f"Error deleting hotel: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")


#* DELETE request to remove a room
#* curl -X DELETE "http://localhost:8000/room/delete" -H "Content-Type: application/json" -d '{"room_id": 224}'
@router.delete("/room/delete", tags=["delete_room"], response_model=RoomResponse)
async def delete_room(
    room: RoomDelete,
    db: Session = Depends(database.get_db)
    ) -> RoomResponse:
    try:
        # Fetch the room to be deleted
        room_to_delete = db.query(Room).filter(Room.room_id == room.room_id).first()
        if not room_to_delete:
            raise HTTPException(status_code=404, detail=f"Room not found with room_id: {room.room_id}")

        # Delete the room from the database
        db.delete(room_to_delete)
        db.commit()
        logging.info(f"Deleted room with room_id: {room_to_delete.room_id}")
        return room_to_delete
    except Exception as e:
        logging.error(f"Error deleting room: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

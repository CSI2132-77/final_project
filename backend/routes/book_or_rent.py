import logging
from typing import Any
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
import database
from models import (HotelChain, ChainContact, Hotel, HotelContact,
                    Room, RoomAmenity, RoomProblem, Booking, Renting, Employee, Customer)
from schema import (BookingCreate, BookingUpdate, BookingResponse, BookingToRenting, BookingDelete,
                    RentingCreate, RentingUpdate, RentingResponse, RentingDelete)

# Set up logging
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s"
)

# Initialize the FastAPI router
router = APIRouter()

#* Booking a room
#* curl -X POST "http://localhost:8000/book" -H "Content-Type: application/json" -d '{"customer_id": 1, "room_id": 4, "check_in_date": "2023-10-01", "check_out_date": "2023-10-05", "status": "completed"}'
@router.post("/book", tags=["book_room"], response_model=BookingResponse)
async def book_room(
    booking: BookingCreate,
    db: Session = Depends(database.get_db)
) -> BookingResponse:
    try:
        "Book a room for a customer."
        # Check if the customer exists
        customer = db.query(Customer).filter(Customer.customer_id == booking.customer_id).first()
        if not customer:
            logging.info(f"Customer {booking.customer_id} not found")
            raise HTTPException(status_code=404, detail="Customer not found, add customer first")

        # Check if the room exists
        room = db.query(Room).filter(Room.room_id == booking.room_id).first()
        if not room:
            logging.info(f"Room {booking.room_id} not found")
            raise HTTPException(status_code=404, detail="Room not found, add room first")

        # Check if the room is available for the given dates
        existing_booking = db.query(Booking).filter(
            Booking.room_id == booking.room_id,
            Booking.check_in_date <= booking.check_out_date,
            Booking.check_out_date >= booking.check_in_date
        ).first()
        if existing_booking:
            logging.info(f"Room {booking.room_id} is already booked for the selected dates")
            raise HTTPException(status_code=400, detail="Room is already booked for the selected dates")

        # Check if the customer has an existing booking for the same room
        existing_customer_booking = db.query(Booking).filter(
            Booking.customer_id == booking.customer_id,
            Booking.room_id == booking.room_id,
            Booking.check_in_date == booking.check_out_date,
            Booking.check_out_date == booking.check_in_date
        ).first()
        if existing_customer_booking:
            logging.info(f"Customer {booking.customer_id} already has a booking for room {booking.room_id}")
            raise HTTPException(status_code=400, detail="Customer already has a booking for this room")

        # Check if the customer has an existing renting for the same room
        existing_renting = db.query(Renting).filter(
            Renting.customer_id == booking.customer_id,
            Renting.room_id == booking.room_id,
            Renting.start_date == booking.check_out_date,
            Renting.end_date == booking.check_in_date
        ).first()
        if existing_renting:
            raise HTTPException(status_code=400, detail="Customer already has a renting for this room")

        # Create a new booking
        new_booking = Booking(
            customer_id=booking.customer_id,
            room_id=booking.room_id,
            check_in_date=booking.check_in_date,
            check_out_date=booking.check_out_date,
            status=booking.status
        )
        db.add(new_booking)
        db.commit()
        db.refresh(new_booking)
        logging.info(f"New booking created: {vars(new_booking)}")
        return new_booking
    except Exception as e:
        logging.error(f"Error during booking: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* Check-In a customer that has a booking
#* curl -X POST "http://localhost:8000/check_in/online" -H "Content-Type: application/json" -d '{"booking_id": 15, "employee_id": 1}'
@router.post("/check_in/online", tags=["check_in"], response_model=RentingResponse)
async def check_in(
    booking_to_renting: BookingToRenting,
    db: Session = Depends(database.get_db)
) -> RentingResponse:
    try:
        # Bookign exists client gives their booking number
        booking_record = db.query(Booking).filter(
            Booking.booking_id == booking_to_renting.booking_id
        ).first()
        if not booking_record:
            raise HTTPException(status_code=404, detail=f"Booking not found with booking_id: {booking_to_renting.booking_id}")
        # Check if the renting already exists
        existing_renting = db.query(Renting).filter(
            Renting.booking_id == booking_record.booking_id,
            Renting.start_date <= booking_record.check_out_date,
            Renting.end_date >= booking_record.check_in_date
        ).first()
        if existing_renting:
            raise HTTPException(status_code=400, detail="Renting already exists for this booking")
        # convert booking to renting
        renting = Renting(
            booking_id=booking_record.booking_id,
            customer_id=booking_record.customer_id,
            room_id=booking_record.room_id,
            employee_id=booking_to_renting.employee_id,
            start_date=booking_record.check_in_date,
            end_date=booking_record.check_out_date
        )
        db.add(renting)
        db.commit()
        db.refresh(renting)
        logging.info(f"New renting created: {vars(renting)}")
        # update booking status to completed
        booking_record.status = "active"
        db.commit()
        db.refresh(booking_record)
        logging.info(f"Booking {booking_record.booking_id} status updated to completed")
        return renting
    except Exception as e:
        logging.error(f"Error during check-in: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* Check-In a customer that does not have a booking, and is in person
#* curl -X POST "http://localhost:8000/check_in/in_person" -H "Content-Type: application/json" -d '{"customer_id": 1, "room_id": 4, "employee_id": 1, "start_date": "2023-10-01", "end_date": "2023-10-05"}'
@router.post("/check_in/in_person", tags=["check_in"], response_model=RentingResponse)
async def direct_rent(
    renting: RentingCreate,
    db: Session = Depends(database.get_db)
) -> RentingResponse:
    """
    - Check in a customer that does not have a booking.
    - This function checks if the customer and room exist, and if the room is available for the given dates.
    - If everything is valid, it creates a new renting record.
    - A Renting is made **WITHOUT** creating a booking.
    - This is used for customers that come in person and do not have a booking.
    """
    try:
        # Check if the customer exists
        customer = db.query(Customer).filter(Customer.customer_id == renting.customer_id).first()
        if not customer:
            raise HTTPException(status_code=404, detail="Customer not found, add customer first")

        # Check if the room exists
        room = db.query(Room).filter(Room.room_id == renting.room_id).first()
        if not room:
            raise HTTPException(status_code=404, detail="Room not found, add room first")

        # Check if the room has a booking already (is reserved)
        existing_booking = db.query(Booking).filter(
            Booking.room_id == renting.room_id,
            Booking.check_in_date <= renting.end_date,
            Booking.check_out_date >= renting.start_date
        ).first()
        if existing_booking:
            raise HTTPException(status_code=400, detail="Room is already booked for the selected dates")

        # Check if the room has a renting already (is occupied)
        existing_renting = db.query(Renting).filter(
            Renting.room_id == renting.room_id,
            Renting.start_date <= renting.end_date,
            Renting.end_date >= renting.start_date
        ).first()
        if existing_renting:
            raise HTTPException(status_code=400, detail="Room is already rented for the selected dates")

        # Check if the customer has an existing booking for the same room
        existing_customer_booking = db.query(Booking).filter(
            Booking.customer_id == renting.customer_id,
            Booking.room_id == renting.room_id,
            Booking.check_in_date <= renting.end_date,
            Booking.check_out_date >= renting.start_date
        ).first()
        if existing_customer_booking:
            raise HTTPException(status_code=400, detail="Customer already has a booking for this room")

        # Check if the customer has an existing renting for the same room
        existing_customer_renting = db.query(Renting).filter(
            Renting.customer_id == renting.customer_id,
            Renting.room_id == renting.room_id,
            Renting.start_date <= renting.end_date,
            Renting.end_date >= renting.start_date
        ).first()
        if existing_customer_renting:
            raise HTTPException(status_code=400, detail="Customer already has a renting for this room")

        #* By now the customer and room exist, and the room is not booked or rented
        # Create a new renting
        new_renting = Renting(
            customer_id=renting.customer_id,
            room_id=renting.room_id,
            employee_id=renting.employee_id,
            start_date=renting.start_date,
            end_date=renting.end_date
        )
        db.add(new_renting)
        db.commit()
        db.refresh(new_renting)
        logging.info(f"New direct renting created: {vars(new_renting)}")
        return new_renting
    except Exception as e:
        logging.error(f"Error during check-in: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* DELETE a Renting
#* curl -X DELETE "http://localhost:8000/renting/delete" -H "Content-Type: application/json" -d '{"renting_id": 18}'
@router.delete("/renting/delete", tags=["delete_renting"])
async def delete_renting(
    renting: RentingUpdate,
    db: Session = Depends(database.get_db)
) -> dict:
    """
    - Delete a renting record.
    - This function checks if the renting exists and deletes it.
    """
    try:
        # Check if the renting exists
        renting_record = db.query(Renting).filter(Renting.renting_id == renting.renting_id).first()
        if not renting_record:
            raise HTTPException(status_code=404, detail="Renting not found")

        # Delete the renting record
        db.delete(renting_record)
        db.commit()
        logging.info(f"Renting deleted with renting_id: {renting.renting_id}")
        return {"message": "Renting deleted successfully"}
    except Exception as e:
        logging.error(f"Error during deleting renting: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

#* DELETE a Booking
#* curl -X DELETE "http://localhost:8000/booking/delete" -H "Content-Type: application/json" -d '{"booking_id": 15}'
@router.delete("/booking/delete", tags=["delete_booking"])
async def delete_booking(
    booking: BookingDelete,
    db: Session = Depends(database.get_db)
) -> dict:
    """
    - Delete a booking record.
    - This function checks if the booking exists and deletes it.
    """
    try:
        # Check if the booking exists
        booking_record = db.query(Booking).filter(Booking.booking_id == booking.booking_id).first()
        if not booking_record:
            raise HTTPException(status_code=404, detail="Booking not found")

        # Delete the booking record
        db.delete(booking_record)
        db.commit()
        logging.info(f"Booking deleted with booking_id: {booking.booking_id}")
        return {"message": "Booking deleted successfully"}
    except Exception as e:
        logging.error(f"Error during deleting booking: {e}")
        raise HTTPException(status_code=500, detail="Internal Server Error")

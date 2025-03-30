from pydantic import BaseModel
from typing import Optional

# Base model (shared attributes)
class HotelChainBase(BaseModel):
    name: str
    central_office_address: str

    class Config:
        orm_mode = True

# Request model for creating a hotel chain (no `chain_id` since it's auto-generated)
class HotelChainCreate(HotelChainBase):
    pass  # No extra fields needed

# Response model for returning data (includes `chain_id`)
class HotelChainResponse(HotelChainBase):
    chain_id: int


# Base model (shared attributes)
class ChainContactBase(BaseModel):
    contact_type: str
    value: str

    class Config:
        orm_mode = True

# Request model for creating a chain contact
class ChainContactCreate(ChainContactBase):
    chain_id: int

# Response model for returning data
class ChainContactResponse(ChainContactBase):
    chain_id: int


# Base model (shared attributes)
class HotelBase(BaseModel):
    address: str
    category: int

    class Config:
        orm_mode = True

# Request model for creating a hotel
class HotelCreate(HotelBase):
    chain_id: int

# Response model for returning data
class HotelResponse(HotelBase):
    hotel_id: int
    chain_id: int


# Base model (shared attributes)
class HotelContactBase(BaseModel):
    contact_type: str
    value: str

    class Config:
        orm_mode = True

# Request model for creating a hotel contact
class HotelContactCreate(HotelContactBase):
    hotel_id: int

class HotelContactUpdate(HotelContactBase):
    hotel_id: int
    # Optional fields for updating
    contact_type: str = None
    value: str = None

# Response model for returning data
class HotelContactResponse(HotelContactBase):
    hotel_id: int


# Base model (shared attributes)
class RoomBase(BaseModel):
    price: float
    capacity: str
    view_type: str
    is_extendable: bool

    class Config:
        orm_mode = True

# Request model for creating a room
class RoomCreate(RoomBase):
    hotel_id: int

class RoomUpdate(RoomBase):
    room_id: int
    # Optional fields for updating
    hotel_id: Optional[int] = None
    price: Optional[float] = None
    capacity: Optional[str] = None
    view_type: Optional[str] = None
    is_extendable: Optional[bool] = None

# Response model for returning data
class RoomResponse(RoomBase):
    room_id: int
    hotel_id: int


# Base model (shared attributes)
class RoomAmenityBase(BaseModel):
    amenity: str

    class Config:
        orm_mode = True

# Request model for creating a room amenity
class RoomAmenityCreate(RoomAmenityBase):
    room_id: int

class RoomAmenityUpdate(RoomAmenityBase):
    room_id: int
    # Optional fields for updating
    amenity: str = None

# Response model for returning data
class RoomAmenityResponse(RoomAmenityBase):
    room_id: int


# Base model (shared attributes)
class RoomProblemBase(BaseModel):
    problem_description: str
    reported_date: str

    class Config:
        orm_mode = True

# Request model for creating a room problem
class RoomProblemCreate(RoomProblemBase):
    room_id: int

class RoomProblemUpdate(RoomProblemBase):
    room_id: int
    # Optional fields for updating
    problem_description: str = None
    reported_date: str = None

# Response model for returning data
class RoomProblemResponse(RoomProblemBase):
    room_id: int


# Base model (shared attributes)
class BookingBase(BaseModel):
    check_in_date: str
    check_out_date: str
    status: str

    class Config:
        orm_mode = True

# Request model for creating a booking
class BookingCreate(BookingBase):
    customer_id: int
    room_id: int

class BookingUpdate(BookingBase):
    booking_id: int
    # Optional fields for updating
    check_in_date: str = None
    check_out_date: str = None
    status: str = None
    customer_id: int = None
    room_id: int = None

# Response model for returning data
class BookingResponse(BookingBase):
    booking_id: int
    customer_id: int
    room_id: int


# Base model (shared attributes)
class RentingBase(BaseModel):
    start_date: str
    end_date: str

    class Config:
        orm_mode = True

# Request model for creating a renting
class RentingCreate(RentingBase):
    booking_id: int
    customer_id: int
    room_id: int
    employee_id: int

class RentingUpdate(RentingBase):
    renting_id: int
    # Optional fields for updating
    booking_id: int = None
    customer_id: int = None
    room_id: int = None
    employee_id: int = None
    start_date: str = None
    end_date: str = None

# Response model for returning data
class RentingResponse(RentingBase):
    renting_id: int
    booking_id: int
    customer_id: int
    room_id: int
    employee_id: int


# Base model (shared attributes)
class EmployeeBase(BaseModel):
    full_name: str
    address: str
    ssn_sin: str
    role: str

    class Config:
        orm_mode = True

# Request model for creating an employee
class EmployeeCreate(EmployeeBase):
    hotel_id: int

class EmployeeUpdate(EmployeeBase):
    employee_id: int
    # Optional fields for updating
    hotel_id: int = None
    full_name: str = None
    address: str = None
    ssn_sin: str = None
    role: str = None

# Response model for returning data
class EmployeeResponse(EmployeeBase):
    employee_id: int
    hotel_id: int


# Base model (shared attributes)
class CustomerBase(BaseModel):
    full_name: str
    address: str
    id_type: str
    id_number: str
    registration_date: str

    class Config:
        orm_mode = True

# Request model for creating a customer
class CustomerCreate(CustomerBase):
    pass  # No extra fields needed

class CustomerUpdate(CustomerBase):
    customer_id: int
    # Optional fields for updating
    full_name: str = None
    address: str = None
    id_type: str = None
    id_number: str = None
    registration_date: str = None

# Response model for returning data
class CustomerResponse(CustomerBase):
    customer_id: int


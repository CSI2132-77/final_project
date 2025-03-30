from sqlalchemy import Column, Integer, String, Text, ForeignKey, PrimaryKeyConstraint, CheckConstraint
from sqlalchemy.orm import relationship, declarative_base
from sqlalchemy import Numeric, Boolean
from sqlalchemy import Date

Base = declarative_base()

class HotelChain(Base):
    __tablename__          = 'hotel_chain'
    chain_id               = Column(Integer, primary_key=True, autoincrement=True)
    name                   = Column(String(100), nullable=False)
    central_office_address = Column(Text, nullable=False)

    # contacts = relationship("ChainContact", back_populates="hotel_chain", cascade="all, delete-orphan")
    # hotels = relationship("Hotel", back_populates="hotel_chain", cascade="all, delete-orphan")

class ChainContact(Base):
    __tablename__  = 'chain_contact'
    chain_id       = Column(Integer,
                        ForeignKey("hotel_chain.chain_id", ondelete="CASCADE"),
                        nullable=False)
    contact_type   = Column(String(10), nullable=False)
    value = Column(Text, nullable=False)
    __table_args__ = (PrimaryKeyConstraint('chain_id', 'contact_type', 'value'),)
    # hotel_chain = relationship("HotelChain", back_populates="contacts")

class Hotel(Base):
    __tablename__ = 'hotel'
    hotel_id      = Column(Integer, primary_key=True, autoincrement=True)
    chain_id      = Column(Integer,
                        ForeignKey("hotel_chain.chain_id", ondelete="CASCADE"),
                        nullable=False)
    address       = Column(Text, nullable=False)
    category      = Column(Integer, nullable=False)
    # hotel_chain = relationship("HotelChain", back_populates="hotels")
    # contacts = relationship("HotelContact", back_populates="hotel", cascade="all, delete-orphan")

class HotelContact(Base):
    __tablename__  = 'hotel_contact'
    hotel_id       = Column(Integer,
                        ForeignKey("hotel.hotel_id", ondelete="CASCADE"),
                        nullable=False)
    contact_type   = Column(String(10))
    value          = Column(Text, nullable=False)
    __table_args__ = (PrimaryKeyConstraint('hotel_id', 'contact_type', 'value'),)

    # hotel = relationship("Hotel", back_populates="contacts")

class Room(Base):
    __tablename__  = 'room'
    room_id        = Column(Integer, primary_key=True, autoincrement=True, index=True)
    hotel_id       = Column(Integer,
                        ForeignKey("hotel.hotel_id", ondelete="CASCADE"),
                        nullable=False,
                        index=True)
    price          = Column(Numeric(10, 2), nullable=False)
    capacity       = Column(String(10), nullable=False)
    view_type      = Column(String(10), nullable=False)
    is_extendable  = Column(Boolean, default=False)
    __table_args__ = (
        CheckConstraint(
            "price > 0",
            name="check_price_positive"),
        CheckConstraint(
            "capacity IN ('single', 'double', 'suite')",
            name="check_capacity_valid"),
        CheckConstraint(
            "view_type IN ('sea', 'mountain', 'none')",
            name="check_view_type_valid"),
    )

class RoomAmenity(Base):
    __tablename__  = 'room_amenity'
    room_id        = Column(Integer,
                        ForeignKey("room.room_id", ondelete="CASCADE"),
                        nullable=False)
    amenity        = Column(Text, nullable=False)
    __table_args__ = (PrimaryKeyConstraint('room_id', 'amenity'),)

class RoomProblem(Base):
    __tablename__ = 'room_problem'
    room_id       = Column(Integer,
                        ForeignKey("room.room_id", ondelete="CASCADE"),
                        nullable=False)
    problem_description = Column(Text, nullable=False)
    reported_date       = Column(Date, default="CURRENT_DATE", nullable=False)
    __table_args__      = (
        PrimaryKeyConstraint('room_id', 'problem_description', 'reported_date'),
    )

class Booking(Base):
    __tablename__   = 'booking'
    booking_id      = Column(Integer, primary_key=True, autoincrement=True)
    customer_id     = Column(Integer,
                            ForeignKey("customer.customer_id", ondelete="SET NULL"),
                            nullable=False)
    room_id         = Column(Integer,
                        ForeignKey("room.room_id", ondelete="CASCADE"),
                        nullable=False)
    check_in_date   = Column(Date, nullable=False)
    check_out_date  = Column(Date, nullable=False)
    status          = Column(String(20), nullable=False, default='active')
    __table_args__  = (
        CheckConstraint(
            "status IN ('active', 'canceled', 'completed')",
            name="check_status_valid"),
        CheckConstraint(
            "check_out_date > check_in_date",
            name="check_dates_valid"),
    )

class Renting(Base):
    __tablename__  = 'renting'
    renting_id     = Column(Integer, primary_key=True, autoincrement=True)
    booking_id     = Column(Integer,
                         ForeignKey("booking.booking_id", ondelete="SET NULL"))
    customer_id    = Column(Integer,
                             ForeignKey("customer.customer_id", ondelete="SET NULL"),
                             nullable=False)
    room_id        = Column(Integer,
                         ForeignKey("room.room_id", ondelete="CASCADE"),
                         nullable=False)
    employee_id    = Column(Integer,
                             ForeignKey("employee.employee_id", ondelete="RESTRICT"),
                             nullable=False)
    start_date     = Column(Date, nullable=False)
    end_date       = Column(Date, nullable=False)
    __table_args__ = (
        CheckConstraint(
            "end_date >= start_date",
            name="check_end_date_after_start_date"),
    )

class Employee(Base):
    __tablename__  = 'employee'
    employee_id    = Column(Integer, primary_key=True, autoincrement=True)
    hotel_id       = Column(Integer,
                    ForeignKey("hotel.hotel_id", ondelete="CASCADE"),
                    nullable=False)
    full_name      = Column(String(100), nullable=False)
    address        = Column(Text)
    ssn_sin        = Column(String(50), nullable=False, unique=True)
    role           = Column(String(20), nullable=False)
    __table_args__ = (
        CheckConstraint(
            "role IN ('manager', 'receptionist', 'housekeeping')",
            name="check_role_valid"),
    )

class Customer(Base):
    __tablename__     = 'customer'
    customer_id       = Column(Integer, primary_key=True, autoincrement=True)
    full_name         = Column(String(100), nullable=False)
    address           = Column(Text)
    id_type           = Column(String(20), nullable=False)
    id_number         = Column(String(50), nullable=False, unique=True)
    registration_date = Column(Date, default="CURRENT_DATE")
    __table_args__    = (
        CheckConstraint(
            "id_type IN ('SSN', 'SIN', 'Driver License')",
            name="check_id_type_valid"),
    )

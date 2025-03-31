-- Enable advanced constraints
CREATE EXTENSION IF NOT EXISTS btree_gist;

-- Hotel Chain (Parent Entity)
CREATE TABLE IF NOT EXISTS Hotel_Chain (
    chain_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    central_office_address TEXT NOT NULL
);

-- Chain Contacts (Multi-valued)
CREATE TABLE IF NOT EXISTS Chain_Contact (
    chain_id INTEGER NOT NULL,
    contact_type VARCHAR(10) CHECK (contact_type IN ('email', 'phone')),
    value TEXT NOT NULL,
    PRIMARY KEY (chain_id, contact_type, value),
    FOREIGN KEY (chain_id) REFERENCES Hotel_Chain(chain_id) ON DELETE CASCADE
);

-- Hotel (Child of Chain)
CREATE TABLE IF NOT EXISTS Hotel (
    hotel_id SERIAL PRIMARY KEY,
    chain_id INTEGER NOT NULL,
    address TEXT NOT NULL,
    category INTEGER NOT NULL CHECK (category BETWEEN 1 AND 5),
    FOREIGN KEY (chain_id) REFERENCES Hotel_Chain(chain_id) ON DELETE CASCADE
);

-- Hotel Contacts (Multi-valued)
CREATE TABLE IF NOT EXISTS Hotel_Contact (
    hotel_id INTEGER NOT NULL,
    contact_type VARCHAR(10) CHECK (contact_type IN ('email', 'phone')),
    value TEXT NOT NULL,
    PRIMARY KEY (hotel_id, contact_type, value),
    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id) ON DELETE CASCADE
);

-- Room (Child of Hotel)
CREATE TABLE IF NOT EXISTS Room (
    room_id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    price NUMERIC(10,2) NOT NULL CHECK (price > 0),
    capacity VARCHAR(10) NOT NULL CHECK (capacity IN ('single', 'double', 'suite')),
    view_type VARCHAR(10) NOT NULL CHECK (view_type IN ('sea', 'mountain', 'none')),
    is_extendable BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id) ON DELETE CASCADE
);

-- Room Amenities (Multi-valued)
CREATE TABLE IF NOT EXISTS Room_Amenity (
    room_id INTEGER NOT NULL,
    amenity TEXT NOT NULL,
    PRIMARY KEY (room_id, amenity),
    FOREIGN KEY (room_id) REFERENCES Room(room_id) ON DELETE CASCADE
);

-- Room Problems (Multi-valued)
CREATE TABLE IF NOT EXISTS Room_Problem (
    room_id INTEGER NOT NULL,
    problem_description TEXT NOT NULL,
    reported_date DATE DEFAULT CURRENT_DATE,
    PRIMARY KEY (room_id, problem_description, reported_date),
    FOREIGN KEY (room_id) REFERENCES Room(room_id) ON DELETE CASCADE
);

-- Customer
CREATE TABLE IF NOT EXISTS Customer (
    customer_id SERIAL PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    address TEXT,
    id_type VARCHAR(20) NOT NULL CHECK (id_type IN ('SSN', 'SIN', 'Driver License')),
    id_number VARCHAR(50) NOT NULL UNIQUE,
    registration_date DATE DEFAULT CURRENT_DATE
);

-- Employee
CREATE TABLE IF NOT EXISTS Employee (
    employee_id SERIAL PRIMARY KEY,
    hotel_id INTEGER NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    address TEXT,
    ssn_sin VARCHAR(50) NOT NULL UNIQUE,
    role VARCHAR(20) NOT NULL CHECK (role IN ('manager', 'receptionist', 'housekeeping')),
    FOREIGN KEY (hotel_id) REFERENCES Hotel(hotel_id) ON DELETE CASCADE
);

-- Booking
CREATE TABLE IF NOT EXISTS Booking (
    booking_id SERIAL PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    check_in_date DATE NOT NULL,
    check_out_date DATE NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'completed')),
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE SET NULL,
    FOREIGN KEY (room_id) REFERENCES Room(room_id) ON DELETE CASCADE,
    CHECK (check_out_date > check_in_date)
);

-- Renting
CREATE TABLE IF NOT EXISTS Renting (
    renting_id SERIAL PRIMARY KEY,
    booking_id INTEGER,
    customer_id INTEGER NOT NULL,
    room_id INTEGER NOT NULL,
    employee_id INTEGER NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    FOREIGN KEY (booking_id) REFERENCES Booking(booking_id) ON DELETE SET NULL,
    FOREIGN KEY (customer_id) REFERENCES Customer(customer_id) ON DELETE SET NULL,
    FOREIGN KEY (room_id) REFERENCES Room(room_id) ON DELETE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES Employee(employee_id) ON DELETE RESTRICT,
    CHECK (end_date >= start_date)
);

-- Prevent overlapping bookings
ALTER TABLE Booking ADD CONSTRAINT no_overlapping_bookings
EXCLUDE USING gist (
    room_id WITH =,
    daterange(check_in_date, check_out_date) WITH &&
);

-- Prevent overlapping rentals
ALTER TABLE Renting ADD CONSTRAINT no_overlapping_rentals
EXCLUDE USING gist (
    room_id WITH =,
    daterange(start_date, end_date) WITH &&
);

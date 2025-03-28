-- Index 1: Speed up room searches by hotel and view type
CREATE INDEX idx_room_hotel_view ON Room(hotel_id, view_type);

-- Index 2: Optimize booking date range queries
CREATE INDEX idx_booking_dates ON Booking(room_id, check_in_date, check_out_date);

-- Index 3: Improve employee role searches
CREATE INDEX idx_employee_role ON Employee(hotel_id, role);

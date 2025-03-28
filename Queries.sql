-- Query 1: Aggregation - Average price by hotel category
SELECT category, ROUND(AVG(price), 2) AS avg_price
FROM Room
JOIN Hotel ON Room.hotel_id = Hotel.hotel_id
GROUP BY category
ORDER BY category;

-- Query 2: Nested - Find hotels with available rooms for given dates
SELECT h.hotel_id, h.address, h.category
FROM Hotel h
WHERE h.hotel_id IN (
    SELECT r.hotel_id
    FROM Room r
    WHERE r.room_id NOT IN (
        SELECT b.room_id
        FROM Booking b
        WHERE b.status = 'active'
        AND b.check_in_date <= '2025-04-20'
        AND b.check_out_date >= '2025-04-15'
    )
    AND r.room_id NOT IN (
        SELECT rt.room_id
        FROM Renting rt
        WHERE rt.start_date <= '2025-04-20'
        AND rt.end_date >= '2025-04-15'
    )
)
AND h.address LIKE '%New York%';

-- Query 3: Find all bookings for a specific customer
SELECT b.booking_id, h.name AS chain_name, 
       htl.address AS hotel_address, r.price,
       b.check_in_date, b.check_out_date
FROM Booking b
JOIN Room r ON b.room_id = r.room_id
JOIN Hotel htl ON r.hotel_id = htl.hotel_id
JOIN Hotel_Chain h ON htl.chain_id = h.chain_id
WHERE b.customer_id = 1;

-- Query 4: Find all hotels with available sea view rooms
SELECT h.hotel_id, h.address, h.category, 
       COUNT(r.room_id) AS available_sea_view_rooms
FROM Hotel h
JOIN Room r ON h.hotel_id = r.hotel_id
WHERE r.view_type = 'sea'
AND r.room_id NOT IN (
    SELECT room_id FROM Booking 
    WHERE status = 'active' 
    AND CURRENT_DATE BETWEEN check_in_date AND check_out_date
)
AND r.room_id NOT IN (
    SELECT room_id FROM Renting
    WHERE CURRENT_DATE BETWEEN start_date AND end_date
)
GROUP BY h.hotel_id
HAVING COUNT(r.room_id) > 0;

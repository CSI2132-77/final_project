-- View 1: Available rooms per area
CREATE VIEW Available_Rooms_Per_Area AS
SELECT 
    h.address AS area,
    COUNT(r.room_id) AS available_rooms,
    MIN(r.price) AS min_price,
    MAX(r.price) AS max_price,
    AVG(r.price) AS avg_price
FROM Hotel h
JOIN Room r ON h.hotel_id = r.hotel_id
WHERE r.room_id NOT IN (
    SELECT room_id FROM Booking 
    WHERE status = 'active' 
    AND CURRENT_DATE BETWEEN check_in_date AND check_out_date
)
AND r.room_id NOT IN (
    SELECT room_id FROM Renting
    WHERE CURRENT_DATE BETWEEN start_date AND end_date
)
GROUP BY h.address;

-- View 2: Aggregated capacity per hotel
CREATE VIEW Hotel_Room_Capacity AS
SELECT 
    h.hotel_id,
    h.address,
    h.category,
    COUNT(r.room_id) AS total_rooms,
    SUM(CASE WHEN r.capacity = 'single' THEN 1 ELSE 0 END) AS single_rooms,
    SUM(CASE WHEN r.capacity = 'double' THEN 1 ELSE 0 END) AS double_rooms,
    SUM(CASE WHEN r.capacity = 'suite' THEN 1 ELSE 0 END) AS suite_rooms
FROM Hotel h
LEFT JOIN Room r ON h.hotel_id = r.hotel_id
GROUP BY h.hotel_id;

-- Bonus View: Revenue by hotel chain
CREATE VIEW Revenue_By_Chain AS
SELECT 
    hc.name AS chain_name,
    COUNT(DISTINCT h.hotel_id) AS hotel_count,
    SUM(r.price * (rt.end_date - rt.start_date)) AS total_revenue
FROM Hotel_Chain hc
JOIN Hotel h ON hc.chain_id = h.chain_id
JOIN Room r ON h.hotel_id = r.hotel_id
JOIN Renting rt ON r.room_id = rt.room_id
GROUP BY hc.name
ORDER BY total_revenue DESC;

-- Trigger to maintain hotel_count in Hotel_Chain
CREATE OR REPLACE FUNCTION update_hotel_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE Hotel_Chain 
        SET hotel_count = (SELECT COUNT(*) FROM Hotel WHERE chain_id = NEW.chain_id)
        WHERE chain_id = NEW.chain_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE Hotel_Chain 
        SET hotel_count = (SELECT COUNT(*) FROM Hotel WHERE chain_id = OLD.chain_id)
        WHERE chain_id = OLD.chain_id;
    ELSIF TG_OP = 'UPDATE' AND NEW.chain_id != OLD.chain_id THEN
        UPDATE Hotel_Chain SET hotel_count = (SELECT COUNT(*) FROM Hotel WHERE chain_id = OLD.chain_id) WHERE chain_id = OLD.chain_id;
        UPDATE Hotel_Chain SET hotel_count = (SELECT COUNT(*) FROM Hotel WHERE chain_id = NEW.chain_id) WHERE chain_id = NEW.chain_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER hotel_count_trigger
AFTER INSERT OR DELETE OR UPDATE OF chain_id ON Hotel
FOR EACH ROW
EXECUTE FUNCTION update_hotel_count();

-- Trigger to maintain room_count in Hotel
CREATE OR REPLACE FUNCTION update_room_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE Hotel 
        SET room_count = (SELECT COUNT(*) FROM Room WHERE hotel_id = NEW.hotel_id)
        WHERE hotel_id = NEW.hotel_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE Hotel 
        SET room_count = (SELECT COUNT(*) FROM Room WHERE hotel_id = OLD.hotel_id)
        WHERE hotel_id = OLD.hotel_id;
    ELSIF TG_OP = 'UPDATE' AND NEW.hotel_id != OLD.hotel_id THEN
        UPDATE Hotel SET room_count = (SELECT COUNT(*) FROM Room WHERE hotel_id = OLD.hotel_id) WHERE hotel_id = OLD.hotel_id;
        UPDATE Hotel SET room_count = (SELECT COUNT(*) FROM Room WHERE hotel_id = NEW.hotel_id) WHERE hotel_id = NEW.hotel_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER room_count_trigger
AFTER INSERT OR DELETE OR UPDATE OF hotel_id ON Room
FOR EACH ROW
EXECUTE FUNCTION update_room_count();

-- Trigger to enforce one manager per hotel
CREATE OR REPLACE FUNCTION check_manager_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role = 'manager' AND (
        SELECT COUNT(*) 
        FROM Employee 
        WHERE hotel_id = NEW.hotel_id AND role = 'manager'
    ) >= 1 THEN
        RAISE EXCEPTION 'Each hotel can have only one manager';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER enforce_manager_count
BEFORE INSERT OR UPDATE ON Employee
FOR EACH ROW
EXECUTE FUNCTION check_manager_count();

-- Trigger to archive completed bookings automatically
CREATE OR REPLACE FUNCTION archive_completed_bookings()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        INSERT INTO Booking_Archive
        SELECT * FROM Booking WHERE booking_id = NEW.booking_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_archive_bookings
AFTER UPDATE ON Booking
FOR EACH ROW
EXECUTE FUNCTION archive_completed_bookings();

-- Trigger to prevent price reduction more than 20%
CREATE OR REPLACE FUNCTION prevent_large_price_drops()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.price < OLD.price * 0.8 THEN
        RAISE EXCEPTION 'Cannot reduce price by more than 20%%';
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_price_check
BEFORE UPDATE ON Room
FOR EACH ROW
EXECUTE FUNCTION prevent_large_price_drops();

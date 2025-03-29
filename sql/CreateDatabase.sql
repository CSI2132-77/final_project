-- Ensure the database exists
CREATE DATABASE hotel_management;

-- Create the user with the specified credentials
CREATE USER hotel_admin WITH PASSWORD 'admin';

-- Set configurations for the user
ALTER ROLE hotel_admin SET client_encoding TO 'utf8';
ALTER ROLE hotel_admin SET default_transaction_isolation TO 'read committed';
ALTER ROLE hotel_admin SET timezone TO 'UTC';

-- Grant full privileges on the database to the user
GRANT ALL PRIVILEGES ON DATABASE hotel_management TO hotel_admin;
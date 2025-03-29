# Database Setup

## Enable custom username connections

```sh
# Update Libraries
sudo apt update && sudo apt upgrade -y
# Install postgreSQL
sudo apt install postgresql postgresql-contrib -y
# to connect witha custom user name of hotel_admin
# you must changet he text below from peer to md5
# local   all    all    peer
# to
# local   all    all    md5
sudo nano /etc/postgresql/{version}/main/pg_hba.conf
# restart terminal
wsl --shutdown
```

## setup sql database

```sh
# Start postgreSQL
sudo service postgresql start && sudo service postgresql status
# Switch to the PostgreSQL User
sudo -i -u postgres
# Access PostgreSQL Command Line
psql
```

```sql
CREATE DATABASE hotel_management;
CREATE USER hotel_admin WITH PASSWORD 'admin';
ALTER ROLE hotel_admin SET client_encoding TO 'utf8';
ALTER ROLE hotel_admin SET default_transaction_isolation TO 'read committed';
ALTER ROLE hotel_admin SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE hotel_management TO hotel_admin;
-- Exit the PostgreSQL Command Line
\q
```

```sh
# Logout of the database as postgres user
exit
# Login to the database as hotel_admin user
psql -U hotel_admin -d hotel_management
```

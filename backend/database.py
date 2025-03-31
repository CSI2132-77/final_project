from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import logging
import os
from dotenv import load_dotenv
load_dotenv()

# DATABASE_URL = os.getenv("DATABASE_URL")
POSTGRES_USER = os.getenv("POSTGRES_USER")
POSTGRES_PASSWORD = os.getenv("POSTGRES_PASSWORD")
POSTGRES_DB = os.getenv("POSTGRES_DB")
DATABASE_URL = f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/{POSTGRES_DB}"

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s")

# Paths to SQL scripts
setup_database_path           = "./sql/CreateDatabase.sql"
setup_database_tables_path   = "./sql/DatabaseImplementationCode.sql"
setup_indexes_path           = "./sql/Indexes.sql"
setup_views_path             = "./sql/Views.sql"
setup_triggers_path          = "./sql/Triggers_ModificationCode.sql"
setup_database_populate_path = "./sql/DatabasePopulation.sql"

# Create an engine that manages connections to the database
try:
    engine = create_engine(DATABASE_URL, isolation_level="AUTOCOMMIT")
    Session = sessionmaker(bind=engine)
    logging.info("Database connection established")
except Exception as error:
    logging.error(f"ERROR - connecting to database: {error}")
    raise

def create_database():
    """Create the database if it doesn't exist."""
    try:
        # Connect to the default 'postgres' database to create a new database
        default_engine = create_engine(
            f"postgresql://{POSTGRES_USER}:{POSTGRES_PASSWORD}@db:5432/postgres",
            isolation_level="AUTOCOMMIT"
        )
        with default_engine.connect() as connection:
            # Check if the database already exists
            result = connection.execute(
                text(f"SELECT 1 FROM pg_database WHERE datname = '{POSTGRES_DB}'")
            )
            if not result.fetchone():
                # Create the database if it doesn't exist
                connection.execute(text(f"CREATE DATABASE {POSTGRES_DB}"))
                logging.info(f"SUCCESS - Database '{POSTGRES_DB}' created")
            else:
                logging.info(f"EXISTANCE - Database '{POSTGRES_DB}' already exists, skipping creation of user: '{POSTGRES_USER}'")

            # Create the user with the specified credentials if it doesn't exist
            result = connection.execute(
                text(f"SELECT 1 FROM pg_roles WHERE rolname = '{POSTGRES_USER}'")
            )
            if not result.fetchone():
                connection.execute(text(f"CREATE USER {POSTGRES_USER} WITH PASSWORD '{POSTGRES_PASSWORD}'"))
                logging.info(f"SUCCESS - User '{POSTGRES_USER}'")
            else:
                logging.info(f"EXISTANCE - User '{POSTGRES_USER}' already exists, skipping altering role for {POSTGRES_USER}")

            # Set configurations for the user
            connection.execute(text(f"ALTER ROLE {POSTGRES_USER} SET client_encoding TO 'utf8'"))
            connection.execute(text(f"ALTER ROLE {POSTGRES_USER} SET default_transaction_isolation TO 'read committed'"))
            connection.execute(text(f"ALTER ROLE {POSTGRES_USER} SET timezone TO 'UTC'"))
            logging.info(f"Configurations set for user '{POSTGRES_USER}'")

            # Grant full privileges on the database to the user
            connection.execute(text(f"GRANT ALL PRIVILEGES ON DATABASE {POSTGRES_DB} TO {POSTGRES_USER}"))
            logging.info(f"Granted all privileges on database '{POSTGRES_DB}' to user '{POSTGRES_USER}'")
    except Exception as error:
        logging.error(f"ERROR - creating database or user: {error}")
        raise

def execute_sql_script(filepath):
    """Execute an SQL script from a file."""
    try:
        with open(filepath, 'r') as file:
            sql_file = file.read()

        with engine.connect() as connection:
            connection.execute(text(sql_file))
            connection.commit()

        logging.info("SUCCESS - SQL script executed")
    except Exception as error:
        logging.error(f"ERROR - executing SQL script {filepath}: {error}")
        raise

def execute_sql_script_ordered(filepath):
    """Execute an SQL script from a file, ensuring statements execute in order."""
    try:
        with open(filepath, 'r') as file:
            sql_script = file.read()

        statements = [stmt.strip() for stmt in sql_script.split(";") if stmt.strip()]

        with engine.connect() as connection:
            transaction = connection.begin()
            try:
                for statement in statements:
                    connection.execute(text(statement))
                    logging.info(f"SUCCESS - executed SQL line: {statement}")
                transaction.commit()
                logging.info("SUCCESS - SQL script executed in order")
            except Exception as error:
                transaction.rollback()
                logging.error(f"SQL execution error: {error}")
                raise
    except Exception as error:
        logging.error(f"ERROR - reading SQL file: {error}")
        raise

def initialize_database():
    """Create tables and populate data"""
    try:
        # Check if the tables already exist
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'")
            )
            existing_tables = [row[0] for row in result.fetchall()]
            if existing_tables:
                logging.info(f"EXISTANCE - Tables already exist: {existing_tables}, skipping creation")
            else:
                execute_sql_script(setup_database_tables_path)
                logging.info("SUCCESS - Tables created")
    except Exception as error:
        logging.error(f"ERROR - creating tables: {error}")
        raise

    try:
        # Check if any of the indexes already exist
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT indexname FROM pg_indexes WHERE schemaname = 'public'")
            )
            existing_indexes = [row[0] for row in result.fetchall()]
            if existing_indexes:
                logging.info(f"EXISTANCE - Indexes already exist: {existing_indexes}, skipping creation")
            else:
                execute_sql_script(setup_indexes_path)
                logging.info("SUCCESS - Indexes created")
    except Exception as error:
        logging.error(f"ERROR - creating indexes: {error}")

    try:
        # Check if any of the views already exist
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT table_name FROM information_schema.views WHERE table_schema = 'public'")
            )
            existing_views = [row[0] for row in result.fetchall()]
            if existing_views:
                logging.info(f"EXISTANCE - Views already exist: {existing_views}, skipping creation")
            else:
                execute_sql_script(setup_views_path)
                logging.info("SUCCESS - Views created")
    except Exception as error:
        logging.error(f"ERROR - creating or checking views: {error}")

    try:
        # Check if any of the triggers already exist
        with engine.connect() as connection:
            result = connection.execute(
                text("SELECT trigger_name FROM information_schema.triggers WHERE trigger_schema = 'public'")
            )
            existing_triggers = [row[0] for row in result.fetchall()]
            if existing_triggers:
                logging.info(f"EXISTANCE - Triggers already exist: {existing_triggers}, skipping creation")
            else:
                execute_sql_script(setup_triggers_path)
                logging.info("SUCCESS - Triggers created")
    except Exception as error:
        logging.error(f"ERROR - creating triggers: {error}")

    try:
        execute_sql_script_ordered(setup_database_populate_path)
        logging.info("SUCCESS - Tables populated")
    except Exception as error:
        logging.error(f"ERROR - populating tables: {error}")

def get_db():
    """
    Get a new database session.
    Required for FastAPI dependency injection into API routes
    """
    db = Session()
    logging.info("New database session created")
    try:
        yield db
    finally:
        db.close()
        logging.info("Database session closed")
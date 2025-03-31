from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import logging
import os
from dotenv import load_dotenv
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s")

# Paths to SQL scripts
setup_database_tables_path   = "../sql/DatabaseImplementationCode.sql"
setup_database_populate_path = "../sql/DatabasePopulation.sql"

# Create an engine that manages connections to the database
try:
    engine = create_engine(DATABASE_URL, isolation_level="AUTOCOMMIT")
    Session = sessionmaker(bind=engine)
    logging.info("Database connection established")
except Exception as error:
    logging.error(f"Error connecting to database: {error}")
    raise

def execute_sql_script(filepath):
    """Execute an SQL script from a file."""
    try:
        with open(filepath, 'r') as file:
            sql_commands = file.read().split(';')

        with engine.connect() as connection:
            # Execute each command in the script
            for command in sql_commands:
                command = command.strip()
                if command:
                    connection.execute(text(command))
            connection.commit()
        logging.info("SQL script executed successfully")
    except Exception as error:
        logging.error(f"Error executing SQL script: {error}")
        raise

def execute_query(query, params=None):
    """Execute a single SQL query with optional parameters."""
    try:
        with engine.connect() as connection:
            connection.execute(text(query), params)
            connection.commit()
        logging.info("Query executed successfully")
    except Exception as error:
        logging.error(f"Error executing query: {error}")
        raise

def create_database():
    """Create the database if it doesn't exist."""
    execute_sql_script(setup_database_tables_path)
    logging.info("Tables created successfully")
    execute_sql_script(setup_database_populate_path)
    logging.info("Tables populated successfully")

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
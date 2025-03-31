from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
import logging
from dotenv import load_dotenv
import os
# Load environment variables from a .env file
load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s")

setup_database_tables_path   = "../sql/DatabaseImplementationCode.sql"
setup_database_populate_path = "../sql/DatabasePopulation.sql"

class Database:
    def __init__(self, db_url):
        """Initialize the database connection."""
        self.db_url = db_url
        self.engine = None
        self.Session = None

        try:
            # Create an engine that manages connections to the database
            self.engine = create_engine(self.db_url, isolation_level="AUTOCOMMIT")
            self.Session = sessionmaker(bind=self.engine)
            logging.info("Database connection established")
        except Exception as error:
            logging.error(f"Error connecting to database: {error}")
            raise

    def execute_sql_script(self, filepath):
        """Execute an SQL script from a file."""
        try:
            with open(filepath, 'r') as file:
                sql_commands = file.read().split(';')

            with self.engine.connect() as connection:
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

    def execute_query(self, query, params=None):
        """Execute a single SQL query with optional parameters."""
        try:
            with self.engine.connect() as connection:
                connection.execute(text(query), params)
                connection.commit()
            logging.info("Query executed successfully")
        except Exception as error:
            logging.error(f"Error executing query: {error}")
            raise

    def create_database(self):
        """Create the database if it doesn't exist."""
        self.execute_sql_script(setup_database_tables_path)
        logging.info("Tables created successfully")
        self.execute_sql_script(setup_database_populate_path)
        logging.info("Tables populated successfully")

def get_db():
    """Get a new database session."""
    db = Database.Session()
    logging.info("New database session created")
    try:
        yield db
    finally:
        db.close()
        logging.info("Database session closed")
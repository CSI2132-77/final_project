import psycopg2
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s")

class Database:
    def __init__(self, db_url):
        """Initialize the database connection."""
        self.db_url = db_url
        self.connection = None

        try:
            self.connection = psycopg2.connect(self.db_url)
            logging.info("Database connection established")
        except psycopg2.Error as error:
            logging.error(f"Error connecting to database: {error}")
            raise

    def close_connection(self):
        """Close the database connection."""
        if self.connection:
            self.connection.close()
            logging.info("Database connection closed")

    def execute_sql_script(self, filepath):
        """Execute an SQL script from a file."""
        try:
            with self.connection.cursor() as cursor, open(filepath, 'r') as file:
                sql_commands = file.read().split(';')

                for command in sql_commands:
                    command = command.strip()
                    if command:
                        cursor.execute(command)

            self.connection.commit()
            logging.info("SQL script executed successfully")
        except Exception as error:
            self.connection.rollback()
            logging.error(f"Error executing SQL script: {error}")
            raise

    def execute_query(self, query, params=None):
        """Execute a single SQL query with optional parameters."""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, params)
                self.connection.commit()
            logging.info("Query executed successfully")
        except Exception as error:
            self.connection.rollback()
            logging.error(f"Error executing query: {error}")
            raise

    def get_data(self, query, params=None):
        """Execute a query and fetch all results."""
        try:
            with self.connection.cursor() as cursor:
                cursor.execute(query, params)
                result = cursor.fetchall()
            logging.info("Data fetched successfully")
            return result
        except Exception as error:
            logging.error(f"Error fetching data: {error}")
            raise

    def create_tables(self, filepath):
        """Create tables from an SQL file."""
        self.execute_sql_script(filepath)

    def populate_tables(self, filepath):
        """Populate tables from an SQL file."""
        self.execute_sql_script(filepath)

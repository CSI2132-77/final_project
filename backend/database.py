# from sqlalchemy import create_engine, text
# from sqlalchemy.ext.declarative import declarative_base
# from sqlalchemy.orm import sessionmaker
# from sqlalchemy import Column, Integer, String
import psycopg2

class database:
  def __init__(self, db_url):
    self.db_url = db_url
    self.connection = None
    self.cursor = None

  def db_connection(self):
    """Set up the database connection"""
    try:
      # Connect to the PostgreSQL database
      self.connection = psycopg2.connect(self.db_url)
      self.cursor = self.connection.cursor()
      print("Database connection established")
      return self.connection
    except Exception as error:
      print(f"Error connecting to database: {error}")

  # Function to execute the SQL script
  def execute_sql_script(self, filepath):
    try:
      # Establish a connection to the database
      self.connection = self.db_connection()
      if self.connection is None:
        raise Exception("Failed to establish database connection")
      self.cursor = self.connection.cursor()
      # Open and read the SQL file
      with open(filepath, 'r') as file:
          sql_script = file.read()
      # Execute the SQL commands from the script
      self.cursor.execute(sql_script)
      # Commit the transaction
      self.connection.commit()
      print("SQL script executed successfully")
    except Exception as error:
      print(f"Error executing SQL script: {error}")

  def create_tables(self, filepath):
    """Create tables in the database from SQL files"""
    self.execute_sql_script(filepath)

  def populate_tables(self, filepath):
    """Populate tables in the database from SQL files"""
    self.execute_sql_script(filepath)

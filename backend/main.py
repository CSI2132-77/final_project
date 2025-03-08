from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
import uvicorn

app = FastAPI()

# ***** CORS Middleware ***** #
# This will allow all origins to access the API.
# Why do we need CORSMiddleware?
# In order to make cross-origin requests forma  different port
# you need to enable Cross Origin Resource Sharing (CORS).
# FastAPI's built-in CORSMiddleware handles this for us.
origins = [
    "http://localhost:3000",
    "localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "SUCCESS: You got the root GET"}




#***** Below is SQL related REST *****#

# # Run with: uvicorn main:app --reload
# # Run with: fastapi dev
# # open http://localhost:8000/docs for GUI or http://127.0.0.1:8000/ for JSON
# @app.get("/")
# def read_root():
# 	return {"Hello": "World"}

# # Pydantic model for item data
# class data_point(BaseModel):
#   name: str
#   description: str

# #*********    In-Memory Database    *********#
# example_DB = []

# #*********    Database Connection    *********#
# #* Connect to the PostgreSQL database server *#
# def get_connection() -> psycopg2.connect:
#   connection = None
#   try:
#     connection = psycopg2.connect(
#       database="title_of_database",
#       user="postgres",
#       password="password",
#       host="127.0.0.1",
#       port=5432,
#     )
#   except (Exception, psycopg2.Error) as error:
#     print("Error while connecting to PostgreSQL", error)
#   return connection

# #*********    FastAPI Database Operations    *********#
# #* Create table in the PostgreSQL database *#
# def create_table() -> None:
#   connection = get_connection()
#   cursor = connection.cursor()
#   try:
#     cursor.execute(
#       """
#       CREATE TABLE IF NOT EXISTS data (
#         id SERIAL PRIMARY KEY,
#         name VARCHAR(255) NOT NULL,
#         description TEXT NOT NULL
#       )
#       """
#     )
#     connection.commit()
#   except (Exception, psycopg2.Error) as error:
#     print("Error while creating PostgreSQL table", error)
#   finally:
#     cursor.close()
#     connection.close()

# # try:
# #   create_table()
# # except Exception as e:
# #   print(f"\033[91mError: {e}\033[0m")

# #* Insert data into the PostgreSQL database *#
# def insert_data(name: str, description: str) -> None:
#   connection = get_connection()
#   cursor = connection.cursor()
#   try:
#     cursor.execute(
#       """
#       INSERT INTO data (name, description)
#       VALUES (%s, %s)
#       """,
#       (name, description),
#     )
#     connection.commit()
#   except (Exception, psycopg2.Error) as error:
#     print("Error while inserting data into PostgreSQL", error)
#   finally:
#     cursor.close()
#     connection.close()

# #* Retrieve data from the PostgreSQL database *#
# def retrieve_data() -> list[dict]:
#   connection = get_connection()
#   cursor = connection.cursor()
#   try:
#     cursor.execute("SELECT * FROM data")
#     data = cursor.fetchall()
#     return data
#   except (Exception, psycopg2.Error) as error:
#     print("Error while retrieving data from PostgreSQL", error)
#   finally:
#     cursor.close()
#     connection.close()

# #* Update data in the PostgreSQL database *#
# def update_data(id: int, name: str, description: str) -> None:
#   connection = get_connection()
#   cursor = connection.cursor()
#   try:
#     cursor.execute(
#       """
#       UPDATE data
#       SET name = %s, description = %s
#       WHERE id = %s
#       """,
#       (name, description, id),
#     )
#     connection.commit()
#   except (Exception, psycopg2.Error) as error:
#     print("Error while updating data in PostgreSQL", error)
#   finally:
#     cursor.close()
#     connection.close()

# #* Delete data from the PostgreSQL database *#
# def delete_data(id: int) -> None:
#   connection = get_connection()
#   cursor = connection.cursor()
#   try:
#     cursor.execute("DELETE FROM data WHERE id = %s", (id,))
#     connection.commit()
#   except (Exception, psycopg2.Error) as error:
#     print("Error while deleting data from PostgreSQL", error)
#   finally:
#     cursor.close()
#     connection.close()

# #*********    FastAPI Routes    *********#
# #* Create an item in the PostgreSQL database *#
# # @app.post("/data/", response_model=data_point)
# # async def create_data(item: data_point):
# #   insert_data(item.name, item.description)
# #   return item

# # #* Read an item from the PostgreSQL database *#
# # @app.get("/data/{primary_key}", response_model=data_point)
# # async def read_item(primary_key: int):
# #   data = retrieve_data()
# #   if primary_key < 0 or primary_key >= len(data):
# #     raise HTTPException(status_code=404, detail="Item not found")
# #   return data[primary_key]

# # #* Update an item in the PostgreSQL database *#
# # @app.put("/data/{primary_key}", response_model=data_point)
# # async def update_item(primary_key: int, item: data_point):
# #   data = retrieve_data()
# #   if primary_key < 0 or primary_key >= len(data):
# #     raise HTTPException(status_code=404, detail="Item not found")
# #   update_data(primary_key, item.name, item.description)
# #   return item

# # #* Delete an item from the PostgreSQL database *#
# # @app.delete("/data/{primary_key}", response_model=data_point)
# # async def delete_item(primary_key: int):
# #   data = retrieve_data()
# #   if primary_key < 0 or primary_key >= len(data):
# #     raise HTTPException(status_code=404, detail="Item not found")
# #   delete_data(primary_key)
# #   return data[primary_key]


# # #*********    OLD Default FastAPI Routes    *********#
# # # Create an item
# @app.post("/data/", response_model=data_point)
# async def create_data(item: data_point):
#     example_DB.append(item)
#     return item

# # Read an item
# @app.get("/data/{primary_key}", response_model=data_point)
# async def read_item(primary_key: int):
#     if primary_key < 0 or primary_key >= len(example_DB):
#         raise HTTPException(status_code=404, detail="Item not found")
#     return example_DB[primary_key]

# # Update an item
# @app.put("/data/{primary_key}", response_model=data_point)
# async def update_item(primary_key: int, item: data_point):
#     if primary_key < 0 or primary_key >= len(example_DB):
#         raise HTTPException(status_code=404, detail="Item not found")

#     example_DB[primary_key] = item
#     return item

# # Delete an item
# @app.delete("/data/{primary_key}", response_model=data_point)
# async def delete_item(primary_key: int):
#     if primary_key < 0 or primary_key >= len(example_DB):
#         raise HTTPException(status_code=404, detail="Item not found")

#     deleted_item = example_DB.pop(primary_key)
#     return "DELETED THE FOLLOWING: " + deleted_item

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)

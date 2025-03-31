from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import logging
from typing import Any
from database import create_database
from routes.read import router as read
from routes.read_special import router as read_special
from routes.read_extra import router as read_extra
from routes.create import router as create
from routes.update import router as update
from routes.delete import router as delete
from routes.book_or_rent import router as book_or_rent
from routes.views import router as views

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s")

# ***** FastAPI ***** #
# Routes to organize the API endpoints
app = FastAPI()
app.include_router(create)
app.include_router(read)
app.include_router(read_special)
app.include_router(read_extra)
app.include_router(update)
app.include_router(delete)
app.include_router(book_or_rent)
app.include_router(views)

# Mount a static directory to serve static favicon
app.mount("/static", StaticFiles(directory="static"), name="static")

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

#* regenerate the database if needed
#* remove datatable with
# DROP TABLE IF EXISTS
#    Renting, Booking, Employee, Customer, Room_Problem, Room_Amenity, Room,
#    Hotel_Contact, Hotel, Chain_Contact, Hotel_Chain
# CASCADE;
# create_database()

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "SUCCESS: You got the root GET"}

# Route to serve the favicon
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("static/favicon.ico")

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)

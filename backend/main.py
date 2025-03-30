from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import uvicorn
import logging
from typing import Any
from routes.whole_table_gets import router as whole_table_gets
from routes.specific_gets import router as speific_gets

logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s - %(message)s")

# ***** FastAPI ***** #
# Routes to organize the API endpoints
app = FastAPI()
app.include_router(whole_table_gets)
app.include_router(speific_gets)

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

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "SUCCESS: You got the root GET"}

# Route to serve the favicon
@app.get("/favicon.ico", include_in_schema=False)
async def favicon():
    return FileResponse("static/favicon.ico")

if __name__ == "__main__":
    uvicorn.run("app.api:app", host="0.0.0.0", port=8000, reload=True)

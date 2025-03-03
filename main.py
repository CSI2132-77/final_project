from fastapi import FastAPI
from pydantic import BaseModel
app = FastAPI()

# example
example_DB = []

# Run with: uvicorn main:app --reload
# open http://localhost:8000/docs for GUI or http://127.0.0.1:8000/ for JSON
@app.get("/")
def read_root():
	return {"Hello": "World"}


# Pydantic model for item data
class data_point(BaseModel):
    name: str
    description: str

# Create an item
@app.post("/data/", response_model=data_point)
async def create_data(item: data_point):
    example_DB.append(item)
    return item

# Read an item
@app.get("/data/{primary_key}", response_model=data_point)
async def read_item(primary_key: int):
    if primary_key < 0 or primary_key >= len(example_DB):
        raise app.HTTPException(status_code=404, detail="Item not found")
    return data_point[primary_key]

# Update an item
@app.put("/data/{primary_key}", response_model=data_point)
async def update_item(primary_key: int, item: data_point):
    if primary_key < 0 or primary_key >= len(example_DB):
        raise app.HTTPException(status_code=404, detail="Item not found")

    example_DB[primary_key] = item
    return item

# Delete an item
@app.delete("/data/{primary_key}", response_model=data_point)
async def delete_item(primary_key: int):
    if primary_key < 0 or primary_key >= len(example_DB):
        raise app.HTTPException(status_code=404, detail="Item not found")

    deleted_item = example_DB.pop(primary_key)
    return deleted_item
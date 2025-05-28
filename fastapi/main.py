from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json
import os
from typing import List
from collections.abc import Sequence

app = FastAPI()
DATA_FILE = "data.json"

# Ensure file exists
if not os.path.exists(DATA_FILE):
    with open(DATA_FILE, "w") as f:
        json.dump([], f)

class Item(BaseModel):
    id: int
    name: str
    description: str = ""

def read_data():
    with open(DATA_FILE, "r") as f:
        return json.load(f)

def write_data(data):
    with open(DATA_FILE, "w") as f:
        json.dump(data, f, indent=4)

# Create
@app.post("/items/", response_model=Item)
def create_item(item: Item):
    data = read_data()
    if any(i["id"] == item.id for i in data):
        raise HTTPException(status_code=400, detail="Item with this ID already exists")
    data.append(item.model_dump())
    write_data(data)
    return item

# Read all
@app.get("/items/", response_model=List[Item])
def get_items():
    return read_data()

# Read one
@app.get("/items/{item_id}", response_model=Item)
def get_item(item_id: int):
    data = read_data()
    for item in data:
        if item["id"] == item_id:
            return item
    raise HTTPException(status_code=404, detail="Item not found")

# Update
@app.put("/items/{item_id}", response_model=Item)
def update_item(item_id: int, updated_item: Item):
    data = read_data()
    for index, item in enumerate(data):
        if item["id"] == item_id:
            data[index] = updated_item.model_dump()
            write_data(data)
            return updated_item
    raise HTTPException(status_code=404, detail="Item not found")

# Delete
@app.delete("/items/{item_id}")
def delete_item(item_id: int):
    data = read_data()
    for index, item in enumerate(data):
        if item["id"] == item_id:
            del data[index]
            write_data(data)
            return {"message": "Item deleted"}
    raise HTTPException(status_code=404, detail="Item not found")

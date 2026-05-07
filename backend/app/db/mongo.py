import os

from motor.motor_asyncio import AsyncIOMotorClient
from dotenv import load_dotenv

load_dotenv()

MONGO_URL = os.getenv("MONGODB_URI")

client = AsyncIOMotorClient(MONGO_URL)

db = client["planner_agent"]
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings
from app.core.logging import logger

class MongoDB:
    client: AsyncIOMotorClient = None
    db = None

    async def connect_to_storage(self):
        logger.info("Connecting to MongoDB...")
        self.client = AsyncIOMotorClient(settings.MONGODB_URI)
        self.db = self.client[settings.DATABASE_NAME]
        logger.info("Connected to MongoDB successfully.")

    async def close_storage_connection(self):
        logger.info("Closing MongoDB connection...")
        if self.client:
            self.client.close()
        logger.info("MongoDB connection closed.")

db_manager = MongoDB()

async def get_database():
    return db_manager.db
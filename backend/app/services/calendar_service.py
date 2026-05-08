from datetime import datetime
from typing import List, Optional
from app.db.mongo import db_manager
from bson import ObjectId

async def create_calendar_event(event_data: dict, user_id: str):
    event_data["user_id"] = user_id
    event_data["created_at"] = datetime.utcnow()
    # Ensure times are in UTC (assuming they come in as ISO strings or datetime objects)
    result = await db_manager.db.calendar_events.insert_one(event_data)
    return str(result.inserted_id)

async def get_calendar_events(user_id: str, start_date: datetime, end_date: datetime):
    query = {
        "user_id": user_id,
        "start_time": {"$gte": start_date, "$lte": end_date}
    }
    events = []
    cursor = db_manager.db.calendar_events.find(query).sort("start_time", 1)
    async for event in cursor:
        event["id"] = str(event["_id"])
        events.append(event)
    return events

async def update_calendar_event(event_id: str, event_data: dict, user_id: str):
    result = await db_manager.db.calendar_events.update_one(
        {"_id": ObjectId(event_id), "user_id": user_id},
        {"$set": event_data}
    )
    return result.modified_count > 0

async def delete_calendar_event(event_id: str, user_id: str):
    result = await db_manager.db.calendar_events.delete_one(
        {"_id": ObjectId(event_id), "user_id": user_id}
    )
    return result.deleted_count > 0

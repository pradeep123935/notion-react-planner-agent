from datetime import datetime
from typing import List, Optional
from app.db.mongo import db_manager
from app.core.logging import logger
from app.services.llm import generate_tasks
from bson import ObjectId

async def generate_and_insert_ai_tasks(prompt: str, user_id: str):
    ai_tasks = generate_tasks(prompt)
    logger.info(f"Generated AI Tasks for user {user_id}: {ai_tasks}")
    inserted_ids = []
    for task in ai_tasks:
        task_data = {
            "title": task.title,
            "priority": task.priority,
            "category": task.category,
            "estimated_minutes": task.estimated_minutes,
            "status": "todo",
            "user_id": user_id
        }
        task_id = await create_task(task_data, user_id)
        inserted_ids.append(task_id)
    return inserted_ids

async def create_task(task_data: dict, user_id: str):
    task_data["user_id"] = user_id
    task_data["created_at"] = datetime.utcnow()
    result = await db_manager.db.tasks.insert_one(task_data)
    return str(result.inserted_id)

async def get_tasks(user_id: str, status: Optional[str] = None):
    query = {"user_id": user_id}
    if status:
        query["status"] = status
    
    tasks = []
    cursor = db_manager.db.tasks.find(query)
    async for task in cursor:
        task["id"] = str(task["_id"])
        tasks.append(task)
    return tasks

async def update_task(task_id: str, task_data: dict, user_id: str):
    result = await db_manager.db.tasks.update_one(
        {"_id": ObjectId(task_id), "user_id": user_id},
        {"$set": task_data}
    )
    return result.modified_count > 0

async def delete_task(task_id: str, user_id: str):
    result = await db_manager.db.tasks.delete_one(
        {"_id": ObjectId(task_id), "user_id": user_id}
    )
    return result.deleted_count > 0
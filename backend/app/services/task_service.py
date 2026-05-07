from datetime import datetime

from app.db.mongo import db


async def create_task(task_data: dict):
    task_data["created_at"] = datetime.utcnow()
    result = await db.tasks.insert_one(task_data)
    return str(result.inserted_id)


async def get_tasks():
    tasks = []
    cursor = db.tasks.find()
    async for task in cursor:
        task["_id"] = str(task["_id"])
        tasks.append(task)
    return tasks
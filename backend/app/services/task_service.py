from datetime import datetime


from app.db.mongo import db
from app.services.llm import generate_tasks

async def generate_and_insert_ai_tasks(prompt: str):
    ai_tasks = generate_tasks(prompt)
    print(f"Generated AI Tasks: {ai_tasks}")
    inserted_ids = []
    for task in ai_tasks:
        task_data = {
            "title": task.title,
            "priority": task.priority,
            "category": task.category,
            "estimated_minutes": task.estimated_minutes,
            "status": "todo"
        }
        task_id = await create_task(task_data)
        inserted_ids.append(task_id)
    return inserted_ids


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
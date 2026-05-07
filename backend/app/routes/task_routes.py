from fastapi import APIRouter

from app.models.task import TaskCreate
from app.services.task_service import (
    create_task,
    get_tasks
)

router = APIRouter()


@router.post("/tasks")
async def add_task(task: TaskCreate):
    task_id = await create_task(task.dict())
    return {
        "task_id": task_id
    }


@router.get("/tasks")
async def fetch_tasks():
    return await get_tasks()
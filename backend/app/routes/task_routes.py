from app.models.ai_task import AITaskGenRequest
from fastapi import APIRouter

from app.models.task import TaskCreate
from app.services.task_service import (
    create_task,
    get_tasks
)
from app.services.task_service import generate_and_insert_ai_tasks
from fastapi import HTTPException

router = APIRouter()


@router.post("/tasks/ai-generate")
async def ai_generate_tasks(request: AITaskGenRequest):
    try:
        inserted_ids = await generate_and_insert_ai_tasks(request.prompt)
        return {"inserted_task_ids": inserted_ids}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/tasks")
async def add_task(task: TaskCreate):
    task_id = await create_task(task.dict())
    return {
        "task_id": task_id
    }


@router.get("/tasks")
async def fetch_tasks():
    return await get_tasks()
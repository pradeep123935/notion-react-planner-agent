from fastapi import APIRouter, Depends, HTTPException, status
from typing import List, Optional
from app.models.task import TaskCreate, TaskResponse
from app.models.ai_task import AITaskGenRequest
from app.services.task_service import (
    create_task,
    get_tasks,
    update_task,
    delete_task,
    generate_and_insert_ai_tasks
)
from app.routes.deps import get_current_user
from app.db.mongo import db_manager
from bson import ObjectId

router = APIRouter(tags=["tasks"])

@router.post("/ai-generate")
async def ai_generate_tasks(
    request: AITaskGenRequest,
    current_user: dict = Depends(get_current_user)
):
    try:
        inserted_ids = await generate_and_insert_ai_tasks(request.prompt, current_user["id"])
        return {"inserted_task_ids": inserted_ids}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.post("/", response_model=TaskResponse)
async def add_task(
    task: TaskCreate,
    current_user: dict = Depends(get_current_user)
):
    task_id = await create_task(task.model_dump(), current_user["id"])
    return await db_manager.db.tasks.find_one({"_id": ObjectId(task_id)})

@router.get("/", response_model=List[TaskResponse])
async def fetch_tasks(
    status: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    return await get_tasks(current_user["id"], status)

@router.patch("/{task_id}")
async def patch_task(
    task_id: str,
    task_data: dict,
    current_user: dict = Depends(get_current_user)
):
    success = await update_task(task_id, task_data, current_user["id"])
    if not success:
        raise HTTPException(status_code=404, detail="Task not found or unauthorized")
    return {"status": "success"}

@router.delete("/{task_id}")
async def remove_task(
    task_id: str,
    current_user: dict = Depends(get_current_user)
):
    success = await delete_task(task_id, current_user["id"])
    if not success:
        raise HTTPException(status_code=404, detail="Task not found or unauthorized")
    return {"status": "success"}
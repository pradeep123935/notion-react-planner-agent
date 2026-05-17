from datetime import datetime
from typing import List
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.db.mongo import get_database
from app.models.project import ProjectCreate, ProjectResponse, ProjectUpdate
from app.routes.deps import get_current_user

router = APIRouter(tags=["projects"])


def serialize_project(project: dict) -> ProjectResponse:
    project_dict = dict(project)
    project_dict["id"] = str(project_dict.pop("_id"))
    project_dict["user_id"] = str(project_dict["user_id"])
    project_dict["goal_id"] = str(project_dict["goal_id"])
    return ProjectResponse(**project_dict)


async def get_owned_goal(db, goal_id: str, user_id: str) -> dict:
    if not ObjectId.is_valid(goal_id):
        raise HTTPException(status_code=400, detail="Invalid goal id")

    goal = await db.goals.find_one({"_id": ObjectId(goal_id), "user_id": user_id, "status": {"$ne": "archived"}})
    if not goal:
        raise HTTPException(status_code=404, detail="Goal not found")

    return goal


@router.post("/", response_model=ProjectResponse)
async def create_project(project: ProjectCreate, current_user: dict = Depends(get_current_user), db=Depends(get_database)):
    goal = await get_owned_goal(db, project.goal_id, current_user["id"])
    now = datetime.utcnow()
    project_dict = project.model_dump(mode="json")
    project_dict["user_id"] = current_user["id"]
    project_dict["goal_title"] = goal["title"]
    project_dict["progress"] = 100 if project.status == "completed" else 0
    project_dict["created_at"] = now
    project_dict["updated_at"] = now

    result = await db.projects.insert_one(project_dict)
    created_project = await db.projects.find_one({"_id": result.inserted_id})
    return serialize_project(created_project)


@router.get("/", response_model=List[ProjectResponse])
async def list_projects(current_user: dict = Depends(get_current_user), db=Depends(get_database)):
    projects = await db.projects.find({"user_id": current_user["id"], "status": {"$ne": "archived"}}).sort("created_at", -1).to_list(100)
    return [serialize_project(project) for project in projects]


@router.patch("/{project_id}", response_model=ProjectResponse)
async def update_project(project_id: str, project: ProjectUpdate, current_user: dict = Depends(get_current_user), db=Depends(get_database)):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project id")

    update_data = {key: value for key, value in project.model_dump(mode="json", exclude_unset=True).items() if value is not None}

    if "goal_id" in update_data:
        goal = await get_owned_goal(db, update_data["goal_id"], current_user["id"])
        update_data["goal_title"] = goal["title"]

    update_data["updated_at"] = datetime.utcnow()

    result = await db.projects.update_one(
        {"_id": ObjectId(project_id), "user_id": current_user["id"]},
        {"$set": update_data},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    updated_project = await db.projects.find_one({"_id": ObjectId(project_id)})
    return serialize_project(updated_project)


@router.delete("/{project_id}")
async def archive_project(project_id: str, current_user: dict = Depends(get_current_user), db=Depends(get_database)):
    if not ObjectId.is_valid(project_id):
        raise HTTPException(status_code=400, detail="Invalid project id")

    result = await db.projects.update_one(
        {"_id": ObjectId(project_id), "user_id": current_user["id"]},
        {"$set": {"status": "archived", "updated_at": datetime.utcnow()}},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Project not found")

    return {"status": "success"}

from datetime import datetime
from typing import List
from bson import ObjectId
from fastapi import APIRouter, Depends, HTTPException

from app.db.mongo import get_database
from app.models.goal import GoalCreate, GoalResponse, GoalUpdate
from app.routes.deps import get_current_user

router = APIRouter(tags=["goals"])


def serialize_goal(goal: dict) -> GoalResponse:
    goal_dict = dict(goal)
    goal_dict["id"] = str(goal_dict.pop("_id"))
    goal_dict["user_id"] = str(goal_dict["user_id"])
    return GoalResponse(**goal_dict)


@router.post("/", response_model=GoalResponse)
async def create_goal(goal: GoalCreate, current_user: dict = Depends(get_current_user), db=Depends(get_database)):
    now = datetime.utcnow()
    goal_dict = goal.model_dump(mode="json")
    goal_dict["user_id"] = current_user["id"]
    goal_dict["progress"] = 100 if goal.status == "completed" else 0
    goal_dict["created_at"] = now
    goal_dict["updated_at"] = now

    result = await db.goals.insert_one(goal_dict)
    created_goal = await db.goals.find_one({"_id": result.inserted_id})
    return serialize_goal(created_goal)


@router.get("/", response_model=List[GoalResponse])
async def list_goals(current_user: dict = Depends(get_current_user), db=Depends(get_database)):
    goals = await db.goals.find({"user_id": current_user["id"], "status": {"$ne": "archived"}}).sort("created_at", -1).to_list(100)
    return [serialize_goal(goal) for goal in goals]


@router.patch("/{goal_id}", response_model=GoalResponse)
async def update_goal(goal_id: str, goal: GoalUpdate, current_user: dict = Depends(get_current_user), db=Depends(get_database)):
    if not ObjectId.is_valid(goal_id):
        raise HTTPException(status_code=400, detail="Invalid goal id")

    update_data = {key: value for key, value in goal.model_dump(mode="json", exclude_unset=True).items() if value is not None}
    update_data["updated_at"] = datetime.utcnow()

    result = await db.goals.update_one(
        {"_id": ObjectId(goal_id), "user_id": current_user["id"]},
        {"$set": update_data},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Goal not found")

    updated_goal = await db.goals.find_one({"_id": ObjectId(goal_id)})
    return serialize_goal(updated_goal)


@router.delete("/{goal_id}")
async def archive_goal(goal_id: str, current_user: dict = Depends(get_current_user), db=Depends(get_database)):
    if not ObjectId.is_valid(goal_id):
        raise HTTPException(status_code=400, detail="Invalid goal id")

    result = await db.goals.update_one(
        {"_id": ObjectId(goal_id), "user_id": current_user["id"]},
        {"$set": {"status": "archived", "updated_at": datetime.utcnow()}},
    )

    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Goal not found")

    return {"status": "success"}

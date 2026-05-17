from datetime import date, datetime
from typing import Literal, Optional
from pydantic import BaseModel, Field

GoalCategory = Literal["career", "health", "learning", "finance", "personal", "project", "other"]
GoalPriority = Literal["low", "medium", "high"]
GoalStatus = Literal["not_started", "active", "paused", "completed", "archived"]


class GoalCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=160)
    description: Optional[str] = Field(None, max_length=1200)
    category: GoalCategory = "personal"
    priority: GoalPriority = "medium"
    target_date: Optional[date] = None
    status: GoalStatus = "not_started"


class GoalUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=160)
    description: Optional[str] = Field(None, max_length=1200)
    category: Optional[GoalCategory] = None
    priority: Optional[GoalPriority] = None
    target_date: Optional[date] = None
    status: Optional[GoalStatus] = None
    progress: Optional[int] = Field(None, ge=0, le=100)


class GoalResponse(GoalCreate):
    id: str
    user_id: str
    progress: int = 0
    created_at: datetime
    updated_at: datetime

from datetime import date, datetime
from typing import Literal, Optional
from pydantic import BaseModel, Field

ProjectType = Literal["learning", "build", "practice", "research", "admin", "health", "other"]
ProjectPriority = Literal["low", "medium", "high"]
ProjectStatus = Literal["not_started", "active", "paused", "completed", "archived"]


class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=2, max_length=160)
    goal_id: str = Field(..., min_length=1)
    description: Optional[str] = Field(None, max_length=1200)
    type: ProjectType = "other"
    priority: ProjectPriority = "medium"
    target_date: Optional[date] = None
    status: ProjectStatus = "not_started"


class ProjectUpdate(BaseModel):
    title: Optional[str] = Field(None, min_length=2, max_length=160)
    goal_id: Optional[str] = Field(None, min_length=1)
    description: Optional[str] = Field(None, max_length=1200)
    type: Optional[ProjectType] = None
    priority: Optional[ProjectPriority] = None
    target_date: Optional[date] = None
    status: Optional[ProjectStatus] = None
    progress: Optional[int] = Field(None, ge=0, le=100)


class ProjectResponse(ProjectCreate):
    id: str
    user_id: str
    goal_title: str
    progress: int = 0
    created_at: datetime
    updated_at: datetime

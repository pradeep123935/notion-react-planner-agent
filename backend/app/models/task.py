from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class TaskCreate(BaseModel):

    title: str
    description: Optional[str] = None
    priority: str = "medium"
    status: str = "todo"
    category: Optional[str] = None
    estimated_minutes: Optional[int] = None
    energy_level: Optional[str] = None


class TaskResponse(TaskCreate):

    id: str
    created_at: datetime
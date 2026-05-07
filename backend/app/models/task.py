from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

class TaskCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    priority: Literal["low", "medium", "high", "urgent"] = "medium"
    status: Literal["todo", "in_progress", "done", "archived"] = "todo"
    category: Optional[str] = Field(None, max_length=100)
    estimated_minutes: Optional[int] = Field(None, ge=0)
    energy_level: Optional[Literal["low", "medium", "high"]] = None

class TaskResponse(TaskCreate):
    id: str
    created_at: datetime
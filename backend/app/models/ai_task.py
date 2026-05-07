from pydantic import BaseModel
from typing import List, Optional


class AITask(BaseModel):
    title: str
    priority: str = "medium"
    category: Optional[str] = None
    estimated_minutes: Optional[int] = None


class AITaskList(BaseModel):
    tasks: List[AITask]


class AITaskGenRequest(BaseModel):
    prompt: str
    
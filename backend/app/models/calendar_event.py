from pydantic import BaseModel, Field
from typing import Optional, Literal
from datetime import datetime

class CalendarEventCreate(BaseModel):
    title: str = Field(..., min_length=1, max_length=200)
    description: Optional[str] = Field(None, max_length=1000)
    start_time: datetime
    end_time: datetime
    is_all_day: bool = False
    location: Optional[str] = Field(None, max_length=200)
    category: Optional[str] = Field(None, max_length=100)
    color: Optional[str] = Field(None)

class CalendarEventResponse(CalendarEventCreate):
    id: str
    user_id: str
    created_at: datetime

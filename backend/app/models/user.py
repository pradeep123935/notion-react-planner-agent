from pydantic import BaseModel, EmailStr, Field, field_validator
from typing import Optional, Dict
from datetime import datetime
from enum import Enum

class Chronotype(str, Enum):
    MORNING = "morning"
    EVENING = "evening"
    NEUTRAL = "neutral"

class PriorityStrategy(str, Enum):
    DEADLINE_FIRST = "deadline_first"
    IMPORTANCE_FIRST = "importance_first"

class WorkHours(BaseModel):
    start: str = "09:00"
    end: str = "18:00"

class WeekendSchedule(WorkHours):
    enabled: bool = False

class ProductivityProfile(BaseModel):
    chronotype: Chronotype = Chronotype.NEUTRAL
    work_hours_weekday: WorkHours = WorkHours()
    work_hours_weekend: WeekendSchedule = WeekendSchedule()
    preferred_focus_block_mins: int = 60
    buffer_between_tasks_mins: int = 15
    priority_strategy: PriorityStrategy = PriorityStrategy.DEADLINE_FIRST

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
    timezone: str = "UTC"

class UserCreate(UserBase):
    password: str

    @field_validator("password")
    @classmethod
    def validate_password(cls, value: str) -> str:
        if len(value.encode("utf-8")) > 72:
            raise ValueError("Password cannot be longer than 72 bytes")
        if len(value) < 6:
            raise ValueError("Password must be at least 6 characters")
        return value

class UserUpdate(BaseModel):
    full_name: Optional[str] = None
    timezone: Optional[str] = None
    productivity_profile: Optional[ProductivityProfile] = None
    onboarding_completed: Optional[bool] = None

class UserInDB(UserBase):
    id: str
    password_hash: str
    onboarding_completed: bool = False
    productivity_profile: ProductivityProfile = ProductivityProfile()
    created_at: datetime = Field(default_factory=datetime.utcnow)

class UserResponse(UserBase):
    id: str
    onboarding_completed: bool
    productivity_profile: ProductivityProfile
    created_at: datetime

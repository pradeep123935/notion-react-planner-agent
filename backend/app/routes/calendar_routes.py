from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from datetime import datetime
from app.models.calendar_event import CalendarEventCreate, CalendarEventResponse
from app.services.calendar_service import (
    create_calendar_event,
    get_calendar_events,
    update_calendar_event,
    delete_calendar_event
)
from app.routes.deps import get_current_user
from app.db.mongo import db_manager
from bson import ObjectId

router = APIRouter(tags=["calendar"])

@router.post("/", response_model=CalendarEventResponse)
async def add_event(
    event: CalendarEventCreate,
    current_user: dict = Depends(get_current_user)
):
    event_id = await create_calendar_event(event.model_dump(), current_user["id"])
    return await db_manager.db.calendar_events.find_one({"_id": ObjectId(event_id)})

@router.get("/", response_model=List[CalendarEventResponse])
async def fetch_events(
    start_date: datetime,
    end_date: datetime,
    current_user: dict = Depends(get_current_user)
):
    return await get_calendar_events(current_user["id"], start_date, end_date)

@router.patch("/{event_id}")
async def patch_event(
    event_id: str,
    event_data: dict,
    current_user: dict = Depends(get_current_user)
):
    success = await update_calendar_event(event_id, event_data, current_user["id"])
    if not success:
        raise HTTPException(status_code=404, detail="Event not found or unauthorized")
    return {"status": "success"}

@router.delete("/{event_id}")
async def remove_event(
    event_id: str,
    current_user: dict = Depends(get_current_user)
):
    success = await delete_calendar_event(event_id, current_user["id"])
    if not success:
        raise HTTPException(status_code=404, detail="Event not found or unauthorized")
    return {"status": "success"}

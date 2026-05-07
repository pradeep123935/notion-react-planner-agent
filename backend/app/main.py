from fastapi import FastAPI
from pydantic import BaseModel

from app.services.llm import generate_tasks
from app.routes.task_routes import router as task_router

app = FastAPI()

app.include_router(task_router)
@app.get("/")
async def root():
    return {"message": "Hello World"}



class PlanRequest(BaseModel):
    prompt: str



@app.post("/plan")
async def generate_plan(request: PlanRequest):
    tasks = generate_tasks(request.prompt)
    return {"tasks": tasks}
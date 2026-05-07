from fastapi import FastAPI
from pydantic import BaseModel

from app.services.llm import generate_response

app = FastAPI()

@app.get("/")
async def root():
    return {"message": "Hello World"}


class PlanRequest(BaseModel):
    prompt: str


@app.post("/plan")
async def generate_plan(request: PlanRequest):
    response = generate_response(request.prompt)
    return {"response": response}
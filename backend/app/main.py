from contextlib import asynccontextmanager
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.core.exceptions import global_exception_handler
from app.core.logging import setup_logging, logger
from app.db.mongo import db_manager
from app.routes.task_routes import router as task_router
from app.routes.auth_routes import router as auth_router
from app.routes.calendar_routes import router as calendar_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    setup_logging()
    logger.info("Starting up application...")
    await db_manager.connect_to_storage()
    yield
    logger.info("Shutting down application...")
    await db_manager.close_storage_connection()

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    lifespan=lifespan,
    openapi_url=f"{settings.API_V1_STR}/openapi.json",
    docs_url=f"{settings.API_V1_STR}/docs",
)

app.add_exception_handler(Exception, global_exception_handler)

if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )


app.include_router(task_router, prefix=settings.API_V1_STR)
app.include_router(auth_router, prefix=f"{settings.API_V1_STR}/auth")
app.include_router(calendar_router, prefix=f"{settings.API_V1_STR}/calendar")

@app.get("/")
async def root():
    return {
        "message": "Welcome to the Planner Agent API",
        "docs": f"{settings.API_V1_STR}/docs",
        "version": settings.VERSION
    }
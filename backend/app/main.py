import asyncio
from contextlib import asynccontextmanager
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from starlette.exceptions import HTTPException as StarletteHTTPException

from app.api.routes import analyze, download
from app.config import settings
from app.services.cleanup_service import periodic_cleanup_worker, cleanup_expired_files
from app.utils.logger import logger


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Lifecycle manager handling startup and shutdown events."""
    logger.info("Initializing link2save backend service...", extra={"operation": "startup"})
    # Initial cleanup sweep of any stale temp files from prior run
    cleanup_expired_files()
    
    # Start periodic background cleanup worker
    cleanup_task = asyncio.create_task(periodic_cleanup_worker())
    
    yield
    
    # Shutdown
    logger.info("Shutting down link2save backend service...", extra={"operation": "shutdown"})
    cleanup_task.cancel()
    try:
        await cleanup_task
    except asyncio.CancelledError:
        pass


app = FastAPI(
    title=settings.APP_NAME,
    description="High-performance, secure media analysis and download service for public YouTube and Instagram media.",
    version="1.0.0",
    lifespan=lifespan,
    docs_url="/docs" if settings.DEBUG else None,
    redoc_url="/redoc" if settings.DEBUG else None,
)

# CORS configuration
origins = settings.ALLOWED_ORIGINS
has_wildcard = "*" in origins

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins if not has_wildcard else ["*"],
    allow_origin_regex=r"https://.*\.vercel\.app" if not has_wildcard else None,
    allow_credentials=True if not has_wildcard else False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.exception_handler(StarletteHTTPException)
async def http_exception_handler(request: Request, exc: StarletteHTTPException):
    """Normalize HTTP exceptions into consistent error response format."""
    if isinstance(exc.detail, dict):
        code = exc.detail.get("code", "HTTP_ERROR")
        message = exc.detail.get("message", str(exc.detail))
    else:
        code = "HTTP_ERROR"
        message = str(exc.detail)

    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": code, "message": message}},
    )


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Format request validation errors into user-friendly message."""
    errors = exc.errors()
    first_msg = errors[0].get("msg", "Invalid input.") if errors else "Invalid input."
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": f"Input validation failed: {first_msg}",
            }
        },
    )


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception):
    """Catch-all for unhandled exceptions to prevent stack trace leaks."""
    logger.error(f"Unhandled exception caught: {exc}", exc_info=True, extra={"operation": "unhandled_error"})
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": "INTERNAL_SERVER_ERROR",
                "message": "Something went wrong while processing the media. Please try again.",
            }
        },
    )


# Include API routers
app.include_router(analyze.router)
app.include_router(download.router)


@app.get("/health", tags=["health"])
async def health_check():
    """Health check probe for container and uptime monitoring."""
    return {"status": "ok", "app": settings.APP_NAME, "env": settings.APP_ENV}

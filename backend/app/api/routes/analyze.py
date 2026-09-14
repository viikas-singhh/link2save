from fastapi import APIRouter, Depends, HTTPException, status
from app.api.dependencies import verify_rate_limit
from app.extractors.base import UnavailableContentError, UnsupportedFormatError, ExtractorError, BotProtectionError
from app.schemas.analyze import AnalyzeRequest, AnalyzeResponse
from app.schemas.common import ErrorResponse
from app.services.media_service import media_service
from app.services.validation_service import ValidationError
from app.utils.logger import logger

router = APIRouter(prefix="/api", tags=["analyze"])


@router.post(
    "/analyze",
    response_model=AnalyzeResponse,
    responses={
        400: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
        422: {"model": ErrorResponse},
        429: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
        503: {"model": ErrorResponse},
    },
    dependencies=[Depends(verify_rate_limit)],
)
async def analyze_url(payload: AnalyzeRequest):
    """Analyze a public YouTube or Instagram URL and return media metadata."""
    try:
        metadata = await media_service.analyze(payload.url)
        return AnalyzeResponse(
            id=metadata.id,
            platform=metadata.platform,
            type=metadata.type,
            title=metadata.title,
            thumbnail=metadata.thumbnail,
            duration=metadata.duration,
            author=metadata.author,
            formats=metadata.formats,
        )
    except ValidationError as e:
        logger.info(f"URL validation error: {e.message}", extra={"operation": "analyze", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": e.code, "message": e.message},
        )
    except BotProtectionError as e:
        logger.warning(f"Bot protection challenge: {e.message}", extra={"operation": "analyze", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
            detail={"code": e.code, "message": e.user_message},
        )
    except UnavailableContentError as e:
        logger.info(f"Content unavailable: {e.message}", extra={"operation": "analyze", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": e.code, "message": e.user_message},
        )
    except UnsupportedFormatError as e:
        logger.info(f"Unsupported format: {e.message}", extra={"operation": "analyze", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": e.code, "message": e.user_message},
        )
    except ExtractorError as e:
        logger.warning(f"Extractor failure: {e.message}", extra={"operation": "analyze", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail={"code": e.code, "message": e.user_message},
        )
    except Exception as e:
        logger.error(f"Unexpected internal error during analysis: {e}", exc_info=True, extra={"operation": "analyze"})
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "code": "INTERNAL_ERROR",
                "message": "Something went wrong while processing the media. Please try again.",
            },
        )

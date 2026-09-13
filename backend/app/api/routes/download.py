import re
from urllib.parse import quote
from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.responses import FileResponse
from starlette.background import BackgroundTask

from app.api.dependencies import verify_rate_limit
from app.extractors.base import UnavailableContentError, UnsupportedFormatError, ExtractorError
from app.schemas.download import DownloadRequest
from app.schemas.common import ErrorResponse
from app.services.download_service import download_service
from app.services.validation_service import ValidationError
from app.utils.files import safe_remove_directory
from app.utils.logger import logger

router = APIRouter(prefix="/api", tags=["download"])


def build_content_disposition(filename: str) -> str:
    """
    Format RFC 6266 / RFC 5987 compliant Content-Disposition header.
    Contains an ASCII fallback for older clients and percent-encoded UTF-8 filename
    for modern browsers. Guaranteed pure ASCII so ASGI/Starlette header encoding never fails.
    """
    ext = filename.rsplit(".", 1)[-1] if "." in filename else "mp4"
    name_part = filename.rsplit(".", 1)[0] if "." in filename else filename

    # ASCII fallback
    ascii_clean = re.sub(r'[^\w\s\.-]', '_', name_part)
    ascii_clean = re.sub(r'[^\x20-\x7E]', '_', ascii_clean)
    ascii_clean = re.sub(r'[\s_]+', '_', ascii_clean).strip(" ._")
    if not ascii_clean:
        ascii_clean = "media_download"
    ascii_filename = f"{ascii_clean}.{ext}"

    # RFC 5987 percent-encoded UTF-8 filename
    utf8_encoded = quote(filename, encoding="utf-8")

    return f'attachment; filename="{ascii_filename}"; filename*=utf-8\'\'{utf8_encoded}'


@router.post(
    "/download",
    responses={
        200: {
            "content": {
                "video/mp4": {},
                "audio/mpeg": {},
                "application/octet-stream": {},
            },
            "description": "Returns the generated media file as a stream.",
        },
        400: {"model": ErrorResponse},
        404: {"model": ErrorResponse},
        429: {"model": ErrorResponse},
        500: {"model": ErrorResponse},
    },
    dependencies=[Depends(verify_rate_limit)],
)
async def download_media(payload: DownloadRequest):
    """Download and process public YouTube or Instagram media."""
    try:
        result = await download_service.prepare_download(payload.url, payload.format)

        # FileResponse with background cleanup task
        cleanup_task = BackgroundTask(safe_remove_directory, result.job_dir)
        cd_header = build_content_disposition(result.filename)

        return FileResponse(
            path=str(result.file_path),
            filename=None,  # Handled explicitly via headers to prevent raw non-latin1 encoding exceptions
            media_type=result.content_type,
            background=cleanup_task,
            headers={
                "Access-Control-Expose-Headers": "Content-Disposition, Content-Length",
                "Content-Disposition": cd_header,
            },
        )
    except ValidationError as e:
        logger.info(f"Download validation error: {e.message}", extra={"operation": "download", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": e.code, "message": e.message},
        )
    except UnavailableContentError as e:
        logger.info(f"Download content unavailable: {e.message}", extra={"operation": "download", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail={"code": e.code, "message": e.user_message},
        )
    except UnsupportedFormatError as e:
        logger.info(f"Download unsupported format: {e.message}", extra={"operation": "download", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": e.code, "message": e.user_message},
        )
    except ExtractorError as e:
        logger.warning(f"Download extractor error: {e.message}", extra={"operation": "download", "error_code": e.code})
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail={"code": e.code, "message": e.user_message},
        )
    except Exception as e:
        logger.error(f"Unexpected error during download: {e}", exc_info=True, extra={"operation": "download"})
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={
                "code": "PROCESSING_FAILURE",
                "message": "Something went wrong while processing the media. Please try again.",
            },
        )

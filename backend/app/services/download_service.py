from pathlib import Path
from typing import Optional
from app.config import settings
from app.extractors.base import DownloadResult, ExtractorError
from app.services.media_service import media_service
from app.services.validation_service import validate_and_identify_url
from app.utils.files import create_safe_job_directory, safe_remove_directory
from app.utils.logger import logger


class DownloadService:
    """Service handling download orchestration, file generation, and cleanup."""

    async def prepare_download(self, raw_url: str, format_type: str = "video") -> DownloadResult:
        """
        Validate URL, allocate isolated job directory, and execute extraction.
        Cleans up job directory if an exception occurs.
        """
        platform, cleaned_url = validate_and_identify_url(raw_url)
        extractor = media_service.get_extractor_for_url(cleaned_url)

        job_dir = create_safe_job_directory(settings.TEMP_DIR)
        try:
            result = await extractor.download(cleaned_url, format_type, job_dir)
            return result
        except Exception as e:
            # Clean up on failure immediately
            safe_remove_directory(job_dir)
            logger.error(
                f"Download processing failed for {cleaned_url}: {e}",
                extra={
                    "platform": str(platform.value),
                    "operation": "download",
                    "error_category": "download_failure",
                }
            )
            raise


download_service = DownloadService()

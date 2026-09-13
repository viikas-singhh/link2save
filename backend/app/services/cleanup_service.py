import asyncio
import os
import time
from pathlib import Path
from typing import Optional
from app.config import settings
from app.utils.files import safe_remove_directory
from app.utils.logger import logger


def cleanup_expired_files(temp_dir: Optional[Path] = None, max_age_seconds: Optional[int] = None) -> int:
    """
    Scan temp directory and remove any job subdirectories older than max_age_seconds.
    Returns the count of purged job directories.
    """
    target_dir = temp_dir or settings.TEMP_DIR
    expiration = max_age_seconds or settings.FILE_EXPIRATION_SECONDS
    now = time.time()
    purged_count = 0

    if not target_dir.exists():
        return 0

    try:
        for entry in os.scandir(target_dir):
            if entry.is_dir():
                try:
                    dir_stat = entry.stat()
                    dir_age = now - dir_stat.st_mtime
                    if dir_age > expiration:
                        job_path = Path(entry.path)
                        safe_remove_directory(job_path)
                        purged_count += 1
                except Exception as e:
                    logger.warning(
                        f"Failed to inspect or remove temp directory {entry.name}: {e}",
                        extra={"operation": "cleanup", "status": "warning"},
                    )
    except Exception as e:
        logger.error(
            f"Error during temp directory sweep: {e}",
            extra={"operation": "cleanup", "status": "error"},
        )

    if purged_count > 0:
        logger.info(
            f"Purged {purged_count} expired job directories.",
            extra={"operation": "cleanup", "status": "success", "purged_count": purged_count},
        )

    return purged_count


async def periodic_cleanup_worker():
    """Async background task that periodically runs the temp file cleanup sweep."""
    logger.info("Starting background temp directory cleanup worker.", extra={"operation": "cleanup"})
    try:
        while True:
            await asyncio.sleep(settings.CLEANUP_INTERVAL_SECONDS)
            cleanup_expired_files()
    except asyncio.CancelledError:
        logger.info("Background cleanup worker received cancellation.", extra={"operation": "cleanup"})

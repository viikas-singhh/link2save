import os
import re
import shutil
from pathlib import Path
from typing import Optional
import uuid


def sanitize_filename(name: str, max_length: int = 100, ascii_only: bool = False) -> str:
    """Sanitize a filename to prevent path traversal or filesystem corruption."""
    if not name:
        return f"media_{uuid.uuid4().hex[:8]}"

    # Remove any directory separators or null bytes
    clean = re.sub(r'[/\\:\*\?"<>\|\x00]', '_', name)
    if ascii_only:
        clean = re.sub(r'[^\w\s\.-]', '_', clean)
        clean = re.sub(r'[^\x20-\x7E]', '_', clean)
    else:
        # Remove control characters
        clean = "".join(ch for ch in clean if ch.isprintable())
    # Collapse multiple spaces or underscores
    clean = re.sub(r'[\s_]+', '_', clean).strip(" ._")

    if not clean:
        clean = f"media_{uuid.uuid4().hex[:8]}"

    if len(clean) > max_length:
        clean = clean[:max_length].rstrip(" ._")

    return clean


def create_safe_job_directory(base_dir: Path) -> Path:
    """Create a unique, isolated directory for a download job."""
    job_id = uuid.uuid4().hex
    job_dir = (base_dir / job_id).resolve()
    
    # Assert that job_dir is strictly inside base_dir
    if not str(job_dir).startswith(str(base_dir.resolve())):
        raise ValueError("Invalid path traversal detected in job directory creation.")

    job_dir.mkdir(parents=True, exist_ok=False)
    return job_dir


def safe_remove_directory(dir_path: Path) -> bool:
    """Safely remove a temporary job directory."""
    try:
        if dir_path.exists() and dir_path.is_dir():
            shutil.rmtree(dir_path, ignore_errors=True)
            return True
    except Exception:
        pass
    return False


def get_file_size(file_path: Path) -> int:
    """Return size of file in bytes or 0 if missing."""
    try:
        if file_path.exists() and file_path.is_file():
            return file_path.stat().st_size
    except Exception:
        pass
    return 0

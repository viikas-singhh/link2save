from abc import ABC, abstractmethod
from dataclasses import dataclass
from pathlib import Path
from typing import List, Optional


@dataclass
class MediaMetadata:
    """Normalized media information extracted from a public URL."""
    id: str
    platform: str
    type: str
    title: str
    thumbnail: Optional[str]
    duration: Optional[int]
    author: Optional[str]
    formats: List[str]
    source_url: str


@dataclass
class DownloadResult:
    """Result information after downloading/processing media."""
    file_path: Path
    filename: str
    content_type: str
    file_size: int
    job_dir: Path


class ExtractorError(Exception):
    """Base error for extraction operations."""
    def __init__(self, message: str, code: str = "PROCESSING_FAILURE", user_message: Optional[str] = None):
        self.message = message
        self.code = code
        self.user_message = user_message or "Something went wrong while processing the media. Please try again."
        super().__init__(message)


class UnavailableContentError(ExtractorError):
    """Raised when media is deleted, private, or age-restricted."""
    def __init__(self, message: str = "Media is unavailable or private."):
        super().__init__(
            message=message,
            code="UNAVAILABLE_CONTENT",
            user_message="We couldn't access this public media. It may be unavailable, private, or unsupported.",
        )


class UnsupportedFormatError(ExtractorError):
    """Raised when the requested format cannot be served."""
    def __init__(self, message: str = "Requested format is unsupported."):
        super().__init__(
            message=message,
            code="UNSUPPORTED_FORMAT",
            user_message="This type of content or format isn't supported.",
        )


class BaseMediaExtractor(ABC):
    """Abstract interface for platform-specific media extractors."""

    @abstractmethod
    def supports(self, url: str) -> bool:
        """Check if this extractor handles the specified URL."""
        pass

    @abstractmethod
    async def analyze(self, url: str) -> MediaMetadata:
        """Extract media metadata without downloading files."""
        pass

    @abstractmethod
    async def download(self, url: str, format_type: str, target_dir: Path) -> DownloadResult:
        """Download media file and perform any conversion/remuxing required."""
        pass

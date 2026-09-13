from typing import List
from app.extractors.base import BaseMediaExtractor, MediaMetadata, ExtractorError, UnsupportedFormatError
from app.extractors.youtube import YouTubeExtractor
from app.extractors.instagram import InstagramExtractor
from app.services.validation_service import validate_and_identify_url, Platform


class MediaService:
    """Service to coordinate platform-specific extractors and normalize metadata."""

    def __init__(self):
        self._extractors: List[BaseMediaExtractor] = [
            YouTubeExtractor(),
            InstagramExtractor(),
        ]

    def get_extractor_for_url(self, url: str) -> BaseMediaExtractor:
        """Find matching extractor based on URL."""
        for extractor in self._extractors:
            if extractor.supports(url):
                return extractor
        raise UnsupportedFormatError("No supported extractor found for the provided URL.")

    async def analyze(self, raw_url: str) -> MediaMetadata:
        """Validate URL and perform extraction of normalized metadata."""
        platform, cleaned_url = validate_and_identify_url(raw_url)
        extractor = self.get_extractor_for_url(cleaned_url)
        return await extractor.analyze(cleaned_url)


media_service = MediaService()

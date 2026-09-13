import asyncio
from pathlib import Path
from typing import Dict, Any, Optional
import yt_dlp

from app.config import settings
from app.extractors.base import (
    BaseMediaExtractor,
    MediaMetadata,
    DownloadResult,
    ExtractorError,
    UnavailableContentError,
    UnsupportedFormatError,
)
from app.utils.files import sanitize_filename, get_file_size
from app.utils.logger import logger
from app.utils.urls import canonicalize_instagram_url


class InstagramExtractor(BaseMediaExtractor):
    """Media extractor for public Instagram Reels, videos, and post media."""

    def supports(self, url: str) -> bool:
        url_lower = url.lower()
        return "instagram.com" in url_lower or "instagr.am" in url_lower

    def _get_base_ydl_opts(self) -> Dict[str, Any]:
        ffmpeg_bin = settings.get_ffmpeg_binary()
        opts = {
            "quiet": True,
            "no_warnings": True,
            "noplaylist": True,
            "no_color": True,
            "socket_timeout": 15,
        }
        if ffmpeg_bin:
            opts["ffmpeg_location"] = ffmpeg_bin
        return opts

    async def analyze(self, url: str) -> MediaMetadata:
        """Analyze public Instagram URL and extract metadata."""
        canonical_url = canonicalize_instagram_url(url)
        opts = self._get_base_ydl_opts()
        opts["skip_download"] = True

        def _extract():
            with yt_dlp.YoutubeDL(opts) as ydl:
                return ydl.extract_info(canonical_url, download=False)

        try:
            info = await asyncio.to_thread(_extract)
            if not info:
                raise UnavailableContentError("Unable to access public Instagram media.")

            media_id = str(info.get("id", "instagram_media"))
            title = info.get("title") or info.get("description") or "Instagram Media"
            # Truncate title if it is a long caption
            if len(title) > 80:
                title = title[:77] + "..."

            thumbnail = info.get("thumbnail")
            duration = info.get("duration")
            author = info.get("uploader") or info.get("channel") or info.get("uploader_id")

            # Determine content type: reel, video, photo
            ext = info.get("ext", "mp4")
            content_type = "video" if ext in ("mp4", "webm") else "photo"

            return MediaMetadata(
                id=media_id,
                platform="instagram",
                type=content_type,
                title=title,
                thumbnail=thumbnail,
                duration=int(duration) if duration is not None else None,
                author=author,
                formats=["video"],
                source_url=canonical_url,
            )

        except yt_dlp.utils.DownloadError as e:
            err_msg = str(e).lower()
            logger.warning(
                f"Instagram analysis failed for {canonical_url}: {e}",
                extra={"platform": "instagram", "operation": "analyze"}
            )
            # Instagram private accounts, login-required or deleted media
            if any(k in err_msg for k in ("login", "private", "checkpoint", "not found", "redirect", "restricted")):
                raise UnavailableContentError("This Instagram content is private, restricted, or unavailable.")
            raise ExtractorError("Failed to extract public Instagram media.")
        except Exception as e:
            logger.error(
                f"Unexpected error analyzing Instagram media: {e}",
                extra={"platform": "instagram", "operation": "analyze"}
            )
            raise ExtractorError("Something went wrong while analyzing the Instagram media.")

    async def download(self, url: str, format_type: str, target_dir: Path) -> DownloadResult:
        """Download public Instagram media file."""
        canonical_url = canonicalize_instagram_url(url)
        opts = self._get_base_ydl_opts()
        opts.update({
            "socket_timeout": settings.DOWNLOAD_TIMEOUT_SECONDS,
            "max_filesize": settings.MAX_FILE_SIZE_BYTES,
            "outtmpl": str(target_dir / "%(id)s.%(ext)s"),
        })

        def _download():
            with yt_dlp.YoutubeDL(opts) as ydl:
                info = ydl.extract_info(canonical_url, download=True)
                return info

        try:
            info = await asyncio.to_thread(_download)
            if not info:
                raise ExtractorError("Instagram download failed to retrieve media.")

            title = info.get("title") or info.get("id") or "instagram_download"
            display_title = sanitize_filename(title[:40], ascii_only=False)
            disk_title = sanitize_filename(title[:40], ascii_only=True)

            downloaded_files = [f for f in target_dir.iterdir() if f.is_file()]
            if not downloaded_files:
                raise ExtractorError("Downloaded Instagram file not found on disk.")

            selected_file = max(downloaded_files, key=lambda f: f.stat().st_size)
            ext = selected_file.suffix.lstrip(".").lower() or "mp4"
            final_disk_filename = f"{disk_title}.{ext}"
            final_path = target_dir / final_disk_filename

            if selected_file != final_path:
                if final_path.exists():
                    final_path.unlink()
                selected_file.rename(final_path)

            file_size = get_file_size(final_path)
            content_type = "video/mp4" if ext == "mp4" else "application/octet-stream"
            display_filename = f"{display_title}.{ext}"

            return DownloadResult(
                file_path=final_path,
                filename=display_filename,
                content_type=content_type,
                file_size=file_size,
                job_dir=target_dir,
            )

        except yt_dlp.utils.DownloadError as e:
            err_msg = str(e).lower()
            logger.warning(
                f"Instagram download error: {e}",
                extra={"platform": "instagram", "operation": "download"}
            )
            if any(k in err_msg for k in ("login", "private", "checkpoint", "not found", "redirect")):
                raise UnavailableContentError("This Instagram content is private, restricted, or unavailable.")
            raise ExtractorError("Failed to download Instagram media.")
        except Exception as e:
            logger.error(
                f"Unexpected error downloading Instagram media: {e}",
                extra={"platform": "instagram", "operation": "download"}
            )
            raise ExtractorError("Something went wrong while processing the Instagram download.")

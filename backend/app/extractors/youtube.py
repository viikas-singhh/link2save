import asyncio
import os
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
from app.utils.urls import canonicalize_youtube_url


class YouTubeExtractor(BaseMediaExtractor):
    """Media extractor for YouTube public videos and audio."""

    def supports(self, url: str) -> bool:
        url_lower = url.lower()
        return "youtube.com" in url_lower or "youtu.be" in url_lower

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
        """Analyze public YouTube video URL and extract metadata."""
        canonical_url = canonicalize_youtube_url(url)
        opts = self._get_base_ydl_opts()
        opts["skip_download"] = True

        def _extract():
            with yt_dlp.YoutubeDL(opts) as ydl:
                return ydl.extract_info(canonical_url, download=False)

        try:
            info = await asyncio.to_thread(_extract)
            if not info:
                raise UnavailableContentError("Unable to extract info from YouTube video.")

            video_id = str(info.get("id", "unknown"))
            title = info.get("title") or "YouTube Media"
            thumbnail = info.get("thumbnail")
            duration = info.get("duration")
            author = info.get("uploader") or info.get("channel")

            return MediaMetadata(
                id=video_id,
                platform="youtube",
                type="video",
                title=title,
                thumbnail=thumbnail,
                duration=int(duration) if duration is not None else None,
                author=author,
                formats=["video", "audio"],
                source_url=canonical_url,
            )

        except yt_dlp.utils.DownloadError as e:
            err_msg = str(e).lower()
            logger.warning(
                f"YouTube analysis failed for url {canonical_url}: {e}",
                extra={"platform": "youtube", "operation": "analyze", "error_category": "download_error"}
            )
            if any(k in err_msg for k in ("private", "sign in", "age", "confirm your age", "members", "unavailable")):
                raise UnavailableContentError()
            raise ExtractorError("Failed to extract YouTube media information.")
        except Exception as e:
            logger.error(
                f"Unexpected error analyzing YouTube video: {e}",
                extra={"platform": "youtube", "operation": "analyze", "error_category": "internal_error"}
            )
            raise ExtractorError("Something went wrong while analyzing the YouTube video.")

    async def download(self, url: str, format_type: str, target_dir: Path) -> DownloadResult:
        """Download public YouTube media in MP4 (video+audio) or MP3/M4A (audio)."""
        canonical_url = canonicalize_youtube_url(url)
        opts = self._get_base_ydl_opts()
        opts.update({
            "socket_timeout": settings.DOWNLOAD_TIMEOUT_SECONDS,
            "max_filesize": settings.MAX_FILE_SIZE_BYTES,
            "outtmpl": str(target_dir / "%(id)s_%(format_id)s.%(ext)s"),
        })

        if format_type == "audio":
            opts["format"] = "bestaudio/best"
            opts["postprocessors"] = [{
                "key": "FFmpegExtractAudio",
                "preferredcodec": "mp3",
                "preferredquality": "192",
            }]
            content_type = "audio/mpeg"
            expected_ext = "mp3"
        elif format_type == "video":
            opts["format"] = (
                "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/"
                "bestvideo[height<=1080]+bestaudio/"
                "best[height<=1080][ext=mp4]/"
                "best[height<=1080]/"
                "best"
            )
            opts["merge_output_format"] = "mp4"
            content_type = "video/mp4"
            expected_ext = "mp4"
        else:
            raise UnsupportedFormatError(f"Unsupported format '{format_type}' for YouTube.")

        def _download():
            with yt_dlp.YoutubeDL(opts) as ydl:
                info = ydl.extract_info(canonical_url, download=True)
                return info

        try:
            info = await asyncio.to_thread(_download)
            if not info:
                raise ExtractorError("Download completed without media info.")

            title = info.get("title", "download")
            display_title = sanitize_filename(title, ascii_only=False)
            disk_title = sanitize_filename(title, ascii_only=True)

            # Find the generated file in target_dir
            downloaded_files = [f for f in target_dir.iterdir() if f.is_file()]
            if not downloaded_files:
                raise ExtractorError("Generated media file not found on disk.")

            # Pick matching or largest file
            selected_file = max(downloaded_files, key=lambda f: f.stat().st_size)
            final_disk_filename = f"{disk_title}.{expected_ext}"
            final_path = target_dir / final_disk_filename

            if selected_file != final_path:
                if final_path.exists():
                    final_path.unlink()
                selected_file.rename(final_path)

            file_size = get_file_size(final_path)
            display_filename = f"{display_title}.{expected_ext}"

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
                f"YouTube download failed: {e}",
                extra={"platform": "youtube", "operation": "download", "format": format_type}
            )
            if any(k in err_msg for k in ("private", "sign in", "age", "unavailable")):
                raise UnavailableContentError()
            raise ExtractorError("Failed to download YouTube media.")
        except Exception as e:
            logger.error(
                f"Unexpected error downloading YouTube media: {e}",
                extra={"platform": "youtube", "operation": "download"}
            )
            raise ExtractorError("Something went wrong while processing the download.")

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
    BotProtectionError,
)
from app.utils.files import sanitize_filename, get_file_size
from app.utils.logger import logger
from app.utils.urls import canonicalize_youtube_url


def _classify_youtube_error(e: Exception) -> Exception:
    """Classify yt-dlp exceptions into specific domain exceptions."""
    err_msg = str(e).lower()
    if any(k in err_msg for k in ("sign in to confirm", "bot", "recaptcha", "captcha", "confirm you're not a bot", "botguard")):
        return BotProtectionError(
            "YouTube bot protection challenge triggered on this cloud server. Please provide cookies or try another video."
        )
    if any(k in err_msg for k in ("private", "join this channel", "members-only", "confirm your age", "age-restricted")):
        return UnavailableContentError("This YouTube video is private, age-restricted, or members-only.")
    if any(k in err_msg for k in ("this video is unavailable", "does not exist", "removed", "deleted", "copyright", "has been terminated")):
        return UnavailableContentError("This YouTube video does not exist, is geo-blocked, or has been removed.")
    return ExtractorError(f"Failed to process YouTube media.")


class YouTubeExtractor(BaseMediaExtractor):
    """Media extractor for YouTube public videos, shorts, and audio."""

    def supports(self, url: str) -> bool:
        url_lower = url.lower()
        return "youtube.com" in url_lower or "youtu.be" in url_lower

    def _get_ydl_client_configs(self) -> list[Dict[str, Any]]:
        """Return fallback configurations for yt-dlp player clients."""
        ffmpeg_bin = settings.get_ffmpeg_binary()
        cookie_path = settings.get_youtube_cookie_path()

        base: Dict[str, Any] = {
            "quiet": True,
            "no_warnings": True,
            "noplaylist": True,
            "no_color": True,
            "socket_timeout": 25,
            "http_headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
            },
        }

        if cookie_path:
            base["cookiefile"] = str(cookie_path)
        if ffmpeg_bin:
            base["ffmpeg_location"] = ffmpeg_bin

        # Attempt 1: Android Creator & TV Embedded (Bypasses web BotGuard challenges on datacenter IPs)
        opt1 = {**base, "extractor_args": {"youtube": {"player_client": ["android_creator", "android", "tv_embedded"]}}}
        # Attempt 2: TV Embedded & Android Music
        opt2 = {**base, "extractor_args": {"youtube": {"player_client": ["tv_embedded", "android", "android_music"]}}}
        # Attempt 3: Standard yt-dlp default negotiation
        opt3 = {**base}

        return [opt1, opt2, opt3]

    async def analyze(self, url: str) -> MediaMetadata:
        """Analyze public YouTube video URL and extract metadata using multi-tier fallback."""
        canonical_url = canonicalize_youtube_url(url)
        configs = self._get_ydl_client_configs()

        last_exc: Optional[Exception] = None
        info = None

        for opts in configs:
            curr_opts = {**opts, "skip_download": True}
            def _extract():
                with yt_dlp.YoutubeDL(curr_opts) as ydl:
                    return ydl.extract_info(canonical_url, download=False)

            try:
                info = await asyncio.to_thread(_extract)
                if info:
                    break
            except Exception as e:
                last_exc = e
                logger.info(f"YouTube extraction attempt failed with client config: {e}")

        if not info:
            if last_exc:
                logger.warning(f"All YouTube extraction attempts failed for {canonical_url}: {last_exc}")
                raise _classify_youtube_error(last_exc)
            raise UnavailableContentError("Unable to extract info from YouTube video.")

        try:
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
        except Exception as e:
            logger.error(f"Unexpected error constructing YouTube metadata: {e}", exc_info=True)
            raise ExtractorError("Something went wrong while formatting YouTube media information.")

    async def download(self, url: str, format_type: str, target_dir: Path) -> DownloadResult:
        """Download public YouTube media in MP4 (video+audio) or MP3/M4A (audio)."""
        canonical_url = canonicalize_youtube_url(url)
        configs = self._get_ydl_client_configs()

        if format_type == "audio":
            format_opts = {
                "format": "bestaudio/best",
                "postprocessors": [{
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "192",
                }],
            }
            content_type = "audio/mpeg"
            expected_ext = "mp3"
        elif format_type == "video":
            format_opts = {
                "format": (
                    "bestvideo[height<=1080][ext=mp4]+bestaudio[ext=m4a]/"
                    "bestvideo[height<=1080]+bestaudio/"
                    "best[height<=1080][ext=mp4]/"
                    "best[height<=1080]/"
                    "bestvideo+bestaudio/"
                    "best"
                ),
                "merge_output_format": "mp4",
            }
            content_type = "video/mp4"
            expected_ext = "mp4"
        else:
            raise UnsupportedFormatError(f"Unsupported format '{format_type}' for YouTube.")

        info = None
        last_exc: Optional[Exception] = None

        for opts in configs:
            target_opts = {
                **opts,
                **format_opts,
                "socket_timeout": settings.DOWNLOAD_TIMEOUT_SECONDS,
                "max_filesize": settings.MAX_FILE_SIZE_BYTES,
                "outtmpl": str(target_dir / "%(id)s_%(format_id)s.%(ext)s"),
            }

            def _download():
                with yt_dlp.YoutubeDL(target_opts) as ydl:
                    return ydl.extract_info(canonical_url, download=True)

            try:
                info = await asyncio.to_thread(_download)
                if info:
                    break
            except Exception as e:
                last_exc = e
                logger.info(f"YouTube download attempt failed with client config: {e}")

        if not info:
            if last_exc:
                logger.warning(f"All YouTube download attempts failed for {canonical_url}: {last_exc}")
                raise _classify_youtube_error(last_exc)
            raise ExtractorError("Download completed without media info.")

        title = info.get("title", "download")
        display_title = sanitize_filename(title, ascii_only=False)
        disk_title = sanitize_filename(title, ascii_only=True)

        # Find the generated file in target_dir
        downloaded_files = [f for f in target_dir.iterdir() if f.is_file()]
        if not downloaded_files:
            raise ExtractorError("Generated media file not found on disk.")

        # Pick largest file produced
        selected_file = max(downloaded_files, key=lambda f: f.stat().st_size)
        actual_ext = selected_file.suffix.lstrip(".").lower() or expected_ext
        final_disk_filename = f"{disk_title}.{actual_ext}"
        final_path = target_dir / final_disk_filename

        if selected_file != final_path:
            if final_path.exists():
                final_path.unlink()
            selected_file.rename(final_path)

        file_size = get_file_size(final_path)
        display_filename = f"{display_title}.{actual_ext}"

        if format_type == "audio":
            content_type = "audio/mpeg" if actual_ext == "mp3" else f"audio/{actual_ext}"
        else:
            content_type = "video/mp4" if actual_ext == "mp4" else "application/octet-stream"

        return DownloadResult(
            file_path=final_path,
            filename=display_filename,
            content_type=content_type,
            file_size=file_size,
            job_dir=target_dir,
        )

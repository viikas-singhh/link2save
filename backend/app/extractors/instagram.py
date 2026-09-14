import asyncio
import html
import os
import re
from pathlib import Path
from typing import Dict, Any, Optional
import httpx
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
from app.utils.urls import canonicalize_instagram_url, parse_instagram_url_type


class InstagramExtractor(BaseMediaExtractor):
    """Media extractor for public Instagram Reels, videos, posts, stories, and profile DP."""

    def supports(self, url: str) -> bool:
        url_lower = url.lower()
        return "instagram.com" in url_lower or "instagr.am" in url_lower or url.startswith("@")

    def _get_base_ydl_opts(self) -> Dict[str, Any]:
        ffmpeg_bin = settings.get_ffmpeg_binary()
        opts: Dict[str, Any] = {
            "quiet": True,
            "no_warnings": True,
            "noplaylist": True,
            "no_color": True,
            "socket_timeout": 20,
            "http_headers": {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36",
                "Accept-Language": "en-US,en;q=0.9",
                "Accept": "*/*",
            },
        }

        # Check for optional cookies file or session cookie
        if settings.INSTAGRAM_COOKIES_FILE and os.path.isfile(settings.INSTAGRAM_COOKIES_FILE):
            opts["cookiefile"] = settings.INSTAGRAM_COOKIES_FILE
        elif settings.INSTAGRAM_SESSIONID:
            opts["http_headers"]["Cookie"] = f"sessionid={settings.INSTAGRAM_SESSIONID.strip()};"
        else:
            default_cookie = Path(__file__).resolve().parent.parent.parent / "cookies.txt"
            if default_cookie.is_file():
                opts["cookiefile"] = str(default_cookie)

        if ffmpeg_bin:
            opts["ffmpeg_location"] = ffmpeg_bin
        return opts

    async def _extract_profile_dp(self, username: str, canonical_url: str) -> MediaMetadata:
        """Extract profile DP image and metadata using OpenGraph crawler headers."""
        headers = {
            "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9",
        }
        if settings.INSTAGRAM_SESSIONID:
            headers["Cookie"] = f"sessionid={settings.INSTAGRAM_SESSIONID.strip()};"

        try:
            async with httpx.AsyncClient(timeout=12.0, follow_redirects=True) as client:
                resp = await client.get(canonical_url, headers=headers)

            if resp.status_code != 200:
                raise UnavailableContentError(f"Instagram profile @{username} not found or restricted.")

            page_html = resp.text
            og_images = re.findall(r'<meta property="og:image" content="([^"]+)"', page_html)
            og_titles = re.findall(r'<meta property="og:title" content="([^"]+)"', page_html)
            og_descriptions = re.findall(r'<meta property="og:description" content="([^"]+)"', page_html)

            raw_title = og_titles[0] if og_titles else f"Instagram Profile (@{username})"
            clean_title = html.unescape(raw_title).strip()
            clean_desc = html.unescape(og_descriptions[0]).strip() if og_descriptions else ""

            if not og_images:
                raise UnavailableContentError(f"Could not retrieve profile picture for @{username}.")

            dp_url = html.unescape(og_images[0])

            display_title = f"{clean_title}" if clean_title else f"@{username} Profile Picture"
            if len(display_title) > 80:
                display_title = display_title[:77] + "..."

            return MediaMetadata(
                id=username,
                platform="instagram",
                type="profile",
                title=display_title,
                thumbnail=dp_url,
                duration=None,
                author=f"@{username}",
                formats=["image"],
                source_url=canonical_url,
            )
        except UnavailableContentError:
            raise
        except Exception as e:
            logger.error(f"Error extracting profile DP for @{username}: {e}", exc_info=True)
            raise ExtractorError(f"Unable to access profile information for @{username}.")

    async def analyze(self, url: str) -> MediaMetadata:
        """Analyze public Instagram URL (Reel, Post, Profile DP, or Story) and extract metadata."""
        canonical_url = canonicalize_instagram_url(url)
        url_info = parse_instagram_url_type(canonical_url)
        kind = url_info.get("kind")

        # 1. DP / Profile handling
        if kind == "profile":
            username = url_info.get("username", "user")
            return await self._extract_profile_dp(username, canonical_url)

        # 2. Story handling
        if kind == "story":
            username = url_info.get("username", "user")
            if not (settings.INSTAGRAM_SESSIONID or settings.INSTAGRAM_COOKIES_FILE):
                raise UnavailableContentError(
                    f"Instagram Stories require authentication. To enable Story downloads, please set INSTAGRAM_SESSIONID in your server environment."
                )

        # 3. Reels and Posts: Try yt-dlp first
        opts = self._get_base_ydl_opts()
        opts["skip_download"] = True

        # If it's a post with a video/reel, querying reel URL works more reliably with yt-dlp
        target_urls = [canonical_url]
        shortcode = url_info.get("shortcode")
        if kind == "post" and shortcode:
            target_urls.insert(0, f"https://www.instagram.com/reel/{shortcode}/")

        ydl_info = None
        last_error = None

        for target_url in target_urls:
            def _extract():
                with yt_dlp.YoutubeDL(opts) as ydl:
                    return ydl.extract_info(target_url, download=False)

            try:
                ydl_info = await asyncio.to_thread(_extract)
                if ydl_info:
                    break
            except Exception as e:
                last_error = e

        if ydl_info:
            media_id = str(ydl_info.get("id", "instagram_media"))
            title = ydl_info.get("title") or ydl_info.get("description") or "Instagram Media"
            title = html.unescape(title)
            if len(title) > 80:
                title = title[:77] + "..."

            thumbnail = ydl_info.get("thumbnail")
            duration = ydl_info.get("duration")
            author = ydl_info.get("uploader") or ydl_info.get("channel") or ydl_info.get("uploader_id")

            ext = str(ydl_info.get("ext", "mp4")).lower()
            content_type = "video" if ext in ("mp4", "webm", "mov") else "photo"
            available_formats = ["video"] if content_type == "video" else ["image"]

            return MediaMetadata(
                id=media_id,
                platform="instagram",
                type=content_type,
                title=title,
                thumbnail=thumbnail,
                duration=int(duration) if duration is not None else None,
                author=author,
                formats=available_formats,
                source_url=canonical_url,
            )

        # 4. Fallback for photo posts or when yt-dlp encounters empty media response
        # Try OpenGraph crawler parsing for post
        try:
            headers = {
                "User-Agent": "facebookexternalhit/1.1 (+http://www.facebook.com/externalhit_uatext.php)",
                "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
            }
            if settings.INSTAGRAM_SESSIONID:
                headers["Cookie"] = f"sessionid={settings.INSTAGRAM_SESSIONID.strip()};"

            async with httpx.AsyncClient(timeout=10.0, follow_redirects=True) as client:
                resp = await client.get(canonical_url, headers=headers)

            if resp.status_code == 200:
                page_html = resp.text
                og_vids = re.findall(r'<meta property="og:video(?::secure_url)?" content="([^"]+)"', page_html)
                og_imgs = re.findall(r'<meta property="og:image" content="([^"]+)"', page_html)
                og_titles = re.findall(r'<meta property="og:title" content="([^"]+)"', page_html)

                if og_vids or og_imgs:
                    raw_title = og_titles[0] if og_titles else "Instagram Post"
                    title = html.unescape(raw_title)
                    if len(title) > 80:
                        title = title[:77] + "..."

                    is_vid = bool(og_vids)
                    media_url = html.unescape(og_vids[0] if is_vid else og_imgs[0])

                    return MediaMetadata(
                        id=shortcode or "instagram_post",
                        platform="instagram",
                        type="video" if is_vid else "photo",
                        title=title,
                        thumbnail=media_url,
                        duration=None,
                        author="Instagram Creator",
                        formats=["video"] if is_vid else ["image"],
                        source_url=canonical_url,
                    )
        except Exception as e:
            logger.warning(f"OpenGraph fallback for post failed: {e}")

        # If everything failed, raise informative error
        err_msg = str(last_error).lower() if last_error else ""
        if any(k in err_msg for k in ("login", "private", "checkpoint", "not found", "redirect", "restricted")):
            raise UnavailableContentError("This Instagram content is private, restricted, or requires login.")
        raise ExtractorError("Failed to extract public Instagram media. Please verify the URL is public.")

    async def download(self, url: str, format_type: str, target_dir: Path) -> DownloadResult:
        """Download public Instagram media file (video MP4 or image JPG)."""
        canonical_url = canonicalize_instagram_url(url)
        url_info = parse_instagram_url_type(canonical_url)
        kind = url_info.get("kind")

        # 1. DP Profile Picture Download
        if kind == "profile" or format_type == "image":
            meta = await self.analyze(canonical_url)
            if not meta.thumbnail:
                raise ExtractorError("Profile image link not found.")

            target_dir.mkdir(parents=True, exist_ok=True)
            username = url_info.get("username") or meta.id or "instagram_user"
            safe_user = sanitize_filename(username, ascii_only=True)
            final_path = target_dir / f"{safe_user}_profile_picture.jpg"

            async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
                r = await client.get(meta.thumbnail, headers={"User-Agent": "Mozilla/5.0"})
                if r.status_code != 200:
                    raise ExtractorError("Failed to download profile image file.")
                final_path.write_bytes(r.content)

            file_size = get_file_size(final_path)
            return DownloadResult(
                file_path=final_path,
                filename=f"{safe_user}_profile_pic.jpg",
                content_type="image/jpeg",
                file_size=file_size,
                job_dir=target_dir,
            )

        # 2. Video / Reel Download via yt-dlp
        opts = self._get_base_ydl_opts()
        opts.update({
            "socket_timeout": settings.DOWNLOAD_TIMEOUT_SECONDS,
            "max_filesize": settings.MAX_FILE_SIZE_BYTES,
            "outtmpl": str(target_dir / "%(id)s.%(ext)s"),
        })

        target_urls = [canonical_url]
        shortcode = url_info.get("shortcode")
        if kind == "post" and shortcode:
            target_urls.insert(0, f"https://www.instagram.com/reel/{shortcode}/")

        info = None
        last_error = None

        for target_url in target_urls:
            def _download():
                with yt_dlp.YoutubeDL(opts) as ydl:
                    return ydl.extract_info(target_url, download=True)

            try:
                info = await asyncio.to_thread(_download)
                if info:
                    break
            except Exception as e:
                last_error = e

        # If yt-dlp downloaded files
        downloaded_files = [f for f in target_dir.iterdir() if f.is_file()]
        if downloaded_files:
            title = (info.get("title") if info else None) or "instagram_download"
            title = html.unescape(title)
            display_title = sanitize_filename(title[:40], ascii_only=False)
            disk_title = sanitize_filename(title[:40], ascii_only=True)

            selected_file = max(downloaded_files, key=lambda f: f.stat().st_size)
            ext = selected_file.suffix.lstrip(".").lower() or "mp4"
            final_disk_filename = f"{disk_title}.{ext}"
            final_path = target_dir / final_disk_filename

            if selected_file != final_path:
                if final_path.exists():
                    final_path.unlink()
                selected_file.rename(final_path)

            file_size = get_file_size(final_path)
            content_type = "image/jpeg" if ext in ("jpg", "jpeg", "webp", "png") else "video/mp4"
            display_filename = f"{display_title}.{ext}"

            return DownloadResult(
                file_path=final_path,
                filename=display_filename,
                content_type=content_type,
                file_size=file_size,
                job_dir=target_dir,
            )

        # Fallback: Check if metadata has a direct media thumbnail/url to stream
        try:
            meta = await self.analyze(canonical_url)
            if meta.thumbnail:
                target_dir.mkdir(parents=True, exist_ok=True)
                ext = "mp4" if meta.type == "video" else "jpg"
                final_path = target_dir / f"{meta.id}.{ext}"
                async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
                    r = await client.get(meta.thumbnail, headers={"User-Agent": "Mozilla/5.0"})
                    if r.status_code == 200:
                        final_path.write_bytes(r.content)
                        return DownloadResult(
                            file_path=final_path,
                            filename=f"{meta.id}.{ext}",
                            content_type="video/mp4" if ext == "mp4" else "image/jpeg",
                            file_size=len(r.content),
                            job_dir=target_dir,
                        )
        except Exception:
            pass

        err_msg = str(last_error).lower() if last_error else ""
        if any(k in err_msg for k in ("login", "private", "checkpoint", "not found", "redirect")):
            raise UnavailableContentError("This Instagram content is private, restricted, or unavailable.")
        raise ExtractorError("Failed to download Instagram media.")

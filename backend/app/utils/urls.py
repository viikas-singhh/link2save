import re
from urllib.parse import urlparse, urlunparse


def sanitize_url(raw_url: str) -> str:
    """Trim, clean whitespace and normalize URL string."""
    if not raw_url:
        return ""
    cleaned = raw_url.strip()
    # Strip any accidental wrapping quotes or brackets
    cleaned = cleaned.strip("\"'<>[]()")
    return cleaned


def extract_clean_domain(url: str) -> str:
    """Extract lowercase netloc without port."""
    try:
        parsed = urlparse(url)
        netloc = parsed.netloc.lower().split(":")[0]
        return netloc
    except Exception:
        return ""


def canonicalize_youtube_url(url: str) -> str:
    """Convert mobile or short YouTube links to standard format."""
    parsed = urlparse(url)
    domain = parsed.netloc.lower()

    # youtu.be/<id> -> https://www.youtube.com/watch?v=<id>
    if "youtu.be" in domain:
        video_id = parsed.path.strip("/")
        if video_id:
            return f"https://www.youtube.com/watch?v={video_id}"

    # m.youtube.com -> www.youtube.com
    if "m.youtube.com" in domain:
        parts = list(parsed)
        parts[1] = "www.youtube.com"
        return urlunparse(parts)

    return url


def canonicalize_instagram_url(url: str) -> str:
    """Ensure standard HTTPS instagram url."""
    parsed = urlparse(url)
    parts = list(parsed)
    parts[0] = "https"
    parts[1] = "www.instagram.com"
    # remove trailing tracking parameters like ?igsh=...
    return urlunparse((parts[0], parts[1], parts[2].rstrip("/"), "", "", ""))

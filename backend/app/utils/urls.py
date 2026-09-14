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
    """Convert mobile, short, or shorts YouTube links to standard format."""
    cleaned = sanitize_url(url)
    if not cleaned.startswith("http://") and not cleaned.startswith("https://"):
        cleaned = "https://" + cleaned

    parsed = urlparse(cleaned)
    domain = parsed.netloc.lower()

    # youtu.be/<id> -> https://www.youtube.com/watch?v=<id>
    if "youtu.be" in domain:
        video_id = parsed.path.strip("/").split("/")[0]
        if video_id:
            return f"https://www.youtube.com/watch?v={video_id}"

    # youtube.com/shorts/<id> -> https://www.youtube.com/watch?v=<id>
    if "/shorts/" in parsed.path:
        parts = parsed.path.strip("/").split("/")
        try:
            shorts_idx = parts.index("shorts")
            if shorts_idx + 1 < len(parts):
                video_id = parts[shorts_idx + 1]
                return f"https://www.youtube.com/watch?v={video_id}"
        except ValueError:
            pass

    # m.youtube.com or music.youtube.com -> www.youtube.com
    if domain in ("m.youtube.com", "music.youtube.com"):
        parts = list(parsed)
        parts[1] = "www.youtube.com"
        return urlunparse(parts)

    return cleaned


def canonicalize_instagram_url(url: str) -> str:
    """Ensure standard HTTPS instagram url and normalize username/profile handles."""
    cleaned = sanitize_url(url)

    # Handle @username input
    if cleaned.startswith("@"):
        username = cleaned.lstrip("@").strip("/")
        return f"https://www.instagram.com/{username}/"

    if not cleaned.startswith("http://") and not cleaned.startswith("https://"):
        if "instagram.com" in cleaned or "instagr.am" in cleaned:
            cleaned = "https://" + cleaned
        elif "/" not in cleaned and " " not in cleaned and len(cleaned) <= 35:
            # Bare username entered by user e.g. "cristiano"
            return f"https://www.instagram.com/{cleaned}/"
        else:
            cleaned = "https://" + cleaned

    parsed = urlparse(cleaned)
    parts = list(parsed)
    parts[0] = "https"
    parts[1] = "www.instagram.com"
    # Clean trailing query tracking params like ?igsh=...
    path = "/" + parts[2].strip("/")
    if path != "/":
        path += "/"
    return urlunparse((parts[0], parts[1], path, "", "", ""))


def parse_instagram_url_type(url: str) -> dict:
    """
    Classify Instagram URL into type: 'reel', 'post', 'profile', or 'story'.
    Returns dict with keys: 'kind', 'shortcode', 'username', 'story_id'.
    """
    canonical = canonicalize_instagram_url(url)
    parsed = urlparse(canonical)
    path_segments = [p for p in parsed.path.split("/") if p]

    if not path_segments:
        return {"kind": "unknown", "canonical_url": canonical}

    first = path_segments[0].lower()

    if first in ("reel", "reels"):
        shortcode = path_segments[1] if len(path_segments) > 1 else ""
        return {"kind": "reel", "shortcode": shortcode, "canonical_url": canonical}

    if first == "p":
        shortcode = path_segments[1] if len(path_segments) > 1 else ""
        return {"kind": "post", "shortcode": shortcode, "canonical_url": canonical}

    if first == "stories":
        username = path_segments[1] if len(path_segments) > 1 else ""
        story_id = path_segments[2] if len(path_segments) > 2 else ""
        return {
            "kind": "story",
            "username": username,
            "story_id": story_id,
            "canonical_url": canonical,
        }

    # Otherwise if it's a single segment not in reserved keywords, it's a profile (DP)
    reserved = {"explore", "accounts", "direct", "stories", "reels", "about", "legal", "developer"}
    if first not in reserved:
        return {"kind": "profile", "username": first, "canonical_url": canonical}

    return {"kind": "unknown", "canonical_url": canonical}


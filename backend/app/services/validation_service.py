import ipaddress
import socket
from enum import Enum
from urllib.parse import urlparse
from typing import Tuple, Optional
from app.utils.urls import sanitize_url, extract_clean_domain


class Platform(str, Enum):
    YOUTUBE = "youtube"
    INSTAGRAM = "instagram"
    UNSUPPORTED = "unsupported"


class ValidationError(Exception):
    """Raised when URL validation or security verification fails."""
    def __init__(self, message: str, code: str = "INVALID_URL"):
        self.message = message
        self.code = code
        super().__init__(message)


YOUTUBE_DOMAINS = {
    "youtube.com",
    "www.youtube.com",
    "m.youtube.com",
    "music.youtube.com",
    "youtu.be",
}

INSTAGRAM_DOMAINS = {
    "instagram.com",
    "www.instagram.com",
    "instagr.am",
    "m.instagram.com",
}


def is_ip_private_or_restricted(ip_str: str) -> bool:
    """Determine whether an IP address belongs to loopback, private, link-local, or restricted ranges."""
    try:
        ip = ipaddress.ip_address(ip_str)
        return (
            ip.is_private
            or ip.is_loopback
            or ip.is_link_local
            or ip.is_multicast
            or ip.is_reserved
            or ip.is_unspecified
        )
    except ValueError:
        return True


def check_ssrf_safety(hostname: str) -> bool:
    """
    Resolve hostname to IP addresses and ensure none resolve to private or local networks.
    Prevents Server-Side Request Forgery (SSRF).
    """
    if not hostname:
        return False

    # Block direct IP literals in hostname if private
    try:
        ip = ipaddress.ip_address(hostname)
        return not is_ip_private_or_restricted(str(ip))
    except ValueError:
        pass  # It is a domain name, proceed to DNS resolution

    try:
        # Resolve all addresses
        addr_info = socket.getaddrinfo(hostname, None, socket.AF_UNSPEC, socket.SOCK_STREAM)
        for family, socktype, proto, canonname, sockaddr in addr_info:
            ip_str = sockaddr[0]
            if is_ip_private_or_restricted(ip_str):
                return False
        return True
    except (socket.gaierror, socket.herror, Exception):
        # If hostname cannot be resolved, reject for security
        return False


def validate_and_identify_url(raw_url: str) -> Tuple[Platform, str]:
    """
    Strictly validate URL, check domain, prevent SSRF, and identify media platform.
    Returns (Platform, cleaned_url).
    """
    url = sanitize_url(raw_url)
    if not url:
        raise ValidationError("Please enter a valid YouTube or Instagram URL.", code="EMPTY_URL")

    if len(url) > 2048:
        raise ValidationError("The provided URL exceeds the maximum allowed length.", code="URL_TOO_LONG")

    # Convenience support for @username or bare handles for Instagram DP
    if url.startswith("@"):
        url = f"https://www.instagram.com/{url.lstrip('@').strip('/')}/"
    elif not (url.startswith("http://") or url.startswith("https://")):
        if any(d in url.lower() for d in ("youtube.com", "youtu.be", "instagram.com", "instagr.am")):
            url = "https://" + url
        elif "/" not in url and " " not in url and len(url) <= 35:
            # Assume Instagram handle
            url = f"https://www.instagram.com/{url}/"
        else:
            url = "https://" + url

    try:
        parsed = urlparse(url)
    except Exception:
        raise ValidationError("Please enter a valid YouTube or Instagram URL.", code="INVALID_URL_SYNTAX")

    if parsed.scheme not in ("http", "https"):
        raise ValidationError("Only HTTP and HTTPS URLs are supported.", code="INVALID_PROTOCOL")

    domain = extract_clean_domain(url)
    if not domain:
        raise ValidationError("Please enter a valid YouTube or Instagram URL.", code="INVALID_DOMAIN")

    # Domain match check
    is_youtube = any(domain == d or domain.endswith("." + d) for d in ("youtube.com", "youtu.be"))
    is_instagram = any(domain == d or domain.endswith("." + d) for d in ("instagram.com", "instagr.am"))

    if not (is_youtube or is_instagram):
        raise ValidationError(
            "This type of content isn't supported. Please provide a public YouTube or Instagram link.",
            code="UNSUPPORTED_PLATFORM",
        )

    # Perform SSRF DNS safety verification
    if not check_ssrf_safety(domain):
        raise ValidationError(
            "The requested destination address is restricted or invalid.",
            code="SECURITY_REJECTION",
        )

    platform = Platform.YOUTUBE if is_youtube else Platform.INSTAGRAM
    return platform, url

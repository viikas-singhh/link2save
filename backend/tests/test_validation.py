import pytest
from app.services.validation_service import (
    validate_and_identify_url,
    Platform,
    ValidationError,
    is_ip_private_or_restricted,
    check_ssrf_safety,
)
from app.utils.urls import sanitize_url, extract_clean_domain


def test_sanitize_url():
    assert sanitize_url("  https://www.youtube.com/watch?v=dQw4w9WgXcQ  ") == "https://www.youtube.com/watch?v=dQw4w9WgXcQ"
    assert sanitize_url("<https://instagram.com/reel/123>") == "https://instagram.com/reel/123"
    assert sanitize_url("") == ""


def test_extract_clean_domain():
    assert extract_clean_domain("https://www.youtube.com/watch?v=abc") == "www.youtube.com"
    assert extract_clean_domain("https://INSTAGRAM.COM:443/p/xyz") == "instagram.com"


def test_private_ip_detection():
    assert is_ip_private_or_restricted("127.0.0.1") is True
    assert is_ip_private_or_restricted("10.0.0.1") is True
    assert is_ip_private_or_restricted("192.168.1.1") is True
    assert is_ip_private_or_restricted("172.16.0.5") is True
    assert is_ip_private_or_restricted("169.254.169.254") is True
    assert is_ip_private_or_restricted("::1") is True
    assert is_ip_private_or_restricted("8.8.8.8") is False
    assert is_ip_private_or_restricted("1.1.1.1") is False


def test_ssrf_safety_check():
    assert check_ssrf_safety("127.0.0.1") is False
    assert check_ssrf_safety("localhost") is False
    assert check_ssrf_safety("169.254.169.254") is False


def test_valid_youtube_urls():
    urls = [
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://youtu.be/dQw4w9WgXcQ",
        "https://m.youtube.com/watch?v=dQw4w9WgXcQ",
        "https://www.youtube.com/shorts/dQw4w9WgXcQ",
    ]
    for url in urls:
        platform, clean = validate_and_identify_url(url)
        assert platform == Platform.YOUTUBE
        assert "youtube.com" in clean or "youtu.be" in clean


def test_valid_instagram_urls():
    urls = [
        "https://www.instagram.com/reel/C3zY5z_L7oA/",
        "https://instagram.com/p/C3zY5z_L7oA",
        "https://www.instagram.com/cristiano/",
        "@cristiano",
        "https://instagram.com/stories/cristiano/123456789/",
    ]
    for url in urls:
        platform, clean = validate_and_identify_url(url)
        assert platform == Platform.INSTAGRAM
        assert "instagram.com" in clean


def test_invalid_unsupported_urls():
    unsupported = [
        "https://tiktok.com/@user/video/12345",
        "https://vimeo.com/123456",
        "https://evil.com/youtube.com",
        "ftp://youtube.com/watch?v=123",
        "http://localhost:8000/api",
    ]
    for url in unsupported:
        with pytest.raises(ValidationError):
            validate_and_identify_url(url)


def test_empty_or_excessive_url():
    with pytest.raises(ValidationError):
        validate_and_identify_url("")

    with pytest.raises(ValidationError):
        validate_and_identify_url("https://youtube.com/" + "a" * 3000)

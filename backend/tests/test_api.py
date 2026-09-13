from unittest.mock import AsyncMock, patch
import pytest
from fastapi.testclient import TestClient

from app.main import app
from app.extractors.base import MediaMetadata, DownloadResult
from app.services.rate_limiter import rate_limiter

client = TestClient(app)


@pytest.fixture(autouse=True)
def reset_rate_limits():
    rate_limiter.reset()


def test_health_endpoint():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "ok"


def test_analyze_invalid_url():
    response = client.post("/api/analyze", json={"url": "https://unknownsite.org/video"})
    assert response.status_code == 400
    data = response.json()
    assert "error" in data
    assert data["error"]["code"] == "UNSUPPORTED_PLATFORM"


def test_analyze_ssrf_attempt():
    response = client.post("/api/analyze", json={"url": "http://127.0.0.1:8000/something"})
    assert response.status_code == 400
    data = response.json()
    assert "error" in data


@pytest.mark.asyncio
async def test_analyze_youtube_success():
    mock_meta = MediaMetadata(
        id="dQw4w9WgXcQ",
        platform="youtube",
        type="video",
        title="Rick Astley - Never Gonna Give You Up",
        thumbnail="https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        duration=212,
        author="RickAstleyVEVO",
        formats=["video", "audio"],
        source_url="https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    )

    with patch("app.extractors.youtube.YouTubeExtractor.analyze", new_callable=AsyncMock) as mock_analyze:
        mock_analyze.return_value = mock_meta
        response = client.post(
            "/api/analyze",
            json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
        )
        assert response.status_code == 200
        data = response.json()
        assert data["id"] == "dQw4w9WgXcQ"
        assert data["platform"] == "youtube"
        assert data["title"] == "Rick Astley - Never Gonna Give You Up"
        assert data["duration"] == 212
        assert "video" in data["formats"]
        assert "audio" in data["formats"]


def test_rate_limiter_trigger():
    headers = {"x-forwarded-for": "198.51.100.1"}
    # Exhaust allowed requests for this IP
    for _ in range(rate_limiter.max_requests):
        rate_limiter.is_allowed("198.51.100.1")

    # The next one should be blocked by verify_rate_limit dependency
    response = client.post(
        "/api/analyze",
        json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"},
        headers=headers,
    )
    assert response.status_code == 429
    assert response.json()["error"]["code"] == "RATE_LIMIT_EXCEEDED"


@pytest.mark.asyncio
async def test_download_unicode_filename(tmp_path):
    # Dummy media file
    dummy_file = tmp_path / "media.mp4"
    dummy_file.write_bytes(b"dummy mp4 content")

    unicode_title = "हिंदी_गाना_Song_日本語_2026.mp4"
    mock_result = DownloadResult(
        file_path=dummy_file,
        filename=unicode_title,
        content_type="video/mp4",
        file_size=len(b"dummy mp4 content"),
        job_dir=tmp_path,
    )

    with patch("app.services.download_service.DownloadService.prepare_download", new_callable=AsyncMock) as mock_dl:
        mock_dl.return_value = mock_result
        response = client.post(
            "/api/download",
            json={"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ", "format": "video"},
        )
        assert response.status_code == 200
        assert response.content == b"dummy mp4 content"
        cd_header = response.headers.get("content-disposition", "")
        # Header must be strictly latin-1 encodable
        cd_header.encode("latin-1")
        assert "filename*=" in cd_header

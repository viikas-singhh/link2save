import os
import shutil
from pathlib import Path
from typing import List
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Application configuration loaded from environment variables or defaults."""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore",
    )

    APP_NAME: str = "link2save API"
    APP_ENV: str = "production"
    DEBUG: bool = False
    HOST: str = "0.0.0.0"
    PORT: int = 8000

    # CORS origins (string comma-separated or list)
    ALLOWED_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://link2save.com",
        "https://*.vercel.app",
        "*",
    ]

    # Temporary storage configuration
    TEMP_DIR: Path = Path(__file__).resolve().parent.parent / "temp"
    CLEANUP_INTERVAL_SECONDS: int = 300  # Run cleanup sweep every 5 minutes
    FILE_EXPIRATION_SECONDS: int = 600   # Files older than 10 minutes are purged

    # Processing safety limits
    MAX_FILE_SIZE_BYTES: int = 250 * 1024 * 1024  # 250 MB
    DOWNLOAD_TIMEOUT_SECONDS: int = 120            # 2 minutes timeout
    RATE_LIMIT_PER_MINUTE: int = 20                # 20 requests per minute per IP

    # FFmpeg executable path
    FFMPEG_PATH: str = ""

    # Optional credentials / cookies for platform extraction
    INSTAGRAM_SESSIONID: str = ""
    INSTAGRAM_COOKIES_FILE: str = ""
    INSTAGRAM_COOKIES_CONTENT: str = ""
    INSTAGRAM_COOKIES_BASE64: str = ""
    YOUTUBE_COOKIES_FILE: str = ""
    YOUTUBE_COOKIES_CONTENT: str = ""
    YOUTUBE_COOKIES_BASE64: str = ""

    def get_youtube_cookie_path(self) -> Optional[str]:
        """Resolve YouTube cookies from file path, raw content, or base64 env vars."""
        import base64
        if self.YOUTUBE_COOKIES_FILE and os.path.isfile(self.YOUTUBE_COOKIES_FILE):
            return self.YOUTUBE_COOKIES_FILE
        
        target_path = self.TEMP_DIR / "youtube_cookies.txt"
        if self.YOUTUBE_COOKIES_CONTENT.strip():
            target_path.write_text(self.YOUTUBE_COOKIES_CONTENT.strip(), encoding="utf-8")
            return str(target_path)
        
        if self.YOUTUBE_COOKIES_BASE64.strip():
            try:
                decoded = base64.b64decode(self.YOUTUBE_COOKIES_BASE64.strip()).decode("utf-8")
                target_path.write_text(decoded, encoding="utf-8")
                return str(target_path)
            except Exception:
                pass
        
        # Check for cookies.txt in workspace root or backend root
        for candidate in [
            Path(__file__).resolve().parent.parent.parent / "cookies.txt",
            Path(__file__).resolve().parent.parent / "cookies.txt",
            Path("cookies.txt"),
        ]:
            if candidate.is_file():
                return str(candidate)
        return None

    def get_instagram_cookie_path(self) -> Optional[str]:
        """Resolve Instagram cookies from file path, raw content, or base64 env vars."""
        import base64
        if self.INSTAGRAM_COOKIES_FILE and os.path.isfile(self.INSTAGRAM_COOKIES_FILE):
            return self.INSTAGRAM_COOKIES_FILE
        
        target_path = self.TEMP_DIR / "instagram_cookies.txt"
        if self.INSTAGRAM_COOKIES_CONTENT.strip():
            target_path.write_text(self.INSTAGRAM_COOKIES_CONTENT.strip(), encoding="utf-8")
            return str(target_path)
        
        if self.INSTAGRAM_COOKIES_BASE64.strip():
            try:
                decoded = base64.b64decode(self.INSTAGRAM_COOKIES_BASE64.strip()).decode("utf-8")
                target_path.write_text(decoded, encoding="utf-8")
                return str(target_path)
            except Exception:
                pass
        
        for candidate in [
            Path(__file__).resolve().parent.parent.parent / "cookies.txt",
            Path(__file__).resolve().parent.parent / "cookies.txt",
            Path("cookies.txt"),
        ]:
            if candidate.is_file():
                return str(candidate)
        return None

    def get_ffmpeg_binary(self) -> str:
        """Find the path to the ffmpeg executable."""
        if self.FFMPEG_PATH and os.path.exists(self.FFMPEG_PATH):
            return self.FFMPEG_PATH
        
        system_ffmpeg = shutil.which("ffmpeg")
        if system_ffmpeg:
            return system_ffmpeg
        
        try:
            import imageio_ffmpeg
            return imageio_ffmpeg.get_ffmpeg_exe()
        except Exception:
            return "ffmpeg"


settings = Settings()

# Ensure temp directory exists
settings.TEMP_DIR.mkdir(parents=True, exist_ok=True)

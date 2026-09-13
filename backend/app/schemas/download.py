from typing import Literal
from pydantic import BaseModel, Field


class DownloadRequest(BaseModel):
    url: str = Field(..., description="Public YouTube or Instagram URL", min_length=1, max_length=2048)
    format: Literal["video", "audio"] = Field("video", description="Format to download: 'video' or 'audio'")

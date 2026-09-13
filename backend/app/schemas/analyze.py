from typing import List, Optional
from pydantic import BaseModel, Field


class AnalyzeRequest(BaseModel):
    url: str = Field(..., description="Public YouTube or Instagram URL", min_length=1, max_length=2048)


class AnalyzeResponse(BaseModel):
    id: str = Field(..., description="Unique media identifier")
    platform: str = Field(..., description="Platform name ('youtube' or 'instagram')")
    type: str = Field(..., description="Content type ('video', 'audio', 'reel', 'photo')")
    title: str = Field(..., description="Title or headline of the media")
    thumbnail: Optional[str] = Field(None, description="URL of thumbnail preview image")
    duration: Optional[int] = Field(None, description="Duration in seconds if applicable")
    author: Optional[str] = Field(None, description="Channel, creator or uploader name")
    formats: List[str] = Field(default_factory=list, description="Available download formats")

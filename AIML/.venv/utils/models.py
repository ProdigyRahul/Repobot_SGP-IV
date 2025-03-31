from pydantic import BaseModel, Field
from typing import Optional, List

class ChatRequest(BaseModel):
    """
    Model for incoming chat requests about repository
    """
    query: str = Field(..., min_length=1, max_length=1000)
    repo_url: Optional[str] = None
    context: Optional[List[str]] = None

class ChatResponse(BaseModel):
    """
    Standardized response model for chatbot interactions
    """
    response: str
    sources: Optional[List[str]] = None
    confidence_score: float = Field(default=0.0, ge=0.0, le=1.0)

class RepositoryContext(BaseModel):
    """
    Detailed repository context for more informed responses
    """
    repo_name: str
    description: Optional[str] = None
    languages: Optional[List[str]] = []
    last_updated: Optional[str] = None
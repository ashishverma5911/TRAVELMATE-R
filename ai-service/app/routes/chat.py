from fastapi import APIRouter
from pydantic import BaseModel
from typing import Optional, Dict, Any
from app.services.claude_client import answer_tourist_query

router = APIRouter(prefix="/chat", tags=["Tourist Multilingual Chat"])

class ChatRequest(BaseModel):
    query: str
    traveler_context: Optional[Dict[str, Any]] = None

@router.post("")
def chat_endpoint(payload: ChatRequest):
    result = answer_tourist_query(payload.query, payload.traveler_context)
    return {
        "success": True,
        "data": result
    }

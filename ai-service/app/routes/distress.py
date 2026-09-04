from fastapi import APIRouter
from pydantic import BaseModel
from app.services.claude_client import detect_distress

router = APIRouter(prefix="/distress", tags=["Distress NLP Detection"])

class DistressRequest(BaseModel):
    message: str

@router.post("/check")
def distress_check_endpoint(payload: DistressRequest):
    result = detect_distress(payload.message)
    return {
        "success": True,
        "data": result
    }

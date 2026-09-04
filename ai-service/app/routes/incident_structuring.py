from fastapi import APIRouter
from pydantic import BaseModel
from app.services.claude_client import structure_incident_text

router = APIRouter(prefix="/incident", tags=["Incident Structuring"])

class IncidentStructuringRequest(BaseModel):
    raw_text: str

@router.post("/structure")
def structure_incident_endpoint(payload: IncidentStructuringRequest):
    structured = structure_incident_text(payload.raw_text)
    return {
        "success": True,
        "data": structured
    }

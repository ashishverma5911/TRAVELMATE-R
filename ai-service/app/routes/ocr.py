from fastapi import APIRouter
from pydantic import BaseModel
from app.services.ocr_service import extract_plate_number

router = APIRouter(prefix="/ocr", tags=["Vehicle Plate OCR"])

class OCRRequest(BaseModel):
    image_payload: str

@router.post("/plate")
def ocr_plate_endpoint(payload: OCRRequest):
    result = extract_plate_number(payload.image_payload)
    return {
        "success": True,
        "data": result
    }

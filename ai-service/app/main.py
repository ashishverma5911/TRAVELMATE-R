from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import chat, distress, incident_structuring, ocr
from app.config import PORT, HOST, ENV, CORS_ORIGIN

app = FastAPI(
    title="TravelMate AI Microservice",
    description="Anthropic Claude Decision-Support & OCR Microservice for SIH 2026 Delhi Prototype",
    version="1.0.0"
)

# CORS configuration
if CORS_ORIGIN == "*":
    origins = ["*"]
else:
    origins = [orig.strip() for orig in CORS_ORIGIN.split(",") if orig.strip()]
    for local_host in ["http://localhost:5173", "http://127.0.0.1:5173", "http://localhost:5000", "http://localhost:3000"]:
        if local_host not in origins:
            origins.append(local_host)

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_origin_regex=r"^https://.*\.vercel\.app$",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Healthcheck
@app.get("/health")
def health_check():
    return {
        "status": "healthy",
        "service": "TravelMate AI Microservice (FastAPI + Claude RAG)",
        "version": "1.0.0-SIH2026",
        "knowledge_base": "10 Verified Delhi Monuments + Helplines 112/1363"
    }

# Mount sub-routers
app.include_router(chat.router)
app.include_router(distress.router)
app.include_router(incident_structuring.router)
app.include_router(ocr.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host=HOST, port=PORT, reload=(ENV != "production"))

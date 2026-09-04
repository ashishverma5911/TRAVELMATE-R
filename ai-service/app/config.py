import os
from dotenv import load_dotenv

load_dotenv()

ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
PORT = int(os.getenv("PORT", "8000"))
HOST = os.getenv("HOST", "0.0.0.0")
ENV = os.getenv("ENV", "development")
CORS_ORIGIN = os.getenv("CORS_ORIGIN", "*")

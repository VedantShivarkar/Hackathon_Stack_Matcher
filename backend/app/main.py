from contextlib import asynccontextmanager
from typing import List
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .models import ProjectResult
from .search_engine import SearchEngine

engine = SearchEngine()

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Booting up: Fetching live hackathon data from GitHub...")
    engine.initialize()
    print("Live data ingested. Ready for search.")
    yield

app = FastAPI(title="Live Hackathon Matcher", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/search", response_model=List[ProjectResult])
def search(query: str = "", limit: int = 10):
    return engine.search(query=query, limit=limit)
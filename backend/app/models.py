from pydantic import BaseModel

class ProjectResult(BaseModel):
    name: str
    description: str
    stack: str
    date: str
    url: str
    winner: bool
    score: float
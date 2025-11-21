from pydantic import BaseModel, EmailStr
from typing import List

class UserLeadCreate(BaseModel):
    name: str
    email: EmailStr
    location: str
    frequency: str
    services: List[str]

class UserLeadResponse(UserLeadCreate):
    id: int

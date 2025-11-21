from pydantic import BaseModel, EmailStr
from typing import List

class BusinessLeadCreate(BaseModel):
    business_name: str
    owner_name: str
    email: EmailStr
    phone: str
    location: str
    services: List[str]

class BusinessLeadResponse(BaseModel):
    id: int
    business_name: str
    owner_name: str
    email: EmailStr
    phone: str
    location: str
    services: str # Returned as string from DB

from sqlmodel import SQLModel, Field
from typing import Optional, List
from datetime import datetime
from sqlalchemy import Column, String

class BusinessLead(SQLModel, table=True):
    __tablename__ = "business_leads"

    id: Optional[int] = Field(default=None, primary_key=True)
    business_name: str
    owner_name: str
    email: str
    phone: str
    location: str
    # Storing services as a comma-separated string for simplicity in this phase
    services: str
    created_at: datetime = Field(default_factory=datetime.utcnow)

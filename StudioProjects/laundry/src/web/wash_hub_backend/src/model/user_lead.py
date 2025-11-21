from sqlmodel import SQLModel, Field, Column
from sqlalchemy import JSON
from typing import Optional, List
from datetime import datetime

class UserLead(SQLModel, table=True):
    __tablename__ = "user_leads"

    id: Optional[int] = Field(default=None, primary_key=True)
    name: str
    email: str
    location: str
    frequency: str
    services: List[str] = Field(default=[], sa_column=Column(JSON))
    created_at: datetime = Field(default_factory=datetime.utcnow)

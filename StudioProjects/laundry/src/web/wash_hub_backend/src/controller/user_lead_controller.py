from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from src.config.database import get_session
from src.dto.user_lead_dto import UserLeadCreate, UserLeadResponse
from src.service.user_lead_service import UserLeadService

router = APIRouter()
service = UserLeadService()

@router.post("/", response_model=UserLeadResponse)
def create_user_lead(lead_data: UserLeadCreate, session: Session = Depends(get_session)):
    return service.create_lead(session, lead_data)

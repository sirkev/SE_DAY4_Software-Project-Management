from fastapi import APIRouter, Depends, HTTPException
from sqlmodel import Session
from src.config.database import get_session
from src.dto.business_lead_dto import BusinessLeadCreate, BusinessLeadResponse
from src.service.business_lead_service import BusinessLeadService

router = APIRouter()
service = BusinessLeadService()

@router.post("/", response_model=BusinessLeadResponse)
def create_business_lead(lead_data: BusinessLeadCreate, session: Session = Depends(get_session)):
    return service.create_lead(session, lead_data)

from sqlmodel import Session
from src.dao.business_lead_dao import BusinessLeadDAO
from src.dto.business_lead_dto import BusinessLeadCreate
from src.model.business_lead import BusinessLead

class BusinessLeadService:
    def __init__(self):
        self.dao = BusinessLeadDAO()

    def create_lead(self, session: Session, lead_data: BusinessLeadCreate) -> BusinessLead:
        return self.dao.create(session, lead_data)

from sqlmodel import Session
from src.dao.user_lead_dao import UserLeadDAO
from src.dto.user_lead_dto import UserLeadCreate
from src.model.user_lead import UserLead

class UserLeadService:
    def __init__(self):
        self.dao = UserLeadDAO()

    def create_lead(self, session: Session, lead_data: UserLeadCreate) -> UserLead:
        return self.dao.create(session, lead_data)

from sqlmodel import Session
from src.model.user_lead import UserLead
from src.dto.user_lead_dto import UserLeadCreate

class UserLeadDAO:
    def create(self, session: Session, lead_data: UserLeadCreate) -> UserLead:
        db_lead = UserLead.model_validate(lead_data)
        session.add(db_lead)
        session.commit()
        session.refresh(db_lead)
        return db_lead

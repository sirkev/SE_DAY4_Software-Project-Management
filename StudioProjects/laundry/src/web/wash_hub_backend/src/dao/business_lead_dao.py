from sqlmodel import Session
from src.model.business_lead import BusinessLead
from src.dto.business_lead_dto import BusinessLeadCreate

class BusinessLeadDAO:
    def create(self, session: Session, lead_data: BusinessLeadCreate) -> BusinessLead:
        # Convert list of services to comma-separated string
        services_str = ",".join(lead_data.services)
        
        db_lead = BusinessLead(
            business_name=lead_data.business_name,
            owner_name=lead_data.owner_name,
            email=lead_data.email,
            phone=lead_data.phone,
            location=lead_data.location,
            services=services_str
        )
        session.add(db_lead)
        session.commit()
        session.refresh(db_lead)
        return db_lead

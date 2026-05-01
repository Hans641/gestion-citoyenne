# backend/app/schemas.py
from pydantic import BaseModel, ConfigDict
from uuid import UUID

class CitizenBase(BaseModel):
    first_name: str
    last_name: str
    address: str
    cin: str | None = None

class CitizenCreate(CitizenBase):
    pass

class Citizen(CitizenBase):
    id: UUID
    
    # CRITIQUE : Permet à FastAPI de lire les objets SQLAlchemy
    model_config = ConfigDict(from_attributes=True)
# backend/app/schemas.py
from pydantic import ConfigDict, BaseModel
from uuid import UUID
from typing import Optional

# --- SCHÉMAS POUR LES CITOYENS ---
class CitizenBase(BaseModel):
    first_name: str
    last_name: str
    address: str
    cin: str

class CitizenCreate(CitizenBase):
    pass

class Citizen(CitizenBase):
    id: UUID
    model_config = ConfigDict(from_attributes=True)

# --- SCHÉMAS POUR LES PAPIERS ADMINISTRATIFS ---
class PaperBase(BaseModel):
    price: float
    category: Optional[str] = "Général"

class PaperCreate(PaperBase):
    # L'ID est optionnel ici pour éviter l'erreur 422 si le frontend ne l'envoie pas
    id: Optional[str] = None 
    name: str

class Paper(PaperCreate):
    model_config = ConfigDict(from_attributes=True)
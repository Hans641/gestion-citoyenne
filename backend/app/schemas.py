from pydantic import BaseModel, ConfigDict
from typing import Optional
from uuid import UUID

# Ce qu'on reçoit du Front-end lors de la création
class CitizenCreate(BaseModel):
    first_name: str
    last_name: str
    address: str
    cin: Optional[str] = None

# Ce qu'on renvoie au Front-end (avec l'UUID généré par la DB)
class Citizen(CitizenCreate):
    id: UUID  # Changement de int à UUID pour correspondre au modèle

    model_config = ConfigDict(from_attributes=True)
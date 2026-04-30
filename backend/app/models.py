# backend/app/models.py
from sqlalchemy import Column, String, DateTime, Boolean, Integer
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import declarative_base
import uuid
import datetime

Base = declarative_base()

class Citizen(Base):
    __tablename__ = "citizens"

    # Utilisation d'un UUID pour plus de sécurité (conforme à l'existant de l'utilisateur)
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    
    # Harmonisation avec le Frontend (App.jsx) et le Schéma
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    cin = Column(String, unique=True, nullable=True)
    
    # Champs additionnels conservés de la version précédente de l'utilisateur
    date_naissance = Column(DateTime, nullable=True) # Mis en nullable pour le test actuel
    lieu_naissance = Column(String, nullable=True)
    
    # Gestion de la synchro et sécurité
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    is_deleted = Column(Boolean, default=False)
    server_hash = Column(String)
# backend/app/models.py
from sqlalchemy import Column, String, DateTime, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import DeclarativeBase
import uuid
from datetime import datetime, timezone

# Classe de base pour SQLAlchemy
class Base(DeclarativeBase):
    pass

class User(Base):
    """Table pour gérer les accès à l'Espace Administration"""
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    is_active = Column(Boolean, default=True)

class Citizen(Base):
    """Table pour la gestion des citoyens de la commune (Dynamique - PostgreSQL)"""
    __tablename__ = "citizens"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    first_name = Column(String, nullable=False)
    last_name = Column(String, nullable=False)
    address = Column(String, nullable=False)
    cin = Column(String, unique=True, nullable=True)
    
    # Audit Logs pour le suivi des inscriptions
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime, default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))
    is_deleted = Column(Boolean, default=False)

# NOTE : La classe AdministrativePaper a été retirée car les tarifs sont 
# désormais gérés directement dans views.py (LISTE_PAPIERS).
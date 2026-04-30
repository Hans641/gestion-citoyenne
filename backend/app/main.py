# backend/app/main.py
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from uuid import UUID
from .database import engine, get_db
from . import models, schemas

# Création automatique des tables dans PostgreSQL
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Digitalisation Fokontany",
    description="Système de gestion de la Commune",
    version="1.1.0"
)

# --- CONFIGURATION CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- ROUTES ---

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de gestion de la Commune"}

@app.get("/test-db")
def test_db(db: Session = Depends(get_db)):
    """Vérifie si la connexion à la base de données est active."""
    try:
        count = db.query(models.Citizen).count()
        return {
            "status": "Connecté à PostgreSQL avec succès",
            "nombre_citoyens_actuel": count
        }
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"Erreur de connexion : {str(e)}"
        )

@app.post("/citizens/", response_model=schemas.Citizen, status_code=status.HTTP_201_CREATED)
def create_citizen(citizen: schemas.CitizenCreate, db: Session = Depends(get_db)):
    """Crée un nouveau citoyen dans la base de données."""
    db_citizen = models.Citizen(
        first_name=citizen.first_name,
        last_name=citizen.last_name,
        address=citizen.address,
        cin=citizen.cin
    )
    try:
        db.add(db_citizen)
        db.commit()
        db.refresh(db_citizen)
        return db_citizen
    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Erreur lors de l'insertion : {str(e)}"
        )

@app.get("/citizens/", response_model=list[schemas.Citizen])
def get_citizens(db: Session = Depends(get_db)):
    """Récupère la liste complète des citoyens enregistrés."""
    return db.query(models.Citizen).all()

# --- NOUVELLE ROUTE : SUPPRESSION ---

@app.delete("/citizens/{citizen_id}")
def delete_citizen(citizen_id: UUID, db: Session = Depends(get_db)):
    db_citizen = db.query(models.Citizen).filter(models.Citizen.id == citizen_id).first()
    
    if db_citizen is None:
        raise HTTPException(status_code=404, detail="Citoyen non trouvé")
    
    db.delete(db_citizen)
    db.commit()
    return {"message": "Suppression réussie"}
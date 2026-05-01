# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .database import engine
from . import models
from .urls import router as api_router

# Création des tables dans PostgreSQL
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API Digitalisation Fokontany",
    description="Système de gestion de la Commune",
    version="1.2.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion de la logique centralisée
app.include_router(api_router)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API de gestion de la Commune"}
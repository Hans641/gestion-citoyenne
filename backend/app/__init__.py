# backend/init_db.py
from app.database import SessionLocal
from app import models
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def init_admin():
    db = SessionLocal()
    # On vérifie si l'admin existe déjà
    admin_exists = db.query(models.User).filter(models.User.username == "admin").first()
    
    if not admin_exists:
        hashed_password = pwd_context.hash("fokontany2026")
        new_admin = models.User(
            username="admin",
            hashed_password=hashed_password
        )
        db.add(new_admin)
        db.commit()
        print("✅ Compte administrateur créé avec succès !")
    else:
        print("ℹ️ Le compte admin existe déjà.")
    db.close()

if __name__ == "__main__":
    init_admin()
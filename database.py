import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
from passlib.context import CryptContext

load_dotenv()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./lapis.db")

if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


def init_db():
    import models

    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        webmaster_user = db.query(models.Usuario).filter(models.Usuario.usuario == "webmaster").first()
        if not webmaster_user:
            print("🏛️ Creando usuario Webmaster...")
            pass_webmaster = pwd_context.hash("admin12345")
            admin_default = models.Usuario(
                usuario="webmaster",
                password_hash=pass_webmaster,
                nombre_real="Jean Carlos Rodriguez (Webmaster)",
                rol="webmaster",
                grado="maestro"
            )
            db.add(admin_default)
        else:
            print("ℹ️ Usuario 'webmaster' verificado.")

        venerable_user = db.query(models.Usuario).filter(models.Usuario.usuario == "venerable").first()
        if not venerable_user:
            print("📜 Creando usuario Venerable Maestro...")
            pass_venerable = pwd_context.hash("lapis123")
            venerable_default = models.Usuario(
                usuario="venerable",
                password_hash=pass_venerable,
                nombre_real="Venerable Maestro",
                rol="venerable_maestro",
                grado="maestro"
            )
            db.add(venerable_default)
        else:
            print("ℹ️ Usuario 'venerable' verificado.")

        if hasattr(models, 'CodigoPase'):
            pase_existente = db.query(models.CodigoPase).filter(models.CodigoPase.codigo == "PASE2026").first()
            if not pase_existente:
                print("🔑 Generando código de pase inicial: PASE2026")
                pase_inicial = models.CodigoPase(
                    codigo="PASE2026",
                    creado_por="webmaster",
                    usado=False
                )
                db.add(pase_inicial)

        db.commit()
        print("✅ Inicialización de la base de datos completada con éxito.")
    except Exception as e:
        db.rollback()
        print(f"❌ Error durante la inicialización de la base de datos: {e}")
    finally:
        db.close()
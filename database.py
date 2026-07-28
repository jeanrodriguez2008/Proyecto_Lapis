import os
from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base, sessionmaker
from dotenv import load_dotenv
from passlib.context import CryptContext

# Cargar variables de entorno desde el archivo .env si existe
load_dotenv()

# Contexto para manejo de contraseñas con bcrypt
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Leer la URL de la base de datos desde variables de entorno (Neon Tech)
# Si no está definida, usará una base de datos SQLite local para pruebas rápidas
DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./lapis.db")

# Ajuste automático para Neon Tech / PostgreSQL en Render:
# PostgreSQL requiere que las cadenas comiencen con postgresql:// en lugar de postgres://
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql://", 1)

# Configuración del motor según el tipo de base de datos (SQLite vs PostgreSQL/Neon)
connect_args = {}
if DATABASE_URL.startswith("sqlite"):
    connect_args = {"check_same_thread": False}

engine = create_engine(
    DATABASE_URL,
    connect_args=connect_args,
    pool_pre_ping=True  # Mantiene activa la conexión en Neon Tech evitando desconexiones por inactividad
)

# Sesión local para interactuar con la base de datos
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Clase base de la que heredarán nuestros modelos de SQLAlchemy
Base = declarative_base()

# Dependencia para obtener la sesión en los endpoints de FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ==========================================
# 🚀 INICIALIZACIÓN Y SEMBRADO DE BASE DE DATOS
# ==========================================

def init_db():
    """
    Crea automáticamente las tablas si no existen e inserta 
    los usuarios principales por defecto (Webmaster y Venerable Maestro).
    """
    import models  # Importación tardía para evitar importaciones circulares

    # Crear todas las tablas en la base de datos configurada
    Base.metadata.create_all(bind=engine)

    db = SessionLocal()
    try:
        # 1. Verificar y sembrar al Webmaster (Trono Supremo / Administrador)
        webmaster_user = db.query(models.Usuario).filter(models.Usuario.usuario == "webmaster").first()
        if not webmaster_user:
            pass_webmaster = pwd_context.hash("admin12345")
            admin_default = models.Usuario(
                usuario="webmaster",
                password_hash=pass_webmaster,
                nombre_real="Jean Carlos Rodriguez (Webmaster)",
                rol="webmaster",
                grado="maestro"
            )
            db.add(admin_default)

        # 2. Verificar y sembrar al Venerable Maestro
        venerable_user = db.query(models.Usuario).filter(models.Usuario.usuario == "venerable").first()
        if not venerable_user:
            pass_venerable = pwd_context.hash("lapis123")
            venerable_default = models.Usuario(
                usuario="venerable",
                password_hash=pass_venerable,
                nombre_real="Venerable Maestro",
                rol="venerable_maestro",
                grado="maestro"
            )
            db.add(venerable_default)

        db.commit()
    except Exception as e:
        db.rollback()
        print(f"[ERROR DB] Error durante la inicialización de la base de datos: {e}")
    finally:
        db.close()
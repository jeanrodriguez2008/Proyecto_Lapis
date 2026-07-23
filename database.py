import os
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env si existe
load_dotenv()

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
    pool_pre_ping=True # Mantiene activa la conexión en Neon Tech evitando desconexiones por inactividad
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
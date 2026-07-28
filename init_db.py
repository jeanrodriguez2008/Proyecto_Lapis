import hashlib
from database import SessionLocal, engine
import models

def encriptar_password(password: str) -> str:
    """Encripta la contraseña usando SHA-256."""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def inicializar_base_datos():
    # 1. Crear las tablas automáticamente si no existen
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 2. Configurar Webmaster (Trono Supremo)
        usuario_trono = db.query(models.Usuario).filter(models.Usuario.usuario == "webmaster").first()
        if not usuario_trono:
            print("🏛️ Creando usuario Webmaster...")
            nuevo_trono = models.Usuario(
                usuario="webmaster",
                password_hash=encriptar_password("admin12345"),
                nombre_real="Jean Carlos Rodriguez (Webmaster)",
                rol="webmaster"
            )
            db.add(nuevo_trono)
        else:
            usuario_trono.password_hash = encriptar_password("admin12345")
            print("ℹ️ Usuario 'webmaster' verificado.")

        # 3. Configurar Venerable Maestro
        usuario_venerable = db.query(models.Usuario).filter(models.Usuario.usuario == "venerable").first()
        if not usuario_venerable:
            print("📜 Creando usuario Venerable Maestro...")
            nuevo_venerable = models.Usuario(
                usuario="venerable",
                password_hash=encriptar_password("lapis123"),
                nombre_real="Venerable Maestro",
                rol="venerable_maestro"
            )
            db.add(nuevo_venerable)
        else:
            usuario_venerable.password_hash = encriptar_password("lapis123")
            print("ℹ️ Usuario 'venerable' verificado.")

        # 4. Generar código de pase inicial si no existe
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
        print("✅ Inicialización de perfiles maestros completada con éxito.")
            
    except Exception as e:
        db.rollback()
        print(f"❌ Error al inicializar la base de datos: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    inicializar_base_datos()
import hashlib
from database import SessionLocal, engine
import models

def encriptar_password(password: str) -> str:
    """Encripta la contraseña usando SHA-256."""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

def inicializar_base_datos():
    # 1. Crear las tablas si no existen
    models.Base.metadata.create_all(bind=engine)
    
    db = SessionLocal()
    try:
        # 2. Verificar si ya existe el usuario Trono
        usuario_trono = db.query(models.Usuario).filter(models.Usuario.usuario == "trono").first()
        
        if not usuario_trono:
            print("🏛️ Creando usuario semilla único (Trono / Webmaster)...")
            nuevo_trono = models.Usuario(
                usuario="trono",
                password_hash=encriptar_password("webmaster"), # Clave exacta requerida
                nombre_real="Webmaster / Trono",
                rol="trono"
            )
            db.add(nuevo_trono)
            
            # Código de pase inicial de seguridad
            pase_inicial = models.CodigoPase(
                codigo="PASE2026",
                creado_por="trono",
                usado=False
            )
            db.add(pase_inicial)
            
            db.commit()
            print("✅ Usuario 'trono' configurado correctamente (clave: webmaster).")
            print("🔑 Código de pase generado: PASE2026")
        else:
            # Si ya existía, actualizamos su clave a 'webmaster' por seguridad
            usuario_trono.password_hash = encriptar_password("webmaster")
            db.commit()
            print("ℹ️ Usuario 'trono' actualizado con la contraseña 'webmaster'.")
            
    except Exception as e:
        db.rollback()
        print(f"❌ Error al inicializar la base de datos: {e}")
    finally:
        db.close()

if __name__ == "__main__":
    inicializar_base_datos()
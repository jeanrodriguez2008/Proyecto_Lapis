import hashlib
import uuid
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status, Header
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import models
import schemas
from database import get_db, engine

from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
import os

app = FastAPI()

# Montar la carpeta frontend (si tienes imágenes, js, etc.)
if os.path.exists("frontend"):
    app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

# Ruta principal que entrega el index.html
@app.get("/")
def read_root():
    return FileResponse("index.html")

# Crear tablas automáticamente en la base de datos si no existen
models.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Proyecto Lapis - API del Templo",
    description="Sistema de Gestión de Roles, Trazados y Censo",
    version="1.0.0"
)

# Configuración de CORS para permitir que tu Frontend interactúe con el Backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción, restringe esto al dominio de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# 🔐 FUNCIONES DE SEGURIDAD Y AUTENTICACIÓN
# ==========================================

def encriptar_password(password: str) -> str:
    """Hashea la contraseña en SHA-256 para igualar el comportamiento de init_db."""
    return hashlib.sha256(password.encode('utf-8')).hexdigest()


def obtener_usuario_actual(
    db: Session = Depends(get_db), 
    authorization: str = Header(None, alias="Authorization")
) -> models.Usuario:
    """
    Dependencia de seguridad. 
    Usa autenticación basada en Token Simple (el nombre de usuario enviado en el header).
    """
    if not authorization:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Se requiere cabecera de Autorización (Authorization)."
        )
    
    # El header suele venir como "Bearer <usuario>" o simplemente "<usuario>"
    username = authorization.replace("Bearer ", "").strip()
    
    user = db.query(models.Usuario).filter(models.Usuario.usuario == username).first()
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuario no autorizado o sesión inválida."
        )
    return user


# ==========================================
# 👥 ENDPOINTS DE AUTENTICACIÓN Y REGISTRO
# ==========================================

@app.post("/api/auth/registro", response_model=schemas.UsuarioResponse, status_code=status.HTTP_201_CREATED)
def registrar_usuario(req: schemas.RegistroRequest, db: Session = Depends(get_db)):
    # 1. Verificar si el nombre de usuario ya existe
    usuario_existente = db.query(models.Usuario).filter(models.Usuario.usuario == req.usuario).first()
    if usuario_existente:
        raise HTTPException(status_code=400, detail="El nombre de usuario ya está registrado.")
    
    # 2. Validar la Palabra de Pase (Código de Pase)
    codigo = db.query(models.CodigoPase).filter(
        models.CodigoPase.codigo == req.codigo_pase, 
        models.CodigoPase.usado == False
    ).first()
    
    if not codigo:
        raise HTTPException(
            status_code=403, 
            detail="Palabra de pase inválida o ya utilizada. Solicite una nueva a una Dignidad."
        )
    
    # 3. Quemar el código para que no pueda volver a usarse (Un solo uso garantizado)
    codigo.usado = True
    
    # 4. Crear el nuevo usuario con su rol correspondiente
    nuevo_usuario = models.Usuario(
        usuario=req.usuario,
        password_hash=encriptar_password(req.password),
        nombre_real=req.nombre_real,
        rol=req.rol
    )
    
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario


@app.post("/api/auth/login")
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(models.Usuario.usuario == req.usuario).first()
    if not user:
        raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos.")
    
    # Validar hash de contraseña
    if user.password_hash != encriptar_password(req.password):
        raise HTTPException(status_code=400, detail="Usuario o contraseña incorrectos.")
    
    # Ajustado para que el frontend pueda leer "nombre" y "token" cómodamente
    return {
        "token": user.usuario,
        "usuario": {
            "usuario": user.usuario,
            "nombre": user.nombre_real,
            "rol": user.rol
        }
    }


# ==========================================
# 🎫 ENDPOINTS DE CÓDIGOS DE PASE (Alineados con js)
# ==========================================

@app.post("/api/codigos/generar", response_model=schemas.CodigoPaseResponse)
def generar_codigo_pase(db: Session = Depends(get_db), autor: models.Usuario = Depends(obtener_usuario_actual)):
    # Solo el Trono o el Venerable Maestro pueden generar palabras de pase
    if autor.rol not in ["trono", "venerable_maestro"]:
        raise HTTPException(
            status_code=403, 
            detail="Solo el Trono o el Venerable Maestro pueden consagrar palabras de pase."
        )
    
    # Generamos un código único aleatorio de 8 caracteres
    nuevo_codigo = str(uuid.uuid4())[:8].upper()
    
    pase = models.CodigoPase(
        codigo=nuevo_codigo,
        creado_por=autor.usuario
    )
    db.add(pase)
    db.commit()
    db.refresh(pase)
    return pase


@app.get("/api/codigos/listar", response_model=List[schemas.CodigoPaseResponse])
def listar_codigos_pase(db: Session = Depends(get_db), autor: models.Usuario = Depends(obtener_usuario_actual)):
    if autor.rol not in ["trono", "venerable_maestro"]:
        raise HTTPException(status_code=403, detail="Acceso denegado a la cámara de pases.")
    
    return db.query(models.CodigoPase).order_by(models.CodigoPase.fecha_creacion.desc()).all()


# ==========================================
# 📐 ENDPOINTS DEL CENSO (Alineados con js)
# ==========================================

@app.post("/api/censo/consignar", response_model=schemas.CensoResponse)
def registrar_en_censo(req: schemas.CensoCreate, db: Session = Depends(get_db)):
    # Validar si la cédula ya se registró
    cedula_existente = db.query(models.Censo).filter(models.Censo.cedula == req.cedula).first()
    if cedula_existente:
        raise HTTPException(status_code=400, detail="Esta cédula ya tiene una planilla de censo registrada.")
    
    nueva_planilla = models.Censo(
        nombre=req.nombre,
        cedula=req.cedula,
        correo=req.correo,
        telefono=req.telefono,
        grado=req.grado,
        profesion=req.profesion,
        nacimiento=req.nacimiento,
        direccion=req.direccion,
        pregunta_mascota=req.pregunta_mascota,
        pregunta_pelicula=req.pregunta_pelicula,
        pregunta_deporte=req.pregunta_deporte
    )
    db.add(nueva_planilla)
    db.commit()
    db.refresh(nueva_planilla)
    return {
        "id": nueva_planilla.id,
        "nombre": nueva_planilla.nombre,
        "cedula": nueva_planilla.cedula,
        "correo": nueva_planilla.correo,
        "telefono": nueva_planilla.telefono,
        "grado": nueva_planilla.grado,
        "profesion": nueva_planilla.profesion,
        "nacimiento": nueva_planilla.nacimiento,
        "direccion": nueva_planilla.direccion,
        "pregunta_mascota": nueva_planilla.pregunta_mascota,
        "pregunta_pelicula": nueva_planilla.pregunta_pelicula,
        "pregunta_deporte": nueva_planilla.pregunta_deporte,
        "estado": nueva_planilla.estado,
        "fecha_creacion": nueva_planilla.fecha_creacion,
        "message": "Planilla consignada con éxito a los archivos de la Logia." # Para el alert() del front
    }


@app.get("/api/censo/listar", response_model=List[schemas.CensoResponse])
def ver_planillas_censo(db: Session = Depends(get_db), usuario: models.Usuario = Depends(obtener_usuario_actual)):
    # Solo dignidades (Trono, Venerable, Vigilantes) pueden auditar el censo
    if usuario.rol not in ["trono", "venerable_maestro", "primer_vigilante", "segundo_vigilante"]:
        raise HTTPException(status_code=403, detail="No posees el rango para auditar el Censo.")
    
    return db.query(models.Censo).order_by(models.Censo.fecha_creacion.desc()).all()


@app.patch("/api/censo/{planilla_id}/estado")
def dictaminar_planilla(
    planilla_id: int, 
    nuevo_estado: str, # 'Aprobado' o 'Rechazado'
    db: Session = Depends(get_db), 
    usuario: models.Usuario = Depends(obtener_usuario_actual)
):
    if usuario.rol not in ["trono", "venerable_maestro", "primer_vigilante", "segundo_vigilante"]:
        raise HTTPException(status_code=403, detail="No posees autoridad para dictaminar el censo.")
    
    planilla = db.query(models.Censo).filter(models.Censo.id == planilla_id).first()
    if not planilla:
        raise HTTPException(status_code=404, detail="Planilla no encontrada.")
    
    if nuevo_estado not in ["Aprobado", "Rechazado"]:
        raise HTTPException(status_code=400, detail="Estado inválido.")
    
    planilla.estado = nuevo_estado
    db.commit()
    return {"mensaje": f"Planilla marcada como {nuevo_estado} con éxito."}


# ==========================================
# 📜 ENDPOINTS DE TRAZADOS (PUBLICACIONES SEGMENTADAS)
# ==========================================

@app.post("/api/trazados", response_model=schemas.TrazadoResponse)
def crear_trazado(req: schemas.TrazadoCreate, db: Session = Depends(get_db), autor: models.Usuario = Depends(obtener_usuario_actual)):
    # Los aprendices no pueden publicar trazados, solo leerlos
    if autor.rol == "aprendiz":
        raise HTTPException(status_code=403, detail="Los Aprendices no tienen permitido publicar Trazados.")
    
    nuevo_trazado = models.Trazado(
        titulo=req.titulo,
        contenido=req.contenido,
        autor=autor.nombre_real,
        rol_autor=autor.rol,
        camara_destino=req.camara_destino
    )
    db.add(nuevo_trazado)
    db.commit()
    db.refresh(nuevo_trazado)
    return nuevo_trazado


@app.get("/api/trazados", response_model=List[schemas.TrazadoResponse])
def ver_trazados(db: Session = Depends(get_db), usuario: models.Usuario = Depends(obtener_usuario_actual)):
    """
    Filtro de seguridad por grados:
    - Un aprendiz solo lee trazados de la cámara 'aprendiz'.
    - Un compañero lee trazados de 'aprendiz' y 'companero'.
    - Un maestro/dignidad lee absolutamente todo.
    """
    query = db.query(models.Trazado)
    
    if usuario.rol == "aprendiz":
        query = query.filter(models.Trazado.camara_destino == "aprendiz")
    elif usuario.rol == "companero":
        query = query.filter(models.Trazado.camara_destino.in_(["aprendiz", "companero"]))
    
    return query.order_by(models.Trazado.fecha_publicacion.desc()).all()


@app.delete("/api/trazados/{trazado_id}")
def borrar_trazado(trazado_id: int, db: Session = Depends(get_db), usuario: models.Usuario = Depends(obtener_usuario_actual)):
    """
    Solo el Trono o el Venerable Maestro tienen potestad para borrar trazados.
    """
    if usuario.rol not in ["trono", "venerable_maestro"]:
        raise HTTPException(status_code=403, detail="Solo el Trono o el Venerable Maestro pueden borrar trazados.")
    
    trazado = db.query(models.Trazado).filter(models.Trazado.id == trazado_id).first()
    if not trazado:
        raise HTTPException(status_code=404, detail="Trazado no encontrado.")
    
    db.delete(trazado)
    db.commit()
    return {"mensaje": "Trazado eliminado correctamente por la autoridad."}


# ==========================================
# 💬 ENDPOINTS DEL CHAT (CÁMARA DEL MEDIO)
# ==========================================

@app.post("/api/chat", response_model=schemas.ChatMensajeResponse)
def enviar_mensaje_chat(req: schemas.ChatMensajeCreate, db: Session = Depends(get_db), usuario: models.Usuario = Depends(obtener_usuario_actual)):
    # Restringido para Maestros y Dignidades superiores
    roles_permitidos = ["trono", "venerable_maestro", "primer_vigilante", "segundo_vigilante", "maestro"]
    if usuario.rol not in roles_permitidos:
        raise HTTPException(status_code=403, detail="Solo los Maestros Masones pueden hablar en el chat.")
    
    nuevo_mensaje = models.ChatMensaje(
        usuario_nombre=usuario.nombre_real,
        rol_usuario=usuario.rol,
        mensaje=req.mensaje
    )
    db.add(nuevo_mensaje)
    db.commit()
    db.refresh(nuevo_mensaje)
    return nuevo_mensaje


@app.get("/api/chat", response_model=List[schemas.ChatMensajeResponse])
def ver_mensajes_chat(db: Session = Depends(get_db), usuario: models.Usuario = Depends(obtener_usuario_actual)):
    roles_permitidos = ["trono", "venerable_maestro", "primer_vigilante", "segundo_vigilante", "maestro"]
    if usuario.rol not in roles_permitidos:
        raise HTTPException(status_code=403, detail="El chat de la Cámara del Medio está oculto a tus ojos.")
    
    # Traemos los últimos 50 mensajes enviados al chat
    return db.query(models.ChatMensaje).order_by(models.ChatMensaje.fecha_envio.desc()).limit(50).all()
# Un comentario de prueba para forzar git
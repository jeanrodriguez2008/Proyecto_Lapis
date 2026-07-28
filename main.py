import uuid
import os
from typing import List
from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy.orm import Session

import models
import schemas
from database import engine, get_db, init_db
from security import (
    obtener_usuario_actual,
    encriptar_password,
    verificar_password,
    crear_token_acceso,
    ROLES_ADMINISTRATIVOS
)

app = FastAPI(
    title="API Proyecto Lapis",
    description="Backend para la gestión institucional de la R:.L:.S:. Dignidad Humana N° 149",
    version="1.0.0"
)

@app.on_event("startup")
def startup_event():
    init_db()

contador_visitas_global = 0

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def validar_acceso_maestro_o_admin(usuario: models.Usuario):
    grado = (usuario.grado or "").strip().lower()
    rol = (usuario.rol or "").strip().lower()
    
    if grado in ["aprendiz", "compañero"] or rol in ["aprendiz", "compañero"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acceso denegado: Reservado exclusivamente para Maestros y Dignidades."
        )


# ==========================================
# 🔐 ENDPOINTS: AUTENTICACIÓN Y REGISTRO
# ==========================================

@app.post("/api/auth/login", response_model=schemas.LoginResponse)
def login(req: schemas.LoginRequest, db: Session = Depends(get_db)):
    usuario = db.query(models.Usuario).filter(models.Usuario.usuario == req.usuario).first()
    if not usuario or not verificar_password(req.password, usuario.password_hash):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Credenciales de acceso incorrectas."
        )
    
    token = crear_token_acceso(data={"sub": usuario.usuario, "rol": usuario.rol})
    return {
        "token": token,
        "usuario": {
            "id": usuario.id,
            "usuario": usuario.usuario,
            "nombre_real": usuario.nombre_real,
            "rol": usuario.rol,
            "grado": usuario.grado
        }
    }


@app.post("/api/auth/registro", response_model=schemas.UsuarioResponse)
def registrar_usuario(req: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    codigo_valido = db.query(models.CodigoPase).filter(
        models.CodigoPase.codigo == req.codigo_pase,
        models.CodigoPase.usado == False
    ).first()
    
    if not codigo_valido:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Palabra de pase inválida o ya utilizada."
        )
    
    existe = db.query(models.Usuario).filter(models.Usuario.usuario == req.usuario).first()
    if existe:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="El nombre de usuario ya se encuentra registrado."
        )
    
    nuevo_usuario = models.Usuario(
        usuario=req.usuario,
        password_hash=encriptar_password(req.password),
        nombre_real=req.nombre_real,
        rol=req.rol,
        grado=req.grado
    )
    
    codigo_valido.usado = True
    codigo_valido.usado_por = req.usuario
    
    db.add(nuevo_usuario)
    db.commit()
    db.refresh(nuevo_usuario)
    return nuevo_usuario


@app.post("/api/auth/recuperar-password")
def recuperar_password(req: schemas.RecuperarPasswordRequest, db: Session = Depends(get_db)):
    user = db.query(models.Usuario).filter(
        models.Usuario.usuario == req.usuario
    ).first()
    
    if not user:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuario no encontrado.")
    
    if not user.respuesta_secreta or user.respuesta_secreta.lower().strip() != req.respuesta_secreta.lower().strip():
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="La respuesta secreta no coincide.")
    
    user.password_hash = encriptar_password(req.nueva_password)
    db.commit()
    return {"mensaje": "Contraseña restablecida exitosamente."}


# ==========================================
# 🏛️ ENDPOINTS: PASOS PERDIDOS Y VISITAS
# ==========================================

@app.get("/api/pasos-perdidos", response_model=List[schemas.TarjetaPasosPerdidosResponse])
def listar_pasos_perdidos(db: Session = Depends(get_db)):
    return db.query(models.TarjetaPasosPerdidos).order_by(models.TarjetaPasosPerdidos.fecha.desc()).all()


@app.post("/api/pasos-perdidos", response_model=schemas.TarjetaPasosPerdidosResponse)
def crear_pasos_perdidos(
    req: schemas.TarjetaPasosPerdidosCreate, 
    db: Session = Depends(get_db), 
    autor: models.Usuario = Depends(obtener_usuario_actual)
):
    if autor.rol not in ROLES_ADMINISTRATIVOS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No posee permisos para publicar en Pasos Perdidos.")
    
    nueva_tarjeta = models.TarjetaPasosPerdidos(
        titulo=req.titulo,
        contenido=req.contenido,
        categoria=req.categoria,
        url_pdf=req.url_pdf,
        autor=autor.nombre_real
    )
    db.add(nueva_tarjeta)
    db.commit()
    db.refresh(nueva_tarjeta)
    return nueva_tarjeta


@app.delete("/api/pasos-perdidos/{tarjeta_id}")
def eliminar_pasos_perdidos(tarjeta_id: int, db: Session = Depends(get_db), autor: models.Usuario = Depends(obtener_usuario_actual)):
    if autor.rol not in ROLES_ADMINISTRATIVOS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No autorizado.")
    
    tarjeta = db.query(models.TarjetaPasosPerdidos).filter(models.TarjetaPasosPerdidos.id == tarjeta_id).first()
    if not tarjeta:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Publicación no encontrada.")
    
    db.delete(tarjeta)
    db.commit()
    return {"mensaje": "Publicación eliminada correctamente."}


@app.post("/api/pasos-perdidos/visitas")
def registrar_visita():
    global contador_visitas_global
    contador_visitas_global += 1
    return {"visitas": contador_visitas_global}


# ==========================================
# ✊ ENDPOINTS: TOCAR PUERTA / CONTACTO
# ==========================================

@app.post("/api/contacto", response_model=schemas.SolicitudContactoResponse)
def enviar_contacto(req: schemas.SolicitudContactoCreate, db: Session = Depends(get_db)):
    nueva_solicitud = models.SolicitudContacto(
        nombre=req.nombre,
        email=req.email,
        telefono=req.telefono,
        redes=req.redes,
        mensaje=req.mensaje
    )
    db.add(nueva_solicitud)
    db.commit()
    db.refresh(nueva_solicitud)
    return nueva_solicitud


@app.get("/api/contacto/listar", response_model=List[schemas.SolicitudContactoResponse])
def listar_contactos(db: Session = Depends(get_db), admin: models.Usuario = Depends(obtener_usuario_actual)):
    if admin.rol not in ROLES_ADMINISTRATIVOS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acceso reservado para el Trono y Webmaster.")
    return db.query(models.SolicitudContacto).order_by(models.SolicitudContacto.fecha_creacion.desc()).all()


@app.post("/api/contacto/{solicitud_id}/generar-codigo")
def generar_codigo_contacto(solicitud_id: int, db: Session = Depends(get_db), admin: models.Usuario = Depends(obtener_usuario_actual)):
    if admin.rol not in ROLES_ADMINISTRATIVOS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acceso denegado.")
    
    sol = db.query(models.SolicitudContacto).filter(models.SolicitudContacto.id == solicitud_id).first()
    if not sol:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solicitud no encontrada.")
    
    nuevo_codigo = f"TRONO149-{str(uuid.uuid4())[:5].upper()}"
    sol.codigo_generado = nuevo_codigo
    
    pase = models.CodigoPase(codigo=nuevo_codigo, creado_por=admin.usuario)
    db.add(pase)
    db.commit()
    
    return {"codigo": nuevo_codigo}


# ==========================================
# 📜 ENDPOINTS: TRAZADOS
# ==========================================

@app.get("/api/trazados", response_model=List[schemas.TrazadoResponse])
def listar_trazados(db: Session = Depends(get_db), usuario: models.Usuario = Depends(obtener_usuario_actual)):
    return db.query(models.Trazado).order_by(models.Trazado.fecha_publicacion.desc()).all()


@app.post("/api/trazados", response_model=schemas.TrazadoResponse)
def crear_trazado(req: schemas.TrazadoCreate, db: Session = Depends(get_db), autor: models.Usuario = Depends(obtener_usuario_actual)):
    nuevo_trazado = models.Trazado(
        titulo=req.titulo,
        contenido=req.contenido,
        camara_destino=req.camara_destino,
        autor=autor.nombre_real,
        rol_autor=autor.rol
    )
    db.add(nuevo_trazado)
    db.commit()
    db.refresh(nuevo_trazado)
    return nuevo_trazado


@app.delete("/api/trazados/{trazado_id}")
def eliminar_trazado(trazado_id: int, db: Session = Depends(get_db), autor: models.Usuario = Depends(obtener_usuario_actual)):
    if autor.rol not in ROLES_ADMINISTRATIVOS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acceso denegado.")
    
    trazado = db.query(models.Trazado).filter(models.Trazado.id == trazado_id).first()
    if not trazado:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Trazado no encontrado.")
    
    db.delete(trazado)
    db.commit()
    return {"mensaje": "Trazado eliminado."}


# ==========================================
# ⚖️ ENDPOINTS: BALOTAJES (VOTACIONES)
# ==========================================

@app.get("/api/balotajes")
def listar_balotajes(db: Session = Depends(get_db), usuario: models.Usuario = Depends(obtener_usuario_actual)):
    validar_acceso_maestro_o_admin(usuario)
    return db.query(models.Balotaje).order_by(models.Balotaje.id.desc()).all()


@app.post("/api/balotajes")
def crear_balotaje(data: dict, db: Session = Depends(get_db), admin: models.Usuario = Depends(obtener_usuario_actual)):
    if admin.rol not in ROLES_ADMINISTRATIVOS:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Acceso denegado.")
    
    nuevo_balotaje = models.Balotaje(
        candidato=data.get("candidato", "Candidato"),
        motivo=data.get("motivo", "Iniciación"),
        descripcion=data.get("descripcion", ""),
        fecha_inicio=data.get("fecha_inicio", ""),
        fecha_fin=data.get("fecha_fin", ""),
        activo=True,
        blancas=0,
        negras=0
    )
    db.add(nuevo_balotaje)
    db.commit()
    db.refresh(nuevo_balotaje)
    return nuevo_balotaje


@app.post("/api/balotajes/{balotaje_id}/votar")
def emitir_voto(balotaje_id: int, payload: dict, db: Session = Depends(get_db), usuario: models.Usuario = Depends(obtener_usuario_actual)):
    validar_acceso_maestro_o_admin(usuario)
    
    balotaje = db.query(models.Balotaje).filter(models.Balotaje.id == balotaje_id, models.Balotaje.activo == True).first()
    if not balotaje:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Balotaje no encontrado o finalizado.")
    
    ya_voto = db.query(models.VotoRegistro).filter(
        models.VotoRegistro.balotaje_id == balotaje_id,
        models.VotoRegistro.usuario_id == usuario.id
    ).first()
    
    if ya_voto:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Ya has emitido tu voto en esta balota.")
    
    tipo_voto = payload.get("voto")  # "blanca" o "negra"
    if tipo_voto == "blanca":
        balotaje.blancas += 1
    elif tipo_voto == "negra":
        balotaje.negras += 1
    else:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Voto no válido.")
    
    registro = models.VotoRegistro(balotaje_id=balotaje_id, usuario_id=usuario.id)
    db.add(registro)
    db.commit()
    
    return {"mensaje": "Voto registrado exitosamente."}


app.mount("/", StaticFiles(directory="frontend", html=True), name="static")
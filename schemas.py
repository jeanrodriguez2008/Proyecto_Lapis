from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, Union, List
from datetime import datetime

# ==========================================
# 🏛️ ESQUEMAS DE AUTENTICACIÓN Y REGISTRO
# ==========================================

class LoginRequest(BaseModel):
    usuario: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)


class RegistroRequest(BaseModel):
    usuario: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)
    nombre_real: str = Field(..., min_length=3, max_length=100)
    rol: str = Field("aprendiz", description="trono, venerable_maestro, primer_vigilante, segundo_vigilante, maestro, companero, aprendiz")
    grado: Optional[str] = Field("Aprendiz", description="Aprendiz, Compañero, Maestro Masón")
    codigo_pase: str = Field(..., description="Palabra de pase generada por el Trono o Webmaster")
    respuesta_secreta: Optional[str] = Field(None, description="Respuesta a la pregunta de seguridad")


class RecuperarPasswordRequest(BaseModel):
    usuario: str
    respuesta_secreta: str
    nueva_password: str = Field(..., min_length=6)


class UsuarioResponse(BaseModel):
    id: int
    usuario: str
    nombre_real: str
    rol: str
    grado: Optional[str] = "Aprendiz"
    fecha_registro: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 🏛️ PASOS PERDIDOS (PUBLICACIONES PÚBLICAS)
# ==========================================

class TarjetaPasosPerdidosCreate(BaseModel):
    titulo: str = Field(..., min_length=3)
    contenido: str = Field(..., min_length=10)
    categoria: str = Field("principios", description="principios, docencia, accion, biblioteca")
    url_pdf: Optional[str] = None


class TarjetaPasosPerdidosResponse(BaseModel):
    id: int
    titulo: str
    contenido: str
    categoria: str
    url_pdf: Optional[str] = None
    autor: str
    fecha: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# ✊ TOCAR PUERTA (SOLICITUDES PROFANAS)
# ==========================================

class SolicitudContactoCreate(BaseModel):
    nombre: str = Field(..., min_length=3)
    email: EmailStr
    telefono: str
    redes: Optional[str] = None
    mensaje: str = Field(..., min_length=5)


class SolicitudContactoResponse(BaseModel):
    id: int
    nombre: str
    email: str
    telefono: str
    redes: Optional[str]
    mensaje: str
    codigo_generado: Optional[str] = None
    fecha_creacion: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 🗳️ BALOTAJE Y ESCRUTINIO SECRETO
# ==========================================

class BalotajeCreate(BaseModel):
    candidato: str
    motivo: str
    descripcion: str
    fecha_inicio: Optional[str] = None
    fecha_fin: Optional[str] = None


class VotoBalotajeRequest(BaseModel):
    tipo_voto: str = Field(..., description="'blanca' o 'negra'")


class BalotajeResponse(BaseModel):
    id: int
    candidato: str
    motivo: str
    descripcion: str
    fecha_inicio: Optional[str]
    fecha_fin: Optional[str]
    activo: bool
    blancas: int
    negras: int

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 🎫 PALABRAS DE PASE & TRAZADOS
# ==========================================

class CodigoPaseResponse(BaseModel):
    id: int
    codigo: str
    creado_por: str
    usado: bool
    fecha_creacion: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)


class TrazadoCreate(BaseModel):
    titulo: str = Field(..., min_length=3)
    contenido: str = Field(..., min_length=10)
    camara_destino: str = Field("aprendiz", description="aprendiz, companero, maestro")


class TrazadoResponse(BaseModel):
    id: int
    titulo: str
    contenido: str
    autor: str
    rol_autor: str
    camara_destino: str
    fecha_publicacion: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)
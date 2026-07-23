from pydantic import BaseModel, EmailStr, Field, ConfigDict
from typing import Optional, Union
from datetime import datetime

# ==========================================
# 🏛️ ESQUEMAS DE AUTENTICACIÓN Y REGISTRO
# ==========================================

class LoginRequest(BaseModel):
    """Esquema para que las Dignidades e Iniciados soliciten acceso."""
    usuario: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)


class RegistroRequest(BaseModel):
    """
    Esquema de registro obligatorio. 
    Exige la palabra de pase física para poder crear el usuario en el Templo.
    """
    usuario: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=6)
    nombre_real: str = Field(..., min_length=3, max_length=100)
    
    # Jerarquía estricta de roles autorizados
    rol: str = Field("aprendiz", description="trono, venerable_maestro, primer_vigilante, segundo_vigilante, maestro, companero, aprendiz")
    
    # Condición crítica: El código de pase que valide este registro
    codigo_pase: str = Field(..., description="Palabra de pase generada previamente por el Trono o el Venerable Maestro")


class UsuarioResponse(BaseModel):
    """Esquema seguro para devolver datos del usuario sin revelar el hash de contraseña."""
    id: int
    usuario: str
    nombre_real: str
    rol: str
    fecha_registro: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 📐 ESQUEMAS DEL CENSO (TOCAR PUERTAS)
# ==========================================

class CensoCreate(BaseModel):
    """Planilla de solicitud de Censo que envían los profanos o HH.'. visitadores."""
    nombre: str = Field(..., min_length=3)
    cedula: str = Field(..., min_length=5)
    correo: EmailStr
    telefono: Optional[str] = None
    grado: str = Field("Aprendiz", description="Aprendiz, Compañero, Maestro Masón, Past Master")
    profesion: Optional[str] = None
    nacimiento: Optional[str] = None
    direccion: Optional[str] = None
    
    # Respuestas de seguridad para validar identidad
    pregunta_mascota: Optional[str] = None
    pregunta_pelicula: Optional[str] = None
    pregunta_deporte: Optional[str] = None


class CensoResponse(BaseModel):
    """Esquema para mostrar las planillas registradas a los Vigilantes y al Venerable Maestro."""
    id: int
    nombre: str
    cedula: str
    correo: str
    telefono: Optional[str]
    grado: str
    profesion: Optional[str]
    nacimiento: Optional[str]
    direccion: Optional[str]
    pregunta_mascota: Optional[str]
    pregunta_pelicula: Optional[str]
    pregunta_deporte: Optional[str]
    estado: str  # 'Pendiente', 'Aprobado', 'Rechazado'
    fecha_creacion: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 🎫 ESQUEMAS DE PALABRAS DE PASE (CÓDIGOS)
# ==========================================

class CodigoPaseCreate(BaseModel):
    """Esquema para que el Trono o el Venerable soliciten un nuevo código de pase."""
    creado_por: str


class CodigoPaseResponse(BaseModel):
    """Retorno de los pases en circulación."""
    id: int
    codigo: str
    creado_por: str
    usado: bool
    fecha_creacion: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 📜 ESQUEMAS DE TRAZADOS (PUBLICACIONES)
# ==========================================

class TrazadoCreate(BaseModel):
    """Esquema para publicar un nuevo trazado en una cámara específica."""
    titulo: str = Field(..., min_length=3)
    contenido: str = Field(..., min_length=10)
    camara_destino: str = Field("aprendiz", description="aprendiz, companero, maestro")


class TrazadoResponse(BaseModel):
    """Lectura de publicaciones permitidas por grado."""
    id: int
    titulo: str
    contenido: str
    autor: str
    rol_autor: str
    camara_destino: str
    fecha_publicacion: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 💬 ESQUEMAS DE CHAT (EXCLUSIVO MAESTROS)
# ==========================================

class ChatMensajeCreate(BaseModel):
    """Envío de mensajes en la cámara."""
    mensaje: str = Field(..., min_length=1)


class ChatMensajeResponse(BaseModel):
    """Historial del chat."""
    id: int
    usuario_nombre: str
    rol_usuario: str
    mensaje: str
    fecha_envio: Optional[Union[datetime, str]] = None

    model_config = ConfigDict(from_attributes=True)
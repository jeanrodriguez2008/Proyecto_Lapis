from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from database import Base

def obtener_fecha_actual():
    """Retorna la fecha y hora UTC actual para consistencia en la BD."""
    return datetime.now(timezone.utc)


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    usuario = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)  # Contraseña encriptada
    nombre_real = Column(String, nullable=False)
    
    # Jerarquía estricta de roles: 
    # 'trono', 'venerable_maestro', 'primer_vigilante', 'segundo_vigilante', 'maestro', 'companero', 'aprendiz'
    rol = Column(String, default="aprendiz", nullable=False)
    fecha_registro = Column(DateTime, default=obtener_fecha_actual)


class Censo(Base):
    __tablename__ = "censo"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    cedula = Column(String, unique=True, index=True, nullable=False)
    correo = Column(String, nullable=False)
    telefono = Column(String, nullable=True)
    grado = Column(String, nullable=False)  # Grado declarado (Aprendiz, Compañero, etc.)
    profesion = Column(String, nullable=True)
    nacimiento = Column(String, nullable=True)
    direccion = Column(String, nullable=True)
    
    # Respuestas de seguridad para validar identidad ante sospechas
    pregunta_mascota = Column(String, nullable=True)
    pregunta_pelicula = Column(String, nullable=True)
    pregunta_deporte = Column(String, nullable=True)
    
    # Estado del visado: 'Pendiente', 'Aprobado', 'Rechazado'
    estado = Column(String, default="Pendiente", nullable=False)
    fecha_creacion = Column(DateTime, default=obtener_fecha_actual)


class CodigoPase(Base):
    __tablename__ = "codigos_pase"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String, unique=True, index=True, nullable=False)  # Código secreto aleatorio
    creado_por = Column(String, nullable=False)  # Quien generó el pase (Trono o Venerable)
    usado = Column(Boolean, default=False, nullable=False)  # Un solo uso garantizado
    fecha_creacion = Column(DateTime, default=obtener_fecha_actual)


class Trazado(Base):
    __tablename__ = "trazados"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    contenido = Column(Text, nullable=False)  # Uso de Text para soportar trazados extensos
    autor = Column(String, nullable=False)  # Nombre del autor
    rol_autor = Column(String, nullable=False)  # Rol para validar
    
    # Cámara a la que va dirigida la publicación: 'aprendiz', 'companero', 'maestro'
    camara_destino = Column(String, default="aprendiz", nullable=False)
    fecha_publicacion = Column(DateTime, default=obtener_fecha_actual)


class ChatMensaje(Base):
    __tablename__ = "chat_mensajes"

    id = Column(Integer, primary_key=True, index=True)
    usuario_nombre = Column(String, nullable=False)
    rol_usuario = Column(String, nullable=False)
    mensaje = Column(Text, nullable=False)  # Uso de Text para mensajes largos
    fecha_envio = Column(DateTime, default=obtener_fecha_actual)
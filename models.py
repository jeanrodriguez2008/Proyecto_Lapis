from datetime import datetime, timezone
from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from database import Base

def obtener_fecha_actual():
    return datetime.now(timezone.utc)


class Usuario(Base):
    __tablename__ = "usuarios"

    id = Column(Integer, primary_key=True, index=True)
    usuario = Column(String, unique=True, index=True, nullable=False)
    password_hash = Column(String, nullable=False)
    nombre_real = Column(String, nullable=False)
    rol = Column(String, default="aprendiz", nullable=False)
    grado = Column(String, default="Aprendiz", nullable=False)
    respuesta_secreta = Column(String, nullable=True)
    fecha_registro = Column(DateTime, default=obtener_fecha_actual)


class TarjetaPasosPerdidos(Base):
    __tablename__ = "pasos_perdidos_tarjetas"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    contenido = Column(Text, nullable=False)
    categoria = Column(String, default="principios", nullable=False)  # principios, docencia, accion, biblioteca
    url_pdf = Column(String, nullable=True)
    autor = Column(String, nullable=False)
    fecha = Column(DateTime, default=obtener_fecha_actual)


class SolicitudContacto(Base):
    __tablename__ = "solicitudes_contacto"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String, nullable=False)
    email = Column(String, nullable=False)
    telefono = Column(String, nullable=False)
    redes = Column(String, nullable=True)
    mensaje = Column(Text, nullable=False)
    codigo_generado = Column(String, nullable=True)
    fecha_creacion = Column(DateTime, default=obtener_fecha_actual)


class Balotaje(Base):
    __tablename__ = "balotajes"

    id = Column(Integer, primary_key=True, index=True)
    candidato = Column(String, nullable=False)
    motivo = Column(String, nullable=False)
    descripcion = Column(Text, nullable=False)
    fecha_inicio = Column(String, nullable=True)
    fecha_fin = Column(String, nullable=True)
    activo = Column(Boolean, default=True, nullable=False)
    blancas = Column(Integer, default=0, nullable=False)
    negras = Column(Integer, default=0, nullable=False)


class VotoRegistro(Base):
    """Garantiza que cada usuario vote solo una vez en un balotaje determinado."""
    __tablename__ = "votos_registro"

    id = Column(Integer, primary_key=True, index=True)
    balotaje_id = Column(Integer, nullable=False)
    usuario_id = Column(Integer, nullable=False)


class CodigoPase(Base):
    __tablename__ = "codigos_pase"

    id = Column(Integer, primary_key=True, index=True)
    codigo = Column(String, unique=True, index=True, nullable=False)
    creado_por = Column(String, nullable=False)
    usado = Column(Boolean, default=False, nullable=False)
    fecha_creacion = Column(DateTime, default=obtener_fecha_actual)


class Trazado(Base):
    __tablename__ = "trazados"

    id = Column(Integer, primary_key=True, index=True)
    titulo = Column(String, nullable=False)
    contenido = Column(Text, nullable=False)
    autor = Column(String, nullable=False)
    rol_autor = Column(String, nullable=False)
    camara_destino = Column(String, default="aprendiz", nullable=False)
    fecha_publicacion = Column(DateTime, default=obtener_fecha_actual)
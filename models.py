
from sqlalchemy import Column, Integer, String, Text, ForeignKey, TIMESTAMP, DateTime
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()


class Producto(Base):
    __tablename__ = "producto"
    idproducto = Column(Integer, primary_key=True, autoincrement=True)
    SKU = Column(String(100), nullable=False)
    nombre_producto = Column(String(200), nullable=False)
    unidades = Column(Integer, nullable=False)
    stock_minimo = Column(Integer)

class Usuario(Base):
    __tablename__ = "usuario"
    idusuario = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(100), nullable=False)
    password = Column(String(100), nullable=False)
    rol = Column(String(45))

class Movimiento(Base):
    __tablename__ = "movimiento"
    idmovimiento = Column(Integer, primary_key=True, autoincrement=True)
    tipo_movimiento = Column(String(45), nullable=False)
    id_producto = Column(Integer, ForeignKey("producto.idproducto"), nullable=False)
    cantidad = Column(Integer, nullable=False)
    fecha = Column(DateTime)
    id_usuario = Column(Integer, ForeignKey("usuario.idusuario"), nullable=False)
    nota = Column(Text)



class Proveedor(Base):
    __tablename__ = "proveedor"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String(100), nullable=False)
    contacto = Column(String(100))


class Auditoria(Base):
    __tablename__ = "auditoria"
    id = Column(Integer, primary_key=True, index=True)
    accion = Column(String(100), nullable=False)
    fecha = Column(DateTime)

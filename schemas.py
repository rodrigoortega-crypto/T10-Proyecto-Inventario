
from pydantic import BaseModel
from datetime import datetime
from typing import Optional

# -------------------
# MOVIMIENTO
# -------------------
class MovimientoBase(BaseModel):
    tipo: str
    fecha: datetime

class MovimientoCreate(MovimientoBase):
    pass

class Movimiento(MovimientoBase):
    id: int
    class Config:
        from_attributes = True

# -------------------
# PRODUCTO
# -------------------
class ProductoBase(BaseModel):
    nombre: str
    precio: float

class ProductoCreate(ProductoBase):
    pass

class Producto(ProductoBase):
    id: int
    class Config:
        from_attributes = True

# -------------------
# PROVEEDOR
# -------------------
class ProveedorBase(BaseModel):
    nombre: str
    contacto: str

class ProveedorCreate(ProveedorBase):
    pass

class Proveedor(ProveedorBase):
    id: int
    class Config:
        from_attributes = True

# -------------------
# AUDITORÍA
# -------------------
class AuditoriaBase(BaseModel):
    accion: str
    fecha: datetime

class AuditoriaCreate(AuditoriaBase):
    pass

class Auditoria(AuditoriaBase):
    id: int
    class Config:
        from_attributes = True

# -------------------
# USUARIO
# -------------------
class UsuarioBase(BaseModel):
    nombre: str
    email: str

class UsuarioCreate(UsuarioBase):
    pass

class Usuario(UsuarioBase):
    id: int
    class Config:
        from_attributes = True
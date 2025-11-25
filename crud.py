
from sqlalchemy.orm import Session
import models, schemas

# -------------------
# MOVIMIENTO
# -------------------
def get_movimientos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Movimiento).offset(skip).limit(limit).all()

def create_movimiento(db: Session, movimiento: schemas.MovimientoCreate):
    db_movimiento = models.Movimiento(**movimiento.dict())
    db.add(db_movimiento)
    db.commit()
    db.refresh(db_movimiento)
    return db_movimiento

def update_movimiento(db: Session, movimiento_id: int, movimiento: schemas.MovimientoCreate):
    db_movimiento = db.query(models.Movimiento).filter(models.Movimiento.id == movimiento_id).first()
    if db_movimiento:
        for key, value in movimiento.dict().items():
            setattr(db_movimiento, key, value)
        db.commit()
        db.refresh(db_movimiento)
    return db_movimiento

def delete_movimiento(db: Session, movimiento_id: int):
    db_movimiento = db.query(models.Movimiento).filter(models.Movimiento.id == movimiento_id).first()
    if db_movimiento:
        db.delete(db_movimiento)
        db.commit()
    return db_movimiento

# -------------------
# PRODUCTO
# -------------------
def get_productos(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Producto).offset(skip).limit(limit).all()

def create_producto(db: Session, producto: schemas.ProductoCreate):
    db_producto = models.Producto(**producto.dict())
    db.add(db_producto)
    db.commit()
    db.refresh(db_producto)
    return db_producto

def update_producto(db: Session, producto_id: int, producto: schemas.ProductoCreate):
    db_producto = db.query(models.Producto).filter(models.Producto.id == producto_id).first()
    if db_producto:
        for key, value in producto.dict().items():
            setattr(db_producto, key, value)
        db.commit()
        db.refresh(db_producto)
    return db_producto

def delete_producto(db: Session, producto_id: int):
    db_producto = db.query(models.Producto).filter(models.Producto.id == producto_id).first()
    if db_producto:
        db.delete(db_producto)
        db.commit()
    return db_producto

# -------------------
# PROVEEDOR
# -------------------
def get_proveedores(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Proveedor).offset(skip).limit(limit).all()

def create_proveedor(db: Session, proveedor: schemas.ProveedorCreate):
    db_proveedor = models.Proveedor(**proveedor.dict())
    db.add(db_proveedor)
    db.commit()
    db.refresh(db_proveedor)
    return db_proveedor

def update_proveedor(db: Session, proveedor_id: int, proveedor: schemas.ProveedorCreate):
    db_proveedor = db.query(models.Proveedor).filter(models.Proveedor.id == proveedor_id).first()
    if db_proveedor:
        for key, value in proveedor.dict().items():
            setattr(db_proveedor, key, value)
        db.commit()
        db.refresh(db_proveedor)
    return db_proveedor

def delete_proveedor(db: Session, proveedor_id: int):
    db_proveedor = db.query(models.Proveedor).filter(models.Proveedor.id == proveedor_id).first()
    if db_proveedor:
        db.delete(db_proveedor)
        db.commit()
    return db_proveedor

# -------------------
# AUDITORÍA
# -------------------
def get_auditorias(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Auditoria).offset(skip).limit(limit).all()

def create_auditoria(db: Session, auditoria: schemas.AuditoriaCreate):
    db_auditoria = models.Auditoria(**auditoria.dict())
    db.add(db_auditoria)
    db.commit()
    db.refresh(db_auditoria)
    return db_auditoria

def update_auditoria(db: Session, auditoria_id: int, auditoria: schemas.AuditoriaCreate):
    db_auditoria = db.query(models.Auditoria).filter(models.Auditoria.id == auditoria_id).first()
    if db_auditoria:
        for key, value in auditoria.dict().items():
            setattr(db_auditoria, key, value)
        db.commit()
        db.refresh(db_auditoria)
    return db_auditoria

def delete_auditoria(db: Session, auditoria_id: int):
    db_auditoria = db.query(models.Auditoria).filter(models.Auditoria.id == auditoria_id).first()
    if db_auditoria:
        db.delete(db_auditoria)
        db.commit()
    return db_auditoria

# -------------------
# USUARIO
# -------------------
def get_usuarios(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Usuario).offset(skip).limit(limit).all()

def create_usuario(db: Session, usuario: schemas.UsuarioCreate):
    db_usuario = models.Usuario(**usuario.dict())
    db.add(db_usuario)
    db.commit()
    db.refresh(db_usuario)
    return db_usuario

def update_usuario(db: Session, usuario_id: int, usuario: schemas.UsuarioCreate):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if db_usuario:
        for key, value in usuario.dict().items():
            setattr(db_usuario, key, value)
        db.commit()
        db.refresh(db_usuario)
    return db_usuario

def delete_usuario(db: Session, usuario_id: int):
    db_usuario = db.query(models.Usuario).filter(models.Usuario.id == usuario_id).first()
    if db_usuario:
        db.delete(db_usuario)
        db.commit()
    return db_usuario

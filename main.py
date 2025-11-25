
from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import models, schemas, crud
from db import get_db, engine
from models import Producto, Usuario, Movimiento, Proveedor, Auditoria
from sqlalchemy.orm import Session

app = FastAPI()

# Configuración CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#crear tablas si no existen
models.Base.metadata.create_all(bind=engine)


# --- MOVIMIENTOS ---

@app.get("/movimientos/", response_model=list[schemas.Movimiento])
def obtener_movimientos(db: Session = Depends(get_db)):
    return crud.get_movimientos(db)


@app.post("/movimientos/", response_model=schemas.Movimiento)
def agregar_movimiento(movimiento: schemas.MovimientoCreate, db: Session = Depends(get_db)):
    return crud.create_movimiento(db, movimiento)


@app.put("/movimientos/{movimiento_id}", response_model=schemas.Movimiento)
def actualizar_movimiento(movimiento_id: int, movimiento: schemas.MovimientoCreate, db: Session = Depends(get_db)):
    db_mov = crud.update_movimiento(db, movimiento_id, movimiento)
    if not db_mov:
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    return db_mov


@app.delete("/movimientos/{movimiento_id}")
def eliminar_movimiento(movimiento_id: int, db: Session = Depends(get_db)):
    db_mov = crud.delete_movimiento(db, movimiento_id)
    if not db_mov:
        raise HTTPException(status_code=404, detail="Movimiento no encontrado")
    return {"mensaje": "Movimiento eliminado"}

# -------------------
# PRODUCTOS
# -------------------
@app.get("/productos/", response_model=list[schemas.Producto])
def obtener_productos(db: Session = Depends(get_db)):
    return crud.get_productos(db)

@app.post("/productos/", response_model=schemas.Producto)
def agregar_producto(producto: schemas.ProductoCreate, db: Session = Depends(get_db)):
    return crud.create_producto(db, producto)


# -------------------
# PROVEEDORES
# -------------------
@app.get("/proveedores/", response_model=list[schemas.Proveedor])
def obtener_proveedores(db: Session = Depends(get_db)):
    return crud.get_proveedores(db)

@app.post("/proveedores/", response_model=schemas.Proveedor)
def agregar_proveedor(proveedor: schemas.ProveedorCreate, db: Session = Depends(get_db)):
    return crud.create_proveedor(db, proveedor)

@app.put("/proveedores/{proveedor_id}", response_model=schemas.Proveedor)
def actualizar_proveedor(proveedor_id: int, proveedor: schemas.ProveedorCreate, db: Session = Depends(get_db)):
    db_prov = crud.update_proveedor(db, proveedor_id, proveedor)
    if not db_prov:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return db_prov

@app.delete("/proveedores/{proveedor_id}")
def eliminar_proveedor(proveedor_id: int, db: Session = Depends(get_db)):
    db_prov = crud.delete_proveedor(db, proveedor_id)
    if not db_prov:
        raise HTTPException(status_code=404, detail="Proveedor no encontrado")
    return {"mensaje": "Proveedor eliminado"}

# -------------------
# AUDITORÍAS
# -------------------
@app.get("/auditorias/", response_model=list[schemas.Auditoria])
def obtener_auditorias(db: Session = Depends(get_db)):
    return crud.get_auditorias(db)

@app.post("/auditorias/", response_model=schemas.Auditoria)
def agregar_auditoria(auditoria: schemas.AuditoriaCreate, db: Session = Depends(get_db)):
    return crud.create_auditoria(db, auditoria)

@app.put("/auditorias/{auditoria_id}", response_model=schemas.Auditoria)
def actualizar_auditoria(auditoria_id: int, auditoria: schemas.AuditoriaCreate, db: Session = Depends(get_db)):
    db_aud = crud.update_auditoria(db, auditoria_id, auditoria)
    if not db_aud:
        raise HTTPException(status_code=404, detail="Auditoría no encontrada")
    return db_aud

@app.delete("/auditorias/{auditoria_id}")
def eliminar_auditoria(auditoria_id: int, db: Session = Depends(get_db)):
    db_aud = crud.delete_auditoria(db, auditoria_id)
    if not db_aud:
        raise HTTPException(status_code=404, detail="Auditoría no encontrada")
    return {"mensaje": "Auditoría eliminada"}

# -------------------
# USUARIOS
# -------------------
@app.get("/usuarios/", response_model=list[schemas.Usuario])
def obtener_usuarios(db: Session = Depends(get_db)):
    return crud.get_usuarios(db)

@app.post("/usuarios/", response_model=schemas.Usuario)
def agregar_usuario(usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    return crud.create_usuario(db, usuario)

@app.put("/usuarios/{usuario_id}", response_model=schemas.Usuario)
def actualizar_usuario(usuario_id: int, usuario: schemas.UsuarioCreate, db: Session = Depends(get_db)):
    db_user = crud.update_usuario(db, usuario_id, usuario)
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return db_user

@app.delete("/usuarios/{usuario_id}")
def eliminar_usuario(usuario_id: int, db: Session = Depends(get_db)):
    db_user = crud.delete_usuario(db, usuario_id)
    if not db_user:
        raise HTTPException(status_code=404, detail="Usuario no encontrado")
    return {"mensaje": "Usuario eliminado"}


from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # O especifica tu dominio
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

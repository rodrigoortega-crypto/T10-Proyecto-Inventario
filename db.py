
import mysql.connector
import sqlalchemy

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker


# ✅ Configura tu conexión a MySQL
DATABASE_URL = "mysql+pymysql://root:1234BBDDs@localhost/sigita"  # Cambia si tienes usuario/contraseña diferente

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# ✅ Función para inyectar la sesión en FastAPI
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

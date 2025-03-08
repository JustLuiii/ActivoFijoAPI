CREATE DATABASE bd_activo_fijo
GO
USE bd_activo_fijo
GO
CREATE TABLE departamentos (
    id INT identity PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    activo bit NOT NULL DEFAULT 1
)
GO
CREATE TABLE empleados (
    id INT identity PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    cedula VARCHAR(20) UNIQUE NOT NULL,
    departamento_id INT NOT NULL,
    tipo_persona tinyint NOT NULL, --1: Fisica, 2: Juridica (Enum En Servicio)
    fecha_ingreso DATE NOT NULL,
    activo bit NOT NULL DEFAULT 1,
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
)
GO
CREATE TABLE tipos_activos (
    id INT identity PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    cuenta_contable_compra VARCHAR(50) NOT NULL,
    cuenta_contable_depreciacion VARCHAR(50) NOT NULL,
    activo bit NOT NULL DEFAULT 1
);
GO
CREATE TABLE activos_fijos (
    id INT IDENTITY PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    departamento_id INT NULL,
    tipo_activo_id INT NOT NULL,
    fecha_adquisicion DATE NOT NULL,
    valor DECIMAL(15,2) NOT NULL,
    depreciacion_acumulada DECIMAL(15,2) NOT NULL,
    estado tinyint NOT NULL DEFAULT 1, --1: Operativo, 2: En Mantenimiento, 3: Baja
    FOREIGN KEY (tipo_activo_id) REFERENCES tipos_activos(id),
    FOREIGN KEY (departamento_id) REFERENCES departamentos(id)
);
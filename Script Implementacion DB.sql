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

-- Datos de pruebas

INSERT INTO departamentos (descripcion, activo) VALUES 
('Recursos Humanos', 1),
('Tecnología', 1),
('Finanzas', 1),
('Ventas', 1),
('Marketing', 1),
('Logística', 1),
('Atención al Cliente', 1);

INSERT INTO empleados (nombre, cedula, departamento_id, tipo_persona, fecha_ingreso, activo) VALUES 
('Juan Pérez', '001-1234567-8', 1, 1, '2020-05-15', 1),
('María Gómez', '002-2345678-9', 2, 1, '2018-03-10', 1),
('Carlos Rodríguez', '003-3456789-0', 3, 2, '2019-07-20', 1),
('Ana Martínez', '004-4567890-1', 4, 1, '2021-01-25', 1),
('Luis Fernández', '005-5678901-2', 5, 2, '2017-09-30', 1),
('Sofía López', '006-6789012-3', 6, 1, '2022-06-12', 1),
('Pedro Ramírez', '007-7890123-4', 7, 1, '2023-02-18', 1);


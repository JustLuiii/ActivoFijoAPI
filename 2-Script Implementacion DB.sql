CREATE TABLE depreciaciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AnioProceso INT NOT NULL,                     -- Año del proceso de depreciación
    MesProceso INT NOT NULL,                      -- Mes del proceso de depreciación (1-12)
    ActivoFijoId INT NOT NULL,                    -- ID del activo fijo relacionado
    FechaProceso DATE NOT NULL,                   -- Fecha cuando se realizó el cálculo
    MontoDepreciado DECIMAL(18,2) NOT NULL,       -- Monto depreciado en el período
    DepreciacionAcumulada DECIMAL(18,2) NOT NULL, -- Depreciación acumulada hasta la fecha
    CuentaCompra VARCHAR(50) NULL,                -- Cuenta contable de compra
    CuentaDepreciacion VARCHAR(50) NULL,          -- Cuenta contable de depreciación
    FechaCreacion DATETIME DEFAULT GETDATE(),     -- Fecha de creación del registro
    UsuarioCreacion VARCHAR(50) NULL,             -- Usuario que realizó el cálculo
    Eliminado bit NULL,

    -- Clave foránea a la tabla de activos fijos
    CONSTRAINT FK_Depreciaciones_ActivosFijos FOREIGN KEY (ActivoFijoId) 
    REFERENCES activos_fijos(Id),
    
    -- Validación de mes correcto
    CONSTRAINT CK_MesProceso CHECK (MesProceso BETWEEN 1 AND 12),
    
    -- Validación para evitar montos negativos
    CONSTRAINT CK_MontoDepreciado CHECK (MontoDepreciado >= 0),
    CONSTRAINT CK_DepreciacionAcumulada CHECK (DepreciacionAcumulada >= 0)
);

-- Índice para mejorar búsquedas por activo y período
CREATE INDEX IX_Depreciaciones_ActivoPeriodo ON Depreciaciones(ActivoFijoId, AnioProceso, MesProceso);

GO

CREATE TABLE usuario (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Nombre NVARCHAR(100) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    IdSistemaAuxiliar INT NOT NULL,
    PasswordHash VARBINARY(MAX) NOT NULL,
    PasswordSalt VARBINARY(MAX) NOT NULL,
    FechaCreacion DATETIME2 NOT NULL DEFAULT GETUTCDATE()
);

-- Optional: Create an index for better performance on email lookups
CREATE INDEX IX_Usuarios_Email ON usuario(Email);

GO
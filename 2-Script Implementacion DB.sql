CREATE TABLE depreciaciones (
    Id INT IDENTITY(1,1) PRIMARY KEY,
    AnioProceso INT NOT NULL,                     -- A�o del proceso de depreciaci�n
    MesProceso INT NOT NULL,                      -- Mes del proceso de depreciaci�n (1-12)
    ActivoFijoId INT NOT NULL,                    -- ID del activo fijo relacionado
    FechaProceso DATE NOT NULL,                   -- Fecha cuando se realiz� el c�lculo
    MontoDepreciado DECIMAL(18,2) NOT NULL,       -- Monto depreciado en el per�odo
    DepreciacionAcumulada DECIMAL(18,2) NOT NULL, -- Depreciaci�n acumulada hasta la fecha
    CuentaCompra VARCHAR(50) NULL,                -- Cuenta contable de compra
    CuentaDepreciacion VARCHAR(50) NULL,          -- Cuenta contable de depreciaci�n
    FechaCreacion DATETIME DEFAULT GETDATE(),     -- Fecha de creaci�n del registro
    UsuarioCreacion VARCHAR(50) NULL,             -- Usuario que realiz� el c�lculo
    Eliminado bit NULL,

    -- Clave for�nea a la tabla de activos fijos
    CONSTRAINT FK_Depreciaciones_ActivosFijos FOREIGN KEY (ActivoFijoId) 
    REFERENCES activos_fijos(Id),
    
    -- Validaci�n de mes correcto
    CONSTRAINT CK_MesProceso CHECK (MesProceso BETWEEN 1 AND 12),
    
    -- Validaci�n para evitar montos negativos
    CONSTRAINT CK_MontoDepreciado CHECK (MontoDepreciado >= 0),
    CONSTRAINT CK_DepreciacionAcumulada CHECK (DepreciacionAcumulada >= 0)
);

-- �ndice para mejorar b�squedas por activo y per�odo
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
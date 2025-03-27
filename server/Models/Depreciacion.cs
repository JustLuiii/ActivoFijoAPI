using System.ComponentModel.DataAnnotations.Schema;

namespace ActivoFijoAPI.Models
{
    [Table("depreciaciones")]
    public class Depreciacion
    {
        public int Id { get; set; } // Identificador del Registro
        public int AnioProceso { get; set; } // Año Proceso
        public int MesProceso { get; set; } // Mes Proceso
        public int ActivoFijoId { get; set; } // Relación con la tabla de activos fijos
        public DateTime FechaProceso { get; set; } // Fecha de Proceso
        public decimal MontoDepreciado { get; set; } // Monto depreciado
        public decimal DepreciacionAcumulada { get; set; } // Depreciación acumulada
        public string CuentaCompra { get; set; } // Cuenta Compra
        public string CuentaDepreciacion { get; set; } // Cuenta Depreciación
        public bool Eliminado { get; set; } // Cuenta Depreciación

        // Propiedad de navegación (asumiendo que ya tienes un modelo ActivoFijo)
        public ActivoFijo ActivoFijo { get; set; }
    }
}

using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ActivoFijoAPI.Models
{
    [Table("activos_fijos")]
    public class ActivoFijo
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Key]
        public int Id { get; set; }
        public string Descripcion { get; set; }

        [Column("departamento_id")]
        public int? DepartamentoId { get; set; }
        public virtual Departamento? Departamento { get; set; }

        [Column("tipo_activo_id")]
        public int TipoActivoId { get; set; }
        public virtual TipoActivo? TipoActivo { get; set; }

        [Column("fecha_adquisicion")]
        public DateTime FechaAdquisicion { get; set; }
        public decimal Valor { get; set; }

        [Column("depreciacion_acumulada")]
        public decimal DepreciacionAcumulada { get; set; }
        public int Estado { get; set; } // 1: Operativo, 2: Mantenimiento, 3: Baja
    }
}

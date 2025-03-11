using System.ComponentModel.DataAnnotations.Schema;

namespace ActivoFijoAPI.Models
{
    public class Empleado
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Cedula { get; set; }
        [Column("departamento_id")]
        public int DepartamentoId { get; set; }
        [Column("tipo_persona")]
        public byte TipoPersona { get; set; } // 1: Física, 2: Jurídica
        [Column("fecha_ingreso")]
        public DateTime FechaIngreso { get; set; }
        public bool Activo { get; set; }

        public virtual Departamento? Departamento { get; set; }
    }
}

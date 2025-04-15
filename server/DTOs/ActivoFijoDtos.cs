

namespace ActivoFijoAPI.DTOs
{

    public class ActivoFijoDtos
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public int? DepartamentoId { get; set; }
        public string  departamento { get; set; }
        public int TipoActivoId { get; set; }
        public string tipoActivo { get; set; }
        public DateTime FechaAdquisicion { get; set; }
        public decimal Valor { get; set; }
        public decimal DepreciacionAcumulada { get; set; }
        public int Estado { get; set; }
        public string EstadoNombre { get; set; } // 1: Operativo, 2: Mantenimiento, 3: Baja
    }
}

namespace ActivoFijoAPI.Models
{
    public class ActivoFijo
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public int? DepartamentoId { get; set; }
        public int TipoActivoId { get; set; }
        public DateTime FechaAdquisicion { get; set; }
        public decimal Valor { get; set; }
        public decimal DepreciacionAcumulada { get; set; }
        public byte Estado { get; set; } // 1: Operativo, 2: Mantenimiento, 3: Baja
    }
}

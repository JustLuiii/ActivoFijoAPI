namespace ActivoFijoAPI.Models
{
    public class Empleado
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Cedula { get; set; }
        public int DepartamentoId { get; set; }
        public byte TipoPersona { get; set; } // 1: Física, 2: Jurídica
        public DateTime FechaIngreso { get; set; }
        public bool Activo { get; set; }
    }
}

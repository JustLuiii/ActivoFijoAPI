namespace ActivoFijoAPI.Models
{
    public class TipoActivo
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public string CuentaContableCompra { get; set; }
        public string CuentaContableDepreciacion { get; set; }
        public bool Activo { get; set; }
    }
}

namespace ActivoFijoAPI.Models
{
    public class Departamento
    {
        public int Id { get; set; }
        public string Descripcion { get; set; }
        public bool Activo { get; set; }

        public virtual ICollection<ActivoFijo>? activosFijos { get; set; }
    }
}

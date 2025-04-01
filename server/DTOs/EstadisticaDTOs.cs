using System.ComponentModel.DataAnnotations;

namespace ActivoFijoAPI.DTOs
{
    public class EstadisticaDto
    {

        public int departamentos { get; set; }
        public int empleados { get; set; }
        public int tipoActivos { get; set; }
        public int activosFijos { get; set; }
    }

}

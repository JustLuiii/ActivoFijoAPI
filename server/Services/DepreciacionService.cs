using ActivoFijoAPI.Models;

namespace ActivoFijoAPI.Services
{
    public interface IDepreciacionService
    {
        ResultadoDepreciacion CalcularDepreciacion(ActivoFijo activo, int anio, int mes, DateTime fechaProceso);
    }

    public class DepreciacionService : IDepreciacionService
    {
        public ResultadoDepreciacion CalcularDepreciacion(ActivoFijo activo, int anio, int mes, DateTime fechaProceso)
        {

            return new ResultadoDepreciacion
            {
                MontoDepreciado = 0,
                DepreciacionAcumulada = 0
            };
        }
    }

    public class ResultadoDepreciacion
    {
        public decimal MontoDepreciado { get; set; }
        public decimal DepreciacionAcumulada { get; set; }
    }
}

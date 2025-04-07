using ActivoFijoAPI.Models;

namespace ActivoFijoAPI.Services
{
    public interface IDepreciacionService
    {
        List<Depreciacion> CalcularDepreciacion(ActivoFijo activo, int vidaUtilAnios, decimal valorResidual, DateTime fechaCorte);
    }

    public class DepreciacionService : IDepreciacionService
    {
        public List<Depreciacion> CalcularDepreciacion(ActivoFijo activo, int vidaUtilAnios, decimal valorResidual, DateTime fechaCorte)
        { 
            var depreciaciones = new List<Depreciacion>();

            decimal valorDepreciable = activo.Valor - valorResidual;
            decimal depreciacionMensual = valorDepreciable / (vidaUtilAnios * 12);
            decimal acumulado = activo.DepreciacionAcumulada;

            DateTime fechaInicio = activo.FechaAdquisicion;
            DateTime fechaProceso = new DateTime(fechaInicio.Year, fechaInicio.Month, 1);

            while (fechaProceso <= fechaCorte)
            {
                // Si ya se depreció todo, se detiene
                if (acumulado >= valorDepreciable)
                    break;

                // Evitar pasar el valor depreciable
                decimal monto = Math.Min(depreciacionMensual, valorDepreciable - acumulado);
                acumulado += monto;

                depreciaciones.Add(new Depreciacion
                {
                    AnioProceso = fechaProceso.Year,
                    MesProceso = fechaProceso.Month,
                    MontoDepreciado = monto,
                    DepreciacionAcumulada = acumulado,
                    ActivoFijo = activo
                });

                fechaProceso = fechaProceso.AddMonths(1);
            }

            return depreciaciones;
        }
    }

    public class ResultadoDepreciacion
    {
        public decimal MontoDepreciado { get; set; }
        public decimal DepreciacionAcumulada { get; set; }
    }
}

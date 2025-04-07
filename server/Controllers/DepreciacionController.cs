using ActivoFijoAPI.Data;
using ActivoFijoAPI.Models;
using ActivoFijoAPI.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ActivoFijoAPI.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class DepreciacionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IDepreciacionService _depreciacionService;

        public DepreciacionController(ApplicationDbContext context, IDepreciacionService depreciacionService)
        {
            _context = context;
            _depreciacionService = depreciacionService;
        }

        // GET: api/depreciacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Depreciacion>>> Get()
        {
            return await _context.Depreciaciones.ToListAsync();
        }

        // GET: api/depreciacion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Depreciacion>> Get(int id)
        {
            var result = await _context.Depreciaciones
                                           .FirstOrDefaultAsync(a => a.Id == id);
            if (result == null)
                return NotFound();

            return result;
        }

        // GET: api/calcular/idActivoFijo/vidaUtilAnios/valorResidual/fechaCorte
        /*
            Vida Util Años - años
            -------------------------------------
            Políticas contables de la empresa

            Equipos de cómputo → 3 a 5 años

            Vehículos → 5 años

            Mobiliario → 10 años

            Maquinaria pesada → 10-15 años
            -------------------------------------

            Valor Residual - monto
            -------------------------------------
            1. Una estimación interna
                Basada en la experiencia del área contable o técnica.
                Por ejemplo: Se espera vender una camioneta vieja por $1,000 cuando ya no sirva para la empresa.
            
            2. Tasas predefinidas
                Algunas empresas usan un porcentaje fijo del valor original, como 5% o 10%.

            3.Valor cero
                Si no se espera recuperar nada, simplemente se usa 0 como valor residual.
         */
        [HttpGet("calcular/{idActivoFijo}/{vidaUtilAnios}/{valorResidual}/{fechaCorte}")]
        public async Task<ActionResult<List<Depreciacion>>> GetDepreciacion(int idActivoFijo, int vidaUtilAnios, decimal valorResidual, DateTime fechaCorte)
        {
            var activoFijo = _context.ActivosFijos.Where(x => x.Id == idActivoFijo).FirstOrDefault();
            if (activoFijo == null) return NotFound();
            var depreciaciones = _depreciacionService.CalcularDepreciacion(activoFijo, vidaUtilAnios, valorResidual, fechaCorte);
            return depreciaciones;
        }

        // POST: api/depreciacion
        [HttpPost]
        public async Task<ActionResult<Depreciacion>> Post(Depreciacion depreciacion)
        {
            _context.Depreciaciones.Add(depreciacion);
            await _context.SaveChangesAsync();
            return CreatedAtAction("Get", new { id = depreciacion.Id }, depreciacion);
        }

        // PUT: api/depreciacion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, Depreciacion depreciacion)
        {
            if (id != depreciacion.Id)
            {
                return BadRequest();
            }

            _context.Entry(depreciacion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DepreciacionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var depreciacion = await _context.Depreciaciones.FindAsync(id);
            if (depreciacion == null)
            {
                return NotFound();
            }
            depreciacion.Eliminado = true;
            _context.Entry(depreciacion).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DepreciacionExists(int id)
        {
            return _context.Depreciaciones.Any(e => e.Id == id);
        }
    }
}

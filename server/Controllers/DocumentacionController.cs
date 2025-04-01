using Microsoft.AspNetCore.Mvc;
using ActivoFijoAPI.Models;
using ActivoFijoAPI.Data;

namespace ActivoFijoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EstadisticaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EstadisticaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Estadistica
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivoFijo>>> GetDocumentacion()
        {
            return Ok("Bienvenido a la documentacion del sistema de caso");
        }

    }

}
using Microsoft.AspNetCore.Mvc;
using ActivoFijoAPI.Models;
using ActivoFijoAPI.Data;
using ActivoFijoAPI.DTOs;
using Microsoft.EntityFrameworkCore;

namespace ActivoFijoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentacionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DocumentacionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Documentacion
        [HttpGet]
        public async Task<ActionResult<EstadisticaDto>> GetEstadistica()
        {

            var estadistica = new EstadisticaDto()
            {
                empleados = await _context.Empleados.CountAsync(x => x.Activo == true),
                activosFijos = await _context.ActivosFijos.CountAsync(),
                departamentos = await _context.Departamentos.CountAsync(x => x.Activo == true),
                tipoActivos = await _context.TiposActivos.CountAsync(x => x.Activo == true),
            };

            return Ok(estadistica);
        }

    }

}
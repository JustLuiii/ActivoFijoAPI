using Microsoft.AspNetCore.Mvc;
using ActivoFijoAPI.Models;
using ActivoFijoAPI.Data;
using ActivoFijoAPI.DTOs;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authorization;

namespace ActivoFijoAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class EstadisticaController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public EstadisticaController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Estadistica
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
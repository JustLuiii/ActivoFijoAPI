using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ActivoFijoAPI.Models;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ActivoFijoAPI.Data;

namespace ActivoFijoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ActivosFijosController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public ActivosFijosController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/ActivosFijos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivoFijo>>> GetActivosFijos()
        {
            return await _context.ActivosFijos
                                 //.Include(a => a.TipoActivo)
                                 //.Include(a => a.Departamento)
                                 .ToListAsync();
        }

        // GET: api/ActivosFijos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ActivoFijo>> GetActivoFijo(int id)
        {
            var activoFijo = await _context.ActivosFijos
                                           //.Include(a => a.TipoActivo)
                                           //.Include(a => a.Departamento)
                                           .FirstOrDefaultAsync(a => a.Id == id);
            if (activoFijo == null)
            {
                return NotFound();
            }
            return activoFijo;
        }

        // POST: api/ActivosFijos
        [HttpPost]
        public async Task<ActionResult<ActivoFijo>> PostActivoFijo(ActivoFijo activoFijo)
        {
            _context.ActivosFijos.Add(activoFijo);
            await _context.SaveChangesAsync();
            return CreatedAtAction("GetActivoFijo", new { id = activoFijo.Id }, activoFijo);
        }

        // PUT: api/ActivosFijos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutActivoFijo(int id, ActivoFijo activoFijo)
        {
            if (id != activoFijo.Id)
            {
                return BadRequest();
            }

            _context.Entry(activoFijo).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ActivoFijoExists(id))
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

        // DELETE: api/ActivosFijos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteActivoFijo(int id)
        {
            var activoFijo = await _context.ActivosFijos.FindAsync(id);
            if (activoFijo == null)
            {
                return NotFound();
            }
            byte inactivo = 0;
            byte operativo = 1;
            //_context.ActivosFijos.Remove(activoFijo);
            activoFijo.Estado = activoFijo.Estado == inactivo ? operativo : inactivo;
            _context.Entry(activoFijo).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool ActivoFijoExists(int id)
        {
            return _context.ActivosFijos.Any(e => e.Id == id);
        }
    }
}
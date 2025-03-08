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
    public class DocumentacionController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DocumentacionController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/Documentacion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ActivoFijo>>> GetDocumentacion()
        {
            return Ok("Bienvenido a la documentacion del sistema de caso");
        }

    }

}
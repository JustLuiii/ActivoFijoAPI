using ActivoFijoAPI.Models;
using ActivoFijoAPI.Services;
using Microsoft.AspNetCore.Mvc;

namespace ActivoFijoAPI.Controllers
{
    public class EntradaContableController : ControllerBase
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public EntradaContableController(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        // 🔐 Extraer token del contexto HTTP
        private string GetBearerToken()
        {
            //Necesitamos capturar el token aca como parte del header, validar
            var authHeader = _httpContextAccessor.HttpContext?.Request.Headers["AuthorizationExterno"].ToString();
            if (!string.IsNullOrEmpty(authHeader) && authHeader.StartsWith("Bearer "))
            {
                return authHeader.Substring("Bearer ".Length).Trim();
            }
            throw new UnauthorizedAccessException("Token no proporcionado");
        }

        // GET: api/EntradaContable
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var service = new EntradaContableService(GetBearerToken());
            var result = await service.GetAllAsync();
            return Ok(result);
        }

        // GET: api/EntradaContable/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var service = new EntradaContableService(GetBearerToken());
            var result = await service.GetByIdAsync(id);
            if (result == null)
                return NotFound();

            return Ok(result);
        }

        // POST: api/EntradaContable
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] EntradaContable entrada)
        {
            var service = new EntradaContableService(GetBearerToken());
            var success = await service.CreateAsync(entrada);
            if (success)
                return Ok(new { message = "Entrada contable creada correctamente" });

            return BadRequest(new { message = "Error al crear la entrada contable" });
        }

        // PUT: api/EntradaContable/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] EntradaContable entrada)
        {
            var service = new EntradaContableService(GetBearerToken());
            var success = await service.UpdateAsync(id, entrada);
            if (success)
                return Ok(new { message = "Entrada contable actualizada correctamente" });

            return BadRequest(new { message = "Error al actualizar la entrada contable" });
        }
    }
}

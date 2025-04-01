using ActivoFijoAPI.Helper;
using ActivoFijoAPI.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using ActivoFijoAPI.Data;
using ActivoFijoAPI.DTOs;
using System.Text.Json;
using System.Net.Http;

namespace ActivoFijoAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public AuthenticationController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioRespuestaDto>> Registrar(UsuarioRegistroDto registroDto)
        {
            if (await _context.Usuarios.AnyAsync(u => u.Email == registroDto.Email))
                return BadRequest("El email ya está registrado");

            PasswordHelper.CreatePasswordHash(registroDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var usuario = new Usuario
            {
                Nombre = registroDto.Nombre,
                Email = registroDto.Email,
                IdSistemaAuxiliar = registroDto.IdSistemaAuxiliar,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.Usuarios.Add(usuario);
            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(usuario);

            //Registrar en el sistema de contabilidad
            await RegistrarContabilidadExterno(usuario, registroDto.Password);

            return new UsuarioRespuestaDto
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Email = usuario.Email,
                Token = token
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UsuarioRespuestaDto>> Login(UsuarioLoginDto loginDto)
        {
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (usuario == null)
                return Unauthorized("Credenciales inválidas");

            if (!PasswordHelper.VerifyPasswordHash(loginDto.Password, usuario.PasswordHash, usuario.PasswordSalt))
                return Unauthorized("Credenciales inválidas");

            var token = GenerateJwtToken(usuario);

            var authContabilidad = await AutenticarContabilidadExterno(loginDto);

            return new UsuarioRespuestaDto { Id = usuario.Id, Nombre = usuario.Nombre, Email = usuario.Email, Token = token, DatosExternos = authContabilidad.Value };
        }

        private string GenerateJwtToken(Usuario usuario)
        {
            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, usuario.Id.ToString()),
                new Claim(ClaimTypes.Email, usuario.Email),
                new Claim("idSistemaAuxiliar", usuario.IdSistemaAuxiliar.ToString())
            };

            var key = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(_configuration["JwtSettings:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }

        private async Task<ActionResult> RegistrarContabilidadExterno(Usuario usuario, string Password)
        {
            try
            {
                var httpClient = new HttpClient();
                var urlExterno = "https://iso810-contabilidad.azurewebsites.net/api/Autenticacion/register";

                var datosExternos = new
                {
                    nombre = usuario.Nombre,
                    email = usuario.Email,
                    sistemaAuxiliarId = usuario.IdSistemaAuxiliar,
                    password = Password
                };

                var contenido = new StringContent(
                    JsonSerializer.Serialize(datosExternos),
                    Encoding.UTF8,
                    "application/json");

                var respuesta = await httpClient.PostAsync(urlExterno, contenido);

                if (!respuesta.IsSuccessStatusCode)
                {
                    // Opcional: Revertir el registro local si falla el externo
                    _context.Usuarios.Remove(usuario);
                    await _context.SaveChangesAsync();
                    return StatusCode((int)respuesta.StatusCode, "Error al registrar en el sistema externo");
                }

                return Ok();
            }
            catch (Exception ex)
            {
                // Manejar errores de conexión
                return StatusCode(500, $"Error al conectar con el servicio externo: {ex.Message}");
            }
        }

        private async Task<ActionResult<string>> AutenticarContabilidadExterno(UsuarioLoginDto loginDto)
        {
            try
            {
                var httpClient = new HttpClient();
                var urlExterno = "https://iso810-contabilidad.azurewebsites.net/api/Autenticacion/login";

                var datosLoginExterno = new
                {
                    email = loginDto.Email,
                    password = loginDto.Password
                };

                var respuesta = await httpClient.PostAsJsonAsync(urlExterno, datosLoginExterno);

                if (!respuesta.IsSuccessStatusCode)
                {
                    return StatusCode((int)respuesta.StatusCode, $"Error en autenticación externa: {await respuesta.Content.ReadAsStringAsync()}");
                }

                // 3. Opcional: Procesar respuesta del endpoint externo
                var respuestaExterna = await respuesta.Content.ReadFromJsonAsync<dynamic>();

                return respuestaExterna;
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error al conectar con el servicio externo: {ex.Message}");
            }
        }
    }
}

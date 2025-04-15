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
using ActivoFijoAPI.Services;

namespace ActivoFijoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthenticationController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;
        private const int idSistemaAuxiliar = 8; //Activos Fijos
        public AuthenticationController(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        [HttpGet("prueba")]
        public async Task<ActionResult<List<Departamento>>> Get() {
            try
            {
                return await _context.Departamentos.ToListAsync();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        [HttpGet("prueba_valor")]
        public string GetValor()
        {
            return "Hola Mundo";
        }


        [HttpPost("registrar")]
        public async Task<ActionResult<UsuarioRespuestaDto>> Registrar(UsuarioRegistroDto registroDto)
        {
            var service = new AutenticationServices();
            if (await _context.Usuarios.AnyAsync(u => u.Email == registroDto.Email))
                return BadRequest("El email ya está registrado");

            PasswordHelper.CreatePasswordHash(registroDto.Password, out byte[] passwordHash, out byte[] passwordSalt);

            var usuario = new Usuario
            {
                Nombre = registroDto.Nombre,
                Email = registroDto.Email,
                IdSistemaAuxiliar = idSistemaAuxiliar,
                PasswordHash = passwordHash,
                PasswordSalt = passwordSalt
            };

            _context.Usuarios.Add(usuario);

            await _context.SaveChangesAsync();

            var token = GenerateJwtToken(usuario);

            //Registrar en el sistema de contabilidad
            var registroContabilidad = await service.RegistrarContabilidadExternoAsync(usuario, registroDto.Password);

            return new UsuarioRespuestaDto
            {
                Id = usuario.Id,
                Nombre = usuario.Nombre,
                Email = usuario.Email,
                Token = token,
                TokenServicioExterno = registroContabilidad!.token
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UsuarioRespuestaDto>> Login(UsuarioLoginDto loginDto)
        {
            var service = new AutenticationServices();
            var usuario = await _context.Usuarios.FirstOrDefaultAsync(u => u.Email == loginDto.Email);

            if (usuario == null)
                return Unauthorized("Credenciales inválidas");

            if (!PasswordHelper.VerifyPasswordHash(loginDto.Password, usuario.PasswordHash, usuario.PasswordSalt))
                return Unauthorized("Credenciales inválidas");

            var token = GenerateJwtToken(usuario);

            var authContabilidad = await service.LoginAsync(new LoginRequest
            {
                email = loginDto.Email,
                password = loginDto.Password
            });

            return new UsuarioRespuestaDto { Id = usuario.Id, Nombre = usuario.Nombre, Email = usuario.Email, Token = token, TokenServicioExterno = authContabilidad?.token };
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
    }
}

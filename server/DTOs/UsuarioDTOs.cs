using System.ComponentModel.DataAnnotations;

namespace ActivoFijoAPI.DTOs
{
    public class UsuarioRegistroDto
    {
        [Required]
        public string Nombre { get; set; }

        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public int IdSistemaAuxiliar { get; set; }

        [Required, MinLength(6)]
        public string Password { get; set; }
    }

    public class UsuarioLoginDto
    {
        [Required, EmailAddress]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }
    }

    public class UsuarioRespuestaDto
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string? TokenServicioExterno { get; set; }
    }
}

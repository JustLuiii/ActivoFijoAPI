using System.ComponentModel.DataAnnotations.Schema;

namespace ActivoFijoAPI.Models
{
    [Table("ususario")]
    public class Usuario
    {
        public int Id { get; set; }
        public string Nombre { get; set; }
        public string Email { get; set; }
        public int IdSistemaAuxiliar { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
        public DateTime FechaCreacion { get; set; } = DateTime.UtcNow;
    }
}

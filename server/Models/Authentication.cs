namespace ActivoFijoAPI.Models
{
    public class LoginRequest
    {
        public string email { get; set; } = string.Empty;
        public string password { get; set; } = string.Empty;
    }

    public class UsuarioResponse
    {
        public int id { get; set; }
        public string nombre { get; set; } = string.Empty;
        public string email { get; set; } = string.Empty;
        public int sistemaAuxiliarId { get; set; }
    }

    public class LoginResponse
    {
        public string token { get; set; } = string.Empty;
        public UsuarioResponse usuario { get; set; } = new();
    }
}

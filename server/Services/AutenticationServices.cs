using ActivoFijoAPI.Models;
using System.Text.Json;
using System.Text;
using Azure;

namespace ActivoFijoAPI.Services
{
    public class AutenticationServices
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "https://iso810-contabilidad.azurewebsites.net";
        public AutenticationServices()
        {
            _httpClient = new HttpClient();
        }

        public async Task<LoginResponse?> LoginAsync(LoginRequest loginRequest)
        {
            try
            {
                var json = JsonSerializer.Serialize(loginRequest);
                var content = new StringContent(json, Encoding.UTF8, "application/json");

                var response = await _httpClient.PostAsync($"{_baseUrl}/api/Autenticacion/login", content);

                if (response.IsSuccessStatusCode)
                {
                    var result = await response.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<LoginResponse>(result, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                }

                throw new Exception(response.Content.ToString());
            }
            catch (Exception)
            {

                throw;
            }
        }

        public async Task<LoginResponse?> RegistrarContabilidadExternoAsync(Usuario usuario, string password)
        {
            try
            {
                var datosExternos = new
                {
                    nombre = usuario.Nombre,
                    email = usuario.Email,
                    sistemaAuxiliarId = usuario.IdSistemaAuxiliar,
                    password
                };

                var contenido = new StringContent(
                    JsonSerializer.Serialize(datosExternos),
                    Encoding.UTF8,
                    "application/json");

                var respuesta = await _httpClient.PostAsync($"{_baseUrl}/api/Autenticacion/register", contenido);

                if (respuesta.IsSuccessStatusCode)
                {
                    var result = await respuesta.Content.ReadAsStringAsync();
                    return JsonSerializer.Deserialize<LoginResponse>(result, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });
                }

                throw new Exception(respuesta.Content.ToString());
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}

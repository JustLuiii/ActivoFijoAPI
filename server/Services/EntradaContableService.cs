using System.Text.Json;
using System.Text;
using ActivoFijoAPI.Models;

namespace ActivoFijoAPI.Services
{
    public class EntradaContableService
    {
        private readonly HttpClient _httpClient;
        private readonly string _baseUrl = "https://iso810-contabilidad.azurewebsites.net/api/EntradaContable";
        private const int idSistemaAuxliar = 8; //Activos Fijos

        public EntradaContableService(string token)
        {
            _httpClient = new HttpClient();
            _httpClient.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", token);
        }

        // GET: Obtener todas las entradas contables
        public async Task<List<EntradaContable>?> GetAllAsync()
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}?SistemaAuxiliarId={idSistemaAuxliar}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<List<EntradaContable>>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            }

            return null;
        }

        // GET: Obtener una entrada contable por ID
        public async Task<EntradaContable?> GetByIdAsync(int id)
        {
            var response = await _httpClient.GetAsync($"{_baseUrl}/{id}");
            if (response.IsSuccessStatusCode)
            {
                var json = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<EntradaContable>(json, new JsonSerializerOptions { PropertyNameCaseInsensitive = true });
            }

            return null;
        }

        // POST: Crear una nueva entrada contable
        public async Task<bool> CreateAsync(EntradaContable entrada)
        {
            entrada.sistemaAuxiliarId = idSistemaAuxliar;
            var json = JsonSerializer.Serialize(entrada);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PostAsync(_baseUrl, content);
            return response.IsSuccessStatusCode;
        }

        // PUT: Actualizar una entrada contable existente
        public async Task<bool> UpdateAsync(int id, EntradaContable entrada)
        {
            entrada.sistemaAuxiliarId = idSistemaAuxliar;
            var json = JsonSerializer.Serialize(entrada);
            var content = new StringContent(json, Encoding.UTF8, "application/json");
            var response = await _httpClient.PutAsync($"{_baseUrl}/{id}", content);
            return response.IsSuccessStatusCode;
        }
    }
}

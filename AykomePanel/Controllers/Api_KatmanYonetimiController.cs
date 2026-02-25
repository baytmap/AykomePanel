using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Net;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Api_KatmanYonetimiController : ControllerBase
    {
        private readonly IApiRequest _request;
        public Api_KatmanYonetimiController(IApiRequest request)
        {
            _request = request;
        }

        [HttpGet]
        [Route("GetKatmanList")]
        public async Task<DefaultSonuc?> GetKatmanList()
        {
            var jsonData = await _request.GetAsync("api/KatmanYonetimi/GetKatmanList");
            DefaultSonuc5? parseModel = JsonSerializer.Deserialize<DefaultSonuc5>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("GetKatmanKontrol")]
        public async Task<DefaultSonuc?> GetKatmanKontrol([FromBody] WfsKatmanConnectParam Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/KatmanYonetimi/GetKatmanKontrol", postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetKatmanEkle")]
        public async Task<DefaultSonuc?> SetKatmanEkle([FromBody] DbKatmanParam Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/KatmanYonetimi/SetKatmanEkle", postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("GetKatmanKontrolWMS")]
        public async Task<DefaultSonuc?> GetKatmanKontrolWMS([FromBody] WfsKatmanConnectParam Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/KatmanYonetimi/GetKatmanKontrolWMS", postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

    }
}

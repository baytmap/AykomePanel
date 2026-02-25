using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using NetTopologySuite.Geometries;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AbsApiController : ControllerBase
    {
        private readonly IApiRequest _request;
        public AbsApiController(IApiRequest apiRequest)
        {
            _request = apiRequest;
        }
        [Route("getIlceee")]
        [HttpGet]
        public async Task<DefaultSonuc?> getIlceee()
        {
            var jsonData = await _request.GetAsync("api/Abs/getIlceee");
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }
        [Route("GetAdaParselPafta")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetAdaParselPafta([FromBody] AbsAdaParselPafta? Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Abs/GetAdaParselPafta", postJson);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("GetMahalle/{id}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetMahalle(int id)
        {
            var jsonData = await _request.GetAsync("api/Abs/GetMahalleler/" + id);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetCaddeSokak/{id}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetCaddeSokak(int id)
        {
            var jsonData = await _request.GetAsync("api/Abs/GetCaddeSokak/" + id);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetMahalleList")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetMahalleList([FromBody] MahalleParam? Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Abs/GetMahalleList", postJson);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("GetTasinmazList")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetTasinmazList([FromBody] TasinmazParam? Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Abs/GetTasinmazList", postJson);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("GetCaddeSokakList")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetCaddeSokakList([FromBody] CaddeSokakParam? Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Abs/GetCaddeSokakList", postJson);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }
        [Route("GetCaddeSokakList2/{MahalleID}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetCaddeSokakList2(int MahalleID)
        {
            var jsonData = await _request.GetAsync("api/Abs/GetCaddeSokakList2/" + MahalleID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }


        [Route("GetBasvuruYapanList")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetBasvuruYapanList([FromBody] BasvuranKisiBilgisiParam? Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Abs/GetBasvuruYapanList", postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }
    }
}

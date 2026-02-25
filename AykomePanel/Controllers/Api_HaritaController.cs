using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Api_HaritaController : ControllerBase
    {
        private readonly IApiRequest _request;
        public Api_HaritaController(IApiRequest request)
        {
            _request = request;
        }

        [HttpGet]
        [Route("GetKatmanList/{ProjeRef}")]
        public async Task<DefaultSonuc5?> GetKatmanList(decimal? ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Harita/GetKatmanList/"+ProjeRef);
            DefaultSonuc5? parseModel = JsonSerializer.Deserialize<DefaultSonuc5>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("GetKatmanDetay")]
        public async Task<IActionResult> GetKatmanDetay([FromBody] KatamanDataParam param)
        {
            var jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/KatmanYonetimi/GetKatmanDetay", jsonParam);
            DefaultSonuc? parseClass = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseClass);
        }
        [HttpPost]
        [Route("GetKatmanDetay2")]
        public async Task<IActionResult> GetKatmanDetay2([FromBody] KatamanDataParam2 param)
        {
            var jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/KatmanYonetimi/GetKatmanDetay2", jsonParam);
            DefaultSonuc? parseClass = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseClass);
        }
        [HttpPost]
        [Route("SetProje")]
        public async Task<IActionResult> SetProje([FromBody] ProjeBilgileriParam param)
        {
            var jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Harita/SetProje", jsonParam);
            DefaultSonuc? parseClass = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseClass);
        }
        [HttpPost]
        [Route("GetWmsKatFatInf")]
        public async Task<IActionResult> GetWmsKatFatInf([FromBody] WmsKatFatInfParam param)
        {
            var jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/KatmanYonetimi/GetWmsKatFatInf", jsonParam);
            DefaultSonuc2? parseClass = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return Ok(parseClass);
        }



        [HttpPost]
        [Route("GetAykomeKazi")]
        public async Task<IActionResult> GetAykomeKazi([FromBody] KatamanDataParam param)
        {
            var jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Harita/GetAykomeKazi", jsonParam);
            DefaultSonuc? parseClass = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseClass);
        }
        [HttpGet]
        [Route("GetKaziIngo/{PROJEREF}")]
        public async Task<IActionResult> GetKaziIngo(int PROJEREF)
        {
            var jsonData = await _request.GetAsync("api/Harita/GetKaziIngo/" + PROJEREF);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseModel);
        }

        [HttpGet]
        [Route("GetYOL_mah/{YOLREF}")]
        public async Task<IActionResult> GetYOL_mah(int YOLREF)
        {
            var jsonData = await _request.GetAsync("api/Harita/GetYOL_mah/" + YOLREF);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseModel);
        }

        [HttpGet]
        [Route("GetKaziYetki/{IlceRef}/{MahalleRef}/{YolAdiyetText}")]
        public async Task<IActionResult> GetKaziYetki(int IlceRef, int MahalleRef, string YolAdiyetText)
        {
            var jsonData = await _request.GetAsync("api/Harita/GetKaziYetki/" + IlceRef + "/" + MahalleRef + "/" + YolAdiyetText);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseModel);
        }
    }
}

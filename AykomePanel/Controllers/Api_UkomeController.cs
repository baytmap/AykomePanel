using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Api_UkomeController : ControllerBase
    {
        private readonly IApiRequest _request;
        public Api_UkomeController(IApiRequest request)
        {
            _request = request;
        }

        [Route("GetKararlarGirisLst")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetKararlarGirisLst([FromBody] Parameter4? Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Ukome/GetKararlarGirisLst", postJson);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("GetOtoParkLst")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetOtoParkLst([FromBody] Parameter5? Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Ukome/GetOtoParkLst", postJson);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }
    }
}

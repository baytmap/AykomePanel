using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Api_ImarController : ControllerBase
    {
        private readonly IApiRequest _request;
        public Api_ImarController(IApiRequest request)
        {
            _request = request;
        }

        [Route("GetYapiRuhsatLst")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetYapiRuhsatLst([FromBody] YapiRuhsatParam Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Imar/GetYapiRuhsatLst", postJson);
            DefaultSonuc8? parseModel = JsonSerializer.Deserialize<DefaultSonuc8>(jsonData);
            return parseModel;
        }

        [Route("GetYapiKullanmaIzniLst")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetYapiKullanmaIzniLst([FromBody] YapiKullanmaIzniParam Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Imar/GetYapiKullanmaIzniLst", postJson);
            DefaultSonuc7 parseModel = JsonSerializer.Deserialize<DefaultSonuc7>(jsonData);
            return parseModel;
        }
    }
}

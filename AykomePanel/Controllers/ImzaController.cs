using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ImzaController : ControllerBase
    {
        private readonly IApiRequest _request;
        public ImzaController(IApiRequest request)
        {
            _request = request;
        }

        [HttpPost]
        [Route("ImzaInitialize")]
        public async Task<IslemResult<TokenVM>> SetImzaInitialize([FromBody] EimzaParam param)
        {
            //string dosyaBase64 = string.Empty;
            //if (param.Dosya != null && param.Dosya.Length > 0)
            //{
            //    using (var ms = new MemoryStream())
            //    {
            //        await param.Dosya.CopyToAsync(ms);
            //        var fileBytes = ms.ToArray();
            //        dosyaBase64 = Convert.ToBase64String(fileBytes);
            //    }
            //}

            //String jsonParam = JsonSerializer.Serialize(new EimzaParam2
            //{
            //    sertifikaBase64 = param.sertifikaBase64,
            //    Dosya = dosyaBase64
            //});
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Eimza/ImzaInitialize", jsonParam);
            IslemResult<TokenVM>? parseModel = JsonSerializer.Deserialize<IslemResult<TokenVM>>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("ImzaFinalize")]
        public async Task<IslemResult<TokenVM>> SetFinalize([FromForm] EimzaParam3 param3)
        {
            String jsonParam = JsonSerializer.Serialize(param3);
            var jsonData = await _request.PostJsonAsync("api/Eimza/ImzaFinalize", jsonParam);
            IslemResult<TokenVM>? parseModel = JsonSerializer.Deserialize<IslemResult<TokenVM>>(jsonData);
            return parseModel;
        }
    }
}

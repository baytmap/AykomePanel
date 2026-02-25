using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Api_GenelController : ControllerBase
    {
        private readonly IApiRequest _request;
        private readonly HttpClient _httpClient;
        public Api_GenelController(IApiRequest request, HttpClient httpClient)
        {
            _request = request;
            _httpClient = httpClient;
        }

        [HttpGet("wms-proxy")]
        public async Task<IActionResult> WmsProxy([FromQuery] string url)
        {
            try
            {
                var handler = new HttpClientHandler
                {
                    ServerCertificateCustomValidationCallback = (sender, cert, chain, sslPolicyErrors) => true
                };

                using (var client = new HttpClient(handler))
                {
                    var response = await client.GetAsync(url);

                    if (!response.IsSuccessStatusCode)
                        return StatusCode((int)response.StatusCode);

                    var content = await response.Content.ReadAsByteArrayAsync();
                    return File(content, response.Content.Headers.ContentType?.ToString() ?? "image/png");
                }
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpGet]
        [Route("GetKullaniciList/{Tanim}")]
        public async Task<DefaultSonuc?> GetKullaniciList(Boolean Tanim)
        {
            var jsonData = await _request.GetAsync("api/Genel/GetKullaniciList/" + Tanim);
            DefaultSonuc3? parseModel = JsonSerializer.Deserialize<DefaultSonuc3>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetKullaniciEdid")]
        public async Task<DefaultSonuc?> SetKullaniciEdid([FromBody] UserInfoParam Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/SetKullaniciEdid", postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("SetKullaniciDelete/{slcUserID}")]
        public async Task<DefaultSonuc?> SetKullaniciDelete(int slcUserID)
        {
            var jsonData = await _request.GetAsync("api/Genel/SetKullaniciDelete/" + slcUserID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("YetkimVarmi2")]
        public async Task<DefaultSonuc?> YetkimVarmi2(String? Islem)
        {
            var jsonData = await _request.GetAsync($"api/Panel/YetkimVarmi2");
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;

        }

        [HttpGet]
        [Route("GetCalismaYili")]
        public async Task<DefaultSonuc?> GetCalismaYili()
        {
            var jsonData = await _request.GetAsync($"api/Panel/GetCalismaYili");
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;

        }

        [HttpGet]
        [Route("SetCalismaYili")]
        public async Task<DefaultSonuc?> SetCalismaYili(int Yil)
        {
            var jsonData = await _request.GetAsync($"api/Panel/SetCalismaYili?Yil=" + Yil);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;

        }

        [HttpGet]
        [Route("SetKatmanDelete/{slcUnigID}")]
        public async Task<DefaultSonuc?> SetKatmanDelete(int slcUnigID)
        {
            var jsonData = await _request.GetAsync("api/Genel/SetKatmanDelete/" + slcUnigID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("GetDashboard/{Tanim}")]
        public async Task<DefaultSonuc?> GetDashboard(Boolean Tanim)
        {
            var jsonData = await _request.GetAsync("api/Genel/GetDashboard/" + Tanim);
            DefaultSonuc8? parseModel = JsonSerializer.Deserialize<DefaultSonuc8>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("GetLogs")]
        public async Task<DefaultSonuc?> GetLogs(LogParam Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/GetLogs", postJson);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("GetErrors")]
        public async Task<DefaultSonuc?> GetErrors(ErrorParam Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/GetErrors", postJson);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetKurumsProjeTips/{BirimID}")]
        public async Task<DefaultSonuc?> SetKurumsProjeTips(int BirimID, [FromBody] int[] Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/SetKurumsProjeTips/" + BirimID, postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetKaplama")]
        public async Task<DefaultSonuc?> SetKaplama(AykGiydirmeOut Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/SetKaplama", postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpDelete]
        [Route("SetKaplamaDelete/{Param}")]
        public async Task<DefaultSonuc?> SetKaplamaDelete(int Param)
        {
            var jsonData = await _request.DeleteJsonAsync("api/Genel/SetKaplamaDelete/" + Param);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("GetIlceninMahalleleri/{BirimID}")]
        public async Task<DefaultSonuc?> GetIlceninMahalleleri([FromRoute] int BirimID, [FromBody] int[] Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/GetIlceninMahalleleri/" + BirimID, postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetIlceninMahalleleri/{BirimID}")]
        public async Task<DefaultSonuc?> SetIlceninMahalleleri([FromRoute] int BirimID, KurumIlceMahParam[] Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/SetIlceninMahalleleri/" + BirimID, postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("KurumYonetimi/{Tanim}")]
        public async Task<KurumFirstDataOut?> KurumYonetimi(Boolean Tanim)
        {
            var jsonData = await _request.GetAsync("api/Genel/KurumYonetimi/" + Tanim);
            KurumFirstDataOut? parseModel = JsonSerializer.Deserialize<KurumFirstDataOut>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("SetKurumDelete/{KurumID}")]
        public async Task<DefaultSonuc?> SetKurumDelete(int KurumID)
        {
            var jsonData = await _request.GetAsync("api/Genel/SetKurumDelete/" + KurumID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetKurumEdit")]
        public async Task<DefaultSonuc?> SetKurumEdit(Parameter2 Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/SetKurumEdit", postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetBirimEdit")]
        public async Task<DefaultSonuc?> SetBirimEdit(Parameter4 Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/SetBirimEdit", postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("BirimDetay/{BirimID}")]
        public async Task<BirimDetayOut?> BirimDetay(int BirimID)
        {
            var jsonData = await _request.GetAsync("api/Genel/BirimDetay/" + BirimID);
            BirimDetayOut? parseModel = JsonSerializer.Deserialize<BirimDetayOut>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetBirimRols/{BirimID}")]
        public async Task<DefaultSonuc?> SetBirimRols(int BirimID, [FromBody] int[] Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/SetBirimRols/" + BirimID, postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }
        [HttpPost]
        [Route("SetYolAidiyet/{BirimID}")]
        public async Task<DefaultSonuc?> SetYolAidiyet(int BirimID, [FromBody] int[] Param)
        {
            String postJson = JsonSerializer.Serialize(Param);
            var jsonData = await _request.PostJsonAsync("api/Genel/SetYolAidiyet/" + BirimID, postJson);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpDelete]
        [Route("SetBirimDelete/{BirimID}")]
        public async Task<DefaultSonuc?> SetBirimDelete(int BirimID)
        {
            var jsonData = await _request.DeleteJsonAsync("api/Genel/SetBirimDelete/" + BirimID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("SetKaplamaEksi")]
        public async Task<DefaultSonuc?> SetKaplamaEksi()
        {
            var jsonData = await _request.GetAsync($"api/Genel/SetKaplamaEksi");
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("SetKaplamaArti")]
        public async Task<DefaultSonuc?> SetKaplamaArti()
        {
            var jsonData = await _request.GetAsync($"api/Genel/SetKaplamaArti");
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

       
    }
}
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ApiTestController : ControllerBase
    {
        private readonly IApiRequest _request;
        public ApiTestController(IApiRequest apiRequest)
        {
            _request = apiRequest;
        }


        [HttpGet]
        [Route("GetCizimTipleri")]
        public async Task<IActionResult> GetCizimTipleri()
        {
            var jsonData = await _request.GetAsync("api/Katmans/CizimTipleri");
            CizimTip[]? parseClass = JsonSerializer.Deserialize<CizimTip[]>(jsonData);
            return Ok(parseClass);
        }

        [HttpGet]
        [Route("GetInputTipleri")]
        public async Task<IActionResult> GetInputTipleri()
        {
            var jsonData = await _request.GetAsync("api/Katmans/InputTipleri");
            InputTip[]? parseClass = JsonSerializer.Deserialize<InputTip[]>(jsonData);
            return Ok(parseClass);
        }
         

        #region Katman
        [HttpGet]
        [Route("GetKatman")]
        public async Task<IActionResult> GetKatman()
        {
            //var jsonData = await _request.GetAsync("api/Katmans");
            //Katman[]? parseClass = JsonSerializer.Deserialize<Katman[]>(jsonData);

            var jsonData = await _request.GetAsync("api/abs/GetKatmanlar");
            DefaultSonuc? parseClass = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseClass);
        }

        [HttpGet]
        [Route("GetKatmanVeri")]
        public async Task<IActionResult> GetKatmanVeri(String ReqKatman)
        {
            //var jsonData = await _request.GetAsync("api/KatmanProperties?KatmanID=" + KatmanID);
            //KatmanProperties[]? parseClass = JsonSerializer.Deserialize<KatmanProperties[]>(jsonData);
            //return Ok(parseClass);
            var jsonData = await _request.GetAsync("api/abs/GetKatmanDetay?ReqKatman="+ ReqKatman);
            DefaultSonuc? parseClass = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return Ok(parseClass);
        }

        [HttpPost]
        [Route("SetKatman")]
        public async Task<IActionResult> SetKatman(Katman polygon)
        {
            String postJson = JsonSerializer.Serialize(polygon);
            var jsonData = await _request.PostJsonAsync("api/Katmans", postJson);
            Katman[]? parseClass = JsonSerializer.Deserialize<Katman[]>(jsonData);
            return Ok(parseClass);
        }

        [HttpPut]
        [Route("UpdateKatman")]
        public async Task<IActionResult> UpdateKatman(Katman polygon)
        {
            String postJson = JsonSerializer.Serialize(polygon);
            var jsonData = await _request.PutJsonAsync("api/Katmans", postJson);
            Katman[]? parseClass = JsonSerializer.Deserialize<Katman[]>(jsonData);
            return Ok(parseClass);
        }

        [HttpDelete]
        [Route("DeleteKatman")]
        public async Task<IActionResult> DeleteKatman(int ID)
        {
            var jsonData = await _request.DeleteJsonAsync("api/Katmans/" + ID);
            Katman[]? parseClass = JsonSerializer.Deserialize<Katman[]>(jsonData);
            return Ok(parseClass);
        }

        #endregion



    



        [HttpGet]
        [Route("GetGisData")]
        public async Task<String> GetPlygon()
        {
            //  var jsonData = await _request.GetAsync("api/Test/GetGisData");
            var jsonData = await _request.GetAsync("api/Test/GetGisData2");
            //  JsonSerializer.Deserialize<xxxClass>(jsonData.Result);

            return jsonData;
        }
        [HttpPost]
        [Route("PostmyPolygon")]
        public async Task<IActionResult> PostmyPolygon(PostKordinat polygon)
        {
            String jsonData = JsonSerializer.Serialize(polygon);
            var FFF = await _request.PostJsonAsync("api/Test/PostmyPolygon", jsonData);
            return Ok();
        }

        [HttpPost]
        [Route("PostmyLinestring")]
        public async Task<IActionResult> PostmyLinestring(PostKordinat2 polygon)
        {
            String jsonData = JsonSerializer.Serialize(polygon);
            var FFF = await _request.PostJsonAsync("api/Test/PostmyLinestring", jsonData);
            return Ok();
        }





        ////Post Ornegi
        //DaireBaskanligi daireBaskanligi = new DaireBaskanligi
        //{
        //    DaireBaskanligiAd = "Ornek Ad",
        //    Sira = 1
        //};
        //String json = JsonSerializer.Serialize(daireBaskanligi);

        //jsonData = _request.PostAsync("api/SetKategori", json);
        //    var values2 = JsonConvert.DeserializeObject<DaireBaskanligi>(jsonData.Result);






    }
    public class PostKordinat
    {
        public required string type { get; set; }
        public required Properties properties { get; set; }
        public required MyGeometry geometry { get; set; }
    }
    public class PostKordinat2
    {
        public required string type { get; set; }
        public required Properties properties { get; set; }
        public required MyGeometry2 geometry { get; set; }
    }

    public class Properties
    {
    }
    public class MyGeometry
    {
        public required string type { get; set; }
        public required float[][][] coordinates { get; set; }
    }
    public class MyGeometry2
    {
        public required string type { get; set; }
        public required float[][] coordinates { get; set; }
    }
    public class OrnekVeri
    {
        public required int ID { get; set; }
        public required String AdSoyad { get; set; }
    }
}

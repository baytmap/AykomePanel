using AykomePanel.ClassHome._Home;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;



namespace AykomePanel.Controllers
{
    [Authorize]
    public class TestController : Controller
    {
        private readonly IApiRequest _request;
        public TestController(IApiRequest apiRequest)
        {
            _request = apiRequest;
        }


        public async Task<IActionResult> Index()
        {
            var Sorgu1 = await _request.GetAsync("api/Test");
            OrnekVeri[]? ornekVeri = JsonSerializer.Deserialize<OrnekVeri[]>(Sorgu1);

            var Sorgu2 = await _request.GetAsync("api/Test/GetShirt2");

            var Sorgu3 = await _request.GetAsync("api/Test/GetShirt3");

            var Sorgu4 = await _request.GetAsync("api/Test/25/OrnekDeger");

            var Sorgu5 = await _request.GetAsync("api/Test/Sorgula/25");

            var Sorgu6 = await _request.GetAsync("api/Test/Sorgula/25", new KeyVal() { Key = "Color", Value = "Test Deneme" });

            var Sorgu8 = await _request.PostJsonAsync("api/Test", JsonSerializer.Serialize(new OrnekVeri() { ID = 25, AdSoyad = "Salman ARSLAN" }));

            var Sorgu9 = await _request.PostFormAsync("api/Test/Olusutur", new Dictionary<string, string> { { "ID", "25" }, { "AdSoyad", "değer2 sdfds" } });

            return View();
        }

        public IActionResult Tema()
        {
            return View();
        }
        public IActionResult Cizim()
        {
            return View();
        }
        public IActionResult Katmanlar()
        {
            return View();
        }

    }

}

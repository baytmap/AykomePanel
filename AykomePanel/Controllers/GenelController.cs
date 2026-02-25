using AykomePanel.ClassHome._Home;
using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using AykomePanel.ControllersConfig;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    public class GenelController : Controller
    {
        private readonly IApiRequest _request;

        public GenelController(IApiRequest apiRequest)
        {
            _request = apiRequest;
        }

        [TypeFilter(typeof(RolAttributeFactory), Arguments = new object[] { new UserRolOut[] { UserRolOut.Admin } })]
        public IActionResult KatmanYonetimi()
        {
            return View();
        }

        [TypeFilter(typeof(RolAttributeFactory), Arguments = new object[] { new UserRolOut[] { UserRolOut.Admin } })]
        public IActionResult KullaniciYonetimi()
        {
            return View();
        }
        public IActionResult Hakkinda()
        {
            return View();
        }



        public IActionResult SifreDegistir()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> SifreDegistir(SifreParam model)
        {
            if (ModelState.IsValid)
            {
                if (model.EskiSifre != "" && model.YeniSifre.Equals(model.YeniSifreYeniden))
                {
                    String postJson = JsonSerializer.Serialize(model);
                    var jsonData = await _request.PostJsonAsync("api/Genel/SifreDegistir", postJson);
                    DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
                    if (parseModel.success)
                        TempData["Mesaj"] = parseModel.message.MesajMetni ?? "";
                    else
                        TempData["Hata"] = parseModel.message.MesajMetni ?? "";
                }
                else
                    TempData["Hata"] = "Şifreniz Değiştirilemedi! Lütfen Bilgilerinizi Kontrol edin.";
            }
            else
                TempData["Hata"] = "Şifreniz Değiştirilemedi! Lütfen Bilgilerinizi Kontrol edin.";
            return View(model);
        }


        [TypeFilter(typeof(RolAttributeFactory), Arguments = new object[] { new UserRolOut[] { UserRolOut.Admin } })]
        public IActionResult LogListesi()
        {
            return View();
        }

        [TypeFilter(typeof(RolAttributeFactory), Arguments = new object[] { new UserRolOut[] { UserRolOut.Admin } })]
        public IActionResult HataListesi()
        {
            return View();
        }

        [TypeFilter(typeof(RolAttributeFactory), Arguments = new object[] { new UserRolOut[] { UserRolOut.Admin } })]
        public async Task<IActionResult> KaplamaList(int Yil)
        {
            var jsonData = await _request.GetAsync("api/Genel/GetKaplamaList?Yil="+ Yil);
            AykGiydirmeDataOut? parseModel = JsonSerializer.Deserialize<AykGiydirmeDataOut>(jsonData);
            return View(parseModel);
        }

        [HttpPost]
        public async Task<IActionResult> SetKaplama([FromBody] AykGiydirmeOut param)
        {
            String postJson = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Genel/GetKaplamaList/", postJson);
            AykGiydirmeOut? parseModel = JsonSerializer.Deserialize<AykGiydirmeOut>(jsonData);
            return View(parseModel);
        }
        public IActionResult ErisimYok()
        {
            return View();
        }

        [TypeFilter(typeof(RolAttributeFactory), Arguments = new object[] { new UserRolOut[] { UserRolOut.Admin } })]
        public IActionResult KurumYonetimi()
        {
            return View();
        }
    }
}
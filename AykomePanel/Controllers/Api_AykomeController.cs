using AykomePanel.ClassHome._Home;
using AykomePanel.ClassHome._Request;
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using AykomePanel.ControllersConfig;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Net.Http.Headers;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class Api_AykomeController : ControllerBase
    {
        private readonly IApiRequest _request;
        public Api_AykomeController(IApiRequest request)
        {
            _request = request;
        }

        [Route("GetProjeList/{Tanim}/{pageNumber}")]
        [HttpGet]
        public async Task<ProjeListOut?> GetProjeList(Boolean Tanim, int pageNumber)
        {
            var jsonData = await _request.GetProjeListAsync("api/Aykome/GetProjeList/" + Tanim + "/" + pageNumber);
            ProjeListOut? parseModel = JsonSerializer.Deserialize<ProjeListOut>(jsonData);
            return parseModel;
        }
        [Route("GetProjeListBatch/{Tanim}/{pageNumber}")]
        [HttpGet]
        public async Task<ProjeListOut?> GetProjeListBatch(Boolean Tanim, int pageNumber)
        {
            var jsonData = await _request.GetProjeListAsync("api/AykomeIki/GetProjeListBatch/" + Tanim + "/" + pageNumber);
            ProjeListOut? parseModel = JsonSerializer.Deserialize<ProjeListOut>(jsonData);
            return parseModel;
        }

        [Route("GetProjeDagitimBilgi/{ID}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetProjeDagitimBilgi(decimal ID)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetProjeDagitimBilgi/" + ID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetProjeOlurBilgi/{ID}/{OnayTip}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetProjeOlurBilgi(int ID, int OnayTip)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetProjeOlurBilgi/" + ID + "/" + OnayTip);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetProjeRuhsatBilgi/{ID}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetProjeRuhsatBilgi(int ID)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetProjeRuhsatBilgi/" + ID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetProjeIrsaliyeBilgi/{ID}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetProjeIrsaliyeBilgi(int ID)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetProjeIrsaliyeBilgi/" + ID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }
        [Route("GetProjeResimBilgi/{ID}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetProjeResimBilgi(int ID)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetProjeResimBilgi/" + ID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }
        [Route("GetProjeMaremBilgi/{ID}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetProjeMaremBilgi(int ID)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetProjeMaremBilgi/" + ID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetProjeAra")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetProjeAra([FromBody] ProjeListesiAraParam param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetProjeAra", jsonParam);
            DefaultSonuc3? parseModel = JsonSerializer.Deserialize<DefaultSonuc3>(jsonData);
            return parseModel;
        }

        [Route("GetProjeGostGorBilgi/{ID}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetProjeGostGorBilgi(int ID)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetProjeGostGorBilgi/" + ID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetKacakKazilarList")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetKacakKazilarList(TarihAralik? param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetKacakKazilarList", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }



        [Route("GetAyarlar/{Tanim}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetAyarlar(Boolean Tanim)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetAyarlar/" + Tanim);
            DefaultSonuc3? parseModel = JsonSerializer.Deserialize<DefaultSonuc3>(jsonData);
            return parseModel;
        }


        [Route("GetBirimList/{KurumID}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetBirimList(int KurumID)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetBirimList/" + KurumID);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetAyarlarEkle")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetAyarlarEkle(AykomeAyrParam? param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetAyarlarEkle", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }


        [Route("GetAyarlarEkle2/{GunSayi}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetAyarlarEkle2(int? GunSayi)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetAyarlarEkle2/" + GunSayi);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetPasifProjeNo")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetPasifProjeNo()
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetPasifProjeNo");
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetPasifProjeler/{ProjeNo}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetPasifProjeler(long? ProjeNo)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetPasifProjeler/" + ProjeNo);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetKaziRaporu2")]
        [HttpPost]
        public async Task<DefaultSonuc4?> GetKaziRaporu2(KaziRaporu2Param? param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetKaziRaporu2", jsonParam);
            DefaultSonuc4? parseModel = JsonSerializer.Deserialize<DefaultSonuc4>(jsonData);
            return parseModel;
        }

        [Route("GetOrtakKazilar")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetOrtakKazilar(Parameterobj3? param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetOrtakKazilar", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetAykomeAnaliz")]
        [HttpPost]
        public async Task<DefaultSonuc6?> GetAykomeAnaliz(AykomeAnalizParam? param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetAykomeAnaliz", jsonParam);
            DefaultSonuc6? parseModel = JsonSerializer.Deserialize<DefaultSonuc6>(jsonData);
            return parseModel;
        }

        [Route("SetProjeTopluIslem")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetProjeTopluIslem([FromBody] int[] param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetProjeTopluIslem", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("SetProjeTopluOlurVer")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetProjeTopluOlurVer([FromBody] int[] param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetProjeTopluOlurVer", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("SetProjeAktifPasif/{ProjeID}/{AKtifPasif}")]
        [HttpGet]
        public async Task<DefaultSonuc?> SetProjeAktifPasif(int ProjeID, short AKtifPasif)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetProjeAktifPasif/" + ProjeID + "/" + AKtifPasif);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("SetOlurVermek")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetOlurVermek([FromBody] OlurParam param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetOlurVermek", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("SetRedVermek")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetRedVermek([FromBody] OlurParam param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetRedVermek", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }


        [Route("SetOnayciRedVermek")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetOnayciRedVermek([FromBody] OlurParam param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetOnayciRedVermek", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }


        [Route("SetKaziBaslat/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc?> SetKaziBaslat(decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetKaziBaslat/" + ProjeRef);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }
        [Route("SetKaziBitir/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc?> SetKaziBitir(decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetKaziBitir/" + ProjeRef);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetProjeFiles/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetProjeFiles(decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetProjeFiles/" + ProjeRef);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("SetDagitimIncelendi/{ProjeRef}")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetOlurVermek([FromRoute] decimal ProjeRef, [FromBody] String param)
        {
            String jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetDagitimIncelendi/" + ProjeRef, jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [HttpGet]
        [Route("GetMakbuzBilgi/{ProjeRef}")]
        public async Task<MakbuzOut?> GetMakbuzBilgi(int ProjeRef)
        {
            var jsonData = await _request.GetAsync($"api/Aykome/GetMakbuzBilgi/" + ProjeRef);
            MakbuzOut? parseModel = JsonSerializer.Deserialize<MakbuzOut>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("GetRuhsatFormBilgi/{ProjeRef}")]
        public async Task<DefaultSonuc10?> GetRuhsatFormBilgi(int ProjeRef, [FromBody] MakbuzBilgi makbuzBilgi)
        {
            string jsonParam = JsonSerializer.Serialize(makbuzBilgi);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetRuhsatFormBilgi/" + ProjeRef, jsonParam);
            DefaultSonuc10? parseModel = JsonSerializer.Deserialize<DefaultSonuc10>(jsonData);
            return parseModel;

        }

        [HttpGet]
        [Route("GetRuhsatFormBilgi2/{ProjeRef}")]
        public async Task<DefaultSonuc10?> GetRuhsatFormBilgi2(int ProjeRef)
        {
            var jsonData = await _request.GetAsync($"api/Aykome/GetRuhsatFormBilgi2/" + ProjeRef);
            DefaultSonuc10? parseModel = JsonSerializer.Deserialize<DefaultSonuc10>(jsonData);
            return parseModel;

        }

        //[Route("SetMakbuzBilgi/{ProjeRef}")]
        //[HttpPost]
        //public async Task<DefaultSonuc?> SetMakbuzBilgi([FromRoute] decimal ProjeRef, [FromBody] MakbuzBilgi makbuzBilgi)
        //{
        //    string jsonParam = JsonSerializer.Serialize(makbuzBilgi);
        //    var jsonData = await _request.PostJsonAsync("api/Aykome/SetMakbuzBilgi/" + ProjeRef, jsonParam);
        //    DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
        //    return parseModel;
        //}
        [HttpPost]
        [Route("SetRuhsatHesapla/{ProjeRef}")]
        public async Task<DefaultSonuc2?> SetRuhsatHesapla([FromRoute] decimal ProjeRef, [FromBody] RuhsatHesapParam param)
        {
            string jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetRuhsatHesapla/" + ProjeRef, jsonParam);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetUploadRuhsatPdf")]
        public async Task<DefaultSonuc2?> SetUploadRuhsatPdf(IFormFile file)
        {
            DefaultSonuc2? sonuc2 = new DefaultSonuc2();
            if (file == null || file.Length == 0)
            {
                sonuc2.success = false;
                return sonuc2;
            }

            //using (var stream = file.OpenReadStream())
            //{
            //    // HTTP istek nesnesini oluşturun.
            //    using (var client = new HttpClient())
            //    {
            //        var cookieValue = HttpContext.Request.Cookies["MyCookieAuth"];
            //        if (!string.IsNullOrEmpty(cookieValue))
            //            client.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);

            //        // İstek başlığını ayarlayın.
            //        //client.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue("Bearer", "API_TOKEN"); // API token'ınızı buraya ekleyin.

            //        // İstek gövdesini oluşturun.
            //        var content = new StreamContent(stream);
            //        content.Headers.ContentType = new MediaTypeHeaderValue("application/octet-stream"); // Dosya türünü ayarlayın.

            //        // İsteği gönderin.
            //        var response = await client.PostAsync("https://localhost:44398/api/Aykome/SetUploadRuhsatPdf", content);

            //        // Yanıtı işleyin.
            //        if (response.IsSuccessStatusCode)
            //        {
            //          String bb= await response.Content.ReadAsStringAsync();
            //            // Dosya başarıyla gönderildi.
            //        }
            //        else
            //        {
            //            // Hata oluştu.
            //        }
            //    }
            //}

            //var filePath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot\\img", file.FileName);
            //using (var stream = new FileStream(filePath, FileMode.Create))
            //    await file.CopyToAsync(stream);

            var jsonData = await _request.PostFileAsync("api/Aykome/SetUploadRuhsatPdf", file, null);
            sonuc2 = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return sonuc2;
        }


        [Route("GetIrsaliye")]
        [HttpPost]
        public async Task<DefaultSonuc?> GetIrsaliye(GetIrsaliyeParam param)
        {
            DefaultSonuc? defaultSonuc = new DefaultSonuc();
            string jsonParam = Newtonsoft.Json.JsonConvert.SerializeObject(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetIrsaliye", jsonParam);
            defaultSonuc = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return defaultSonuc;
        }
        [Route("SetRuhsatYayinla")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetRuhsatYayinla(GetIrsaliyeParam param)
        {
            DefaultSonuc? defaultSonuc = new DefaultSonuc();
            string jsonParam = Newtonsoft.Json.JsonConvert.SerializeObject(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetRuhsatYayinla", jsonParam);
            defaultSonuc = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return defaultSonuc;
        }

        [Route("SetOnayVermek")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetOnayVermek(SetOnayParam param)
        {
            DefaultSonuc? defaultSonuc = new DefaultSonuc();
            string jsonParam = Newtonsoft.Json.JsonConvert.SerializeObject(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetOnayVermek", jsonParam);
            defaultSonuc = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return defaultSonuc;
        }


        // [RequestSizeLimit(904857600)]
        [HttpPost]
        [Route("SetAraziKontrol/{ProjeRef}")]
        public async Task<DefaultSonuc?> SetAraziKontrol([FromRoute] decimal ProjeRef, [FromBody] AraziKontrolParam param)
        {
            DefaultSonuc defaultSonuc = new DefaultSonuc();
            string jsonParam = Newtonsoft.Json.JsonConvert.SerializeObject(param);
            //string jsonParam = JsonSerializer.Serialize(param, options);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetAraziKontrol/" + ProjeRef, jsonParam);
            defaultSonuc = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return defaultSonuc;
        }

        //[Route("SetAraziKontrolSifirla/{ProjeRef}")]
        //[HttpGet]
        //public async Task<DefaultSonuc?> SetAraziKontrolSifirla(decimal ProjeRef)
        //{
        //    var jsonData = await _request.GetAsync("api/Aykome/SetAraziKontrolSifirla/" + ProjeRef);
        //    DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
        //    return parseModel;
        //}


        [Route("GetAraziKontrol/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetAraziKontrol(decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetAraziKontrol/" + ProjeRef);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetAraziKontrolUbelge")]
        [HttpPost]
        public async Task<DefaultSonuc4?> GetAraziKontrolUbelge(decimal[] ProjeRef)
        {
            string jsonParam = JsonSerializer.Serialize(ProjeRef);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetAraziKontrolUbelge", jsonParam);
            DefaultSonuc4? parseModel = JsonSerializer.Deserialize<DefaultSonuc4>(jsonData);
            return parseModel;
        }

        [Route("GetAraziKontrolUbelgeFull")]
        [HttpPost]
        public async Task<DefaultSonuc3?> GetAraziKontrolUbelgeFull(decimal[] ProjeRef)
        {
            string jsonParam = JsonSerializer.Serialize(ProjeRef);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetAraziKontrolUbelgeFull", jsonParam);
            DefaultSonuc3? parseModel = JsonSerializer.Deserialize<DefaultSonuc3>(jsonData);
            return parseModel;
        }


        [Route("SetAraziKontrolUbelge")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetAraziKontrolUbelge(Parameterobj3 param)
        {
            string jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetAraziKontrolUbelge", jsonParam);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("GetIncelemeNotu/{ProjeRef}/{IncelemeTipi}")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetIncelemeNotu([FromRoute] decimal ProjeRef, [FromRoute] String IncelemeTipi)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetIncelemeNotu/" + ProjeRef + "/" + IncelemeTipi);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("SetUygunlukBelgesiGeriAl/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc?> SetUygunlukBelgesiGeriAl([FromRoute] decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetUygunlukBelgesiGeriAl/" + ProjeRef);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }


        #region Ek Ruhsat

        [Route("GetEkRuhsatBilgileri/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc9?> GetEkRuhsatBilgileri([FromRoute] decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetEkRuhsatBilgileri/" + ProjeRef);
            DefaultSonuc9? parseModel = JsonSerializer.Deserialize<DefaultSonuc9>(jsonData);
            return parseModel;
        }

        [Route("SetEkHesapHesapKaydet")]
        [HttpPost]
        public async Task<DefaultSonuc5?> SetEkHesapHesapKaydet(EkHesapParam param)
        {
            string jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetEkHesapHesapKaydet", jsonParam);
            DefaultSonuc5? parseModel = JsonSerializer.Deserialize<DefaultSonuc5>(jsonData);
            return parseModel;
        }
        #endregion

        [Route("GetIrsaliyeEk")]
        [HttpPost]
        public async Task<DefaultSonuc2?> GetIrsaliyeEk(GetIrsaliyeParam param)
        {
            DefaultSonuc2? defaultSonuc = new DefaultSonuc2();
            string jsonParam = Newtonsoft.Json.JsonConvert.SerializeObject(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/GetIrsaliyeEk", jsonParam);
            defaultSonuc = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return defaultSonuc;
        }
        [Route("SetRuhsatYayinlaEk")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetRuhsatYayinlaEk(GetIrsaliyeParam param)
        {
            DefaultSonuc? defaultSonuc = new DefaultSonuc();
            string jsonParam = Newtonsoft.Json.JsonConvert.SerializeObject(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetRuhsatYayinlaEk", jsonParam);
            defaultSonuc = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return defaultSonuc;
        }

        [Route("SetOnayVermekEk")]
        [HttpPost]
        public async Task<DefaultSonuc?> SetOnayVermekEk(SetOnayParam param)
        {
            DefaultSonuc? defaultSonuc = new DefaultSonuc();
            string jsonParam = Newtonsoft.Json.JsonConvert.SerializeObject(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetOnayVermekEk", jsonParam);
            defaultSonuc = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return defaultSonuc;
        }

        [Route("GetOnayTarihiniDat/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc2?> GetOnayTarihiniDat([FromRoute] decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetOnayTarihiniDat/" + ProjeRef);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("SetOnayTarihiniGunc/{ProjeRef}/{t1}/{t2}")]
        [HttpGet]
        public async Task<DefaultSonuc?> SetOnayTarihiniGunc([FromRoute] decimal ProjeRef, [FromRoute] String t1, [FromRoute] String t2)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetOnayTarihiniGunc/" + ProjeRef + "/" + t1 + "/" + t2);
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }


        [Route("GetRuhsatHesapDegBil/{ProjeRef}/{tip}")]
        [HttpGet]
        public async Task<DefaultSonuc3?> GetRuhsatHesapDegBil([FromRoute] decimal ProjeRef, [FromRoute] string tip)
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetRuhsatHesapDegBil/" + ProjeRef + "/" + tip);
            DefaultSonuc3? parseModel = JsonSerializer.Deserialize<DefaultSonuc3>(jsonData);
            return parseModel;
        }

        [HttpPost]
        [Route("SetRuhsatHesapGuncelleme/{ProjeRef}/{tip}")]
        public async Task<DefaultSonuc2?> SetRuhsatHesapGuncelleme([FromRoute] decimal ProjeRef, [FromRoute] string tip, [FromBody] RuhsatHesapParam2 param)
        {
            string jsonParam = JsonSerializer.Serialize(param);
            var jsonData = await _request.PostJsonAsync("api/Aykome/SetRuhsatHesapGuncelleme/" + ProjeRef + "/" + tip, jsonParam);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("GetImzaKullacilari")]
        [HttpGet]
        public async Task<DefaultSonuc?> GetImzaKullacilari()
        {
            var jsonData = await _request.GetAsync("api/Aykome/GetImzaKullacilari");
            DefaultSonuc? parseModel = JsonSerializer.Deserialize<DefaultSonuc>(jsonData);
            return parseModel;
        }

        [Route("SetProjeyiIptalEt/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc2?> SetSetProjeyiIptalEt([FromRoute] decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetProjeyiIptalEt/" + ProjeRef);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("SetProjeyeTekrarBasvur/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc2?> SetProjeyeTekrarBasvur([FromRoute] decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetProjeyeTekrarBasvur/" + ProjeRef);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("SetProjOlurunuGeriCek/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc2?> SetProjOlurunuGeriCek([FromRoute] decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetProjOlurunuGeriCek/" + ProjeRef);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("SetProjReddiniGeriCek/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc2?> SetProjReddiniGeriCek([FromRoute] decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetProjReddiniGeriCek/" + ProjeRef);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

        [Route("SetProjininOnayiniCek/{ProjeRef}")]
        [HttpGet]
        public async Task<DefaultSonuc2?> SetProjininOnayiniCek([FromRoute] decimal ProjeRef)
        {
            var jsonData = await _request.GetAsync("api/Aykome/SetProjininOnayiniCek/" + ProjeRef);
            DefaultSonuc2? parseModel = JsonSerializer.Deserialize<DefaultSonuc2>(jsonData);
            return parseModel;
        }

    }
}

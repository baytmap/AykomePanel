
using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;

namespace AykomePanel.Controllers
{
    [Authorize]
    public class AbsController : Controller
    {
        private readonly IApiRequest _request;

        public AbsController(IApiRequest apiRequest)
        {
            _request = apiRequest;
        }

        public IActionResult Index()
        {

            return View();
        }

        public async Task<IActionResult> AdaParselPafta()
        {
            //String? pathVal = HttpContext.Request.Path.Value;
            //var jsonData2 = await _request.GetAsync($"api/Panel/YetkimVarmi?Islem=" + pathVal);
            //RolDurumOut? sonuc = JsonSerializer.Deserialize<RolDurumOut>(jsonData2);
            ////if (sonuc != null && sonuc.success == false)
            ////    return RedirectToAction("YetinizYok", "Home");

            return View();
        }

        public IActionResult Mahalle()
        {
            return View();
        }
        public IActionResult TasinmazBb()
        {
            return View();
        }
        public IActionResult CaddeSokak()
        {
            return View();
        }
        public IActionResult BasvuranKisi()
        {
            return View();
        }
    }
}

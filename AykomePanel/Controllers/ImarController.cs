using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AykomePanel.Controllers
{
    [Authorize]
    public class ImarController : Controller
    {
        public IActionResult YapiRuhsatSorgulama()
        {
            return View();
        }
        public IActionResult YapiKullanmaIzni()
        {
            return View();
        }
    }
}

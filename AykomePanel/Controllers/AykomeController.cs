using AykomePanel.ClassHome._Home;
using AykomePanel.ControllersConfig;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AykomePanel.Controllers
{
    [Authorize]
    public class AykomeController : Controller
    {
        public IActionResult ProjeListesi()
        {
            return View();
        }
        public IActionResult ProjeListesi2()
        {
            return View();
        }
        public IActionResult KacakKazilar()
        {
            return View();
        }
        public IActionResult Ayarlar()
        {
            return View();
        }
        // [TypeFilter(typeof(RolAttributeFactory), Arguments = new object[] { UserRolOut.Admin, UserRolOut.Onay })]
        [TypeFilter(typeof(RolAttributeFactory), Arguments = new object[] { new UserRolOut[] { UserRolOut.Admin, UserRolOut.Onay } })]
        public IActionResult PasifProjeler()
        {
            return View();
        }

        public IActionResult KaziRaporu()
        {
            return View();
        }
        public IActionResult AykomeAnaliz()
        {
            return View();
        }
        public IActionResult OrtakKazilar()
        {
            return View();
        }
    }
}

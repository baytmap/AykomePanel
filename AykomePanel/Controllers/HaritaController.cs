using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AykomePanel.Controllers
{
    [Authorize]
    public class HaritaController : Controller
    {
        public IActionResult HaritaPg()
        {
            return View();
        }

        public IActionResult KentRehperi()
        {
            return View();
        }
    }
}

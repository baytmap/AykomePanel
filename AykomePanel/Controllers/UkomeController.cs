using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AykomePanel.Controllers
{
    [Authorize]
    public class UkomeController : Controller
    {
        public IActionResult UkomeKararGiris()
        {
            return View();
        }

        public IActionResult OtoparkListesi()
        {
            return View();
        }
    }
}

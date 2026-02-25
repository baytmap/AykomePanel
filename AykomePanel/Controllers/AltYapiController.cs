using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AykomePanel.Controllers
{
    [Authorize]
    public class AltYapiController : Controller
    {
        public IActionResult FirmaBaglantiSebeke()
        {
            return View();
        }
    }
}

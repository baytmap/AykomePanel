using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AykomePanel.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WmsProxyController : ControllerBase
    {
        private readonly IHttpClientFactory _httpClientFactory;

        public WmsProxyController(IHttpClientFactory httpClientFactory)
        {
            _httpClientFactory = httpClientFactory;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var wmsUrl = "http://kbs.konya.bel.tr:80/geoserver/w_aykome_wms/ows?SERVICE=WMS&VERSION=1.3.0&REQUEST=GetMap&LAYERS=layer_name&STYLES=&CRS=EPSG:4326&BBOX=minx,miny,maxx,maxy&WIDTH=800&HEIGHT=600&FORMAT=image/png";
            var httpClient = _httpClientFactory.CreateClient();

            var response = await httpClient.GetAsync(wmsUrl);
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                return Ok(content);
            }

            return BadRequest();
        }
    }
}

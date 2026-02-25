using AykomePanel.ClassHome._Home;
using Microsoft.Net.Http.Headers;
using System.Net.Http.Headers;
using System.Text;
using MediaTypeHeaderValue = System.Net.Http.Headers.MediaTypeHeaderValue;

namespace AykomePanel.ClassHome._Services
{
    //https://learn.microsoft.com/tr-tr/aspnet/core/fundamentals/http-requests?view=aspnetcore-8.0
    public class ApiRequest : IApiRequest
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly IHttpContextAccessor _contextAccessor;
        private HttpContentHeaders httpContentHeaders { get; set; }

        public ApiRequest(IConfiguration configuration, IHttpClientFactory httpClientFactory, IHttpContextAccessor contextAccessor)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
            urlRoot = _configuration["ApiUrlAdres"];
            _contextAccessor = contextAccessor;

            //if (_contextAccessor.HttpContext.Request.Host.Host == "localhost")
            //    urlRoot = "https://localhost:44398/";
            //else
                urlRoot = _configuration["ApiUrlAdres"];
        }

        public string urlRoot { get; set; }


        // Uzun süren işlemler için özel client kullanma metodu
        private HttpClient CreateLongRunningClient()
        {
            var client = _httpClientFactory.CreateClient("LongRunningClient");
            return client;
        }

        // Normal işlemler için standart client
        private HttpClient CreateStandardClient()
        {
            var client = _httpClientFactory.CreateClient();
            client.Timeout = TimeSpan.FromMinutes(2); // 2 dakika default timeout
            return client;
        }

        // GetProjeList için özel method - uzun timeout ile
        public async Task<string> GetProjeListAsync(string Methot)
        {
            String _Sonuc = String.Empty;
            using (HttpClient _clinet = CreateLongRunningClient())
            {
                try
                {
                    var request = new HttpRequestMessage(HttpMethod.Get, $"{urlRoot}{Methot}");
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        request.Headers.Add("Cookie", new CookieHeaderValue("MyCookieAuth", cookieValue).ToString());

                    HttpResponseMessage response = await _clinet.SendAsync(request);
                    if (response.IsSuccessStatusCode)
                    {
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {
                    // Log exception if needed
                }
            }
            return _Sonuc;
        }

        public async Task<string> GetAsync(string Methot, KeyVal[]? Header)
        {
            String _Sonuc = String.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    // _clinet.DefaultRequestHeaders.Add("Authorization", "Bearer your_token_here");
                    if (Header != null)
                        for (int i = 0; i < Header.Length; i++)
                            _clinet.DefaultRequestHeaders.Add(Header[i].Key, Header[i].Value);


                    var request = new HttpRequestMessage(HttpMethod.Get, $"{urlRoot}{Methot}");
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        request.Headers.Add("Cookie", new CookieHeaderValue("MyCookieAuth", cookieValue).ToString());
                    HttpResponseMessage response = await _clinet.SendAsync(request);

                    //HttpResponseMessage response = await _clinet.GetAsync(String.Concat(urlRoot, Methot));

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();

                    }
                }
                catch (Exception)
                {

                }
            }
            return _Sonuc;
        }

        public async Task<string> GetAsync(string Methot, KeyVal? Header)
        {
            String _Sonuc = String.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    // _clinet.DefaultRequestHeaders.Add("Authorization", "Bearer your_token_here");
                    if (Header != null)
                        _clinet.DefaultRequestHeaders.Add(Header.Key, Header.Value);

                    var request = new HttpRequestMessage(HttpMethod.Get, $"{urlRoot}{Methot}");
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        request.Headers.Add("Cookie", new CookieHeaderValue("MyCookieAuth", cookieValue).ToString());

                    //HttpResponseMessage response = await _clinet.GetAsync(String.Concat(urlRoot, Methot));
                    HttpResponseMessage response = await _clinet.SendAsync(request);
                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();

                    }
                }
                catch (Exception)
                {

                }
            }
            return _Sonuc;
        }

        public async Task<string> GetAsync(string Methot)
        {
            String _Sonuc = String.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    // _clinet.DefaultRequestHeaders.Add("Authorization", "Bearer your_token_here");

                    var request = new HttpRequestMessage(HttpMethod.Get, $"{urlRoot}{Methot}");
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        request.Headers.Add("Cookie", new CookieHeaderValue("MyCookieAuth", cookieValue).ToString());

                    //HttpResponseMessage response = await _clinet.GetAsync(String.Concat(urlRoot, Methot));
                    HttpResponseMessage response = await _clinet.SendAsync(request);
                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();

                    }
                }
                catch (Exception)
                {

                }
            }
            return _Sonuc;
        }



        public async Task<string> PostJsonAsync(string Methot, string jsonData)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    _clinet.BaseAddress = new Uri(urlRoot);

                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);

                    StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await _clinet.PostAsync(String.Concat(urlRoot, Methot), stringContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }

        public async Task<string> PostJsonAsync(string Methot, string jsonData, KeyVal? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);

                    _clinet.BaseAddress = new Uri(urlRoot);

                    if (Header != null)
                        _clinet.DefaultRequestHeaders.Add(Header.Key, Header.Value);

                    StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await _clinet.PostAsync(String.Concat(urlRoot, Methot), stringContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }

        public async Task<string> PostJsonAsync(string Methot, string jsonData, KeyVal[]? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);

                    _clinet.BaseAddress = new Uri(urlRoot);

                    if (Header != null)
                        for (int i = 0; i < Header.Length; i++)
                            _clinet.DefaultRequestHeaders.Add(Header[i].Key, Header[i].Value);

                    StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await _clinet.PostAsync(String.Concat(urlRoot, Methot), stringContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }


        public async Task<string> PostFileAsync(string Methot, IFormFile file, KeyVal[]? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    using (var content = new MultipartFormDataContent())
                    {
                        using (var ms = new MemoryStream())
                        {
                            var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                            if (!string.IsNullOrEmpty(cookieValue))
                                _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);

                            _clinet.BaseAddress = new Uri(urlRoot);

                            if (Header != null)
                                for (int i = 0; i < Header.Length; i++)
                                    _clinet.DefaultRequestHeaders.Add(Header[i].Key, Header[i].Value);

                            //await file.CopyToAsync(ms);
                            //ms.Position = 0; // MemoryStream'in başlangıcına dön

                            //// UTF-8 olarak dosya içeriğini okuma ve null baytları temizleme
                            //var fileBytes = ms.ToArray();
                            //var utf8String = Encoding.UTF8.GetString(fileBytes).Replace("\0", "");
                            //var utf8Bytes = Encoding.UTF8.GetBytes(utf8String);

                            //var byteArrayContent = new ByteArrayContent(utf8Bytes);
                            //byteArrayContent.Headers.ContentType = new System.Net.Http.Headers.MediaTypeHeaderValue(file.ContentType);
                            //content.Add(byteArrayContent, "file", file.FileName);

                            await file.CopyToAsync(ms);
                            var byteArrayContent = new ByteArrayContent(ms.ToArray());
                            byteArrayContent.Headers.ContentType = new MediaTypeHeaderValue(file.ContentType);
                            content.Add(byteArrayContent, "file", file.FileName);

                            HttpResponseMessage response = await _clinet.PostAsync(String.Concat(urlRoot, Methot), content);

                            if (response.IsSuccessStatusCode)
                            {
                                // httpContentHeaders = response.Content.Headers;
                                _Sonuc = await response.Content.ReadAsStringAsync();
                            }
                        }
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }



        public async Task<string> PostFormAsync(string Methot, Dictionary<string, string> jsonData)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);

                    _clinet.BaseAddress = new Uri(urlRoot);

                    var formContent = new FormUrlEncodedContent(jsonData);

                    HttpResponseMessage response = await _clinet.PostAsync(String.Concat(urlRoot, Methot), formContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }

        public async Task<string> PostFormAsync(string Methot, Dictionary<string, string> jsonData, KeyVal? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);

                    _clinet.BaseAddress = new Uri(urlRoot);

                    if (Header != null)
                        _clinet.DefaultRequestHeaders.Add(Header.Key, Header.Value);

                    var formContent = new FormUrlEncodedContent(jsonData);

                    HttpResponseMessage response = await _clinet.PostAsync(String.Concat(urlRoot, Methot), formContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }

        public async Task<string> PostFormAsync(string Methot, Dictionary<string, string> jsonData, KeyVal[]? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);

                    _clinet.BaseAddress = new Uri(urlRoot);

                    if (Header != null)
                        for (int i = 0; i < Header.Length; i++)
                            _clinet.DefaultRequestHeaders.Add(Header[i].Key, Header[i].Value);

                    var formContent = new FormUrlEncodedContent(jsonData);

                    HttpResponseMessage response = await _clinet.PostAsync(String.Concat(urlRoot, Methot), formContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }


        public async Task<string> PutJsonAsync(string Methot, string jsonData)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);
                    _clinet.BaseAddress = new Uri(urlRoot);

                    StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await _clinet.PutAsync(String.Concat(urlRoot, Methot), stringContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }

        public async Task<string> PutJsonAsync(string Methot, string jsonData, KeyVal? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);
                    _clinet.BaseAddress = new Uri(urlRoot);

                    if (Header != null)
                        _clinet.DefaultRequestHeaders.Add(Header.Key, Header.Value);

                    StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await _clinet.PutAsync(String.Concat(urlRoot, Methot), stringContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }

        public async Task<string> PutJsonAsync(string Methot, string jsonData, KeyVal[]? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);
                    _clinet.BaseAddress = new Uri(urlRoot);

                    if (Header != null)
                        for (int i = 0; i < Header.Length; i++)
                            _clinet.DefaultRequestHeaders.Add(Header[i].Key, Header[i].Value);

                    StringContent stringContent = new StringContent(jsonData, Encoding.UTF8, "application/json");
                    HttpResponseMessage response = await _clinet.PutAsync(String.Concat(urlRoot, Methot), stringContent);

                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }


        public async Task<string> DeleteJsonAsync(string Methot)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);
                    _clinet.BaseAddress = new Uri(urlRoot);
                    HttpResponseMessage response = await _clinet.DeleteAsync(String.Concat(urlRoot, Methot));
                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }

        public async Task<string> DeleteJsonAsync(string Methot, KeyVal? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);
                    _clinet.BaseAddress = new Uri(urlRoot);
                    if (Header != null)
                        _clinet.DefaultRequestHeaders.Add(Header.Key, Header.Value);

                    HttpResponseMessage response = await _clinet.DeleteAsync(String.Concat(urlRoot, Methot));
                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }

        public async Task<string> DeleteJsonAsync(string Methot, KeyVal[]? Header)
        {
            string _Sonuc = string.Empty;
            using (HttpClient _clinet = CreateStandardClient())
            {
                try
                {
                    var cookieValue = _contextAccessor.HttpContext.Request.Cookies["MyCookieAuth"];
                    if (!string.IsNullOrEmpty(cookieValue))
                        _clinet.DefaultRequestHeaders.Add("Cookie", "MyCookieAuth=" + cookieValue);
                    _clinet.BaseAddress = new Uri(urlRoot);
                    if (Header != null)
                        for (int i = 0; i < Header.Length; i++)
                            _clinet.DefaultRequestHeaders.Add(Header[i].Key, Header[i].Value);

                    HttpResponseMessage response = await _clinet.DeleteAsync(String.Concat(urlRoot, Methot));
                    if (response.IsSuccessStatusCode)
                    {
                        // httpContentHeaders = response.Content.Headers;
                        _Sonuc = await response.Content.ReadAsStringAsync();
                    }
                }
                catch (Exception)
                {

                }

            }
            return _Sonuc;
        }


        public async Task OnGet()
        {
            var httpRequestMessage = new HttpRequestMessage(
                HttpMethod.Get,
                "https://api.github.com/repos/dotnet/AspNetCore.Docs/branches")
            {
                Headers =
            {
                { HeaderNames.Accept, "application/vnd.github.v3+json" },
                { HeaderNames.UserAgent, "HttpRequestsSample" }
            }
            };

            var httpClient = _httpClientFactory.CreateClient();
            var httpResponseMessage = await httpClient.SendAsync(httpRequestMessage);

            if (httpResponseMessage.IsSuccessStatusCode)
            {
                using var contentStream =
                    await httpResponseMessage.Content.ReadAsStreamAsync();

                //GitHubBranches = await JsonSerializer.DeserializeAsync<IEnumerable<GitHubBranch>>(contentStream);
            }
        }
    }
}

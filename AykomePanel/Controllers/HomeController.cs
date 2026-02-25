using AykomePanel.ClassHome._Response;
using AykomePanel.ClassHome._Services;
using AykomePanel.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Primitives;

//using Microsoft.IdentityModel.Tokens;
using System.Diagnostics;
using System.Net;
using System.Net.Mail;
using System.Net.Security;


//using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using System.Web;

namespace AykomePanel.Controllers
{
    //  RedirectToAction(nameof(Panel));
    [Authorize]
    public class HomeController : Controller
    {
        private readonly IApiRequest _request;
        private readonly IConfiguration _configuration;
        public HomeController(/*ILogger<HomeController> logger,*/ IApiRequest apiRequest, IConfiguration configuration)
        {
            _request = apiRequest;
            _configuration = configuration;
        }

        [AllowAnonymous]
        public async Task<IActionResult> Login(String? UserName, String? Password)
        {
            if (HttpContext.User.Identity.IsAuthenticated)
            {
                return RedirectToAction(nameof(Panel));
            }
            UserInfoOut? sonuc1 = null;
            //sonuc1.success = false;

            DefaultSonuc? sonuc2 = new DefaultSonuc();
            if (UserName != null && Password != null)
            {
                var jsonData = await _request.GetAsync($"api/Panel?UserName={UserName}&Password={HttpUtility.UrlEncode(Password)}");
                sonuc1 = JsonSerializer.Deserialize<UserInfoOut>(jsonData);
                if (sonuc1 != null && sonuc1.success == true)
                {
                    var claims = new List<Claim>
                            {
                                new Claim("UserID", sonuc1.UserID.ToString()),
                                new Claim("UserName", sonuc1.UserName),
                                new Claim("UserPhoto", sonuc1.UserPhoto),
                                new Claim("Kurum", sonuc1.Kurum),
                                new Claim("Birim", sonuc1.Birim),
                                new Claim("BirimUstGrupId", sonuc1.BirimUstGrupId.ToString()),
                                new Claim("BirimUstGrupAd", sonuc1.BirimUstGrupAd),
                                new Claim("KullaniciAd", sonuc1.KullaniciAd)
                            };

                    var identity = new ClaimsIdentity(claims, "MyCookieAuth");
                    ClaimsPrincipal claimsPrincipal = new ClaimsPrincipal(identity);
                    // AuthenticationProperties ayarlarýný güncelleme
                    var authProperties = new AuthenticationProperties
                    {
                        IsPersistent = true, // Tarayýcý kapandýðýnda cookie kalýr
                        ExpiresUtc = DateTime.UtcNow.AddHours(2), // 2 saat
                        AllowRefresh = true, // Yenileme izni ver
                        IssuedUtc = DateTime.UtcNow, // Veriliþ zamaný
                        RedirectUri = "/Home/Panel" // Yönlendirme adresi
                    };
                    // Cookie'yi kaydet
                    await HttpContext.SignInAsync("MyCookieAuth", claimsPrincipal, authProperties);

                    String uretilenKey = String.Empty;
                    var setCookieHeaderValue = HttpContext.Response.Headers["Set-Cookie"];
                    if (!string.IsNullOrEmpty(setCookieHeaderValue))
                    {
                        var cookies = setCookieHeaderValue.ToString().Split("; ");
                        foreach (var cookie in cookies)
                        {
                            var parts = cookie.Split("=");
                            if (parts.Length == 2 && parts[0] == "MyCookieAuth")
                            {
                                uretilenKey = parts[1];
                                break;
                            }
                        }
                    }
                    var jsonData2 = await _request.GetAsync($"api/Panel/oturumDogrula?UserCookie={uretilenKey}&userID={sonuc1.UserID}");
                    sonuc2 = JsonSerializer.Deserialize<DefaultSonuc>(jsonData2);
                    if (sonuc2.success == true)
                        sonuc1.success = true;
                    return RedirectToAction(nameof(Panel));
                    // }
                }
                else
                {
                    sonuc2.message = sonuc1.message;
                    sonuc2.success = sonuc1.success;
                    ViewData.Add("IslemSonucu", sonuc1);

                }
            }
            return View(sonuc2);
        }

        [AllowAnonymous]
        //  [Route("GuvenliCikis")]
        public async Task<IActionResult> GuvenliCikis()
        {
            var jsonData = await _request.GetAsync($"api/Panel/GuvenliCikis");

            await HttpContext.SignOutAsync("MyCookieAuth");
            return RedirectToAction(nameof(Login));
        }

        [AllowAnonymous]
        public IActionResult Index(String? UserName, String? Password)
        {
            return View();

        }



        [Authorize]
        public IActionResult Panel()
        {
            //// Kullanýcýnýn tüm taleplerini al
            //var userClaims = HttpContext.User.Claims;

            //// Belirli bir talebi al (örneðin, "UserID")
            //var userIDClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserID");
            //var UserNameClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserName");
            //var UserPhotoClaim = HttpContext.User.Claims.FirstOrDefault(c => c.Type == "UserPhoto");

            //if (userIDClaim != null && UserNameClaim != null && UserPhotoClaim != null)
            //{
            //    UserOut user = new UserOut()
            //    {
            //        ID = Convert.ToInt32(userIDClaim.Value),
            //        Name = UserNameClaim.Value,
            //        Photo = UserPhotoClaim.Value
            //    };
            //    return View(user);
            //}
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        [Authorize]
        public IActionResult YetinizYok()
        {
            return View();
        }


        [AllowAnonymous]
        public async Task<IActionResult> Eposta()
        {

            DefaultSonuc? sonuc1 = new DefaultSonuc();
            string smtpHost = "mail.konya.bel.tr";
            int port = 25;
            string fromAddress = "aykome-ruhsat@konya.bel.tr";
            string toAddress = "salman.arslan46@gmail.com";
            string subject = "E-posta Testi";
            string body = "Bu bir test e-postasýdýr. 25 Port dan";

            try
            {


                using (MailMessage mail = new MailMessage())
                {
                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(new MailAddress(toAddress));
                    mail.Subject = subject;
                    mail.Body = body;

                    using (SmtpClient client = new SmtpClient(smtpHost, port))
                    {
                        client.EnableSsl = false; // SSL kullanýmý gerekmiyorsa
                                                  // Eðer kimlik doðrulama gerekiyorsa:
                                                  // client.Credentials = new NetworkCredential("username", "password");

                        client.Send(mail);
                    }
                }


                //string smtpHost = "mail.konya.bel.tr";
                //int port = 25; // Genellikle güvenli olmayan SMTP baðlantýlarý için 25 numaralý port kullanýlýr
                //string fromAddress = "aykome-ruhsat@konya.bel.tr";
                //string? fromPassword = null; // Þifrenizi buraya girin
                //string toAddress = "ecindir@geolabgis.com";
                //string subject = "E-posta Testi";
                //string body = "Bu bir e-posta testidir.";
                //MailMessage mail = new MailMessage();
                //mail.From = new MailAddress(fromAddress);
                //mail.To.Add(new MailAddress(toAddress));

                //mail.Subject = subject;
                //mail.Body = body;
                //using (SmtpClient client = new SmtpClient(smtpHost, port))
                //{
                //    client.Credentials = new System.Net.NetworkCredential(fromAddress, fromPassword);
                //    client.EnableSsl = false; 
                //    client.Send(mail);
                //}

                sonuc1.success = true;
                sonuc1.message = new islemMesaj
                {
                    Durum = true,
                    MesajMetni = "E-posta baþarýyla gönderildi."
                };
            }
            catch (Exception ex)
            {
                body = "Bu bir test e-postasýdýr. 587 Port dan";
                port = 587;
                using (MailMessage mail = new MailMessage())
                {
                    try
                    {
                        mail.From = new MailAddress(fromAddress);
                        mail.To.Add(new MailAddress(toAddress));
                        mail.Subject = subject;
                        mail.Body = body;

                        using (SmtpClient client = new SmtpClient(smtpHost, port))
                        {
                            client.EnableSsl = false; // SSL kullanýmý gerekmiyorsa
                                                      // Eðer kimlik doðrulama gerekiyorsa:
                                                      // client.Credentials = new NetworkCredential("username", "password");

                            client.Send(mail);
                        }
                    }
                    catch (Exception ex1)
                    {
                        sonuc1.success = false;
                        sonuc1.message = new islemMesaj
                        {
                            Durum = true,
                            MesajMetni = $@"
25 Port ile Yollarken: {ex.Message.ToString()}
587 Port ile Yollarken: {ex1.Message.ToString()} "
                        };
                    }
                }
            }

            if (sonuc1.success != false)
            {
                sonuc1.success = true;
                sonuc1.message = new islemMesaj
                {
                    Durum = true,
                    MesajMetni = "E-posta baþarýyla gönderildi."
                };
            }

            //try
            //{
            //    using (MimeMessage emailMessage = new MimeMessage())
            //    {
            //        MailboxAddress emailFrom = new MailboxAddress(_mailSettings.SenderName, _mailSettings.SenderEmail);
            //        emailMessage.From.Add(emailFrom);

            //        MailboxAddress emailTo = new MailboxAddress(mailData.EmailToName, mailData.EmailToId);
            //        emailMessage.To.Add(emailTo);
            //        emailMessage.Subject = mailData.EmailSubject;

            //        BodyBuilder emailBodyBuilder = new BodyBuilder();
            //        emailBodyBuilder.TextBody = mailData.EmailBody;

            //        emailMessage.Body = emailBodyBuilder.ToMessageBody();
            //        using (SmtpClient mailClient = new SmtpClient())
            //        {
            //            mailClient.Connect(_mailSettings.Server, _mailSettings.Port, MailKit.Security.SecureSocketOptions.StartTls);
            //            mailClient.Authenticate(_mailSettings.UserName, _mailSettings.Password);
            //            mailClient.Send(emailMessage);
            //            mailClient.Disconnect(true);
            //        }
            //    }

            //    return true;
            //}
            //catch (Exception)
            //{
            //    return false;
            //}










            return View(sonuc1);
        }
    }
}

using AykomePanel.ClassHome._Services;
using AykomePanel.ControllersConfig;
using Microsoft.AspNetCore.Http.Features;

var builder = WebApplication.CreateBuilder(args);
//// IIS Server Options
builder.Services.Configure<IISServerOptions>(options =>
{
    options.MaxRequestBodySize = 104857600; // 100 MB
});
builder.Services.Configure<FormOptions>(options =>
{
    options.MultipartBodyLengthLimit = 104857600; // 100 MB
});


// Add services to the container.
builder.Services.AddControllersWithViews().AddJsonOptions(o =>
{
    o.JsonSerializerOptions.PropertyNamingPolicy = null;
});

builder.Services.AddHttpClient();
builder.Services.AddHttpClient("LongRunningClient", client =>
{
    client.Timeout = TimeSpan.FromMinutes(10); // 10 dakika timeout
});


builder.Services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
builder.Services.AddTransient<IApiRequest, ApiRequest>();
//builder.Services.AddScoped<RolAttribute>();


builder.Services.AddScoped<IRolAttribute, RolAttribute>();



// Cookie Authentication yapýlandýrmasýný düzeltme
builder.Services.AddAuthentication("MyCookieAuth")
    .AddCookie("MyCookieAuth", options =>
    {
        options.Cookie.Name = "MyCookieAuth";
        options.LoginPath = "/Home/Login";
        options.AccessDeniedPath = "/Home/YetinizYok";
        options.LogoutPath = "/Home/GuvenliCikis";

        // Cookie ayarlarý
        options.Cookie.HttpOnly = true;
        options.Cookie.SecurePolicy = CookieSecurePolicy.SameAsRequest; // HTTPS'de secure olacak
        options.Cookie.SameSite = SameSiteMode.Lax; // CSRF korumasý için
        options.Cookie.IsEssential = true; // GDPR uyumluluðu için

        // Süre ayarlarý
        options.ExpireTimeSpan = TimeSpan.FromHours(2); // 2 saat
        options.SlidingExpiration = true; // Kullanýcý aktifken süre yenilenir

        // Oturum ayarlarý
        options.Events.OnValidatePrincipal = context =>
        {
            // Burada özel doðrulama yapabilirsiniz
            return Task.CompletedTask;
        };
    });
//IConfiguration? Configuration = builder.Configuration;

//builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
//    .AddJwtBearer(options =>
//    {
//        options.TokenValidationParameters = new TokenValidationParameters
//        {
//            ValidateIssuer = true,
//            ValidateAudience = true,
//            ValidateLifetime = true,
//            ValidateIssuerSigningKey = true,
//            ValidIssuer = Configuration["JWT:ValidIssuer"],
//            ValidAudience = Configuration["JWT:ValidAudience"],
//            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:Secret"]))
//        };
//    });



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    //pattern: "{controller=Home}/{action=Panel}/{id?}");
    pattern: "{controller=Test}/{action=Tema}/{id?}");

app.Run();

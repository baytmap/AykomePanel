# Aykome Panel — aykome.konya.bel.tr Frontend v2

Konya Büyükşehir Belediyesi **Aykome (Alt Yapı Koordinasyon Merkezi)** panel uygulaması. UKOME, Aykome projeleri, ABS (Ada/Parsel/Mahalle/Cadde-Sokak), harita, imar ve altyapı modüllerini tek arayüzden yönetmek için kullanılır.

## Teknolojiler

- **Backend:** ASP.NET Core 8.0 (MVC)
- **Frontend:** Bootstrap, jQuery, Boxicons
- **Harita:** Leaflet.js (çizim, düzenleme, KML)
- **Veritabanı:** PostgreSQL (Entity Framework Core + NetTopologySuite)
- **Kimlik doğrulama:** Cookie tabanlı (MyCookieAuth)
- **Diğer:** Newtonsoft.Json, e-imza entegrasyonu (ArkSigner)

## Gereksinimler

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
- PostgreSQL (uygulama API/veritabanı bağlantısı için)
- Visual Studio 2022 veya VS Code (isteğe bağlı)

## Proje yapısı

```
├── AykomePanel.sln
├── AykomePanel/
│   ├── AykomePanel.csproj
│   ├── Program.cs
│   ├── Controllers/          # MVC ve API controller'ları
│   ├── Views/                # Razor (.cshtml) sayfaları
│   ├── ClassHome/            # Request/Response, Services
│   ├── ControllersConfig/    # RolAttribute vb. yapılandırma
│   └── wwwroot/              # Statik dosyalar (css, js, img, lib)
│       ├── css/
│       ├── js/               # _aykome, _abs, _harita, _imar, apisigner vb.
│       ├── img/
│       └── lib/              # Bootstrap, jQuery
└── README.md
```

## Kurulum ve çalıştırma

1. Depoyu klonlayın:
   ```bash
   git clone <repo-url>
   cd aykome.konya.bel.tr_frontend_v2
   ```

2. Uygulama ayarlarını yapılandırın:
   - `AykomePanel/appsettings.json` (ve gerekirse `appsettings.Development.json`) içinde API adresleri, veritabanı bağlantısı vb. değerleri düzenleyin.

3. Projeyi derleyin ve çalıştırın:
   ```bash
   cd AykomePanel
   dotnet restore
   dotnet build
   dotnet run
   ```

4. Tarayıcıda giriş sayfasına gidin:
   - Örneğin: `https://localhost:7xxx` veya `http://localhost:5xxx` (console çıktısındaki adresi kullanın)
   - Giriş: **Home/Login**

## Modüller (özet)

| Modül   | Açıklama |
|--------|----------|
| **Dashboard** | Ana panel / UKOME |
| **Aykome**    | Çalışma yılı, pasif/proje listesi, KOSKİ arızaları, kaçak kazılar, ayarlar, kazı/ortak kazı/aykome analiz raporları |
| **Abs**       | Ada/Parsel/Pafta, Mahalle, Taşınmaz/BB, Cadde/Sokak, Başvuran Kişi |
| **Harita**    | Kent rehberi, WMS katmanları, çizim/düzenleme |
| **İmar**      | Yapı kullanma izni, yapı ruhsatı vb. |
| **Altyapı**   | Firma bağlantı şebeke vb. |
| **Genel**     | Kaplama listesi, hakkında, kullanıcı/kurum yönetimi |

## Geliştirme

- **Çalıştırma (geliştirme):** `AykomePanel` klasöründe `dotnet watch run` ile değişiklikte otomatik yeniden derleme.
- **Yayınlama:** `dotnet publish -c Release -o ./publish` (IIS veya Kestrel için).

## Lisans ve sorumluluk

Bu proje Konya Büyükşehir Belediyesi kapsamında geliştirilmiştir. Kullanım ve dağıtım kuralları kurum politikasına tabidir.

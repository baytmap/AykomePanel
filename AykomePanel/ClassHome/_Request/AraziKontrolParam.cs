namespace AykomePanel.ClassHome._Request
{
    public class AraziKontrolParam
    {
        public string? KontrolRef { get; set; }
        public string? ETKONTROL { get; set; }
        public string? KPKONTROL { get; set; }
        public string? YERKONTROL { get; set; }
        public string? TARIHKONTROL { get; set; }
        public string? TAMIRKONTROL { get; set; }
        public string? ACIKLAMA { get; set; }
        public string? Uzunluk { get; set; }
        public string? En { get; set; }
        public string? Derinlik { get; set; }
        public string? UygunlukDurumu { get; set; }
        public UploadedFile[]? File { get; set; }
    }
    public class UploadedFile
    {
        public string? Name { get; set; }
        public string? Type { get; set; }
        public string? Data { get; set; }
    }
}

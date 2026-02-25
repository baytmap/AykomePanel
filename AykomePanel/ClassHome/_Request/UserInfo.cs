namespace AykomePanel.ClassHome._Request
{
    public class UserInfoParam
    {
        public int? id { get; set; }
        public required string kullaniciadi { get; set; }
        public required string sifre { get; set; }
        public required string adsoyad { get; set; }
        public string? resim { get; set; }
        public string? gsmno { get; set; }
        public required int birimid { get; set; }
        public required bool aktif { get; set; }

    }
}

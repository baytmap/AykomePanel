namespace AykomePanel.ClassHome._Request
{

    public enum KatmanTipi
    {
        WfSKatman = 0,
        WmsKatman = 1,
        DbKatman = 2
    }

    public class DbKatmanParam
    {
        public required int DbKatmanID { get; set; }
        public required String Adi { get; set; }
        public required KatmanTipi KatmanTipi { get; set; }
        public int? Sira { get; set; }
        public WfsKatmanInfoParam? WfsKatmanInfoParam { get; set; }

    }
    public class WfsKatmanInfoParam
    {
        public int? WfsKatmanID { get; set; }
        public required String UrlAdres { get; set; }
        public string? UserName { get; set; }
        public string? UserPassword { get; set; }
        public required WfsKatmanDetayParam[] WfsKatmanDetayParams { get; set; }
    }
    public class WfsKatmanDetayParam
    {
        public int WfsKatmanDetayID { get; set; }
        public required String Name { get; set; }
        public required String Title { get; set; }
        public required int Sira { get; set; }
        public required String SRS { get; set; }
        public required double MaxX { get; set; }
        public required double MaxY { get; set; }
        public required double MinX { get; set; }
        public required double MinY { get; set; }
        public decimal? ZoomDurumu { get; set; }
        public String? RenkKodu { get; set; }
        public decimal? BirimId { get; set; }
        public string? Birim { get; set; }
        public int? KurumID { get; set; }
    }
    public class WfsKatmanConnectParam
    {
        public required String UrlAdres { get; set; }
        public string? UserName { get; set; }
        public string? UserPassword { get; set; }
    }
}

namespace AykomePanel.ClassHome._Request
{
    public class TasinmazParam
    {
        public Boolean? Tanim { get; set; }
        public int? IlceID { get; set; }
        public int? MahalleID { get; set; }
        public int? CaddeSokakID { get; set; }
        public String? KapiNo { get; set; }
        public String? MahalleKodu { get; set; }
        public int? TurID { get; set; }
        public String? Barkodu { get; set; }
        public String? TasinmazKodu { get; set; }
        public String? TasinmazAdi { get; set; }
        public int? IlceID2 { get; set; }
        public int? EskiMahalleID { get; set; }
        public String? Ada { get; set; }
        public String? Parsel { get; set; }
        public String? Pafta { get; set; }
        public BagimsizBolumParam? BagimsizBolumParams { get; set; }
        public EskitasinmazParam? EskitasinmazParams { get; set; }
    }
    public class BagimsizBolumParam
    {
        public String? Barkodu { get; set; }
        public String? BbNo { get; set; }
        public String? IsYeriIsmi { get; set; }
        public int? KullanimTipID { get; set; }
        public String? SuAboneNo { get; set; }
        public String? ElektirikNo { get; set; }
    }
    public class EskitasinmazParam
    {
        public int? IlceID { get; set; }
        public int? MahalleID { get; set; }
        public int? CaddeSokakID { get; set; }
        public int? KapiNo { get; set; }
    }
}

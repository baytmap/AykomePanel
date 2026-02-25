namespace AykomePanel.ClassHome._Response
{
    public class ProjeListesiAraParam
    {
        public decimal? ProjeNo { get; set; }
        public DateTime? TalepTarihiBaslangic { get; set; }
        public DateTime? TalepTarihiBitis { get; set; }
        public int? IlceID { get; set; }
        public int? BelediyeID { get; set; }
        public DateTime? OnayTarihiBaslangic { get; set; }
        public DateTime? OnayTarihiBitis { get; set; }
        public int? MahalleID { get; set; }
        public string? CaddeSokakID { get; set; }
        public DateTime? PlanlananTarihiBaslangic { get; set; }
        public DateTime? PlanlananTarihiBitis { get; set; }
        public decimal[]? ProjeListesiAraDurumParams { get; set; }
        public string? TalepSahibi { get; set; }
        public int? TalepSahibiKurumID { get; set; }
        public int? TalepSahibiBirimID { get; set; }
        public int PageNumber { get; set; }
    }

}

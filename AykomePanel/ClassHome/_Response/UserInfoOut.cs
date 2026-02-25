namespace AykomePanel.ClassHome._Response
{
    public class UserInfoOut : DefaultOut
    {
        public string? Kurum { get; set; }
        public string? Birim { get; set; }
        public required int BirimUstGrupId { get; set; }
        public required string BirimUstGrupAd { get; set; }
        public required string KullaniciAd { get; set; }
        public required int UserID { get; set; }
        public required string UserName { get; set; }
        public string? UserPhoto { get; set; }
    }
}

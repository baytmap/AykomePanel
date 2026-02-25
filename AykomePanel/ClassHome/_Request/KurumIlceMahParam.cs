namespace AykomePanel.ClassHome._Request
{
    //public class KurumIlcepr
    //{
    //    public required KurumIlceMahParam[] KurumIlceMahParams { get; set; }
    //}
    public class KurumIlceMahParam
    {
        public required int IlceID { get; set; }
        public required string IlceAD { get; set; }
        public MahalleLstParam[]? MahalleLstParams { get; set; }
    }
    public class MahalleLstParam
    {
        public required int MahalleID { get; set; }
        public required string MahalleAD { get; set; }
    }
}

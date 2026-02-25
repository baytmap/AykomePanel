namespace AykomePanel.ClassHome._Request
{
    public class AykomeAnalizParam
    {
        public int? IlceID { get; set; }
        public int? MahalleID { get; set; }
        public int? CaddeSokakID { get; set; }
        public decimal[]? BirimIDList { get; set; }
        public decimal[]? ProjeDurumIDLst { get; set; }
        public int[]? ProjeTipIDLst { get; set; }
        public decimal[]? KaplamaCinsiIDLst { get; set; }
        public DateTime? TalepTarih1 { get; set; }
        public DateTime? TalepTarih2 { get; set; }
        public DateTime? OnayTarih1 { get; set; }
        public DateTime? OnayTarih2 { get; set; }
    }
}

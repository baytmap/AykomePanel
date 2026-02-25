namespace AykomePanel.ClassHome._Request
{
    public class KaziRaporu2Param
    {
        public required Boolean Tanim { get; set; }
        public int? DurumID { get; set; }
        public int[]? BirimIDList { get; set; }
        public int[]? ProjeTipIDLst { get; set; }
        public DateTime? BasvuruTarih1 { get; set; }
        public DateTime? BasvuruTarih2 { get; set; }
        public DateTime? OnaylananTarih1 { get; set; }
        public DateTime? OnaylananTarih2 { get; set; }
        public int StartPage { get; set; }
    }
}

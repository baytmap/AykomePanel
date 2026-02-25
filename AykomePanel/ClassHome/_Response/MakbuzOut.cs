namespace AykomePanel.ClassHome._Response
{
    public class MakbuzOut : DefaultOut
    {
        public DateTime? Makbuztarih { get; set; }
        public string? Makbuzno { get; set; }
        public decimal? Makbuztutar { get; set; }
        public MakbuzItem[]? MakbuzItems { get; set; }
        public DateTime? TalepTArihi { get; set; }
        public long? ProjeNo { get; set; }
        public string? Mesaj1 { get; set; }
        public string? Mesaj2 { get; set; }
        public int[]? YilList { get; set; }
    }
    public class MakbuzItem
    {
        public string? CaddeSokak { get; set; }
        public DateTime? PlanlananBaslagic { get; set; }
        public DateTime? PlanlananBitis { get; set; }
        public DateTime? OnaylananBaslagic { get; set; }
        public DateTime? OnaylananBitis { get; set; }
    }
}

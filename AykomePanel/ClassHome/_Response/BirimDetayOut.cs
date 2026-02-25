namespace AykomePanel.ClassHome._Response
{
    public class BirimDetayOut : DefaultOut
    {
        public KeyValSelected[]? ProjeTipIliskisis { get; set; }
        public KeyValSelected[]? BirimYoladiyets { get; set; }
        public KeyValSelected[]? BirimRols { get; set; }
        public IlceMahalleOut[]? IlceListOuts { get; set; }
        public IlceMahalleOut[]? MahalleListOuts { get; set; }
    }

    public class KeyValSelected
    {
        public required object Key { get; set; }
        public required String Val { get; set; }
        public required Boolean Selected { get; set; }
    }
   
    public class IlceMahalleOut
    {
        public int? RefID { get; set; }
        public string? RefAD { get; set; }
        public required int ID { get; set; }
        public required string AD { get; set; }
        public required Boolean Checked { get; set; }
    }
}

namespace AykomePanel.ClassHome._Response
{
    public class KurumFirstDataOut : DefaultOut
    {
        public required Ayk_KurumOut[] Ayk_Kurums { get; set; }
        public KryVal[]? IlceLst { get; set; }
        public RolTbl[]? RolTbls { get; set; }
        public AykYolAidiyet[]? AykYolAidiyets { get; set; }
        public AykProjeTip2[]? AykProjeTip2s { get; set; }
        public AYK_UstGrupBirim[]? AYK_UstGrupBirim { get; set; }
    }
    public class Ayk_KurumOut
    {
        public required int id { get; set; }
        public required string Ad { get; set; }
        public BirimOut[]? BirimList { get; set; }
    }
    public class BirimOut
    {
        public required int id { get; set; }
        public required string Ad { get; set; }
        public int? UstGrupBirimId { get; set; }
        public string? UstGrupBirimAD { get; set; }
    }
}

using AykomePanel.ClassHome._Home;
using AykomePanel.ClassHome._Request;
using System.ComponentModel.DataAnnotations;

namespace AykomePanel.ClassHome._Response
{
    public class KurumBirimSonucOut
    {
        public List<KurumBirimOut>? KurumBirimOuts { get; set; }
        public List<KryVal>? KryVals { get; set; }
    }
    public class KurumBirimOut
    {
        [Display(Name = "Kurum ID")]
        public required int KurumId { get; set; }
        [Display(Name = "Kurum")]
        public required string Kurum { get; set; }
        public string[]? Resim { get; set; }
        public BirimLst2[]? BirimLsts { get; set; }
    }
    public class KryVal
    {
        public required object Key { get; set; }
        public required String Val { get; set; }
    }
    public class BirimLst2
    {
        [Display(Name = "Birim ID")]
        public decimal? BirimID { get; set; }
        [Display(Name = "Birim")]
        public string? Birim { get; set; }
        public int[]? ProjeTipIdList { get; set; }
        public decimal[]? AykOlurIlceList { get; set; }
    }
}

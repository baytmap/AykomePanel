using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AykomePanel.ClassHome._Response
{
    public class AykGiydirmeDataOut
    {
        public int? MaxYil { get; set; }
        public int? MinYil { get; set; }
        public AykGiydirmeOut[]? AykGiydirmeOuts { get; set; }

    }
    public class AykGiydirmeOut
    {
        [Display(Name = "ID")]
        public int id { get; set; }

        [Display(Name = "Kaplama Ref")]
        public int GiydirmeRef { get; set; }

        [Display(Name = "Tanım")]
        public required string Tanim { get; set; }

        [Display(Name = "Sıra")]
        public int? Sira { get; set; }

        [Display(Name = "Birim Fiyat")]
        public decimal? BrmFyt { get; set; }

        [Display(Name = "Birim")]
        public string? Birim { get; set; }

        [Display(Name = "Yoğunluk")]
        public decimal? Yogunluk { get; set; }

        [Display(Name = "Durum")]
        public required bool Aktif { get; set; }

        [Display(Name = "Yıl")]
        public required int Yil { get; set; }
    }
}

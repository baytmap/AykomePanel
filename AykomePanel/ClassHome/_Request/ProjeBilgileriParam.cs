using System.ComponentModel.DataAnnotations;

namespace AykomePanel.ClassHome._Request
{
    //public class ProjeBilgileriParam
    //{
    //    public string? PrjNo { get; set; }
    //    public DateTime? PrjTalepTarihi { get; set; }
    //    public int PrjTipi { get; set; }
    //    public string? PrjAmaci { get; set; }
    //    public DateTime? PrjBasTarihi { get; set; }
    //    public DateTime? PrjBitTarihi { get; set; }
    //    public DateTime? PrjVatBasTar { get; set; }
    //    public string? PrjDilekcNo { get; set; }
    //    //public string? PrjTalSahKurm { get; set; }
    //    //public decimal? PrjTalSahBirim { get; set; }
    //    public string? PrjIlgKisi { get; set; }
    //    public string? PrjBasYapn { get; set; }
    //    public string? PrjTcNo { get; set; }
    //    public string? PrjKapiNo { get; set; }


    //    public bool BykShrAit { get; set; }
    //    public decimal? TrafikPlnlm { get; set; }
    //    public int Ilce { get; set; }
    //    public string? ilceadi { get; set; }
    //    public string? Belediye { get; set; }
    //    public int Mahalle { get; set; }
    //    public string? MahalleAdi { get; set; }
    //    public string? CaddeSokak { get; set; }
    //    public int? YolMalzeme { get; set; }
    //    public DateTime? YapimTarihi { get; set; }
    //    public string? IsNumarasi { get; set; }
    //    public decimal En { get; set; }
    //    public decimal Boy { get; set; }
    //    public decimal Derinlik { get; set; }
    //    public int? CimYol { get; set; }
    //    public string[]? Resim { get; set; }
    //    public required Koordinat[]? Koordinatlar { get; set; }
    //    public BirimLst[]? BirimList { get; set; }
    //    public GydirmeInfo[]? GydirmeLst { get; set; }
    //}
    //public class Koordinat
    //{
    //    public double Lat { get; set; }
    //    public double Lng { get; set; }
    //}
    //public class BirimLst
    //{
    //    public string? BirimID { get; set; }
    //    public string? Birim { get; set; }
    //}
    //public class GydirmeInfo
    //{
    //    public required int GydirmeRefID { get; set; }
    //    public required int Tanim { get; set; }
    //}



    public class ProjeBilgileriParam
    {
        public string? PrjNo { get; set; }
        public required DateTime PrjTalepTarihi { get; set; }
        public required int PrjTipi { get; set; }
        public string? PrjAmaci { get; set; }
        public required DateTime PrjBasTarihi { get; set; }
        public required DateTime PrjBitTarihi { get; set; }
        public DateTime? PrjVatBasTar { get; set; }
        public string? PrjDilekcNo { get; set; }
        public required string PrjIlgKisi { get; set; }
        public required string PrjBasYapn { get; set; }
        public string? PrjTcNo { get; set; }
        public string? PrjKapiNo { get; set; }
        public string[]? DosyaList { get; set; }
        public string[]? DosyaListAd { get; set; }
        public required Isdetlst2[] IsDetLsts { get; set; }
        public required decimal ProjeRef { get; set; }
        public BirimLst[]? dagitimBirims { get; set; }
    }

    public class Isdetlst2
    {
        public required Isdetlst[] isDetLst { get; set; }
        public required Koordinatlst[] koordinatLst { get; set; }
       
    }
    public class BirimLst
    {
        [Display(Name = "Birim ID")]
        public int? BirimID { get; set; }
        [Display(Name = "Birim")]
        public string? Birim { get; set; }
    }
    public class Isdetlst
    {
        public required Detay Detay { get; set; }
        public required Gydirme[] Gydirme { get; set; }
    }

    public class Detay
    {
        public int? YolAdiyet { get; set; }
        public string? YolAdiyetText { get; set; }
        public object? TrafikKroki { get; set; }
        public required string IlceAd { get; set; }
        public required int IlceID { get; set; }
        public required string BelediyeAd { get; set; }
        public required int BelediyeID { get; set; }
        public required string MahalleAd { get; set; }
        public required int MahalleID { get; set; }
        public required string CaddeAd { get; set; }
        public required int CaddeID { get; set; }
        public required int YolMalzeme { get; set; }
        public DateTime? YapimTarihi { get; set; }
        public required decimal En { get; set; }
        public required decimal Boy { get; set; }
        public required decimal Derinlik { get; set; }
    }

    public class Gydirme
    {
        public required string Deger { get; set; }
        public required int ID { get; set; }
    }

    public class Koordinatlst
    {
        public required double Lng { get; set; }
        public required double Lat { get; set; }
    }
}
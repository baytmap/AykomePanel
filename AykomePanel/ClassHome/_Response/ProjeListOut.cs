using AykomePanel.ClassHome._Request;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace AykomePanel.ClassHome._Response
{
    public class ProjeListOut
    {
        public Boolean success { get; set; } = true;
        public islemMesaj? message { get; set; } = new islemMesaj { Durum = false, Tip = MesajDurumu.Succes };
        public int UstGrupBirimId { get; set; }
        public AykBirimRol[]? BirimRols { get; set; }
        public AykBirim? Birim { get; set; }
        public KryVal[]? IlceList { get; set; }
        public KryVal[]? DurumList { get; set; }
        public KryVal[]? KurumList { get; set; }
        public ProjeListesiOut[]? KendiProjelerim { get; set; }
        public ProjeListesiOut[]? DagitimlaGelen { get; set; }
        public ProjeListesiOut[]? YatirimciKurumlar { get; set; }
        public ProjeListesiOut[]? Taslaklarim { get; set; }
        public ProjeListesiOut[]? ArazideKontrolEdilecekProjeler { get; set; }
        public ProjeListesiOut[]? ArazideKontrolEdilenProjeler { get; set; }
        public ProjeListesiOut[]? UygunlukBelgesiDuzenlenenProjeler { get; set; }
        public ProjeListesiOut[]? UygunlukBelgesiImzala { get; set; }
        public ProjeListesiOut[]? OlurVerilecekler { get; set; }
        public ProjeListesiOut[]? OlurVerilenler { get; set; }
        public ProjeListesiOut[]? RedVerilenler { get; set; }
        public ProjeListesiOut[]? IncelenenProjeler { get; set; }
        public ProjeListesiOut[]? OnayIcınGelenProjeler { get; set; }
        public ProjeListesiOut[]? OnaylananProjeler { get; set; }
        public ProjeListesiOut[]? OnaylananmayanProjeler { get; set; }
        public ProjeListesiOut[]? DagitilanProjeler { get; set; }
        public ProjeListesiOut[]? OnaylanacakTaslakProjeler { get; set; }
        public ProjeListesiOut[]? TumProjeler { get; set; }

    }
    public class ProjeListesiOut
    {
        public Decimal? ProjeNumarasi { get; set; }
        public Decimal? ProjeRef { get; set; }
        public DateTime? TalepTarihi { get; set; }
        public String? Durum { get; set; }
        public Decimal? DurumID { get; set; }
        public String? DurumIkon { get; set; }
        public String? Notlar { get; set; }
        public String? YatirimciKurum { get; set; }
        public String? IncelemeDurum { get; set; }
        public DateTime? IncelemeTarihi { get; set; }
        public DateTime? OnayTarihi { get; set; }
        public DateTime? OnayBitisTarihi { get; set; }
        public string? DurumClass { get; set; }
        public string? KaziDurumu { get; set; }
        public int? KaziDurumID { get; set; }
        public string? Birim { get; set; }
        public string? Imzalar { get; set; }
        public string? ProjeTipi { get; set; }
        public int? ProjeTipiID { get; set; }
        public string? AraziInceleme { get; set; }
        public Guid? RuhsMasterGuidVal { get; set; }
        public bool? EkHesap { get; set; }
        public bool? TarihGuncelleme { get; set; }
        public bool HesapGuncelleme { get; set; }
        public string? IzmPath { get; set; }
        public int? ImzaDurumu { get; set; }
        public bool? imzatamamlandi { get; set; }
        public int? TalepBirimID { get; set; }
    }
    //public class UserRol
    //{
       
    //    public int id { get; set; }
    //    public required int userinfoid { get; set; }
    //    public required int rolid { get; set; }

    //}
    public class AykBirimRol
    {
        public int id { get; set; }
        public required int BirimID { get; set; }
        public required int RolID { get; set; }
    }
    public class AykBirim
    {
        public int BirimId { get; set; }
        public string? Birim { get; set; }
        public required int KurumNo { get; set; }
        public int UstGrupBirimId { get; set; }
    }

    public class RolTbl
    {
        public int id { get; set; }
        public required int sira { get; set; } = 1;
        public required string roladi { get; set; }
        public bool? selected { get; set; }
        public required bool aktif { get; set; } = true;
    }
}

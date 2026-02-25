namespace AykomePanel.ClassHome._Request
{
    public class RuhsatHesapParam
    {
        public required Boolean YolYipranma { get; set; }
        public required Boolean RuhsatBedeli { get; set; }
        public required Boolean TeminatBedeli { get; set; }
        public required Boolean KaziDolguBedeli { get; set; }
        public required Boolean KaplamaBedeli { get; set; }
        public required Boolean AltYapiKaziIzinHarci { get; set; }
        public required int Yil { get; set; }
        public required Boolean CumleEdt { get; set; }
        public DateTime? TarhA1 { get; set; }
        public DateTime? TarhA2 { get; set; }
        public DateTime? Tarhb { get; set; }
        public required Boolean KaziGuzargah { get; set; }
        public String? Aciklama { get; set; }
        //public required Boolean IrsaliyeHazirlansinmi { get; set; }
        //public required Boolean RuhsatYayinlasinmi { get; set; }
        //public required Boolean RuhsatYazdirilsinmi { get; set; }
    }
    public class RuhsatHesapParam2
    {
        public required Boolean YolYipranma { get; set; }
        public required Boolean RuhsatBedeli { get; set; }
        public required Boolean TeminatBedeli { get; set; }
        public required Boolean KaziDolguBedeli { get; set; }
        public required Boolean KaplamaBedeli { get; set; }
        public required Boolean AltYapiKaziIzinHarci { get; set; }
        public required int Yil { get; set; }
    }
}

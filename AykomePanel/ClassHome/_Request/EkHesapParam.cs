namespace AykomePanel.ClassHome._Request
{
    public class EkHesapParam
    {
        public required int ProjeRef { get; set; }
        public int? ID { get; set; }
        public required Kaplamalist[] KaplamaList { get; set; }
        public required string Nott { get; set; }
    }

    public class Kaplamalist
    {
        public required decimal En { get; set; }
        public required decimal Uzunluk { get; set; }
        public required decimal Alan { get; set; }
        public required decimal Derinlik { get; set; }
        public required int KaplamaRef { get; set; }
    }
}

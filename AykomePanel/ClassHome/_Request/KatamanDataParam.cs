namespace AykomePanel.ClassHome._Request
{
    public class KatamanDataParam
    {
        public int RefID { get; set; }
        public int RefKatID { get; set; }
        public double GuneyBatiEnlem { get; set; }
        public double GuneyBatiBoylam { get; set; }
        public double KuzeyBatiEnlem { get; set; }
        public double KuzeyBBatiBoylam { get; set; }
    }

    public class KatamanDataParam2
    {
        public int? RefID { get; set; }
        public int? RefKatID { get; set; }
        public string Sorgu { get; set; }
    }
}

namespace AykomePanel.ClassHome._Request
{
    public class SetOnayParam
    {
        public required int ProjeRef { get; set; }
        public required DateTime Obastar { get; set; }
        public required DateTime Obittar { get; set; }
        public required int Yil { get; set; }
        public required Guid newRuhsatUniqVal { get; set; }
        public required Boolean RuhsatBedeli { get; set; }
        public string? Mesaj { get; set; }

    }
}

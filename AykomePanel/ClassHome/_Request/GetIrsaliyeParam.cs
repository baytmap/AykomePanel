namespace AykomePanel.ClassHome._Request
{
    public class GetIrsaliyeParam
    {
        public required int ProjeRef { get; set; }
        public required Guid newRuhsatUniqVal { get; set; }
        public required Boolean RuhsatBedeli { get; set; }
        public required int Yil { get; set; }
    }
}

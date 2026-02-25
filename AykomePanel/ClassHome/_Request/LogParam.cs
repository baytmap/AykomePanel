namespace AykomePanel.ClassHome._Request
{
    public class LogParam
    {
        public string? Methot { get; set; }
        public string? Path { get; set; }
        public string? QueryString { get; set; }
        public string? RequestBody { get; set; }
        public DateTime? TarihBaslangic { get; set; }
        public DateTime? TarihBitis { get; set; }
        public int? UserID { get; set; }
        public string? IpAddress { get; set; }
        public required int PageNumber { get; set; }
        public Boolean? Tanim { get; set; }
    }
}

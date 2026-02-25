namespace AykomePanel.ClassHome._Request
{
    public class ErrorParam
    {
        public DateTime? TarihBaslangic { get; set; }
        public DateTime? TarihBitis { get; set; }
        public string? Message { get; set; }
        public string? stacktrace { get; set; }
        public string? Path { get; set; }
        public int? UserID { get; set; }
        public required int PageNumber { get; set; }
        public Boolean? Tanim { get; set; }
        public string? IpAddress { get; set; }
    }
}

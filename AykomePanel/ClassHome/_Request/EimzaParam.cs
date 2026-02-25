using Microsoft.AspNetCore.Mvc;

namespace AykomePanel.ClassHome._Request
{
    public class EimzaParam
    {
        public required string sertifikaBase64 { get; set; }
        public required string ImzaTipi { get; set; }
        public required long refID { get; set; }
        //public IFormFile? Dosya { get; set; }
    }
    public class EimzaParam2
    {
        public required string sertifikaBase64 { get; set; }
        public string? Dosya { get; set; }
    }

    public class EimzaParam3
    {
        public string? signatureBase64 { get; set; }
        public string? transactionUUID { get; set; }
        public int? islemDurumId { get; set; }
    }
}

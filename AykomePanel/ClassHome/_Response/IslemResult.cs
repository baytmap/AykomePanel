namespace AykomePanel.ClassHome._Response
{
    public class IslemResult<T>
    {
        public string Baslik { get; set; }

        public string Icerik { get; set; }

        public bool IslemSonucu { get; set; }

        public int GozukmeSuresi { get; set; }

        public T Model { get; set; }
    }
    public class TokenVM
    {
        public string TransactionUU_Id { get; set; }

        public string DigestBase64 { get; set; }

        public object Task { get; set; }
    }
}

namespace AykomePanel.ClassHome._Response
{
    public class DefaultSonuc
    {

        public Object? veri { get; set; }
        public Boolean success { get; set; } = true;
        public int ToplamAdet { get; set; } = 0;
        public islemMesaj? message { get; set; }
    }
    //public enum IslemDurumu
    //{
    //    HataliIslem = 1000,
    //    Basarili = 1001,
    //    Basarili2 = 1002,
    //    OturumYok = 1003,
    //    HataPaneleYonlendir = 1004,
    //    Hata = 1005,
    //    Bilgilendirme = 1006
    //}
    public class islemMesaj
    {
        public Boolean Durum { get; set; } = false;
        public MesajDurumu Tip { get; set; }
        public String? MesajMetni { get; set; }
        //   public IslemDurumu Kod { get; set; }


    }
    public enum MesajDurumu
    {
        Succes = 1,
        Warning = 2,
        Alert = 3,
        Info = 4
    }
}

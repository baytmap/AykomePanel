namespace AykomePanel.ClassHome._Response
{
    public class DefaultOut
    {
        public Boolean success { get; set; } = true;
        public islemMesaj? message { get; set; } = new islemMesaj { Durum = false, Tip = MesajDurumu.Succes };
    }
}

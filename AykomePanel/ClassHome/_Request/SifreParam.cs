using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace AykomePanel.ClassHome._Request
{
    public class SifreParam
    {
        [Required(ErrorMessage = "Eski şifrenizi girmeniz gerekiyor.")]
        [DisplayName("Eski Şifre")]
        public required String EskiSifre { get; set; }

        [Required(ErrorMessage = "Yeni şifrenizi girmeniz gerekiyor.")]
        [DisplayName("Yeni Şifre")]
        public required String YeniSifre { get; set; }

        [Required(ErrorMessage = "Yeni şifrenizi tekrar girmeniz gerekiyor.")]
        [DisplayName("Yeni Şifre Yeniden")]
        public required String YeniSifreYeniden { get; set; }
    }
}

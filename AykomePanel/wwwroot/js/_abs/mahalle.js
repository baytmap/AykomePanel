
var excData = [];

zxc.baslarken(function () {
    fncIlkAcilis(true);

    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis();
    });
    zxc('#btnExcel').click(() => {
        if (excData.length > 0)
            fncExcel1("Mahalle-Listesi", excData);
    });
    fncTblHeight();
})

const fncTblHeight = () => {
    var q = document.body.clientHeight,
        w = document.querySelector('.home-content').offsetHeight,
        e = document.querySelector('.tblsearch').offsetHeight,
        r = document.querySelector('.fixtbl').offsetHeight;

    var we = (q - (w + e + r + 175));
    if (we < 200)
        we = 250;
    document.querySelector('.overflow-auto.tblbotsty').style.height = we + "px";
}

function fncIlkAcilis(Tanim = false) {
    var btnSarch = zxc("#btnVeriAra").dom;
    PostJson('/api/AbsApi/GetMahalleList', {
        Tanim: Tanim,
        IlceID: zxc('#slcIlce').selectboxSecilenIndex().value,
        MahalleID: zxc('#slcMahalle').selectboxSecilenIndex().value,
        MtNo: zxc('#txtMtNo').value(),
        MahalleKodu: zxc('#txtMahalleKodu').value()
    }, function (data) {
        var html;
        if (Tanim) {
            if (data.veri2 != null) {
                html = '<option value="">Seç</option>';
                data.veri2.forEach(q =>
                    html = html.concat(`<option value="${q.ILCEREF}">${q.TANIM}</option>`));
                document.getElementById('slcIlce').innerHTML = html;
                document.getElementById('slcIlce').onchange = fncIlceSecildiginde;
            }
        }
        if (data.veri != null) {
            html = '';
            data.veri.forEach(q =>
                html = html.concat(`<tr>
                    <td>${q.IlceAdi}</td>
                    <td>${q.MahalleKodu}</td>
                    <td>${q.MahalleAdi}</td>
                    <td>${q.MtNo == null ? '' : q.MtNo}</td>
                    <td>${zxc.tarihParse(q.MeclisKararTarihi)}</td>
                    <td>${q.MeclisKararNo == null ? '' : q.MeclisKararNo}</td>
                    <td>${q.BirlestigiMahalle}</td>
                    <td>${q.BolunduguMahalle}</td>
                    <td>${q.CaddeSokakSayisi == null ? '' : q.CaddeSokakSayisi}</td>
                    <td>${zxc.tarihParse(q.IsimVerilisTarihi)}</td>
                    </tr>`));
            zxc('#tblData').html(html);
            zxc('#btnExcel').attrSil('disabled');

            zxc('.btnRowEdt').click(fncOpnDtModal);
            zxc('.btnShwHrt').click(fncOpnMapModal);

            var ar2 = ["İlçe No", "Mahalle Kodu", "Mahalle Adı", "Mt No", "Meclis Karar Tarihi", "Meclis Karar No", "Birleştiği Mahalle", "Bölündüğü Mahalle", "Cadde Sokak Sayısı", "İsim Veriliş Tarihi"];
            excData.push(ar2);
            data.veri.forEach(function (q) {
                var ar = [q.IlceAdi, q.MahalleKodu, q.MahalleAdi, q.MtNo, zxc.tarihParse(q.MeclisKararTarihi), q.MeclisKararNo, q.BirlestigiMahalle, q.BolunduguMahalle, q.CaddeSokakSayisi, zxc.tarihParse(q.IsimVerilisTarihi)];
                excData.push(ar)
            });
        }
    }, function () {
        zxc("#btnVeriAra,#btnExcel").attr('disabled', 'disabled');
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblData').html(" ");
        excData = [];
    }, function () {
        zxc("#btnVeriAra").attrSil('disabled');
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}


function fncOpnDtModal() {
    fncModalAc("#mdlVeri");
    zxc('#txtMahalleKodu2').value("Test 1");
    zxc('#txtMahalleKodu2').selectbox("1");
    zxc('#slcBelediye').selectbox("1");
    zxc('#txtMahalleAdi1').value("Test 1");
    zxc('#txtMahVerTar1').value("2023-01-15");
    zxc('#txtMahalleAdiAciklama1').value("Test 1");
    zxc('#txtKaydeden').value("Test 1");
    zxc('#txtKayitTarihi').value("2023-01-15 15:15");
    zxc('#txtMahalleTanitimNo').value("Test 1");
    zxc('#txtMeclisKararNo1').value("Test 1");
    zxc('#txtMeclisKararTarihi1').value("2023-01-15");
    zxc('#txtBolunmeMahalleAdi1').value("Test 1");
    zxc('#txtBolunmeMahVerTar1').value("2023-01-15");
    zxc('#txtBirlesmeMahalleAdi1').value("Test 1");
    zxc('#txtBirlesmeMahVerTar1').value("2023-01-15");
    zxc('#txtMahNufusu').value("Test 1");
    zxc('#txtMahCadde1').value("Test 1");
    zxc('#txtMahTArihcesi1').value("Test 1");
}
function fncOpnMapModal() {
    fncModalAc("#mdlVeri2");

    setTimeout(function () {
        map.invalidateSize();
        fncAddPolygon();
    }, 500);

}
function fncIlceSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/AbsApi/GetMahalle/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.MAHALLEREF}">${q.TANIM}</option>`));
                document.getElementById('slcMahalle').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcMahalle').innerHTML = html;
        }, function () {
        })
    }
}
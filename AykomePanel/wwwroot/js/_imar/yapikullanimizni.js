
var  toplamKayit = 0, excData = [];

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
    PostJson('/api/Api_Imar/GetYapiKullanmaIzniLst', {
        Tanim: Tanim,
        IlceID: zxc('#slcIlce').selectboxSecilenIndex().value,
        MahalleID: zxc('#slcMahalle').selectboxSecilenIndex().value,
        CaddeSokakID: zxc('#slcCaddeSoka').selectboxSecilenIndex().value,
        BelgeVerilisAmaciID: zxc('#slcBelgeVer').selectboxSecilenIndex().value,
        YapiSahibi: zxc('#txtYapiSahibi').value(),
        RuhsatVerKurumID: zxc('#slcRuhsatVerKurm').selectboxSecilenIndex().value,
        Pafta: zxc('#txtPafta').value(),
        Ada: zxc('#txtAda').value(),
        Parsel: zxc('#txtParsel').value(),
        IsitmaSistemiID: zxc('#slcIsitmaSistemi').selectboxSecilenIndex().value,
        YakitCinsiID: zxc('#slcYakitCinsi').selectboxSecilenIndex().value,
        TasiyiciSitemID: zxc('#slcTasiyiciSitem').selectboxSecilenIndex().value,
        OnayTarihi: zxc('#txtOnayTarihi').value().trim() || null,
        OnayTarihi2: zxc('#txtOnayTarihi2').value().trim() || null,
        ParselKullanimi: zxc('#txtParselKullanimi').value(),
        ToplamYapiSayisi: zxc('#txtToplamYapiSayisi').value().trim() || null,
        ToplamBBSayisi: zxc('#txtToplamBBSayisi').value().trim() || null,
        ToplamDaireSayisi: zxc('#txtToplamDaireSayisi').value().trim() || null,
        ToplamTalan1: zxc('#txtToplamTalan1').value().trim() || null,
        ToplamTalan2: zxc('#txtToplamTalan2').value().trim() || null,
        ToplamYapi1: zxc('#txtToplamYapi1').value().trim() || null,
        ToplamYapi2: zxc('#txtToplamYapi2').value().trim() || null,
        ToplamYapiSnf1: zxc('#txtToplamYapiSnf1').value().trim() || null,
        ToplamYapiSnf2: zxc('#txtToplamYapiSnf2').value().trim() || null,
        ToplamKatYuk1: zxc('#txtToplamKatYuk1').value().trim() || null,
        ToplamKatYuk2: zxc('#txtToplamKatYuk2').value().trim() || null,
        ToplM21: zxc('#txtToplM21').value().trim() || null,
        ToplM22: zxc('#txtToplM22').value().trim() || null,
        YapiMalyt1: zxc('#txtYapiMalyt1').value().trim() || null,
        YapiMalyt2: zxc('#txtYapiMalyt2').value().trim() || null
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
            if (data.veri3 != null) {
                html = '<option value="">Seç</option>';
                data.veri3.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcBelgeVer').innerHTML = html;
            }
            if (data.veri4 != null) {
                html = '<option value="">Seç</option>';
                data.veri4.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcRuhsatVerKurm').innerHTML = html;
            }
            if (data.veri5 != null) {
                html = '<option value="">Seç</option>';
                data.veri5.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcIsitmaSistemi').innerHTML = html;
            }
            if (data.veri6 != null) {
                html = '<option value="">Seç</option>';
                data.veri6.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcYakitCinsi').innerHTML = html;
            }
            if (data.veri7 != null) {
                html = '<option value="">Seç</option>';
                data.veri7.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcTasiyiciSitem').innerHTML = html;
            }
        }
        if (data.veri != null) {
            html = '';
            data.veri.forEach(q =>
                html = html.concat(`<tr>
                    <td>${q.KurumRef}</td>
                    <td>${q.NumaratajRef}</td>
                    <td>${q.AdaNo}</td>
                    <td>${q.ParselNo}</td>
                    <td>${q.BelgeNo}</td>
                    <td>${q.BelgeTarihi}</td>
                    <td>${q.YapiSahibi}</td>
                    <td>${q.Ilce}</td>
                    <td>${q.Mahalle}</td>
                    <td>${q.CaddeSokak}</td>
                    <td>${q.DisKapiNo}</td>
                    </tr>`));
            zxc('#tblData').html(html);
            zxc('#btnExcel').attrSil('disabled');
            
            var ar2 = ["Kurum Ref", "Numarataj Ref", "Ada No", "Parsel No", "Belge No", "Belge Tarihi", "Yapı Sahibi", "İlçe", "Mahalle", "Cadde Sokak", "Dıs Kapı No"];
            excData.push(ar2);
            data.veri.forEach(function (q) {
                var ar = [q.KurumRef, q.NumaratajRef, q.AdaNo, q.ParselNo, q.BelgeNo, q.BelgeTarihi, q.YapiSahibi, q.Ilce, q.Mahalle, q.CaddeSokak, q.DisKapiNo];
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


var StartPage = 0, toplamKayit = 0, excData = [], map, aktifKatman;

zxc.baslarken(function () {
    fncIlkAcilis(true);

    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis(false);
    });
    zxc('#btnKaydet1').click(fncDataAdd);
    zxc('#btnKaydet2').click(fncDataAdd2);
})

function fncIlkAcilis(Tanim) {
    GetJson('/api/Api_Aykome/GetAyarlar/' + Tanim, function (data) {
        var html;
        if (Tanim) {
            if (data.veri != null) {
                html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcTaslakProjeTipi').innerHTML = html;
            }
            if (data.veri2 != null) {
                html = '<option value="">Seç</option>';
                data.veri2.forEach(q => html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcKurum').innerHTML = html;
                document.getElementById('slcKurum').onchange = fncKurumSecildiginde;
            }
        }
        if (data.veri3 != null) {
            html = '';
            data.veri3.forEach(q =>
                html = html.concat(`<tr>
                    <td>${q.Birim}</td>
                    <td>${q.TaslakStil}</td>
                    <td>${q.Renk}</td>
                    </tr>`));
            zxc('#tblDataBg').html(html);
        }

    }, function () {
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblDataBg').html(" ");
    }, function () {
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}

function fncKurumSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/Api_Aykome/GetBirimList/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.BirimId}">${q.Birim}</option>`));
                document.getElementById('slcBirim').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcBirim').innerHTML = html;
        }, function () {
        })
    }
}

function fncDataAdd() {
    PostJson('/api/Api_Aykome/GetAyarlarEkle', {
        TaslakProjeTipi: zxc('#slcTaslakProjeTipi').selectboxSecilenIndex().value,
        SonTaslakTarihi: zxc('#txtSonprjTasGrsTar').value().trim() || null,
        KurumID: zxc('#slcKurum').selectboxSecilenIndex().value,
        BirimID: zxc('#slcBirim').selectboxSecilenIndex().value
    }, function (data) {
        var html;
        if (data.veri != null) {
            html = '';
            data.veri.forEach(q =>
                html = html.concat(`<tr>
                    <td>${q.Kurum}</td>
                    <td>${q.TaslakStil}</td>
                    <td>${q.ProjeStil}</td>
                    </tr>`));
            zxc('#tblDataBg').html(html);
        }
    }, function () {
        zxc("#btnKaydet1").attr('disabled', 'disabled');
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblDataBg').html(" ");
    }, function () {
        zxc("#btnKaydet1").attrSil('disabled');
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}

function fncDataAdd2() {
    GetJson('/api/Api_Aykome/GetAyarlarEkle2/' + parseInt(zxc('#txtGunSayi').value().trim()) || null, function (data) {
        if (data.veri != null) {
            zxc('#txtGunSayi').value(data.veri)
        }
    }, function () {
        zxc("#btnKaydet2").attr('disabled', 'disabled');
    }, function () {
        zxc("#btnKaydet2").attrSil('disabled');
    })
}
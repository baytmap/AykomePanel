var excData = [];


zxc.baslarken(function () {
    fncIlkAcilis(true);

    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis();
    });
    zxc('#btnExcel').click(() => {
        if (excData.length > 0)
            fncExcel1("Aykome-Analiz", excData);
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
    PostJson('/api/Api_Aykome/GetAykomeAnaliz', {
        Tanim: Tanim,
        IlceID: zxc('#slcIlce').selectboxSecilenIndex().value,
        MahalleID: zxc('#slcMahalle').selectboxSecilenIndex().value,
        CaddeSokakID: zxc('#slcCaddeSokak').selectboxSecilenIndex().value,
        BirimIDList: zxc('.chbbrm').checkedListArray('data-id'),
        ProjeDurumIDLst: zxc('.chbbrm2').checkedListArray('data-id'),
        ProjeTipIDLst: zxc('.chbbrm3').checkedListArray('data-id'),
        KaplamaCinsiIDLst: zxc('.chbbrm4').checkedListArray('data-id'),
        TalepTarih1: zxc('#txtBasBasTar').value().trim() || null,
        TalepTarih2: zxc('#txtBasBitTar').value().trim() || null,
        OnayTarih1: zxc('#txtOnyBasTar').value().trim() || null,
        OnayTarih2: zxc('#txtOnyBitTar').value().trim() || null
    }, function (data) {
        var html;
        if (Tanim) {
            if (data.veri2 != null) {
                html = '';
                data.veri2.forEach(q =>
                    html = html.concat(`<div class="form-check">
                        <input class="form-check-input chbbrm" data-id="${q.BirimId}" type="checkbox">
                        <label class="form-check-label">${q.Birim}</label>
                    </div>`));
                document.getElementById('lstBirimler').innerHTML = html;
            }
            if (data.veri3 != null) {
                html = '';
                data.veri3.forEach(q =>
                    html = html.concat(`<div class="form-check">
                        <input class="form-check-input chbbrm2" data-id="${q.DurumRef}" type="checkbox">
                        <label class="form-check-label">${q.Tanim}</label>
                    </div>`));
                document.getElementById('lstProjeDurumu').innerHTML = html;
            }
            if (data.veri4 != null) {
                html = '';
                data.veri4.forEach(q =>
                    html = html.concat(`<div class="form-check">
                        <input class="form-check-input chbbrm3" data-id="${q.Projeref}" type="checkbox">
                        <label class="form-check-label">${q.Projetanim}</label>
                    </div>`));
                document.getElementById('lstProjeTipleri').innerHTML = html;
            }
            if (data.veri5 != null) {
                html = '';
                data.veri5.forEach(q =>
                    html = html.concat(`<div class="form-check">
                        <input class="form-check-input chbbrm4" data-id="${q.GiydirmeRef}" type="checkbox">
                        <label class="form-check-label">${q.Tanim}</label>
                    </div>`));
                document.getElementById('lstKaplamaCinsi').innerHTML = html;
            }
            if (data.veri6 != null) {
                html = '<option value="">Seç</option>';
                data.veri6.forEach(q =>
                    html = html.concat(`<option value="${q.ILCEREF}">${q.TANIM}</option>`));
                document.getElementById('slcIlce').innerHTML = html;
                document.getElementById('slcIlce').onchange = fncIlceSecildiginde;
            }
        }
        if (data.veri != null) {
            var ar1 = ["Ilçe", "Kurum", "Birim", "Durum", "Kaplama", "Tanım", "Proje Tanım", "Uzunluk", "Ruhsat Sayısı", "Ruhsat Bedeli", "Kaplama Bedeli", "Yol Yıpranma Bedeli", "Kazı Dolgu Bedeli"];
                excData.push(ar1);

            html = '';
            data.veri.forEach(q => { 
                html = html.concat(`<tr>
<td>${q.Ilce}</td>
<td>${q.Kurum}</td>
<td>${q.Birim}</td>
<td>${q.Durum}</td>
<td>${q.Kaplama}</td>
<td>${q.Tanim}</td>
<td>${q.ProjeTanim}</td>
<td>${q.Uzunluk}</td>
<td>${q.RuhsatSayisi}</td>
<td>${q.RuhsatBedeli}</td>
<td>${q.KaplamaBedeli}</td>
<td>${q.YolYipranmaBedeli}</td>
<td>${q.KaziDolguBedeli}</td>
                    </tr>`);
                var ar2 = [q.Ilce, q.Kurum, q.Birim, q.Durum, q.Kaplama, q.Tanim, q.ProjeTanim, q.Uzunluk, q.RuhsatSayisi, q.RuhsatBedeli, q.KaplamaBedeli, q.YolYipranmaBedeli, q.KaziDolguBedeli]
                excData.push(ar2);
        });
            zxc('#tblData').html(html);
            zxc('#btnExcel').attrSil('hidden');
        

        }
    }, function () {
        zxc("#btnVeriAra").attr('disabled', 'disabled');
        zxc('#btnExcel').attr('hidden', 'hidden');
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
                document.getElementById('slcMahalle').onchange = fncMahalleSecildiginde;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcMahalle').innerHTML = html;
            document.getElementById('slcCaddeSokak').innerHTML = html;
        }, function () {
        })
    }
}

function fncMahalleSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/AbsApi/GetCaddeSokak/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.CADDESOKAK_REF}">${q.CADDESOKAK_ADI}</option>`));
                document.getElementById('slcCaddeSokak').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcCaddeSokak').innerHTML = html;
        }, function () {
        })
    }
}

var StartPage = 0, toplamKayit = 0, excData = [], map, aktifKatman, slcProjeID = null;

zxc.baslarken(function () {
    fncIlkAcilis();
    fncTblHeight();

    zxc('#btnPasifYap').click(fncPasifYap);
})

const fncTblHeight = () => {
    var q = document.body.clientHeight,
        w = document.querySelector('.home-content').offsetHeight,
        r = document.querySelector('.fixtbl').offsetHeight;

    var we = (q - (w + r + 175));
    if (we < 200)
        we = 250;
    document.querySelector('.overflow-auto.tblbotsty').style.height = we + "px";
    document.querySelector('#lstProjeNo').style.height = we + r + "px";
    document.querySelector('#lblAciklama').style.height = we + r + "px";
}

function fncIlkAcilis() {
    GetJson('/api/Api_Aykome/GetPasifProjeNo', function (data) {
        var html;
        if (data.veri != null) {
            html = '';
            data.veri.forEach(q =>
                html = html.concat(`<div class="lblProjeId" data-id="${q.ProjeRef}">${q.ProjeNo}</div>`));
            zxc('#lstProjeNo').html(html);
            zxc('.lblProjeId').click(fncProjeSlc);
        }
    })
}
function fncProjeSlc() {
    zxc('.lblProjeId').classSil('active');
    var qq = this;
    GetJson('/api/Api_Aykome/GetPasifProjeler/' + qq.getAttribute('data-id'), function (data) {
        var html;
        if (data.veri != null && data.veri.length > 0) {
            slcProjeID = qq.getAttribute('data-id');
            zxc('#btnPasifYap').attrSil('hidden');
            html = '';
            data.veri.forEach(q =>
                html = html.concat(`<tr>
<td>${q.Yil}</td>
<td>${q.IlceAdi}</td>
<td>${q.YolAidiyet}</td>
<td>${q.ProjeNo}</td>
<td>${q.ProjeTipi}</td>
<td>${q.TalepEdenKurum}</td>
<td>${q.Mahalle}</td>
<td>${q.CaddeSokak}</td>
<td>${q.RuhsatKaplamaTipi}</td>
<td>${q.RuhsatEn}</td>
<td>${q.RuhsatAlan}</td>
<td>${q.SahadakiKaplamaTipi}</td>
<td>${q.OlculenUzunluk}</td>
<td>${q.OlculenAlan}</td>
<td>${q.YolYipranmaBirimFiyati}</td>
<td>${q.YolYipranmaBedeli}</td>
<td>${q.KaplamaBirimFiyati}</td>
<td>${q.KaplamaBedeli}</td>
<td>${q.AltYapiKaziIzinHarci}</td>
<td><button type="button" class="btn btn-sm btn-outline-info lblProjeAc" data-id="${q.Aciklama}"><span class="bx bx-message-rounded-dots"></span></button></td>
                                </tr>`)
            );
            zxc('#tblData').html(html);
            zxc('.lblProjeAc').click(fncProjeAck);
        }
    }, function () {
        zxc('#btnPasifYap').attr('hidden', 'hidden');
        zxc(qq).attr('disabled', 'disabled').classEkle('active');
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblData,#lblAciklama').html(" ");

    }, function () {
        zxc(qq).attrSil('disabled');
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}
function fncProjeAck() {
    zxc('#lblAciklama').html(this.getAttribute('data-id'));
}

function fncPasifYap() {
    if (slcProjeID != null)
        GetJson('/api/Api_Aykome/SetProjeAktifPasif/' + slcProjeID + '/1', function (data) {
            slcProjeID = null
            zxc('#btnPasifYap').attr('hidden', 'hidden');
            zxc('#tblData,#lblAciklama').html(" ");
            fncIlkAcilis(false);
        })

}

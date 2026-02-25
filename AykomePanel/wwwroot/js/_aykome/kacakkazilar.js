
var StartPage = 0, toplamKayit = 0, excData = [], map, aktifKatman;

zxc.baslarken(function () {
    fncIlkAcilis();

    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis();
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

function fncIlkAcilis() {
    PostJson('/api/Api_Aykome/GetKacakKazilarList', {
        Tarih1: zxc('#txttarih1').value().trim() || null,
        Tarih2: zxc('#txttarih2').value().trim() || null
    }, function (data) {
        var html;
        if (data.veri != null) {
            html = '';
            data.veri.forEach(q =>
                html = html.concat(`<tr>
                    <td>${q.MiPrinx}</td>
                    <td>${q.Kullanici}</td>
                    <td>${q.MiStyle}</td>
                    <td>${zxc.tarihParse(q.Tarih)}</td>
                    </tr>`));
            zxc('#tblData').html(html);
        }
    }, function () {
        zxc("#btnVeriAra").attr('disabled', 'disabled');
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblData').html(" ");
    }, function () {
        zxc("#btnVeriAra").attrSil('disabled');
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}
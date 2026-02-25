
var excData = [];

zxc.baslarken(function () {

   


    fncIlkAcilis(true);

    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis();
    });
    zxc('#btnExcel').click(() => {
        if (excData.length > 0)
            fncExcel1("Ada-Parsel-Pafta-Listesi", excData);
    });
    fncTblHeight();
    //fncHaritaOlustur();
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
    PostJson('/api/AbsApi/GetAdaParselPafta', {
        Tanim: Tanim,
        IlceID: zxc('#slcIlce').selectboxSecilenIndex().value,
        MahalleID: zxc('#slcMahalle').selectboxSecilenIndex().value,
        MahalleTapuID: zxc('#slcMahalleTapu').selectboxSecilenIndex().value,
        MahalleKakastroID: zxc('#slcKakastro').selectboxSecilenIndex().value,
        AdaNo: zxc('#txtAdaNo').value(),
        ParselNo: zxc('#txtParselNo').value(),
        PaftaAdi: zxc('#txtPaftaAdi').value()
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
                    <td>${q.AdaNo}</td>
                    <td>${q.ParselNo}</td>
                    <td>${q.PaftaAdi}</td>
                    <td>${q.ParselTip}</td>
                    <td>${q.ParselNitelik}</td>
                    <td>${q.MahalleAdi}</td>
                    <td>${q.TapuMahalleAdi}</td>
                    <td>${q.KadastroMahalleAdi}</td>
                    <td>${q.Alani}</td>
                    <td> <a class="btn btn-sm btnsil" href="/Harita/HaritaPg?x=${q.XKOOR}&y=${q.YKOOR}"><span class="bx bx-map"></span>Harita</a></td>
                    </tr>`));
            zxc('#tblData').html(html);
            zxc('#btnExcel').attrSil('disabled');

         /*   zxc('.btnShwHrt').click(fncOpnMapModal);*/

            var ar2 = ["Ada No", "Parsel No", "Pafta Adı", "Parsel Tip", "Mahalle Adı", "Tapu Mahalle", "Kadastro Mahalle", "Alanı"];
            excData.push(ar2);
            data.veri.forEach(function (q) {
                var ar = [q.AdaNo, q.ParselNo, q.PaftaAdi, q.ParselTip, q.MahalleAdi, q.TapuMahalleAdi, q.KadastroMahalleAdi, q.Alani];
                excData.push(ar)
            });


        }
    }, function () {
        zxc("#btnVeriAra,.btnDatOnc:0,.btnDatSon:0,#btnExcel").attr('disabled', 'disabled');
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblData').html(" ");
        excData = [];
    }, function () {
        zxc("#btnVeriAra").attrSil('disabled');
        zxc(".btnDatOnc:0").attrSil('disabled');
        zxc(".btnDatSon:0").attrSil('disabled');
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
                document.getElementById('slcMahalleTapu').innerHTML = html;
                document.getElementById('slcKakastro').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcMahalle').innerHTML = html;
            document.getElementById('slcMahalleTapu').innerHTML = html;
            document.getElementById('slcKakastro').innerHTML = html;
        }, function () {
        })

    }
}
function fncOpnMapModal() {
    fncModalAc("#mdlVeri2");


}



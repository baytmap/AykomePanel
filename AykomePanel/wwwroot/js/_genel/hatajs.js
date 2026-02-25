
var StartPage = 1;

zxc.baslarken(function () {
    fncIlkAcilis(true);

    zxc("#btnVeriAra").click(function () {
        StartPage = 1;
        fncIlkAcilis();
    });

    fncTblHeight();
    zxc(".btnDatOnc").click(fncDataOnceki);
    zxc(".btnDatSon").click(fncDataSonraki);
})
function fncDataOnceki() {
    if (StartPage != 1) {
        StartPage--;
        fncIlkAcilis(false);
    }
}

function fncDataSonraki() {
    StartPage++;
    fncIlkAcilis(false);
}
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

    var KullaniciID = null;
    if (document.getElementById('slcKullanici').value != "-1")
        KullaniciID = zxc('#slcKullanici').selectboxSecilenIndex().value;




    PostJson('/api/Api_Genel/GetErrors', {
        Tanim: Tanim,
        PageNumber: StartPage,
        UserID: KullaniciID,
        TarihBaslangic: zxc('#txtBasBasTar').value().trim() || null,
        TarihBitis: zxc('#txtBasBitTar').value().trim() || null,
        Path: zxc('#txtPath').value().trim() || null,
        Message: zxc('#txtMessage').value().trim() || null,
        stacktrace: zxc('#txtstacktrace').value().trim() || null,
        IpAddress: zxc('#txtIpAddress').value().trim() || null
    }, function (data) {
        var html;
        if (Tanim) {
            if (data.veri2 != null) {
                html = '<option value="-1">Seç</option>';
                data.veri2.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcKullanici').innerHTML = html;
            }
        }

        if (data.ToplamAdet != null)
            zxc('#lbltoplamkayit').html(data.ToplamAdet);

        zxc('#lblgosterim').html(`${(25 * StartPage) - 25}/${(25 * StartPage)}`);

        if (data.veri != null) {
            html = '';
            data.veri.forEach(q => {
                html = html.concat(`<tr>
                    <td>${q.id}</td>
                    <td>${'<span class="coptr" title="' + q.message + '">' + q.message + '</span>'}</td>
                    <td>${zxc.tarihParse(q.logtime, 'dd/MM/yyyy HH:mm')}</td>
                    <td>${q.IpAddress == null ? '' : '<span class="coptr" title="' + q.IpAddress + '">' + q.IpAddress + '</span>'}</td>
                    <td>${q.userinfoid == null ? '' : '<span class="coptr" title="' + q.UserInfo.adsoyad + '">' + q.UserInfo.adsoyad + '</span>'}</td>
                    <td>${q.path == null ? '' : '<span class="coptr" title="' + q.path + '">' + q.path + '</span>'}</td>
                    <td>${q.stacktrace == null ? '' : '<span class="coptr" title="' + q.stacktrace + '">' + q.stacktrace.substring(0, 150) + '</span>'}</td>
                    </tr>`)
            });

            zxc('#tblData').html(html);


            //zxc('.btnRowDet').click(fncOpnDtModal);
            //zxc('.btnShwHrt').click(fncOpnMapModal);
          
        }
    }, function () {
        zxc("#btnVeriAra").attr('disabled', 'disabled');
        zxc('#tblData').html(" ");
        excData = [];
    }, function () {
        zxc("#btnVeriAra").attrSil('disabled');
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}


function fncOpnDtModal() {
    fncModalAc("#mdlVeri");
    zxc('#txtCaddeSokKot').value("Test 1");
    zxc('#txtCaddeSokAd').value("Test 1");
    zxc('#slcCadFilSok').selectbox("1");
    zxc('#txtTanitimNo').value("2023-01-15");
    zxc('#txtFilMecKarNo').value("2023-01-15");
    zxc('#txtFilMecKarTar').value("2023-01-15");
    zxc('#txtValKarNo').value("Test 1");
    zxc('#txtValKarTar').value("2023-01-15");
    zxc('#txtFilKayd').value("Test 1");
    zxc('#txtFilKaydTarh').value("2023-01-15 15:15");
    zxc('#txtFilCadSokBil').value("Test 1");

    //var html = '';
    //data.forEach(q =>
    //    html = html.concat(`<td>${q.IlceAdi}</td><td>${q.MahalleAdi}</td><td>${q.DieTanitimNo}</td>`)
    //);
    //zxc('#tblDataNumarataj').html(html);
}

function fncOpnMapModal() {
    fncModalAc("#mdlVeri2");

    setTimeout(function () {
        map.invalidateSize();
        fncAddPolygon();
    }, 500);

}

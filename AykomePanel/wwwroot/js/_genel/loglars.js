
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

    var Methot = null;
    if (document.getElementById('slcMethot').value != "-1")
        Methot = document.getElementById('slcMethot').value;


    PostJson('/api/Api_Genel/GetLogs', {
        Tanim: Tanim,
        PageNumber: StartPage,
        UserID: KullaniciID,
        TarihBaslangic: zxc('#txtBasBasTar').value().trim() || null,
        TarihBitis: zxc('#txtBasBitTar').value().trim() || null,
        Methot: Methot,
        Path: zxc('#txtPath').value().trim() || null,
        QueryString: zxc('#txtQueryString').value().trim() || null,
        RequestBody: zxc('#txtRequestBody').value().trim() || null,
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
                var hMethod = '';
                if (q.Method == 'POST')
                    hMethod = '<span class="badge bg-primary">POST</span>';
                else if (q.Method == 'GET')
                    hMethod = '<span class="badge bg-warning">GET</span>';

                html = html.concat(`<tr>
                    <td>${q.Id}</td>
                    <td>${hMethod}</td>
                    <td>${zxc.tarihParse(q.Timestamp, 'dd/MM/yyyy HH:mm')}</td>
                    <td>${q.IpAddress == null ? '' : q.IpAddress}</td>
                    <td>${q.userinfoid == null ? '' : q.UserInfo.adsoyad}</td>
                    <td>${q.Path == null ? '' : q.Path}</td>
                    <td>${q.QueryString == null ? '' : q.QueryString}</td>
                    <td>${q.RequestBody == null ? '' : q.RequestBody}</td>
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


var excData = [], map, aktifKatman;

zxc.baslarken(function () {
    fncIlkAcilis(true);
    zxc('.flvcdh').change(function () {
        var q = this.id;

        if (q == 'flvcd1') {
            zxc('#bblock1,#bblock2').attr('class', 'bx bx-lock-alt text-danger');
            document.querySelectorAll('.ayrc .form-control').forEach(q => q.setAttribute('disabled', 'disabled'))
            document.querySelectorAll('.ayrc .form-select').forEach(q => q.setAttribute('disabled', 'disabled'))
        }
        else if (q == 'flvcd2') {
            document.querySelectorAll('.ayrc')[0].querySelectorAll('.form-control').forEach(q => q.removeAttribute('disabled'));
            document.querySelectorAll('.ayrc')[0].querySelectorAll('.form-select').forEach(q => q.removeAttribute('disabled'));

            document.querySelectorAll('.ayrc')[1].querySelectorAll('.form-control').forEach(q => q.setAttribute('disabled', 'disabled'));
            document.querySelectorAll('.ayrc')[1].querySelectorAll('.form-select').forEach(q => q.setAttribute('disabled', 'disabled'));
            zxc('#bblock1').attr('class', 'bx bx-lock-open-alt text-success');
            zxc('#bblock2').attr('class', 'bx bx-lock-alt text-danger');
        }
        else if (q == 'flvcd3') {
            document.querySelectorAll('.ayrc')[1].querySelectorAll('.form-control').forEach(q => q.removeAttribute('disabled'));
            document.querySelectorAll('.ayrc')[1].querySelectorAll('.form-select').forEach(q => q.removeAttribute('disabled'));

            document.querySelectorAll('.ayrc')[0].querySelectorAll('.form-control').forEach(q => q.setAttribute('disabled', 'disabled'));
            document.querySelectorAll('.ayrc')[0].querySelectorAll('.form-select').forEach(q => q.setAttribute('disabled', 'disabled'));
            zxc('#bblock2').attr('class', 'bx bx-lock-open-alt text-success');
            zxc('#bblock1').attr('class', 'bx bx-lock-alt text-danger');
        }
    })
    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis();
    });

    zxc('#btnExcel').click(() => {
        if (excData.length > 0)
            fncExcel1("Mahalle-Listesi", excData);
    });
    fncTblHeight();
    fncHaritaOlustur();
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
    PostJson('/api/AbsApi/GetTasinmazList', {
        Tanim: Tanim,
        IlceID: zxc('#slcIlce').selectboxSecilenIndex().value,
        MahalleID: zxc('#slcMahalle').selectboxSecilenIndex().value,
        CaddeSokakID: zxc('#slcCadde').selectboxSecilenIndex().value,
        KapiNo: zxc('#txtKapiNo').value(),
        MahalleKodu: zxc('#txtMahalleKodu').value(),
        TurID: zxc('#slcTuru').selectboxSecilenIndex().value,
        Barkodu: zxc('#txtBarkodu').value(),
        TasinmazKodu: zxc('#txtTasinmazKodu').value(),
        TasinmazAdi: zxc('#txtTasinmazAdi').value(),
        IlceID2: zxc('#slcIlce2').selectboxSecilenIndex().value,
        EskiMahalleID: zxc('#slcMahalle2').selectboxSecilenIndex().value,
        Ada: zxc('#txtAda').value(),
        Parsel: zxc('#txtParsel').value(),
        Pafta: zxc('#txtPafta').value(),
        BagimsizBolumParams: {
            Barkodu: zxc('#txtBagimsizBarkodu').value(),
            BbNo: zxc('#txtBagimsizBbNo').value(),
            IsYeriIsmi: zxc('#txtIsYeriIsmi').value(),
            KullanimTipID: zxc('#slcBagimsizKullTipi').selectboxSecilenIndex().value,
            SuAboneNo: zxc('#txtBagimsizSuAboneNo').value(),
            ElektirikNo: zxc('#txtBagimsizElektirikNo').value()
        },
        EskitasinmazParams: {
            IlceID: zxc('#slcEskiIlce2').selectboxSecilenIndex().value,
            MahalleID: zxc('#slcEskiMahalle2').selectboxSecilenIndex().value,
            CaddeSokakID: zxc('#slcEskiCaddeSokak2').selectboxSecilenIndex().value,
            KapiNo: zxc('#slcEskiKapiNumarasi2').selectboxSecilenIndex().value
        },
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
                    <td>${q.TasinmazReferans}</td>
                    <td>${q.Tipi}</td>
                    <td>${q.MahalleAdi}</td>
                    <td>${q.EskiMahalleAdi}</td>
                    <td>${q.Belediye}</td>
                    <td>${q.IlceAdi}</td>
                    <td>${q.CaddeSokakAdi}</td>
                    <td>${q.EskiCaddeSokakAdi}</td>
                    <td>${q.SiteAdi}</td>
                    <td>${q.BlokAdi}</td>
                    <td>${q.YeniKapiNumarasi}</td>
                    <td>${q.NTipi}</td>
                    <td>${q.EskiKapiNumarasi}</td>
                    <td>${q.PaftaNumarasi}</td>
                    <td>${q.AdaNumarasi}</td>
                    <td>${q.ParselNumarasi}</td>
                    <td>${q.Barkodu}</td>
                    <td> <a class="btn btn-sm btnsil" href="/Harita/HaritaPg?x=${q.XKOOR}&y=${q.YKOOR}"><span class="bx bx-map"></span>Harita</a></td>
                    </tr>`));
            zxc('#tblData').html(html);
            zxc('#btnExcel').attrSil('disabled');

            zxc('.btnRowShw').click(fncOpnDtModal);
            zxc('.btnShwHrt').click(fncOpnMapModal);

            var ar2 = ["Taşınmaz Referans", "Tipi", "Mahalle", "Eski Mahalle", "Belediye", "İlçe", "Cadde/Sokak Adı", "Eski Cadde/Sokak Adı", "Site Adı", "Blok Adı", "Yeni Kapı Numarası", "N.Tipi", "Eski Kapı Numarası", "Pafta Numarası", "Ada Numarası", "Parsel Numarası", "Barkodu"];
            excData.push(ar2);
            data.veri.forEach(function (q) {
                var ar = [q.TasinmazReferans, q.Tipi, q.MahalleAdi, q.EskiMahalleAdi, q.Belediye, q.IlceAdi, q.CaddeSokakAdi, q.EskiCaddeSokakAdi, q.SiteAdi, q.BlokAdi, q.YeniKapiNumarasi, q.NTipi, q.EskiKapiNumarasi, q.PaftaNumarasi, q.AdaNumarasi, q.ParselNumarasi, q.Barkodu];
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
                document.getElementById('slcMahalle').onchange = fncMahalleSecildiginde;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcMahalle').innerHTML = html;
            document.getElementById('slcCadde').innerHTML = html;
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
                document.getElementById('slcCadde').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcCadde').innerHTML = html;
        }, function () {
        })
    }
}

function fncHaritaOlustur() {

    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib });

    map = new L.Map('map', {
        center: new L.LatLng(37.8716, 32.4846),
        zoom: 8
        //, zoomSnap: 0.1, 
        //zoomDelta: 0.1,
        //scrollWheelZoom: false

    });
    //editableLayers = L.featureGroup().addTo(map);
    L.control.layers({
        'osm': osm.addTo(map),
        "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'google'
        }),
        "Konya": L.tileLayer('https://kbs.konya.bel.tr/kbscache/service/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=basemap&style=&tilematrixSet=EPSG%3A900913&format=image%2Fgif&height=256&width=256&tilematrix=EPSG%3A900913%3A{z}&tilerow={y}&tilecol={x}', {
            attribution: 'Konya'
        })
    }
    ).addTo(map);

}



const fncAddPolygon = () => {
    fncRemovePolygon();
    aktifKatman = L.polygon([
        [51.509, -0.08],
        [51.503, -0.06],
        [51.51, -0.047]
    ]).addTo(map);

    aktifKatman.bindPopup("Mahalle Adı");
    map.fitBounds(aktifKatman.getBounds());
};

const fncRemovePolygon = () => {
    if (aktifKatman) {
        map.removeLayer(aktifKatman);
        aktifKatman = null;
    }
};
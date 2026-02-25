
var StartPage = 0, toplamKayit = 0, excData = [], map, aktifKatman;

zxc.baslarken(function () {
    // document.getElementById('txtBasvuruTarihi').valueAsDate = new Date(); 
    fncIlkAcilis(true);

    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis();
    });

    zxc('#btnExcel').click(() => {
        if (excData.length > 0)
            fncExcel1("Başvuran_Kişi_Bilgisi", excData);
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
    PostJson('/api/AbsApi/GetBasvuruYapanList', {
        BasvuruTarihi: zxc('#txtBasvuruTarihi').value().trim() || null,
        ProjeNo: zxc('#txtProjeNo').value().trim() || null,
        TcNo: zxc('#txtTcNo').value().trim() || null,
        DilekceNo: zxc('#txtDilekceNo').value().trim() || null,
        BasvuruYapanAdi: zxc('#txtBasvuruYapanAdi').value().trim() || null,
        KapiNo: zxc('#txtKapiNo').value().trim() || null
    }, function (data) {
        var html;
        if (data.veri != null) {
            excData.push(["Başvuru Tarihi", "Proje No", "T.C. No", "Dilekce No", "Başvuru Yapan Adi", "Başvuru Yapan Soyadi", "Kapı No"]);
            html = '';
            data.veri.forEach(q => {
                excData.push([zxc.tarihParse(q.BasvuruTarihi), q.ProjeNo, q.TcNo, q.DilekceNo, q.BasvuruYapanAdi, q.BasvuruYapanSoyadi, q.KapiNo])

                html = html.concat(`<tr data-id="${q.ProjeRef}">
<td>${zxc.tarihParse(q.BasvuruTarihi)}</td>
<td>${q.ProjeNo}</td>
<td>${q.TcNo}</td>
<td>${q.DilekceNo}</td>
<td>${q.BasvuruYapanAdi}</td>
<td>${q.KapiNo}</td>
<td><a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncProrefInfoGet(${q.ProjeRef})"><span class="bx bxs-show"></span><span> Proje Gör</span></a></td>
                    </tr>`);
            });
            zxc('#tblData').html(html);
            zxc('#btnExcel').attrSil('disabled');

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


function fncProrefInfoGet(projeRef, KaziRef) {
    GetJson('/api/Api_Harita/GetKaziIngo/' + projeRef, function (data) {

        var p = data.veri.proje,
            k = data.veri.kaziLst;
        if (p) {
            zxc('#txtmPrjNo').value(p.Projeno);
            if (p.Taleptarihi)
                zxc('#txtmPrjTalepTarihi').value(p.Taleptarihi.replace("T", " ").replace("Z", ""));
            zxc('#txtmPrjref').value(p.Projeref);
            zxc('#txtmPrjTip').value(p.ProjeTip);
            zxc('#txtmPrjAmaci').value(p.Amaci);
            zxc('#txtvYil').value(p.Yil);
            zxc('#txtvAktif').value(p.Aktif);

            if (p.Vatandasbasvurutarihi)
                zxc('#txtmPrjVatBasTar').value(p.Vatandasbasvurutarihi.replace("T", " ").replace("Z", ""));
            zxc('#txtvDilekceno').value(p.Dilekceno);
            zxc('#txtvKurum').value(p.KurumAd);
            zxc('#txtvTcNo').value(p.TcNo);

            zxc('#txtvBirim').value(p.Birim);
            zxc('#txtvIlgilikisi').value(p.Ilgilikisi);
            zxc('#txtvBasvurusahibi').value(p.Basvurusahibi);
            zxc('#txtvKapiNo').value(p.KapiNo);

            if (k[0] != undefined)
                if (k[0].PBASTAR && k[0].PBITTAR) {
                    zxc('#txtPrjBasTarihi').value(k[0].PBASTAR.replace("T", " ").replace("Z", ""));
                    zxc('#txtPrjBitTarihi').value(k[0].PBITTAR.replace("T", " ").replace("Z", ""));
                }

            if (p.Onaytarihi)
                zxc('#txtvOnaytarihi').value(p.Onaytarihi.replace("T", " ").replace("Z", ""));

            var html = "";
            for (var i = 0; i < k.length; i++) {
                html += `<tr>
                <td>${k[i].KAZIREF}</td>
                <td>${k[i].UZUNLUK}</td>
                <td>${k[i].EN}</td>
                <td>${k[i].DERINLIK}</td>
                <td>${k[i].ALAN}</td>
                <td>${k[i].HACIM}</td>
                <td>${k[i].ilcad}</td>
                <td>${k[i].MISIM}</td>
                <td>${k[i].CISIM}</td>
                <td>${k[i].YolAidiyetAd}</td>
                <td>${k[i].TRAFIKPLANLAMAREF}</td>
                <td>${k[i].yolmalzeme}</td>
                <td>${k[i].yolyapimtarihi}</td>
                </tr>
                <tr class="ggrd">
                <td colspan="13">
                <table class="bgt4">
                <tbody><th>Kaplama</th><th>Miktar</th></tbody>
                ${fncPrjInfKaplmLst(k[i].kaplamals)}
                </table>
                </td></tr>`;
            }
            zxc('#tbdIstmm').html(html);
        }
        fncModalAc("#mdlKaziInfo");
    }, function () {

    })
}

function fncPrjInfKaplmLst(q) {
    var h = '';
    for (var i = 0; i < q.length; i++)
        h += `<tr>
        <td>${q[i].KaplamaTipi}</td>
        <td>${q[i].MIKTAR}</td>
        </tr>`;
    return h;
}
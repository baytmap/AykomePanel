
var StartPage = 1, veriLst = [];

zxc.baslarken(function () {
    fncIlkAcilis(true);

    zxc("#btnVeriAra").click(function () {
        StartPage = 1;
        fncIlkAcilis();
    });

    fncTblHeight();
    zxc(".btnDatOnc").click(fncDataOnceki);
    zxc(".btnDatSon").click(fncDataSonraki);
    zxc('#btnVeriRapor').click(fnGetRapor);
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
    var DurumID = null;
    if (document.getElementById('slcDurum').value != "-1")
        DurumID = zxc('#slcDurum').selectboxSecilenIndex().value

    PostJson('/api/Api_Aykome/GetKaziRaporu2', {
        Tanim: Tanim,
        StartPage: StartPage,
        DurumID: DurumID,
        BirimIDList: zxc('.chbbrm').checkedListArray('data-id'),
        ProjeTipIDLst: zxc('.chbbrm2').checkedListArray('data-id'),
        BasvuruTarih1: zxc('#txtBasBasTar').value().trim() || null,
        BasvuruTarih2: zxc('#txtBasBitTar').value().trim() || null,
        OnaylananTarih1: zxc('#txtOnyBasTar').value().trim() || null,
        OnaylananTarih2: zxc('#txtOnyBitTar').value().trim() || null
    }, function (data) {
        var html;
        if (Tanim) {


            if (data.veri2 != null) {
                html = '<option value="-1">Seç</option>';
                data.veri2.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcDurum').innerHTML = html;
            }
            if (data.veri3 != null) {
                html = '';
                data.veri3.forEach(q =>
                    html = html.concat(`<div class="form-check">
                        <input class="form-check-input chbbrm" data-id="${q.Key}" type="checkbox">
                        <label class="form-check-label">${q.Val}</label>
                    </div>`));
                document.getElementById('lstBirimler').innerHTML = html;
            }
            if (data.veri4 != null) {
                html = '';
                data.veri4.forEach(q =>
                    html = html.concat(`<div class="form-check">
                        <input class="form-check-input chbbrm2" data-id="${q.Key}" type="checkbox">
                        <label class="form-check-label">${q.Val}</label>
                    </div>`));
                document.getElementById('lstProjeTipleri').innerHTML = html;
            }
        }

        if (data.ToplamAdet != null)
            zxc('#lbltoplamkayit').html(data.ToplamAdet);
        zxc('#lblgosterim').html(`${(25 * StartPage) - 25}/${(25 * StartPage)}`);

        if (data.veri != null) {
            zxc('#btnVeriRapor').attrSil('hidden');
            veriLst = data.veri;
            html = '';
            data.veri.forEach(q =>
                html = html.concat(`<tr>
                   <td>${q.YolReferans}</td>
                    <td>${q.YolAd}</td>
                    <td>${q.BirimAd}</td>
                    <td>${q.BirimNo}</td>
                    <td>${q.ProjeNo}</td>
                    <td>${q.ProjeReferans}</td>
                    <td>${q.Durum}</td>
                    </tr>`));
            zxc('#tblData').html(html);


            //zxc('.btnRowDet').click(fncOpnDtModal);
            //zxc('.btnShwHrt').click(fncOpnMapModal);

        }
    }, function () {
        zxc('#btnVeriRapor').attr('hidden', 'hidden');
        zxc("#btnVeriAra").attr('disabled', 'disabled');
        zxc('#tblData').html(" ");
        excData = [];
        pdfData = null;
        veriLst = [];
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

function fnGetRapor() {
    var adrsAry = [];

    adrsAry.push([{ text: 'Yol Referans', bold: true, fontSize: 9 },
    { text: 'Yol Ad', bold: true, fontSize: 9 },
    { text: 'Birim Ad', bold: true, fontSize: 9 },
    { text: 'Birim No', bold: true, fontSize: 9 },
    { text: 'Proje No', bold: true, fontSize: 9 },
    { text: 'Proje Referans', bold: true, fontSize: 9 },
    { text: 'Durum', bold: true, fontSize: 9 }]);

    veriLst.forEach(q => {
        adrsAry.push([
            { text: q.YolReferans, fontSize: 9 },
            { text: q.YolAd, fontSize: 9 },
            { text: q.BirimAd, fontSize: 9 },
            { text: q.BirimNo, fontSize: 9 },
            { text: q.ProjeNo, fontSize: 9 },
            { text: q.ProjeReferans, fontSize: 9 },
            { text: q.Durum, fontSize: 9 }
        ])
    });



    pdfData = {
        watermark: { text: 'Konya Büyükşehir Belediyesi', color: '#c08e2c', opacity: 0.1, italics: false },
        header: function (currentPage, pageCount, pageSize) {
            return
            //currentPage.toString() + ' of ' + pageCount;
            [
                { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
                { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
            ]
        },
        footer: function (currentPage, pageCount) {
            return {
                table: {
                    widths: ['*', 100],
                    body: [
                        [
                            { text: '', alignment: 'left', fontSize: 7, margin: [10, 0, 0, 0] },
                            { text: 'Page ' + currentPage.toString() + '/' + pageCount, alignment: 'right', fontSize: 7, margin: [0, 0, 10, 0] }
                        ]
                    ]
                }
            };
        },
        content:
            [
                {
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: 'YOL VE TALEP SAHİBİ BİRİM BAZINDA KAZI RAPORU',
                                    style: 'header1',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                }
                            ]
                        ],
                    }
                },
                {
                    layout: {
                        fillColor: function (rowIndex, node, columnIndex) {
                            return (rowIndex === 0) ? '#c2dec2' : null;
                        }
                    },
                    /*  layout: 'noBorders',*/
                    table: {
                        headerRows: 1,
                        widths: ['15%', '20%', '20%', '10%', '10%', '10%', '15%'],
                        body: adrsAry,
                        fontSize: 6
                    },
                    margin: [0, 0, 0, 10],
                }
            ]
        , styles: {
            header1: {
                alignment: 'center',
                fontSize: 16,
                bold: true,
                margin: [0, 0, 0, 5],
                border: [true, true, true, true]
            },
            header2: {
                color: '#012970',
                fontSize: 10,
                margin: [0, 0, 0, 10]
            }
            ,
            header3: {
                color: '#012970',
                fontSize: 9,
                bold: true,
                alignment: 'center',
                margin: [0, 0, 0, 10]
            },
            header4: {
                width: '25%',
                fontSize: 9,
                alignment: 'left',
                margin: [0, 0, 0, 10]
            }
        }
    }
    mypdf = pdfMake.createPdf(pdfData).getDataUrl(function (dataURL) {
        renderPDF(dataURL, document.getElementById("canvas"));
    });
    fncModalAc("#mdlRapor");
}



var excData = [], adrsAry = [], StartPage = 1;

zxc.baslarken(function () {
    fncIlkAcilis();

    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis();
    });
    zxc('#btnExcel').click(() => {
        if (excData.length > 0)
            fncExcel1("Ortak-Kazılar", excData);
    });
    zxc('#btnPdf').click(() => {
        if (excData.length > 0)
            pdfOrnek()
    });

    fncTblHeight();
    zxc(".btnDatOnc").click(fncDataOnceki);
    zxc(".btnDatSon").click(fncDataSonraki);
});

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

function fncIlkAcilis() {
    var btnSarch = zxc("#btnVeriAra").dom;

    PostJson('/api/Api_Aykome/GetOrtakKazilar', {
        Param1: zxc('#txtBasBasTar').value().trim() || null,
        Param2: zxc('#txtBasBitTar').value().trim() || null,
        Param3: StartPage
    }, function (data) {
        var html;
        if (data.veri != null) {
            html = '';
            var ar2 = ["Projeler", "Proje Tipleri", "Tarihler", "Kurumlar", "Yol Adı"];

            excData.push(ar2);
            adrsAry.push([{ text: 'Projeler', bold: true, fontSize: 9 },
            { text: 'Proje Tipleri', bold: true, fontSize: 9 },
            { text: 'Tarihler', bold: true, fontSize: 9 },
            { text: 'Kurumlar', bold: true, fontSize: 9 },
            { text: 'Yol Adı', bold: true, fontSize: 9 }]);
            data.veri.forEach(q => {
                html = html.concat(`<tr>
                   <td>${q.Projeler}</td>
                    <td>${q.ProjeTipleri}</td>
                    <td>${zxc.tarihParse(q.Tarihler)}</td >
                    <td>${q.Kurumlar}</td>
                    <td>${q.YolAdi}</td>
                    </tr>`);
                var ar = [q.Projeler, q.ProjeTipleri, zxc.tarihParse(q.Tarihler), q.Kurumlar, q.YolAdi];
                excData.push(ar);
                adrsAry.push([
                    { text: q.Projeler, fontSize: 9 },
                    { text: q.ProjeTipleri, fontSize: 9 },
                    { text: zxc.tarihParse(q.Tarihler), fontSize: 9 },
                    { text: q.Kurumlar, fontSize: 9 },
                    { text: q.YolAdi, fontSize: 9 }
                ]);

            }
            );
            zxc('#tblData').html(html);
            zxc('#btnExcel').attrSil('hidden');
            zxc('#btnPdf').attrSil('hidden');
            //zxc('.btnRowDet').click(fncOpnDtModal);
            //zxc('.btnShwHrt').click(fncOpnMapModal);



        }

        if (data.ToplamAdet != null)
            zxc('#lbltoplamkayit').html(data.ToplamAdet);
        zxc('#lblgosterim').html(`${(25 * StartPage) - 25}/${(25 * StartPage)}`);
    }, function () {
        zxc('#btnExcel').attr('hidden', 'hidden');
        zxc('#btnPdf').attr('hidden', 'hidden');
        zxc("#btnVeriAra").attr('disabled', 'disabled');
        zxc("#btnVeriAra").ilkElement().attr('class', 'bx bx-loader');
        zxc('#tblData').html(" ");
        excData = []; adrsAry = [];
    }, function () {
        zxc("#btnVeriAra").attrSil('disabled');
        zxc('.tblload:0').attr('hidden', 'hidden');
        zxc("#btnVeriAra").ilkElement().attr('class', 'bx bx-search');
    })
}
function pdfOrnek() {
    var docDefinition3 = {

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
              /*  , layout: 'noBorders'*/
            };
        },
        content:
            [
                {
                    image: 'data:image/png;base64,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',
                    width: 100,
                    alignment: 'center'
                },
                {
                    table: {
                        widths: ['100%'],
                        body: [
                            [
                                {
                                    text: 'KONYA BÜYÜKŞEHİR BELEDİYESİ AYKOME ORTAK KAZI RAPORU',
                                    style: 'header1',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                }
                            ]
                        ],
                    }
                },
                {
                   /* layout: 'noBorders',*/
                    table: {
                        headerRows: 1,
                        fontSize: 6,
                        widths: ['*', '*', '*', '*', '*'],
                        body: adrsAry
                    }
                }
            ]
        , styles: {
            header1: {
                alignment: 'center',
                fontSize: 16,
                bold: true,
                margin: [0, 10]
            }
        }
    }
    pdfMake.createPdf(docDefinition3).download();
}

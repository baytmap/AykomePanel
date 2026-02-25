/// <reference path="salmanarslan_orjinal.js" />

var startPage = 0, toplamKayit = 0;

zxc.baslarken(function () {
    fncHaritaOlustur();
    fncIlkAcilis();

    zxc("#btnVeriAra").click(fncDataSearch);
    zxc(".btnDatOnc").click(fncDataOnceki);
    zxc(".btnDatSon").click(fncDataSonraki);

    zxc('.btndrowedt3').click(fncTestRowEdt)
    zxc('.btndrowedt2').click(fncTestRowEdt2)
    zxc('.btnRowDet1').click(fncTestRowEdt3)
    zxc('.btnRowDet3').click(fncSilModOp)


    //fncKatmanlariYukle();
    setTimeout(function () {
        dangildanSertifikaOku();
    }, 1000)
    zxc("#imzaBilgisiModalImzala").click(BelgEImzala);
})


function fncDataSearch() {
    var q = this;

    fncDataInsStr(q);

    setTimeout((bb) => {
        fncDataInsEnd(q);
    }, 3000)
}

function fncIlkAcilis() {

}

function fncDataOnceki() {
    startPage--;
    var q = this;

    fncDataInsStr(q);

    setTimeout((bb) => {
        fncDataInsEnd(q);
    }, 3000)
}

function fncDataSonraki() {
    startPage++;
    var q = this;

    fncDataInsStr(q);

    setTimeout((bb) => {
        fncDataInsEnd(q);
    }, 3000)
}

function fncDataInsStr(q) {
    zxc(q).ustElement(2).dom.querySelector('.btnSearch').setAttribute('disabled', 'disabled')
    zxc(q).ustElement(2).dom.querySelector('.tblload').removeAttribute('hidden')
    zxc(q).ustElement().ilkElement().attr('disabled', 'disabled').birSonrakiElement().attr('disabled', 'disabled')
}

function fncDataInsEnd(q) {
    zxc("#btnSearch").attrSil('disabled');
    zxc(q).ustElement(2).dom.querySelector('.btnSearch').removeAttribute('disabled')
    zxc(q).ustElement(2).dom.querySelector('.tblload').setAttribute('hidden', 'hidden')
    zxc(q).ustElement().ilkElement().attrSil('disabled').birSonrakiElement().attrSil('disabled')
}

function pdfOrnek() {
    var docDefinition3 = {

        watermark: { text: 'Bee System', color: '#c08e2c', opacity: 0.2, bold: true, italics: false },
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
                            { text: 'Varsa bir metin falan filan deneme denemedenemedenemedeneme', alignment: 'left', fontSize: 7, margin: [10, 0, 0, 0] },
                            { text: 'Page ' + currentPage.toString() + '/' + pageCount, alignment: 'right', fontSize: 7, margin: [0, 0, 10, 0] }
                        ]
                    ]
                },
                layout: 'noBorders'
            };
        },
        content:
            [
                {
                    image: 'data:image/png;base64,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',
                    width: 100
                },
                { text: 'Konya Büyükşehir Belediyesi', style: 'header1' },
                { text: 'Tedarikçi & Depo', style: 'header2' },
                {
                    columns: [
                        {
                            width: '25%',
                            text: 'İşlem Tipi',
                            bold: true,
                            alignment: 'left'
                        },
                        {
                            style: 'header3',
                            text: 'Depo',
                        },
                        {
                            style: 'header3',
                            text: 'Tedarikçi'
                        },
                        {
                            width: '25%',
                            text: 'İşlem tarihi',
                            bold: true,
                            alignment: 'right'

                        }
                    ],
                    columnGap: 5
                },
                {
                    columns: [
                        {
                            width: '25%',
                            text: 'Mal Alış',
                            alignment: 'left'
                        },
                        {
                            width: '25%',
                            text: 'Antalya Şubesi',
                            alignment: 'center'
                        },
                        {
                            width: '25%',
                            text: 'Bardakçı',
                            alignment: 'center'
                        },
                        {
                            width: '25%',
                            text: '01.01.2011',
                            alignment: 'right'
                        }
                    ],
                    columnGap: 5
                },
                { text: 'Ödeme', style: 'header2' },
                {
                    columns: [
                        {
                            width: '33.333333333333336%',
                            text: 'Toplam KDV Tutarı',
                            bold: true,
                            alignment: 'left'
                        },
                        {
                            width: '33.333333333333336%',
                            text: 'Toplam Tutar',
                            bold: true,
                            alignment: 'center'
                        },
                        {
                            width: '33.333333333333336%',
                            text: 'Açıklama',
                            bold: true,
                            alignment: 'right'
                        }
                    ],
                    columnGap: 5
                },
                {
                    columns: [
                        {
                            width: '33.333333333333336%',
                            text: '67.00',
                            alignment: 'left'
                        },
                        {
                            width: '33.333333333333336%',
                            text: '670.00',
                            alignment: 'center'
                        },
                        {
                            width: '33.333333333333336%',
                            text: ' fgdgsd fgsd fsdf sdfsd fsdfsdf sdfsdfsd f',
                            alignment: 'right',
                            fontSize: 8
                        }
                    ],
                    columnGap: 5
                },
                { text: 'Belge', style: 'header2' },
                {
                    columns: [
                        {
                            text: 'Belge Tarihi',
                            style: 'header4'
                        },
                        {
                            text: 'Belge No',
                            style: 'header4'
                        },
                        {
                            text: 'Belge Tipi',
                            style: 'header4'
                        },
                        {
                            text: 'Belge',
                            width: '25%',
                            bold: true,
                            alignment: 'right'
                        }
                    ],
                    columnGap: 5
                },
                {
                    columns: [
                        {
                            text: '01.01.2021',
                            width: '25%',
                            alignment: 'left'
                        },
                        {
                            text: '2555',
                            width: '25%',
                            alignment: 'left'
                        },
                        {
                            text: 'E-Fatura',
                            width: '25%',
                            alignment: 'left'
                        },
                        {
                            text: 'dfgdf gdf gdf',
                            width: '25%',
                            alignment: 'right'
                        }
                    ],
                    columnGap: 5
                },
                { text: 'Stok Hareketinin Detayları', style: 'header1' },
                {
                    //layout: {
                    //    fillColor: function (rowIndex, node, columnIndex) {
                    //        if (rowIndex === 0)
                    //            return '#f6f6fe';
                    //        else
                    //            return (rowIndex % 2 === 0) ? null : '#ebebeb';
                    //    }
                    //},
                    layout: 'noBorders',
                    table: {
                        headerRows: 1,
                        fontSize: 6,
                        widths: ['*', '*', '*', '*', '*', '*', '*'],
                        body: [
                            [
                                { text: 'ID', bold: true },
                                { text: 'Malzeme', bold: true },
                                { text: 'Açıklama', bold: true },
                                { text: 'Bir. Fyt.', bold: true },
                                { text: 'Tutar', bold: true },
                                { text: 'Kdv Oran', bold: true },
                                { text: 'Miktar', bold: true }
                            ],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3 Value 3 Value 3 Value 3 Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4'],
                            ['Value 1', 'Value 2', 'Value 3', 'Value 4', 'Value 2', 'Value 3', 'Value 4']
                        ]
                    }
                },
                { qr: 'https://beefatura.net/', fit: '75', alignment: 'center', margin: [0, 10] }
            ]
        , styles: {
            header1: {
                alignment: 'center',
                fontSize: 16,
                bold: true,
                margin: [0, 10]
            },
            header2: {
                color: '#012970',
                fontSize: 13,
                bold: true,
                margin: [0, 15, 0, 5]
            }
            ,
            header3: {
                width: '25%',
                bold: true,
                alignment: 'center'
            },
            header4: {
                width: '25%',
                bold: true,
                alignment: 'left'
            }
            //font: string: name of the font
            //fontSize: number: size of the font in pt
            //fontFeatures: string[]: array of advanced typographic features supported in TTF fonts(supported features depend on font file)
            //lineHeight: number: the line height(default : 1)
            //bold: boolean: whether to use bold text(default : false)
            //italics: boolean: whether to use italic text(default : false)
            //alignment: string: (‘left’ or ‘center’ or ‘right’ or ‘justify’) the alignment of the text
            //characterSpacing: number: size of the letter spacing in pt
            //color: string: the color of the text(color name e.g., ‘blue’ or hexadecimal color e.g., ‘#ff5500’)
            //background: string the background color of the text
            //markerColor: string: the color of the bullets in a buletted list
            //decoration: string | string[]: the text decoration to apply(‘underline’ or ‘lineThrough’ or ‘overline’)
            //decorationStyle: string: the style of the text decoration(‘dashed’ or ‘dotted’ or ‘double’ or ‘wavy’)
            //decorationColor: string: the color of the text decoration, see color

        }
    }
    pdfMake.createPdf(docDefinition3).download();
}



function fncTestRowEdt() {
    document.querySelectorAll('#pills-home .form-control[type="text"]').forEach((q, w) => q.value = "Test İçin Değer " + w);
    document.querySelectorAll('#pills-home .form-control[type="date"]').forEach((q, w) => q.value = "2024-03-21");
    document.querySelectorAll('#pills-home .form-control[type="datetime-local"]').forEach((q, w) => q.value = "2024-03-21 11:11");
    document.querySelectorAll('#pills-home .form-control[type="time"]').forEach((q, w) => q.value = "21:11");
    document.querySelectorAll('#pills-home .form-control[type="password"]').forEach((q, w) => q.value = "şifre123");
    document.querySelectorAll('#pills-home .form-control[type="color"]').forEach((q, w) => q.value = "#808000");
    document.querySelectorAll('#pills-home .form-select').forEach((q, w) => q.value = 1);
}
function fncTestRowEdt2() {
    fncModalAc("#mdlVeri");
}
function fncTestRowEdt3() {
    fncModalAc("#mdlVeri2");
}




//fncTabTmz("pills-home")
function fncTabTmz(q) {
    var w = document.getElementById(q);
    w.querySelectorAll('.form-control').forEach((q) => q.value = "");
    w.querySelectorAll('.form-select').forEach((q) => q.options[0].selected = true);
}



//fncTabAc("pills-profile-tab") 
function fncTabAc(q) {
    var w = document.getElementById(q),
        e = zxc(w).ustElement(1).dom,
        r = zxc(e).birSonrakiElement().dom;

    e.querySelectorAll('.nav-item .nav-link.active').forEach((q) => q.classList.remove('active'));
    r.querySelectorAll('.tab-pane.fade.active.show').forEach((q) => q.setAttribute('class', 'tab-pane fade'));

    w.classList.add('active');

    r.querySelector('[aria-labelledby="' + q + '"]').setAttribute('class', 'tab-pane fade active show');

}

function fncSilModOp() {
    fncModalAc("#mdlSilme");
}

//https://kbs.konya.bel.tr/kbscache/service/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=basemap&style=&tilematrixSet=EPSG%3A900913&format=image%2Fgif&height=256&width=256&tilematrix=EPSG%3A900913%3A16&tilerow=25309&tilecol=38683
function fncHaritaOlustur() {

    //var haritaTileLayer = L.tileLayer('https://kbs.konya.bel.tr/kbscache/service/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=basemap&style=&tilematrixSet=EPSG%3A900913&format=image%2Fgif&height=256&width=256&tilematrix=EPSG%3A900913%3A{z}&tilerow={y}&tilecol={x}', {
    //    attribution: 'Konya Büyükşehir Belediyesi',
    //    maxZoom: 18
    //});

    //map = L.map('map').setView([37.8716, 32.4846], 16);
    //haritaTileLayer.addTo(map);


    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib });

    map = new L.Map('map', {
        center: new L.LatLng(37.8716, 32.4846),
        zoom: 8,
        zoomSnap: 0.1, // Zoom seviyelerini yarıya indirir
        zoomDelta: 0.1, // Fare tekerleği ile her seferinde yarım zoom yapar,
        scrollWheelZoom: true

    });
    editableLayers = L.featureGroup().addTo(map);
    L.control.layers({
        'osm': osm.addTo(map),
        "google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'google'
        }),
        "Konya": L.tileLayer('https://kbs.konya.bel.tr/kbscache/service/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=basemap&style=&tilematrixSet=EPSG%3A900913&format=image%2Fgif&height=256&width=256&tilematrix=EPSG%3A900913%3A{z}&tilerow={y}&tilecol={x}', {
            attribution: 'Konya'
        })
    },
        { 'drawlayer': editableLayers },
        { position: 'topright', collapsed: false }
    ).addTo(map);
    ///////////////////

    //var drawControl = new L.Control.Draw({
    //    draw: {
    //        polyline: true,
    //        polygon: {
    //            allowIntersection: false,
    //            drawError: {
    //                color: '#e1e100', // Color the shape will turn when intersects
    //                message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
    //            }
    //        },
    //        marker: true,
    //        rectangle: true,
    //        circle: true
    //    },
    //    edit: {
    //        featureGroup: editableLayers,
    //        remove: true
    //    }
    //});

    //map.addControl(drawControl);

    //// #region Cizim Yapildiginda
    //map.on(L.Draw.Event.CREATED, function (e) {
    //    document.getElementById('txtkordlst').innerHTML = "";
    //    var type = e.layerType,
    //        layer = e.layer;
    //    if (type === 'polygon' || type === 'polyline') {
    //        editableLayers.addLayer(layer);
    //        console.log(layer.toGeoJSON());
    //        // var latlngLst = layer._latlngs[0];
    //        // var htmlKrd = '';

    //        // for (var i = 0; i < latlngLst.length; i++)
    //        //     htmlKrd = htmlKrd.concat(`<tr data-lat='${latlngLst[i].lat}' data-lng='${latlngLst[i].lng}'><td>${(i + 1)}</td><td>${latlngLst[i].lat}</td><td>${latlngLst[i].lng}</td></tr>`);

    //        // document.getElementById('txtkordlst').innerHTML = htmlKrd;
    //        // fncModalAc("#mdlVeri");

    //        var url = type === 'polygon' ? 'PostmyPolygon' : 'PostmyLinestring';

    //        fetch('/api/ApiTest/' + url, {
    //            method: 'POST',
    //            headers: {
    //                'Content-Type': 'application/json'
    //            },
    //            body: JSON.stringify(layer.toGeoJSON())
    //        })
    //            .then(response => response.json())
    //            .then(data => {
    //                console.log('API cevabı:', data);
    //            })
    //            .catch(error => {
    //                console.error('Hata:', error);
    //            });
    //    }

    //});
    //// #endregion

    //// #region Cizim Düzenlendiğinde

    //map.on(L.Draw.Event.EDITED, function (e) {
    //    var layers = e.layers;
    //    layers.eachLayer(function (layer) {

    //        console.log("edited=", JSON.stringify(layer.toGeoJSON()));

    //        //ne istersen onu yap; büyük ihtimalle db'ye geri kaydet
    //    });
    //});


    //// map.on('draw:edited', function (e) {
    ////     var layers = e.layers;
    ////     layers.eachLayer(function (layer) {
    ////         console.log("edited=", layer);
    ////         //ne istersen onu yap; büyük ihtimalle db'ye geri kaydet
    ////     });
    //// });
    //// #endregion

}
//map.invalidateSize()
function fncKatmanlariYukle() {
    var myStyle1 = {
        "color": "#055160",
        "weight": 2,
        "opacity": 1
    };
    var myStyle2 = {
        "color": "#ff7800",
        "weight": 1,
        "opacity": 0.65
    };
    fetch('/api/ApiTest/GetGisData', {
        method: 'GET'
    })
        .then(response => response.json())
        .then(data => {
            yuklenenKatman = L.geoJSON(data,
                {
                    onEachFeature: onEachFeature,
                    style: function (feature) {
                        // switch (feature.properties.party) {
                        //     case 'test1': return myStyle2;
                        //     case 'test2': return myStyle1;
                        // }
                        console.log("xxx", feature.properties.RenkKodu);
                        return {
                            "color": feature.properties.RenkKodu,
                            "weight": 2,
                            "opacity": 0.65
                        }
                    }

                    // style: {
                    //     "color": "#055160",
                    //     "weight": 2,
                    //     "opacity": 1
                    // }
                }
            ).addTo(map);
            map.fitBounds(yuklenenKatman.getBounds());
        })
        .catch(error => {
            console.error('Hata:', error);
        });
}


const fncAddJson2 = () => {

    katman = L.geoJson(statesData, {
        style: fncSicklaikstyle,
        onEachFeature: onEachFeaturex
    }).addTo(map);
    map.fitBounds(katman.getBounds());

}
function onEachFeaturex(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: fncKatmanClkGe
    });
}

function fncKatmanClkGe(e) {
    MesajVer(e.target.feature.properties.name, MesajDurumu.Info);
    map.fitBounds(e.target.getBounds());
}

function fncSicklaikstyle(feature) {
    return {
        fillColor: getSicColor(feature.properties.density),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.7
    };
}
function getSicColor(d) {
    return d > 1000 ? '#800026' :
        d > 500 ? '#BD0026' :
            d > 200 ? '#E31A1C' :
                d > 100 ? '#FC4E2A' :
                    d > 50 ? '#FD8D3C' :
                        d > 20 ? '#FEB24C' :
                            d > 10 ? '#FED976' :
                                '#FFEDA0';
}

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '',
        fillOpacity: 0.7
    });
    info.update(layer.feature.properties);

    layer.bringToFront();
}
function resetHighlight(e) {
    katman.resetStyle(e.target);
    info.update();
}

var statesData = {
    "type": "FeatureCollection", "features": [
        { "type": "Feature", "id": "01", "properties": { "name": "Alabama", "density": 94.65 }, "geometry": { "type": "Polygon", "coordinates": [[[-87.359296, 35.00118], [-85.606675, 34.984749], [-85.431413, 34.124869], [-85.184951, 32.859696], [-85.069935, 32.580372], [-84.960397, 32.421541], [-85.004212, 32.322956], [-84.889196, 32.262709], [-85.058981, 32.13674], [-85.053504, 32.01077], [-85.141136, 31.840985], [-85.042551, 31.539753], [-85.113751, 31.27686], [-85.004212, 31.003013], [-85.497137, 30.997536], [-87.600282, 30.997536], [-87.633143, 30.86609], [-87.408589, 30.674397], [-87.446927, 30.510088], [-87.37025, 30.427934], [-87.518128, 30.280057], [-87.655051, 30.247195], [-87.90699, 30.411504], [-87.934375, 30.657966], [-88.011052, 30.685351], [-88.10416, 30.499135], [-88.137022, 30.318396], [-88.394438, 30.367688], [-88.471115, 31.895754], [-88.241084, 33.796253], [-88.098683, 34.891641], [-88.202745, 34.995703], [-87.359296, 35.00118]]] } },
        { "type": "Feature", "id": "02", "properties": { "name": "Alaska", "density": 1.264 }, "geometry": { "type": "MultiPolygon", "coordinates": [[[[-131.602021, 55.117982], [-131.569159, 55.28229], [-131.355558, 55.183705], [-131.38842, 55.01392], [-131.645836, 55.035827], [-131.602021, 55.117982]]], [[[-131.832052, 55.42469], [-131.645836, 55.304197], [-131.749898, 55.128935], [-131.832052, 55.189182], [-131.832052, 55.42469]]], [[[-132.976733, 56.437924], [-132.735747, 56.459832], [-132.631685, 56.421493], [-132.664547, 56.273616], [-132.878148, 56.240754], [-133.069841, 56.333862], [-132.976733, 56.437924]]], [[[-133.595627, 56.350293], [-133.162949, 56.317431], [-133.05341, 56.125739], [-132.620732, 55.912138], [-132.472854, 55.780691], [-132.4619, 55.671152], [-132.357838, 55.649245], [-132.341408, 55.506844], [-132.166146, 55.364444], [-132.144238, 55.238474], [-132.029222, 55.276813], [-131.97993, 55.178228], [-131.958022, 54.789365], [-132.029222, 54.701734], [-132.308546, 54.718165], [-132.385223, 54.915335], [-132.483808, 54.898904], [-132.686455, 55.046781], [-132.746701, 54.997489], [-132.916486, 55.046781], [-132.889102, 54.898904], [-132.73027, 54.937242], [-132.626209, 54.882473], [-132.675501, 54.679826], [-132.867194, 54.701734], [-133.157472, 54.95915], [-133.239626, 55.090597], [-133.223195, 55.22752], [-133.453227, 55.216566], [-133.453227, 55.320628], [-133.277964, 55.331582], [-133.102702, 55.42469], [-133.17938, 55.588998], [-133.387503, 55.62186], [-133.420365, 55.884753], [-133.497042, 56.0162], [-133.639442, 55.923092], [-133.694212, 56.070969], [-133.546335, 56.142169], [-133.666827, 56.311955], [-133.595627, 56.350293]]], [[[-133.738027, 55.556137], [-133.546335, 55.490413], [-133.414888, 55.572568], [-133.283441, 55.534229], [-133.420365, 55.386352], [-133.633966, 55.430167], [-133.738027, 55.556137]]], [[[-133.907813, 56.930849], [-134.050213, 57.029434], [-133.885905, 57.095157], [-133.343688, 57.002049], [-133.102702, 57.007526], [-132.932917, 56.82131], [-132.620732, 56.667956], [-132.653593, 56.55294], [-132.817901, 56.492694], [-133.042456, 56.520078], [-133.201287, 56.448878], [-133.420365, 56.492694], [-133.66135, 56.448878], [-133.710643, 56.684386], [-133.688735, 56.837741], [-133.869474, 56.843218], [-133.907813, 56.930849]]], [[[-134.115936, 56.48174], [-134.25286, 56.558417], [-134.400737, 56.722725], [-134.417168, 56.848695], [-134.296675, 56.908941], [-134.170706, 56.848695], [-134.143321, 56.952757], [-133.748981, 56.772017], [-133.710643, 56.596755], [-133.847566, 56.574848], [-133.935197, 56.377678], [-133.836612, 56.322908], [-133.957105, 56.092877], [-134.110459, 56.142169], [-134.132367, 55.999769], [-134.230952, 56.070969], [-134.291198, 56.350293], [-134.115936, 56.48174]]], [[[-134.636246, 56.28457], [-134.669107, 56.169554], [-134.806031, 56.235277], [-135.178463, 56.67891], [-135.413971, 56.810356], [-135.331817, 56.914418], [-135.424925, 57.166357], [-135.687818, 57.369004], [-135.419448, 57.566174], [-135.298955, 57.48402], [-135.063447, 57.418296], [-134.849846, 57.407343], [-134.844369, 57.248511], [-134.636246, 56.728202], [-134.636246, 56.28457]]], [[[-134.712923, 58.223407], [-134.373353, 58.14673], [-134.176183, 58.157683], [-134.187137, 58.081006], [-133.902336, 57.807159], [-134.099505, 57.850975], [-134.148798, 57.757867], [-133.935197, 57.615466], [-133.869474, 57.363527], [-134.083075, 57.297804], [-134.154275, 57.210173], [-134.499322, 57.029434], [-134.603384, 57.034911], [-134.6472, 57.226604], [-134.575999, 57.341619], [-134.608861, 57.511404], [-134.729354, 57.719528], [-134.707446, 57.829067], [-134.784123, 58.097437], [-134.91557, 58.212453], [-134.953908, 58.409623], [-134.712923, 58.223407]]], [[[-135.857603, 57.330665], [-135.715203, 57.330665], [-135.567326, 57.149926], [-135.633049, 57.023957], [-135.857603, 56.996572], [-135.824742, 57.193742], [-135.857603, 57.330665]]], [[[-136.279328, 58.206976], [-135.978096, 58.201499], [-135.780926, 58.28913], [-135.496125, 58.168637], [-135.64948, 58.037191], [-135.59471, 57.987898], [-135.45231, 58.135776], [-135.107263, 58.086483], [-134.91557, 57.976944], [-135.025108, 57.779775], [-134.937477, 57.763344], [-134.822462, 57.500451], [-135.085355, 57.462112], [-135.572802, 57.675713], [-135.556372, 57.456635], [-135.709726, 57.369004], [-135.890465, 57.407343], [-136.000004, 57.544266], [-136.208128, 57.637374], [-136.366959, 57.829067], [-136.569606, 57.916698], [-136.558652, 58.075529], [-136.421728, 58.130299], [-136.377913, 58.267222], [-136.279328, 58.206976]]], [[[-147.079854, 60.200582], [-147.501579, 59.948643], [-147.53444, 59.850058], [-147.874011, 59.784335], [-147.80281, 59.937689], [-147.435855, 60.09652], [-147.205824, 60.271782], [-147.079854, 60.200582]]], [[[-147.561825, 60.578491], [-147.616594, 60.370367], [-147.758995, 60.156767], [-147.956165, 60.227967], [-147.791856, 60.474429], [-147.561825, 60.578491]]], [[[-147.786379, 70.245291], [-147.682318, 70.201475], [-147.162008, 70.15766], [-146.888161, 70.185044], [-146.510252, 70.185044], [-146.099482, 70.146706], [-145.858496, 70.168614], [-145.622988, 70.08646], [-145.195787, 69.993352], [-144.620708, 69.971444], [-144.461877, 70.026213], [-144.078491, 70.059075], [-143.914183, 70.130275], [-143.497935, 70.141229], [-143.503412, 70.091936], [-143.25695, 70.119321], [-142.747594, 70.042644], [-142.402547, 69.916674], [-142.079408, 69.856428], [-142.008207, 69.801659], [-141.712453, 69.790705], [-141.433129, 69.697597], [-141.378359, 69.63735], [-141.208574, 69.686643], [-141.00045, 69.648304], [-141.00045, 60.304644], [-140.53491, 60.22249], [-140.474664, 60.310121], [-139.987216, 60.184151], [-139.696939, 60.342983], [-139.088998, 60.359413], [-139.198537, 60.091043], [-139.045183, 59.997935], [-138.700135, 59.910304], [-138.623458, 59.767904], [-137.604747, 59.242118], [-137.445916, 58.908024], [-137.265177, 59.001132], [-136.827022, 59.159963], [-136.580559, 59.16544], [-136.465544, 59.285933], [-136.476498, 59.466672], [-136.301236, 59.466672], [-136.25742, 59.625503], [-135.945234, 59.663842], [-135.479694, 59.800766], [-135.025108, 59.565257], [-135.068924, 59.422857], [-134.959385, 59.280456], [-134.701969, 59.247595], [-134.378829, 59.033994], [-134.400737, 58.973748], [-134.25286, 58.858732], [-133.842089, 58.727285], [-133.173903, 58.152206], [-133.075318, 57.998852], [-132.867194, 57.845498], [-132.560485, 57.505928], [-132.253777, 57.21565], [-132.368792, 57.095157], [-132.05113, 57.051341], [-132.127807, 56.876079], [-131.870391, 56.804879], [-131.837529, 56.602232], [-131.580113, 56.613186], [-131.087188, 56.405062], [-130.78048, 56.366724], [-130.621648, 56.268139], [-130.468294, 56.240754], [-130.424478, 56.142169], [-130.101339, 56.114785], [-130.002754, 55.994292], [-130.150631, 55.769737], [-130.128724, 55.583521], [-129.986323, 55.276813], [-130.095862, 55.200136], [-130.336847, 54.920812], [-130.687372, 54.718165], [-130.785957, 54.822227], [-130.917403, 54.789365], [-131.010511, 54.997489], [-130.983126, 55.08512], [-131.092665, 55.189182], [-130.862634, 55.298721], [-130.928357, 55.337059], [-131.158389, 55.200136], [-131.284358, 55.287767], [-131.426759, 55.238474], [-131.843006, 55.457552], [-131.700606, 55.698537], [-131.963499, 55.616383], [-131.974453, 55.49589], [-132.182576, 55.588998], [-132.226392, 55.704014], [-132.083991, 55.829984], [-132.127807, 55.955953], [-132.324977, 55.851892], [-132.522147, 56.076446], [-132.642639, 56.032631], [-132.719317, 56.218847], [-132.527624, 56.339339], [-132.341408, 56.339339], [-132.396177, 56.487217], [-132.297592, 56.67891], [-132.450946, 56.673433], [-132.768609, 56.837741], [-132.993164, 57.034911], [-133.51895, 57.177311], [-133.507996, 57.577128], [-133.677781, 57.62642], [-133.639442, 57.790728], [-133.814705, 57.834544], [-134.072121, 58.053622], [-134.143321, 58.168637], [-134.586953, 58.206976], [-135.074401, 58.502731], [-135.282525, 59.192825], [-135.38111, 59.033994], [-135.337294, 58.891593], [-135.140124, 58.617746], [-135.189417, 58.573931], [-135.05797, 58.349376], [-135.085355, 58.201499], [-135.277048, 58.234361], [-135.430402, 58.398669], [-135.633049, 58.426053], [-135.91785, 58.382238], [-135.912373, 58.617746], [-136.087635, 58.814916], [-136.246466, 58.75467], [-136.876314, 58.962794], [-136.931084, 58.902547], [-136.586036, 58.836824], [-136.317666, 58.672516], [-136.213604, 58.667039], [-136.180743, 58.535592], [-136.043819, 58.382238], [-136.388867, 58.294607], [-136.591513, 58.349376], [-136.59699, 58.212453], [-136.859883, 58.316515], [-136.947514, 58.393192], [-137.111823, 58.393192], [-137.566409, 58.590362], [-137.900502, 58.765624], [-137.933364, 58.869686], [-138.11958, 59.02304], [-138.634412, 59.132579], [-138.919213, 59.247595], [-139.417615, 59.379041], [-139.746231, 59.505011], [-139.718846, 59.641934], [-139.625738, 59.598119], [-139.5162, 59.68575], [-139.625738, 59.88292], [-139.488815, 59.992458], [-139.554538, 60.041751], [-139.801, 59.833627], [-140.315833, 59.696704], [-140.92925, 59.745996], [-141.444083, 59.871966], [-141.46599, 59.970551], [-141.706976, 59.948643], [-141.964392, 60.019843], [-142.539471, 60.085566], [-142.873564, 60.091043], [-143.623905, 60.036274], [-143.892275, 59.997935], [-144.231845, 60.140336], [-144.65357, 60.206059], [-144.785016, 60.29369], [-144.834309, 60.441568], [-145.124586, 60.430614], [-145.223171, 60.299167], [-145.738004, 60.474429], [-145.820158, 60.551106], [-146.351421, 60.408706], [-146.608837, 60.238921], [-146.718376, 60.397752], [-146.608837, 60.485383], [-146.455483, 60.463475], [-145.951604, 60.578491], [-146.017328, 60.666122], [-146.252836, 60.622307], [-146.345944, 60.737322], [-146.565022, 60.753753], [-146.784099, 61.044031], [-146.866253, 60.972831], [-147.172962, 60.934492], [-147.271547, 60.972831], [-147.375609, 60.879723], [-147.758995, 60.912584], [-147.775426, 60.808523], [-148.032842, 60.781138], [-148.153334, 60.819476], [-148.065703, 61.005692], [-148.175242, 61.000215], [-148.350504, 60.803046], [-148.109519, 60.737322], [-148.087611, 60.594922], [-147.939734, 60.441568], [-148.027365, 60.277259], [-148.219058, 60.332029], [-148.273827, 60.249875], [-148.087611, 60.217013], [-147.983549, 59.997935], [-148.251919, 59.95412], [-148.399797, 59.997935], [-148.635305, 59.937689], [-148.755798, 59.986981], [-149.067984, 59.981505], [-149.05703, 60.063659], [-149.204907, 60.008889], [-149.287061, 59.904827], [-149.418508, 59.997935], [-149.582816, 59.866489], [-149.511616, 59.806242], [-149.741647, 59.729565], [-149.949771, 59.718611], [-150.031925, 59.61455], [-150.25648, 59.521442], [-150.409834, 59.554303], [-150.579619, 59.444764], [-150.716543, 59.450241], [-151.001343, 59.225687], [-151.308052, 59.209256], [-151.406637, 59.280456], [-151.592853, 59.159963], [-151.976239, 59.253071], [-151.888608, 59.422857], [-151.636669, 59.483103], [-151.47236, 59.472149], [-151.423068, 59.537872], [-151.127313, 59.669319], [-151.116359, 59.778858], [-151.505222, 59.63098], [-151.828361, 59.718611], [-151.8667, 59.778858], [-151.702392, 60.030797], [-151.423068, 60.211536], [-151.379252, 60.359413], [-151.297098, 60.386798], [-151.264237, 60.545629], [-151.406637, 60.720892], [-151.06159, 60.786615], [-150.404357, 61.038554], [-150.245526, 60.939969], [-150.042879, 60.912584], [-149.741647, 61.016646], [-150.075741, 61.15357], [-150.207187, 61.257632], [-150.47008, 61.246678], [-150.656296, 61.29597], [-150.711066, 61.252155], [-151.023251, 61.180954], [-151.165652, 61.044031], [-151.477837, 61.011169], [-151.800977, 60.852338], [-151.833838, 60.748276], [-152.080301, 60.693507], [-152.13507, 60.578491], [-152.310332, 60.507291], [-152.392486, 60.304644], [-152.732057, 60.173197], [-152.567748, 60.069136], [-152.704672, 59.915781], [-153.022334, 59.888397], [-153.049719, 59.691227], [-153.345474, 59.620026], [-153.438582, 59.702181], [-153.586459, 59.548826], [-153.761721, 59.543349], [-153.72886, 59.433811], [-154.117723, 59.368087], [-154.1944, 59.066856], [-153.750768, 59.050425], [-153.400243, 58.968271], [-153.301658, 58.869686], [-153.444059, 58.710854], [-153.679567, 58.612269], [-153.898645, 58.606793], [-153.920553, 58.519161], [-154.062953, 58.4863], [-153.99723, 58.376761], [-154.145107, 58.212453], [-154.46277, 58.059098], [-154.643509, 58.059098], [-154.818771, 58.004329], [-154.988556, 58.015283], [-155.120003, 57.955037], [-155.081664, 57.872883], [-155.328126, 57.829067], [-155.377419, 57.708574], [-155.547204, 57.785251], [-155.73342, 57.549743], [-156.045606, 57.566174], [-156.023698, 57.440204], [-156.209914, 57.473066], [-156.34136, 57.418296], [-156.34136, 57.248511], [-156.549484, 56.985618], [-156.883577, 56.952757], [-157.157424, 56.832264], [-157.20124, 56.766541], [-157.376502, 56.859649], [-157.672257, 56.607709], [-157.754411, 56.67891], [-157.918719, 56.657002], [-157.957058, 56.514601], [-158.126843, 56.459832], [-158.32949, 56.48174], [-158.488321, 56.339339], [-158.208997, 56.295524], [-158.510229, 55.977861], [-159.375585, 55.873799], [-159.616571, 55.594475], [-159.676817, 55.654722], [-159.643955, 55.829984], [-159.813741, 55.857368], [-160.027341, 55.791645], [-160.060203, 55.720445], [-160.394296, 55.605429], [-160.536697, 55.473983], [-160.580512, 55.567091], [-160.668143, 55.457552], [-160.865313, 55.528752], [-161.232268, 55.358967], [-161.506115, 55.364444], [-161.467776, 55.49589], [-161.588269, 55.62186], [-161.697808, 55.517798], [-161.686854, 55.408259], [-162.053809, 55.074166], [-162.179779, 55.15632], [-162.218117, 55.03035], [-162.470057, 55.052258], [-162.508395, 55.249428], [-162.661749, 55.293244], [-162.716519, 55.222043], [-162.579595, 55.134412], [-162.645319, 54.997489], [-162.847965, 54.926289], [-163.00132, 55.079643], [-163.187536, 55.090597], [-163.220397, 55.03035], [-163.034181, 54.942719], [-163.373752, 54.800319], [-163.14372, 54.76198], [-163.138243, 54.696257], [-163.329936, 54.74555], [-163.587352, 54.614103], [-164.085754, 54.61958], [-164.332216, 54.531949], [-164.354124, 54.466226], [-164.638925, 54.389548], [-164.847049, 54.416933], [-164.918249, 54.603149], [-164.710125, 54.663395], [-164.551294, 54.88795], [-164.34317, 54.893427], [-163.894061, 55.041304], [-163.532583, 55.046781], [-163.39566, 54.904381], [-163.291598, 55.008443], [-163.313505, 55.128935], [-163.105382, 55.183705], [-162.880827, 55.183705], [-162.579595, 55.446598], [-162.245502, 55.682106], [-161.807347, 55.89023], [-161.292514, 55.983338], [-161.078914, 55.939523], [-160.87079, 55.999769], [-160.816021, 55.912138], [-160.931036, 55.813553], [-160.805067, 55.736876], [-160.766728, 55.857368], [-160.509312, 55.868322], [-160.438112, 55.791645], [-160.27928, 55.76426], [-160.273803, 55.857368], [-160.536697, 55.939523], [-160.558604, 55.994292], [-160.383342, 56.251708], [-160.147834, 56.399586], [-159.830171, 56.541986], [-159.326293, 56.667956], [-158.959338, 56.848695], [-158.784076, 56.782971], [-158.641675, 56.810356], [-158.701922, 56.925372], [-158.658106, 57.034911], [-158.378782, 57.264942], [-157.995396, 57.41282], [-157.688688, 57.609989], [-157.705118, 57.719528], [-157.458656, 58.497254], [-157.07527, 58.705377], [-157.119086, 58.869686], [-158.039212, 58.634177], [-158.32949, 58.661562], [-158.40069, 58.760147], [-158.564998, 58.803962], [-158.619768, 58.913501], [-158.767645, 58.864209], [-158.860753, 58.694424], [-158.701922, 58.480823], [-158.893615, 58.387715], [-159.0634, 58.420577], [-159.392016, 58.760147], [-159.616571, 58.929932], [-159.731586, 58.929932], [-159.808264, 58.803962], [-159.906848, 58.782055], [-160.054726, 58.886116], [-160.235465, 58.902547], [-160.317619, 59.072332], [-160.854359, 58.88064], [-161.33633, 58.743716], [-161.374669, 58.667039], [-161.752577, 58.552023], [-161.938793, 58.656085], [-161.769008, 58.776578], [-161.829255, 59.061379], [-161.955224, 59.36261], [-161.703285, 59.48858], [-161.911409, 59.740519], [-162.092148, 59.88292], [-162.234548, 60.091043], [-162.448149, 60.178674], [-162.502918, 59.997935], [-162.760334, 59.959597], [-163.171105, 59.844581], [-163.66403, 59.795289], [-163.9324, 59.806242], [-164.162431, 59.866489], [-164.189816, 60.02532], [-164.386986, 60.074613], [-164.699171, 60.29369], [-164.962064, 60.337506], [-165.268773, 60.578491], [-165.060649, 60.68803], [-165.016834, 60.890677], [-165.175665, 60.846861], [-165.197573, 60.972831], [-165.120896, 61.076893], [-165.323543, 61.170001], [-165.34545, 61.071416], [-165.591913, 61.109754], [-165.624774, 61.279539], [-165.816467, 61.301447], [-165.920529, 61.416463], [-165.915052, 61.558863], [-166.106745, 61.49314], [-166.139607, 61.630064], [-165.904098, 61.662925], [-166.095791, 61.81628], [-165.756221, 61.827233], [-165.756221, 62.013449], [-165.674067, 62.139419], [-165.044219, 62.539236], [-164.912772, 62.659728], [-164.819664, 62.637821], [-164.874433, 62.807606], [-164.633448, 63.097884], [-164.425324, 63.212899], [-164.036462, 63.262192], [-163.73523, 63.212899], [-163.313505, 63.037637], [-163.039658, 63.059545], [-162.661749, 63.22933], [-162.272887, 63.486746], [-162.075717, 63.514131], [-162.026424, 63.448408], [-161.555408, 63.448408], [-161.13916, 63.503177], [-160.766728, 63.771547], [-160.766728, 63.837271], [-160.952944, 64.08921], [-160.974852, 64.237087], [-161.26513, 64.395918], [-161.374669, 64.532842], [-161.078914, 64.494503], [-160.79959, 64.609519], [-160.783159, 64.719058], [-161.144637, 64.921705], [-161.413007, 64.762873], [-161.664946, 64.790258], [-161.900455, 64.702627], [-162.168825, 64.680719], [-162.234548, 64.620473], [-162.541257, 64.532842], [-162.634365, 64.384965], [-162.787719, 64.324718], [-162.858919, 64.49998], [-163.045135, 64.538319], [-163.176582, 64.401395], [-163.253259, 64.467119], [-163.598306, 64.565704], [-164.304832, 64.560227], [-164.80871, 64.450688], [-165.000403, 64.434257], [-165.411174, 64.49998], [-166.188899, 64.576658], [-166.391546, 64.636904], [-166.484654, 64.735489], [-166.413454, 64.872412], [-166.692778, 64.987428], [-166.638008, 65.113398], [-166.462746, 65.179121], [-166.517516, 65.337952], [-166.796839, 65.337952], [-167.026871, 65.381768], [-167.47598, 65.414629], [-167.711489, 65.496784], [-168.072967, 65.578938], [-168.105828, 65.682999], [-167.541703, 65.819923], [-166.829701, 66.049954], [-166.3313, 66.186878], [-166.046499, 66.110201], [-165.756221, 66.09377], [-165.690498, 66.203309], [-165.86576, 66.21974], [-165.88219, 66.312848], [-165.186619, 66.466202], [-164.403417, 66.581218], [-163.981692, 66.592172], [-163.751661, 66.553833], [-163.872153, 66.389525], [-163.828338, 66.274509], [-163.915969, 66.192355], [-163.768091, 66.060908], [-163.494244, 66.082816], [-163.149197, 66.060908], [-162.749381, 66.088293], [-162.634365, 66.039001], [-162.371472, 66.028047], [-162.14144, 66.077339], [-161.840208, 66.02257], [-161.549931, 66.241647], [-161.341807, 66.252601], [-161.199406, 66.208786], [-161.128206, 66.334755], [-161.528023, 66.395002], [-161.911409, 66.345709], [-161.87307, 66.510017], [-162.174302, 66.68528], [-162.502918, 66.740049], [-162.601503, 66.89888], [-162.344087, 66.937219], [-162.015471, 66.778388], [-162.075717, 66.652418], [-161.916886, 66.553833], [-161.571838, 66.438817], [-161.489684, 66.55931], [-161.884024, 66.718141], [-161.714239, 67.002942], [-161.851162, 67.052235], [-162.240025, 66.991988], [-162.639842, 67.008419], [-162.700088, 67.057712], [-162.902735, 67.008419], [-163.740707, 67.128912], [-163.757138, 67.254881], [-164.009077, 67.534205], [-164.211724, 67.638267], [-164.534863, 67.725898], [-165.192096, 67.966884], [-165.493328, 68.059992], [-165.794559, 68.081899], [-166.243668, 68.246208], [-166.681824, 68.339316], [-166.703731, 68.372177], [-166.375115, 68.42147], [-166.227238, 68.574824], [-166.216284, 68.881533], [-165.329019, 68.859625], [-164.255539, 68.930825], [-163.976215, 68.985595], [-163.532583, 69.138949], [-163.110859, 69.374457], [-163.023228, 69.609966], [-162.842489, 69.812613], [-162.470057, 69.982398], [-162.311225, 70.108367], [-161.851162, 70.311014], [-161.779962, 70.256245], [-161.396576, 70.239814], [-160.837928, 70.343876], [-160.487404, 70.453415], [-159.649432, 70.792985], [-159.33177, 70.809416], [-159.298908, 70.760123], [-158.975769, 70.798462], [-158.658106, 70.787508], [-158.033735, 70.831323], [-157.420318, 70.979201], [-156.812377, 71.285909], [-156.565915, 71.351633], [-156.522099, 71.296863], [-155.585543, 71.170894], [-155.508865, 71.083263], [-155.832005, 70.968247], [-155.979882, 70.96277], [-155.974405, 70.809416], [-155.503388, 70.858708], [-155.476004, 70.940862], [-155.262403, 71.017539], [-155.191203, 70.973724], [-155.032372, 71.148986], [-154.566832, 70.990155], [-154.643509, 70.869662], [-154.353231, 70.8368], [-154.183446, 70.7656], [-153.931507, 70.880616], [-153.487874, 70.886093], [-153.235935, 70.924431], [-152.589656, 70.886093], [-152.26104, 70.842277], [-152.419871, 70.606769], [-151.817408, 70.546523], [-151.773592, 70.486276], [-151.187559, 70.382214], [-151.182082, 70.431507], [-150.760358, 70.49723], [-150.355064, 70.491753], [-150.349588, 70.436984], [-150.114079, 70.431507], [-149.867617, 70.508184], [-149.462323, 70.519138], [-149.177522, 70.486276], [-148.78866, 70.404122], [-148.607921, 70.420553], [-148.350504, 70.305537], [-148.202627, 70.349353], [-147.961642, 70.316491], [-147.786379, 70.245291]]], [[[-152.94018, 58.026237], [-152.945657, 57.982421], [-153.290705, 58.048145], [-153.044242, 58.305561], [-152.819688, 58.327469], [-152.666333, 58.562977], [-152.496548, 58.354853], [-152.354148, 58.426053], [-152.080301, 58.311038], [-152.080301, 58.152206], [-152.480117, 58.130299], [-152.655379, 58.059098], [-152.94018, 58.026237]]], [[[-153.958891, 57.538789], [-153.67409, 57.670236], [-153.931507, 57.69762], [-153.936983, 57.812636], [-153.723383, 57.889313], [-153.570028, 57.834544], [-153.548121, 57.719528], [-153.46049, 57.796205], [-153.455013, 57.96599], [-153.268797, 57.889313], [-153.235935, 57.998852], [-153.071627, 57.933129], [-152.874457, 57.933129], [-152.721103, 57.993375], [-152.469163, 57.889313], [-152.469163, 57.599035], [-152.151501, 57.620943], [-152.359625, 57.42925], [-152.74301, 57.505928], [-152.60061, 57.379958], [-152.710149, 57.275896], [-152.907319, 57.325188], [-152.912796, 57.128019], [-153.214027, 57.073249], [-153.312612, 56.991095], [-153.498828, 57.067772], [-153.695998, 56.859649], [-153.849352, 56.837741], [-154.013661, 56.744633], [-154.073907, 56.969187], [-154.303938, 56.848695], [-154.314892, 56.919895], [-154.523016, 56.991095], [-154.539447, 57.193742], [-154.742094, 57.275896], [-154.627078, 57.511404], [-154.227261, 57.659282], [-153.980799, 57.648328], [-153.958891, 57.538789]]], [[[-154.53397, 56.602232], [-154.742094, 56.399586], [-154.807817, 56.432447], [-154.53397, 56.602232]]], [[[-155.634835, 55.923092], [-155.476004, 55.912138], [-155.530773, 55.704014], [-155.793666, 55.731399], [-155.837482, 55.802599], [-155.634835, 55.923092]]], [[[-159.890418, 55.28229], [-159.950664, 55.068689], [-160.257373, 54.893427], [-160.109495, 55.161797], [-160.005433, 55.134412], [-159.890418, 55.28229]]], [[[-160.520266, 55.358967], [-160.33405, 55.358967], [-160.339527, 55.249428], [-160.525743, 55.128935], [-160.690051, 55.211089], [-160.794113, 55.134412], [-160.854359, 55.320628], [-160.79959, 55.380875], [-160.520266, 55.358967]]], [[[-162.256456, 54.981058], [-162.234548, 54.893427], [-162.349564, 54.838658], [-162.437195, 54.931766], [-162.256456, 54.981058]]], [[[-162.415287, 63.634624], [-162.563165, 63.536039], [-162.612457, 63.62367], [-162.415287, 63.634624]]], [[[-162.80415, 54.488133], [-162.590549, 54.449795], [-162.612457, 54.367641], [-162.782242, 54.373118], [-162.80415, 54.488133]]], [[[-165.548097, 54.29644], [-165.476897, 54.181425], [-165.630251, 54.132132], [-165.685021, 54.252625], [-165.548097, 54.29644]]], [[[-165.73979, 54.15404], [-166.046499, 54.044501], [-166.112222, 54.121178], [-165.980775, 54.219763], [-165.73979, 54.15404]]], [[[-166.364161, 60.359413], [-166.13413, 60.397752], [-166.084837, 60.326552], [-165.88219, 60.342983], [-165.685021, 60.277259], [-165.646682, 59.992458], [-165.750744, 59.89935], [-166.00816, 59.844581], [-166.062929, 59.745996], [-166.440838, 59.855535], [-166.6161, 59.850058], [-166.994009, 59.992458], [-167.125456, 59.992458], [-167.344534, 60.074613], [-167.421211, 60.206059], [-167.311672, 60.238921], [-166.93924, 60.206059], [-166.763978, 60.310121], [-166.577762, 60.321075], [-166.495608, 60.392275], [-166.364161, 60.359413]]], [[[-166.375115, 54.01164], [-166.210807, 53.934962], [-166.5449, 53.748746], [-166.539423, 53.715885], [-166.117699, 53.852808], [-166.112222, 53.776131], [-166.282007, 53.683023], [-166.555854, 53.622777], [-166.583239, 53.529669], [-166.878994, 53.431084], [-167.13641, 53.425607], [-167.306195, 53.332499], [-167.623857, 53.250345], [-167.793643, 53.337976], [-167.459549, 53.442038], [-167.355487, 53.425607], [-167.103548, 53.513238], [-167.163794, 53.611823], [-167.021394, 53.715885], [-166.807793, 53.666592], [-166.785886, 53.732316], [-167.015917, 53.754223], [-167.141887, 53.825424], [-167.032348, 53.945916], [-166.643485, 54.017116], [-166.561331, 53.880193], [-166.375115, 54.01164]]], [[[-168.790446, 53.157237], [-168.40706, 53.34893], [-168.385152, 53.431084], [-168.237275, 53.524192], [-168.007243, 53.568007], [-167.886751, 53.518715], [-167.842935, 53.387268], [-168.270136, 53.244868], [-168.500168, 53.036744], [-168.686384, 52.965544], [-168.790446, 53.157237]]], [[[-169.74891, 52.894344], [-169.705095, 52.795759], [-169.962511, 52.790282], [-169.989896, 52.856005], [-169.74891, 52.894344]]], [[[-170.148727, 57.221127], [-170.28565, 57.128019], [-170.313035, 57.221127], [-170.148727, 57.221127]]], [[[-170.669036, 52.697174], [-170.603313, 52.604066], [-170.789529, 52.538343], [-170.816914, 52.636928], [-170.669036, 52.697174]]], [[[-171.742517, 63.716778], [-170.94836, 63.5689], [-170.488297, 63.69487], [-170.280174, 63.683916], [-170.093958, 63.612716], [-170.044665, 63.492223], [-169.644848, 63.4265], [-169.518879, 63.366254], [-168.99857, 63.338869], [-168.686384, 63.295053], [-168.856169, 63.147176], [-169.108108, 63.180038], [-169.376478, 63.152653], [-169.513402, 63.08693], [-169.639372, 62.939052], [-169.831064, 63.075976], [-170.055619, 63.169084], [-170.263743, 63.180038], [-170.362328, 63.2841], [-170.866206, 63.415546], [-171.101715, 63.421023], [-171.463193, 63.306007], [-171.73704, 63.366254], [-171.852055, 63.486746], [-171.742517, 63.716778]]], [[[-172.432611, 52.390465], [-172.41618, 52.275449], [-172.607873, 52.253542], [-172.569535, 52.352127], [-172.432611, 52.390465]]], [[[-173.626584, 52.14948], [-173.495138, 52.105664], [-173.122706, 52.111141], [-173.106275, 52.07828], [-173.549907, 52.028987], [-173.626584, 52.14948]]], [[[-174.322156, 52.280926], [-174.327632, 52.379511], [-174.185232, 52.41785], [-173.982585, 52.319265], [-174.059262, 52.226157], [-174.179755, 52.231634], [-174.141417, 52.127572], [-174.333109, 52.116618], [-174.738403, 52.007079], [-174.968435, 52.039941], [-174.902711, 52.116618], [-174.656249, 52.105664], [-174.322156, 52.280926]]], [[[-176.469116, 51.853725], [-176.288377, 51.870156], [-176.288377, 51.744186], [-176.518409, 51.760617], [-176.80321, 51.61274], [-176.912748, 51.80991], [-176.792256, 51.815386], [-176.775825, 51.963264], [-176.627947, 51.968741], [-176.627947, 51.859202], [-176.469116, 51.853725]]], [[[-177.153734, 51.946833], [-177.044195, 51.897541], [-177.120872, 51.727755], [-177.274226, 51.678463], [-177.279703, 51.782525], [-177.153734, 51.946833]]], [[[-178.123152, 51.919448], [-177.953367, 51.913971], [-177.800013, 51.793479], [-177.964321, 51.651078], [-178.123152, 51.919448]]], [[[-187.107557, 52.992929], [-187.293773, 52.927205], [-187.304726, 52.823143], [-188.90491, 52.762897], [-188.642017, 52.927205], [-188.642017, 53.003883], [-187.107557, 52.992929]]]] } },
        { "type": "Feature", "id": "04", "properties": { "name": "Arizona", "density": 57.05 }, "geometry": { "type": "Polygon", "coordinates": [[[-109.042503, 37.000263], [-109.04798, 31.331629], [-111.074448, 31.331629], [-112.246513, 31.704061], [-114.815198, 32.492741], [-114.72209, 32.717295], [-114.524921, 32.755634], [-114.470151, 32.843265], [-114.524921, 33.029481], [-114.661844, 33.034958], [-114.727567, 33.40739], [-114.524921, 33.54979], [-114.497536, 33.697668], [-114.535874, 33.933176], [-114.415382, 34.108438], [-114.256551, 34.174162], [-114.136058, 34.305608], [-114.333228, 34.448009], [-114.470151, 34.710902], [-114.634459, 34.87521], [-114.634459, 35.00118], [-114.574213, 35.138103], [-114.596121, 35.324319], [-114.678275, 35.516012], [-114.738521, 36.102045], [-114.371566, 36.140383], [-114.251074, 36.01989], [-114.152489, 36.025367], [-114.048427, 36.195153], [-114.048427, 37.000263], [-110.499369, 37.00574], [-109.042503, 37.000263]]] } }
    ]
};




function pdfOrnek2() {
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
                            { text: 'Varsa bir metin falan filan deneme denemedenemedenemedeneme', alignment: 'left', fontSize: 7, margin: [10, 0, 0, 0] },
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
                                    text: 'Konya Büyükşehir Belediyesi Kazı Ruhsatı',
                                    style: 'header1',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                }
                            ]
                        ],
                    }
                },
                { text: 'Proje Bilgileri', style: 'header2' },
                {
                    table: {
                        widths: ['30%', '70%'],
                        body: [
                            [
                                {
                                    text: 'Proje Numarası:',
                                    bold: true,
                                    fontSize: 10,
                                    border: [true, true, false, false]
                                },
                                {
                                    text: '1705444',
                                    fontSize: 10,
                                    border: [false, true, true, false]
                                }
                            ],
                            [
                                {
                                    text: 'Talep Sahibi Kurum:',
                                    bold: true,
                                    fontSize: 10,
                                    border: [true, false, false, false]
                                },
                                {
                                    text: 'Konya Su Ve Kanalizasyon İdaresi',
                                    fontSize: 10,
                                    border: [false, false, true, false]
                                }
                            ],
                            [
                                {
                                    text: 'Talep Sahibi Birim:',
                                    bold: true,
                                    fontSize: 10,
                                    border: [true, false, false, false]
                                },
                                {
                                    text: 'Abone',
                                    fontSize: 10,
                                    border: [false, false, true, false]
                                }
                            ],
                            [
                                {
                                    text: 'Talep Sahibi:',
                                    bold: true,
                                    fontSize: 10,
                                    border: [true, false, false, true]
                                },
                                {
                                    text: 'Aydın Ayhan',
                                    fontSize: 10,
                                    border: [false, false, true, true]
                                }
                            ]
                        ]
                    },
                    margin: [0, 0, 0, 15]
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
                        widths: ['*', '*', '*', '*', '*', '*'],
                        body: [
                            [
                                { text: 'İlçe', bold: true, fontSize: 9 },
                                { text: 'Belediye', bold: true, fontSize: 9 },
                                { text: 'Mahalle', bold: true, fontSize: 9 },
                                { text: 'Cadde Sokak', bold: true, fontSize: 9 },
                                { text: 'O.Başlangıç Tarihi', bold: true, fontSize: 9 },
                                { text: 'O.Bitiş Tarihi', bold: true, fontSize: 9 }
                            ],
                            [
                                { text: 'Value 1', fontSize: 9 },
                                { text: 'Value 2', fontSize: 9 },
                                { text: 'Value 3', fontSize: 9 },
                                { text: 'Value 4', fontSize: 9 },
                                { text: 'Value 5', fontSize: 9 },
                                { text: 'Value 6', fontSize: 9 }
                            ],
                            [
                                { text: 'Value 1', fontSize: 9 },
                                { text: 'Value 2', fontSize: 9 },
                                { text: 'Value 3', fontSize: 9 },
                                { text: 'Value 4', fontSize: 9 },
                                { text: 'Value 5', fontSize: 9 },
                                { text: 'Value 6', fontSize: 9 }
                            ]],
                        fontSize: 6
                    },
                    margin: [0, 0, 0, 10],
                },
                {
                    table: {
                        headerRows: 1,

                        widths: ['20%', '15%', '15%'],
                        body: [
                            [
                                { text: '', fontSize: 9 },
                                { text: 'Toprak Yol', fontSize: 9 },
                                { text: 'Toplam', bold: true, fontSize: 9 }
                            ],
                            [
                                { text: 'İsmail efendi Cad.', fontSize: 9 },
                                { text: '3', fontSize: 9 },
                                { text: '3', fontSize: 9 }
                            ],
                            [
                                { text: 'Toplam', bold: true, fontSize: 9 },
                                { text: '2', fontSize: 9 },
                                { text: '2', fontSize: 9 }
                            ]
                        ]
                    },
                    margin: [0, 0, 0, 10],
                },
                {
                    table: {
                        widths: ['40%', '10%', '40%', '10%'],
                        body: [
                            [
                                {
                                    text: 'Ruhsat Bedeli',
                                    bold: true,
                                    fontSize: 10,
                                    border: [true, true, false, false]
                                },
                                {
                                    text: '227',
                                    fontSize: 10,
                                    border: [false, true, false, false]
                                },
                                {
                                    text: 'Kaplama Bedel Toplam',
                                    bold: true,
                                    fontSize: 10,
                                    border: [false, true, false, false]
                                },
                                {
                                    text: '0',
                                    fontSize: 10,
                                    border: [false, true, true, false]
                                }
                            ],
                            [
                                {
                                    text: 'Yol Yıpranma Bedeli',
                                    bold: true,
                                    fontSize: 10,
                                    border: [true, false, false, false]
                                },
                                {
                                    text: '0',
                                    fontSize: 10,
                                    border: [false, false, false, false]
                                },
                                {
                                    text: 'Alt Yapı Kazı İzin Harcı',
                                    bold: true,
                                    fontSize: 10,
                                    border: [false, false, false, false]
                                },
                                {
                                    text: '0',
                                    fontSize: 10,
                                    border: [false, false, true, false]
                                }
                            ],
                            [
                                {
                                    text: 'Genel Toplam',
                                    bold: true,
                                    fontSize: 10,
                                    border: [true, false, false, true]
                                },
                                {
                                    text: '227',
                                    colSpan: 3,
                                    fontSize: 10,
                                    border: [false, false, true, true]
                                }
                            ]
                        ]
                    },
                    margin: [0, 0, 0, 15]
                },
                { text: 'Yukarıdaki tranşenin açılmasında Belediyemizce sakınca görülmemiştir.', style: 'header3' },
                { text: 'Büyükşehir Altyapı Koordinasyon Kurulunca gerekli işlemlerin yapılmasını rica ederim.', style: 'header4' },
                {
                    table: {
                        widths: ['*', '*', '*'],
                        body: [
                            [
                                {
                                    fontSize: 10,
                                    text: 'Altyapı Koord. Şb. Md.',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                },
                                {
                                    fontSize: 10,
                                    text: 'Fen İşleri Daire Başkanı',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                },
                                {
                                    fontSize: 10,
                                    text: 'Konya Büyükşehir Belediye Başkanın\'a',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                {
                                    fontSize: 10,
                                    text: 'Oğuz YILMAZ',
                                    bold: true,
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                },
                                {
                                    fontSize: 10,
                                    text: 'H.Hüseyin ESENDİYAR',
                                    alignment: 'center',
                                    bold: true,
                                    border: [false, false, false, false]
                                },
                                {
                                    fontSize: 10,
                                    text: 'Ercan USLU',
                                    bold: true,
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                }
                            ],
                            [
                                {
                                    fontSize: 10,
                                    text: 'İnşaat Mühendisi',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                },
                                {
                                    fontSize: 10,
                                    text: 'İnşaat Mühendisi',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                },
                                {
                                    fontSize: 10,
                                    text: 'Genel Sekreter',
                                    alignment: 'center',
                                    border: [false, false, false, false]
                                }
                            ]
                        ]
                    }
                },
                { text: 'Bu döküman üzerindeki bilgiler elektronik olarak imzalanmıştır', style: 'header4' }
                //,{ qr: 'https://beefatura.net/', fit: '75', alignment: 'center', margin: [0, 10] }
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
            //font: string: name of the font
            //fontSize: number: size of the font in pt
            //fontFeatures: string[]: array of advanced typographic features supported in TTF fonts(supported features depend on font file)
            //lineHeight: number: the line height(default : 1)
            //bold: boolean: whether to use bold text(default : false)
            //italics: boolean: whether to use italic text(default : false)
            //alignment: string: (‘left’ or ‘center’ or ‘right’ or ‘justify’) the alignment of the text
            //characterSpacing: number: size of the letter spacing in pt
            //color: string: the color of the text(color name e.g., ‘blue’ or hexadecimal color e.g., ‘#ff5500’)
            //background: string the background color of the text
            //markerColor: string: the color of the bullets in a buletted list
            //decoration: string | string[]: the text decoration to apply(‘underline’ or ‘lineThrough’ or ‘overline’)
            //decorationStyle: string: the style of the text decoration(‘dashed’ or ‘dotted’ or ‘double’ or ‘wavy’)
            //decorationColor: string: the color of the text decoration, see color

        }
    }
    pdfMake.createPdf(docDefinition3).download();
}

//https://codepen.io/catchspider2002/pen/poJbLRY
function pdfOrnek3() {
    // Based on  https://codepen.io/diguifi/pen/YdBbyz
    var canvasElement = document.getElementById("canvas");

    var dd = {


        header: {
            columns: [
                { text: 'HEADER LEFT', style: 'documentHeaderLeft' },
                { text: 'HEADER CENTER', style: 'documentHeaderCenter' },
                { text: 'HEADER RIGHT', style: 'documentHeaderRight' }
            ]
        },
        footer: {
            columns: [
                { text: 'FOOTER LEFT', style: 'documentFooterLeft' },
                { text: 'FOOTER CENTER', style: 'documentFooterCenter' },
                { text: 'FOOTER RIGHT', style: 'documentFooterRight' }
            ]
        },
        content: [
            // Header
            {
                columns: [
                    {
                        image: 'data:image/png;base64,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',
                        width: 150
                    },

                    [
                        {
                            text: 'INVOICE',
                            style: 'invoiceTitle',
                            width: '*'
                        },
                        {
                            stack: [
                                {
                                    columns: [
                                        {
                                            text: 'Invoice #',
                                            style: 'invoiceSubTitle',
                                            width: '*'

                                        },
                                        {
                                            text: '00001',
                                            style: 'invoiceSubValue',
                                            width: 100

                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text: 'Date Issued',
                                            style: 'invoiceSubTitle',
                                            width: '*'
                                        },
                                        {
                                            text: 'June 01, 2016',
                                            style: 'invoiceSubValue',
                                            width: 100
                                        }
                                    ]
                                },
                                {
                                    columns: [
                                        {
                                            text: 'Due Date',
                                            style: 'invoiceSubTitle',
                                            width: '*'
                                        },
                                        {
                                            text: 'June 05, 2016',
                                            style: 'invoiceSubValue',
                                            width: 100
                                        }
                                    ]
                                },
                            ]
                        }
                    ],
                ],
            },
            // Billing Headers
            {
                columns: [
                    {
                        text: 'Billing From',
                        style: 'invoiceBillingTitle',

                    },
                    {
                        text: 'Billing To',
                        style: 'invoiceBillingTitle',

                    },
                ]
            },
            // Billing Details
            {
                columns: [
                    {
                        text: 'Your Name \n Your Company Inc.',
                        style: 'invoiceBillingDetails'
                    },
                    {
                        text: 'Client Name \n Client Company',
                        style: 'invoiceBillingDetails'
                    },
                ]
            },
            // Billing Address Title
            {
                columns: [
                    {
                        text: 'Address',
                        style: 'invoiceBillingAddressTitle'
                    },
                    {
                        text: 'Address',
                        style: 'invoiceBillingAddressTitle'
                    },
                ]
            },
            // Billing Address
            {
                columns: [
                    {
                        text: '9999 Street name 1A \n New-York City NY 00000 \n   USA',
                        style: 'invoiceBillingAddress'
                    },
                    {
                        text: '1111 Other street 25 \n New-York City NY 00000 \n   USA',
                        style: 'invoiceBillingAddress'
                    },
                ]
            },
            // Line breaks
            '\n\n',
            // Items
            {
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 1,
                    widths: ['*', 40, 'auto', 40, 'auto', 80],

                    body: [
                        // Table Header
                        [
                            {
                                text: 'Product',
                                style: 'itemsHeader'
                            },
                            {
                                text: 'Qty',
                                style: ['itemsHeader', 'center']
                            },
                            {
                                text: 'Price',
                                style: ['itemsHeader', 'center']
                            },
                            {
                                text: 'Tax',
                                style: ['itemsHeader', 'center']
                            },
                            {
                                text: 'Discount',
                                style: ['itemsHeader', 'center']
                            },
                            {
                                text: 'Total',
                                style: ['itemsHeader', 'center']
                            }
                        ],
                        // Items
                        // Item 1
                        [
                            [
                                {
                                    text: 'Item 1',
                                    style: 'itemTitle'
                                },
                                {
                                    text: 'Item Description',
                                    style: 'itemSubTitle'

                                }
                            ],
                            {
                                text: '1',
                                style: 'itemNumber'
                            },
                            {
                                text: '$999.99',
                                style: 'itemNumber'
                            },
                            {
                                text: '0%',
                                style: 'itemNumber'
                            },
                            {
                                text: '0%',
                                style: 'itemNumber'
                            },
                            {
                                text: '$999.99',
                                style: 'itemTotal'
                            }
                        ],
                        // Item 2
                        [
                            [
                                {
                                    text: 'Item 2',
                                    style: 'itemTitle'
                                },
                                {
                                    text: 'Item Description',
                                    style: 'itemSubTitle'

                                }
                            ],
                            {
                                text: '1',
                                style: 'itemNumber'
                            },
                            {
                                text: '$999.99',
                                style: 'itemNumber'
                            },
                            {
                                text: '0%',
                                style: 'itemNumber'
                            },
                            {
                                text: '0%',
                                style: 'itemNumber'
                            },
                            {
                                text: '$999.99',
                                style: 'itemTotal'
                            }
                        ],
                        // END Items
                    ]
                }, // table
                //  layout: 'lightHorizontalLines'
            },
            // TOTAL
            {
                table: {
                    // headers are automatically repeated if the table spans over multiple pages
                    // you can declare how many rows should be treated as headers
                    headerRows: 0,
                    widths: ['*', 80],

                    body: [
                        // Total
                        [
                            {
                                text: 'Subtotal',
                                style: 'itemsFooterSubTitle'
                            },
                            {
                                text: '$2000.00',
                                style: 'itemsFooterSubValue'
                            }
                        ],
                        [
                            {
                                text: 'Tax 21%',
                                style: 'itemsFooterSubTitle'
                            },
                            {
                                text: '$523.13',
                                style: 'itemsFooterSubValue'
                            }
                        ],
                        [
                            {
                                text: 'TOTAL',
                                style: 'itemsFooterTotalTitle'
                            },
                            {
                                text: '$2523.93',
                                style: 'itemsFooterTotalValue'
                            }
                        ],
                    ]
                }, // table
                layout: 'lightHorizontalLines'
            },
            // Signature
            {
                columns: [
                    {
                        text: '',
                    },
                    {
                        stack: [
                            {
                                text: '_________________________________',
                                style: 'signaturePlaceholder'
                            },
                            {
                                text: 'Your Name',
                                style: 'signatureName'

                            },
                            {
                                text: 'Your job title',
                                style: 'signatureJobTitle'

                            }
                        ],
                        width: 180
                    },
                ]
            },
            {
                text: 'NOTES',
                style: 'notesTitle'
            },
            {
                text: 'Some notes goes here \n Notes second line',
                style: 'notesText'
            }
        ],
        styles: {
            // Document Header
            documentHeaderLeft: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'left'
            },
            documentHeaderCenter: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'center'
            },
            documentHeaderRight: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'right'
            },
            // Document Footer
            documentFooterLeft: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'left'
            },
            documentFooterCenter: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'center'
            },
            documentFooterRight: {
                fontSize: 10,
                margin: [5, 5, 5, 5],
                alignment: 'right'
            },
            // Invoice Title
            invoiceTitle: {
                fontSize: 22,
                bold: true,
                alignment: 'right',
                margin: [0, 0, 0, 15]
            },
            // Invoice Details
            invoiceSubTitle: {
                fontSize: 12,
                alignment: 'right'
            },
            invoiceSubValue: {
                fontSize: 12,
                alignment: 'right'
            },
            // Billing Headers
            invoiceBillingTitle: {
                fontSize: 14,
                bold: true,
                alignment: 'left',
                margin: [0, 20, 0, 5],
            },
            // Billing Details
            invoiceBillingDetails: {
                alignment: 'left'

            },
            invoiceBillingAddressTitle: {
                margin: [0, 7, 0, 3],
                bold: true
            },
            invoiceBillingAddress: {

            },
            // Items Header
            itemsHeader: {
                margin: [0, 5, 0, 5],
                bold: true
            },
            // Item Title
            itemTitle: {
                bold: true,
            },
            itemSubTitle: {
                italics: true,
                fontSize: 11
            },
            itemNumber: {
                margin: [0, 5, 0, 5],
                alignment: 'center',
            },
            itemTotal: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'center',
            },

            // Items Footer (Subtotal, Total, Tax, etc)
            itemsFooterSubTitle: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'right',
            },
            itemsFooterSubValue: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'center',
            },
            itemsFooterTotalTitle: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'right',
            },
            itemsFooterTotalValue: {
                margin: [0, 5, 0, 5],
                bold: true,
                alignment: 'center',
            },
            signaturePlaceholder: {
                margin: [0, 70, 0, 0],
            },
            signatureName: {
                bold: true,
                alignment: 'center',
            },
            signatureJobTitle: {
                italics: true,
                fontSize: 10,
                alignment: 'center',
            },
            notesTitle: {
                fontSize: 10,
                bold: true,
                margin: [0, 50, 0, 3],
            },
            notesText: {
                fontSize: 10
            },
            center: {
                alignment: 'center',
            },
        },
        defaultStyle: {
            columnGap: 20,
        }
    }

    var docDefinition = {
        content: [
            {
                alignment: "center",
                text: "PPRA",
                style: "header",
                fontSize: 23,
                bold: true,
                margin: [0, 10]
            },
            {
                margin: [0, 0, 0, 10],
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return rowIndex % 2 === 0 ? "#ebebeb" : "#f5f5f5";
                    }
                },
                table: {
                    widths: ["100%"],
                    heights: [20, 10],
                    body: [
                        [
                            {
                                text: "SETOR: ADMINISTRATIVO",
                                fontSize: 9,
                                bold: true
                            }
                        ],
                        [
                            {
                                text: "FUNÇÃO: DIRETOR DE ENSINO",
                                fontSize: 9,
                                bold: true
                            }
                        ]
                    ]
                }
            },
            {
                style: "tableExample",
                layout: {
                    fillColor: function (rowIndex, node, columnIndex) {
                        return rowIndex === 0 ? "#c2dec2" : null;
                    }
                },
                table: {
                    widths: ["30%", "10%", "25%", "35%"],
                    heights: [10, 10, 10, 10, 30, 10, 25],
                    headerRows: 1,
                    body: [
                        [
                            {
                                text: "AGENTE: Não Identificados",
                                colSpan: 3,
                                bold: true,
                                fontSize: 9
                            },
                            {},
                            {},
                            {
                                text: "GRUPO: Grupo 1 - Riscos Físicos",
                                fontSize: 9,
                                bold: true
                            }
                        ],
                        [
                            {
                                text: "Limite de Tolerância:",
                                fontSize: 9,
                                bold: true
                            },
                            {
                                text: "Meio de Propagação:",
                                colSpan: 3,
                                fontSize: 9,
                                bold: true
                            },
                            {},
                            {}
                        ],
                        [
                            {
                                text: [
                                    "Frequência: ",
                                    {
                                        text: "Habitual",
                                        bold: false
                                    }
                                ],
                                fontSize: 9,
                                bold: true
                            },
                            {
                                text: [
                                    "Classificação do Efeito: ",
                                    {
                                        text: "Leve",
                                        bold: false
                                    }
                                ],
                                colSpan: 3,
                                fontSize: 9,
                                bold: true
                            },
                            {},
                            {}
                        ],
                        [
                            {
                                text: "Tempo de Exposição:",
                                colSpan: 2,
                                fontSize: 9,
                                bold: true
                            },
                            {},
                            {
                                text: "Medição:",
                                colSpan: 2,
                                fontSize: 9,
                                bold: true
                            },
                            {}
                        ],
                        [
                            {
                                text: "Fonte Geradora:",
                                border: [true, true, false, false],
                                colSpan: 2,
                                fontSize: 9,
                                bold: true
                            },
                            {},
                            {
                                text: "Téc. Utilizada:",
                                border: [false, true, true, false],
                                colSpan: 2,
                                fontSize: 9,
                                bold: true
                            },
                            {}
                        ],
                        [
                            {
                                text: "Conclusão:",
                                border: [true, false, true, true],
                                colSpan: 4,
                                fontSize: 9,
                                bold: true
                            },
                            {},
                            {},
                            {}
                        ],
                        [
                            {
                                text: "EPIs/EPCs:",
                                border: [true, true, false, true],
                                colSpan: 3,
                                fontSize: 9,
                                bold: true
                            },
                            {},
                            {},
                            {
                                text: "CAs:",
                                border: [false, true, true, true],
                                fontSize: 9,
                                bold: true
                            }
                        ]
                    ]
                }
            }
        ]
    };

    // let docDef = dd;
    // let docDef = docDefinition;

    function render() {
        pdfMake.createPdf(dd).getDataUrl(function (dataURL) {
            renderPDF(dataURL, document.getElementById("canvas"));
        });
    }

    function download() {
        var pdf = createPdf(dd);
        pdf.download("PPRA.pdf");
    }

    // * this is not important for PDFMake, it's here just to render the result *
    // It's a Mozilla lib called PDFjs that handles pdf rendering
    function renderPDF(url, canvasContainer, options) {
        options = options || { scale: 1.4 };

        function renderPage(page) {
            var viewport = page.getViewport(options.scale);
            var wrapper = document.createElement("div");
            wrapper.className = "canvas-wrapper";
            var canvas = document.createElement("canvas");
            var ctx = canvas.getContext("2d");
            var renderContext = {
                canvasContext: ctx,
                viewport: viewport
            };

            canvas.height = viewport.height;
            canvas.width = viewport.width;
            wrapper.appendChild(canvas);
            canvasContainer.appendChild(wrapper);

            page.render(renderContext);
        }

        function renderPages(pdfDoc) {
            for (var num = 1; num <= pdfDoc.numPages; num++)
                pdfDoc.getPage(num).then(renderPage);
        }

        PDFJS.disableWorker = true;
        PDFJS.getDocument(url).then(renderPages);
    }

}














//const canvasElement = document.getElementById("canvas");

//function printPdf(action) {
//    const docDefinition = {
//        content: [
//            {
//                alignment: 'center',
//                text: 'PPRA',
//                style: 'header',
//                fontSize: 23,
//                bold: true,
//                margin: [0, 10],
//            },
//            {
//                margin: [0, 0, 0, 10],
//                layout: {
//                    fillColor: function (rowIndex, node, columnIndex) {
//                        return (rowIndex % 2 === 0) ? '#ebebeb' : '#f5f5f5';
//                    }
//                },
//                table: {
//                    widths: ['100%'],
//                    heights: [20, 10],
//                    body: [
//                        [
//                            {
//                                text: 'SETOR: ADMINISTRATIVO',
//                                fontSize: 9,
//                                bold: true,
//                            }
//                        ],
//                        [
//                            {
//                                text: 'FUNÇÃO: DIRETOR DE ENSINO',
//                                fontSize: 9,
//                                bold: true
//                            }
//                        ],
//                    ],
//                }
//            },
//            {
//                style: 'tableExample',
//                layout: {
//                    fillColor: function (rowIndex, node, columnIndex) {
//                        return (rowIndex === 0) ? '#c2dec2' : null;
//                    }
//                },
//                table: {
//                    widths: ['30%', '10%', '25%', '35%'],
//                    heights: [10, 10, 10, 10, 30, 10, 25],
//                    headerRows: 1,
//                    body: [
//                        [
//                            {
//                                text: 'AGENTE: Não Identificados',
//                                colSpan: 3,
//                                bold: true,
//                                fontSize: 9
//                            },
//                            {
//                            },
//                            {
//                            },
//                            {
//                                text: 'GRUPO: Grupo 1 - Riscos Físicos',
//                                fontSize: 9,
//                                bold: true
//                            }
//                        ],
//                        [
//                            {
//                                text: 'Limite de Tolerância:',
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                                text: 'Meio de Propagação:',
//                                colSpan: 3,
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                            },
//                            {
//                            }
//                        ],
//                        [
//                            {
//                                text: [
//                                    'Frequência: ',
//                                    {
//                                        text: 'Habitual',
//                                        bold: false
//                                    }
//                                ],
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                                text: [
//                                    'Classificação do Efeito: ',
//                                    {
//                                        text: 'Leve',
//                                        bold: false
//                                    }
//                                ],
//                                colSpan: 3,
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                            },
//                            {
//                            }
//                        ],
//                        [
//                            {
//                                text: 'Tempo de Exposição:',
//                                colSpan: 2,
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                            },
//                            {
//                                text: 'Medição:',
//                                colSpan: 2,
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                            }
//                        ],
//                        [
//                            {
//                                text: 'Fonte Geradora:',
//                                border: [true, true, false, false],
//                                colSpan: 2,
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                            },
//                            {
//                                text: 'Téc. Utilizada:',
//                                border: [false, true, true, false],
//                                colSpan: 2,
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                            }
//                        ],
//                        [
//                            {
//                                text: 'Conclusão:',
//                                border: [true, false, true, true],
//                                colSpan: 4,
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                            },
//                            {
//                            },
//                            {
//                            }
//                        ],
//                        [
//                            {
//                                text: 'EPIs/EPCs:',
//                                border: [true, true, false, true],
//                                colSpan: 3,
//                                fontSize: 9,
//                                bold: true
//                            },
//                            {
//                            },
//                            {
//                            },
//                            {
//                                text: 'CAs:',
//                                border: [false, true, true, true],
//                                fontSize: 9,
//                                bold: true
//                            }
//                        ],
//                    ]
//                }
//            }
//        ]
//    };

//    if (action === 1) {
//        pdfMake.createPdf(docDefinition).getDataUrl((dataURL) => {
//            renderPDF(dataURL, document.getElementById('canvas'));
//        });
//    }
//    else if (action === 2) {
//        const pdf = createPdf(docDefinition);
//        pdf.download('PPRA.pdf');
//    }
//}





//// * this is not important for PDFMake, it's here just to render the result *
//// It's a Mozilla lib called PDFjs that handles pdf rendering directly on the browser
//function renderPDF(url, canvasContainer, options) {
//    options = options || { scale: 1.4 };

//    function renderPage(page) {
//        const viewport = page.getViewport(options.scale);
//        const wrapper = document.createElement("div");
//        wrapper.className = "canvas-wrapper";
//        const canvas = document.createElement('canvas');
//        const ctx = canvas.getContext('2d');
//        const renderContext = {
//            canvasContext: ctx,
//            viewport: viewport
//        };

//        canvas.height = viewport.height;
//        canvas.width = viewport.width;
//        wrapper.appendChild(canvas)
//        canvasContainer.appendChild(wrapper);

//        page.render(renderContext);
//    }

//    function renderPages(pdfDoc) {
//        for (let num = 1; num <= pdfDoc.numPages; num++)
//            pdfDoc.getPage(num).then(renderPage);
//    }

//    PDFJS.disableWorker = true;
//    PDFJS.getDocument(url).then(renderPages);
//}
var certf;
function dangildanSertifikaOku() {

    $("#spinnerAciklamaGir").text("Dangıl Üzerinden Sertifikalar Okunuyor. Lütfen Bekleyiniz...");
    $(".islem-loading").toggleClass('sk-loading');


    // Set ArkSigner license key.
    pwsigner.setLicenseKey('OFxam9q8GBxE80x0JxBWgnxa9doaSCpnPS6JGT/ref1J89XPzet+8/EhdlrFoxYCvSfQKhnQNtDVHNpXrflhTbuFWTqnmMXTGswBeZnzeVYri+QH2xhPrMAcH12Zm23HNbfhphM/S0FBDkf2CSw7sgjfQIK2vRKC9ukD0ZYpJztqtuUAu0QJkrPJXXtWSsWk0h/5ny/Klp7fPUL1AfDnRJpSQV94fhWzjFxehdaVlQy1JHFWl7X73AI8jBz/Dx2I+WhwkJ0M0GDEshhWLwlvgBtSeRG6J6PHUM03TWJedW5Df5K2yCxmLh7Kch1t2DRNamIYtLqr80iQZct+DE2snQ==');

    // Assign ArkSigner init event.
    pwsigner.initialize(onPWSigner_Initialize);

    /////////////////////////////////////////////
    // ArkSigner Callbacks
    /////////////////////////////////////////////
    function onPWSigner_Initialize(code, json) {
        if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
            $("#arkStatus").text("ArkSigner başarı ile yüklendi");

            // List devices.
            pwsigner.smartCard.listTerminals(onPWSigner_ListTerminals, {});
        } else {
            var _error = processErrorCode(code, json);
            UyariVer("Hata", _error, false, 10000);
        }
    }
    function onPWSigner_ListTerminals(code, json) {
        if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
            $("#arkStatus").text("ArkSigner device list success");

            var terminals = pwsigner.parseJSON(json);

            $.each(terminals, function (index, element) {

                var o = new Option(Base64.decode(element.terminal), Base64.decode(element.slotId) + ',' + Base64.decode(element.library));
                //$(o).html(Base64.decode(element.terminal));
                $("#Cihaz_Id").append(o);
                $("#Cihaz_Id:first-child").text(Base64.decode(element.terminal));
                $("#Cihaz_Id:first-child").val(Base64.decode(element.slotId) + ',' + Base64.decode(element.library));

                // List certs.
                pwsigner.smartCard.listCertificates(onPWSigner_ListCertificates, {
                    library: Base64.decode(element.library),
                    slotId: Base64.decode(element.slotId)
                });
            });
        } else {
            var _error = processErrorCode(code, json);
            UyariVer("Hata", _error, false, 10000);
        }
    }

    function onPWSigner_ListCertificates(code, json) {

        if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
            $("#arkStatus").text("ArkSigner cert list success");

            var certs = pwsigner.parseJSON(json);

            $(certs).each(function (index, element) {
                var o = new Option(Base64.decode(element.commonName), Base64.decode(element.serialNumber) + ',' + hexToBase64(element.certificateHex));
                //$(o).html(Base64.decode(element.commonName));
                $("#Sertifika_Id").append(o);
                $("#Sertifika_Id:first-child").text(Base64.decode(element.commonName));
                $("#Sertifika_Id:first-child").val(Base64.decode(element.serialNumber) + "," + hexToBase64(element.certificateHex));

            });
        } else {
            var _error = processErrorCode(code, json);
            UyariVer("Hata", _error, false, 10000);
        }
    }
    ////////////////////////////////////////////////////////////////
    //   ArkSigner RESPONSE CODE MESSAGES
    ////////////////////////////////////////////////////////////////
    var textMessages = [];

    textMessages[PWSigner.prototype.codes.RESPONSE_SUCCESSFUL] = 'Islem basari ile gerçeklestirilmistir.';
    textMessages[PWSigner.prototype.codes.ERROR_NO_CLIENT] = 'ArkSigner Uygulamasi Bulunamamistir. Bilgisayariniza indirmek için <a href="http://arksigner.com/indir" target="_blank">tiklayiniz</a>';
    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_INITIALIZE_SIGNER] = 'ArkSigner Uygulamasi Baslatilamamistir.';
    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_LOAD_LICENSE] = 'ArkSigner Lisansi Geçersizdir.';
    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_START_PWSIGNER_CLIENT] = 'ArkSigner Uygulamasi Baslatilamamistir.';
    textMessages[PWSigner.prototype.codes.ERROR_INVALID_CERTIFICATE] = 'Kullanmak istediginiz sertifika geçersizdir.';
    textMessages[PWSigner.prototype.codes.ERROR_INVALID_CERTIFICATE_SERIAL_NUMBER] = 'Kullanmak istediginiz sertifikanin seri numarasi geçersizdir.';
    textMessages[PWSigner.prototype.codes.ERROR_NO_SIGNING_CERTIFICATE_FOUND] = 'Herhangi bir imzalama sertifikasi bulunamamistir.';
    textMessages[PWSigner.prototype.codes.ERROR_NO_TERMINAL_FOUND] = 'Takili herhangi bir akilli kart bulunamamistir.';
    textMessages[PWSigner.prototype.codes.ERROR_NO_TERMINAL_FOR_PROVIDED_SLOT_ID_AND_CARD_TYPE] = 'Geçersiz slot numarasi ve kart tipi.';
    textMessages[PWSigner.prototype.codes.ERROR_SIGNER_IS_NOT_INITIALIZED] = 'ArkSigner uygulamasi baslatilmamistir.';
    textMessages[PWSigner.prototype.codes.ERROR_SMART_CARD_EXCEPTION] = 'Akilli kart uygulamasi hatasi.';
    textMessages[PWSigner.prototype.codes.ERROR_UNDEFINED_SIGNER_EXCEPTION] = 'Tanimsiz hata. Site yöneticisi ile iletisime geçiniz.';

    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_LOAD_POLICY_FILE] = 'e-imza politikasi dosyasi yüklenememektedir.';

    textMessages[PWSigner.prototype.codes.ERROR_INVALID_CMS_CONTENT_TO_SIGN] = 'Imzalanmak istenen veri geçersizdir.';
    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_SET_SIGNING_TIME] = 'Imzalama zamani set edilememektedir.';
    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_LOGIN_TO_THE_SIGNER] = 'Akilli karta login olunamamaktadir.';
    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_SIGN_CMS_DOCUMENT] = 'Veri imzalanamamaktadir.';
    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_LOGOUT_SIGNER] = 'Akilli karttan logout olunamamaktadir.';
    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_VALIDATE_CERTIFICATE] = 'Imzalama sertifikasi dogrulanamamaktadir.';

    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_REVOCATION_CHECK_FAILURE] = 'Imzalama sertifikasi geçerliligi kontrol edilememektedir.';
    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_SELF_CHECK_FAILURE] = 'Imzalama sertifikasi geçerliligi kontrol edilememektedir.';
    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_NO_TRUSTED_CERT_FOUND] = 'Akilli Kart Üzerinde Geçerli Imzalama Sertifikasi Bulunmamaktadir.';
    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_PATH_VALIDATION_FAILURE] = 'Imzalama sertifikasi zinciri dogrulanamamaktadir.';
    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_NOT_CHECKED] = 'Imzalama sertifikasi geçerliligi kontrol edilememektedir.';
    textMessages[PWSigner.prototype.codes.ERROR_INVALID_URL] = 'Lisans ile farkli bir adres üzerinden uygulamayi çalistirmaya çalisiyorsunuz.';
    textMessages[PWSigner.prototype.codes.ERROR_INVALID_PIN] = 'Hatali sifre girdiniz.';
    textMessages[PWSigner.prototype.codes.ERROR_NO_DRIVER_FOUND] = 'Yüklü driver bulunamamistir.';
    textMessages[PWSigner.prototype.codes.ERROR_NO_EXTENSION] = 'You are currently using Chrome Browser. The PW WebSigner Extension is not installed yet. If you would like to sign documents, please install the extension first. If you confirm, a new tab with the installation page will be opened.';


    textMessages[PWSigner.prototype.codes.ERROR_NOT_BROWSER_CHROME] = 'Lütfen Chrome tarayici kullaniniz.';
    textMessages[PWSigner.prototype.codes.ERROR_DISCONNECT] = '';
    textMessages[PWSigner.prototype.codes.ERROR_UNDEFINED] = 'Tanimsiz Hata. Lütfen web sitesi yöneticileri ile iletisime geçiniz.';
    textMessages[PWSigner.prototype.codes.ERROR_PIN_LOCKED] = 'PIN bloke edilmis. Kullanmak için blokeyi kaldiriniz.';
    textMessages[PWSigner.prototype.codes.ERROR_TASK_TIMEOUT] = 'Islem zaman asimina ugramistir.';
    textMessages[PWSigner.prototype.codes.ERROR_NO_PRIVATE_KEY_FOUND_CORRESPONDING_TO_PUBLIC_KEY] = 'Seçili Sertifika ile iliskilendirilmis imzalama anahtari bulunamamistir. Sistem Yetkilisi ile iletisime geçiniz.';

    function hexToBase64(str) {
        $(".islem-loading").removeClass('sk-loading');
        $('#imzaBilgisiModal').modal('show');
        $("#imzaBilgisiModalImzala").prop("disabled", false);
        return btoa(String.fromCharCode.apply(null,
            str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
        );
    }

    function processErrorCode(code, json) {
        $(".islem-loading").removeClass('sk-loading');

        $('#imzaBilgisiModal').modal('hide');

        var text = textMessages[code];
        if (!text) {
            text = 'Tanimsiz hata: ' + code;
        }
        return text;
    }

    function createHexString(arr) {
        var result = "";
        var z;

        for (var i = 0; i < arr.length; i++) {
            var str = arr[i].toString(16);

            z = 8 - str.length + 1;
            str = Array(z).join("0") + str;

            result += str;
        }

        return result;
    }
}

var formData;
function BelgEImzala() {

    ////$("#spinnerAciklamaGir").text("İmzalama İşlemi Gerçekleştiriliyor. Lütfen Bekleyiniz...");
    ////$(".islem-loading").toggleClass('sk-loading');

    //$('#loadingBar').attr("data-curtain-text", "İmzalanıyor...");
    //$('#loadingBar').addClass("is-active");
    var _certValue = $('#Sertifika_Id').val().split(',');
    var sertifikaBase64 = _certValue[1];
    var _pincode = $('#Sifre').val();
    //var islemTipiId = $("#IslemTipi_Id").val();
    //var islemDurumId = $("#IslemDurum_Id").val();

    formData = new FormData();
    //var serializeData = $("#EImzaModalForm").serializeArray();
    //$.each(serializeData, function (key, input) {
    //    formData.append(input.name, input.value);
    //});

    formData.append("sertifikaBase64", sertifikaBase64);

    //if ($("#IslemTipi_Id").val() != @((int)Enums.IslemTipi.PAKET_OLUSTUR)) {

    var file = document.getElementById("Dosya").files[0];
    formData.append("Dosya", file);
    
    //}
    //        else {
    //    var ustYazi = document.getElementById("UstYazi").files[0];
    //    formData.append("UstYazi", ustYazi);

    //    var ek1 = document.getElementById("Ek1").files[0];
    //    formData.append("Ek1", ek1);

    //    var ek2 = document.getElementById("Ek2").files[0];
    //    formData.append("Ek2", ek2);

    //    var ek3 = document.getElementById("Ek3").files[0];
    //    formData.append("Ek3", ek3);
    //}
    $.ajax({
        type: "POST",
        url: "/api/Imza/ImzaInitialize",
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        async: false,
        success: function (resultData) {
            console.log(resultData);
            if (resultData.IslemSonucu) {
                var digestToBeSigned = resultData.Model.DigestBase64;
                var transactionUUID = resultData.Model.TransactionUU_Id;

                var cihazVal = $('#Cihaz_Id').val();
                var _slotId = cihazVal.split(",")[0];
                var _library = cihazVal.split(",")[1];
                var _certValue = $('#Sertifika_Id').val().split(',');
                var _certSerialNumber = _certValue[0];

                try {
                    pwsigner.smartCard.signPKCS1Padding1(function (code, json) {

                        if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
                            var signingResponse = pwsigner.parseJSON(json);
                            var signatureBase64 = signingResponse[0].signature;

                            //////////////////////////////////////////////////////////
                            // ADIM 5 - imzalanan signedAttributes bilgisini
                            //          sunucuya gönder, imzalama işlemini tamamlat
                            //////////////////////////////////////////////////////////

                            $('#loadingBar').removeClass("is-active");
                            $('#loadingBar').attr("data-curtain-text", "XAdES imza tamamlanıyor...");
                            $('#loadingBar').addClass("is-active");

                            var urlFinalize = '@Url.Action("Finalize", "Home")';
                            $.ajax({
                                method: "POST",
                                url: "/api/Imza/ImzaFinalize",
                                dataType: "json",
                                data: {
                                    'transactionUuid': transactionUUID,
                                    'signatureBase64': signatureBase64,
                                    'islemDurumId': 0
                                },
                                async: false,
                                success: function (result) {
                                    $('#loadingBar').removeClass("is-active");
                                    $(".islem-loading").removeClass('sk-loading');

                                    UyariVer(result.Baslik, result.Icerik, result.IslemSonucu, result.GozukmeSuresi);

                                    if (result.IslemSonucu) {
                                        $('#imzaBilgisiModal').modal('hide');
                                        setTimeout(function () { window.location.reload(); }, 2000);
                                    }

                                    return result.IslemSonucu;
                                },
                                error: function (result) {
                                    $(".islem-loading").removeClass('sk-loading');
                                    $('#loadingBar').removeClass("is-active");
                                    UyariVer("Hata", "İmzalama İşlemi Sırasında Bir Hata oluştu", false, 6000);
                                    return false;
                                }
                            });
                        } else {
                            $(".islem-loading").removeClass('sk-loading');
                            $('#loadingBar').removeClass("is-active");
                            var _error = processErrorCode(code, json);
                            UyariVer("Hata", _error, false, 10000);
                        }
                    }, {
                        library: _library,
                        slotId: _slotId,
                        certSerialNumber: _certSerialNumber,
                        dataBase64: digestToBeSigned,
                        pincode: _pincode,
                        isAttached: true,
                        addSigningTime: true
                    });
                } catch (err) {
                    $(".islem-loading").removeClass('sk-loading');
                    UyariVer("Hata", err, false, 10000);
                }
            }
            else {
                $(".islem-loading").removeClass('sk-loading');
                UyariVer(resultData.Baslik, resultData.Icerik, resultData.IslemSonucu, resultData.GozukmeSuresi);
            }
        }
    });

   
};

function UyariVer(Baslik, Icerik, IslemSonucu, gozukmeSuresi) {
    MesajVer(Baslik + "---" + Icerik + "---" + IslemSonucu, MesajDurumu.Info);
    //var shortCutFunction = "success";
    //if (!IslemSonucu)
    //    shortCutFunction = "error";

    //toastr.options = {
    //    closeButton: true,
    //    debug: false,
    //    progressBar: true,
    //    positionClass: 'toast-top-right',
    //    onclick: null,
    //    showDuration: '400',
    //    hideDuration: '1000',
    //    timeOut: gozukmeSuresi,
    //    extendedTimeOut: '1000',
    //    showEasing: 'swing',
    //    hideEasing: 'linear',
    //    showMethod: 'fadeIn',
    //    hideMethod: 'fadeOut'
    //};

    //toastr[shortCutFunction](Icerik, Baslik);
};

function BelgEImzala2() {
    var _certValue = $('#Sertifika_Id').val().split(',');
    var sertifikaBase64 = _certValue[1];
    var _pincode = $('#Sifre').val();
   
    formData = new FormData();

    formData.append("sertifikaBase64", sertifikaBase64);
    var file = document.getElementById("Dosya").files[0];
    formData.append("Dosya", file);
    
    $.ajax({
        type: "POST",
        url: "/api/Imza/ImzaInitialize",
        dataType: "json",
        data: formData,
        contentType: false,
        processData: false,
        async: false,
        success: function (resultData) {
            if (resultData.IslemSonucu) {
                var digestToBeSigned = resultData.Model.DigestBase64;
                var transactionUUID = resultData.Model.TransactionUU_Id;

                var cihazVal = $('#Cihaz_Id').val();
                var _slotId = cihazVal.split(",")[0];
                var _library = cihazVal.split(",")[1];
                var _certValue = $('#Sertifika_Id').val().split(',');
                var _certSerialNumber = _certValue[0];

                try {
                    pwsigner.smartCard.signPKCS1Padding1(function (code, json) {
                        debugger;
                        if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
                            var signingResponse = pwsigner.parseJSON(json);
                            var signatureBase64 = signingResponse[0].signature;

                            //////////////////////////////////////////////////////////
                            // ADIM 5 - imzalanan signedAttributes bilgisini
                            //          sunucuya gönder, imzalama işlemini tamamlat
                            //////////////////////////////////////////////////////////

                            $('#loadingBar').removeClass("is-active");
                            $('#loadingBar').attr("data-curtain-text", "XAdES imza tamamlanıyor...");
                            $('#loadingBar').addClass("is-active");

                            var urlFinalize = '@Url.Action("Finalize", "Home")';
                            $.ajax({
                                method: "POST",
                                url: "/api/Imza/ImzaFinalize",
                                dataType: "json",
                                data: { 'transactionUuid': transactionUUID, 'signatureBase64': signatureBase64, 'islemDurumId': islemDurumId },
                                async: false,
                                success: function (result) {
                                    $('#loadingBar').removeClass("is-active");
                                    $(".islem-loading").removeClass('sk-loading');

                                    UyariVer(result.Baslik, result.Icerik, result.IslemSonucu, result.GozukmeSuresi);

                                    if (result.IslemSonucu) {
                                        $('#imzaBilgisiModal').modal('hide');
                                        setTimeout(function () { window.location.reload(); }, 2000);
                                    }

                                    return result.IslemSonucu;
                                },
                                error: function (result) {
                                    $(".islem-loading").removeClass('sk-loading');
                                    $('#loadingBar').removeClass("is-active");
                                    UyariVer("Hata", "İmzalama İşlemi Sırasında Bir Hata oluştu", false, 6000);
                                    return false;
                                }
                            });
                        } else {
                            $(".islem-loading").removeClass('sk-loading');
                            $('#loadingBar').removeClass("is-active");
                            var _error = processErrorCode(code, json);
                            UyariVer("Hata", _error, false, 10000);
                        }
                    }, {
                        library: _library,
                        slotId: _slotId,
                        certSerialNumber: _certSerialNumber,
                        dataBase64: digestToBeSigned,
                        pincode: _pincode,
                        isAttached: true,
                        addSigningTime: true
                    });
                } catch (err) {
                    $(".islem-loading").removeClass('sk-loading');
                    UyariVer("Hata", err, false, 10000);
                }
            }
            else {
                $(".islem-loading").removeClass('sk-loading');
                UyariVer(resultData.Baslik, resultData.Icerik, resultData.IslemSonucu, resultData.GozukmeSuresi);
            }
        }
    });
};


function createPDF() {
    var dd = fncSerIrsaliyePdf();
    pdfMake.createPdf(dd).download('teslimat_irsaliyesi.pdf');
}

function fncSerIrsaliyePdf() {
    var logoBase64 = 'data:image/png;base64,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'; // logoBase64 içeriğini kendi base64 stringiniz ile değiştirin

    var dd = {
        content: [
            {
                columns: [
                    {
                        image: logoBase64,
                        width: 75 // logo genişliğini ayarlayabilirsiniz
                    },
                    {
                        text: 'KONYA BÜYÜKŞEHİR BELEDİYESİ\nTESLİMAT İRSALİYESİ',
                        style: 'header',
                        alignment: 'center',
                        margin: [0, 20, 0, 0] // logoya göre metni ortalamak için üstten boşluk ekleyebilirsiniz
                    }
                ]
            },
            {
                table: {
                    widths: ['*', '*', '*'],
                    body: [
                        [
                            { text: 'Adı Soyadı', style: 'tableHeader' },
                            { text: 'Gelir Çeşidi', style: 'tableHeader' },
                            { text: 'Miktarı (TL)', style: 'tableHeader' }
                        ],
                        [
                            {
                                text: 'AYK_PROJE.BAS\nVURUSAHIBI',
                                style: 'tableCell'
                            },
                            { text: 'Geçici teminat', style: 'tableCell' },
                            { text: '', style: 'tableCell' }
                        ],
                        [
                            {
                                text: 'MEDAŞ A.Ş.\nAYKOME PROJE NO 174045',
                                rowSpan: 3,
                                style: 'tableCell'
                            },
                            { text: 'Yol Bozma bedeli (Kaplama bedeli) (406)', style: 'tableCell' },
                            { text: '181.743,00 TL', style: 'tableCell' }
                        ],
                        [
                            '',
                            { text: 'Altyapı Kazı İzni Harcı', style: 'tableCell' },
                            { text: '329,46 TL', style: 'tableCell' }
                        ],
                        [
                            '',
                            { text: 'Belge Ücreti (350)', style: 'tableCell' },
                            { text: '', style: 'tableCell' }
                        ],
                        [
                            { text: '', style: 'tableCell' },
                            { text: '', style: 'tableCell' },
                            { text: '182.072,46 TL', style: 'tableHeader' }
                        ]
                    ]
                },
                margin: [0, 20, 0, 0],
                layout: 'lightHorizontalLines'
            },
            {
                text: 'KONYA BÜYÜKŞEHİR BELEDİYESİ BAŞKANLIĞI\nALTYAPI YATIRIM HESABI: TR360001500158007300084495 YATIRILMASI',
                style: 'footer',
            },
            {
                table: {
                    widths: ['*', '*', '*', '*'],
                    body: [
                        [
                            { text: 'MEDAŞ A.Ş. AYKOME\nPROJE NO: 174045', style: 'tableCell' },
                            { text: 'dan', style: 'tableCell' },
                            { text: '182.072,46 TL', style: 'tableCell' },
                            { text: 'tahsil edilerek makbuzun\nverilmesi uygundur.', style: 'tableCell' },
                        ]
                    ]
                },
                margin: [0, 20, 0, 0],
                layout: 'lightHorizontalLines'
            }, 
            {
                text: '19.12.2023',
                style: 'tableCell',
                alignment: 'right'
            },
            {
                text: 'İlgili Daire Amiri',
                style: 'tableCell',
                alignment: 'right'
            }
        ],
        styles: {
            header: {
                fontSize: 14,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            tableHeader: {
                bold: true,
                fontSize: 12,
                color: 'black'
            },
            tableCell: {
                margin: [0, 5, 0, 5],
                fontSize: 10
            },
            footer: {
                fontSize: 10,
                margin: [0, 10, 0, 0],
                bold: true,
            }
        }
    };
    return dd;
    //pdfMake.createPdf(dd).download('teslimat_irsaliyesi.pdf');
}
function uploadPDF() {
    var dd = fncSerIrsaliyePdf();
    pdfMake.createPdf(dd).getBlob(function (blob) {
        var formData = new FormData();
        formData.append('file', blob, 'teslimat_irsaliyesi.pdf');

        fetch('/api/Api_Aykome/uploadIrsaliye', {
            method: 'POST',
            body: formData
        }).then(response => response.json())
            .then(data => {
                console.log('Success:', data);
            }).catch(error => {
                console.error('Error:', error);
            });
    });
}

//var url = '@Url.Action("Initialize", "Home")';
//$.ajax({
//    type: "POST",
//    url: url,
//    dataType: "json",
//    data: formData,
//    contentType: false,
//    processData: false,
//    async: false,
//    success: function (resultData) {

//        if (resultData.IslemSonucu) {
//            var digestToBeSigned = resultData.Model.DigestBase64;
//            var transactionUUID = resultData.Model.TransactionUU_Id;

//            var cihazVal = $('#Cihaz_Id').val();
//            var _slotId = cihazVal.split(",")[0];
//            var _library = cihazVal.split(",")[1];
//            var _certValue = $('#Sertifika_Id').val().split(',');
//            var _certSerialNumber = _certValue[0];
//            try {
//                pwsigner.smartCard.signPKCS1Padding1(function (code, json) {
//                    if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
//                        var signingResponse = pwsigner.parseJSON(json);
//                        var signatureBase64 = signingResponse[0].signature;

//                        //////////////////////////////////////////////////////////
//                        // ADIM 5 - imzalanan signedAttributes bilgisini
//                        //          sunucuya gönder, imzalama işlemini tamamlat
//                        //////////////////////////////////////////////////////////

//                        $('#loadingBar').removeClass("is-active");
//                        $('#loadingBar').attr("data-curtain-text", "XAdES imza tamamlanıyor...");
//                        $('#loadingBar').addClass("is-active");

//                        var urlFinalize = '@Url.Action("Finalize", "Home")';
//                        $.ajax({
//                            method: "POST",
//                            url: urlFinalize,
//                            dataType: "json",
//                            data: { 'transactionUuid': transactionUUID, 'signatureBase64': signatureBase64, 'islemDurumId': islemDurumId },
//                            async: false,
//                            success: function (result) {
//                                $('#loadingBar').removeClass("is-active");
//                                $(".islem-loading").removeClass('sk-loading');

//                                UyariVer(result.Baslik, result.Icerik, result.IslemSonucu, result.GozukmeSuresi);

//                                if (result.IslemSonucu) {
//                                    $('#imzaBilgisiModal').modal('hide');
//                                    setTimeout(function () { window.location.reload(); }, 2000);
//                                }

//                                return result.IslemSonucu;
//                            },
//                            error: function (result) {
//                                $(".islem-loading").removeClass('sk-loading');
//                                $('#loadingBar').removeClass("is-active");
//                                UyariVer("Hata", "İmzalama İşlemi Sırasında Bir Hata oluştu", false, 6000);
//                                return false;
//                            }
//                        });
//                    } else {
//                        $(".islem-loading").removeClass('sk-loading');
//                        $('#loadingBar').removeClass("is-active");
//                        var _error = processErrorCode(code, json);
//                        UyariVer("Hata", _error, false, 10000);
//                    }
//                }, {
//                    library: _library,
//                    slotId: _slotId,
//                    certSerialNumber: _certSerialNumber,
//                    dataBase64: digestToBeSigned,
//                    pincode: _pincode,
//                    isAttached: true,
//                    addSigningTime: true
//                });
//            } catch (err) {
//                $(".islem-loading").removeClass('sk-loading');
//                UyariVer("Hata", err, false, 10000);
//            }
//        }
//        else {
//            $(".islem-loading").removeClass('sk-loading');
//            UyariVer(resultData.Baslik, resultData.Icerik, resultData.IslemSonucu, resultData.GozukmeSuresi);
//        }
//    },
//    error: function (result) {
//        $(".islem-loading").removeClass('sk-loading');
//        UyariVer("Hata", "İmzalama İşlemi Sırasında Bir Hata oluştu", false, 6000);
//    }
//});
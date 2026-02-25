var map, isRequestInProgress = false,
    isRequestInProgress2 = false;
zxc.baslarken(function () {
    fncIlkAcilis(true);
    fncHaritaOlustur();
    zxc('.chbKatOnOf1').change(fncChbWfsOnOf);

    document.getElementById('fullscreenBtn').addEventListener('click', function () {
        const katmLanDiv = document.getElementById('katmLanDiv');
        katmLanDiv.classList.toggle('fullscreen');
        map.invalidateSize();
    });
})

function fncIlkAcilis(Tanim = false) {

    GetJson('/api/Api_Genel/GetDashboard/' + Tanim, function (data) {
        var html;
        
        if (data.veri2) {
            const veriArray = data.veri2;
            const Data = [], Labels = [];
            veriArray.forEach(item => {
                Data.push(item.Key);
                Labels.push(item.Val);
            });
            fncChartCalistir('charProjeTipi', Data, Labels, 'Proje Tipi', 'bar');
        }

        if (data.veri3) {
            const veriArray = data.veri3;
            const Data = [], Labels = [];
            veriArray.forEach(item => {
                Data.push(item.Key);
                Labels.push(item.Val);
            });

            fncChartCalistir('charDurumTipi', Data, Labels, 'Proje Durum', 'bar');
        }
        if (data.veri4) {
            const veriArray = data.veri4;
            const Data = [], Labels = [];
            veriArray.forEach(item => {
                Data.push(item.Key);
                Labels.push(item.Val);
            });

            fncChartCalistir('charKurum', Data, Labels, 'Kurum', 'bar');
        }
        if (data.veri5) {
            const veriArray = data.veri5;
            const Data = [], Labels = [];
            veriArray.forEach(item => {
                Data.push(item.Key);
                Labels.push(item.Val);
            });

            fncChartCalistir('charIlce', Data, Labels, 'İlçe', 'bar');
        }
        if (data.veri6) {
            const veriArray = data.veri6;
            const Data = [], Labels = [];
            veriArray.forEach(item => {
                Data.push(item.Key);
                Labels.push(item.Val);
            });

            fncChartCalistir('charAylik', Data, Labels, 'Ay', 'line');
        }
        //if (data.veri7)
        //    zxc('#lblSpnProjeAdet').html(data.veri7);
    })
}

function fncChartCalistir(dom, Data, Labels, Llabel, chartTip) {
    const ctx = document.getElementById(dom);
    if (chartTip == 'bar') {

        const backgroundColors = [];
        const borderColors = [];

        Data.forEach(() => {
            const color = randomColor();
            backgroundColors.push(color);
            borderColors.push(color);
        });

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: Labels,
                datasets: [{
                    label: Llabel,
                    data: Data,
                    borderWidth: 1,
                    backgroundColor: backgroundColors,
                    borderColor: borderColors
                }]
            },
            options: {
                indexAxis: 'y',
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

    }
    if (chartTip == 'line') {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: Labels,
                datasets: [{
                    label: Llabel,
                    data: Data,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            }
        });
    }
}

function randomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

//#region Harita
function fncHaritaOlustur() {

    map = new L.Map('map', {
        //crs: L.CRS.EPSG4326,
        center: new L.LatLng(37.8716, 32.4846),
        zoom: 13
    });

    var yandexLayer = new L.Yandex('map', {
        apiKey: '04735742-6880-4928-bdd3-e226083031b0',
        maxZoom: 21
    });
    L.control.layers({
        "Konya Kent Rehberi": L.tileLayer('https://kbs.konya.bel.tr/kbsilcecache/service/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=basemap_wgs&style=&tilematrixSet=EPSG%3A900913&format=image%2Fpng&height=256&width=256&tilematrix=EPSG%3A900913%3A{z}&tilerow={y}&tilecol={x}', {
            //"Konya Kent Rehberi": L.tileLayer('https://kbs.konya.bel.tr/kbsilcecache/service/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=basemap_wgs&style=&tilematrixSet=EPSG%3A4326&format=image%2Fpng&height=256&width=256&tilematrix=EPSG%3A4326%3A{z}&tilerow={y}&tilecol={x}', {
            maxZoom: 21,
            minZoom: 0
        }).addTo(map),
        "OpenStreetMap": L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 21,
            minZoom: 0,
            attribution: '&copy; <a href="http://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        }),
        "Google (Roadmap)": L.tileLayer('http://mt0.google.com/vt/lyrs=m&hl=en&x={x}&y={y}&z={z}', {
            attribution: 'google',
            maxZoom: 21,
            minZoom: 0
        }),
        "Google (Roadmap2)": L.tileLayer('http://mt0.google.com/vt/lyrs=r&hl=en&x={x}&y={y}&z={z}', {
            attribution: 'google',
            maxZoom: 21,
            minZoom: 0
        }),
        "Google (Satellite)": L.tileLayer('http://mt0.google.com/vt/lyrs=s&hl=en&x={x}&y={y}&z={z}', {
            attribution: 'google',
            maxZoom: 21,
            minZoom: 0
        }),
        "Google (Hybrid)": L.tileLayer('http://mt0.google.com/vt/lyrs=y&hl=en&x={x}&y={y}&z={z}', {
            attribution: 'google',
            maxZoom: 21,
            minZoom: 0
        }),
        "Yandex": yandexLayer
        // , "Bing": bingLayer // Bing Haritasını kontrol katmanına ekleyin
    },
        {
            "NIP_ARAZI_KULLANIM": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'NIP_ARAZI_KULLANIM',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "paftalar": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'paftalar',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "TESCILLI_ALAN": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'TESCILLI_ALAN',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_BINA": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_BINA',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_ILCE": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_ILCE',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_MAHALLE": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_MAHALLE',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_NUMARATAJ": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_NUMARATAJ',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_TASINMAZ": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_TASINMAZ',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_YOL": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_YOL',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            })
        },
        { position: 'topright', collapsed: false }
    ).addTo(map);
    map.on('moveend', function () {
        if (!isRequestInProgress) {
            zxc('#domYukleniyor').css('display', 'flex');
            isRequestInProgress = true;
            fncWfsKatmanInstall()
                .then(() => {
                    zxc('#domYukleniyor').css('display', 'none');
                    isRequestInProgress = false;
                })
                .catch((error) => {
                    isRequestInProgress = false;
                    alert("hata=" + error.message);
                });
        }
    });

    map.on('contextmenu', function (e) {
        curLatLng = "Enlem:  " + e.latlng.lat + "\r\nBoylam:  " + e.latlng.lng;
    });


    const lblEnl = document.getElementById('lblEnl'),
        lblByl = document.getElementById('lblByl');
    map.on('mousemove', function (e) {
        lblEnl.innerHTML = e.latlng.lat.toFixed(5);
        lblByl.innerHTML = e.latlng.lng.toFixed(5);
    })

    //fncKatmanHazirla();
    map.doubleClickZoom.disable();
    fncWfsKatmanInstall();
}

function fncKatmanHazirla() {
    var ref = zxc.parseQuery("projeref");
    if (ref == "")
        ref = -1;
    GetJson('/api/Api_Harita/GetKatmanList/' + ref, function (data) {
        var html = "";
        if (data.veri != null) {
            veriList = data.veri;
            for (var i = 0; i < veriList.length; i++) {
                html = html.concat(`
                 <li>
                        <div class="fdsf">
                            <div class="vgsdf">
                                <div class="vg1">
                                <input class="form-check-input chbKatALLoNoF" type="checkbox" />
                                <span> ${veriList[i].Adi}</span>
                            </div>
                           <a class="kataacs"><span class="bx bx-chevron-up"></span></a>
                        </div>
                    <div class="fvd">`);
                var altKtm = veriList[i].WfsKatmanInfoParam.WfsKatmanDetayParams;
                for (var d = 0; d < altKtm.length; d++) {
                    var Lchecked = "";
                    if (altKtm[d].Title == "AYKOME_YOL_WFS" || altKtm[d].Title == "AYKOME_MAHALLE_WFS" || altKtm[d].Title == "AYKOME_ILCE_WFS") Lchecked = "checked='checked'";

                    html = html.concat(`<div class="sbbhd1" >
                          <div class="rns" style="background-color:${altKtm[d].RenkKodu}"></div>
                          <input class="form-check-input chbKatOnOf" type="checkbox" ${Lchecked} data-refid="${veriList[i].DbKatmanID}" data-id="${altKtm[d].WfsKatmanDetayID}" data-katmantip="${veriList[i].KatmanTipi}" data-birimid="${altKtm[d].BirimId}" data-birim="${altKtm[d].Birim}" data-name="${altKtm[d].Name}" data-zoom="${altKtm[d].ZoomDurumu}" data-renkkodu="${altKtm[d].RenkKodu}" data-title="${altKtm[d].Title}" >
                    <a class="btnKtmnShow">${altKtm[d].Title}</a>
                      </div>`);
                }
                html = html.concat("<div></li>");
            }
            zxc('#lstKatman').html(html);

            zxc('.chbKatOnOf').change(fncChbWfsOnOf);
            zxc('.chbKatOnOf1').change(fncChbWfsOnOf);
            zxc('.kataacs').click(function () {
                var q = this,
                    w = zxc(q).ustElement().birSonrakiElement().dom,
                    e = zxc(w).classVarmi("of");
                if (e) {
                    zxc(w).classSil("of");
                    zxc(q).ilkElement().attr("class", "bx bx-chevron-up")
                }
                else {
                    zxc(w).classEkle("of");
                    zxc(q).ilkElement().attr("class", "bx bx-chevron-down")
                }
            });
            zxc('.chbKatALLoNoF').change(function () {
                var c = this,
                    v = zxc(c).ustElement(1).birSonrakiElement().dom;// dom nesnesi

                v.querySelectorAll(".chbKatOnOf").forEach(g => g.checked = c.checked);
                fncChbWfsOnOf();
            });

            zxc('.chbfF').change(function () {
                var c = this;// dom nesnesi

                document.querySelectorAll(".chbKatALLoNoF").forEach(g => g.checked = c.checked);
                document.querySelectorAll(".chbKatOnOf").forEach(g => g.checked = c.checked);
                fncChbWfsOnOf();
            });


        }

        if (data.veri3 != null) {
            html = '<option value="-1">Seç</option>';
            data.veri3.forEach(q => html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            document.getElementById('txtPrjTipi').innerHTML = html;
            document.getElementById('txtPrjTipi').onchange = fncPrjTipSecildiginde;
        }

        if (data.veri2 != null)
            gydirmeLst = data.veri2;

        if (data.veri4 != null) {
            html = '<option value="-1">Seç</option>';
            data.veri4.forEach(q => html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            document.getElementById('slclIlce').innerHTML = html;
            document.getElementById('slclIlce').onchange = fncIlceSecildiginde;
        }

        var prjref = zxc.parseQuery("projeref")
        if (prjref != "") {
            czmYtk = data.veri5;
            if (czmYtk == false)
                zxc('#btn-edtip').attr('hidden', 'hidden');
            fncChbWfsOnOf();
            fncProrefGet(prjref);
        }
        var xx1 = zxc.parseQuery("x"), yy1 = zxc.parseQuery("y");
        if (xx1 != "" && yy1 != "") {
            fncChbWfsOnOf();
        }

    }, function () {
        zxc('#domYukleniyor').css('display', 'flex');
    }, function () {
        zxc('#domYukleniyor').css('display', 'none');
    })
}

function fncWfsKatmanInstall() {
    return new Promise((resolve, reject) => {
        katman = [];
        fncKatmanKaldir();
        var q = document.querySelectorAll('.chbKatOnOf'),
            zoomLevel = map.getZoom();


        var indexxCpy = 0;
        for (var indexx = 0; indexx < q.length; indexx++) {
            var zoom = parseInt(q[indexx].getAttribute('data-zoom'));
            indexxCpy = indexx;
            if (q[indexx].checked == true && zoom <= zoomLevel) {
                ALTYAPIdata = true;
                var DbKatmanID = q[indexx].getAttribute('data-refid'),
                    katmantip = parseInt(q[indexx].getAttribute('data-katmantip')),
                    WfsKatmanDetayID = q[indexx].getAttribute('data-id'),
                    KatmanRenk = q[indexx].getAttribute('data-renkkodu'),
                    BirimID = q[indexx].getAttribute('data-birimid'),
                    Birim = q[indexx].getAttribute('data-birim'),
                    title = q[indexx].getAttribute('data-title');
                fncWfsKatmanYukle(DbKatmanID, WfsKatmanDetayID, katmantip, KatmanRenk, BirimID, Birim, title)
                    .then(() => {

                        resolve();
                        ALTYAPIdata = false;
                        if ((indexxCpy + 1) == q.length) {
                            fncKatmanbringToFront("AYKOME_MAHALLE_WFS").then(() => {
                                fncKatmanbringToFront("AYKOME_YOL_WFS").then(() => {
                                    fncKatmanbringToFront("GunlukKazi1").then(() => {
                                        var _lyrs = editableLayers.getLayers();
                                        for (var i = 0; i < _lyrs.length; i++)
                                            _lyrs[i].bringToFront();
                                    });
                                });
                            });

                        }
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            //else
            //    resolve();
        }

        var q1 = document.querySelectorAll('.chbKatOnOf1');
        var indexxCpy2 = 0;
        for (var indexx = 0; indexx < q1.length; indexx++) {
            indexxCpy2 = indexx;
            if (q1[indexx].checked == true) {
                Aykomedata = true;
                var Katmantip = q1[indexx].getAttribute('data-tip'),
                    KatmanRenk = q1[indexx].getAttribute('data-renkkodu');
                fncGetAykomeKazi(KatmanRenk, Katmantip)
                    .then(() => {
                        // console.log("bitti2" + " " + (indexxCpy2 + 1) + " " + indexx + " " + q1.length);
                        resolve();
                        Aykomedata = false;
                        fncKatmanbringToFront("GunlukKazi1").then(() => {

                        });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            else
                resolve();
        }

        // console.log("bitti3");
    });
    // map.fitBounds(katman[katman.length - 1].KatmanJson.getBounds());

    //for (var i = 0; i < q.length; i++) {
    //    var zoom = q[i].getAttribute('data-zoom');
    //    console.log("i=", i, "; checked=", q[i].checked, "q.length", (i <= q.length));
    //    if (q[i].checked == true && zoom <= zoomLevel) {
    //        var DbKatmanID = q[i].getAttribute('data-refid'),
    //            katmantip = parseInt(q[i].getAttribute('data-katmantip')),
    //            WfsKatmanDetayID = q[i].getAttribute('data-id'),
    //            KatmanRenk = q[i].getAttribute('data-renkkodu');
    //        // fncWfsKatmanYukle(DbKatmanID, WfsKatmanDetayID, katmantip, KatmanRenk);

    //        //fncWfsKatmanYukle(DbKatmanID, WfsKatmanDetayID, katmantip, KatmanRenk)
    //        //    .then(() => {
    //        //        // Başarılı tamamlanma durumunda yapılacak işlemler
    //        //    })
    //        //    .catch((error) => {
    //        //        // Hata durumunda yapılacak işlemler
    //        //        alert("hata=" + error.message);
    //        //    });
    //    }
    //}




}

function fncKatmanKaldir() {
    this.map.eachLayer(function (layer) {
        if (!layer._url) {
            if (layer.feature)
                if (layer.feature.id)
                    this.map.removeLayer(layer);
        }
    }, this);
    //this.map.eachLayer(function (layer) {
    //    if (layer.feature != undefined && layer.feature.id != undefined)
    //        console.log(layer.feature.id)
    //});

    //setTimeout(q => document.querySelector('.leaflet-control-layers-overlays .leaflet-control-layers-selector').checked = true, 500)
}

function fncChbWfsOnOf() {

    if (!isRequestInProgress) {
        isRequestInProgress = true;
        fncWfsKatmanInstall()
            .then(() => {
                isRequestInProgress = false;
                if (katman) {
                    //var curkatman = katman.find(q => q.RefID == we.getAttribute('data-refid'));
                    //if (curkatman)
                    // map.fitBounds(curkatman.KatmanJson.getBounds());
                }
            })
            .catch((error) => {
                isRequestInProgress = false;
                alert("hata=" + error.message);
            });
    }
}

function fncGetAykomeKazi(renk, tip) {
    return new Promise((resolve, reject) => {
        var bounds = map.getBounds();
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();
        PostJson('/api/Api_Harita/GetAykomeKazi', {
            GuneyBatiEnlem: southWest.lng,
            GuneyBatiBoylam: southWest.lat,
            KuzeyBatiEnlem: northEast.lng,
            KuzeyBBatiBoylam: northEast.lat,
            RefKatID: tip
        }, function (d) {
            try {
                var xmlString = d.veri;
                var jsonj1 = JSON.parse(xmlString);
                var curkatman = L.geoJson(jsonj1, {
                    style: {
                        weight: 5,
                        opacity: 1,
                        color: renk,
                        dashArray: '1',
                        fillOpacity: 0.7
                    }
                    , onEachFeature: onEachFeatureKazi
                }
                ).addTo(this.map);
                // this.map.fitBounds(curkatman.getBounds());


                var prjref = zxc.parseQuery("projeref")
                if (prjref != "") {
                    map.eachLayer(function (layer) {
                        if (!layer._url) {
                            if (layer.feature) {
                                if (layer.feature.properties.PROJEREF == prjref) {
                                    layer.on('dblclick', fncCizimiSilOpn);
                                }
                            }
                        }
                    });
                }
                curkatman.eachLayer(function (layer) {
                    toggleBlinking(layer, renk);
                });

                resolve();
            } catch (e) {
                reject(e);
            }
        });
    });
}

// Yanıp sönme efektini sağlayacak fonksiyon
function toggleBlinking(layer, renk) {
    const polylineElement = layer.getElement();
    polylineElement.classList.add('blinking-polyline');
    layer.on('mouseover', function () {
        polylineElement.classList.remove('blinking-polyline');
    });
    layer.on('mouseout', function () {
        polylineElement.classList.add('blinking-polyline');
    });
}

function onEachFeatureKazi(feature, layer) {
    layer.on({
        //mouseover: highlightFeature,
        //mouseout: resetHighlight,
        click: fncKaziClick
    });
}

function fncKaziClick(e) {
    var target = e.target;

    var KaziRef = target.feature.properties["KaziRef"],
        PROJEREF = target.feature.properties["PROJEREF"];

    if (KaziRef != undefined && PROJEREF != undefined)
        fncProrefInfoGet(PROJEREF, KaziRef);
    
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
                <td>${k[i].UZUNLUK.toString().replace(".", ",")}</td>
                <td>${k[i].EN.toString().replace(".", ",")}</td>
                <td>${k[i].DERINLIK.toString().replace(".", ",")}</td>
                <td>${k[i].ALAN.toString().replace(".", ",")}</td>
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
        <td>${q[i].MIKTAR.toString().replace(".", ",")}</td>
        </tr>`;
    return h;
}
//#endregion


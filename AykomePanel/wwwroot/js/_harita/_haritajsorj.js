var yuklenenKatman,
    map,
    editableLayers,
    veriList = [],
    isRequestInProgress = false,
    isRequestInProgress2 = false,
    katman = [],
    gelenWms = null;

zxc.baslarken(function () {
    zxc('.chbKatOnOf1').checked(false)



    // DXF dosyasını yükleme işlemi
    var fileInput = document.getElementById('flinput');
    fileInput.type = 'file';
    fileInput.accept = '.dxf';
    fileInput.addEventListener('change', function () {
        var file = fileInput.files[0];
        var reader = new FileReader();


        //var sourceCrs = '+proj=utm +zone=18 +datum=WGS84 +units=m +no_defs';
        //var destCrs = '+proj=longlat +datum=WGS84 +no_defs';
        // Koordinat dönüşüm parametreleri (UTM 36N için)
        var sourceCrs = '+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs';
        var destCrs = '+proj=longlat +datum=WGS84 +no_defs';


        reader.onload = function (event) {
            var contents = event.target.result;

            var parser = new DxfParser();
            var dxf = parser.parseSync(contents);

            // DXF içeriğini Leaflet ile haritaya ekleme
            dxf.entities.forEach(function (entity) {

                if (entity.type === 'LINE') {
                    var startPoint = proj4(sourceCrs, destCrs, [entity.vertices[0].x, entity.vertices[0].y]);
                    var endPoint = proj4(sourceCrs, destCrs, [entity.vertices[1].x, entity.vertices[1].y]);

                    var latlngs = [
                        [startPoint[1], startPoint[0]],
                        [endPoint[1], endPoint[0]]
                    ];

                    var plyLine = L.polyline(latlngs).addTo(map);

                    map.fitBounds(plyLine.getBounds());
                }
                // Diğer geometrik öğeler için gerekli işlemleri yapabilirsiniz
            });
        };

        reader.readAsText(file);
    });


    fncHaritaOlustur();
    zxc('#btnInsert').click(fncprojeOlst);
    zxc('#filMusteriFotograf').change(fncMustResmYuk);
    /* fncModalAc("#mdlVeri");*/

    const menu = document.getElementById('mdlMenu');

    window.addEventListener('contextmenu', function (e) {

        e.preventDefault();
        if (koordinatDizisi.length > 0 && menu.style.display != "block" && zxc('#mdlVeri').css('display') != "block") {
            fncPrjInputClear();
            gelenWms = null;
            menu.style.display = 'block';
            menu.style.left = `${e.pageX}px`;
            menu.style.top = `${e.pageY}px`;

            //var latlng = e.latlng;
            //var point = map.latLngToContainerPoint(latlng);

            var bounds = map.getBounds();
            var southWest = bounds.getSouthWest();
            var northEast = bounds.getNorthEast();

            var width = map.getSize().x;
            var height = map.getSize().y;

            // var bbox = [southWest.lng, southWest.lat, northEast.lng, northEast.lat].join(',');
            var bbox = [southWest.lat, southWest.lng, northEast.lat, northEast.lng].join(',');
            var i = parseInt(e.x);
            var j = parseInt(e.y);

            fncGetWmsKatman(southWest.lat, southWest.lng, northEast.lat, northEast.lng, i, j, width, height, "AYKOME_MAHALLE");//AYK_MAHALLE
            // fncGetWmsKatman(southWest.lng, northEast.lng, southWest.lat, northEast.lat, i, j, width, height, "AYKOME_MAHALLE");//AYK_MAHALLE

            document.getElementById('txtPrjTalepTarihi').valueAsDate = new Date();
            document.getElementById('txtPrjVatBasTar').valueAsDate = new Date();
        }
    });


    zxc('#txtPrjBasTarihi').change(function () {
        console.log(this.value);
    })
    window.addEventListener('click', function (ee) {
        if (ee.target.closest("#mdlMenu") == null)
            menu.style.display = 'none';
    });



})


function fncHaritaOlustur() {

    map = new L.Map('map', {
        center: new L.LatLng(37.8716, 32.4846),
        zoom: 12
    });
    editableLayers = L.featureGroup().addTo(map);

    L.control.layers({
        "Konya Wmst": L.tileLayer('https://kbs.konya.bel.tr/kbsilcecache/service/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=basemap_wgs&style=&tilematrixSet=EPSG%3A900913&format=image%2Fpng&height=256&width=256&tilematrix=EPSG%3A900913%3A{z}&tilerow={y}&tilecol={x}', {
            maxZoom: 19,
            minZoom: 0
        }),
        "OpenStreetMap": L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            minZoom: 0,
            attribution: '&copy; <a href="http://openstreetmap.org/copyright" target="_blank">OpenStreetMap</a>'
        }).addTo(map),
        "Google": L.tileLayer('http://www.google.cn/maps/vt?lyrs=s@189&gl=cn&x={x}&y={y}&z={z}', {
            attribution: 'google',
            maxZoom: 19,
            minZoom: 0
        })
    },
        {
            "NIP_ARAZI_KULLANIM": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'NIP_ARAZI_KULLANIM',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "paftalar": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'paftalar',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "TESCILLI_ALAN": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'TESCILLI_ALAN',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_BINA": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_BINA',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_ILCE": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_ILCE',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_MAHALLE": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_MAHALLE',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_NUMARATAJ": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_NUMARATAJ',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_TASINMAZ": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_TASINMAZ',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_YOL": L.tileLayer.wms('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_YOL',
                format: 'image/png',
                maxZoom: 19,
                minZoom: 0,
                transparent: true
            }),
            "Drawlayer": editableLayers,

        },
        { position: 'topright', collapsed: false }
    ).addTo(map);

    // var drawControl = new L.Control.Draw({
    //     draw: {
    //         polygon: {
    //             allowIntersection: false,
    //             showArea: true
    //         }
    //     },
    //     edit: {
    //         featureGroup: editableLayers,
    //         edit: true
    //     }
    // });

    // Draw false yapmak
    // var drawControl = new L.Control.Draw({
    //     draw: false,
    //     edit: {
    //         featureGroup: editableLayers
    //     }
    // });


    var drawControl = new L.Control.Draw({
        draw: {
            polyline: true,
            //polygon: {
            //    allowIntersection: false,
            //    drawError: {
            //        color: '#e1e100', // Color the shape will turn when intersects
            //        message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
            //    }
            //},
            polygon: false,
            marker: false,
            rectangle: false,
            circle: false
        },
        // draw: {
        //     position: "topright",
        //     polygon: {
        //         poly: {
        //             allowIntersection: true
        //         },
        //         drawError: {
        //             color: "#e1e100",
        //             message: "<strong>Oh snap!<strong> you can't draw that!"
        //         },
        //         shapeOptions: {
        //             color: "#bada55",
        //             clickable: true
        //         }
        //         // showArea: true, //Çizilen çokgenin alanını m², ha veya km² cinsinden gösterin. Alan yalnızca yaklaşıktır ve çokgen büyüdükçe doğruluğu azalır.
        //         // showLength: false, //Çizilen çizginin uzunluğunu gösterin. Alan yalnızca yaklaşıktır ve çokgen büyüdükçe doğruluğu azalır.
        //         // metric: true,// Metrik ölçüm sistemini kullanın. Bir boole değeri olabileceği gibi hangi birimlerin kullanılacağını belirten bir dizi de olabilir. Olası birimler km (kilometre), ha (hektar), m (metre)'dir. Yani ['km', 'm'] değeri, uzunluğun metre cinsinden ve 1000 metreden fazla olduğunda kilometre cinsinden gösterileceği ve alanın m² veya km² cinsinden gösterileceği ve dönümün kullanılmayacağı anlamına gelir
        //         // feet: true,//Metrik ölçüm sistemini kullanmadığınızda yarda ve mil yerine ayakları kullanın.
        //         // nautic: false, //Metrik ölçüm sistemi veya feet kullanılmadığında yarda ve mil yerine deniz milini kullanın
        //         // precision: { km: 2, ha: 2, m: 0, mi: 2, ac: 2, yd: 0, ft: 0, nm: 2 }//Her birim türünün sayıları için kullanılacak duyarlılığı tanımlar. Olası birimler km (kilometre), ha (hektar), m (metre), mi (mil), ac (akre), ya (yard), ft (fit), nm (deniz mili) şeklindedir. Örneğin, {km: 1} km ve km² için varsayılan hassasiyeti 1,53 km ve 15,01 km² yerine 1,5 km ve 15,0 km² gibi değerler verecek şekilde değiştirir.
        //     }
        //     ,
        //     marker: false,
        //     rectangle: false,
        //     circle: false,
        //     polyline: false,
        //     circlemarker: true
        // },
        edit: false,
        //edit: {
        //    featureGroup: editableLayers,
        //    remove: true
        //}
    });

    map.addControl(drawControl);
    fncDrawTipEmpty();

    map.on(L.Draw.Event.CREATED, fncDrawCreated);

    map.on(L.Draw.Event.EDITED, function (e) {
        var layers = e.layers;
        layers.eachLayer(function (layer) {

            console.log("edited=", JSON.stringify(layer.toGeoJSON()));

            //ne istersen onu yap; büyük ihtimalle db'ye geri kaydet
        });
    });

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

    fncKatmanHazirla();


    //map.on('click', function (e) {
    //    var lat = e.latlng.lat;
    //    var lng = e.latlng.lng;

    //    // WMS servisine istek göndermek için gereken parametreleri oluştur
    //    var params = {
    //        service: 'WMS',
    //        version: '1.1.0',
    //        request: 'GetFeatureInfo',
    //        layers: 'AYKOME_YOL',
    //        styles: '',
    //        bbox: map.getBounds().toBBoxString(),
    //        width: map.getSize().x,
    //        height: map.getSize().y,
    //        srs: 'EPSG:4326',
    //        format: 'image/png',
    //        query_layers: 'AYKOME_YOL',
    //        info_format: 'application/json',
    //        feature_count: 10,
    //        x: map.layerPointToContainerPoint(e.layerPoint).x,
    //        y: map.layerPointToContainerPoint(e.layerPoint).y
    //    };

    //    // WMS servisine istek gönder
    //    var url = 'http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows?' + Object.keys(params).map(function (k) {
    //        return encodeURIComponent(k) + '=' + encodeURIComponent(params[k]);
    //    }).join('&');

    //    fetch(url, {
    //        method: 'GET',
    //        mode: 'cors',
    //        headers: {
    //            'Origin': 'kbs.konya.bel.tr' // Kendi origin URL'nizi buraya yazın
    //        }
    //    })
    //        .then(function (response) {
    //            return response.json();
    //        })
    //        .then(function (data) {
    //            // Gelen veriyi kullanarak istediğiniz işlemi yapabilirsiniz
    //            console.log(data);
    //        })
    //        .catch(function (error) {
    //            console.error(error);
    //        });
    //});

    //map.on('click', function (e) {
    //    var latlng = e.latlng;

    //    var point = map.latlngtocontainerpoint(latlng);

    //    var bounds = map.getbounds();
    //    var southwest = bounds.getsouthwest();
    //    var northeast = bounds.getnortheast();

    //    var width = map.getsize().x;
    //    var height = map.getsize().y;

    //    // var bbox = [southwest.lng, southwest.lat, northeast.lng, northeast.lat].join(',');
    //    var bbox = [southwest.lat, southwest.lng, northeast.lat, northeast.lng].join(',');

    //    var i = parseınt(point.x);
    //    var j = parseınt(point.y);

    //    //var x = map.layerPointToContainerPoint(e.layerPoint).x;
    //    //var y = map.layerPointToContainerPoint(e.layerPoint).y;
    //    //var bbox = map.getBounds().toBBoxString();

    //    ////var url = `http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows?servıce=wms&versıon=1.3.0&request=getfeatureınfo&bbox=${bbox}&crs=epsg:4326&wıdth=${width}&heıght=${height}&layers=aykome_yol&styles=&format=image/png&query_layers=aykome_yol&ınfo_format=application/json&ı=${i}&j=${j}`;

    //    //console.log("click", bbox, x, y);
    //    // console.log("click", (southwest.lat + "," + southwest.lng + "," + northeast.lat + "," + northeast.lng), i, j);

    //    fncgetwmskatman(southwest.lat, southwest.lng, northeast.lat, northeast.lng, i, j, width, height, "aykome_yol");
    //    // fncgetwmskatman(southwest.lng, northeast.lng, southwest.lat, northeast.lat, i, j, width, height, "aykome_mahalle");//ayk_mahalle


    //    // fncgetwmskatman2(latlng.lat, latlng.lng, "aykome_yol");

    //});

    // fncGetAykomeKazi("#159c5f")

}

function fncKatmanHazirla() {
    GetJson('/api/Api_Harita/GetKatmanList', function (data) {
        var html = "";
        if (data.veri != null) {
            veriList = data.veri;
            for (var i = 0; i < veriList.length; i++) {
                html = html.concat(`
                 <li>
                        <div class="fdsf">
                           <input class="form-check-input chbKatALLoNoF" type="checkbox" > ${veriList[i].Adi}
                        </label>
                    <div class="fvd">`);
                var altKtm = veriList[i].WfsKatmanInfoParam.WfsKatmanDetayParams;
                for (var d = 0; d < altKtm.length; d++) {
                    html = html.concat(`<div class="sbbhd1" >
                          <div class="rns" style="background-color:${altKtm[d].RenkKodu}"></div>
                          <input class="form-check-input chbKatOnOf" type="checkbox" data-refid="${veriList[i].DbKatmanID}" data-id="${altKtm[d].WfsKatmanDetayID}" data-katmantip="${veriList[i].KatmanTipi}" data-birimid="${altKtm[d].BirimId}" data-birim="${altKtm[d].Birim}" data-name="${altKtm[d].Name}" data-zoom="${altKtm[d].ZoomDurumu}" data-renkkodu="${altKtm[d].RenkKodu}" data-title="${altKtm[d].Title}">
                          <a class="btnKtmnShow">${altKtm[d].Title}</a>
                      </div>`);
                }
                html = html.concat("<div></li>");
            }
            zxc('#lstKatman').html(html);

            zxc('.chbKatOnOf').change(fncChbWfsOnOf);
            zxc('.chbKatOnOf1').change(fncChbWfsOnOf);
            zxc('.chbKatALLoNoF').change(function () {
                var c = this,
                    v = zxc(c).birSonrakiElement().dom;// dom nesnesi

                v.querySelectorAll(".chbKatOnOf").forEach(g => g.checked = c.checked);
                fncChbWfsOnOf();
            });
        }

        if (data.veri3 != null) {
            html = '<option value="-1">Seç</option>';
            data.veri3.forEach(q => html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            document.getElementById('txtPrjTipi').innerHTML = html;
            document.getElementById('txtPrjTipi').onchange = fncPrjTipSecildiginde;
        }

        if (data.veri2 != null) {
            html = '';
            data.veri2.forEach(q => html = html.concat(`<div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">${q.Val}</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" class="form-control form-control-sm" data-tip-format="sayi" data-giydirmeref="${q.Key}">
                                            </div>
                                        </div>
                                    </div>`));
            zxc('#lstHesaplama').html(html)

            document.querySelectorAll('.form-control[data-tip-format="sayi"]').forEach(function (q) {
                q.addEventListener('keypress', function (e) {
                    var q = this,
                        r = new RegExp(/^\d+$/),
                        val = this.value;
                    val = val.substring(0, this.selectionStart) + e.key + val.substring(this.selectionStart, val.length);
                    if (r.exec(val) == null)
                        e.preventDefault();
                }, false)
            })

        }

        if (data.veri4 != null) {
            html = '<option value="-1">Seç</option>';
            data.veri4.forEach(q => html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            document.getElementById('txtIlce').innerHTML = html;
            document.getElementById('txtBelediye').innerHTML = html;
            document.getElementById('txtIlce').onchange = fncIlceSecildiginde;
        }
    }, function () {
        zxc('#domYukleniyor').css('display', 'flex');
    }, function () {
        zxc('#domYukleniyor').css('display', 'none');
    })










}

function fncIlceSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/AbsApi/GetMahalle/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.MAHALLEREF}">${q.TANIM}</option>`));
                document.getElementById('txtMahalle').innerHTML = html;
                document.getElementById('txtMahalle').onchange = fncMahalleSecildiginde;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('txtMahalle').innerHTML = html;
            document.getElementById('txtCaddeSokak').innerHTML = html;
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
                document.getElementById('txtCaddeSokak').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('txtCaddeSokak').innerHTML = html;
        }, function () {
        })
    }
}



function fncPrjTipSecildiginde() {
    var w = this, q = this.value;
    if (q == "2")
        zxc('#pnltcKapiNo').attrSil('hidden')
    else
        zxc('#pnltcKapiNo').attr('hidden', 'hidden')

    if (q != "" && q.value != "-1")
        if (w.classList.contains('is-invalid')) {
            w.classList.remove('is-invalid');
            zxc(w.parentNode).sonElement().elementiSil();
        }
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
function fncWfsKatmanInstall() {
    return new Promise((resolve, reject) => {
        katman = [];
        fncKatmanKaldir();
        var q = document.querySelectorAll('.chbKatOnOf'),
            zoomLevel = map.getZoom();
        for (var indexx = 0; indexx < q.length; indexx++) {
            var zoom = parseInt(q[indexx].getAttribute('data-zoom'));

            if (q[indexx].checked == true && zoom <= zoomLevel) {
                var DbKatmanID = q[indexx].getAttribute('data-refid'),
                    katmantip = parseInt(q[indexx].getAttribute('data-katmantip')),
                    WfsKatmanDetayID = q[indexx].getAttribute('data-id'),
                    KatmanRenk = q[indexx].getAttribute('data-renkkodu'),
                    BirimID = q[indexx].getAttribute('data-birimid'),
                    Birim = q[indexx].getAttribute('data-birim');

                fncWfsKatmanYukle(DbKatmanID, WfsKatmanDetayID, katmantip, KatmanRenk, BirimID, Birim)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            else
                resolve();
        }

        var q1 = document.querySelectorAll('.chbKatOnOf1');
        for (var indexx = 0; indexx < q1.length; indexx++) {
            if (q1[indexx].checked == true) {
                var Katmantip = q1[indexx].getAttribute('data-tip'),
                    KatmanRenk = q1[indexx].getAttribute('data-renkkodu');

                fncGetAykomeKazi(KatmanRenk, Katmantip)
                    .then(() => {
                        resolve();
                    })
                    .catch((error) => {
                        reject(error);
                    });
            }
            else
                resolve();
        }

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

function fncWfsKatmanYukle(refid, RefKatID, katmantip, KatmanRenk, BirimID, Birim, fncEnd) {

    return new Promise((resolve, reject) => {
        var bounds = map.getBounds();
        var southWest = bounds.getSouthWest();
        var northEast = bounds.getNorthEast();

        PostJson('/api/Api_Harita/GetKatmanDetay', {
            RefID: refid,
            RefKatID: RefKatID,

            //GuneyBatiEnlem: southWest.lng,
            //GuneyBatiBoylam: southWest.lat,
            //KuzeyBatiEnlem: northEast.lng,
            //KuzeyBBatiBoylam: northEast.lat


            GuneyBatiEnlem: southWest.lng,
            GuneyBatiBoylam: northEast.lng,
            KuzeyBatiEnlem: southWest.lat,
            KuzeyBBatiBoylam: northEast.lat
        }, function (d) {
            try {
                if (katmantip == 0) {
                    if (katman.find(q => q.RefID == refid && q.RefKatID == RefKatID) == undefined) {
                        var xmlString = d.veri;
                        var jsonj1 = JSON.parse(d.veri);
                        var curkatman = L.geoJson(jsonj1, {
                            style: {
                                /*fillColor: getSicColor(feature.id.density),*/
                                weight: 5,
                                opacity: 1,
                                color: KatmanRenk,
                                dashArray: '1',
                                fillOpacity: 0.7,
                                xxx123: 123
                            },
                            onEachFeature: onEachFeaturex
                        }
                        ).addTo(map);
                        //  map.fitBounds(curkatman.getBounds());


                        
                      

                        katman.push({
                            RefID: refid,
                            RefKatID: RefKatID,
                            katmantip: katmantip,
                            KatmanRenk: KatmanRenk,
                            KatmanJson: curkatman,
                            BirimID: BirimID,
                            Birim: Birim
                        });

                    }
                    resolve();
                }
            } catch (e) {
                reject(e);
            }
        }, function () {
            var crm = document.querySelector('.chbKatOnOf[data-id="' + RefKatID + '"]');;
            if (crm != null)
                zxc(crm).birSonrakiElement().html("Yükleniyor...");
        }, function () {
            var crm = document.querySelector('.chbKatOnOf[data-id="' + RefKatID + '"]');;
            if (crm != null)
                zxc(crm).birSonrakiElement().html(zxc(crm).attr("data-title"));
        });
    });
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

function highlightFeature(e) {
    var layer = e.target;

    layer.setStyle({
        weight: 5,
        color: '#666',
        dashArray: '1',
        fillOpacity: 0.7
    });
    // info.update(layer.feature.properties);

    layer.bringToFront();
}

function resetHighlight(e) {
    var layer = e.target;
    katman.forEach(q => q.KatmanJson.resetStyle(layer));
    //info.update();
}

function onEachFeaturex(feature, layer) {

    //var bounds = layer.getBounds();
    //var center = bounds.getCenter();

    //var text = L.divIcon({
    //    className: 'my-label-class',
    //    html: '<div>' + feature.properties.ADI_NUMARASI + '</div>'
    //});

    //var marker = L.marker(center, { icon: text }).addTo(map);
    //marker.bindTooltip(feature.properties.ADI_NUMARASI).openTooltip();

    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: fncKatmanClkGe
    });
}

function fncKatmanClkGe(e) {
    var httm = '';
    for (var property in e.target.feature.properties)
        httm = httm.concat(property + ": " + e.target.feature.properties[property], '</br>');

    MesajVer(httm, 1);
    // map.fitBounds(e.target.getBounds());
}






//



function fncDrawTipEmpty() {

    //document.querySelector('.leaflet-draw-draw-polyline').style.display = "none";
    //document.querySelector('.leaflet-draw-draw-polygon').style.display = "none";
    //document.querySelector('.leaflet-draw-draw-rectangle').style.display = "none";
    //document.querySelector('.leaflet-draw-draw-circle').style.display = "none";
    //document.querySelector('.leaflet-draw-draw-marker').style.display = "none";

    //document.querySelectorAll('.leaflet-draw-toolbar.leaflet-bar')[0].style.display = "none";
    //document.querySelectorAll('.leaflet-draw-toolbar.leaflet-bar')[1].style.display = "none";
}


var localData = [];

var koordinatDizisi = [], dagitimBirimAry = [];
function fncDrawCreated(e) {
    koordinatDizisi = [], dagitimBirimAry = [];
    zxc('#lstBirimler').html(" ");

    var type = e.layerType,
        layerCur = e.layer;


    editableLayers.addLayer(layerCur);

    katman.forEach(function (item) {
        var geoJsonLayer = item.KatmanJson;
        geoJsonLayer.eachLayer(function (layer) {
            // Check if the drawn line intersects with the feature
            if (layer.feature.geometry.type === 'Polygon' || layer.feature.geometry.type === 'LineString') {

                var intersects = turf.lineIntersect(layer.toGeoJSON(), layerCur.toGeoJSON());
                if (intersects.features.length > 0) {
                    var vvv = layer.toGeoJSON();

                    if (layer.feature != undefined && layer.feature.id != undefined && layer.feature.id.replace(/\.[0-9]*/, "") == "AYKOME_YOL_WFS") {
                        console.log("Intersect=>", layer.feature.properties.ADI_NUMARASI)
                    }
                }
            }
        });
    });


    var lineGeoJSON = layerCur.toGeoJSON();
    var buffer = turf.buffer(lineGeoJSON, 0.05, { units: 'kilometers' }); // Örnek olarak 0.01 kilometrelik bir tampon oluşturuyoruz

    katman.forEach(function (item) {
        var geoJsonLayer = item.KatmanJson;
        geoJsonLayer.eachLayer(function (layer) {
            if (layer !== layerCur) {
                var layerGeoJSON = layer.toGeoJSON();
                if (turf.booleanContains(buffer, layerGeoJSON)) {
                    if (layer.feature != undefined && layer.feature.id != undefined && layer.feature.id.replace(/\.[0-9]*/, "") == "AYKOME_YOL_WFS") {
                        console.log("Buffer=>",layer.feature.properties.ADI_NUMARASI)
                    }

                    if (item.Birim != null && dagitimBirimAry.findIndex(q => q.BirimID == item.BirimID) == -1)
                        dagitimBirimAry.push({
                            BirimID: item.BirimID,
                            Birim: item.Birim
                        });
                }
            }
        });

     
    });

    var htmlBirimler = '';
    for (var i = 0; i < dagitimBirimAry.length; i++)
        htmlBirimler += "<div class='brmlst'>" + dagitimBirimAry[i].Birim + "</div>"
    zxc('#lstBirimler').html(htmlBirimler);
    var coordinates = layerCur.getLatLngs();

    for (var i = 0; i < coordinates.length; i++) {
        //if (!koordinatDizisi.some(function (koordinat) {
        //    return koordinat.Lat === coordinates[i].lat && koordinat.Lng === coordinates[i].lng;
        //})) {
        //    koordinatDizisi.push({
        //        Lat: coordinates[i].lat,
        //        Lng: coordinates[i].lng
        //    });
        //}
        if (!koordinatDizisi.some(function (koordinat) {
            return koordinat.Lng === coordinates[i].lat && koordinat.Lat === coordinates[i].lng;
        })) {
            koordinatDizisi.push({
                Lng: coordinates[i].lat,
                Lat: coordinates[i].lng
            });
        }
    }

    //editableLayers.addLayer(layerCur);
    //fncModalAc("#mdlVeri");
}


function fncMustResmYuk() {
    var fil = this;
    if (fncImageCheck(fil))
        fncFileToBase64(fil.files[0], function (q) {
            zxc(".hesap-logo").ekle('<div class="imgdfv"><img class="imgresw" src="' + q + '" alt=""><a class="aslre" onclick="fncImgDels(this)">Sil</a></div>');
            document.getElementById('filMusteriFotograf').value = "";
        });
}

function fncFileToBase64(files, calBack) {
    var reader = new FileReader();
    reader.readAsDataURL(files);
    reader.onload = function () {
        calBack(reader.result);
    }
}

function fncImageCheck(fileDom) {
    var fileName = fileDom.value;
    var idxDot = fileName.lastIndexOf(".") + 1;
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png")
        return true;
    else
        MesajVer("Bir Hata Oluştu", MesajDurumu.Warning);
}

function fncImgDels(q) {
    zxc(q).ustElement().elementiSil();
}

function fncprojeOlst() {
    var qq = this,
        hata = false,
        txtPrjNo = zxc('#txtPrjNo').dom,
        txtPrjTalepTarihi = zxc('#txtPrjTalepTarihi').dom,
        txtPrjTipi = zxc('#txtPrjTipi').dom,
        txtPrjAmaci = zxc('#txtPrjAmaci').dom,
        txtPrjBasTarihi = zxc('#txtPrjBasTarihi').dom,
        txtPrjBitTarihi = zxc('#txtPrjBitTarihi').dom,
        txtPrjVatBasTar = zxc('#txtPrjVatBasTar').dom,
        txtPrjDilekcNo = zxc('#txtPrjDilekcNo').dom,
        txtPrjIlgKisi = zxc('#txtPrjIlgKisi').dom,
        txtPrjBasYapn = zxc('#txtPrjBasYapn').dom,
        txtPrjTcNo = zxc('#txtPrjTcNo').dom,
        txtPrjKapiNo = zxc('#txtPrjKapiNo').dom,

        BykShrAit = zxc('#chbBykShrAit').dom.checked,
        txtTrafikPlnlm = zxc('#txtTrafikPlnlm').dom,
        txtIlce = zxc('#txtIlce').dom,
        txtBelediye = zxc('#txtBelediye').dom,
        txtMahalle = zxc('#txtMahalle').dom,
        txtCaddeSokak = zxc('#txtCaddeSokak').dom,
        txtYolMalzeme = zxc('#txtYolMalzeme').dom,
        txtYapimTarihi = zxc('#txtYapimTarihi').dom,
        txtIsNumarasi = zxc('#txtIsNumarasi').dom,
        txtEn = zxc('#txtEn').dom,
        txtBoy = zxc('#txtBoy').dom,
        txtDerinlik = zxc('#txtDerinlik').dom,
        txtCimYol = zxc('#txtCimYol').dom;


    //txtYgmrSuyuRogar = zxc('#txtYgmrSuyuRogar').dom,
    //txtYgmrSuyuKanli = zxc('#txtYgmrSuyuKanli').dom,
    //txtAsfaltBoyTah = zxc('#txtAsfaltBoyTah').dom,
    //txtAsfaltKazRuhBel = zxc('#txtAsfaltKazRuhBel').dom,
    //txtSicakAsfalt = zxc('#txtSicakAsfalt').dom,
    //txtSathiKaplama = zxc('#txtSathiKaplama').dom,
    //txtToprakYol = zxc('#txtToprakYol').dom,
    //txtStabilizeYol = zxc('#txtStabilizeYol').dom,
    //txtKaroKaplTretuv = zxc('#txtKaroKaplTretuv').dom,
    //txtBetTretuvar = zxc('#txtBetTretuvar').dom,
    //txtKupGranit = zxc('#txtKupGranit').dom,
    //txtAndezitTretuvar = zxc('#txtAndezitTretuvar').dom,


    if (degerleriKontrolEt(txtPrjNo, txtPrjNo.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjTalepTarihi, txtPrjTalepTarihi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjTipi, txtPrjTipi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjAmaci, txtPrjAmaci.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjBasTarihi, txtPrjBasTarihi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjBitTarihi, txtPrjBitTarihi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjVatBasTar, txtPrjVatBasTar.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjDilekcNo, txtPrjDilekcNo.value))
        hata = true;


    if (degerleriKontrolEt(txtPrjIlgKisi, txtPrjIlgKisi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjBasYapn, txtPrjBasYapn.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjTcNo, txtPrjTcNo.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjKapiNo, txtPrjKapiNo.value))
        hata = true;



    if (degerleriKontrolEt(txtTrafikPlnlm, txtTrafikPlnlm.value))
        hata = true;

    if (degerleriKontrolEt(txtIlce, txtIlce.value))
        hata = true;

    if (degerleriKontrolEt(txtBelediye, txtBelediye.value))
        hata = true;

    if (degerleriKontrolEt(txtMahalle, txtMahalle.value))
        hata = true;

    if (degerleriKontrolEt(txtCaddeSokak, txtCaddeSokak.value))
        hata = true;

    if (degerleriKontrolEt(txtYolMalzeme, txtYolMalzeme.value))
        hata = true;

    if (degerleriKontrolEt(txtYapimTarihi, txtYapimTarihi.value))
        hata = true;

    if (degerleriKontrolEt(txtIsNumarasi, txtIsNumarasi.value))
        hata = true;

    if (degerleriKontrolEt(txtEn, txtEn.value))
        hata = true;

    if (degerleriKontrolEt(txtBoy, txtBoy.value))
        hata = true;

    if (degerleriKontrolEt(txtDerinlik, txtDerinlik.value))
        hata = true;

    if (degerleriKontrolEt(txtCimYol, txtCimYol.value))
        hata = true;
    if (hata == true) {
        MesajVer("Zorunlu Alanları Doldurunuz!", MesajDurumu.Warning)
        return;
    }

    var resAry = [];
    document.querySelectorAll('.imgresw').forEach(s => resAry.push(s.src))

    var param = {
        PrjNo: txtPrjNo.value,
        PrjTalepTarihi: txtPrjTalepTarihi.value,
        PrjTipi: txtPrjTipi.value,
        PrjAmaci: txtPrjAmaci.value,
        PrjBasTarihi: txtPrjBasTarihi.value,
        PrjBitTarihi: txtPrjBitTarihi.value,
        PrjVatBasTar: txtPrjVatBasTar.value,
        PrjDilekcNo: txtPrjDilekcNo.value,
        PrjIlgKisi: txtPrjIlgKisi.value,
        PrjBasYapn: txtPrjBasYapn.value,
        PrjTcNo: txtPrjTcNo.value,
        PrjKapiNo: txtPrjKapiNo.value,



        BykShrAit: chbBykShrAit.checked,
        TrafikPlnlm: parseFloat(txtTrafikPlnlm.value),
        Ilce: txtIlce.value,
        ilceadi: zxc('#txtIlce').selectboxSecilenIndex().text,
        Belediye: zxc('#txtBelediye').selectboxSecilenIndex().text,
        Mahalle: txtMahalle.value,
        MahalleAdi: zxc('#txtMahalle').selectboxSecilenIndex().text,
        CaddeSokak: zxc('#txtCaddeSokak').selectboxSecilenIndex().text,
        YolMalzeme: txtYolMalzeme.value,
        YapimTarihi: txtYapimTarihi.value,
        IsNumarasi: txtIsNumarasi.value,
        En: parseFloat(txtEn.value),
        Boy: parseFloat(txtBoy.value),
        Derinlik: parseFloat(txtDerinlik.value),
        CimYol: parseInt(txtCimYol.value),
        Resim: resAry,
        Koordinatlar: koordinatDizisi,
        BirimList: dagitimBirimAry,
        GydirmeLst: fncGetGydirmeLst()
    }

    PostJson('/api/Api_Harita/SetProje', param, function (data) {
        koordinatDizisi = [];
        fncModalGizle('mdlVeri');
        fncPrjInputClear();
    }, function () {
        zxc(qq).attr('disabled', 'disabled');

    }, function () {
        zxc(qq).attrSil('disabled');
    })
}
function fncPrjInputClear() {
    zxc('#lstBirimler,.hesap-logo').html(" ");
    zxc("#txtPrjNo,#txtPrjTalepTarihi,#txtPrjAmaci,#txtPrjBasTarihi,#txtPrjBitTarihi,#txtPrjVatBasTar,#txtPrjTcNo,#txtPrjKapiNo,#txtPrjDilekcNo,#txtPrjIlgKisi,#txtPrjBasYapn,#txtTrafikPlnlm,#txtYolMalzeme,#txtYapimTarihi,#txtIsNumarasi,#txtEn,#txtBoy,#txtDerinlik,#txtYgmrSuyuRogar,#txtYgmrSuyuKanli,#txtAsfaltBoyTah,#txtAsfaltKazRuhBel,#txtSicakAsfalt,#txtSathiKaplama,#txtToprakYol,#txtStabilizeYol,#txtKaroKaplTretuv,#txtBetTretuvar,#txtKupGranit,#txtAndezitTretuvar,#txtCimYol").value(" ");
    zxc('#txtPrjTipi,#txtIlce,#txtBelediye,#txtMahalle,#txtCaddeSokak').selectbox("-1")
}

function fncGetWmsKatman(GuneyBatiEnlem, GuneyBatiBoylam, KuzeyBatiEnlem, KuzeyBBatiBoylam, I, J, width, height, Katman) {
    PostJson('/api/Api_Harita/GetWmsKatFatInf', {
        GuneyBatiEnlem: GuneyBatiEnlem,
        GuneyBatiBoylam: GuneyBatiBoylam,
        KuzeyBatiEnlem: KuzeyBatiEnlem,
        KuzeyBBatiBoylam: KuzeyBBatiBoylam,
        I: I,
        J: J,
        width: width,
        height: height,
        width: width,
        Katman: Katman
    }, function (data) {
        var q = JSON.parse(data.veri);
        if (q.features != undefined) {
            if (q.features[0] != undefined) {    // console.log("Wms Sonucu==>", q.features[0].properties)
                gelenWms = q.features[0].properties;

                if (Katman == "AYKOME_MAHALLE") {
                    document.getElementById('txtIlce').value = gelenWms.ILCEREF;
                    document.getElementById('txtBelediye').value = gelenWms.ILCEREF;

                    GetJson('/api/AbsApi/GetMahalle/' + gelenWms.ILCEREF, function (data) {
                        if (data.veri != null) {
                            var html = '<option value="">Seç</option>';
                            data.veri.forEach(q => html = html.concat(`<option value="${q.MAHALLEREF}">${q.TANIM}</option>`));
                            document.getElementById('txtMahalle').innerHTML = html;
                            document.getElementById('txtMahalle').onchange = fncMahalleSecildiginde;

                            document.getElementById('txtMahalle').value = gelenWms.MAHALLEREF;

                            GetJson('/api/AbsApi/GetCaddeSokak/' + gelenWms.MAHALLEREF, function (data) {
                                if (data.veri != null) {
                                    var html = '<option value="">Seç</option>';
                                    data.veri.forEach(q => html = html.concat(`<option value="${q.CADDESOKAK_REF}">${q.CADDESOKAK_ADI}</option>`));
                                    document.getElementById('txtCaddeSokak').innerHTML = html;

                                    fncGetWmsKatman(GuneyBatiEnlem, GuneyBatiBoylam, KuzeyBatiEnlem, KuzeyBBatiBoylam, I, J, width, height, "AYKOME_YOL");
                                }
                            }, function () {
                                var html = '<option value="">Yükleniyor...</option>';
                                document.getElementById('txtCaddeSokak').innerHTML = html;
                            })
                        }
                    });
                }
                else if (Katman == "AYKOME_YOL") {

                    if (gelenWms.YOL_MALZEME)
                        document.getElementById('txtYolMalzeme').value = gelenWms.YOL_MALZEME;

                    if (gelenWms.YOL_MALZEME) {
                        var yapimTarihi = new Date(gelenWms.YAPIM_TARIHI);
                        document.getElementById('txtYapimTarihi').value = yapimTarihi.toISOString().slice(0, 10);
                    }

                    if (gelenWms.ADI_NUMARASI) {
                        var fg = zxc("#txtCaddeSokak").selectboxSecilen(gelenWms.ADI_NUMARASI);
                        if (fg)
                            zxc("#txtCaddeSokak").selectbox(fg.value)
                    }
                }


            }
            else
                console.log("Sonuç Dönmedi!!!");
        }
    })
}

function fncGetWmsKatman2(lat, lng, Katman) {
    PostJson('/api/Api_Harita/GetWmsKatFatInf', {
        GuneyBatiEnlem: lat,
        GuneyBatiBoylam: lng,
        Katman: Katman
    }, function (data) {
        var q = JSON.parse(data.veri);
        if (q.features != undefined) {
            if (q.features[0] != undefined) {    // console.log("Wms Sonucu==>", q.features[0].properties)

                gelenWms = q.features[0].properties;

                document.getElementById('txtIlce').value = gelenWms.ILCEREF;
                document.getElementById('txtYolMalzeme').value = gelenWms.YOL_MALZEME;
                var yapimTarihi = new Date(gelenWms.YAPIM_TARIHI);
                document.getElementById('txtYapimTarihi').value = yapimTarihi.toISOString().slice(0, 10);
                GetJson('/api/AbsApi/GetMahalle/' + gelenWms.ILCEREF, function (data) {
                    if (data.veri != null) {
                        var html = '<option value="">Seç</option>';
                        data.veri.forEach(q => html = html.concat(`<option value="${q.MAHALLEREF}">${q.TANIM}</option>`));
                        document.getElementById('txtMahalle').innerHTML = html;
                        document.getElementById('txtMahalle').onchange = fncMahalleSecildiginde;

                        document.getElementById('txtMahalle').value = gelenWms.SAG_MAHALLEREF;

                        GetJson('/api/AbsApi/GetCaddeSokak/' + gelenWms.SAG_MAHALLEREF, function (data) {
                            if (data.veri != null) {
                                var html = '<option value="">Seç</option>';
                                data.veri.forEach(q => html = html.concat(`<option value="${q.CADDESOKAK_REF}">${q.CADDESOKAK_ADI}</option>`));
                                document.getElementById('txtCaddeSokak').innerHTML = html;

                                zxc('#txtCaddeSokak').selectbox(gelenWms.ADI_NUMARASI);
                            }
                        }, function () {
                            var html = '<option value="">Yükleniyor...</option>';
                            document.getElementById('txtCaddeSokak').innerHTML = html;
                        })
                    }
                });
            }
            else
                console.log("Sonuç Dönmedi!!!");
        }
    })
}

//function fncChbOnOf2() {
//    var we = this;
//    if (!isRequestInProgress2) {
//        isRequestInProgress2 = true;
//        fncKatmanInstall2()
//            .then(() => {
//                isRequestInProgress2 = false;
//                console.log("fncKatmanInstall2 isRequestInProgress2", isRequestInProgress2);

//            })
//            .catch((error) => {
//                // isRequestInProgress2 = false;
//            });
//    }
//}

//function fncKatmanInstall2() {
//    return new Promise((resolve1, reject1) => {
//        fncKatmanKaldir();

//        var q = document.querySelectorAll('.chbKatOnOf1');
//        for (var indexx = 0; indexx < q.length; indexx++) {
//            console.log("indexx", indexx, "length", q.length);
//            if (q[indexx].checked == true) {
//                var tip = q[indexx].getAttribute('data-tip'),
//                    KatmanRenk = q[indexx].getAttribute('data-renkkodu');

//                fncGetAykomeKazi(KatmanRenk, tip)
//                    .then(() => {
//                        resolve1();
//                    })
//                    .catch((error) => {
//                        reject1(error);
//                    });
//            }
//            else
//                resolve1();
//        }
//    });
//}
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
                var jsonj1 = JSON.parse(d.veri);
                var curkatman = L.geoJson(jsonj1, {
                    style: {
                        weight: 5,
                        opacity: 1,
                        color: renk,
                        dashArray: '1',
                        fillOpacity: 0.7
                    },
                    onEachFeature: onEachFeatureKazi
                }
                ).addTo(this.map);
                // this.map.fitBounds(curkatman.getBounds());
                resolve();
            } catch (e) {
                reject(e);
            }
        });
    });
}
function onEachFeatureKazi(feature, layer) {
    layer.on({
        //mouseover: highlightFeature,
        //mouseout: resetHighlight,
        click: function fncKatmanClkGe(e) {
            var httm = '';
            for (var property in e.target.feature.properties)
                httm = httm.concat(property + ": " + e.target.feature.properties[property], '</br>');

            MesajVer(httm, MesajDurumu.Warning);
            // map.fitBounds(e.target.getBounds());
        }
    });
}

function fncGetGydirmeLst() {
    var aryGydirem = [];
    document.querySelectorAll('#lstHesaplama .form-control').forEach(q => {
        if (q.value)
            aryGydirem.push({
                GydirmeRefID: parseInt(q.getAttribute("data-giydirmeref")),
                Tanim: parseInt(q.value)
            });
    })
    return aryGydirem;
}
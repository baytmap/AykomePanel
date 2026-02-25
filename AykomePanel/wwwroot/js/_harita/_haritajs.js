var yuklenenKatman,
    map,
    editableLayers,
    veriList = [],
    isRequestInProgress = false,
    isRequestInProgress2 = false,
    katman = [],
    gydirmeLst = [],
    gelenWms = null,
    localData = [],
    curLatLng,
    opaklikVal = 1,
    czmYtk = false;

var drawControl;
zxc.baslarken(function () {
    //zxc('.chbKatOnOf1').checked(false)

    // DXF dosyasını yükleme işlemi
    var fileInput = document.getElementById('flinput');
    fileInput.type = 'file';
    fileInput.accept = '.dxf';


    fileInput.addEventListener('change', fncDxfInstall);

    zxc('#flinputkml').change(fncKmlYukle);
    /* zxc('#fileInputNtc').change(uploadNetcatFile);*/
    fncHaritaOlustur();
    zxc('#btnInsert').click(fncprojeOlst);
    zxc('#filMusteriFotograf').change(fncMustResmYuk);
    //fncModalAc("#mdlVeri");

    const menu = document.getElementById('mdlMenu');

    window.addEventListener('contextmenu', function (e) {

        e.preventDefault();

        if (localData.length > 0 && menu.style.display != "block" && zxc('#mdlVeri').css('display') != "block") {

            gelenWms = null;
            menu.style.display = 'block';
            menu.style.left = `${e.pageX}px`;
            menu.style.top = `${e.pageY}px`;

            //var bounds = map.getBounds();
            //var southWest = bounds.getSouthWest();
            //var northEast = bounds.getNorthEast();

            //var width = map.getSize().x;
            //var height = map.getSize().y;

            //// var bbox = [southWest.lng, southWest.lat, northEast.lng, northEast.lat].join(',');
            //var bbox = [southWest.lat, southWest.lng, northEast.lat, northEast.lng].join(',');
            //var i = parseInt(e.x);
            //var j = parseInt(e.y);

            var prjref = zxc.parseQuery("projeref")
            if (prjref == "") {

                zxc('#mnalt1').html("Proje Başvurusu");
                /*  = e.latlng;*/
                //var point = map.latLngToContainerPoint(latlng);

                // fncGetWmsKatman(southWest.lat, southWest.lng, northEast.lat, northEast.lng, i, j, width, height, "AYKOME_MAHALLE");

                document.getElementById('txtPrjTalepTarihi').value = new Date().toISOString().substr(0, 16);
                document.getElementById('txtPrjVatBasTar').value = new Date().toISOString().substr(0, 10);


                document.getElementById('txtPrjBasTarihi').value = new Date().toISOString().substr(0, 10);

                var dd = new Date();
                dd.setDate(dd.getDate() + 1);
                document.getElementById('txtPrjBitTarihi').value = dd.toISOString().substr(0, 10);

                zxc('#txtPrjBasYapn').value(zxc('#kkrm4').html());
                fncIstetayOlustur();
            }
            else {
                zxc('#mnalt1').html("Proje Güncelle");
                var yeniSatir = false;
                for (var i = 0; i < localData.length; i++) {
                    var iid = localData[i].UUID;
                    var fg = document.querySelectorAll('#domisDetay .czg');
                    for (var v = 0; v < fg.length; v++) {
                        if (iid == parseInt(fg[v].getAttribute('data-id')))
                            break;
                        if (v == fg.length - 1) {
                            yeniSatir = true;
                            break;
                        }
                    }
                }
                if (yeniSatir)
                    fncIstetayOlusturDuzenleEdit();
                // fncGetWmsKatman(southWest.lat, southWest.lng, northEast.lat, northEast.lng, i, j, width, height, "AYKOME_MAHALLE");
            }
        }
    });

    $('#save-button').click(function () {
        // Modal'daki değerleri al
        var color = $('#txtcolor').val();
        var weight = $('#txtweight').val();
        var opacity = $('#txtopacity').val();

        var shpop = {
            color: color,
            weight: weight,
            opacity: opacity
        };

        localStorage.setItem('shpopStore', JSON.stringify(shpop));
        drawControl.setDrawingOptions({
            polyline: {
                shapeOptions: shpop
            }
        });
        polylineDrawer.options.shapeOptions = shpop;
        // Modal'ı kapat
        // editableLayers.setStyle(shpop);


        var _lyrs = editableLayers.getLayers();
        for (var i = 0; i < _lyrs.length; i++) {
            _lyrs[i].setStyle(shpop);
        }

        for (var i = 0; i < localData.length; i++) {
            localData[i].layerCur.options = shpop;
        }

        $('#cfmodal').modal('hide');
    });


    var shpopStore = JSON.parse(localStorage.getItem('shpopStore'));


    if (shpopStore) {
        drawControl.setDrawingOptions({
            polyline: {
                shapeOptions: shpopStore
            }
        });
        polylineDrawer.options.shapeOptions = shpopStore;
        $('#txtcolor').val(shpopStore.color);
        $('#txtweight').val(shpopStore.weight);
        $('#txtopacity').val(shpopStore.opacity);
    }

    //zxc('#txtPrjBasTarihi').change(function () {

    //})
    window.addEventListener('click', function (ee) {
        if (ee.target.closest("#mdlMenu") == null)
            menu.style.display = 'none';
    });

    $("#mdlVeri").on('show.bs.modal', function () {
        $(this).find('.modal-dialog').draggable({
            handle: ".modal-header" // Modalın başlık kısmından sürüklemeyi sağlamak için
        });
    });

    zxc('#mnYakinlas').click(function () {
        map.setZoom(map.getZoom() + 1);
    });
    zxc('#mnUzaklas').click(function () {
        map.setZoom(map.getZoom() - 1);
    });
    zxc('#mnKoordinaTblg').click(function () {
        MesajVer(curLatLng, MesajDurumu.Info)
    });

    $('#mdlSonuc').on('hidden.bs.modal', function (e) {
        zxc('#mdlSonuc').classSil('shake');
    });

    zxc('.kataacsall').click(function () {
        var qw = this;
        document.querySelectorAll('#lstKatman .fvd').forEach(q => {
            if (zxc('.kataacsall').attr('data-open') == "1") {
                zxc(q).classEkle("of");
            }
            else {
                zxc(q).classSil("of");
            }
        });
        if (zxc('.kataacsall').attr('data-open') == "1") {
            zxc(qw).attr("data-open", "0").ilkElement().attr("class", "bx bx-chevron-down");;
        }
        else { zxc(qw).attr("data-open", "1").ilkElement().attr("class", "bx bx-chevron-up"); }

    });

    document.querySelector('.chbfF').checked = false;

    zxc('#btn-zm1').click(function () {
        var z1 = map.getZoom(),
            z2 = map.getMaxZoom();
        if (z1 < z2)
            map.setZoom(z1 + 1)
    });
    zxc('#btn-zm2').click(function () {
        var z1 = map.getZoom(),
            z2 = map.getMinZoom();
        if (z1 > z2)
            map.setZoom(z1 - 1)
    })

    zxc('#btn-linset').click(function () {
        $('#cfmodal').modal('show');
    })
    zxc('#btn-modd').click(function () {
        var q = this,
            w = q.getAttribute('data-mod');
        if (w == "2") {
            q.setAttribute('data-mod', "1");
            document.body.classList.remove("koyu");
            zxc(q).sonElement().html("Koyu Mod");
        }
        else {
            q.setAttribute('data-mod', "2");
            document.body.classList.add("koyu");
            zxc(q).sonElement().html("Açık Mod");
        }
    })

    zxc('#btn-edtip').click(function () {
        window.location.href = window.location.origin + window.location.pathname;

    })

    zxc('#btn-info').click(function () {
        var q = this,
            w = zxc(q).attr('data-mod'),
            e = zxc(q).ilkElement().dom;
        if (w == "1") {
            zxc(q).classEkle("act")
            zxc(e).attr("class", "bx bxs-info-square")
            zxc(q).attr('data-mod', "2")
        } else {
            zxc(q).classSil("act")
            zxc(e).attr("class", "bx bx-info-square")
            zxc(q).attr('data-mod', "1")
        }
    })

    var prjref = zxc.parseQuery("projeref")
    if (prjref != "")
        zxc('#btn-edtip').attrSil('hidden');

    document.getElementById('rngOpak').onchange = function () {
        fncOpakAyr(this.value)
    }


    opaklikVal = JSON.parse(localStorage.getItem('Opaklik'));
    zxc('#rngOpak').value(opaklikVal);

})


function uploadNetcatFile() {
    var fileInput = document.getElementById('fileInputNtc');
    var file = fileInput.files[0];
    var formData = new FormData();
    formData.append('file', file);

    fetch('/api/NetcatFileUpload/upload', {
        method: 'POST',
        body: formData
    })
        .then(response => response.json())
        .then(data => {
            fetch(data.filePath)
                .then(response => response.json())
                .then(geojson => {
                    L.geoJSON(geojson).addTo(map);
                });
        })
        .catch(error => console.error('Error:', error));
}

//#region Harita

function createProxyUrl(baseUrl, params) {
    // WMS parametrelerini ekle
    const wmsParams = {
        service: 'WMS',
        request: 'GetMap',
        version: '1.1.1',
        format: 'image/png',
        transparent: true,
        ...params // Gelen diğer parametreleri birleştir
    };

    // Parametreleri URL'e ekle
    const queryString = Object.keys(wmsParams)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(wmsParams[key])}`)
        .join('&');

    return `/api/Api_Genel/wms-proxy?url=${encodeURIComponent(baseUrl + '?' + queryString)}`;
}
function fncHaritaOlustur() {
    var xx1 = zxc.parseQuery("x"), yy1 = zxc.parseQuery("y");
    if (xx1 != "" && yy1 != "") {
        map = new L.Map('map', {
            // crs: L.CRS.EPSG4326,
            center: new L.LatLng(parseFloat(yy1), parseFloat(xx1)),
            zoom: 19
        });
    }

    else
        map = new L.Map('map', {
            //crs: L.CRS.EPSG4326,
            center: new L.LatLng(37.8716, 32.4846),
            zoom: 13
        });

    editableLayers = L.featureGroup().addTo(map);
    var yandexLayer = new L.Yandex('map', {
        apiKey: '04735742-6880-4928-bdd3-e226083031b0',
        maxZoom: 21
    });

    //var bingLayer = L.tileLayer.bing({
    //    bingMapsKey: 'YOUR_BING_MAPS_API_KEY', // Buraya Bing Maps API anahtarınızı ekleyin
    //    imagerySet: 'AerialWithLabels', // İstediğiniz görüntüleme setini seçebilirsiniz
    //});


    // Özel WMS Layer sınıfı
    L.TileLayer.CustomWMS = L.TileLayer.WMS.extend({
        getTileUrl: function (coords) {
            var tileBounds = this._tileCoordsToBounds(coords);
            var url = L.TileLayer.WMS.prototype.getTileUrl.call(this, coords);
            return `/api/Api_Genel/wms-proxy?url=${encodeURIComponent(url)}`;
        }
    });
    L.tileLayer.customWMS = function (url, options) {
        return new L.TileLayer.CustomWMS(url, options);
    };
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
            "NIP_ARAZI_KULLANIM": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'NIP_ARAZI_KULLANIM',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "paftalar": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'paftalar',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "TESCILLI_ALAN": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'TESCILLI_ALAN',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_BINA": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_BINA',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_ILCE": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_ILCE',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_MAHALLE": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_MAHALLE',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_NUMARATAJ": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_NUMARATAJ',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_TASINMAZ": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_TASINMAZ',
                format: 'image/png',
                maxZoom: 21,
                minZoom: 0,
                transparent: true
            }),
            "AYKOME_YOL": L.tileLayer.customWMS('http://kbs.konya.bel.tr/geoserver/w_aykome_wms/ows', {
                layers: 'AYKOME_YOL',
                format: 'image/png',
                transparent: true,
                version: '1.1.1',
                width: 256,
                height: 256,
                srs: 'EPSG:3857',
                maxZoom: 21,
                minZoom: 0,
                tiled: true
            }),
            "Drawlayer": editableLayers,

        },
        { position: 'topright', collapsed: false }
    ).addTo(map);

    //var scaleControl = L.control.scale({
    //    position: 'bottom-right'
    //});
    //map.addControl(scaleControl);




    //// Özelleştirilmiş Ölçek Kontrolü Tanımı
    //L.Control.CustomScale = L.Control.extend({
    //    options: {
    //        position: 'bottomleft',
    //    },

    //    onAdd: function (map) {
    //        var container = L.DomUtil.create('div', 'leaflet-control-custom-scale');
    //        this._scaleText = L.DomUtil.create('div', '', container);
    //        this._map = map;
    //        this._updateScale();
    //        map.on('zoomend moveend', this._updateScale, this);
    //        return container;
    //    },

    //    onRemove: function (map) {
    //        map.off('zoomend moveend', this._updateScale, this);
    //    },

    //    _updateScale: function () {
    //        var bounds = this._map.getBounds();
    //        var centerLat = bounds.getCenter().lat;
    //        var halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180);
    //        var dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180;
    //        var size = this._map.getSize();
    //        var maxMeters = dist * (100 / size.x);

    //        var scale = this._getRoundNum(maxMeters);
    //        var scaleRatio = 1 / (scale / maxMeters);

    //        this._scaleText.innerHTML = 'Scale 1:' + Math.round(scaleRatio);
    //    },

    //    _getRoundNum: function (num) {
    //        var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1);
    //        var d = num / pow10;

    //        d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

    //        return pow10 * d;
    //    }
    //});

    //// Özelleştirilmiş ölçek kontrolünü haritaya ekleme
    //L.control.customScale = function (opts) {
    //    return new L.Control.CustomScale(opts);
    //}
    //L.control.customScale().addTo(map);










    //2

    //L.Control.customScale = L.Control.extend({
    //    options: {
    //        position: 'bottomleft',
    //        maxWidth: 100,
    //        metric: true,
    //        imperial: true,
    //        updateWhenIdle: false
    //    },

    //    onAdd: function (map) {
    //        this._map = map;

    //        var className = 'leaflet-control-scale',
    //            container = L.DomUtil.create('div', className),
    //            options = this.options;

    //        this._addScales(options, className, container);

    //        map.on(options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
    //        map.whenReady(this._update, this);

    //        return container;
    //    },

    //    onRemove: function (map) {
    //        map.off(this.options.updateWhenIdle ? 'moveend' : 'move', this._update, this);
    //    },

    //    _addScales: function (options, className, container) {
    //        if (options.metric) {
    //            this._mScale = L.DomUtil.create('div', className + '-line', container);
    //        }
    //        if (options.imperial) {
    //            this._iScale = L.DomUtil.create('div', className + '-line', container);
    //        }
    //    },

    //    _update: function () {
    //        var bounds = this._map.getBounds(),
    //            centerLat = bounds.getCenter().lat,
    //            halfWorldMeters = 6378137 * Math.PI * Math.cos(centerLat * Math.PI / 180),
    //            dist = halfWorldMeters * (bounds.getNorthEast().lng - bounds.getSouthWest().lng) / 180,

    //            size = this._map.getSize(),
    //            options = this.options,
    //            maxMeters = 0;

    //        if (size.x > 0) {
    //            maxMeters = dist * (options.maxWidth / size.x);
    //        }

    //        this._updateScales(options, maxMeters);
    //    },

    //    _updateScales: function (options, maxMeters) {
    //        if (options.metric && maxMeters) {
    //            this._updateMetric(maxMeters);
    //        }

    //        if (options.imperial && maxMeters) {
    //            this._updateImperial(maxMeters);
    //        }
    //    },

    //    _updateMetric: function (maxMeters) {
    //        var meters = this._getRoundNum(maxMeters);

    //        this._mScale.style.width = this._getScaleWidth(meters / maxMeters) + 'px';
    //        this._mScale.innerHTML = meters < 1000 ? meters + ' m' : (meters / 1000) + ' km';
    //    },

    //    _updateImperial: function (maxMeters) {
    //        var maxFeet = maxMeters * 3.2808399,
    //            scale = this._iScale,
    //            maxMiles, miles, feet;

    //        if (maxFeet > 5280) {
    //            maxMiles = maxFeet / 5280;
    //            miles = this._getRoundNum(maxMiles);

    //            scale.style.width = this._getScaleWidth(miles / maxMiles) + 'px';
    //            scale.innerHTML = miles + ' mi';

    //        } else {
    //            feet = this._getRoundNum(maxFeet);

    //            scale.style.width = this._getScaleWidth(feet / maxFeet) + 'px';
    //            scale.innerHTML = feet + ' ft';
    //        }
    //    },

    //    _getScaleWidth: function (ratio) {
    //        return Math.round(this.options.maxWidth * ratio) - 10;
    //    },

    //    _getRoundNum: function (num) {
    //        var pow10 = Math.pow(10, (Math.floor(num) + '').length - 1),
    //            d = num / pow10;

    //        d = d >= 10 ? 10 : d >= 5 ? 5 : d >= 3 ? 3 : d >= 2 ? 2 : 1;

    //        return pow10 * d;
    //    }
    //});

    //L.control.customScale = function (options) {
    //    return new L.Control.customScale(options);
    //};
    ///*    L.control.customScale().addTo(map);*/




    //L.control.scale().addTo(map);



    L.control.scale(
        {
            metric: true,
            imperial: false,
            maxWidth: 100,
            position: 'bottomleft',
            updateWhenIdle: false,
        }
    ).addTo(map);

    drawControl = new L.Control.Draw({
        draw: {
            // polyline: true,
            polyline: {
                shapeOptions: {
                    stroke: true,
                    color: '#3388ff',
                    weight: 4,
                    opacity: 0.5,
                    fill: false,
                    clickable: true
                },
            },
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
        }
        /*   edit: edit,*/
        //, edit: {
        //    featureGroup: editableLayers,
        //    remove: true
        //}
    });


    // Polyline aracı
    polylineDrawer = new L.Draw.Polyline(map, drawControl.options.draw.polyline);
    document.getElementById('draw-polyline').addEventListener('click', function () {
        polylineDrawer.enable();
    });

    map.addControl(drawControl);

    map.on(L.Draw.Event.DRAWSTART, function () {
        var eksikIslem = false,
            chbs = document.querySelectorAll('.chbKatOnOf');

        var prjref = zxc.parseQuery("projeref")
        if (prjref != "") {
            if (czmYtk == false) {
                MesajVer("Bu İşlem İçin Yetkiniz Yok!", MesajDurumu.Alert);
                map.removeControl(drawControl);
                map.addControl(drawControl);
                polylineDrawer.disable();
                return;
            }
        }

        for (var i = 0; i < chbs.length; i++) {
            if (chbs[i].checked == false || (parseInt(chbs[i].getAttribute('data-zoom')) <= map.getZoom()) == false) {
                eksikIslem = true;
                break;
            }
        }
        if (eksikIslem) {
            MesajVer("Katmanları Açınız ve Kazı Çizgisi İçin Yakın Bir Ölçeğe Yaklaşın!", MesajDurumu.Warning);
            map.removeControl(drawControl);
            map.addControl(drawControl);
            polylineDrawer.disable();
        }
        //var ddf = document.querySelector('.chbKatOnOf[data-title="AYKOME_ILCE_WFS"]'),
        //    ddf1 = document.querySelector('.chbKatOnOf[data-title="AYKOME_MAHALLE_WFS"]'),
        //    ddf2 = document.querySelector('.chbKatOnOf[data-title="AYKOME_YOL_WFS"]');



        //if (ddf.checked == false || ddf1.checked == false || ddf2.checked == false) {
        //    MesajVer("AYKOME_ILCE_WFS, AYKOME_MAHALLE_WFS, AYKOME_YOL_WFS Katmanları Seçili OLmalı!", MesajDurumu.Warning);
        //    map.removeControl(drawControl);
        //    map.addControl(drawControl);
        //    polylineDrawer.disable();
        //}
        //else if (parseInt(ddf.getAttribute('data-zoom')) > map.getZoom() || parseInt(ddf1.getAttribute('data-zoom')) > map.getZoom() || parseInt(ddf2.getAttribute('data-zoom')) > map.getZoom()) {
        //    MesajVer("AYKOME_ILCE_WFS, AYKOME_MAHALLE_WFS, AYKOME_YOL_WFS Katmanını İçin Yakın Bir Ölçeğe Yaklaşılmalıdır!", MesajDurumu.Warning);
        //    map.removeControl(drawControl);
        //    map.addControl(drawControl);
        //    //map.removeControl(polylineDrawer);
        //    //map.addControl(polylineDrawer);
        //    polylineDrawer.disable();
        //    //polylineDrawer.enable();
        //}
    });
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

    //map.on('dblclick', function (e) {
    //    var originalEvent = e.originalEvent;
    //    originalEvent.preventDefault();   // Varsayılan olayı engeller
    //    originalEvent.stopPropagation();   
    //});
    map.on('contextmenu', function (e) {
        curLatLng = "Enlem:  " + e.latlng.lat + "\r\nBoylam:  " + e.latlng.lng;
    });


    const lblEnl = document.getElementById('lblEnl'),
        lblByl = document.getElementById('lblByl');
    map.on('mousemove', function (e) {
        lblEnl.innerHTML = e.latlng.lat.toFixed(5);
        lblByl.innerHTML = e.latlng.lng.toFixed(5);
    })

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
    fncKatmanHazirla();
    fncEskiCizim();
    map.doubleClickZoom.disable();

    ////// Ölçek kontrolü oluşturma
    ////var scaleControl = L.Control.extend({
    ////    onAdd: function (map) {
    ////        var container = L.DomUtil.create('div', 'scale-control');
    ////        this._scaleDiv = container;
    ////        map.on('zoomend', this._updateScale, this);
    ////        this._updateScale();
    ////        return container;
    ////    },

    ////    _updateScale: function () {
    ////        var scale = this._getScale();
    ////        this._scaleDiv.innerHTML = 'Ölçek: 1/' + scale;
    ////    },

    ////    _getScale: function () {
    ////        var zoom = map.getZoom();
    ////        var scale = Math.round(40075016.686 / (256 * Math.pow(2, zoom)));
    ////        return scale;
    ////    }
    ////});

    ////// Ölçek kontrolünü haritaya ekleme
    ////map.addControl(new scaleControl({ position: 'bottomleft' }));

    ////var targetScale = 5000;
    ////var targetZoom = calculateZoomLevel(targetScale);

    ////// Zoom seviyesi değiştiğinde kontrol etme
    ////map.on('zoomend', function () {
    ////    var currentZoom = map.getZoom();
    ////    var currentScale = getScaleFromZoom(currentZoom);
    ////    console.log(currentScale + "---" + targetScale)
    ////    if (currentScale < targetScale) {
    ////        MesajVer('Ölçek sınırını geçtiniz!');
    ////    }
    ////});
}

// Mevcut zoom seviyesine göre ölçeği hesaplayan fonksiyon
function getScaleFromZoom(zoom) {
    var resolution = (40075016.686 / 256) / Math.pow(2, zoom);
    var dpi = 96;  // Varsayılan ekran çözünürlüğü (dots per inch)
    var inchesPerMeter = 39.37;  // Metre başına inç
    var scale = resolution * dpi * inchesPerMeter;
    return Math.round(scale);
}

// Belirli bir ölçek için gerekli zoom seviyesini hesaplayan fonksiyon
function calculateZoomLevel(scale) {
    return Math.log2(40075016.686 / (256 * scale));
}

var dagitimBirims = [];
function fncDrawCreated(e) {
    var YolVerisi = [], koordinatLst = [];
    zxc('#lstBirimler').html(" ");

    var type = e.layerType,
        layerCur = e.layer,
        lineGeoJSON = layerCur.toGeoJSON();

    var toplamUzunluk = 0;
    if (e.layerType == 'polyline') {
        var coords = layerCur.getLatLngs();
        for (var i = 0; i < coords.length - 1; i++)
            toplamUzunluk += coords[i].distanceTo(coords[i + 1]);
    }

    var deger = 0;
    editableLayers.getLayers().forEach(q => {
        deger += L.GeometryUtil.length(q.getLatLngs());
    })
    deger += toplamUzunluk;
    if (deger > 2500) {
        MesajVer(`Toplamda 2.5 Km geçemezssiniz!<br /><br />
        *Önceki Çizimin ${(deger - toplamUzunluk).toFixed(2)} Metre<br />
        *Toplam Çizim ${deger.toFixed(2)} Metre`, MesajDurumu.Alert);
        return;
    }

    layerCur.on('dblclick', fncCizimiSilOpn);
    editableLayers.addLayer(layerCur);

    var bufferYol = turf.buffer(lineGeoJSON, 5, { units: 'meters' });
    var bufferIlce = turf.buffer(lineGeoJSON, 1, { units: 'meters' });
    var bufferDagitim = turf.buffer(lineGeoJSON, 5, { units: 'meters' });
    layerCur.bringToFront();
    //var bufferLayer = L.geoJson(bufferYol, {
    //    style: {
    //        color: 'blue', // Buffer poligonunun rengi
    //        weight: 2,
    //        opacity: 1,
    //        fillOpacity: 0.4
    //    }
    //}).addTo(map);

    var ilcDat = [], mhlDat = [], yolDat = [];

    katman.forEach(function (item) {
        var geoJsonLayer = item.KatmanJson;
        geoJsonLayer.eachLayer(function (layer) {

            if (layer.feature.geometry.type === 'Polygon') {
                if (layer !== layerCur) {
                    var layerGeoJSON = layer.toGeoJSON();
                    if (turf.booleanIntersects(bufferIlce, layerGeoJSON)) {
                        if (layer.feature != undefined && layer.feature.id != undefined && layer.feature.id.substr(0, 15) == "AYKOME_ILCE_WFS") {
                            console.log("Buffer İlçe=>", layer.feature.properties.ADI_NUMARASI);
                            console.log("1 YOL_MALZEME Yol=>", layer.feature.properties.YOL_MALZEME);
                            ilcDat.push({
                                ADI_NUMARASI: layer.feature.properties.ADI_NUMARASI,
                                ILCEREF: layer.feature.properties.ILCEREF
                            });
                        }
                        else if (layer.feature != undefined && layer.feature.id != undefined && layer.feature.id.substr(0, 18) == "AYKOME_MAHALLE_WFS") {
                            console.log("Buffer Mahalle=>", layer.feature.properties.ADI_NUMARASI);
                            console.log("2 YOL_MALZEME Yol=>", layer.feature.properties.YOL_MALZEME);
                            mhlDat.push({
                                ADI_NUMARASI: layer.feature.properties.ADI_NUMARASI,
                                ILCEREF: layer.feature.properties.ILCEREF,
                                MAHALLEREF: layer.feature.properties.MAHALLEREF
                            });
                        }
                    }
                }
            }
            if (layer.feature.geometry.type === 'LineString') {
                if (layer !== layerCur) {
                    var layerGeoJSON = layer.toGeoJSON();

                    if (turf.booleanIntersects(bufferYol, layerGeoJSON)) {

                        if (layer.feature != undefined && layer.feature.id != undefined && layer.feature.id.replace(/\.[0-9]*/, "") == "AYKOME_YOL_WFS") {
                            console.log("Buffer Yol=>", layer.feature.properties.ADI_NUMARASI);
                            console.log("3 YOL_MALZEME Yol=>", layer.feature.properties.YOL_MALZEME);

                            //if (layer.feature.properties.YOL_MALZEME == "0") {
                            //    alert("Yol malzeme tipi tanımsız olduğundan AYKOME birimi ile iletişime geçmeniz gerekmektedir.\r\n" + layer.feature.properties.YOL_MALZEME +"");
                            //    editableLayers.removeLayer(layerCur);
                            //    return;
                            //}
                            yolDat.push({
                                YOL_AIDIYET: layer.feature.properties.YOL_AIDIYET,
                                CADDESOKAKID: layer.feature.properties.CADDESOKAKID,
                                ADI_NUMARASI: layer.feature.properties.ADI_NUMARASI,
                                YOL_MALZEME: layer.feature.properties.YOL_MALZEME,
                                YAPIM_TARIHI: layer.feature.properties.YAPIM_TARIHI,
                            });

                            //fncGetYOL_mah(layer.feature.properties.YOLREF, function (ghy) {
                            //    //YolVerisi.push(layer.feature.properties);
                            //    if (ghy.length == 1) {
                            //        YolVerisi.push({
                            //            YOL_AIDIYET: layer.feature.properties.YOL_AIDIYET,
                            //            CADDESOKAKID: layer.feature.properties.CADDESOKAKID,
                            //            ADI_NUMARASI: layer.feature.properties.ADI_NUMARASI,
                            //            YOL_MALZEME: layer.feature.properties.YOL_MALZEME,
                            //            YAPIM_TARIHI: layer.feature.properties.YAPIM_TARIHI,
                            //            ILCEREF: ghy[0].ILCEREF,
                            //            IlceAdi: ghy[0].IlceAdi,
                            //            MAHALLEREF: ghy[0].MAHALLEREF,
                            //            MahalleAdi: ghy[0].MahalleAdi,
                            //            Metresi: toplamUzunluk.toFixed(2),
                            //        });
                            //    }
                            //    else {
                            //        //alert("Birden fazla Veri Tesbit");
                            //        //console.log("=====>", ghy);
                            //        for (var m = 0; m < ghy.length; m++) {
                            //            YolVerisi.push({
                            //                YOL_AIDIYET: layer.feature.properties.YOL_AIDIYET,
                            //                CADDESOKAKID: layer.feature.properties.CADDESOKAKID,
                            //                ADI_NUMARASI: layer.feature.properties.ADI_NUMARASI,
                            //                YOL_MALZEME: layer.feature.properties.YOL_MALZEME,
                            //                YAPIM_TARIHI: layer.feature.properties.YAPIM_TARIHI,
                            //                ILCEREF: ghy[m].ILCEREF,
                            //                IlceAdi: ghy[m].IlceAdi,
                            //                MAHALLEREF: ghy[m].MAHALLEREF,
                            //                MahalleAdi: ghy[m].MahalleAdi,
                            //                Metresi: toplamUzunluk.toFixed(2),
                            //            });
                            //        }
                            //    }
                            //});
                        }
                    }

                    if (turf.booleanIntersects(bufferDagitim, layerGeoJSON)) {
                        if (item.BirimID != "null")
                            if (!dagitimBirims.some(function (det) {
                                return det.BirimID === item.BirimID && det.Birim === item.Birim;
                            })) {
                                dagitimBirims.push({
                                    BirimID: item.BirimID,
                                    Birim: item.Birim
                                });
                            }
                    }
                }
            }
        });
    });

    var coordinates = layerCur.getLatLngs();

    for (var i = 0; i < coordinates.length; i++) {
        if (!koordinatLst.some(function (koordinat) {
            return koordinat.Lng === coordinates[i].lat && koordinat.Lat === coordinates[i].lng;
        })) {
            koordinatLst.push({ Lng: coordinates[i].lat, Lat: coordinates[i].lng });
        }
    }
    setTimeout(function () {
        for (var j = 0; j < ilcDat.length; j++) {
            for (var k = 0; k < mhlDat.length; k++) {
                for (var l = 0; l < yolDat.length; l++) {
                    var sonIslem = (ilcDat.length == j + 1 && mhlDat.length == k + 1 && yolDat.length == l + 1);
                    fncIlcedeKaziIzni(layerCur, ilcDat[j].ILCEREF, mhlDat[k].MAHALLEREF, yolDat[l].YOL_AIDIYET, yolDat[l], ilcDat[j].ADI_NUMARASI, mhlDat[k].ADI_NUMARASI, sonIslem, function (ILCEREF, IlceAdi, MAHALLEREF, MahalleAdi, yolDat, sonIslem) {
                        YolVerisi.push({
                            YOL_AIDIYET: yolDat.YOL_AIDIYET,
                            CADDESOKAKID: yolDat.CADDESOKAKID,
                            ADI_NUMARASI: yolDat.ADI_NUMARASI,
                            YOL_MALZEME: yolDat.YOL_MALZEME,
                            YAPIM_TARIHI: yolDat.YAPIM_TARIHI == null ? "" : yolDat.YAPIM_TARIHI,
                            ILCEREF: ILCEREF,
                            IlceAdi: IlceAdi,
                            MAHALLEREF: MAHALLEREF,
                            MahalleAdi: MahalleAdi,
                            Metresi: toplamUzunluk.toFixed(2),
                        });
                        if (sonIslem) {
                            localData.push({
                                UUID: generateUUID(),
                                YolVerisi: YolVerisi,
                                koordinatLst: koordinatLst,
                                layerCur: layerCur,
                                layerCur2: lineGeoJSON
                            });
                        }
                    })
                }
            }
        }
        //if (YolVerisi.length > 0)
        //    localData.push({
        //        UUID: generateUUID(),
        //        YolVerisi: YolVerisi,
        //        koordinatLst: koordinatLst,
        //        layerCur: layerCur,
        //        layerCur2: lineGeoJSON
        //    });
    }, 1000)

    //  sessionStorage.setItem("localData", JSON.stringify(localData, removeCircularReferences()));
}

function removeCircularReferences() {
    const seen = new WeakSet();
    return function (key, value) {
        if (typeof value === "object" && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
}

function fncCizimiSilOpn(event) {
    var clickedLayer = event.target;
    var prjref = zxc.parseQuery("projeref")
    if (prjref != "" && clickedLayer.feature != undefined) {

        if (czmYtk == false) {
            MesajVer("Silme İşlem İçin Yetkiniz Yok!", MesajDurumu.Alert);
            return;
        }
        var KaziRef = clickedLayer.feature.properties.KaziRef;
        if (KaziRef) {
            var indexCur = localData.findIndex(q => q.layerCur2.properties.KaziRef == KaziRef);
            if (indexCur !== -1) {
                zxc('#mdlCizSil').attr('data-id', indexCur + " ");
                fncModalAc("#mdlCizSil")
            }
        }
    }
    else {
        var indexCur = localData.findIndex(q => q.layerCur == clickedLayer);
        if (indexCur !== -1) {
            zxc('#mdlCizSil').attr('data-id', indexCur + " ");
            fncModalAc("#mdlCizSil")
        }
    }

}

function fncCizimiSilSon() {
    var indexCur = parseInt(zxc('#mdlCizSil').attr('data-id'));
    if (indexCur !== -1) {
        var prjref = zxc.parseQuery("projeref")
        if (prjref != "") {
            var iid = localData[indexCur].UUID;
            var fg = document.querySelectorAll('#domisDetay .czg');
            for (var v = 0; v < fg.length; v++) {
                if (iid == fg[v].getAttribute('data-id')) {
                    zxc(fg[v]).elementiSil();
                    break;
                }
            }
            this.map.eachLayer(function (layer) {
                if (!layer._url)
                    if (layer.feature && layer.feature.properties && layer.feature.properties.KaziRef)
                        if (layer.feature.properties.KaziRef == iid) {
                            this.map.removeLayer(layer);
                        }

            });
            editableLayers.removeLayer(localData[indexCur].layerCur);
            localData.splice(indexCur, 1);
        }
        else {
            editableLayers.removeLayer(localData[indexCur].layerCur);
            localData.splice(indexCur, 1);
        }
    }
    fncModalGizle();
    MesajVer("Çizim Silindi.", MesajDurumu.Info);
}

function highlightFeature(e) {
    // if (zxc('#btn-info').attr("data-mod") == "2") {
    var layer = e.target;
    if (layer.feature.geometry.type == 'LineString') {
        layer.setStyle({
            weight: 5,
            color: '#666',
            dashArray: '1',
            fillOpacity: 0.7
        });
        // info.update(layer.feature.properties);

        layer.bringToFront();

    }
    //   }
}

function resetHighlight(e) {
    var layer = e.target;
    if (layer.feature.geometry.type == 'LineString') {
        katman.forEach(q => q.KatmanJson.resetStyle(layer));
        //info.update();
    }
}
function onEachFeaturex(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: fncKatmanClkGe
    });
}

function fncKatmanClkGe(e) {
    if (zxc('#btn-info').attr("data-mod") == "2") {
        var httm = '';
        zxc("#mdlKatmanBoody,#mdlKatmanBaslik").html(" ");
        var target = e.target,
            ggt = document.querySelector('.chbKatOnOf[data-id="' + target.options.RefKatID + '"]');

        for (var property in e.target.feature.properties)
            httm = httm.concat('<li class="list-group-item"><span>' + property + "</span><span class=' float-end fw-bold'>" + target.feature.properties[property], '</span></li>');

        if (ggt != null) {
            zxc('#mdlKatmanBaslik').html(ggt.getAttribute('data-title'));
        }
        zxc("#mdlKatmanBoody").html('<ol class="list-group list-group-numbered">' + httm + '</ol');
        fncModalAc("#mdlKatmanFtr");
    }
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

function fncEskiCizim() {
    //var q = sessionStorage.getItem('localData');
    //if (q != null) {
    //    var w = JSON.parse(q),
    //        allLayers = [];
    //    for (var i = 0; i < w.length; i++) {
    //        var geoJsonData = w[i].layerCur2;
    //        var layer = L.geoJSON(geoJsonData).getLayers()[0];
    //        editableLayers.addLayer(layer);
    //        allLayers.push(layer);
    //        layer.on('dblclick', fncCizimiSilOpn);
    //    }
    //    localData = w;
    //    var featureGroup = L.featureGroup(allLayers);
    //    map.fitBounds(featureGroup.getBounds());
    //}
}

function fncKaziRefSearch(KaziRef) {
    this.map.eachLayer(function (layer) {
        if (!layer._url) {
            if (layer.feature)
                if (layer.feature.properties.KaziRef == KaziRef) {
                    var originalStyle = layer.options.style;
                    layer.setStyle({ color: 'red' });
                    var interval = setInterval(function () {
                        layer.setStyle({ color: 'red' });
                        setTimeout(function () {
                            layer.setStyle({ color: 'blue' });
                        }, 100);
                    }, 250);
                    setTimeout(function () {
                        clearInterval(interval);
                        layer.setStyle(originalStyle);
                    }, 1500);

                    //  layer.bringToFront();
                }
        }
    }, this);
}

function fncKaziRefSearch2(i) {
    var layer = editableLayers.getLayers()[i];
    if (layer) {
        layer.setStyle({ color: 'red' });
        var interval = setInterval(function () {
            layer.setStyle({ color: 'red' });
            setTimeout(function () {
                layer.setStyle({ color: 'blue' });
            }, 100);
        }, 250);

        setTimeout(function () {
            clearInterval(interval);
            layer.setStyle(JSON.parse(localStorage.getItem('shpopStore')));
        }, 1500);

    }
}

function fncKaziRefSearch3(i) {

    var ll = localData.find(q => q.UUID == i);
    if (ll) {
        if (ll.layerCur) {
            var layer = ll.layerCur;
            layer.setStyle({ color: 'red' });

            var interval = setInterval(function () {
                layer.setStyle({ color: 'red' });
                setTimeout(function () {
                    layer.setStyle({ color: 'blue' });
                }, 100);
            }, 250);
            setTimeout(function () {
                clearInterval(interval);
                layer.setStyle(JSON.parse(localStorage.getItem('shpopStore')));
            }, 1500);
        }
    }
}

function fncLayerHighlight(layer) {
    console.log(layer);

}

function fncKmlYukle2() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var contents = event.target.result;
        const parser = new DOMParser();
        const kml = parser.parseFromString(contents, 'text/xml');
        const track = new L.KML(kml);
        map.addLayer(track);
        const bounds = track.getBounds();
        map.fitBounds(bounds);
    }
    reader.readAsText(file);
}


var ilcDat2 = [], mhlDat1 = [], yolDat2 = [];
function fncKmlYukle() {
    var file = this.files[0];
    var reader = new FileReader();
    reader.onload = function (event) {
        var contents = event.target.result;
        const parser = new DOMParser();
        const kml = parser.parseFromString(contents, 'text/xml');
        const track = new L.KML(kml);
        map.addLayer(track);
        const bounds = track.getBounds();
        map.fitBounds(bounds);

        document.querySelectorAll(".chbKatALLoNoF").forEach(g => g.checked = true);
        document.querySelectorAll(".chbKatOnOf").forEach(g => g.checked = true);
        fncChbWfsOnOf();

        var geojson = track.toGeoJSON();

        var bufferYol = turf.buffer(geojson, 5, { units: 'meters' });
        var bufferIlce = turf.buffer(geojson, 1, { units: 'meters' });
        var bufferDagitim = turf.buffer(geojson, 10, { units: 'meters' });


        katman.forEach(function (item) {
            var geoJsonLayer = item.KatmanJson;
            geoJsonLayer.eachLayer(function (layer) {
                var layerGeoJSON = layer.toGeoJSON();

                if (layer.feature.geometry.type === 'Polygon') {
                    if (layer !== geojson && turf.booleanIntersects(bufferIlce, layerGeoJSON)) {
                        // İlçe verilerini kaydet
                        if (layer.feature.id.substr(0, 15) == "AYKOME_ILCE_WFS") {
                            ilcDat2.push({
                                ADI_NUMARASI: layer.feature.properties.ADI_NUMARASI,
                                ILCEREF: layer.feature.properties.ILCEREF
                            });
                        } else if (layer.feature.id.substr(0, 18) == "AYKOME_MAHALLE_WFS") {
                            mhlDat1.push({
                                ADI_NUMARASI: layer.feature.properties.ADI_NUMARASI,
                                ILCEREF: layer.feature.properties.ILCEREF,
                                MAHALLEREF: layer.feature.properties.MAHALLEREF
                            });
                        }
                    }
                }

                if (layer.feature.geometry.type === 'LineString') {
                    if (layer !== geojson) {
                        // Yol Buffer kontrolü
                        if (turf.booleanIntersects(bufferYol, layerGeoJSON)) {
                            yolDat2.push({
                                YOL_AIDIYET: layer.feature.properties.YOL_AIDIYET,
                                CADDESOKAKID: layer.feature.properties.CADDESOKAKID,
                                ADI_NUMARASI: layer.feature.properties.ADI_NUMARASI,
                                YOL_MALZEME: layer.feature.properties.YOL_MALZEME,
                                YAPIM_TARIHI: layer.feature.properties.YAPIM_TARIHI
                            });
                        }

                        // Dağıtım Buffer kontrolü
                        if (turf.booleanIntersects(bufferDagitim, layerGeoJSON) && item.BirimID != "null") {
                            if (!dagitimBirims.some(det => det.BirimID === item.BirimID && det.Birim === item.Birim)) {
                                dagitimBirims.push({
                                    BirimID: item.BirimID,
                                    Birim: item.Birim
                                });
                            }
                        }
                    }
                }
            });
        });
    };
    reader.readAsText(file);
}

function fncDxfInstall(ee) {
    var file = this.files[0];
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


        var YolVerisi = [], koordinatLst = [];
        // DXF içeriğini Leaflet ile haritaya ekleme
        dxfAry = dxf.entities;
        fncDxfFilesOk();


        //dxf.entities.forEach(function (entity) {

        //    if (entity.type === 'LINE') {
        //        var startPoint = proj4(sourceCrs, destCrs, [entity.vertices[0].x, entity.vertices[0].y]);
        //        var endPoint = proj4(sourceCrs, destCrs, [entity.vertices[1].x, entity.vertices[1].y]);

        //        var latlngs = [
        //            [startPoint[1], startPoint[0]],
        //            [endPoint[1], endPoint[0]]
        //        ];

        //        console.log("11")
        //        fncDxfFileIsle(latlngs)
        //            .then(() => {

        //        })

        //        //fncWfsKatmanYukle(DbKatmanID, WfsKatmanDetayID, katmantip, KatmanRenk, BirimID, Birim, Zindex)
        //        //    .then(() => {
        //        //        resolve();
        //        //    })
        //        //    .catch((error) => {
        //        //        reject(error);
        //        //    });

        //        //console.log(latlngs)
        //        //var layerCur = L.polyline(latlngs, {
        //        //    color: "red",
        //        //    weight: 1,
        //        //    test: 124
        //        //}
        //        //).addTo(map);



        //        //map.fitBounds(plyLine.getBounds());
        //    }
        //    // Diğer geometrik öğeler için gerekli işlemleri yapabilirsiniz
        //});
    };
    reader.readAsText(file);
}

var dxfIndex = 0, dxfAry = [];
function fncDxfFilesOk() {

    var sourceCrs = '+proj=utm +zone=36 +datum=WGS84 +units=m +no_defs';
    var destCrs = '+proj=longlat +datum=WGS84 +no_defs';

    var entity = dxfAry[dxfIndex];

    // if (entity.type === 'LINE') {
    if (entity.type === 'POLYLINE' || entity.type === 'LWPOLYLINE') {
        var startPoint = proj4(sourceCrs, destCrs, [entity.vertices[0].x, entity.vertices[0].y]);
        var endPoint = proj4(sourceCrs, destCrs, [entity.vertices[1].x, entity.vertices[1].y]);

        var latlngs = [
            [startPoint[1], startPoint[0]],
            [endPoint[1], endPoint[0]]
        ];

        fncDxfFileIsle(latlngs).then(() => {
            if (dxfIndex < dxfAry.length - 1) {
                dxfIndex++;
                fncDxfFilesOk();
            }
            else {
                console.log("Bitti", dxfIndex)
            }
        });

    }
}

var aaYolVerisi = [];
function fncDxfFileIsle(latlngs) {
    return new Promise((resolve, reject) => {
        var plyLine = L.polyline(latlngs, {
            color: "red",
            weight: 1,
            test: 124
        }
        ).addTo(map);
        //console.log("22")
        map.fitBounds(plyLine.getBounds());


        var lineGeoJSON = plyLine.toGeoJSON();
        var bufferYol = turf.buffer(lineGeoJSON, 5, { units: 'meters' });
        var bufferDagitim = turf.buffer(lineGeoJSON, 10, { units: 'meters' });
        katman.forEach(function (item) {
            var geoJsonLayer = item.KatmanJson;
            geoJsonLayer.eachLayer(function (layer) {
                if (layer.feature.geometry.type === 'LineString') {
                    if (layer !== plyLine) {
                        var layerGeoJSON = layer.toGeoJSON();

                        if (turf.booleanIntersects(bufferYol, layerGeoJSON)) {
                            if (layer.feature != undefined && layer.feature.id != undefined && layer.feature.id.replace(/\.[0-9]*/, "") == "AYKOME_YOL_WFS") {
                                console.log("Buffer=>", layer.feature.properties.ADI_NUMARASI);
                                aaYolVerisi.push(layer.feature.properties);
                            }
                        }

                        //if (turf.booleanIntersects(bufferDagitim, layerGeoJSON)) {
                        //    if (item.BirimID != "null")
                        //        if (!dagitimBirims.some(function (det) {
                        //            return det.BirimID === item.BirimID && det.Birim === item.Birim;
                        //        })) {
                        //            dagitimBirims.push({
                        //                BirimID: item.BirimID,
                        //                Birim: item.Birim
                        //            });
                        //        }
                        //}
                    }
                }
            });
        });



        if (ALTYAPIdata == false && Aykomedata == false) {
            setTimeout(q => resolve(), 1000);
        }
        else {
            var sctrg = setInterval(function () {
                if (ALTYAPIdata == false && Aykomedata == false) {
                    clearInterval(sctrg);
                    setTimeout(q => resolve(), 1000);
                }
            }, 100)
        }
    });
}

function fncKoordinataGit() {
    var lat = zxc('#txtcEnlem').value(), lng = zxc('#txtcBoylam').value();
    if (lat && lng)
        map.setView(L.latLng(lat, lng));

    zxc('#txtcEnlem,#txtcBoylam').value(" ");
    fncModalGizle();
}

function fncKatmanbringToFront(q) {
    return new Promise((resolve, reject) => {
        map.eachLayer(function (layer) {
            if (!layer._url) {
                if (layer.feature && layer.feature.id.substr(0, q.length) == q)
                    layer.bringToFront();
            }
        });

        resolve();
    });
}

function fncIlcedeKaziIzni(layerCur, IlceID, MahalleID, YolAdiyetText, yolData, IlceAdi, MahalleAdi, sonIslem, fncCallBack) {
    GetJson('/api/Api_Harita/GetKaziYetki/' + IlceID + '/' + MahalleID + '/' + YolAdiyetText, function () {
        fncCallBack(IlceID, IlceAdi, MahalleID, MahalleAdi, yolData, sonIslem);
    }, function () {

    }, function () {

    }, function () {
        if (layerCur) {
            this.map.removeLayer(layerCur);
            editableLayers.removeLayer(layerCur);
        }
    })
}

function fncYapimTarihiKontrol(YAPIM_TARIHI, YOL_MALZEME, ProjeTipi) {
    var sonuc;
    if (ProjeTipi == 26)
        sonuc = true;
    else if (YOL_MALZEME == "1") {
        var yolTarihi = new Date(YAPIM_TARIHI);
        var GuncelTarihi = new Date();
        var farkK = GuncelTarihi.getTime() - yolTarihi.getTime();
        var FarkYil = farkK / (1000 * 3600 * 24 * 365.25);
        if (FarkYil > 3)
            sonuc = false
        else
            sonuc = true
    }
    else
        sonuc = true
}
//#endregion

//#region Katman
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

function fncIlceSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/AbsApi/GetMahalle/' + q, function (data) {

            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                //data.veri.forEach(q => html = html.concat(`<option value="${q.MAHALLEREF}">${q.TANIM}</option>`));
                data.veri.forEach(q => html = html.concat(`<option value="${q.MAHALLEREF}">${q.TANIM}</option>`));
                document.getElementById('slclMahalle').innerHTML = html;
                document.getElementById('slclMahalle').onchange = fncMahalleSecildiginde;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slclMahalle').innerHTML = html;
            document.getElementById('slclCadde').innerHTML = html;

        })
    }
}

function fncMahalleSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/AbsApi/GetCaddeSokak/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.CADDESOKAK_ID}">${q.CADDESOKAK_ADI}</option>`));
                document.getElementById('slclCadde').innerHTML = html;
                document.getElementById('slclCadde').onchange = function () {
                    if (this.vallue != "")
                        fncYolaGit();

                };
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slclCadde').innerHTML = html;
        })
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


var ALTYAPIdata = false, Aykomedata = false;
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
function hexToRgba(hex, alpha) {
    var r = parseInt(hex.slice(1, 3), 16);
    var g = parseInt(hex.slice(3, 5), 16);
    var b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
function fncWfsKatmanYukle(refid, RefKatID, katmantip, KatmanRenk, BirimID, Birim, title) {

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
                        var jsonj1 = JSON.parse(xmlString);

                        var opaklikCur = opaklikVal;

                        if (title == 'AYKOME_ILCE_WFS')
                            KatmanRenk = hexToRgba(KatmanRenk, 0);

                        else if (title == 'AYKOME_MAHALLE_WFS')
                            KatmanRenk = hexToRgba(KatmanRenk, 0);

                        if (title == 'AYKOME_YOL_WFS' || title == 'GunlukKazi1')
                            opaklikCur = 1;

                        var curkatman = L.geoJson(jsonj1, {
                            style: {
                                /*fillColor: getSicColor(feature.id.density),*/
                                weight: 5,
                                opacity: opaklikCur,
                                // color: 'rgba(255, 0, 0, 0.1)',
                                color: KatmanRenk,
                                dashArray: '1',
                                fillOpacity: 1
                            },
                            RefID: refid,
                            RefKatID: RefKatID
                            , onEachFeature: onEachFeaturex
                        }
                        ).addTo(map);

                        //if (title == 'AYKOME_YOL_WFS') {
                        //    curkatman.bringToFront()
                        //}

                        //if (zIndex > 0) {

                        //    //curkatman.eachLayer(function (layer) {
                        //    //    if (layer.setZIndex) {
                        //    //        layer.setZIndex(zIndex);
                        //    //    }
                        //    //});
                        //}
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

    if (zxc('#btn-info').attr("data-mod") == "2") {
        // 
        //var httm = '';

        var target = e.target;

        var KaziRef = target.feature.properties["KaziRef"],
            PROJEREF = target.feature.properties["PROJEREF"];

        if (KaziRef != undefined && PROJEREF != undefined) {
            fncProrefInfoGet(PROJEREF, KaziRef);
        }
        //for (var property in e.target.feature.properties)
        //    httm = httm.concat('<li class="list-group-item"><span>' + property + "</span><span class=' float-end fw-bold'>" + target.feature.properties[property], '</span></li>');
    }
}



//#endregion

//#region Proje Olusturma

function fncPrjInputClear() {
    dagitimBirims = [];
    localData.forEach(q => editableLayers.removeLayer(q.layerCur));
    //localData.forEach(q => editableLayers.removeLayer(L.geoJSON(q.layerCur2).getLayers()[0]));

    zxc('#domisDetay,#lstBirimler,.hesap-logo').html(" ");
    zxc("#txtPrjNo,#txtPrjTalepTarihi,#txtPrjAmaci,#txtPrjBasTarihi,#txtPrjBitTarihi,#txtPrjVatBasTar,#txtPrjTcNo,#txtPrjKapiNo,#txtPrjDilekcNo,#txtPrjIlgKisi,#txtPrjBasYapn").value(" ");
    zxc('#txtPrjTipi').selectbox("-1");
    localData = [];
    //sessionStorage.removeItem("localData");
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
    zxc(q).ustElement(1).elementiSil();
}

function fncMustResmYuk() {
    var fil = this;
    // if (fncImageCheck(fil))
    fncFileToBase64(fil.files[0], function (q) {
        zxc(".ffeer5 ").ekle('<div class="imgdfvv"><div class="imgresww" data-id="' + q + '" data-title="' + fil.files[0].name + '" alt=""><span>' + fil.files[0].name + '</span><a class="aslre" onclick="fncImgDels(this)">Sil</a></div></div>');
        document.getElementById('filMusteriFotograf').value = "";
    });
}

function fncIstetayOlustur() {
    fncDagitimlariGoster();
    zxc('#domisDetay').html(" ");
    var htmlGydirme = '', htmlDiger = '';
    gydirmeLst.forEach(q => htmlGydirme = htmlGydirme.concat(`<div class="scol">
                    <div class="bcol2">
                        <div class="lblDiv">
                            <div class="lbll">${q.Val}</div>
                        </div>
                        <div class="ltxt">
                            <input type="text" class="form-control form-control-sm" data-tip-format="tutar" data-giydirmeref="${q.Key}">
                        </div>
                    </div>
                                    </div>`));

    for (var i = 0; i < localData.length; i++) {
        var yol = localData[i].YolVerisi;

        htmlDiger = htmlDiger.concat('<div class="czg" data-id="' + localData[i].UUID + '"><h3 class="bbs ffdssmps" onclick="fncKaziRefSearch2(' + i + ')">' + (i + 1) + '.Kazı  <i class="bx bxs-map"></i></h3>');
        for (var g = 0; g < yol.length; g++) {

            if (yol[g] == null) {
                continue;
            }
            var mtr = '';
            if (yol.length == 1) {
                mtr = Math.round(yol[g].Metresi);
            }

            // var = ilceAdi, ilceID, mahalleID, mahalleAdi
            var bykshchecked = yol[g].YOL_AIDIYET == 'KONYA BÜYÜKŞEHİR BELEDİYESİ' ? ' checked="checked"' : '';
            htmlDiger = htmlDiger.concat('<div class="mt-3 bbgt">');
            htmlDiger = htmlDiger.concat(`
        <div class="lstHama">
                                    <a class="aselsil"><i class='bx bx-x'></i></a>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Büy.Seh. Ait</div>
                                            </div>
                                            <div class="ltxt">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input"${bykshchecked} data-id="${yol[g].YOL_AIDIYET}" disabled="disabled" type="checkbox" role="switch">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Trafik Plan.</div>
                                            </div>
                                            <div class="ltxt">
                                                <div class="vfre">
                                                <input type="text" readonly class="form-control form-control-sm frgc" />
                                                <input type="file" class="form-control form-control-sm filupltrfpln" />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mnau">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">İlçe</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${yol[g].ILCEREF}" title="${yol[g].IlceAdi}" readonly value="${yol[g].IlceAdi}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mnau">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Belediye</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${yol[g].ILCEREF}" title="${yol[g].IlceAdi}" readonly value="${yol[g].IlceAdi}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mnau">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Mahalle</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${yol[g].MAHALLEREF}" title="${yol[g].MahalleAdi}" readonly value="${yol[g].MahalleAdi}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mnau">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Cadde Sokak</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${yol[g].CADDESOKAKID}" title="${yol[g].ADI_NUMARASI}" readonly value="${yol[g].ADI_NUMARASI}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Yol Malzeme</div>
                                            </div>
                                            <div class="ltxt">
                                                <input value="${yol[g].YOL_MALZEME}" readonly type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="scol">

                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Yapım Tar.</div>
                                            </div>
                                            <div class="ltxt">
                                                <input value="${yol[g].YAPIM_TARIHI}" readonly type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">En(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" class="form-control form-control-sm" data-tip-format="tutar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Boy(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" value="${mtr}" class="form-control form-control-sm" data-tip-format="tutar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Derinlik(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" class="form-control form-control-sm" data-tip-format="tutar" />
                                            </div>
                                        </div>
                                    </div>
                                </div>`);

            htmlDiger = htmlDiger.concat('<div class="lstHama">', htmlGydirme, '</div>');
            htmlDiger = htmlDiger.concat('</div>');
        }
        htmlDiger = htmlDiger.concat('</div>');


        //if (i == localData.length - 1)
        //    htmlDiger = '' + htmlDiger + '</div>';
    }

    zxc('#domisDetay').html(htmlDiger);
    zxc('.aselsil').click(fncCaddeSil);
    zxc('.form-control-sm').change(fncValidClearX);
    zxc('.filupltrfpln').change(fncMustkrokiYuk);


    fncTxtKaplamaEvnt();

}
function fncDagitimlariGoster() {
    zxc('#lstBirimler').html(" ");
    var h = '';
    for (var i = 0; i < dagitimBirims.length; i++)
        h = h.concat(`<div>${dagitimBirims[i].Birim}</div>`);//Birim  BirimID
    zxc('#lstBirimler').html(h);
}

function fncProrefGet(projeRef) {
    GetJson('/api/Api_Harita/GetKaziIngo/' + projeRef, function (data) {

        function checkLayers() {
            let found = false;
            map.eachLayer(function (layer) {
                if (!layer._url && layer.feature &&
                    layer.feature.properties.PROJEREF == projeRef) {
                    found = true;
                }
            });

            if (!found) {
                // Eğer katman bulunamadıysa 500ms sonra tekrar dene
                setTimeout(checkLayers, 500);
            } else {
                // Katman bulunduğunda işlemleri yap
                const allLayers = [];
                map.eachLayer(function (layer) {
                    if (!layer._url) {
                        if (layer.feature &&
                            layer.feature.properties.PROJEREF == projeRef) {
                            allLayers.push(layer);
                            editableLayers.addLayer(layer);
                        }
                    }
                });

                // Diğer işlemler...
                if (allLayers.length > 0) {
                    zxc('#lstBirimler').html(" ");
                    for (var k = 0; k < allLayers.length; k++) {
                        var YolVerisi = [], koordinatLst = [];

                        var layerCur = allLayers[k],
                            lineGeoJSON = layerCur.toGeoJSON();

                        var coordinates = layerCur.getLatLngs();

                        for (var i = 0; i < coordinates.length; i++) {
                            if (!koordinatLst.some(function (koordinat) {
                                return koordinat.Lng === coordinates[i].lat && koordinat.Lat === coordinates[i].lng;
                            })) {
                                koordinatLst.push({ Lng: coordinates[i].lat, Lat: coordinates[i].lng });
                            }
                        }
                        localData.push({
                            UUID: layerCur.feature.properties.KaziRef,
                            YolVerisi: YolVerisi,
                            koordinatLst: koordinatLst,
                            layerCur: layerCur,
                            layerCur2: lineGeoJSON
                        });
                    }

                    var dgt = data.veri.dagitimLst;
                    for (var i = 0; i < dgt.length; i++)
                        dagitimBirims.push({
                            BirimID: dgt[i].ALANBID,
                            Birim: dgt[i].Birim
                        });

                    fncIstetayOlusturDuzenleme(data.veri);

                    var featureGroup = L.featureGroup(allLayers);
                    map.fitBounds(featureGroup.getBounds());
                }
            }
        }
        checkLayers();

        //var allLayers = [];
        //map.eachLayer(function (layer) {
        //    if (!layer._url) {
        //        if (layer.feature)
        //            if (layer.feature.properties.PROJEREF == projeRef) {
        //                allLayers.push(layer);
        //                // layer.on('dblclick', fncCizimiSilOpn);
        //                editableLayers.addLayer(layer);
        //            }
        //    }
        //});



    }, function () {
        fncPrjInputClear();
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

function fncIstetayOlusturDuzenleme(veri) {
    var Edit = veri.yetki,
        aykProje = veri.proje,
        aykDagitim = veri.dagitimLst,
        aykKazi = veri.kaziLst;
    if (Edit == false) {
        zxc('#mnalt1').attr('hidden', 'hidden');
        return;
    }
    else
        alert("Dikkat! Projede bir güncelleme yaparsanız, ilgili tüm birimlerden projeye tekrar onay almanız gerekecektir.");

    zxc("#txtPrjNo").value(aykProje.Projeno);
    zxc("#txtPrjTalepTarihi").value(aykProje.Taleptarihi.replace("T", " ").substr(0, 16));
    zxc("#txtPrjTipi").selectbox(aykProje.Projetipref);
    zxc("#txtPrjAmaci").value(aykProje.Amaci);

    if (aykProje.Projetipref == "2")
        zxc("#pnltcKapiNo").attrSil('hidden');
    else
        zxc("#pnltcKapiNo").attr('hidden', 'hidden');

    if (aykProje.Vatandasbasvurutarihi != null)
        zxc("#txtPrjVatBasTar").value(aykProje.Vatandasbasvurutarihi.substr(0, 10));

    zxc("#txtPrjDilekcNo").value(aykProje.Dilekceno);
    zxc("#txtPrjIlgKisi").value(aykProje.Ilgilikisi);
    zxc("#txtPrjBasYapn").value(aykProje.Basvurusahibi);
    zxc("#txtPrjTcNo").value(aykProje.TcNo);
    zxc("#txtPrjKapiNo").value(aykProje.KapiNo);

    if (aykKazi != null) {
        zxc("#txtPrjBasTarihi").value(aykKazi[0].PBASTAR.substr(0, 10));
        zxc("#txtPrjBitTarihi").value(aykKazi[0].PBITTAR.substr(0, 10));
    }

    zxc('#domisDetay').html(" ");
    var htmlDiger = '';


    if (aykKazi != undefined && aykKazi.length > 0) {
        var kazGrp = aykKazi.groupBy("KAZIREF");
        for (var i = 0; i < kazGrp.length; i++) {
            var aykk = kazGrp[i];
            htmlDiger = htmlDiger.concat('<div class="czg" data-projeref="' + aykProje.Projeref + '" data-id="' + aykk[0].KAZIREF + '"><h3 onclick="fncKaziRefSearch(' + aykk[0].KAZIREF + ')" class="bbs ffdssmps">' + (i + 1) + '.Kazı <i class="bx bxs-map"></i></h3>');

            for (var g = 0; g < aykk.length; g++) {

                var bykshchecked = aykk[g].YolAidiyetAd == 'KONYA BÜYÜKŞEHİR BELEDİYESİ' ? ' checked="checked"' : '';

                htmlDiger = htmlDiger.concat('<div class="mt-3 bbgt">');
                htmlDiger = htmlDiger.concat(`
                <div class="lstHama" >
                                    <a class="aselsil"><i class='bx bx-x'></i></a>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Büy.Seh. Ait</div>
                                            </div>
                                            <div class="ltxt">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input"${bykshchecked} data-id="${aykk[g].YolAidiyetAd}" disabled="disabled" type="checkbox" role="switch">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Trafik Plan.</div>
                                            </div>
                                            <div class="ltxt">
                                                <div class="vfre">
                                                <input ${aykk[g].FILENAME == '' ? '' : 'value="' + aykk[g].FILENAME + '"'} type="text"${aykk[g].FILENAME == '' ? '' : 'data-id="' + aykk[g].FILENAME + '"'} readonly class="form-control form-control-sm frgc" />
                                                <input type="file" class="form-control form-control-sm filupltrfpln" />
                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mnau">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">İlçe</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${aykk[g].ILCEREF}" readonly title="${aykk[g].ilcad}" value="${aykk[g].ilcad}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mnau">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Belediye</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${aykk[g].ILCEREF}" readonly title="${aykk[g].ilcad}" value="${aykk[g].ilcad}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mnau">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Mahalle</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${aykk[g].MAHALLEREF}" readonly title="${aykk[g].MISIM}" value="${aykk[g].MISIM}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mnau">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Cadde Sokak</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${aykk[g].cadderef}" readonly title="${aykk[g].CISIM}" value="${aykk[g].CISIM}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Yol Malzeme</div>
                                            </div>
                                            <div class="ltxt">
                                                <input value="${aykk[g].yolmalzeme}" readonly type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Yapım Tar.</div>
                                            </div>
                                            <div class="ltxt">
                                                <input value="${aykk[g].yolyapimtarihi}" readonly type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">En(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" value="${aykk[g].EN}" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Boy(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" value="${aykk[g].UZUNLUK}" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Derinlik(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" value="${aykk[g].DERINLIK}" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                </div> `);

                var htmlGydirme = '';
                gydirmeLst.forEach(q => {
                    var vallue = '';
                    for (var n = 0; n < aykk[g].kaplamals.length; n++) {
                        if (aykk[g].kaplamals[n].KAPLAMAREF == q.Key) {
                            vallue = ' value="' + aykk[g].kaplamals[n].MIKTAR + '"';
                            break;
                        }
                    }
                    htmlGydirme = htmlGydirme.concat(`<div class="scol" >
                <div class="bcol2">
                    <div class="lblDiv">
                        <div class="lbll">${q.Val}</div>
                    </div>
                    <div class="ltxt">
                        <input type="text" ${vallue} class="form-control form-control-sm" data-tip-format="tutar" data-giydirmeref="${q.Key}">
                    </div>
                </div></div> `);
                });


                htmlDiger = htmlDiger.concat('<div class="lstHama">', htmlGydirme, '</div>');
                htmlDiger = htmlDiger.concat('</div>');
            }
            htmlDiger = htmlDiger.concat('</div>');
        }

        //for (var i = 0; i < kazGrp.length; i++) {
        //    var KAZIREF = kazGrp[i][0].KAZIREF;
        //    for (var g = 0; g < localData.length; g++) {
        //        if (KAZIREF == localData[g].UUID) {

        //            continue;
        //        }
        //        if (g == localData.length - 1) {
        //            console.log(localData[g]);
        //        }
        //    }
        //}
    }



    //if (i == localData.length - 1)
    //    htmlDiger = '' + htmlDiger + '</div>';


    zxc('#domisDetay').html(htmlDiger);
    zxc('.aselsil').click(fncCaddeSil);
    zxc('.form-control-sm').change(fncValidClearX);
    zxc('.filupltrfpln').change(fncMustkrokiYuk);
    fncTxtKaplamaEvnt();

    /* fncModalAc("#mdlVeri");*/
}

function fncIstetayOlusturDuzenleEdit() {
    console.log("fncIstetayOlusturDuzenleEdit");
    var htmlGydirme = '', htmlDiger = '';
    gydirmeLst.forEach(q => htmlGydirme = htmlGydirme.concat(`<div class="scol" >
                <div class="bcol2">
                    <div class="lblDiv">
                        <div class="lbll">${q.Val}</div>
                    </div>
                    <div class="ltxt">
                        <input type="text" class="form-control form-control-sm" data-tip-format="tutar" data-giydirmeref="${q.Key}">
                    </div>
                </div>
                                    </div> `));

    for (var i = 0; i < localData.length; i++) {
        var yol = localData[i].YolVerisi;
        if (yol[0] == null || yol[0].length == 0) {
            continue;
        }
        else {
            var iid = localData[i].UUID;
            var yeniSatir = false;
            var fg = document.querySelectorAll('#domisDetay .czg');
            for (var v = 0; v < fg.length; v++) {
                if (iid == fg[v].getAttribute('data-id'))
                    break;
                if (v == fg.length - 1) {
                    yeniSatir = true;
                    break;
                }
            }
        }
        if (yeniSatir) {
            htmlDiger = htmlDiger.concat('<div class="czg" data-id="' + localData[i].UUID + '"><h3 class="bbs ffdssmps" onclick="fncKaziRefSearch3(\'' + localData[i].UUID + '\')">' + (i + 1) + '.Kazı <i class="bx bxs-map"></i></h3>');
            for (var g = 0; g < yol.length; g++) {
                var mtr = '';
                if (yol.length == 1) {
                    mtr = yol[g].Metresi;
                }
                var bykshchecked = yol[g].YOL_AIDIYET == 'KONYA BÜYÜKŞEHİR BELEDİYESİ' ? ' checked="checked"' : '';
                htmlDiger = htmlDiger.concat('<div class="mt-3 bbgt">');
                htmlDiger = htmlDiger.concat(`
                <div class="lstHama" >
                                    <a class="aselsil"><i class='bx bx-x'></i></a>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Büy.Seh. Ait</div>
                                            </div>
                                            <div class="ltxt">
                                                <div class="form-check form-switch">
                                                    <input class="form-check-input"${bykshchecked} data-id="${yol[g].YOL_AIDIYET}" disabled="disabled" type="checkbox" role="switch">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Trafik Plan.</div>
                                            </div>
                                            <div class="ltxt">
                                                <div class="vfre">
                                                <input type="text" readonly class="form-control form-control-sm frgc" />
                                                <input type="file" class="form-control form-control-sm filupltrfpln" />
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">İlçe</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${yol[g].ILCEREF}" readonly value="${yol[g].IlceAdi}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Belediye</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${yol[g].ILCEREF}" readonly value="${yol[g].IlceAdi}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Mahalle</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${yol[g].MAHALLEREF}" readonly value="${yol[g].MahalleAdi}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Cadde Sokak</div>
                                            </div>
                                            <div class="ltxt">
                                                <input data-id="${yol[g].CADDESOKAKID}" readonly value="${yol[g].ADI_NUMARASI}" type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Yol Malzeme</div>
                                            </div>
                                            <div class="ltxt">
                                                <input value="${yol[g].YOL_MALZEME}" readonly type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>

                                    <div class="scol">

                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Yapım Tar.</div>
                                            </div>
                                            <div class="ltxt">
                                                <input value="${yol[g].YAPIM_TARIHI}" readonly type="text" class="form-control form-control-sm" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">En(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" class="form-control form-control-sm" data-tip-format="tutar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Boy(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" value="${mtr}" class="form-control form-control-sm" data-tip-format="tutar" />
                                            </div>
                                        </div>
                                    </div>
                                    <div class="scol mn70">
                                        <div class="bcol2">
                                            <div class="lblDiv">
                                                <div class="lbll">Derinlik(m)</div>
                                            </div>
                                            <div class="ltxt">
                                                <input type="text" class="form-control form-control-sm" data-tip-format="tutar" />
                                            </div>
                                        </div>
                                    </div>
                                </div> `);

                htmlDiger = htmlDiger.concat('<div class="lstHama">', htmlGydirme, '</div>');
                htmlDiger = htmlDiger.concat('</div>');
            }
            htmlDiger = htmlDiger.concat('</div>');
        }
    }
    if (htmlDiger != "") {
        zxc('#domisDetay').ekle(htmlDiger);
        zxc('.aselsil').click(fncCaddeSil);
        zxc('.form-control-sm').change(fncValidClearX);
        zxc('.filupltrfpln').change(fncMustkrokiYuk);
        fncTxtKaplamaEvnt();
    }
}

function fncTxtKaplamaEvnt() {
    document.querySelectorAll('.form-control[data-tip-format="tutar"]').forEach(function (q) {
        q.addEventListener('keypress', function (e) {
            var q = this,
                r = new RegExp(/^\d+(,\d{1,2})?$/),
                val = this.value;
            if (e.key == ",") {
                if (val.indexOf(",") != -1)
                    e.preventDefault();
            }
            else {
                val = val.substring(0, this.selectionStart) + e.key + val.substring(this.selectionStart, val.length);
                if (r.exec(val) == null)
                    e.preventDefault();
            }
        }, false)
    })

}

function fncMustkrokiYuk() {
    var fil = this;
    if (fncImageCheck(fil))
        fncFileToBase64(fil.files[0], function (q) {
            zxc(fil).birOncekiElement().attr('data-id', q).value(fil.files[0].name);
            fil.value = "";
        });
}

function fncValidClearX() {
    var q = this;
    if (zxc(q).classVarmi('is-invalid')) {
        if (degerleriKontrolEt(q, q.value) == false) {
            zxc(q).classSil('is-invalid');
        }
    }
}

function fncCaddeSil() {
    var q = this,
        w = zxc(q).ustElement(1).dom,
        e = zxc(w).ustElement().altElementler().dom;

    if (e.length == 2) {
        var uuid = zxc(w).ustElement().attr('data-id');
        var indexCur = localData.findIndex(q => q.UUID == uuid);
        if (indexCur !== -1) {
            editableLayers.removeLayer(localData[indexCur].layerCur);
            //editableLayers.removeLayer(L.geoJSON(localData[indexCur].layerCur2).getLayers()[0]);
            localData.splice(indexCur, 1);
            zxc(w).ustElement().elementiSil();
        }
    }
    else
        zxc(w).elementiSil();
}

function fncGetYOL_mah(YOLREF, fncCoolBak) {
    GetJson('/api/Api_Harita/GetYOL_mah/' + YOLREF, function (data) {
        fncCoolBak(data.veri)
    }, function () {

    })
}

function fncYolaGit2() {
    var id = document.getElementById('slclCadde').value;
    if (id) {
        var ddf2 = document.querySelector('.chbKatOnOf[data-title="AYKOME_YOL_WFS"]');

        PostJson('/api/Api_Harita/GetKatmanDetay2', {
            RefID: ddf2.getAttribute('data-refid'),
            RefKatID: ddf2.getAttribute('data-id'),
            Sorgu: id
        }, function (d) {
            try {
                fncModalGizle();
                if (d.veri != null) {
                    var xmlString = d.veri;
                    var jsonj1 = JSON.parse(xmlString);

                    // Önce haritadaki mevcut curkatman'ı temizle
                    if (window.curkatman) {
                        map.removeLayer(window.curkatman);
                    }

                    // Harita temizliğinden sonra 500ms bekle
                    setTimeout(function () {
                        // Yeni layer'ı ekle
                        window.curkatman = L.geoJson(jsonj1, {
                            style: {
                                color: 'blue',
                                weight: 10,
                                opacity: 1
                            }
                        }).addTo(map);

                        // Bounds'a zoom yap
                        map.fitBounds(window.curkatman.getBounds(), {
                            padding: [50, 50]
                        });

                        // Bir 100ms daha bekle ve animasyonu başlat
                        setTimeout(function () {
                            // Basit blink animasyonu
                            var count = 0;
                            var blink = setInterval(function () {
                                if (count >= 8) { // 4 kere yanıp sönme (8 renk değişimi)
                                    clearInterval(blink);
                                    return;
                                }

                                window.curkatman.setStyle({
                                    color: count % 2 === 0 ? 'red' : 'blue',
                                    weight: 10,
                                    opacity: 1
                                });

                                count++;
                            }, 250); // Her 250ms'de bir renk değişimi
                        }, 100);

                    }, 500);
                }
            } catch (e) {
                alert(e);
            }
        }, function () {
            zxc('#btnnnre4').html("Yükleniyor...").attr('disabled', 'disabled');
        }, function () {
            zxc('#btnnnre4').html("Göster").attrSil('disabled');
        });
    }
}
function fncYolaGit() {
    var id = document.getElementById('slclCadde').value;
    if (id) {
        var ddf2 = document.querySelector('.chbKatOnOf[data-title="AYKOME_YOL_WFS"]');

        PostJson('/api/Api_Harita/GetKatmanDetay2', {
            RefID: ddf2.getAttribute('data-refid'),
            RefKatID: ddf2.getAttribute('data-id'),
            Sorgu: id//"YOLREF=37273"
            /*Sorgu: "ADI_NUMARASI='UYSALLAR SK'"*/
        }, function (d) {
            try {
                // fncModalGizle();
                if (d.veri != null) {
                    var xmlString = d.veri;
                    var jsonj1 = JSON.parse(xmlString);
                    console.log("jsonj1", jsonj1.totalFeatures);
                    var curkatman = L.geoJson(jsonj1, {
                        style: {
                            /*fillColor: getSicColor(feature.id.density),*/
                            weight: 10,
                            opacity: 1,
                            color: "red",
                            dashArray: '1',
                            fillOpacity: 0.7
                        }
                    }
                    ).addTo(map);

                    if (jsonj1.features.length > 0) {
                        map.fitBounds(curkatman.getBounds());

                        layer = L.geoJson(jsonj1, {
                            style: {
                                /*fillColor: getSicColor(feature.id.density),*/
                                weight: 10,
                                opacity: 1,
                                color: "red",
                                dashArray: '1',
                                fillOpacity: 0.7
                            }
                        }
                        ).addTo(map);

                        var duration = 2000;
                        var intervalTime = 150;
                        var interval = setInterval(function () {
                            layer.setStyle({ color: 'red' });
                            setTimeout(function () {
                                layer.setStyle({ color: 'blue' });
                                layer.bringToFront()
                            }, intervalTime / 2);
                        }, intervalTime);

                        setTimeout(function () {
                            clearInterval(interval);
                            map.removeLayer(layer);
                        }, duration);
                    }
                }
            } catch (e) {
                alert(e)
            }
        }, function () {
            zxc('#btnnnre4').html("Yükleniyor...").attr('disabled', 'disabled')
        }, function () {
            zxc('#btnnnre4').html("Göster").attrSil('disabled')
        });
    }

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
        txtPrjKapiNo = zxc('#txtPrjKapiNo').dom;

    if (degerleriKontrolEt(txtPrjNo, txtPrjNo.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjTalepTarihi, txtPrjTalepTarihi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjTipi, txtPrjTipi.value))
        hata = true;
    else {
        if (txtPrjTipi.value == "2") {

            //if (degerleriKontrolEt(txtPrjTcNo, txtPrjTcNo.value))
            //    hata = true;

            //if (degerleriKontrolEt(txtPrjKapiNo, txtPrjKapiNo.value))
            //    hata = true;
        }
    }

    if (degerleriKontrolEt(txtPrjBasTarihi, txtPrjBasTarihi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjBitTarihi, txtPrjBitTarihi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjIlgKisi, txtPrjIlgKisi.value))
        hata = true;

    if (degerleriKontrolEt(txtPrjBasYapn, txtPrjBasYapn.value))
        hata = true;



    var isDetLst2 = [], isDetLst = [],
        isdet = document.querySelectorAll('#domisDetay .czg'),
        gydrHata = '';

    for (var i = 0; i < isdet.length; i++) {
        var isPars = isdet[i].querySelectorAll('.bbgt');
        var uuid = isdet[i].getAttribute('data-id'),
            vvgrt = localData.find(q => q.UUID == uuid);

        var koordinatLst = vvgrt.koordinatLst;


        for (var f = 0; f < isPars.length; f++) {
            if (f == 0)
                isDetLst = [];
            var lstHama1 = zxc(isPars[f]).altElementler(0).altElementler().dom;
            var lstHama2 = zxc(isPars[f]).altElementler(1).altElementler().dom;
            var TrafikKroki = lstHama1[2].querySelector(".form-control-sm").getAttribute('data-id');


            var Bboy = lstHama1[10].querySelector(".form-control-sm").value;
            var ars = {
                YolAdiyetText: lstHama1[1].querySelector(".form-check-input").getAttribute('data-id'),
                TrafikKroki: TrafikKroki,
                IlceAd: lstHama1[3].querySelector(".form-control-sm").value,
                IlceID: lstHama1[3].querySelector(".form-control-sm").getAttribute('data-id'),
                BelediyeAd: lstHama1[4].querySelector(".form-control-sm").value,
                BelediyeID: lstHama1[4].querySelector(".form-control-sm").getAttribute('data-id'),
                MahalleAd: lstHama1[5].querySelector(".form-control-sm").value,
                MahalleID: lstHama1[5].querySelector(".form-control-sm").getAttribute('data-id'),
                CaddeAd: lstHama1[6].querySelector(".form-control-sm").value,
                CaddeID: lstHama1[6].querySelector(".form-control-sm").getAttribute('data-id'),
                YolMalzeme: lstHama1[7].querySelector(".form-control-sm").value,
                YapimTarihi: lstHama1[8].querySelector(".form-control-sm").value.replace("Z", ""),
                En: lstHama1[9].querySelector(".form-control-sm").value.replace(",", "."),
                Boy: Bboy.replace(",", "."),
                Derinlik: lstHama1[11].querySelector(".form-control-sm").value.replace(",", ".")
            };

            if (fncYapimTarihiKontrol(ars.YapimTarihi, ars.YolMalzeme, txtPrjTipi.value)) {
                hata = true;
                MesajVer("Yol Yapım Tarihi <span class='mesvrg'>3 Yıldan</span> Küçükler İçin Bu Proje Oluşturulamaz", MesajDurumu.Warning);
                return;
            }

            if (TrafikKroki == null) {
                hata = true;
                MesajVer("Her Kazı için <span class='mesvrg'>Trafik Plan.</span> Yükleyiniz!", MesajDurumu.Warning);
                return;
            }
            if (ars.En == "") {
                if (!lstHama1[9].querySelector(".form-control-sm").classList.contains('is-invalid'))
                    lstHama1[9].querySelector(".form-control-sm").classList.add('is-invalid');
                hata = true;
            }
            else {
                if (lstHama1[9].querySelector(".form-control-sm").classList.contains('is-invalid'))
                    lstHama1[9].querySelector(".form-control-sm").classList.remove('is-invalid');
            }
            if (ars.Boy == "") {
                if (!lstHama1[10].querySelector(".form-control-sm").classList.contains('is-invalid'))
                    lstHama1[10].querySelector(".form-control-sm").classList.add('is-invalid');
                hata = true;
            }
            else {
                if (lstHama1[10].querySelector(".form-control-sm").classList.contains('is-invalid'))
                    lstHama1[10].querySelector(".form-control-sm").classList.remove('is-invalid');
            }
            if (ars.Derinlik == "") {
                if (!lstHama1[11].querySelector(".form-control-sm").classList.contains('is-invalid'))
                    lstHama1[11].querySelector(".form-control-sm").classList.add('is-invalid');
                hata = true;
            }
            else {
                if (lstHama1[11].querySelector(".form-control-sm").classList.contains('is-invalid'))
                    lstHama1[11].querySelector(".form-control-sm").classList.remove('is-invalid');
            }
            var gydrLsd = [];
            var kaplamaToplam = 0;
            for (var h = 0; h < lstHama2.length; h++) {
                if (lstHama2[h].querySelector(".form-control-sm").value != "") {
                    var vvcurv = lstHama2[h].querySelector(".form-control-sm").value;
                    gydrLsd.push({
                        Deger: vvcurv.replace(",", "."),
                        ID: lstHama2[h].querySelector(".form-control-sm").getAttribute('data-giydirmeref'),
                    });
                    kaplamaToplam = kaplamaToplam + parseFloat(vvcurv);
                }

            }
            if (gydrLsd.length == 0) {
                gydrHata = gydrHata.concat(`<div><span class='mesvrg'>${i + 1}.Kazı, ${f + 1}.Satır, ${ars.CaddeAd}</span> İçin En Az Bir Giydirme Değeri Belirlenmeli!</div> `);
                hata = true;
            }
            else {
                //if (Bboy != "") {
                //    var by = parseFloat(Bboy);
                //    if (kaplamaToplam.toFixed(2) != by) {
                //        gydrHata = gydrHata.concat(`<div><span class='mesvrg'>${i + 1}.Kazı, ${f + 1}.Satır,</span> İçin Boy Toplamı Kaplama Toplamına Eşit Olmalı!</div> `)
                //        hata = true;
                //    }
                //}
            }
            isDetLst.push({
                Detay: ars,
                Gydirme: gydrLsd
            });

            if (f == isPars.length - 1)
                isDetLst2.push({
                    isDetLst: isDetLst,
                    koordinatLst: koordinatLst
                });
        }
    }

    if (hata == true) {
        if (gydrHata != "")
            MesajVer(gydrHata, MesajDurumu.Warning);
        else
            MesajVer("<span class='mesvrg'>Zorunlu</span> Alanları Doldurunuz!", MesajDurumu.Warning)
        return;
    }

    var resAry = [], resAryTit = [];
    document.querySelectorAll('.imgresww').forEach(s => {
        resAry.push(s.getAttribute('data-id'))
        resAryTit.push(s.getAttribute('data-title'))
    })

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
        DosyaList: resAry,
        DosyaListAd: resAryTit,
        IsDetLsts: isDetLst2,
        dagitimBirims: dagitimBirims,
        ProjeRef: zxc.parseQuery("projeref") == "" ? -1 : zxc.parseQuery("projeref")
    }
    PostJson('/api/Api_Harita/SetProje', param, function (data) {
        fncPrjInputClear();
        fncModalGizle('mdlVeri');
        fncModalAc('#mdlSonuc');
        zxc('#mdlSonuc').classEkle('shake');
    }, function () {
        zxc(qq).html("Yükleniyor...").attr('disabled', 'disabled');
    }, function () {
        zxc(qq).html("Kaydet").attrSil('disabled');
    })
}


//#endregion

//#region Wms
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
        var q1 = JSON.parse(data.veri2);
        if (q.features != undefined && q1.features != undefined) {
            if (q.features[0] != undefined && q1.features[0] != undefined) {

                var mahalleAdi = q.features[0].properties.ADI_NUMARASI;
                var mahalleID = q.features[0].properties.MAHALLEREF;

                var ilceAdi = q1.features[0].properties.ADI_NUMARASI;
                var ilceID = q1.features[0].properties.ILCEREF;

                var prjref = zxc.parseQuery("projeref")
                if (prjref == "")
                    fncIstetayOlustur();
                else
                    fncIstetayOlusturDuzenleEdit();
            }
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
                        data.veri.forEach(q => html = html.concat(`< option value = "${q.MAHALLEREF}" > ${q.TANIM}</option > `));
                        document.getElementById('txtMahalle').innerHTML = html;
                        document.getElementById('txtMahalle').onchange = fncMahalleSecildiginde;

                        document.getElementById('txtMahalle').value = gelenWms.SAG_MAHALLEREF;

                        GetJson('/api/AbsApi/GetCaddeSokak/' + gelenWms.SAG_MAHALLEREF, function (data) {
                            if (data.veri != null) {
                                var html = '<option value="">Seç</option>';
                                data.veri.forEach(q => html = html.concat(`< option value = "${q.CADDESOKAK_REF}" > ${q.CADDESOKAK_ADI}</option > `));
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

//#endregion

function fncVeriDoldur() {
    zxc('#txtPrjTipi').selectbox("2");
    zxc("#txtPrjBasTarihi").value("2024-05-17");
    zxc("#txtPrjBitTarihi").value("2024-05-17");
    zxc("#txtPrjIlgKisi").value("Ali Veli");
    zxc("#txtPrjAmaci").value("Projenin Amacı " + Date.now());


    zxc("#txtPrjIlgKisi").value("Ali Veli");
    zxc("#txtPrjTcNo").value("3674788574");
    zxc("#txtPrjKapiNo").value("25-a");
    zxc("#txtPrjDilekcNo").value("25896");
    zxc("#txtPrjBasYapn").value("Adem madem");


    //var deg = 25;
    //document.querySelectorAll('.bbgt .lstHama .w40px').forEach(q => { q.value = deg; deg++; });

    //deg = 15;
    //document.querySelectorAll('.bbgt .lstHama .w60px').forEach(q => { q.value = deg; deg++; });


    var deg = 25;
    document.querySelectorAll('.bbgt').forEach(q => {
        q.querySelectorAll('.lstHama input[data-giydirmeref]')[(Math.floor(Math.random() * 21) + 1)].value = deg / 2;
        q.querySelector('.lstHama .w60px').value = deg - 1;
        q.querySelectorAll('.lstHama .w40px')[0].value = deg + 1;
        q.querySelectorAll('.lstHama .w40px')[1].value = deg + 2;
        q.querySelector('.lstHama .frgc').value = deg + 3;
        q.querySelector('.lstHama .frgc').setAttribute("data-id", "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAADsQAAA7EB9YPtSQAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAqySURBVHic7Z17bBTHHce/M7u3dz4/ztzZPr84MC9jwhtDsdUgTIghqtRQFdpGFLUoraJW6uO/UgQtStpE6T9V/0uEWtG/ooLUNm2jPmJB0oTwhgZDbMA8DH7hs4258519r53+wdPYvts7e27vbubzl293dufnne/O/GZ+M7OARCKRSCQSiUQikUgkElEgkx382s/fdKmINYEx59PHGWiAsOgnR94+cDs95kmSYce+N2pZDI2EMcvTxwmonxHacuStvd5nr5kggB0/e30ZFHIUDCVT5DNGKPnG4V/v+/sM2S2ZAbbv+dVOQtghAOoUSQYBZcORt/Z+8fRB+mwqopD9cQofAGxM13+TuqkSHhDC3sbUhQ8ALiC259mDEwTAGBYYyG5RMsZJ+LLjwAENQJWBpBPKdoIAMIVfkEIaSZoYGXSmXB6TCUAiEFIAghPPaYgDIw1bt15ngBWAfUYtkiTNcMe/ULCyIaVrUxQAwIB5qV4rmVnYNK6VTYDgSAEIjhSA4EgBCI4UgOBMJoDpOJWSLCPlbqARnqurw/aXt8HldCZOLBqEgNjywDRtyiSxcBgfvP8XtLS0cDODmwCqKyvx5i9+CS3OPygBukcCGI1GJz2nqiq2vbIT3d3daGtr45I/Nx9gXX29LHwDFFgscc8zAE0vbOaWPzcB2PPyeN06p6AGSsCen88v/9Quk9HgTIIY9dvZxIKT3UDBkQIQHCkAwZECEBwpAMGRQ8GCI2sAwZECEBwpAMGRAhAcKQDBUQHgAGN0ycUrC0FYwdGWj+x6LJbwwnD17Pg3tufDFwrPjJU5TDAaQSia4HmrFrjjPG8CYJZz1uO/LZoVijLx3VYtlpKDx09/mxDLSEyL/ee1+vogOXz56kpd1/9KgDnT+D8kGQRjgN83gkBwbMo0VCGxvLy8XRSx2Duy8HMLQoAiRwHoJLXAI/QYU8Kh8LuUEbImjbZJ0ohFVeKej0RjhRSc5wVKzIMkmLdBGJO9ANGRAhAcKQDBkQIQHCkAwZECEBwpAMGRAhAcKQDBkQIQHCkAwRFbAIzhTudt3Oi4gaiBORC5iLCBIKYznPzsBLpvdwMAuu904fmmDSZblV4YCCgEXQdw8cLnjwsfAAb6vWA59iSYgUXchpuAwegYzga9GIxOPcskm+jt6R33u7K6CkTAVe+GmoCByBh+d/dzhJkOjVD8xL0CJRYbb9u4Ul5Rjg5/BwCgrNyNNevXmmyRORgSwI3QfYSZDgAIMx3Xw76sF8DKNStRWlYGBh2Vs6tBRXz9YVAA86wOaIQ+rgHma0W87eIPIajyGPnIRm5jSAAlFht+Wr4CN0I+zLMWwaVm99sveYLhbqBLtcmCz0GEHAhijKGvpw9dt7vMNsV0khoIijEGJcudJd99H04ePwHfsA8gBFsczSh05IBPkyKGaoAI03Gwvw17u07iYH8bIg97BNlGMBjExy0fPSh84OFQ8B1zjTIZQwK4NDqIjtAwAKAjNIzW4CBXo3hx+eIlhEKhcceutl+F3+83ySLzMSQAOx2/nWm+En9700yEMYaeO90TjkejUXx69L8YHMhOUU8XQz5Ara0YW4s9aA8OY7G9GLW2Yt52zTiRSASRyOSbMgcCQRz78BhKS0swb8F8zJ4bf+VzLmHYCWwqrEJTYfYOnKgWCyil0PUp/BfG4O33YsDrRcXsSqhK/HV1uYIw3UBKCNwV7oTpnCUlwhQ+CBMrHLx0+VLQOIVLCMGylUvTaBFfjHTYDdcAnlOdqP/9KXhO3krdIpNxzCpG4/MN0CwTv2OgqirWNa5DSWmpCZaZh7FYQIcX9X84BQDwnO5E0JmPgUXZ+aDKKyuw5atbcev6TQwNDoEQAkdxMWrmzYXNLt43DgwJwO4NjPud7/VnrQAAwGq1onbJYrPNyAgMNQG9K6vgq3IAAHyVDvSsruZqlCR9kD+1tsdgQAiEMeQNjWLUmQeW5fEAUbh3z4exsTg7tZEkxgEYIQi65Jficw1hxgEkkyMFIDhSAIIjBSA4UgCCk/TawPDYGMZGRxOmi0YIopHc7y7a1DFodHyYmSo6EnwR9klaxBAJ3Ufs4eJUjYZAYzo08qT7NhxxYCCaOAQ/y1mCgqLkprclJYDWM6fQcvg9Q2krPd8DU2qSMiYb+eOP30W+5uWaR++QDdv3RxInJASbvr4DK77UaOzGDMlFAzsuXTSaVAjybSHkaxk0k4gxXL/UmtQlSfkATBcmcmyIzctbAWTWBFmW5BJn6QROg4bFbWabMG2kAKbBnNLbZpswbZJyAj2LF6Pvbm/ihAAUaz/KS+pSMiobKHWMwJK/evo3ivYD4fg1yV1/IayzjFXtntrkwtz8aoBc227jGdYsyI0FJbIJSAECYO3C7K/+AZ4CyOE5AwuqvHAVBdOYI7/aVDYBKbBxaUeac+T3MskaIElKHSNY4rlrthlxSO65Sx8gSTatuAZC0l278csvozaKVHSGtT23sKKvC2UBPxih6C0oxP/KPThfUW36XERnYRDrFpnh/BHwEkHGCMA5GsCrF06gwn9/wvHnvH1o7LqOQysa4LdaTbIQeGlNGxRqxtBvNjqBSWCPhPGDs59MKPynqbk3iO+fPw6LSXv6zi4ZRv1Cs/r+fJ3AEW53N0jz9Ta4goGE6ap997ChM90e+IPHv63xIqe2n1/hJgoMUUIZBdg/eWRODHYDFZ2hvqfT8H3Xd99M1aSUWb/4FuaXmxf2TcX10XV9yv0QHqFalE41yiI/VKh1jDD2IoC4E/8pUWxWq/XxXnGMsVg4HJ58fxWq2AAkXGxXGvTDHjEw2eEhrmAA+eEwAtrEBZ48cBUFsa0huRj7TGNRMAagZ7Jzms1WpGlWx6PfVFF9kVg06LsfdBJCtSkWQzNVpR067FvVncuX3wOwe6aN/tHr+/eBsTcSpdNSaNO1WAQB8BcApQy7ms7Aaon/JvGmzoNTH7/33kYjaT/AO0nd23QncNiW3IrcGKXwW9Ozird51RXMdQ+lJS+z4CYAwoz1XXxWG7qKZhm+7xWXG1HKX7dz3UNoXtXOPR+zMb0GAIB/LzA2b0AnBB/O57+s22Efxe4XT4PS3I1nPCIjBHC5tAJHaxbFTcMI8LdFy9DpcHK1xaZF8NpLn8FhTzz1PRfImJHAfyxahn57Ib7ScQmFz2zmOJRnx/u1y9Hq5rtLmUIZdm8+jUqXj2s+mUTGCAAATlfPxblKD+bdG4A74AcDQW9hEW4Vu6BzjgMQAN/acB611f1c88k0MkoAwAMv/5qrDNdcZWnLkxKGb264gLWmBHrMJeMEkG4oYXhl4/mcmeKVLEILQKE6vvPCGSyvmXSQTQi4CYARZnAkwBzytAi+u/m0cG3+s3ATAGHE6FhQ2ilzjODVLSfhLhZ3m/hHCNcELPH0Ydems8jTjAegchmOAsisz4pQyrBldTuaV7dzjMBnH9wEoIPcIBnSBJQ6RrBz47kMDewkXl9AqHKJV+7cBBAuD/7Z2pf3KYAv88ojEQRAY91NvNzQCk3NwM/D66NAZOJXTMZBC+5Tf+EeXiZwrQ0PHDimDsHdDMpM2Vt22Zxe99I5veOCDBZFH101v/uc6StXmK+IRe7WEehTTmzQCflC1clvSc2h3Phit0QikUgkEolEIpFIJBJT+T8N2QDJChgZGQAAAABJRU5ErkJggg==");
        deg++;
    });
}


function fncOpakAyr(q) {
    localStorage.setItem('Opaklik', q);
    opaklikVal = q;

    map.eachLayer(function (l) {
        if (!l._url) {
            if (l.feature)
                if (l.feature.id.replace(/\.[0-9]*/, "") != "AYKOME_YOL_WFS" && l.feature.id != "GunlukKazi1")
                    if (l.setStyle)
                        l.setStyle({ opacity: opaklikVal });
        }
    });
}
var yuklenenKatman,
    map,
    editableLayers;;

zxc.baslarken(function () {

    fncHaritaOlustur();

})


//#region Harita Olustur

function fncHaritaOlustur() {
    var osmUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        osmAttrib = '&copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        osm = L.tileLayer(osmUrl, { maxZoom: 18, attribution: osmAttrib });

    map = new L.Map('map', { center: new L.LatLng(51.505, -0.04), zoom: 13 });
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
            polygon: {
                allowIntersection: false,
                drawError: {
                    color: '#e1e100', // Color the shape will turn when intersects
                    message: '<strong>Oh snap!<strong> you can\'t draw that!' // Message that will show when intersect
                }
            },
            marker: true,
            rectangle: true,
            circle: true
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
        edit: {
            featureGroup: editableLayers,
            remove: true
        }
    });

    map.addControl(drawControl);
    fncDrawTipEmpty();
    // #region Cizim Yapildiginda
    map.on(L.Draw.Event.CREATED, fncDrawCreated);
    // #endregion

    // #region Cizim Düzenlendiğinde

    map.on(L.Draw.Event.EDITED, function (e) {
        var layers = e.layers;
        layers.eachLayer(function (layer) {

            console.log("edited=", JSON.stringify(layer.toGeoJSON()));

            //ne istersen onu yap; büyük ihtimalle db'ye geri kaydet
        });
    });
    // map.on('draw:edited', function (e) {
    //     var layers = e.layers;
    //     layers.eachLayer(function (layer) {
    //         console.log("edited=", layer);
    //         //ne istersen onu yap; büyük ihtimalle db'ye geri kaydet
    //     });
    // });
    // #endregion
    fncKatmanHazirla();
}



// #endregion


//#region Katmanlari Yukle
function fncKatmanHazirla() {
    fetch('/api/ApiTest/GetKatman').then(q => q.json()).then(q => {
        var html = '';
        q.veri.forEach(w => {
            html = html.concat(`
 <li>
<div class="fobvre" data-title="${w.Title}" data-srs="${w.SRS}" data-minx="${w.LatLongBoundingBox.minx}" data-minx="${w.LatLongBoundingBox.miny}" data-minx="${w.LatLongBoundingBox.maxx}" data-minx="${w.LatLongBoundingBox.maxy}" >
    <div class="bbhd1">
        <a class="btnKtmnShow" data-dawnload="false" data-name="${w.Name}"><i class='bx bxs-show'></i></a>
        <span class="ktmLbl">${w.Title}</span>
    </div>
 </div>
</li>`);
        })
        zxc('#lstKatman').html(html);
        /*
        <div class="bbhd2">
       <a class="btnKtmDrw" data-cizim="${w.CizimTipID}"><i class='bx bx-map'></i></a>
   </div>
   zxc('.btnKtmDrw').click(fncDrawTipBelirle);*/
        zxc('.btnKtmnShow').click(fncKatmanOnOff);
    })
    //map.fitBounds(katman[2].KatmanJson.getBounds()) 
}
var katman = [];
function fncKatmanOnOff() {
    var q = this,
        r = q.getAttribute('data-dawnload'),
        w = q.getAttribute('data-name');
    console.log("dawnload", r);
    if (r == "true") {
        MesajVer("Indilmişti!", MesajDurumu.Warning);
        return;
    }
    GetJson('/api/ApiTest/GetKatmanVeri?ReqKatman=' + w, function (d) {
        // console.log('GelenVeri=', d);
        try {
            zxc(q).attr('data-dawnload', 'true').classEkle("aktiv");
            var jsonj1 = JSON.parse(d.veri);



            var curkatman = L.geoJson(jsonj1
                , {
                    style: fncSicklaikstyle
                    , onEachFeature: onEachFeaturex
                }
            ).addTo(map);
            map.fitBounds(curkatman.getBounds());

            katman.push({
                KatmanID: w,
                KatmanJson: curkatman
            })
        } catch (e) {
            alert(e)
        }
    }, function () {

    }, function () {

    });
} function fncSicklaikstyle(feature) {

    return {
        /*fillColor: getSicColor(feature.id.density),*/
        weight: 5,
        opacity: 1,
        color: getSicColor2(feature.id),
        dashArray: '3',
        fillOpacity: 0.7
    };
}

function getSicColor2(d) {
    if (/GAZNET_HAT.[0-9]+/.test(d))
        return '#FED976';

    else if (/KOSKIKANALBORUSU.[0-9]+/.test(d))
        return '#FED976';

    else if (/KOSKIKANALPARSELBORU.[0-9]+/.test(d))
        return '#F7A278';

    else if (/KOSKISUBORUSU.[0-9]+/.test(d))
        return '#9BE37A';

    else if (/KOSKITATLISUSEBEKESI.[0-9]+/.test(d))
        return '#D18CF2';

    else if (/KOSKIYAGMURSUYUSEBEKE.[0-9]+/.test(d))
        return '#6ED5A1';

    else if (/MEDAS_AG_HAT.[0-9]+/.test(d))
        return '#F392E3';

    else if (/MEDAS_OG_HAT.[0-9]+/.test(d))
        return '#8BE0B6';

    else if (/SELCUKGAZHAT.[0-9]+/.test(d))
        return '#E8A88F';

    else if (/TEIAS_SEBEKE.[0-9]+/.test(d))
        return '#A2E4C7';

    else if (/TELEKOM_HAT.[0-9]+/.test(d))
        return '#F3C98A';

    else if (/TURKSAT_SEBEKE.[0-9]+/.test(d))
        return '#78E5D2';
    else {
        return '#E694B2';
    }
    //return d > 1000 ? '#800026' :
    //    d > 500 ? '#BD0026' :
    //        d > 200 ? '#E31A1C' :
    //            d > 100 ? '#FC4E2A' :
    //                d > 50 ? '#FD8D3C' :
    //                    d > 20 ? '#FEB24C' :
    //                        d > 10 ? '#FED976' :
    //                            '#FFEDA0';
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
    // info.update(layer.feature.properties);

    layer.bringToFront();
}
function resetHighlight(e) {
    var layer = e.target;
    katman.forEach(q => q.KatmanJson.resetStyle(layer));
    //info.update();
}
function onEachFeaturex(feature, layer) {
    layer.on({
        mouseover: highlightFeature,
        mouseout: resetHighlight,
        click: fncKatmanClkGe
    });
}
function fncKatmanClkGe(e) {
    var httm = '';
    for (var property in e.target.feature.properties) {
        httm = httm.concat(property + ": " + e.target.feature.properties[property], '</br>');
    }
    
    MesajVer(httm, MesajDurumu.Warning);
    map.fitBounds(e.target.getBounds());
}

//function fncDrawTipBelirle() {
//    fncDrawTipEmpty();

//    var q = this,
//        w = q.getAttribute('data-cizim');
//    if (w == "1")
//        document.querySelector('.leaflet-draw-draw-polyline').style.display = "block";

//    else if (w == "2")
//        document.querySelector('.leaflet-draw-draw-polygon').style.display = "block";

//    else if (w == "3")
//        document.querySelector('.leaflet-draw-draw-rectangle').style.display = "block";

//    else if (w == "4")
//        document.querySelector('.leaflet-draw-draw-circle').style.display = "block";

//    else if (w == "6")
//        document.querySelector('.leaflet-draw-draw-marker').style.display = "block";

//    document.querySelectorAll('.leaflet-draw-toolbar.leaflet-bar')[0].style.display = "block";

//    document.querySelectorAll('.leaflet-draw-toolbar.leaflet-bar')[0].setAttribute('data-katmanid', q.parentNode.getAttribute('data-id'))
//}

function fncDrawTipEmpty() {

    document.querySelector('.leaflet-draw-draw-polyline').style.display = "none";
    document.querySelector('.leaflet-draw-draw-polygon').style.display = "none";
    document.querySelector('.leaflet-draw-draw-rectangle').style.display = "none";
    document.querySelector('.leaflet-draw-draw-circle').style.display = "none";
    document.querySelector('.leaflet-draw-draw-marker').style.display = "none";

    document.querySelectorAll('.leaflet-draw-toolbar.leaflet-bar')[0].style.display = "none";
    document.querySelectorAll('.leaflet-draw-toolbar.leaflet-bar')[1].style.display = "none";
}



//#endregion


//#region Cizim Yapildiginda

function fncDrawCreated(e) {
    zxc('#mdlKatBad,#txtkordlst,#mdlBaslik').html(" ");

    var type = e.layerType,
        layer = e.layer,
        katmanID = document.querySelectorAll('.leaflet-draw-toolbar.leaflet-bar')[0].getAttribute('data-katmanid');

    fetch('/api/ApiTest/GetKatmanProperties?KatmanID=' + katmanID, {
        method: 'GET',
    }).then(response => response.json()).then(data => {
        var html = '';
        data.forEach(q => {
            var inptTip = 'data-zorunlu="false"';
            var zrn = '', zrn2 = '';
            if (q.ZorunluAlan) {
                zrn = 'data-zorunlu="true" required';
                zrn2 = '<span class="szr">*</span>';
            }
            var Max = '', Min = '', Step = '', ptr = '';
            if (q.Max)
                Max = ' max="' + q.Max + '"';

            if (q.Min)
                Min = ' min="' + q.Min + '"';

            if (q.Step)
                Step = ' min="' + q.Step + '"';

            if (q.RegexPaternn)
                ptr = ' pattern="' + q.RegexPaternn + '"';

            //Textbox
            if (q.InputTipID == 1)
                inptTip = "<input type='text' class='form-control' value='' " + zrn + " /> ";
            //TextboxArea
            else if (q.InputTipID == 2)
                inptTip = "<textarea  class='form-control' value='' " + zrn + " ></textarea> ";
            //Datetime
            else if (q.InputTipID == 3)
                inptTip = "<input type='date' class='form-control' value='' " + zrn + " " + Max + " " + Min + " " + Step + "/> ";
            //DatetimeLocal
            else if (q.InputTipID == 4)
                inptTip = "<input type='datetime-local' class='form-control' value='' " + zrn + " " + Max + " " + Min + " " + Step + " /> ";
            //Color
            else if (q.InputTipID == 5)
                inptTip = "<input type='color' class='form-control' value='' " + zrn + " /> ";
            //TexttboxPatern
            else if (q.InputTipID == 6)
                inptTip = "<input type='text' class='form-control' value='' " + zrn + " " + ptr + " /> ";
            //Range
            else if (q.InputTipID == 7)
                inptTip = "<input type='range' class='form-control' value='' " + zrn + " " + Max + " " + Min + " " + Step + " /> ";
            //FileUpload
            else if (q.InputTipID == 8)
                inptTip = "<input type='file' class='form-control' value='' " + zrn + " /> ";
            //TextboxSayi
            else if (q.InputTipID == 9)
                inptTip = "<input type='number' class='form-control' value='' " + zrn + " " + Max + " " + Min + " " + Step + " /> ";
            //checkbox
            else if (q.InputTipID == 10)
                inptTip = "<input type='checkbox' class='form-control' value='' " + zrn + " /> ";
            //Time
            else if (q.InputTipID == 11)
                inptTip = "<input type='time' class='form-control' value='' " + zrn + " /> ";
            //ForeignSelect
            else if (q.InputTipID == 12) {
                //inptTip = "<input type='text' class='form-control' value='' " + zrn + " /> ";
            }
            html = html.concat(`<div class="col">
                                                                    <div class="lblDiv">
                                                                        <div class="lbll">${q.Deger}${zrn2}</div>
                                                                    </div>
                                                                    <div class="ltxt">
                                                                    ${inptTip}
                                                                    </div>
                                                               </div>`);
        })
        zxc('#mdlKatBad').html(html);


        var htmlKrd = '', noo = 1;

        if (type === 'marker') {
            var match = regex.exec(layer.getLatLng().toString());
            if (match) {
                var latitude = parseFloat(match[1]);
                var longitude = parseFloat(match[2]);
                htmlKrd = htmlKrd.concat(`<tr data-lat='${latitude}' data-lng='${longitude}'>
                                              <td>1</td>
                                              <td>${latitude}</td>
                                              <td>${longitude}</td>
                                          </tr>`);
            }

        }

        else if (type === 'polygon') {
            var coords = layer.getLatLngs()[0];
            for (var i = 0; i < coords.length; i++) {
                htmlKrd = htmlKrd.concat(`<tr data-lat='${coords[i].lat}' data-lng='${coords[i].lng}'><td class="widt100">${(i + 1)}</td><td>${coords[i].lat}</td><td>${coords[i].lng}</td> </tr>`);
            }
            htmlKrd = htmlKrd.concat(`<tr data-lat='${coords[0].lat}' data-lng='${coords[0].lng}'><td class="widt100">${(coords.length + 1)}</td><td>${coords[0].lat}</td><td>${coords[0].lng}</td> </tr>`);
        }

        else if (type === 'polyline') {
            console.log(layer.getLatLngs());
        }

        else if (type === 'rectangle') {
            console.log(layer.getLatLngs());
        }

        else if (type === 'circle') {
            console.log(layer.getLatLngs());
        }

        else if (type === 'popup') {
            console.log(layer.getLatLngs());
        }

        zxc('#txtkordlst').html(htmlKrd);
        // zxc('#mdlBaslik').html(htmlKrd);

        fncModalAc("#mdlVeri");
    })
        .catch(error => {
            console.error('Hata:', error);
        });


    return;

    //if (type === 'polygon' || type === 'polyline') {
    //    editableLayers.addLayer(layer);
    //    console.log(layer.toGeoJSON());

    //    // fncModalAc("#mdlVeri");

    //    var url = type === 'polygon' ? 'PostmyPolygon' : 'PostmyLinestring';

    //    fetch('/api/ApiTest/' + url, {
    //        method: 'POST',
    //        headers: {
    //            'Content-Type': 'application/json'
    //        },
    //        body: JSON.stringify(layer.toGeoJSON())
    //    }).then(response => response.json()).then(data => {
    //        console.log('API cevabı:', data);
    //    })
    //        .catch(error => {
    //            console.error('Hata:', error);
    //        });
    //}

}

//#endregion


//#region xxx


//#endregion



//#region xxx


//#endregion


//#region xxx


//#endregion















// fncKatmanlariYukle();
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

function onEachFeature(feature, layer) {
    if (feature.properties && feature.properties.party) {
        editableLayers.addLayer(layer);
        layer.bindPopup(feature.properties.party);
    }
}





// map.addControl(new L.Control.Draw({
//     edit: {
//         featureGroup: editableLayers,
//         poly: {
//             allowIntersection: false
//         }
//     }
//     ,draw: {
//         polygon: {
//             allowIntersection: false,
//             showArea: true
//         }
//     }
// }));

// #region   draw: false
// var drawControl = new L.Control.Draw({
//     draw: false,
//     edit: {
//         featureGroup: editableLayers
//     }
// });
// map.addControl(drawControl);
// #endregion


// #region Cizim

// #endregion







// #region Cizim Diğer Eventler

// map.on('draw:markercontext', function (e) {
//     console.log("markercontext", e, e.layers);
// });
// map.on('draw:toolbarclosed', function (e) {
//     console.log("toolbarclosed ", e, e.layers);
// });
// map.on('draw:toolbaropened', function (e) {
//     console.log("toolbaropened", e, e.layers);
// });
// map.on('draw:deletestop', function (e) {
//     console.log("deletestop", e, e.layers);
// });
// map.on('draw:deletestart', function (e) {
//     console.log("deletestart", e, e.layers);
// });
// map.on('draw:editstop', function (e) {
//     console.log("editstop", e, e.layers);
// });
// map.on('draw:editvertex', function (e) {
//     console.log("editvertex", e, e.layers);
// });
// map.on('draw:editresize', function (e) {
//     console.log("editresize", e, e.layers);
// });
// map.on('draw:editmove', function (e) {
//     console.log("editmove", e, e.layers);
// });
// map.on('draw:editstart', function (e) {
//     console.log("editstart", e, e.layers);
// });
// map.on('draw:drawvertex', function (e) {
//     console.log("drawvertex", e, e.layers);
// });
// map.on('draw:drawstop', function (e) {
//     console.log("drawstop", e, e.layers);
// });
// map.on('draw:drawstart', function (e) {
//     console.log("drawstart", e, e.layers);
// });
// map.on('draw:deleted', function (e) {
//     console.log("deleted", e, e.layers);
// });

//#endregion

function fncHaritaDbKAydet() {
    var q = document.querySelector('#txtkordlst').children,
        w = [];

    for (var i = 0; i < q.length; i++)
        w.push({ lat: q[i].getAttribute('data-lat'), lng: q[i].getAttribute('data-lng') });
    console.log(w);
}

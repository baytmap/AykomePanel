
var veriList = [], slcBirim, DbKatmanID = null, map, aktifKatman;

zxc.baslarken(function () {
    fncIlkAcilis(true);

    fncTblHeight();
    /* fncHaritaOlustur();*/
    zxc('#btnBaglan').click(fncConnectWFSKatman);
    zxc('#btnBaglan2').click(fncConnectWMSKatman);
    zxc('#btnSil').click(fncVerDelete);
    zxc('#btnKurBir').click(function () {
        var slc = zxc('#slcBirim').selectboxSecilenIndex();
        zxc(slcBirim).attr('data-birimid', slc.value).attr('data-kurumid', zxc('#slcKurum').selectboxSecilenIndex().value).html(slc.text);
        fncModalGizle("#mdlBirim");
        fncModalAc("#mdlVeri");
    });
    zxc('#btnKurBirIpt').click(function () {
        fncModalGizle("#mdlBirim");
        fncModalAc("#mdlVeri");
    });

    zxc('#chbAllKat').change(function () {
        if (this.checked)
            zxc('.chbKatSlc').checked(true);
        else
            zxc('.chbKatSlc').checked(false);
    })
    zxc('#btnWfsInsert').click(fncWfsKatmanEdit);
    zxc('#btnWmsInsert').click(fncWmsKatmanEdit);
    zxc('#btnMdlWfs').click(function () {
        DbKatmanID = null;
        zxc('#btnWfsInsert').sonElement().html('Kaydet');
        zxc('#btnWfsInsert').attr('disabled', 'disabled');
        zxc('#tblDataRow').html(" ");
    });

    zxc('#btnMdlWms').click(function () {
        DbKatmanID = null;
        zxc('#btnWmsInsert').sonElement().html('Kaydet');
        zxc('#btnWmsInsert').attr('disabled', 'disabled');
        zxc('#tblDataRow2').html(" ");
    });
})

const fncTblHeight = () => {
    var q = document.body.clientHeight,
        w = document.querySelector('.home-content').offsetHeight,
        r = document.querySelector('.fixtbl').offsetHeight;

    var we = (q - (w + r + 175));
    if (we < 200)
        we = 250;
    document.querySelector('.overflow-auto.tblbotsty').style.height = we + "px";
}

function fncIlkAcilis(Tanim = false) {
    var btnSarch = zxc("#btnVeriAra").dom;
    GetJson('/api/Api_KatmanYonetimi/GetKatmanList', function (data) {
        var html;
        if (data.veri != null) {
            veriList = data.veri;
            fncTblYazdir(data.veri)
        }
        if (data.veri5 != null) {
            html = '<option value="-1">Seç</option>';
            data.veri5.forEach(q => html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            document.getElementById('slcKurum').innerHTML = html;
            document.getElementById('slcKurum').onchange = fncKurumSecildiginde;
        }
    }, function () {
        zxc("#btnVeriAra").attr('disabled', 'disabled');
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblData').html(" ");
        veriList = [];
    }, function () {
        zxc("#btnVeriAra").attrSil('disabled');
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}

function fncKurumSecildiginde() {
    var w = this,
        q = w.value;
    if (q != "" || q != "-1") {
        GetJson('/api/Api_Aykome/GetBirimList/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="-1">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.BirimId}">${q.Birim}</option>`));
                document.getElementById('slcBirim').innerHTML = html;
                document.getElementById('slcBirim').onchange = fncBirimSecildiginde;
            }
        }, function () {
            var html = '<option value="-1">Yükleniyor...</option>';
            document.getElementById('slcBirim').innerHTML = html;
        })
    }
}
function fncBirimSecildiginde() {
    var w = this,
        q = w.value;
    if (q != "" || q != "-1") {
        zxc('#btnKurBir').attrSil('disabled');
    }
}
function fncConnectWFSKatman() {
    var hata = false,
        txtWfsAdi = zxc('#txtWfsAdi').dom,
        txtUrlAdres = zxc('#txtUrlAdres').dom;

    if (degerleriKontrolEt(txtWfsAdi, txtWfsAdi.value))
        hata = true;

    if (degerleriKontrolEt(txtUrlAdres, txtUrlAdres.value))
        hata = true;

    if (hata == false) {
        PostJson('/api/Api_KatmanYonetimi/GetKatmanKontrol', {
            Adi: zxc('#txtWfsAdi').value(),
            UrlAdres: zxc('#txtUrlAdres').value(),
            UserName: zxc('#txtUserName').value(),
            UserPassword: zxc('#txtUserPassword').value()
        }, function (data) {
            var html = '';
            if (data.veri != null) {
                if (DbKatmanID == null) {
                    data.veri.forEach((q, hh) => html = html.concat(`<tr data-minx="${q.LatLongBoundingBox.minx}" data-maxx="${q.LatLongBoundingBox.maxx}"  data-miny="${q.LatLongBoundingBox.miny}" data-maxy="${q.LatLongBoundingBox.maxy}">
                        <td><input type="checkbox" class="chbKatSlc" name="name" /></td>
                        <td>${q.Title}</td>
                        <td><input type="number" class="form-control form-control-sm wdt-enkucuk" value="${hh + 1}" /></td>
                        <td><input type="color" name="name" value="${randomColor()}" /></td>
                        <td>${q.Name}</td>
                        <td>${q.SRS}</td>
                        <td>
                        <select class="form-select form-select-sm">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3"3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13" selected="selected">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                       </select>
                       </td>
                       <td><a class="btn btn-sm btn-link abirimSec">Birim Seç</a></td>
                       </tr>`));
                }

                else {
                    zxc('#btnWfsInsert').sonElement().html('Düzenle');
                    var curKatm = veriList.find(q => q.DbKatmanID == DbKatmanID);
                    if (curKatm.KatmanTipi == 0) { //Wfs Katman Ise
                        var bb = curKatm.WfsKatmanInfoParam.WfsKatmanDetayParams;
                        data.veri.forEach((q, hh) => {

                            for (var kk = 0; kk < bb.length; kk++) {
                                var blnd = false;
                                if (q.Title == bb[kk].Title && q.Name == bb[kk].Name) {
                                    var brmStr = '<a class="btn btn-sm btn-link abirimSec">Birim Seç</a>';
                                    if (bb[kk].BirimId != null) 
                                        brmStr = `<a class="btn btn-sm btn-link abirimSec" data-birimid="${bb[kk].BirimId}" data-kurumid="${bb[kk].KurumID}">${bb[kk].Birim}</a>`;

                                    html = html.concat(`<tr data-minx="${bb[kk].MinX}" data-maxx="${bb[kk].MaxX}" data-miny="${bb[kk].MinY}" data-maxy="${bb[kk].MaxY}">
 <td><input type="checkbox" checked="checked" class="chbKatSlc" name="name" /></td>
 <td>${bb[kk].Title}</td>
 <td><input type="number" class="form-control form-control-sm wdt-enkucuk" value="${bb[kk].Sira}" /></td>
 <td><input type="color" name="name" value="${bb[kk].RenkKodu}" /></td>
 <td>${bb[kk].Name}</td>
 <td>${bb[kk].SRS}</td>
 <td><select class="form-select form-select-sm">
 <option value="0"${bb[kk].ZoomDurumu == 0 ? ' selected="selected"' : ''}>0</option>
 <option value="1"${bb[kk].ZoomDurumu == 1 ? ' selected="selected"' : ''}>1</option>
 <option value="2"${bb[kk].ZoomDurumu == 2 ? ' selected="selected"' : ''}>2</option>
 <option value="3"${bb[kk].ZoomDurumu == 3 ? ' selected="selected"' : ''}>3</option>
 <option value="4"${bb[kk].ZoomDurumu == 4 ? ' selected="selected"' : ''}>4</option>
 <option value="5"${bb[kk].ZoomDurumu == 5 ? ' selected="selected"' : ''}>5</option>
 <option value="6"${bb[kk].ZoomDurumu == 6 ? ' selected="selected"' : ''}>6</option>
 <option value="7"${bb[kk].ZoomDurumu == 7 ? ' selected="selected"' : ''}>7</option>
 <option value="8"${bb[kk].ZoomDurumu == 8 ? ' selected="selected"' : ''}>8</option>
 <option value="9"${bb[kk].ZoomDurumu == 9 ? ' selected="selected"' : ''}>9</option>
 <option value="10"${bb[kk].ZoomDurumu == 10 ? ' selected="selected"' : ''}>10</option>
 <option value="11"${bb[kk].ZoomDurumu == 11 ? ' selected="selected"' : ''}>11</option>
 <option value="12"${bb[kk].ZoomDurumu == 12 ? ' selected="selected"' : ''}>12</option>
 <option value="13"${bb[kk].ZoomDurumu == 13 ? ' selected="selected"' : ''}>13</option>
 <option value="14"${bb[kk].ZoomDurumu == 14 ? ' selected="selected"' : ''}>14</option>
 <option value="15"${bb[kk].ZoomDurumu == 15 ? ' selected="selected"' : ''}>15</option>
 <option value="16"${bb[kk].ZoomDurumu == 16 ? ' selected="selected"' : ''}>16</option>
 <option value="17"${bb[kk].ZoomDurumu == 17 ? ' selected="selected"' : ''}>17</option>
 <option value="18"${bb[kk].ZoomDurumu == 18 ? ' selected="selected"' : ''}>18</option>
</select></td>
 <td>${brmStr}</td>
 </tr>`);
                                    blnd = true;
                                    break;
                                }
                            }

                            if (blnd == false) {
                                html = html.concat(`<tr data-minx="${q.LatLongBoundingBox.minx}" data-maxx="${q.LatLongBoundingBox.maxx}" data-miny="${q.LatLongBoundingBox.miny}" data-maxy="${q.LatLongBoundingBox.maxy}">
 <td><input type="checkbox" class="chbKatSlc" name="name" /></td>
 <td>${q.Title}</td>
 <td><input type="number" class="form-control form-control-sm wdt-enkucuk" value="${hh + 1}" /></td>
 <td><input type="color" name="name" value="${randomColor()}" /></td>
 <td>${q.Name}</td>
 <td>${q.SRS}</td>
 <td><select class="form-select form-select-sm">
 <option value="0">0</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13" selected="selected">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
</select></td>
 <td><a class="btn btn-sm btn-link abirimSec">Birim Seç</a></td>
 </tr>`);
                            }
                        });
                    }
                }
                zxc('#tblDataRow').html(html);
                zxc('#btnWfsInsert').attrSil('disabled');
                zxc('.abirimSec').click(fncBirimClck);
                //zxc('.btnShwHrt').click(fncOpnMapModal);
            }
        }, function () {
            zxc("#btnBaglan").attr('disabled', 'disabled');
        }, function () {
            zxc("#btnBaglan").attrSil('disabled');
        })
    }
}
function fncBirimClck() {
    var ww = this,
        ee = zxc(ww).ustElement(1).ilkElement().ilkElement().dom.checked;
    if (ee == true) {
        var kurum = ww.getAttribute('data-kurumid'),
            birim = ww.getAttribute('data-birimid');
        if (kurum != undefined && birim != undefined) {
            zxc('#slcKurum').selectbox(kurum);
            GetJson('/api/Api_Aykome/GetBirimList/' + kurum, function (databb) {
                if (databb.veri != null) {
                    var html = '<option value="">Seç</option>';
                    databb.veri.forEach(q => html = html.concat(`<option value="${q.BirimId}">${q.Birim}</option>`));
                    document.getElementById('slcBirim').innerHTML = html;
                    document.getElementById('slcBirim').onchange = fncBirimSecildiginde;
                    zxc('#slcBirim').selectbox(birim);
                }
            }, function () {
                var html = '<option value="">Yükleniyor...</option>';
                document.getElementById('slcBirim').innerHTML = html;
            })
        }
        else {
            var hdtml = '<option value="-1">Seç</option>';
            document.getElementById('slcBirim').innerHTML = hdtml;
            zxc('#slcKurum').selectbox("-1");
        }

        slcBirim = ww;
        zxc('#btnKurBir').attr('disabled', 'disabled');
        fncModalGizle("#mdlVeri");
        fncModalAc("#mdlBirim");
    }
    else
        MesajVer("Önce Katman'ı İşaretleyin", MesajDurumu.Warning);
}
function randomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

function fncWfsKatmanEdit() {
    var hata = false,
        txtWfsAdi = zxc('#txtWfsAdi').dom,
        txtUrlAdres = zxc('#txtUrlAdres').dom,
        q = this,
        w = zxc(q).ilkElement().dom,
        e = zxc('#tblDataRow').altElementler().dom,
        aryData = [];

    if (degerleriKontrolEt(txtWfsAdi, txtWfsAdi.value))
        hata = true;

    if (degerleriKontrolEt(txtUrlAdres, txtUrlAdres.value))
        hata = true;

    if (hata == false) {

        for (var i = 0; i < e.length; i++) {
            var r = zxc(e[i]).altElementler().dom;
            var chck = zxc(r[0]).ilkElement().dom.checked;
            if (chck) {
                var birimID = null, brmTr = zxc(r[7]).ilkElement().dom;
                if (zxc(brmTr).attrVarmi('data-birimid')) 
                    birimID = parseInt(zxc(brmTr).attr('data-birimid'))
                
                aryData.push({
                    Title: zxc(r[1]).html(),
                    Sira: parseInt(zxc(r[2]).ilkElement().value()),
                    RenkKodu: zxc(r[3]).ilkElement().value(),
                    Name: zxc(r[4]).html(),
                    SRS: zxc(r[5]).html(),
                    ZoomDurumu: zxc(r[6]).ilkElement().dom.value,
                    MinX: zxc(e[i]).attr('data-minx'),
                    MaxX: zxc(e[i]).attr('data-maxx'),
                    MinY: zxc(e[i]).attr('data-miny'),
                    MaxY: zxc(e[i]).attr('data-maxy'),
                    BirimID: birimID,
                    Birim: null,
                    KurumID: null
                });
            }
        }
        if (aryData.length > 0) {
            PostJson('/api/Api_KatmanYonetimi/SetKatmanEkle', {
                DbKatmanID: DbKatmanID === null ? -1 : parseInt(DbKatmanID),
                Adi: zxc('#txtWfsAdi').value(),
                KatmanTipi: 0,
                Sira: parseInt(zxc('#txtSira').value()),
                WfsKatmanInfoParam: {
                    WfsKatmanID: -1,
                    UrlAdres: zxc('#txtUrlAdres').value(),
                    UserName: zxc('#txtUserName').value(),
                    UserPassword: zxc('#txtUserPassword').value(),
                    WfsKatmanDetayParams: aryData
                }
            }, function (data) {
                var html;
                if (data.veri != null) {
                    veriList = data.veri;
                    fncTblYazdir(data.veri)
                    fncModalGizle();
                }
            }, function () {
                veriList = [];
                zxc('#tblDataRow').html(" ");
                zxc("#btnBaglan").attr('disabled', 'disabled');
            }, function () {
                zxc("#btnBaglan").attrSil('disabled');
            })
        }
    }
}

function fncTblYazdir(data) {
    html = '';
    var dt = data;
    for (var i = 0; i < dt.length; i++) {
        var ktmTip = '';
        switch (dt[i].KatmanTipi) {
            case 0: ktmTip = "Wfs Katman"; break;
            case 1: ktmTip = "Wms Katman"; break;
            case 2: ktmTip = "Db Katman"; break;
        }
        html = html.concat(`<tr data-id="${dt[i].DbKatmanID}">
                        <td>${dt[i].DbKatmanID}</td>
                        <td>${dt[i].Adi}</td>
                        <td>${ktmTip}</td >
                        <td>${dt[i].Sira}</td>
                        <td class="wdt-kucuk text-end"><button input="button" class="btn btn-sm btn-danger btnSil"><span class="bx bxs-message-alt-x"></span></button></td>
                        <td class="text-end"><button input="button" class="btn btn-sm btn-warning btnEdt"><span class="bx bx-edit"></span></button></td>
                        </tr>
                        <tr><td colspan="4" class="p-0"><table class="table alttbl">`)
        if (dt[i].KatmanTipi == 0) {
            var prt = dt[i].WfsKatmanInfoParam;
            for (var h = 0; h < prt.length; h++) {
                var q = prt[h];
                html = html.concat(`<tr data-id="${q.WfsKatmanDetayID}" data-minx="${q.MinX}" data-maxx="${q.MaxX}" data-miny="${q.MinY}" data-maxy="${q.MaxY}">
                        <td>${q.Title}</td>
                        <td>${q.Sira}</td>
                        <td><div class="arnk" style="background-color:${q.RenkKodu}"></div>${q.RenkKodu}</td>
                        <td>${q.Name}</td>
                        <td>${q.SRS}</td>
                        <td>${q.ZoomDurumu}</td>
                        </tr>`)
            }
        }
        html = html.concat('</table></td></tr>');
    }

  
  

    //data.veri.forEach(q =>
    //   );
    zxc('#tblData').html(html);
    zxc('.btnEdt').click(fncOpnDtModal);
    zxc('.btnSil').click(fncOpnDeleteModal);
    //zxc('.btnShwHrt').click(fncOpnMapModal);
}

var slcUnigID;
function fncOpnDeleteModal() {
    var q = this;
    slcUnigID = zxc(q).ustElement(1).attr('data-id');
    fncModalAc("#mdlSil");
}

function fncVerDelete() {
    var q = this;
    if (slcUnigID != null) {
        GetJson('/api/Api_Genel/SetKatmanDelete/' + slcUnigID, function (data) {
            fncIlkAcilis();
            var html;

            if (data.veri != null) {
                veriList = data.veri;
                fncTblYazdir(data.veri);
                fncModalGizle();
            }
        }, function () {
            zxc(q).attr('disabled', 'disabled')
        }, function () {
            zxc(q).attrSil('disabled')
        })
    }
}

function fncOpnDtModal() {
    var q = this;
    DbKatmanID = zxc(q).ustElement(1).attr('data-id');

    var curRow = veriList.find(q => q.DbKatmanID == DbKatmanID);
    if (curRow != null) {
        if (curRow.KatmanTipi == 0) {
            zxc('#txtWfsAdi,#txtSira,#txtUrlAdres,#txtUserName,#txtUserPassword').value(" ");
            zxc('#txtWfsAdi').value(curRow.Adi);
            zxc('#txtSira').value(curRow.Sira);
            zxc('#txtUrlAdres').value(curRow.WfsKatmanInfoParam.UrlAdres);
            zxc('#txtUserName').value(curRow.WfsKatmanInfoParam.UserName);
            zxc('#txtUserPassword').value(curRow.WfsKatmanInfoParam.UserPassword);
            zxc('#btnBaglan').dom.click();
            fncModalAc("#mdlVeri");
        }
        else if (curRow.KatmanTipi == 1) {
            zxc('#txtWfsAdi2,#txtSira2,#txtUrlAdres2,#txtUserName2,#txtUserPassword2').value(" ");
            zxc('#txtWfsAdi2').value(curRow.Adi);
            zxc('#txtSira2').value(curRow.Sira);
            zxc('#txtUrlAdres2').value(curRow.WfsKatmanInfoParam.UrlAdres);
            zxc('#txtUserName2').value(curRow.WfsKatmanInfoParam.UserName);
            zxc('#txtUserPassword2').value(curRow.WfsKatmanInfoParam.UserPassword);
            zxc('#btnBaglan2').dom.click();
            fncModalAc("#mdlVeri2");
        }
    }
}



function fncConnectWMSKatman() {
    var hata = false,
        txtWfsAdi = zxc('#txtWfsAdi2').dom,
        txtUrlAdres = zxc('#txtUrlAdres2').dom;

    if (degerleriKontrolEt(txtWfsAdi, txtWfsAdi.value))
        hata = true;

    if (degerleriKontrolEt(txtUrlAdres, txtUrlAdres.value))
        hata = true;

    if (hata == false) {
        PostJson('/api/Api_KatmanYonetimi/GetKatmanKontrolWMS', {
            Adi: zxc('#txtWfsAdi2').value(),
            UrlAdres: zxc('#txtUrlAdres2').value(),
            UserName: zxc('#txtUserName2').value(),
            UserPassword: zxc('#txtUserPassword2').value()
        }, function (data) {
            var html = '';
            if (data.veri != null) {
                if (DbKatmanID == null) {
                    data.veri.forEach((q, hh) => html = html.concat(`<tr data-minx="${q.LatLongBoundingBox.minx}" data-maxx="${q.LatLongBoundingBox.maxx}"  data-miny="${q.LatLongBoundingBox.miny}" data-maxy="${q.LatLongBoundingBox.maxy}">
                        <td><input type="checkbox" class="chbKatSlc" name="name" /></td>
                        <td>${q.Title}</td>
                        <td><input type="number" class="form-control form-control-sm wdt-enkucuk" value="${hh + 1}" /></td>
                        <td>${q.Name}</td>
                        <td>${q.SRS}</td>
                        <td>
                        <select class="form-select form-select-sm">
                        <option value="0">0</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                        <option value="6">6</option>
                        <option value="7">7</option>
                        <option value="8">8</option>
                        <option value="9">9</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                        <option value="13" selected="selected">13</option>
                        <option value="14">14</option>
                        <option value="15">15</option>
                        <option value="16">16</option>
                        <option value="17">17</option>
                        <option value="18">18</option>
                       </select>
                       </td>
                       </tr>`));
                }

                else {
                    zxc('#btnWmsInsert').sonElement().html('Düzenle');
                    var curKatm = veriList.find(q => q.DbKatmanID == DbKatmanID);
                    if (curKatm.KatmanTipi == 1) { //Wfs Katman Ise
                        var bb = curKatm.WfsKatmanInfoParam.WfsKatmanDetayParams;
                        data.veri.forEach((q, hh) => {

                            for (var kk = 0; kk < bb.length; kk++) {
                                var blnd = false;
                                if (q.Title == bb[kk].Title && q.Name == bb[kk].Name) {

                                    html = html.concat(`<tr data-minx="${bb[kk].MinX}" data-maxx="${bb[kk].MaxX}" data-miny="${bb[kk].MinY}" data-maxy="${bb[kk].MaxY}">
 <td><input type="checkbox" checked="checked" class="chbKatSlc" name="name" /></td>
 <td>${bb[kk].Title}</td>
 <td><input type="number" class="form-control form-control-sm wdt-enkucuk" value="${bb[kk].Sira}" /></td>
 <td>${bb[kk].Name}</td>
 <td>${bb[kk].SRS}</td>
 <td><select class="form-select form-select-sm">
 <option value="0"${bb[kk].ZoomDurumu == 0 ? ' selected="selected"' : ''}>0</option>
 <option value="1"${bb[kk].ZoomDurumu == 1 ? ' selected="selected"' : ''}>1</option>
 <option value="2"${bb[kk].ZoomDurumu == 2 ? ' selected="selected"' : ''}>2</option>
 <option value="3"${bb[kk].ZoomDurumu == 3 ? ' selected="selected"' : ''}>3</option>
 <option value="4"${bb[kk].ZoomDurumu == 4 ? ' selected="selected"' : ''}>4</option>
 <option value="5"${bb[kk].ZoomDurumu == 5 ? ' selected="selected"' : ''}>5</option>
 <option value="6"${bb[kk].ZoomDurumu == 6 ? ' selected="selected"' : ''}>6</option>
 <option value="7"${bb[kk].ZoomDurumu == 7 ? ' selected="selected"' : ''}>7</option>
 <option value="8"${bb[kk].ZoomDurumu == 8 ? ' selected="selected"' : ''}>8</option>
 <option value="9"${bb[kk].ZoomDurumu == 9 ? ' selected="selected"' : ''}>9</option>
 <option value="10"${bb[kk].ZoomDurumu == 10 ? ' selected="selected"' : ''}>10</option>
 <option value="11"${bb[kk].ZoomDurumu == 11 ? ' selected="selected"' : ''}>11</option>
 <option value="12"${bb[kk].ZoomDurumu == 12 ? ' selected="selected"' : ''}>12</option>
 <option value="13"${bb[kk].ZoomDurumu == 13 ? ' selected="selected"' : ''}>13</option>
 <option value="14"${bb[kk].ZoomDurumu == 14 ? ' selected="selected"' : ''}>14</option>
 <option value="15"${bb[kk].ZoomDurumu == 15 ? ' selected="selected"' : ''}>15</option>
 <option value="16"${bb[kk].ZoomDurumu == 16 ? ' selected="selected"' : ''}>16</option>
 <option value="17"${bb[kk].ZoomDurumu == 17 ? ' selected="selected"' : ''}>17</option>
 <option value="18"${bb[kk].ZoomDurumu == 18 ? ' selected="selected"' : ''}>18</option>
</select></td>
 </tr>`);
                                    blnd = true;
                                    break;
                                }
                            }

                            if (blnd == false) {
                                html = html.concat(`<tr data-minx="${q.LatLongBoundingBox.minx}" data-maxx="${q.LatLongBoundingBox.maxx}" data-miny="${q.LatLongBoundingBox.miny}" data-maxy="${q.LatLongBoundingBox.maxy}">
 <td><input type="checkbox" class="chbKatSlc" name="name" /></td>
 <td>${q.Title}</td>
 <td><input type="number" class="form-control form-control-sm wdt-enkucuk" value="${hh + 1}" /></td>
 <td>${q.Name}</td>
 <td>${q.SRS}</td>
 <td><select class="form-select form-select-sm">
 <option value="0">0</option>
 <option value="1">1</option>
 <option value="2">2</option>
 <option value="3">3</option>
 <option value="4">4</option>
 <option value="5">5</option>
 <option value="6">6</option>
 <option value="7">7</option>
 <option value="8">8</option>
 <option value="9">9</option>
 <option value="10">10</option>
 <option value="11">11</option>
 <option value="12">12</option>
 <option value="13" selected="selected">13</option>
 <option value="14">14</option>
 <option value="15">15</option>
 <option value="16">16</option>
 <option value="17">17</option>
 <option value="18">18</option>
</select></td>
 </tr>`);
                            }
                        });
                    }
                }
                zxc('#tblDataRow2').html(html);
                zxc('#btnWmsInsert').attrSil('disabled');
                //zxc('.btnRowDet').click(fncOpnDtModal);
                //zxc('.btnShwHrt').click(fncOpnMapModal);
            }
        }, function () {
            zxc("#btnBaglan1").attr('disabled', 'disabled');
        }, function () {
            zxc("#btnBaglan1").attrSil('disabled');
        })
    }
}

function fncWmsKatmanEdit() {
    var hata = false,
        txtWfsAdi = zxc('#txtWfsAdi2').dom,
        txtUrlAdres = zxc('#txtUrlAdres2').dom,
        q = this,
        w = zxc(q).ilkElement().dom,
        e = zxc('#tblDataRow2').altElementler().dom,
        aryData = [];

    if (degerleriKontrolEt(txtWfsAdi, txtWfsAdi.value))
        hata = true;

    if (degerleriKontrolEt(txtUrlAdres, txtUrlAdres.value))
        hata = true;

    if (hata == false) {

        for (var i = 0; i < e.length; i++) {
            var r = zxc(e[i]).altElementler().dom;
            var chck = zxc(r[0]).ilkElement().dom.checked;
            if (chck) {
                aryData.push({
                    Title: zxc(r[1]).html(),
                    Sira: parseInt(zxc(r[2]).ilkElement().value()),
                    Name: zxc(r[3]).html(),
                    SRS: zxc(r[4]).html(),
                    ZoomDurumu: zxc(r[5]).ilkElement().dom.value,
                    MinX: zxc(e[i]).attr('data-minx'),
                    MaxX: zxc(e[i]).attr('data-maxx'),
                    MinY: zxc(e[i]).attr('data-miny'),
                    MaxY: zxc(e[i]).attr('data-maxy'),
                });
            }
        }
        if (aryData.length > 0) {
            PostJson('/api/Api_KatmanYonetimi/SetKatmanEkle', {
                DbKatmanID: DbKatmanID === null ? -1 : parseInt(DbKatmanID),
                Adi: zxc('#txtWfsAdi2').value(),
                KatmanTipi: 1,
                Sira: parseInt(zxc('#txtSira2').value()),
                WfsKatmanInfoParam: {
                    WfsKatmanID: -1,
                    UrlAdres: zxc('#txtUrlAdres2').value(),
                    UserName: zxc('#txtUserName2').value(),
                    UserPassword: zxc('#txtUserPassword2').value(),
                    WfsKatmanDetayParams: aryData
                }
            }, function (data) {
                var html;
                if (data.veri != null) {
                    veriList = data.veri;
                    fncTblYazdir(data.veri)
                    fncModalGizle();
                }
            }, function () {
                veriList = [];
                zxc('#tblDataRow2').html(" ");
                zxc("#btnBaglan2").attr('disabled', 'disabled');
            }, function () {
                zxc("#btnBaglan2").attrSil('disabled');
            })
        }
    }
}

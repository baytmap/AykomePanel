
var slcBirimID = -1, slcKurumID = -1;

zxc.baslarken(function () {
    fncIlkAcilis(true);
    zxc('#btnSil').click(fncKurumDelete);
    zxc('#btnKrmEdt').click(fncKurumEdit);

    zxc('#btnBrmEdt').click(fncBirimEdit);
    zxc('#btnBrmEdt2').click(fncBirimEdit2);
    zxc('#btnBrmEdtSil').click(fncBirimEditSil);

    zxc('#btnynkrm').click(function () {
        var fgy = document.querySelector('.accordion-button:not(.collapsed)');
        if (fgy)
            fgy.click();

        slcKurumID = -1;
    });

    zxc("#chbht5").change(function () {
        zxc('.chbvgf2').checked(this.checked);
    })

    zxc("#btnIlcMahKaydet").click(fncIlceMahKaydt);
    zxc("#btnPrjTipKaydet").click(fncPrjTipKaydt);
    zxc("#btnRolBrmKaydet").click(fncRolBrmKaydt);
    zxc("#btnYolAidiyetKaydet").click(fncYolAdiyetKaydt);

    zxc("#chbht6").change(function () {
        zxc('.chbvgfPrjTip').checked(this.checked);
    })

    zxc("#chbht7").change(function () {
        zxc('.chbvgfYolaidiyet').checked(this.checked);
    })


})

function fncIlkAcilis(Tanim = false) {
    GetJson('/api/Api_Genel/KurumYonetimi/' + Tanim, function (data) {
        var html;
        if (Tanim) {

            //if (data.IlceLst != null) {
            //    html = '<option value="-1">Seç</option>';
            //    data.IlceLst.forEach(q =>
            //        html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            //    document.getElementById('slcIlce').innerHTML = html;
            //}

            if (data.AYK_UstGrupBirim != null) {
                html = '<option value="-1">Seç</option>';
                data.AYK_UstGrupBirim.forEach(q =>
                    html = html.concat(`<option value="${q.Id}">${q.Tanim}</option>`));
                document.getElementById('slcUstGrupBirim').innerHTML = html;
                document.getElementById('slcUstGrupBirim2').innerHTML = html;
            }

            //if (data.AykProjeTip2s != null) {
            //    html = '';
            //    data.AykProjeTip2s.forEach(q =>
            //        html = html.concat(`<div class="form-check">
            //            <input class="form-check-input chbbrm2" data-id="${q.Projeref}" type="checkbox">
            //            <label class="form-check-label">${q.Projetanim}</label>
            //        </div>`));
            //    document.getElementById('lstProjeTipleri').innerHTML = html;
            //}

            //if (data.AykYolAidiyets != null) {
            //    html = '';
            //    html = '<option value="-1">Seç</option>';
            //    data.AykYolAidiyets.forEach(q =>
            //        html = html.concat(`<option value="${q.id}">${q.aciklama}</option>`));
            //    document.getElementById('slcYolAidiyets').innerHTML = html;
            //}

            //if (data.RolTbls != null) {
            //    html = '';
            //    data.RolTbls.forEach(q =>
            //        html = html.concat(`<div class="form-check">
            //            <input class="form-check-input chbbrm2" data-id="${q.id}" type="checkbox">
            //            <label class="form-check-label">${q.roladi}</label>
            //        </div>`));
            //    document.getElementById('lstRolTbls').innerHTML = html;
            //}
        }

        if (data.Ayk_Kurums != null) {
            zxc('#btnVeriRapor').attrSil('hidden');
            html = '';


            var krmLst = data.Ayk_Kurums;
            for (var r = 0; r < krmLst.length; r++) {
                var krm = krmLst[r];
                var brmHtml = '';
                krm.BirimList.forEach(g => brmHtml = brmHtml.concat(`
                <tr>
                <td>${g.id}</td>
                <td>${g.UstGrupBirimAD}</td>
                <td>${g.Ad}</td>
                <td> <button type="button" class="btn btn-info btn-sm btnbrmyontm" data-kurumad="${krm.Ad}" data-birimad="${g.Ad}" data-ustgrupid="${g.UstGrupBirimId}" data-id="${g.id}"><span class="bx bx-info-circle"></span></button></td>
                </tr>`))

                html = html.concat(` <div class="accordion-item">
            <h2 class="accordion-header" id="headingOne${r}">
                <button class="accordion-button collapsed" data-id="${krm.id}" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne${r}" aria-expanded="false" aria-controls="collapseOne${r}"><span class="badge text-bg-danger me-1">${krm.id}</span> ${krm.Ad}</button>
            </h2>
            <div id="collapseOne${r}" class="accordion-collapse collapse" aria-labelledby="headingOne${r}" data-bs-parent="#accordionExample">
                <div class="accordion-body"> 
                <div class="text-end" data-id="${krm.id}">
                  <button type="button" class="btn btn-info btn-sm btnkrmedit" data-ad="${krm.Ad}"><i class='bx bx-edit-alt'></i>Kurum Düzenle</button>
                  <button type="button" class="btn btn-danger btn-sm btnkrmsil"><i class='bx bx-x'></i>Kurum Sil</button>
                  <button type="button" class="btn btn-success btn-sm btnbirmekl"><i class='bx bx-plus'></i>Yeni Birim Ekle</button>
                  </div>
                <table class="table fixtbl mt-3" cellpadding="0" cellspacing="0" border="0">
                <thead class="tblhead">
            <tr>
                <th class="wdt-orta">Birim ID</th>
                <th class="wdt-orta">Üst Grup</th>
                <th>Birim Adı</th>
                <th class="wdt-enkucuk"></th>
            </tr>
        </thead>${brmHtml}</table></div>
                </div>
            </div>
        </div>`)
            }

            zxc('#accordionExample').html(html);




            zxc('.btnkrmsil').click(fncOpnMdlKurumDel);
            zxc('.btnkrmedit').click(fncOpnMdlKurumEdit);
            zxc('.btnbirmekl').click(fncOpnMdlBirimEdit);
            zxc('.btnbrmyontm').click(fncOpnMdlBirimTap);
            zxc('.accordion-button').click(function () {
                slcKurumID = this.getAttribute('data-id');
            });
        }
    })
}

//#region Kurum
function fncOpnMdlKurumDel() {
    var q = this;
    fncModalAc("#mdlSil");
}
function fncKurumDelete() {
    var q = this;
    if (slcKurumID != null) {
        GetJson('/api/Api_Genel/SetKurumDelete/' + slcKurumID, function (data) {
            slcKurumID = -1;
            fncModalGizle();
            fncIlkAcilis(false);
        }, function () {
            zxc(q).attr('disabled', 'disabled')
        }, function () {
            zxc(q).attrSil('disabled')
        })
    }
}

function fncOpnMdlKurumEdit() {
    var q = this;
    zxc("#txtKurumAd").value(zxc(q).attr('data-ad'));
    fncModalAc("#mdlKrmEdt");
}
function fncKurumEdit() {
    var q = this,
        ad = zxc("#txtKurumAd").value();
    if (ad)
        PostJson('/api/Api_Genel/SetKurumEdit', {
            Param1: slcKurumID + "",
            Param2: ad
        }, function (data) {
            fncModalGizle();
            slcKurumID = -1;
            fncIlkAcilis(false);
        }, function () {
            zxc(q).attr('disabled', 'disabled');
        }, function () {
            zxc(q).attrSil('disabled');
        })
}

//#endregion

//#region Birim Temel

function fncOpnMdlBirimEdit() {
    var q = this;
    slcBirimID = -1;
    zxc("#txtBirimAd").value(" ");
    zxc("#slcUstGrupBirim").selectbox("-1")
    // zxc("#btnBrmEdt").value(zxc(q).attr('data-ad'));
    fncModalAc("#mdlBrmEdt");
}
function fncBirimEdit() {
    var q = this,
        ad = zxc("#txtBirimAd").value(),
        id = zxc("#slcUstGrupBirim").selectboxSecilenIndex().value;
    if (ad != "" && id > 0)
        PostJson('/api/Api_Genel/SetBirimEdit', {
            Param1: slcKurumID,
            Param2: slcBirimID + "",
            Param3: ad,
            Param4: id + ""
        }, function (data) {
            slcKurumID = -1;
            fncModalGizle();
            fncIlkAcilis(false);
        }, function () {
            zxc(q).attr('disabled', 'disabled');
        }, function () {
            zxc(q).attrSil('disabled');
        })
    else {
        MesajVer("Bütün Alanları Giriniz!", MesajDurumu.Warning)
    }
}

function fncBirimEdit2() {
    var q = this,
        ad = zxc("#txtBirimAd2").value(),
        id = zxc("#slcUstGrupBirim2").selectboxSecilenIndex().value;
    if (ad != "" && id > 0)
        PostJson('/api/Api_Genel/SetBirimEdit', {
            Param1: slcKurumID,
            Param2: slcBirimID,
            Param3: ad,
            Param4: id + ""
        }, function (data) {
            var _c = document.querySelector('.btnbrmyontm[data-id="' + data.veri.BirimId + '"]');
            if (_c) {
                zxc(_c).attr('data-birimad', data.veri.Birim);
                zxc(_c).attr('data-ustgrupid', data.veri.UstGrupBirimId);
                var tr = zxc(_c).ustElement(1).altElementler().dom;
                zxc(tr[1]).html(zxc('#slcUstGrupBirim2').selectboxSecilenIndex().text);
                zxc(tr[2]).html(data.veri.Birim);
            }
        }, function () {
            zxc(q).attr('disabled', 'disabled');
        }, function () {
            zxc(q).attrSil('disabled');
        })
    else {
        MesajVer("Bütün Alanları Giriniz!", MesajDurumu.Warning)
    }
}

function fncBirimEditSil() {
    var q = this;
    DeleteJson('/api/Api_Genel/SetBirimDelete/' + slcBirimID, function (data) {
        slcKurumID = -1;
        fncModalGizle();
        fncIlkAcilis(false);
    }, function () {
        zxc(q).attr('disabled', 'disabled')
    }, function () {
        zxc(q).attrSil('disabled')
    })
}
function fncOpnMdlBirimTap() {
    var q = this,
        ustgrupid = zxc(q).attr('data-ustgrupid'),
        birimad = zxc(q).attr('data-birimad'),
        kurumad = zxc(q).attr('data-kurumad');

    slcBirimID = zxc(q).attr('data-id');
    GetJson('/api/Api_Genel/BirimDetay/' + slcBirimID, function (data) {
        var html = '';
        if (data.IlceListOuts) {
            html = '';
            data.IlceListOuts.forEach(z => {
                var chckMi = z.Checked == true ? 'checked="checked"' : '';
                html = html.concat(`<tr>
                 <td class="wdt-100">
                  <div class="form-check">
                   <input class="form-check-input chbvgf"${chckMi} data-ad="${z.AD}" data-id="${z.ID}" type="checkbox">
                  </div>
                </td>
                <td>${z.AD}</td>
                </tr>`);
            });
            zxc('#tblIlce').html(html);
            zxc(".chbvgf").change(fncIlceEvent)
        }

        if (data.MahalleListOuts) {
            html = '';
            data.MahalleListOuts.forEach(z => {
                var chckMi = z.Checked == true ? 'checked="checked"' : '';
                html = html.concat(`<tr data-ilceref="${z.RefID}">
                 <td class="wdt-100">
                  <div class="form-check">
                   <input class="form-check-input chbvgf2"${chckMi} data-ilceref="${z.RefID}" data-mahallead="${z.AD}" data-mahalleref="${z.ID}" type="checkbox">
                  </div>
                </td>
                <td>${z.RefAD}</td>
                <td>${z.AD}</td>
                </tr>`);
            });
            zxc('#tblMahalle').html(html);
        }

        if (data.ProjeTipIliskisis) {
            html = '';
            data.ProjeTipIliskisis.forEach(z => {
                var chckMi = z.Selected == true ? 'checked="checked"' : '';
                html = html.concat(`<tr>
                 <td class="wdt-100">
                  <div class="form-check">
                   <input class="form-check-input chbvgfPrjTip"${chckMi} data-ad="${z.Val}" data-id="${z.Key}" type="checkbox">
                  </div>
                </td>
                <td>${z.Val}</td>
                </tr>`);
            });
            zxc('#tblProjeTip').html(html);

        }

        if (data.BirimRols) {
            html = '';
            data.BirimRols.forEach(z => {
                var chckMi = z.Selected == true ? 'checked="checked"' : '';
                html = html.concat(`<tr>
                 <td class="wdt-100">
                  <div class="form-check">
                   <input class="form-check-input chbvgfRolTip"${chckMi} data-ad="${z.Val}" data-id="${z.Key}" type="checkbox">
                  </div>
                </td>
                <td>${z.Val}</td>
                </tr>`);
            });
            zxc('#tblRolBrm').html(html);
            zxc('.chbvgfRolTip').change(fncRolChange);

        }

        if (data.BirimYoladiyets) {
            html = '';
            data.BirimYoladiyets.forEach(z => {
                var chckMi = z.Selected == true ? 'checked="checked"' : '';
                html = html.concat(`<tr>
                <td class="wdt-100">
                  <div class="form-check">
                   <input class="form-check-input chbvgfYolaidiyet"${chckMi} data-ad="${z.Val}" data-id="${z.Key}" type="checkbox">
                  </div>
                </td>
                <td>${z.Val}</td>
                </tr>`);
            });
            zxc('#tblYolAidiyet').html(html);

        }

    }, function () {
        zxc(q).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
        fncBitimTapEmpty();
        document.querySelectorAll('#pills-tab .nav-item .nav-link.active').forEach(q => zxc(q).attr('class', 'nav-link'));
        document.querySelectorAll('#pills-tabContent .active').forEach(q => zxc(q).attr('class', 'tab-pane fade'));
        zxc("#BirimPnl-tab").classEkle("active");
        zxc("#BirimPnl").attr('class', "tab-pane fade active show");
    }, function () {
        fncModalAc("#mdlEdit");
        zxc("#txtBirimAd2").value(birimad);
        zxc("#txtTitKurumAd").html(kurumad);
        zxc("#slcUstGrupBirim2").selectbox(ustgrupid);
        zxc(q).attrSil('disabled').ilkElement().attr('class', 'bx bx-info-circle');
    })
}


function fncBitimTapEmpty() {
    zxc("#txtBirimAd2").value(" ");
    zxc("#slcUstGrupBirim2").selectbox("-1")
    zxc("#chbht7,#chbht6,#chbht5").checked(false);
    zxc('#txtTitKurumAd,#tblIlce,tblMahalle,#tblProjeTip,#tblRolBrm,#tblYolAidiyet').html(" ");
}
//#endregion

//#region Ilce Mahalle
function fncIlceEvent() {
    var q = this,
        ilcAry = [],
        w = q.getAttribute('data-id');

    if (q.checked) {
        ilcAry.push(parseInt(w));
        PostJson('/api/Api_Genel/GetIlceninMahalleleri/' + slcBirimID, ilcAry, function (data) {
            var g = data.veri,
                html = "";
            for (var i = 0; i < g.length; i++) {
                var mm = g[i];
                for (var n = 0; n < mm.length; n++)
                    html = html.concat(`<tr data-ilceref="${mm[n].ILCEREF}">
                <td><div class="form-check"><input class="form-check-input chbvgf2" ${mm[n].Checked == true ? 'checked' : ''}  data-mahallead="${mm[n].TANIM}" data-mahalleref="${mm[n].MAHALLEREF}" data-ilceref="${mm[n].ILCEREF}" type="checkbox"></div></td>
                <td>${mm[n].ILCEAD}</td>
                <td>${mm[n].TANIM}</td>
                </tr>`);
            }
            zxc('#tblMahalle').ekle(html);
        }, function () {
            zxc('.bbg2').html("Mahalleler Yükleniyor..")
        }, function () {
            zxc('.bbg2').html("Mahalle")
        })
    }
    else {
        zxc('.bbg2').html("Mahalleler Siliniyor..");
        document.querySelectorAll('#tblMahalle tr[data-ilceref="' + w + '"]').forEach(j => zxc(j).elementiSil());
        zxc('.bbg2').html("Mahalle");
    }
}
function fncIlceMahKaydt() {
    var qq = this;
    var arys = [];
    document.querySelectorAll('.chbvgf').forEach(q => {
        if (q.checked) {
            var aryIlce,
                id = q.getAttribute('data-id'),
                ad = q.getAttribute('data-ad');

            var aryMahalle = [];
            document.querySelectorAll('.chbvgf2[data-ilceref="' + id + '"]').forEach(h => {
                if (h.checked)
                    aryMahalle.push({
                        MahalleID: parseInt(h.getAttribute('data-mahalleref')),
                        MahalleAD: h.getAttribute('data-mahallead')
                    });
            });
            if (aryMahalle.length == 0)
                aryIlce = {
                    IlceID: parseInt(id),
                    IlceAD: ad
                };
            else
                aryIlce = {
                    IlceID: parseInt(id),
                    IlceAD: ad,
                    MahalleLstParams: aryMahalle
                };
            arys.push(aryIlce);
        }
    });

    PostJson('/api/Api_Genel/SetIlceninMahalleleri/' + slcBirimID, arys, function (data) {
        MesajVer(zxc("#txtBirimAd2").value() + ", için İlçe/Mahalle Onay Kaydedilmiştir.", MesajDurumu.Succes)
    }, function () {
        zxc(qq).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
    }, function () {
        zxc(qq).attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
    })
}

//#endregion

//#region Proje Tip
function fncPrjTipKaydt() {
    var qq = this;
    var ary = [];
    document.querySelectorAll('.chbvgfPrjTip').forEach(q => {
        if (q.checked)
            ary.push(parseInt(q.getAttribute('data-id')));
    });

    PostJson('/api/Api_Genel/SetKurumsProjeTips/' + slcBirimID, ary, function (data) {
        MesajVer(zxc("#txtBirimAd2").value() + ", için Proje Tipleri Kaydedilmiştir.", MesajDurumu.Succes)
    }, function () {
        zxc(qq).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
    }, function () {
        zxc(qq).attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
    })
}


//#endregion

//#region Rol
function fncRolChange() {
    var q = this,
        w = q.getAttribute('data-id');
    if (q.checked == true && (
        zxc('.chbvgfRolTip:0').dom.checked == true ||
        zxc('.chbvgfRolTip:3').dom.checked == true)
        && w == RolEnum.Basvuru) {
        zxc('.chbvgfRolTip:0').dom.checked = false;
        zxc('.chbvgfRolTip:3').dom.checked = false;
        MesajVer('Başvuru Yeteneğine Sahip Bir Rol, Olur ve Onay Yetenekleri Otomatikman Pasif Olur!', MesajDurumu.Warning);
    }
    if (q.checked == true && zxc('.chbvgfRolTip:1').dom.checked == true && (w == RolEnum.Olur || w == RolEnum.Onay)) {
        zxc('.chbvgfRolTip:1').dom.checked = false;
        MesajVer('Olur ve Onay Yeteneğine Sahip Bir Rol, Başvuru Yeteneği Otomatikman Pasif Olur!', MesajDurumu.Warning);
    }
}
function fncRolBrmKaydt() {
    var qq = this;
    var ary = [];
    document.querySelectorAll('.chbvgfRolTip').forEach(q => {
        if (q.checked)
            ary.push(parseInt(q.getAttribute('data-id')));
    });

    PostJson('/api/Api_Genel/SetBirimRols/' + slcBirimID, ary, function (data) {
        MesajVer(zxc("#txtBirimAd2").value() + ", için Roller Kaydedilmiştir.", MesajDurumu.Succes)
    }, function () {
        zxc(qq).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
    }, function () {
        zxc(qq).attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
    })
}
//#endregion

//#region Yolaidiyet

function fncYolAdiyetKaydt() {
    var qq = this;
    var ary = [];
    document.querySelectorAll('.chbvgfYolaidiyet').forEach(q => {
        if (q.checked)
            ary.push(parseInt(q.getAttribute('data-id')));
    });

    PostJson('/api/Api_Genel/SetYolAidiyet/' + slcBirimID, ary, function (data) {
        MesajVer(zxc("#txtBirimAd2").value() + ", için Yol Aidiyetler Kaydedilmiştir.", MesajDurumu.Succes)
    }, function () {
        zxc(qq).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
    }, function () {
        zxc(qq).attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
    })
}
//#endregion
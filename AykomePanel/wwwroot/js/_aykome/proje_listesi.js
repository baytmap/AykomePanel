var StartPage = 1, toplamKayit = 0, slcProjeID = null, pdfData = 1, aktifSekme = null;
zxc.baslarken(function () {
    fncIlkAcilis(true);

    // fncTblHeight();

    zxc('.nav-link').click(function () {
        zxc('#mrdv').html(' ');
        slcProjeID = null;
        aktifSekme = this;
    })

    zxc('#btnAraModal').click(fncGetProjeAraOpn);
    zxc('#btnVeriAra').click(fncGetProjeAra);
    zxc('#btnAraClear').click(fncFilClear);
    zxc('#btnToplPny').click(fncTopluOnayla);

    zxc('#btnToplOlr').click(function () {
        var ButunIDler = [];
        ButunIDler = zxc('.chbTplOlur').checkedListArray('data-id');
        if (ButunIDler.length == 0)
            MesajVer('Toplu Olur İşlemi İçin Bir Seçim Yapılmadı!', MesajDurumu.Warning);
        imzaConfig = {
            imzaDataString: `${ButunIDler} projesleri için olur veriliyor.`,
            islem_tipi: "ProjeyeTopluOlurVermek",
            refidList: ButunIDler,
            refid: null,
            fncCallback: function () { fncTopluOlurVer(ButunIDler); }
        }
        imzaRefModal = null;
        zxc('#btnCadesImzala').html(' ');
        fncModalAc("#mdlImza");
    });

    //zxc(".btnDatOnc").click(fncDataOnceki);
    zxc("#btnprjnoara").click(function () {
        var q = this,
            w = zxc(q).birOncekiElement().value();
        if (w)
            fncSekmedeAra(w);
    });
    /* fncImzaStart();*/

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
    if (Tanim == false) {
        zxc('#DagitimdanGelenTap-tab').classSil("active");
        zxc('#DagitimdanGelenTap').attr("class", "tab-pane fade");

        zxc('#YatirimcidanGelenTap-tab').classSil("active");
        zxc('#YatirimcidanGelenTap').attr("class", "tab-pane fade");

        zxc('#TaslaklarimTap-tab').classSil("active");
        zxc('#TaslaklarimTap').attr("class", "tab-pane fade");

        zxc('#OlurVerilecekTap-tab').classSil("active");
        zxc('#OlurVerilecekTap').attr("class", "tab-pane fade");

        zxc('#OlurVerilenTap-tab').classSil("active");
        zxc('#OlurVerilenTap').attr("class", "tab-pane fade");

        zxc('#IncelenenTap-tab').classSil("active");
        zxc('#IncelenenTap').attr("class", "tab-pane fade");

        zxc('#ReddEdilen-tab').classSil("active");
        zxc('#ReddEdilen').attr("class", "tab-pane fade");

        zxc('#OnayIcinGelen-tab').classSil("active");
        zxc('#OnayIcinGelen').attr("class", "tab-pane fade");

        zxc('#Onaylanan-tab').classSil("active");
        zxc('#Onaylanan').attr("class", "tab-pane fade");

        zxc('#Onaylanmayan-tab').classSil("active");
        zxc('#Onaylanmayan').attr("class", "tab-pane fade");

        zxc('#Dagitilan-tab').classSil("active");
        zxc('#Dagitilan').attr("class", "tab-pane fade");

        zxc('#OnaylanacakTaslak-tab').classSil("active");
        zxc('#OnaylanacakTaslak').attr("class", "tab-pane fade");

        zxc('#TumProjeler-tab').classSil("active");
        zxc('#TumProjeler').attr("class", "tab-pane fade");

        zxc('#ArazideKontrolEdilecek-tab').classSil("active");
        zxc('#ArazideKontrolEdilecek').attr("class", "tab-pane fade");

        zxc('#ArazideKontrolEdilen-tab').classSil("active");
        zxc('#ArazideKontrolEdilen').attr("class", "tab-pane fade");

        zxc('#UygunlukBelDuzenle-tab').classSil("active");
        zxc('#UygunlukBelDuzenle').attr("class", "tab-pane fade");

        zxc('#UygunlukBelImzala-tab').classSil("active");
        zxc('#UygunlukBelImzala').attr("class", "tab-pane fade");
    }

    GetJson('/api/Api_Aykome/GetProjeList/' + Tanim + '/' + StartPage, function (data) {
        var html = "";

        var BirimRols = data.BirimRols,
            UstGrupBirimId = data.UstGrupBirimId;
        if (BirimRols != null && UstGrupBirimId != null) {

            //zxc('#KendiProjelerimTap,#KendiProjelerimTap-tab').attrSil("hidden");
            //zxc('#DagitimdanGelenTap-tab,#DagitimdanGelenTap').attrSil("hidden");
            //zxc('#YatirimcidanGelenTap-tab,#YatirimcidanGelenTap').attrSil("hidden");
            //zxc('#TaslaklarimTap-tab,#TaslaklarimTap').attrSil("hidden");
            //zxc('#OlurVerilecekTap-tab,#OlurVerilecekTap').attrSil("hidden");
            //zxc('#OlurVerilenTap-tab,#OlurVerilenTap').attrSil("hidden");
            //zxc('#IncelenenTap-tab,#IncelenenTap').attrSil("hidden");

            //zxc('#ReddEdilen-tab,#ReddEdilen').attrSil("hidden");
            //zxc('#OnayIcinGelen-tab,#OnayIcinGelen').attrSil("hidden");
            //zxc('#Onatlanan-tab,#Onatlanan').attrSil("hidden");
            //zxc('#Onaylanmayan-tab,#Onaylanmayan').attrSil("hidden");
            //zxc('#Dagitilan-tab,#Dagitilan').attrSil("hidden");
            //zxc('#OnaylanacakTaslak-tab,#OnaylanacakTaslak').attrSil("hidden");
            //zxc('#TumProjeler-tab,#TumProjeler').attrSil("hidden");

            const Basvuru = BirimRols.some(q => q.RolID === RolEnum.Basvuru);
            const Olur = BirimRols.some(q => q.RolID === RolEnum.Olur);
            const Onay = BirimRols.some(q => q.RolID === RolEnum.Onay);
            const Admin = BirimRols.some(q => q.RolID === RolEnum.Admin);
            const SahaKontrol = BirimRols.some(q => q.RolID === RolEnum.SahaKontrol);

            if (Basvuru) {
                zxc('#KendiProjelerimTap-tab').classEkle("active");
                zxc('#KendiProjelerimTap').attr("class", "tab-pane fade active show");

                if (UstGrupBirimId == 6) {
                    zxc('#KendiProjelerimTap,#KendiProjelerimTap-tab').attrSil("hidden");
                    zxc('#DagitimdanGelenTap-tab,#DagitimdanGelenTap').attrSil("hidden");
                    zxc('#YatirimcidanGelenTap-tab,#YatirimcidanGelenTap').attrSil("hidden");
                    zxc('#TaslaklarimTap-tab,#TaslaklarimTap').attrSil("hidden");
                    zxc('#IncelenenTap-tab,#IncelenenTap').attrSil("hidden");
                    zxc('#TumProjeler-tab,#TumProjeler').attrSil("hidden");
                } else {
                    zxc('#KendiProjelerimTap,#KendiProjelerimTap-tab').attrSil("hidden");
                    zxc('#YatirimcidanGelenTap-tab,#YatirimcidanGelenTap').attrSil("hidden");
                    zxc('#TaslaklarimTap-tab,#TaslaklarimTap').attrSil("hidden");
                }
                zxc('#UygunlukBelImzala-tab,#UygunlukBelImzala').attrSil("hidden");
            }

            if (Olur) {
                if (!Onay) {
                    zxc('#OlurVerilecekTap-tab').classEkle("active");
                    zxc('#OlurVerilecekTap').attr("class", "tab-pane fade active show");
                }
                if (UstGrupBirimId == 2) {
                    zxc('#OlurVerilecekTap-tab,#OlurVerilecekTap').attrSil("hidden");
                    zxc('#OlurVerilenTap-tab,#OlurVerilenTap').attrSil("hidden");
                    zxc('#ReddEdilen-tab,#ReddEdilen').attrSil("hidden");
                    zxc('#TumProjeler-tab,#TumProjeler').attrSil("hidden");
                } else {
                    zxc('#OlurVerilecekTap-tab,#OlurVerilecekTap').attrSil("hidden");
                    zxc('#OlurVerilenTap-tab,#OlurVerilenTap').attrSil("hidden");
                    zxc('#ReddEdilen-tab,#ReddEdilen').attrSil("hidden");
                    zxc('#UygunlukBelImzala-tab,#UygunlukBelImzala').attrSil("hidden");


                }
            }

            if (Onay) {
                zxc('#TaslaklarimTap-tab').classEkle("active");
                zxc('#TaslaklarimTap').attr("class", "tab-pane fade active show");

                if (UstGrupBirimId == 1) {
                    zxc('#TaslaklarimTap-tab,#TaslaklarimTap').attrSil("hidden");
                    zxc('#OnayIcinGelen-tab,#OnayIcinGelen').attrSil("hidden");
                    zxc('#Onaylanan-tab,#Onaylanan').attrSil("hidden");
                    zxc('#Onaylanmayan-tab,#Onaylanmayan').attrSil("hidden");
                    zxc('#Dagitilan-tab,#Dagitilan').attrSil("hidden");
                    zxc('#OnaylanacakTaslak-tab,#OnaylanacakTaslak').attrSil("hidden");
                    zxc('#TumProjeler-tab,#TumProjeler').attrSil("hidden");
                    zxc('#ArazideKontrolEdilen-tab,#ArazideKontrolEdilen').attrSil("hidden");
                    zxc('#UygunlukBelDuzenle-tab,#UygunlukBelDuzenle').attrSil("hidden");
                } else {
                    zxc('#TaslaklarimTap-tab,#TaslaklarimTap').attrSil("hidden");
                    zxc('#OnayIcinGelen-tab,#OnayIcinGelen').attrSil("hidden");
                    zxc('#Onaylanan-tab,#Onaylanan').attrSil("hidden");
                    zxc('#Onaylanmayan-tab,#Onaylanmayan').attrSil("hidden");
                    zxc('#Dagitilan-tab,#Dagitilan').attrSil("hidden");
                    zxc('#OnaylanacakTaslak-tab,#OnaylanacakTaslak').attrSil("hidden");
                    zxc('#UygunlukBelImzala-tab,#UygunlukBelImzala').attrSil("hidden");
                }
            }

            if (SahaKontrol) {
                zxc('#ArazideKontrolEdilecek-tab').classEkle("active");
                zxc('#ArazideKontrolEdilecek').attr("class", "tab-pane fade active show");

                zxc('#ArazideKontrolEdilecek-tab,#ArazideKontrolEdilecek').attrSil("hidden");

                zxc('#filMusteriFotograf').change(handleFileUpload);

            }

            if (Tanim) {
                if (data.IlceList != null) {
                    html = '<option value="">Seç</option>';
                    data.IlceList.forEach(q =>
                        html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                    document.getElementById('slcIlceID').innerHTML = html;
                    document.getElementById('slcBelediyeID').innerHTML = html;
                    document.getElementById('slcIlceID').onchange = fncIlceSecildiginde;
                }
                if (data.DurumList != null) {
                    html = '<option value="">Seç</option>';
                    data.DurumList.forEach(q =>
                        html = html.concat(`<div class="form-check">
  <input class="form-check-input ffcfv" type="checkbox" data-id="${q.Key}">
  <label class="form-check-label">
    ${q.Val}
  </label>
</div>
`));
                    document.getElementById('txtProjeListesiAraDurumParams').innerHTML = html;
                }
                if (data.KurumList != null) {
                    html = '<option value="">Seç</option>';
                    data.KurumList.forEach(q =>
                        html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                    document.getElementById('slcTalepSahibiKurumID').innerHTML = html;
                    document.getElementById('slcTalepSahibiKurumID').onchange = fncKurumSecildiginde;
                }
            }

            html = "";

            if (data.KendiProjelerim != null) {
                data.KendiProjelerim.forEach(q => {
                    var htmKazDrm = 'text-primary';

                    var imzaGorBtn = '';
                    if (q.IzmPath != "" && q.DurumID != 99) {
                        imzaGorBtn = '<a data-path="' + q.IzmPath + '" onclick="fncImzaBilgisiGor(this)" class="btn btn-sm btnimzgor"><span class="bx bx-pen"></span><span>İmza Bilgisini Gör</span></a>';
                    }

                    if (q.KaziDurumu == 'Aktif Kazı')
                        htmKazDrm = 'text-success';

                    else if (q.KaziDurumu == 'Biten Kazı')
                        htmKazDrm = 'text-danger';

                    var kazDrmBtn = '';
                    if ((q.DurumID == 2 || q.DurumID == 13) && q.imzatamamlandi == true && q.KaziDurumID == KaziDurum.BaslanmayanKazi)
                        kazDrmBtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncKaziyiBaslatOpn(this)"><span class="bx bx-run"></span><span>Kazıyı Başlat</span></a>';

                    else if (q.KaziDurumID == KaziDurum.AktifKazi)
                        kazDrmBtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncKaziyiBitirOpn(this)"><span class="bx bxs-check-shield"></span><span>Kazıyı Bitir</span></a>';

                    var projeIptBtn = '';
                    if (q.KaziDurumID == KaziDurum.BaslanmayanKazi || q.KaziDurumID == KaziDurum.OnaylananKazi)
                        if (q.DurumID != 99)
                            projeIptBtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncProjeyiIptalEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Projeyi İptal Et</span></a>';
                        else {
                            projeIptBtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncProjeyeTekrarBasvurOpn(this)"><span class="bx bxs-check-shield"></span><span>Tekrar Başvur</span></a>';
                        }

                    var vtbRhst = '';
                    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q.RuhsMasterGuidVal))
                        vtbRhst = '<a class="btn btn-sm btnShwRuhsat"><span class="bx bx-book"></span><span>Ruhsat Gör</span></a>';

                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>',
                        dagitimHtml = '<a class="btn btn-sm btnRowDagitim"><span class="bx bx-directions"></span><span>Dağıtım Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26) {
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';
                        dagitimHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Dağıtım Bilgisi Yoktur!</span></a>';
                    }

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.IncelemeDurum}</td>
                    <td>${q.Notlar}</td>
                    <td><span class="${htmKazDrm}">${q.KaziDurumu}</span></td>
                    <td>${kazDrmBtn}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                ${dagitimHtml}
                                ${olrHtml}
                                ${vtbRhst}
                                ${imzaGorBtn}
                                ${projeIptBtn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata1').html(html);
            }

            if (data.DagitimlaGelen != null) {
                html = '';
                data.DagitimlaGelen.forEach(q => {

                    var genekBrn = '';
                    if (q.DurumID != 99) {
                        genekBrn = `<a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDagitimIncelendiOpn(this)"><span class="bx bx-book"></span><span>İnceleme Notu Ekle</span></a>`;
                    }


                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.IncelemeDurum}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                ${genekBrn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata2').html(html);
            }

            if (data.YatirimciKurumlar != null) {
                html = '';
                data.YatirimciKurumlar.forEach(q => {

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata3').html(html);
            }

            if (data.Taslaklarim != null) {
                html = '';
                data.Taslaklarim.forEach(q => {
                    var irslGorBtn = '';
                    if (Onay == true) {
                        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q.RuhsMasterGuidVal)) {
                            irslGorBtn = '<a class="btn btn-sm btnShwIrsal" data-uniq="' + q.RuhsMasterGuidVal + '"><span class="bx bx-book"></span><span>İrsaliye Gör</span></a>';
                        }
                    }
                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                <a class="btn btn-sm"><span class="bx bx-directions"></span><span>Başvur</span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                                <a class="btn btn-sm"><span class="bx bxs-user-check"></span><span>Taslağı Sil</span></a>
                                ${irslGorBtn}
                          </div>
                        </td>
                    </tr>`);
                });

                zxc('#tdata4').html(html);
            }

            if (data.OlurVerilecekler != null) {
                html = '';
                data.OlurVerilecekler.forEach(q => {
                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26)
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';
                    var inceleBtn = '';
                    if (q.IncelemeDurum == 'Kullanıcı inceledi' || q.IncelemeDurum == 'Sistem onayladı' || q.IncelemeDurum == 'İnceleme Devam Ediyor')
                        inceleBtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" data-tip="olurverilecekler" onclick="fncIncelemeNotGrMdlOpn(this)"><span class="bx bx-book"></span><span>İnceleme Notu Gör</span></a>';


                    var genekBrn = '';
                    if (q.DurumID != 99) {
                        genekBrn = `
                                <a class="btn btn-sm btnsil btnPrjOlrVer"><span class="bx bx-checkbox"></span><span>Projeye Olur Ver</span></a>
                                <a class="btn btn-sm btnsil btnPrjRedVer"><span class="bx bx-checkbox"></span><span>Projeye Reddet</span></a>`;

                    }
                    var topluOlurHtml = '';
                    const hasRolID2 = BirimRols.some(item => item.RolID === 2);

                    if (UstGrupBirimId == 3 && hasRolID2 == true) {
                        zxc('#btnToplOlr').attrSil('hidden');
                        //                        if (q.TalepBirimID == data.Birim.BirimId)
                        topluOlurHtml = '<td class="wdt-enkucuk"><input type="checkbox" class="chbTplOlur me-2" data-id="' + q.ProjeRef + '" /></td>';
                        //else
                        //    topluOlurHtml = '<td class="wdt-enkucuk"></td>';
                    }
                    else {
                        zxc('#btnToplOlr').attr('hidden', 'hidden');


                    }

                    html = html.concat(`<tr data-id="${q.ProjeRef}" data-talepbirimid="${q.TalepBirimID}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    ${topluOlurHtml}
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.IncelemeDurum}</td>
                    <td>${q.Notlar}</td>
                      <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                ${genekBrn}
                                ${olrHtml}
                                ${inceleBtn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata5').html(html);

                document.querySelectorAll('.chbTplOlur').forEach(checkbox => {
                    checkbox.addEventListener('change', function () {
                        const wasChecked = this.checked;
                        document.querySelectorAll('.chbTplOlur').forEach(cb => {
                            cb.checked = false;
                        });
                        const tr = this.closest('tr');
                        if (tr) {
                            const talepBirimId = tr.getAttribute('data-talepbirimid');
                            if (talepBirimId) {
                                document.querySelectorAll(`tr[data-talepbirimid="${talepBirimId}"] .chbTplOlur`).forEach(cb => {
                                    cb.checked = wasChecked;
                                });
                            }
                        }
                    });
                });

            }

            if (data.OlurVerilenler != null) {
                html = '';
                data.OlurVerilenler.forEach(q => {
                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26)
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';

                    var imzaGorBtn = '';
                    if (q.IzmPath != "") {
                        imzaGorBtn = '<a data-path="' + q.IzmPath + '" onclick="fncImzaBilgisiGor(this)" class="btn btn-sm btnimzgor"><span class="bx bx-pen"></span><span>İmza Bilgisini Gör</span></a>';
                    }

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.IncelemeDurum}</td>
                    <td>${q.Notlar}</td>
                      <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                ${olrHtml}
                                ${imzaGorBtn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncProjeyiOlurIptaEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Oluru Geri Çek</span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                         </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata6').html(html);
            }

            if (data.IncelenenProjeler != null) {
                html = '';
                data.IncelenenProjeler.forEach(q => {

                    var imzaGorBtn = '';
                    if (q.IzmPath != "") {
                        imzaGorBtn = '<a data-path="' + q.IzmPath + '" onclick="fncImzaBilgisiGor(this)" class="btn btn-sm btnimzgor"><span class="bx bx-pen"></span><span>İmza Bilgisini Gör</span></a>';
                    }

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.IncelemeDurum}</td>
                    <td>${zxc.tarihParse(q.IncelemeTarihi)}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                <a class="btn btn-sm btnRowDagitim"><span class="bx bx-directions"></span><span>Dağıtım Bilgi Gör</span></a>
                                ${imzaGorBtn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata7').html(html);
            }

            if (data.RedVerilenler != null) {
                html = '';
                data.RedVerilenler.forEach(q => {
                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>',
                        dagitimHtml = '<a class="btn btn-sm btnRowDagitim"><span class="bx bx-directions"></span><span>Dağıtım Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26) {
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';
                        dagitimHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Dağıtım Bilgisi Yoktur!</span></a>';
                    }

                    var imzaGorBtn = '';
                    if (q.IzmPath != "") {
                        imzaGorBtn = '<a data-path="' + q.IzmPath + '" onclick="fncImzaBilgisiGor(this)" class="btn btn-sm btnimzgor"><span class="bx bx-pen"></span><span>İmza Bilgisini Gör</span></a>';
                    }

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.IncelemeDurum}</td>
                    <td>${q.Notlar}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncProjeyiReddiIptaEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Reddi Geri Çek</span></a>
                               ${dagitimHtml}
                               ${olrHtml}
                               ${imzaGorBtn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata8').html(html);
            }

            if (data.OnayIcınGelenProjeler != null) {
                html = '';
                data.OnayIcınGelenProjeler.forEach(q => {
                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>',
                        dagitimHtml = '<a class="btn btn-sm btnRowDagitim"><span class="bx bx-directions"></span><span>Dağıtım Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26) {
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';
                        dagitimHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Dağıtım Bilgisi Yoktur!</span></a>';
                    }

                    var ptip = q.ProjeTipiID;
                    var OlurBtnDurum = '';
                    if (q.imzatamamlandi == true) {
                        if (ptip == 1 || ptip == 2 || ptip == 3 || ptip == 4 || ptip == 5 || ptip == 6 || ptip == 12 || ptip == 13 || ptip == 14 || ptip == 15 || ptip == 19 || ptip == 20 || ptip == 21 || ptip == 22 || ptip == 26)
                            OlurBtnDurum = '<a class="btn btn-sm btnRwMakbuzAc"><span class="bx bx-edit"></span><span>Projeyi Onayla</span></a>';
                        else
                            OlurBtnDurum = '<a class="btn btn-sm btnRwRuhFormAc" data-ilk="1"><span class="bx bx-edit"></span><span>Projeyi Onayla</span></a>';
                    }
                    else
                        OlurBtnDurum = '<a class="btn btn-sm btnImzalamaIslem1" data-islem="2" data-id="' + q.ProjeRef + '"><span class="bx bx-edit"></span><span>Projeyi İmzala</span></a>';


                    var vtbRhst = '', irslGorBtn = '';
                    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q.RuhsMasterGuidVal)) {
                        vtbRhst = '<a class="btn btn-sm btnShwRuhsat"><span class="bx bx-book"></span><span>Ruhsat Gör</span></a>';
                        irslGorBtn = '<a class="btn btn-sm btnShwIrsal" data-uniq="' + q.RuhsMasterGuidVal + '"><span class="bx bx-book"></span><span>İrsaliye Gör</span></a>';
                    }

                    var aktifPasifbtn = '';
                    if (q.Aktif != 1)
                        aktifPasifbtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncProjeyiPasifEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Projeyi Pasife Al</span></a>';
                    else
                        aktifPasifbtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncProjeyiAktifEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Projeyi Aktife Al</span></a>';

                    var ImzaDurumu = '';
                    if (q.IzmPath != "" && q.DurumID != 99) {
                        ImzaDurumu = '<a data-path="' + q.IzmPath + '" onclick="fncImzaBilgisiGor(this)" class="btn btn-sm btnimzgor"><span class="bx bx-pen"></span><span>İmza Bilgisini Gör</span></a>';
                    }


                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${q.Birim}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.Imzalar}</td>
                    <td>${q.ProjeTipi}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                ${OlurBtnDurum}
                                <a class="btn btn-sm btnRowOnayRedVer"><span class="bx bx-directions"></span><span>Projeyi Reddet</span></a>
                                ${dagitimHtml}
                                ${olrHtml}
                                ${ImzaDurumu}
                                ${vtbRhst}
                                ${irslGorBtn}
                                ${aktifPasifbtn}
                                <a class="btn btn-sm btnRhsGuncelle" data-tp="onaylanacak" data-kaziid="${q.KaziDurumID}" data-ek="${q.EkHesap}" data-tr="${q.TarihGuncelleme}" data-hs="${q.HesapGuncelleme}"><span class="bx bx-book"></span><span>Ruhsat Güncelle</span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata9').html(html);
            }

            if (data.OnaylananProjeler != null) {
                html = '';
                data.OnaylananProjeler.forEach(q => {
                    var vtbRhst = '', irslGorBtn = '';
                    if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q.RuhsMasterGuidVal)) {
                        vtbRhst = '<a class="btn btn-sm btnShwRuhsat"><span class="bx bx-book"></span><span>Ruhsat Gör</span></a>';
                        irslGorBtn = '<a class="btn btn-sm btnShwIrsal" data-uniq="' + q.RuhsMasterGuidVal + '"><span class="bx bx-book"></span><span>İrsaliye Gör</span></a>';
                    }
                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>',
                        dagitimHtml = '<a class="btn btn-sm btnRowDagitim"><span class="bx bx-directions"></span><span>Dağıtım Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26) {
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';
                        dagitimHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Dağıtım Bilgisi Yoktur!</span></a>';
                    }

                    var ImzaDurumu = '', styimzldg = '';
                    if (q.ImzaDurumu == 1 && q.DurumID != 99) {
                        ImzaDurumu = '<a data-path="' + q.IzmPath + '" onclick="fncImzaBilgisiGor(this)" class="btn btn-sm btnimzgor"><span class="bx bx-pen"></span><span>İmza Bilgisini Gör</span></a>';
                    }
                    else if (q.ImzaDurumu == 3) {
                        ImzaDurumu = '<a class="btn btn-sm btnOnayImzalamaIslem1" data-islem="1" data-id="' + q.ProjeRef + '"><span class="bx bx-edit"></span><span>Projeyi İmzala</span></a>';
                        styimzldg = 'imzldg';
                    } else if (q.ImzaDurumu == 4) {
                        ImzaDurumu = '<a class="btn btn-sm btnOnayImzalamaIslem1" data-islem="2" data-id="' + q.ProjeRef + '"><span class="bx bx-edit"></span><span>Projeyi İmzala</span></a>';
                        styimzldg = 'imzldg';
                    } else if (q.ImzaDurumu == 2) {
                        ImzaDurumu = '<div style="text-align: left;padding: 0 13px;color: red;"><span class="bi bi-watch"></span><span>İmzalanmayı Bekliyor</span></div>';
                        styimzldg = 'imzldg';
                    }
                    var aktifPasifbtn = '';
                    if (q.Aktif != 1)
                        aktifPasifbtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncProjeyiPasifEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Projeyi Pasife Al</span></a>';
                    else
                        aktifPasifbtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncProjeyiAktifEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Projeyi Aktife Al</span></a>';



                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${styimzldg} ${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${q.Birim}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.Imzalar}</td>
                    <td>${q.ProjeTipi}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncProjeyiOnayiCekOpn(this)"><span class="bx bxs-check-shield"></span><span>Onayı Geri Çek</span></a>
                                ${dagitimHtml}
                                ${ImzaDurumu}
                                ${olrHtml}
                                ${vtbRhst}
                                ${irslGorBtn}
                                ${aktifPasifbtn}
                                <a class="btn btn-sm btnRhsGuncelle" data-tp="onaylanan" data-kaziid="${q.KaziDurumID}" data-ek="${q.EkHesap}" data-tr="${q.TarihGuncelleme}" data-hs="${q.HesapGuncelleme}"><span class="bx bx-book"></span><span>Ruhsat Güncelle</span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });



                zxc('#tdata10').html(html);
            }

            if (data.OnaylananmayanProjeler != null) {
                html = '';
                data.OnaylananmayanProjeler.forEach(q => {
                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>',
                        dagitimHtml = '<a class="btn btn-sm btnRowDagitim"><span class="bx bx-directions"></span><span>Dağıtım Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26) {
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';
                        dagitimHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Dağıtım Bilgisi Yoktur!</span></a>';
                    }

                    var aktifPasifbtn = '';
                    if (q.Aktif != 1)
                        aktifPasifbtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncProjeyiPasifEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Projeyi Pasife Al</span></a>';
                    else
                        aktifPasifbtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" onclick="fncProjeyiAktifEtOpn(this)"><span class="bx bxs-check-shield"></span><span>Projeyi Aktife Al</span></a>';

                    var imzaGorBtn = '';
                    if (q.IzmPath != "") {
                        imzaGorBtn = '<a data-path="' + q.IzmPath + '" onclick="fncImzaBilgisiGor(this)" class="btn btn-sm btnimzgor"><span class="bx bx-pen"></span><span>İmza Bilgisini Gör</span></a>';
                    }

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${q.Birim}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.Imzalar}</td>
                    <td>${q.ProjeTipi}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                ${dagitimHtml}
                                ${olrHtml}
                                ${aktifPasifbtn}
                                ${imzaGorBtn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                //<a class="btn btn-sm"><span class="bx bx-pencil"></span><span>İmza Bilgi Gör</span></a>
                zxc('#tdata11').html(html);
            }

            if (data.DagitilanProjeler != null) {
                html = '';
                data.DagitilanProjeler.forEach(q => {

                    var inceleBtn = '';
                    if (q.IncelemeDurum == 'Kullanıcı inceledi' || q.IncelemeDurum == 'Sistem onayladı' || q.IncelemeDurum == 'İnceleme Devam Ediyor')
                        inceleBtn = '<a class="btn btn-sm" data-id="' + q.ProjeRef + '" data-tip="dagitilan" onclick="fncIncelemeNotGrMdlOpn(this)"><span class="bx bx-book"></span><span>İnceleme Notu Gör</span></a>';

                    var irslGorBtn = '';
                    if (Onay == true) {
                        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q.RuhsMasterGuidVal)) {
                            irslGorBtn = '<a class="btn btn-sm btnShwIrsal" data-uniq="' + q.RuhsMasterGuidVal + '"><span class="bx bx-book"></span><span>İrsaliye Gör</span></a>';
                        }
                    }

                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>',
                        dagitimHtml = '<a class="btn btn-sm btnRowDagitim"><span class="bx bx-directions"></span><span>Dağıtım Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26) {
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';
                        dagitimHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Dağıtım Bilgisi Yoktur!</span></a>';
                    }

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.IncelemeDurum}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                 ${dagitimHtml}
                                 ${olrHtml}
                                 ${inceleBtn}
                                 ${irslGorBtn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata12').html(html);
            }

            if (data.OnaylanacakTaslakProjeler != null) {
                html = '';
                data.OnaylanacakTaslakProjeler.forEach(q => {
                    var irslGorBtn = '';
                    if (Onay == true) {
                        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q.RuhsMasterGuidVal)) {
                            irslGorBtn = '<a class="btn btn-sm btnShwIrsal" data-uniq="' + q.RuhsMasterGuidVal + '"><span class="bx bx-book"></span><span>İrsaliye Gör</span></a>';
                        }
                    }
                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                <a class="btn btn-sm"><span class="bx bx-edit"></span><span>Taslağa Onay Ver</span></a>
                                <a class="btn btn-sm"><span class="bx bx-edit"></span><span>Taslağı Reddet</span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                                ${irslGorBtn}
                                <a class="btn btn-sm"><span class="bx bx-edit"></span><span>Taslağı Sil</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata13').html(html);
            }

            if (data.TumProjeler != null) {
                html = '';
                data.TumProjeler.forEach(q => {
                    var irslGorBtn = '';
                    if (Onay == true) {
                        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q.RuhsMasterGuidVal)) {
                            irslGorBtn = '<a class="btn btn-sm btnShwIrsal" data-uniq="' + q.RuhsMasterGuidVal + '"><span class="bx bx-book"></span><span>İrsaliye Gör</span></a>';
                        }
                    }
                    var vtbRhst = '';
                    if (Onay == true)
                        if (/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(q.RuhsMasterGuidVal))
                            vtbRhst = '<a class="btn btn-sm btnShwRuhsat"><span class="bx bx-book"></span><span>Ruhsat Gör</span></a>';

                    var olrHtml = '<a class="btn btn-sm btnShwOlur"><span class="bx bxs-user-check"></span><span>Olur Bilgi Gör</span></a>';
                    if (q.ProjeTipiID == 26)
                        olrHtml = '<a class="btn btn-sm btnyok"><span class="bx bx-confused"></span><span>Olur Bilgisi Yoktur!</span></a>';

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${q.Birim}</td>
                    <td><div class="${q.DurumClass}">${q.Durum}</div></td>
                    <td>${q.Imzalar}</td>
                    <td>${q.ProjeTipi}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                ${olrHtml}
                                 ${vtbRhst}
                                 ${irslGorBtn}
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncDosyaMdlOpn(this)"><span class="bx bxs-download"></span><span>Dosyalar</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                /* <a class="btn btn-sm"><span class="bx bx-pencil"></span><span>İmza Bilgi Gör</span></a>*/
                zxc('#tdata14').html(html);
            }

            if (data.ArazideKontrolEdilecekProjeler != null) {
                html = '';
                data.ArazideKontrolEdilecekProjeler.forEach(q => {

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td>${zxc.tarihParse(q.OnayTarihi)}</td>
                     <td>${q.AraziInceleme}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm btnPrjInfo"><span class="bx bx-info-circle"></span><span>Proje Bilgilerini Gör</span></a>
                                <a class="btn btn-sm" href="/Harita/HaritaPg?projeref=${q.ProjeRef}"><span class="bx bx-map"></span><span>Haritada Gör</span></a>
                                <a class="btn btn-sm btnShwMarem"><span class="bx bx-edit"></span><span>Kazı Bilgi Gör </span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" data-no="${q.ProjeNumarasi}" data-tip="1" onclick="fncAraziKontrolOpn(this)"><span class="bx bxs-download"></span><span>Arazi Kontrolü</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata15').html(html);
            }

            if (data.ArazideKontrolEdilenProjeler != null) {
                html = '';
                data.ArazideKontrolEdilenProjeler.forEach(q => {
                    var btn22 = '';

                    if (q.KaziDurumID == KaziDurum.BitenKazi)
                        btn22 = `<input type="checkbox" class="chbUyBelhf" data-id="${q.ProjeRef}" />`;

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td>${btn22}</td>
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td>${zxc.tarihParse(q.OnayTarihi)}</td>
                    <td>${zxc.tarihParse(q.OnayBitisTarihi)}</td>
                     <td>${q.AraziInceleme}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" data-no="${q.ProjeNumarasi}" data-tip="1" onclick="fncAraziKontrolOpn(this, true)"><span class="bx bxs-download"></span><span>Arazi Kontrol Bilgi Gör</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata16').html(html);
            }

            if (data.UygunlukBelgesiDuzenlenenProjeler != null) {
                html = '';
                data.UygunlukBelgesiDuzenlenenProjeler.forEach(q => {

                    var imzaGorBtn = '';
                    if (q.IzmPath != "") {
                        imzaGorBtn = '<a data-path="' + q.IzmPath + '" onclick="fncImzaBilgisiGor(this)" class="btn btn-sm btnimzgor"><span class="bx bx-pen"></span><span>İmza Bilgisini Gör</span></a>';
                    }

                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td>${zxc.tarihParse(q.OnayTarihi)}</td>
                    <td>${zxc.tarihParse(q.OnayBitisTarihi)}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" data-no="${q.ProjeNumarasi}" data-tip="1" onclick="fncAraziKontrolOpn(this,true)"><span class="bx bxs-download"></span><span>Arazi Kontrol Bilgi Gör</span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" data-mod="1" onclick="fncUygunlukBelgeGorOpn(this)"><span class="bx bxs-download"></span><span>Uygunluk Belgesi Gör</span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncUygunlukBelgeImzalaOpn(this)"><span class="bx bxs-download"></span><span>İmzala</span></a>
                                ${imzaGorBtn}
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata17').html(html);
            }

            if (data.UygunlukBelgesiImzala != null) {
                html = '';
                data.UygunlukBelgesiImzala.forEach(q => {
                    html = html.concat(`<tr data-id="${q.ProjeRef}" class="${q.DurumID == 99 ? 'iptprj' : ''}">
                    <td class="prjnoo" data-no="${q.ProjeNumarasi}">${q.ProjeNumarasi}</td>
                    <td>${q.YatirimciKurum}</td>
                    <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                    <td>${zxc.tarihParse(q.OnayTarihi)}</td>
                    <td>${zxc.tarihParse(q.OnayBitisTarihi)}</td>
                    <td class="wdt-kucuk tbl-respd text-end oppop">
                            <i class="bx bx-dots-vertical-rounded btn btn-sm"></i>
                            <div class="tbl-resp">
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" data-mod="2" onclick="fncUygunlukBelgeGorOpn(this)"><span class="bx bxs-download"></span><span>Uygunluk Belgesi Gör</span></a>
                                <a class="btn btn-sm" data-id="${q.ProjeRef}" onclick="fncUygunlukBelgeImzalaOpn(this)"><span class="bx bxs-download"></span><span>İmzala</span></a>
                            </div>
                        </td>
                    </tr>`);
                });
                zxc('#tdata18').html(html);
            }


            zxc('.btnPrjOlrVer').click(fncOlrVerOpn);
            zxc('.btnPrjRedVer').click(fncOlrRedOpn);

            zxc('.btnRowDagitim').click(fncOpnmdlDagitim);
            zxc('.btnShwOlur').click(fncOpnmdlOlur);
            zxc('.btnShwRuhsat').click(fncOpnmdlRuhsat);
            zxc('.btnShwMarem').click(fncGetbtnMarem);

            zxc('.btnImgAdd').click(fncPrjAddImg);
            zxc('.btnPrjIpt').click(fncPrjIpt);
            zxc('.btnPrjYen').click(fncPrjYen);
            zxc('.btnShwIrsal').click(fncIrsaliyeyGor);
            zxc('.btnPrjInfo').click(fncProrefInfoGet);

            zxc('.btnRwMakbuzAc').click(fncMakbuzAc);
            zxc('.btnRwRuhFormAc').click(fncFormAc2);

            zxc('.btnRowOnayRedVer').click(fncOnyRedOpn);
            zxc('.btnRhsGuncelle').click(fncRuhsatGuncelle);
            zxc('.btnImzalamaIslem1').click(fncProjeImzalmaIslem);
            zxc('.btnOnayImzalamaIslem1').click(fncOnayiImzalmaIslem);

            if (aktifSekme != null) {
                aktifSekme.click();
            }
        }
    }, function () {
        zxc('.tblload:0').attrSil('hidden');
    }, function () {
        zxc('.tblload:0').attr('hidden', 'hidden');
        zxc('#syfYuk').sakla();
    })
}

function fncKurumSecildiginde() {
    var w = this,
        q = w.value;
    if (q != "") {
        GetJson('/api/Api_Aykome/GetBirimList/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.BirimId}">${q.Birim}</option>`));
                document.getElementById('slcTalepSahibiBirimID').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcTalepSahibiBirimID').innerHTML = html;
        }, function () {
        })
    }
}

function fncOpnmdlDagitim() {
    var v = this, id = zxc(v).ustElement(2).attr('data-id');
    GetJson('/api/Api_Aykome/GetProjeDagitimBilgi/' + id, function (data) {
        if (data.veri != null) {
            html = '';
            data.veri.forEach(q => {
                html = html.concat(`<tr>
                    <td>${q.DagitilanBirim}</td>
                    <td>${q.AlanAciklama}</td>
                    <td>${zxc.tarihParse(q.GonderilenTarih)}</td>
                    <td>${zxc.tarihParse(q.OlurTarih)}</td>
                    </tr>`);
            });
            zxc('#tdataDagtm').html(html);
        }
        fncModalAc("#mdlDagitim");
    }, function () {
        zxc(v).sonElement().html('Yükleniyor...')
    }, function () {
        zxc(v).sonElement().html("Dağıtım Bilgi Gör");
    });
}

function fncOpnmdlOlur() {
    var v = this, id = zxc(v).ustElement(2).attr('data-id');
    GetJson('/api/Api_Aykome/GetProjeOlurBilgi/' + id + "/" + 2, function (data) {
        if (data.veri != null) {
            html = '';
            data.veri.forEach(q => {
                html = html.concat(`<tr>
                    <td>${q.OlurVerilis}</td>
                    <td>${q.OlurDurum}</td>
                    <td>${q.KurumAd}</td>
                    <td>${q.BirimAd}</td>
                    <td>${q.Not}</td>
                    <td>${zxc.tarihParse(q.OlurTarih)}</td>
                    </tr>`);
            });
            zxc('#tdataOlur').html(html);
        }
        fncModalAc("#mdlOlur");
    }, function () {
        zxc(v).sonElement().html('Yükleniyor...')
    }, function () {
        zxc(v).sonElement().html("Olur Bilgi Gör");
    });
}

var RuhsatHesDetsLst;
function fncOpnmdlRuhsat() {
    var v = this,
        id = zxc(v).ustElement(2).attr('data-id');
    GetJson('/api/Api_Aykome/GetProjeRuhsatBilgi/' + id, function (data) {
        if (data.veri != null) {
            pdfCurUrl = baseResimUrl + data.veri;
            loadPDF(pdfCurUrl, 'canvas2');
            fncModalAc("#mdlRuhsat2");
            return;
            fncRuhsatPdfOlustur(z).then(q => {
                pdfMake.createPdf(pdfData).getDataUrl(function (dataURL) {
                    renderPDF(dataURL, document.getElementById("canvas"));
                });
                fncModalAc("#mdlRuhsat");
            }).catch(er => {
            });

            //var adrsAry = [];
            //adrsAry.push([{ text: 'İlçe', bold: true, fontSize: 9 },
            //{ text: 'Belediye', bold: true, fontSize: 9 },
            //{ text: 'Mahalle', bold: true, fontSize: 9 },
            //{ text: 'Cadde Sokak', bold: true, fontSize: 9 },
            //{ text: 'O.Baş. Tarihi', bold: true, fontSize: 9 },
            //{ text: 'O.Bit. Tarihi', bold: true, fontSize: 9 }]);

            //z.RuhsatAdresss.forEach(q => {
            //    adrsAry.push([
            //        { text: q.Ilce, fontSize: 9 },
            //        { text: q.Belediye, fontSize: 9 },
            //        { text: q.Mahalle, fontSize: 9 },
            //        { text: q.CaddeSokak, fontSize: 9 },
            //        { text: zxc.tarihParse(q.OBaslangicTarihi), fontSize: 9 },
            //        { text: zxc.tarihParse(q.OBitisTarihi), fontSize: 9 }
            //    ])
            //});

            //RuhsatHesDetsLst = z.RuhsatHesDets;

            //var aryRhsatDet = [];
            //if (RuhsatHesDetsLst != null) {
            //    var Ruhsatgroup = RuhsatHesDetsLst.groupBy("GydirmeAdi");
            //    var KaplamaAdet = Ruhsatgroup.length;

            //    var scr = (100 - 40) / (KaplamaAdet * 3);

            //    var rhstDetWdt = ['40%'];
            //    var ary1 = [], ary2 = [], ary3 = [];
            //    for (var i = 0; i < Ruhsatgroup.length; i++) {
            //        rhstDetWdt.push(scr + '%');
            //        rhstDetWdt.push(scr + '%');
            //        rhstDetWdt.push(scr + '%');

            //        var rhstGrpItem = Ruhsatgroup[i];
            //        if (i == 0) {
            //            ary1.push({ text: " ", fontSize: 7 });
            //            ary2.push({ text: " ", fontSize: 7 });
            //        }
            //        ary1.push({
            //            text: rhstGrpItem[0].GydirmeAdi,
            //            colSpan: 3, fontSize: 7,
            //            alignment: 'center',
            //        }, { text: "", fontSize: 7 }, { text: "", fontSize: 9 });

            //        ary2.push(
            //            { text: "En", fontSize: 7 },
            //            { text: "Boy", fontSize: 7 },
            //            { text: "m2", fontSize: 7 });
            //    }
            //    var cdGrp = RuhsatHesDetsLst.groupBy("Kazi3Id");

            //    for (var h = 0; h < cdGrp.length; h++) {
            //        var Ruhsatgroup = RuhsatHesDetsLst.groupBy("GydirmeAdi");

            //        var ret2 = [];
            //        ret2.push({ text: cdGrp[h][0].Cadde, fontSize: 7 });

            //        for (var i = 0; i < Ruhsatgroup.length; i++) {

            //            //  if (Ruhsatgroup[i][0].Cadde == cdGrp[h][0].Cadde) {
            //            var blundu = false;
            //            for (var g = 0; g < cdGrp[h].length; g++) {
            //                if (Ruhsatgroup[i][0].GydirmeAdi == cdGrp[h][g].GydirmeAdi) {
            //                    blundu = true;
            //                    ret2.push({ text: cdGrp[h][g].En, fontSize: 7 },
            //                        { text: cdGrp[h][g].Boy, fontSize: 7 },
            //                        { text: cdGrp[h][g].EnBoyCarpimi, fontSize: 7 });
            //                }
            //            }
            //            if (blundu == false)
            //                ret2.push({ text: "-", fontSize: 7 },
            //                    { text: "-", fontSize: 7 },
            //                    { text: "-", fontSize: 7 });
            //            //}
            //            //else {

            //            //}
            //        }
            //        ary3.push(ret2);

            //        //var ret = [
            //        //    { text: cdGrp[h][0].Cadde, fontSize: 7 },
            //        //    { text: "-", fontSize: 7 },
            //        //    { text: "-", fontSize: 7 },
            //        //    { text: "-", fontSize: 7 },

            //        //    { text: "-", fontSize: 7 },
            //        //    { text: "-", fontSize: 7 },
            //        //    { text: "-", fontSize: 7 },

            //        //    { text: "-", fontSize: 7 },
            //        //    { text: "-", fontSize: 7 },
            //        //    { text: "-", fontSize: 7 },

            //        //    { text: "-", fontSize: 7 },
            //        //    { text: "-", fontSize: 7 },
            //        //    { text: "-", fontSize: 7 }
            //        //];

            //        //ary3.push(ret);
            //    }
            //    aryRhsatDet.push(ary1);
            //    aryRhsatDet.push(ary2);
            //    for (var i = 0; i < ary3.length; i++) {
            //        aryRhsatDet.push(ary3[i]);
            //    }
            //}

            //pdfData = {

            //    watermark: { text: 'Konya Büyükşehir Belediyesi', color: '#c08e2c', opacity: 0.1, italics: false },
            //    header: function (currentPage, pageCount, pageSize) {
            //        return
            //        //currentPage.toString() + ' of ' + pageCount;
            //        [
            //            { text: 'simple text', alignment: (currentPage % 2) ? 'left' : 'right' },
            //            { canvas: [{ type: 'rect', x: 170, y: 32, w: pageSize.width - 170, h: 40 }] }
            //        ]
            //    },
            //    footer: function (currentPage, pageCount) {
            //        return {
            //            table: {
            //                widths: ['*', 100],
            //                body: [
            //                    [
            //                        { text: '', alignment: 'left', fontSize: 7, margin: [10, 0, 0, 0] },
            //                        { text: 'Page ' + currentPage.toString() + '/' + pageCount, alignment: 'right', fontSize: 7, margin: [0, 0, 10, 0] }
            //                    ]
            //                ]
            //            }
            //            /*  , layout: 'noBorders'*/
            //        };
            //    },
            //    content:
            //        [
            //            {
            //                image: 'data:image/png;base64,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',
            //                width: 100,
            //                alignment: 'center'
            //            },
            //            {
            //                table: {
            //                    widths: ['100%'],
            //                    body: [
            //                        [
            //                            {
            //                                text: 'Konya Büyükşehir Belediyesi Kazı Ruhsatı',
            //                                style: 'header1',
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            }
            //                        ]
            //                    ],
            //                }
            //            },
            //            { text: 'Proje Bilgileri', style: 'header2' },
            //            {
            //                table: {
            //                    widths: ['30%', '70%'],
            //                    body: [
            //                        [
            //                            {
            //                                text: 'Proje Numarası:',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [true, true, false, false]
            //                            },
            //                            {
            //                                text: z.ProjeNumarasi,
            //                                fontSize: 10,
            //                                border: [false, true, true, false]
            //                            }
            //                        ],
            //                        [
            //                            {
            //                                text: 'Talep Sahibi Kurum:',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [true, false, false, false]
            //                            },
            //                            {
            //                                text: z.TalepSahibiKurum,
            //                                fontSize: 10,
            //                                border: [false, false, true, false]
            //                            }
            //                        ],
            //                        [
            //                            {
            //                                text: 'Talep Sahibi Birim:',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [true, false, false, false]
            //                            },
            //                            {
            //                                text: z.TalepSahibiBirim,
            //                                fontSize: 10,
            //                                border: [false, false, true, false]
            //                            }
            //                        ],
            //                        [
            //                            {
            //                                text: 'Talep Sahibi:',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [true, false, false, true]
            //                            },
            //                            {
            //                                text: z.TalepSahibi,
            //                                fontSize: 10,
            //                                border: [false, false, true, true]
            //                            }
            //                        ]
            //                    ]
            //                },
            //                margin: [0, 0, 0, 15]
            //            },
            //            {
            //                layout: {
            //                    fillColor: function (rowIndex, node, columnIndex) {
            //                        return (rowIndex === 0) ? '#c2dec2' : null;
            //                    }
            //                },
            //                /*  layout: 'noBorders',*/
            //                table: {
            //                    headerRows: 1,
            //                    widths: ['15%', '15%', '15%', '25%', '15%', '15%'],
            //                    body: adrsAry,
            //                    fontSize: 6
            //                },
            //                margin: [0, 0, 0, 10],
            //            },
            //            {
            //                table: {
            //                    headerRows: 1,
            //                    widths: rhstDetWdt,
            //                    body: aryRhsatDet,
            //                },
            //                margin: [0, 0, 0, 10],
            //            },
            //            {
            //                table: {
            //                    widths: ['40%', '10%', '40%', '10%'],
            //                    body: [
            //                        [
            //                            {
            //                                text: 'Ruhsat Bedeli',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [true, true, false, false]
            //                            },
            //                            {
            //                                text: z.RuhsatBedeli,
            //                                fontSize: 10,
            //                                border: [false, true, false, false]
            //                            },
            //                            {
            //                                text: 'Kaplama Bedel Toplam',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [false, true, false, false]
            //                            },
            //                            {
            //                                text: z.KaplamaBedelToplam,
            //                                fontSize: 10,
            //                                border: [false, true, true, false]
            //                            }
            //                        ],
            //                        [
            //                            {
            //                                text: 'Yol Yıpranma Bedeli',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [true, false, false, false]
            //                            },
            //                            {
            //                                text: z.YolYipranmaBedeli,
            //                                fontSize: 10,
            //                                border: [false, false, false, false]
            //                            },
            //                            {
            //                                text: 'Alt Yapı Kazı İzin Harcı',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [false, false, false, false]
            //                            },
            //                            {
            //                                text: z.AltYapiKaziIzinHArci,
            //                                fontSize: 10,
            //                                border: [false, false, true, false]
            //                            }
            //                        ],
            //                        [
            //                            {
            //                                text: 'Genel Toplam',
            //                                bold: true,
            //                                fontSize: 10,
            //                                border: [true, false, false, true]
            //                            },
            //                            {
            //                                text: z.GenelToplam,
            //                                colSpan: 3,
            //                                fontSize: 10,
            //                                border: [false, false, true, true]
            //                            }
            //                        ]
            //                    ]
            //                },
            //                margin: [0, 0, 0, 15]
            //            },
            //            { text: 'Yukarıdaki tranşenin açılmasında Belediyemizce sakınca görülmemiştir.', style: 'header3' },
            //            { text: 'Büyükşehir Altyapı Koordinasyon Kurulunca gerekli işlemlerin yapılmasını rica ederim.', style: 'header4' },
            //            {
            //                table: {
            //                    widths: ['*', '*', '*'],
            //                    body: [
            //                        [
            //                            {
            //                                fontSize: 10,
            //                                text: 'Altyapı Koord. Şb. Md.',
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            },
            //                            {
            //                                fontSize: 10,
            //                                text: 'Fen İşleri Daire Başkanı',
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            },
            //                            {
            //                                fontSize: 10,
            //                                text: 'Konya Büyükşehir Belediye Başkanın\'a',
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            }
            //                        ],
            //                        [
            //                            {
            //                                fontSize: 10,
            //                                text: z.ImzaAdSoyad1,
            //                                bold: true,
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            },
            //                            {
            //                                fontSize: 10,
            //                                text: z.ImzaAdSoyad2,
            //                                alignment: 'center',
            //                                bold: true,
            //                                border: [false, false, false, false]
            //                            },
            //                            {
            //                                fontSize: 10,
            //                                text: z.ImzaAdSoyad3,
            //                                bold: true,
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            }
            //                        ],
            //                        [
            //                            {
            //                                fontSize: 10,
            //                                text: z.ImzaUnvan1,
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            },
            //                            {
            //                                fontSize: 10,
            //                                text: z.ImzaUnvan2,
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            },
            //                            {
            //                                fontSize: 10,
            //                                text: z.ImzaUnvan3,
            //                                alignment: 'center',
            //                                border: [false, false, false, false]
            //                            }
            //                        ]
            //                    ]
            //                }
            //            },
            //            { text: 'Bu döküman üzerindeki bilgiler elektronik olarak imzalanmıştır', style: 'header4' }
            //            //,{ qr: 'https://beefatura.net/', fit: '75', alignment: 'center', margin: [0, 10] }
            //        ]
            //    , styles: {
            //        header1: {
            //            alignment: 'center',
            //            fontSize: 16,
            //            bold: true,
            //            margin: [0, 0, 0, 5],
            //            border: [true, true, true, true]
            //        },
            //        header2: {
            //            color: '#012970',
            //            fontSize: 10,
            //            margin: [0, 0, 0, 10]
            //        }
            //        ,
            //        header3: {
            //            color: '#012970',
            //            fontSize: 9,
            //            bold: true,
            //            alignment: 'center',
            //            margin: [0, 0, 0, 10]
            //        },
            //        header4: {
            //            width: '25%',
            //            fontSize: 9,
            //            alignment: 'left',
            //            margin: [0, 0, 0, 10]
            //        }
            //    }
            //}

        }
    }, function () {
        pdfData = null;
        zxc(v).sonElement().html('Yükleniyor...')
        document.getElementById("canvas").innerHTML = "";
    }, function () {
        zxc(v).sonElement().html("Ruhsat Gör");
    });
}

async function loadPDF2(pdfUrl, canvasANme) {
    const uniqueUrl = pdfUrl + "?v=" + new Date().getTime();
    const loadingTask = pdfjsLib.getDocument(uniqueUrl);
    const pdf = await loadingTask.promise;

    // İlk sayfayı yükle
    const page = await pdf.getPage(1);

    // Canvas elementini alın ve bağlamını hazırlayın
    const canvas = document.getElementById(canvasANme);
    const context = canvas.getContext('2d');

    // Sayfa boyutunu ve çözünürlüğünü ayarlayın
    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // PDF sayfasını canvas'a çizin
    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    await page.render(renderContext).promise;
}

async function loadPDFEs(pdfUrl, canvasANme) {

    const uniqueUrl = pdfUrl + "?v=" + new Date().getTime();
    const loadingTask = pdfjsLib.getDocument({
        url: uniqueUrl,
        withCredentials: true
    });

    try {
        const pdf = await loadingTask.promise;

        // İlk sayfayı yükleyin
        const page = await pdf.getPage(1);

        // Canvas elementini alın ve bağlamını hazırlayın
        const canvas = document.getElementById(canvasANme);
        const context = canvas.getContext('2d');

        // Sayfa boyutunu ve çözünürlüğünü ayarlayın
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        // PDF sayfasını canvas'a çizin
        const renderContext = {
            canvasContext: context,
            viewport: viewport
        };
        await page.render(renderContext).promise;

    } catch (error) {
        console.error("PDF yüklenirken bir hata oluştu:", error);
    }
}

let currentPage = 1;
let pdfDocument = null;
async function loadPDF(pdfUrl, canvasId) {
    const uniqueUrl = pdfUrl + "?v=" + new Date().getTime();
    const loadingTask = pdfjsLib.getDocument({
        url: uniqueUrl,
        withCredentials: true
    });
    try {
        pdfDocument = await loadingTask.promise;
        renderPage(currentPage, canvasId);
    } catch (error) {
        console.error("PDF yüklenirken bir hata oluştu:", error);
    }
}

async function renderPage(pageNum, canvasId) {
    if (!pdfDocument) return; // PDF belgesi yüklenmemişse çık

    const page = await pdfDocument.getPage(pageNum); // İlgili sayfayı al
    const canvas = document.getElementById(canvasId);
    const context = canvas.getContext('2d');

    const viewport = page.getViewport({ scale: 1.5 });
    canvas.width = viewport.width;
    canvas.height = viewport.height;

    // PDF sayfasını canvas'a çizin
    const renderContext = {
        canvasContext: context,
        viewport: viewport
    };
    await page.render(renderContext).promise; // Sayfayı renderla
}

function nextPage(canvasId) {
    if (pdfDocument && currentPage < pdfDocument.numPages) {
        currentPage++;
        renderPage(currentPage, canvasId);
    }
}

function prevPage(canvasId) {
    if (pdfDocument && currentPage > 1) {
        currentPage--;
        renderPage(currentPage, canvasId);
    }
}


var pdfCurUrl;
function fncdownloadPDF() {
    const newWindow = window.open(pdfCurUrl, '_blank');
    if (!newWindow)
        alert("Pop-up engelleyici yeni pencere açılmasını engelliyor. Lütfen pop-up engelleyiciyi devre dışı bırakın.");

    //const link = document.createElement('a');
    //link.href = pdfCurUrl;
    //link.download = pdfCurUrl.split('/').pop(); // Dosya adını URL'den çekin
    //link.click();
}

// PDF Yazdırma Fonksiyonu
function fncprintPDF() {
    const newWindow = window.open(pdfCurUrl, '_blank');
    if (!newWindow) {
        alert("Pop-up engelleyici yeni pencere açılmasını engelliyor. Lütfen pop-up engelleyiciyi devre dışı bırakın.");
    } else {
        newWindow.onload = function () {
            newWindow.focus();
            newWindow.print();
        };
    }
}
function fncRuhsatPdfOlustur(z, resolve) {
    return new Promise((resolve, reject) => {

        var adrsAry = [];

        adrsAry.push([{ text: 'İlçe', bold: true, fontSize: 9 },
        { text: 'Belediye', bold: true, fontSize: 9 },
        { text: 'Mahalle', bold: true, fontSize: 9 },
        { text: 'Cadde Sokak', bold: true, fontSize: 9 },
        { text: 'O.Baş. Tarihi', bold: true, fontSize: 9 },
        { text: 'O.Bit. Tarihi', bold: true, fontSize: 9 }]);

        z.RuhsatAdresss.forEach(q => {
            adrsAry.push([
                { text: q.Ilce, fontSize: 9 },
                { text: q.Belediye, fontSize: 9 },
                { text: q.Mahalle, fontSize: 9 },
                { text: q.CaddeSokak, fontSize: 9 },
                { text: zxc.tarihParse(q.OBaslangicTarihi), fontSize: 9 },
                { text: zxc.tarihParse(q.OBitisTarihi), fontSize: 9 }
            ])
        });

        RuhsatHesDetsLst = z.RuhsatHesDets;

        var aryRhsatDet = [];
        if (RuhsatHesDetsLst != null) {
            var Ruhsatgroup = RuhsatHesDetsLst.groupBy("GydirmeAdi");
            var KaplamaAdet = Ruhsatgroup.length;

            var scr = (100 - 40) / (KaplamaAdet * 3);

            var rhstDetWdt = ['40%'];
            var ary1 = [], ary2 = [], ary3 = [];
            for (var i = 0; i < Ruhsatgroup.length; i++) {
                rhstDetWdt.push(scr + '%');
                rhstDetWdt.push(scr + '%');
                rhstDetWdt.push(scr + '%');

                var rhstGrpItem = Ruhsatgroup[i];
                if (i == 0) {
                    ary1.push({ text: " ", fontSize: 7 });
                    ary2.push({ text: " ", fontSize: 7 });
                }
                ary1.push({
                    text: rhstGrpItem[0].GydirmeAdi,
                    colSpan: 3, fontSize: 7,
                    alignment: 'center',
                }, { text: "", fontSize: 7 }, { text: "", fontSize: 9 });

                ary2.push(
                    { text: "En", fontSize: 7 },
                    { text: "Boy", fontSize: 7 },
                    { text: "m2", fontSize: 7 });
            }
            var cdGrp = RuhsatHesDetsLst.groupBy("Kazi3Id");

            for (var h = 0; h < cdGrp.length; h++) {
                var Ruhsatgroup = RuhsatHesDetsLst.groupBy("GydirmeAdi");

                var ret2 = [];
                ret2.push({ text: cdGrp[h][0].Cadde, fontSize: 7 });

                for (var i = 0; i < Ruhsatgroup.length; i++) {

                    //  if (Ruhsatgroup[i][0].Cadde == cdGrp[h][0].Cadde) {
                    var blundu = false;
                    for (var g = 0; g < cdGrp[h].length; g++) {
                        if (Ruhsatgroup[i][0].GydirmeAdi == cdGrp[h][g].GydirmeAdi) {
                            blundu = true;
                            ret2.push({ text: cdGrp[h][g].En, fontSize: 7 },
                                { text: cdGrp[h][g].Boy, fontSize: 7 },
                                { text: cdGrp[h][g].EnBoyCarpimi, fontSize: 7 });
                        }
                    }
                    if (blundu == false)
                        ret2.push({ text: "-", fontSize: 7 },
                            { text: "-", fontSize: 7 },
                            { text: "-", fontSize: 7 });


                }
                ary3.push(ret2);
            }
            aryRhsatDet.push(ary1);
            aryRhsatDet.push(ary2);
            for (var i = 0; i < ary3.length; i++) {
                aryRhsatDet.push(ary3[i]);
            }
        }

        pdfData = {
            watermark: { text: 'Konya Büyükşehir Belediyesi', color: '#c08e2c', opacity: 0.1, italics: false },
            header: function (currentPage, pageCount, pageSize) {
                return
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
                                        text: z.ProjeNumarasi,
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
                                        text: z.TalepSahibiKurum,
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
                                        text: z.TalepSahibiBirim,
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
                                        text: z.TalepSahibi,
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
                            widths: ['15%', '15%', '15%', '25%', '15%', '15%'],
                            body: adrsAry,
                            fontSize: 6
                        },
                        margin: [0, 0, 0, 10],
                    },
                    {
                        table: {
                            headerRows: 1,
                            widths: rhstDetWdt,
                            body: aryRhsatDet,
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
                                        text: z.RuhsatBedeli,
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
                                        text: z.KaplamaBedelToplam,
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
                                        text: z.YolYipranmaBedeli,
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
                                        text: z.AltYapiKaziIzinHArci,
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
                                        text: z.GenelToplam,
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
                                        text: z.ImzaAdSoyad1,
                                        bold: true,
                                        alignment: 'center',
                                        border: [false, false, false, false]
                                    },
                                    {
                                        fontSize: 10,
                                        text: z.ImzaAdSoyad2,
                                        alignment: 'center',
                                        bold: true,
                                        border: [false, false, false, false]
                                    },
                                    {
                                        fontSize: 10,
                                        text: z.ImzaAdSoyad3,
                                        bold: true,
                                        alignment: 'center',
                                        border: [false, false, false, false]
                                    }
                                ],
                                [
                                    {
                                        fontSize: 10,
                                        text: z.ImzaUnvan1,
                                        alignment: 'center',
                                        border: [false, false, false, false]
                                    },
                                    {
                                        fontSize: 10,
                                        text: z.ImzaUnvan2,
                                        alignment: 'center',
                                        border: [false, false, false, false]
                                    },
                                    {
                                        fontSize: 10,
                                        text: z.ImzaUnvan3,
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
            }
        }

        //fncModalGizle();
        //if (pdfData) {
        //    document.getElementById("canvas").innerHTML = "";
        //    pdfMake.createPdf(pdfData).getDataUrl(function (dataURL) {
        //        renderPDF(dataURL, document.getElementById("canvas"));
        //    });
        //    fncModalAc("#mdlRuhsat");

        //}
        resolve();

    })
}

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

function fncGetbtnMarem() {
    var v = this, id = zxc(v).ustElement(2).attr('data-id');

    slcProjeID = id;
    GetJson('/api/Api_Aykome/GetProjeMaremBilgi/' + id, function (data) {
        var html = '';
        if (data.veri != null) {
            data.veri.forEach(q => {
                html = html.concat(` <div class="msrb">
                    <div class="bx bxs-traffic-cone" data-bs-toggle="tooltip" data-bs-html="true" data-bs-title="<div class='dvtol'><div class='dvtolit'>
                    <div class='dvtolit1'>İlçe:</div>
                    <div class='dvtolit2'>${q.IlceAdi}</div>
                </div><div class='dvtolit'>
                    <div class='dvtolit1'>Cadde / Sokak:</div>
                    <div class='dvtolit2'>${q.Cisim}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Yol Aidiyet:</div>
                    <div class='dvtolit2'>${q.AykYolAidiyet.aciklama}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Uzunluk:</div>
                    <div class='dvtolit2'>${q.Uzunluk}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>En:</div>
                    <div class='dvtolit2'>${q.En}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Derinlik:</div>
                    <div class='dvtolit2'>${q.Derinlik}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Alan:</div>
                    <div class='dvtolit2'>${q.Alan}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Hacim:</div>
                    <div class='dvtolit2'>${q.Hacim}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Pln. Baş. Tar.:</div>
                    <div class='dvtolit2'>${q.PbAstar}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Pln. Bi. Tar.:</div>
                    <div class='dvtolit2'>${q.Pbittar}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Mahalle:</div>
                    <div class='dvtolit2'>${q.Misim}</div>
                </div>
                <div class='dvtolit'>
                    <div class='dvtolit1'>Cadde Ref:</div>
                    <div class='dvtolit2'>${q.CaddeRef}</div>
                </div>
               </div>"></div>
                    <div class="dropdown">
                        <div class="lnd dropdown-toggle fs-mini" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            ${q.Cisim}
                        </div>
                        <ul class="dropdown-menu">
                            <li><button class="dropdown-item btnAmrmGst" data-id="${q.Kazi3Id}" type="button">Göster</button></li>
                          
                               ${q.TrafikPlanlamaRef == null ? '' : '<li><button class="dropdown-item btnAmrmRes" type="button" data-id="' + q.TrafikPlanlamaRef + '">Resim Göster</button></li>'}  
                        </ul>
                    </div>

                </div>`);
            })
        }
        zxc('#mrdv').html(html);
        zxc('.btnAmrmGst').click(fncPrjGostOpnMdl);
        zxc('.btnAmrmRes').click(fncPrjResimOpnMdl);
        const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
        const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    }, function () {
        zxc('#mrdv').html(' ');
        zxc(v).sonElement().html('Yükleniyor...')
    }, function () {
        zxc(v).sonElement().html("Cadde Sokak");
    });
}
function fncGetProjeAraOpn() {
    fncModalAc("#mdlPrjAra");
}

function fncGetProjeAra() {

    var qq = this, ww = zxc(qq).ilkElement().dom;
    PostJson('/api/Api_Aykome/GetProjeAra', {
        PageNumber: 1,
        ProjeNo: parseFloat(zxc('#txtProjeNo').value()) || null,
        TalepTarihiBaslangic: zxc('#txtTalepTarihiBaslangic').value().trim() || null,
        TalepTarihiBitis: zxc('#txtTalepTarihiBitis').value().trim() || null,
        IlceID: parseInt(zxc('#slcIlceID').selectboxSecilenIndex().value),
        BelediyeID: parseInt(zxc('#slcBelediyeID').selectboxSecilenIndex().value),
        OnayTarihiBaslangic: zxc('#txtOnayTarihiBaslangic').value().trim() || null,
        OnayTarihiBitis: zxc('#txtOnayTarihiBitis').value().trim() || null,
        MahalleID: parseInt(zxc('#slcMahalleID').selectboxSecilenIndex().value),
        CaddeSokakID: zxc('#slcCaddeSokakID').selectboxSecilenIndex().text,
        PlanlananTarihiBaslangic: zxc('#txtPlanlananTarihiBaslangic').value().trim() || null,
        PlanlananTarihiBitis: zxc('#txtPlanlananTarihiBitis').value().trim() || null,
        ProjeListesiAraDurumParams: zxc('.ffcfv').checkedListArray("data-id") || null,
        TalepSahibi: zxc('#txtTalepSahibi').value().trim() || null,
        TalepSahibiKurumID: parseInt(zxc('#slcTalepSahibiKurumID').selectboxSecilenIndex().value),
        TalepSahibiBirimID: parseInt(zxc('#slcTalepSahibiBirimID').selectboxSecilenIndex().value)
    }, function (data) {
        var html;

        if (data.veri != null) {
            html = '';
            data.veri.forEach(q => {
                html = html.concat(`<tr>
                                <td>${q.ProjeNo}</td>
                                <td>${zxc.tarihParse(q.OnayTarihi)}</td >
                                <td>${q.ProjeTip}</td>
                                <td>${q.Durum}</td>
                                <td>${q.ProjeTipi}</td>
                                <td>${zxc.tarihParse(q.TalepTarihi)}</td>
                                <td>${q.Amaci}</td>
                                <td>${q.IlgiliKisi}</td>
                                <td>${q.BasvuruSahibi}</td>
                                <td>${q.TalepEden ?? ""}</td>
                    </tr>`);
            });
            zxc('#tdataara1').html(html);
        }

        if (data.veri2 != null) {
            html = '';
            data.veri2.forEach(q => {
                html = html.concat(`<tr>
                <td>${q.ProjeNo}</td>
                <td>${q.KaziRef}</td>
                <td>${q.IlceRef}</td>
                <td>${q.IlceRef}</td>
                <td>${q.Mahalle ?? ""}</td>
                <td>${q.Cadde ?? ""}</td>
                <td>${q.En ?? ""}</td>
                <td>${q.Derinlik ?? ""}</td>
                <td>${q.Alan ?? ""}</td>
                <td>${q.Hacim ?? ""}</td>
                <td>${zxc.tarihParse(q.PbAstar)}</td>
                <td>${zxc.tarihParse(q.Pbittar)}</td>
                <td>${zxc.tarihParse(q.Obastar)}</td>
                <td>${zxc.tarihParse(q.Obittar)}</td>
                                    </tr>`);
            });
            zxc('#tdataara2').html(html);
        }

        if (data.veri3 != null) {
            html = '';
            data.veri3.forEach(q => {
                html = html.concat(`<tr>
                <td>${q.KaziRef}</td>
                <td>${q.AykGiydirme.Tanim}</td>
                <td>${q.Miktar}</td>
                    </tr>`);
            });
            zxc('#tdataara3').html(html);
        }
    }, function () {
        zxc('#tdataara1,#tdataara2,#tdataara3').html(" ");
        zxc(qq).attr('disabled', 'disabled');
        zxc(ww).attr('class', 'bx bx-loader')
    }, function () {
        zxc(qq).attrSil('disabled');
        zxc(ww).attr('class', 'bx bx-search')
    })
}

function fncFilClear() {
    var w = zxc(this).ustElement(1).dom;
    w.querySelectorAll('.form-control').forEach((q) => q.value = "");
    w.querySelectorAll('.form-select').forEach((q) => q.options[0].selected = true);
    document.getElementById('txtTalepTarihiBaslangic').value = "";
    document.getElementById('txtTalepTarihiBitis').value = "";
    document.getElementById('txtOnayTarihiBaslangic').value = "";
    document.getElementById('txtOnayTarihiBitis').value = "";
    document.getElementById('txtPlanlananTarihiBaslangic').value = "";
    document.getElementById('txtPlanlananTarihiBitis').value = "";
    zxc('.ffcfv').checked(false)
    zxc('#slcIlceID,#slcBelediyeID,#slcMahalleID,#slcCaddeSokakID,#slcTalepSahibiKurumID,#slcTalepSahibiBirimID').selectbox("")
}

function fncIlceSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/AbsApi/GetMahalle/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.MAHALLEREF}">${q.TANIM}</option>`));
                document.getElementById('slcMahalleID').innerHTML = html;
                document.getElementById('slcMahalleID').onchange = fncMahalleSecildiginde;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcMahalleID').innerHTML = html;
            document.getElementById('slcCaddeSokakID').innerHTML = html;
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
                document.getElementById('slcCaddeSokakID').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcCaddeSokakID').innerHTML = html;
        }, function () {
        })
    }
}
function fncPrjGostOpnMdl() {
    var qq = this,
        id = this.getAttribute('data-id');
    if (id != "")
        GetJson('/api/Api_Aykome/GetProjeGostGorBilgi/' + id, function (data) {
            if (data.veri != null) {
                var q = data.veri;

                //var date = new Date(q.ProjeTalepTarihi);
                //  document.getElementById("txtProjeTalepTarihi").value = q.ProjeTalepTarihi;


                // document.getElementById("txtProjeTalepTarihi").value = q.ProjeTalepTarihi;

                zxc('#txtProjeTalepTarihi').value(q.ProjeTalepTarihi.slice(0, 10));
                zxc('#txtProjeYil').value(q.ProjeYil);
                zxc('#txtProjeTipi').value(q.ProjeTipi);
                zxc('#txtProjeNumarasi').value(q.ProjeNumarasi);
                zxc('#txtPlanlananBasTarihi').value(q.PlanlananBasTarihi.slice(0, 10));

                zxc('#txtProjeAmaci').value(q.ProjeAmaci);
                zxc('#txtPlanlananBitTarihi').value(q.PlanlananBitTarihi.slice(0, 10));

                zxc('#txtDilekceNo').value(q.DilekceNo);
                zxc('#txtVatandasBasvuruTarihi').value(q.VatandasBasvuruTarihi.slice(0, 10));

                zxc('#txtTalepSahibiKurum').value(q.TalepSahibiKurum);
                zxc('#txtTalepSahibiBirim').value(q.TalepSahibiBirim);
                zxc('#txtTalebiYapanKisi').value(q.TalebiYapanKisi);
                zxc('#txtBasvuruSahibi').value(q.BasvuruSahibi);

                zxc('#txtIlce').value(q.Ilce);
                zxc('#txtBelediye').value(q.Belediye);
                zxc('#txtMahalle').value(q.Mahalle);
                zxc('#txtCaddeSokak').value(q.CaddeSokak);
                zxc('#txtAidiyet').value(q.Aidiyet);
                zxc('#txtEn').value(q.En);
                zxc('#txtBoy').value(q.Boy);
                zxc('#txtDerinlik').value(q.Derinlik);
                zxc('#txtAlan').value(q.Alan);
                zxc('#txtHacim').value(q.Hacim);
                zxc('#txtNNYolAidiyet').value(q.Aidiyet);
                var html = '';
                q.BozulacakSatihVeMiktar.forEach(qa => {
                    html = html.concat(`<tr>
                    <td>${qa}</td>
                    </tr>`);
                })
                zxc('#tdatagst').html(html);
            }
        }, function () {
            document.querySelectorAll('#mdlPrjGost .form-control').forEach((q) => q.value = "");
            zxc('#tdatagst').html(" ");
            fncModalAc("#mdlPrjGost");
            zxc(qq).html('Yükleniyor...')
        }, function () {
            zxc(qq).html('Göster')
        })
}

function fncPrjResimOpnMdl() {
    var qq = this,
        id = this.getAttribute('data-id');
    if (id != "")
        GetJson('/api/Api_Aykome/GetProjeResimBilgi/' + id, function (data) {
            if (data.veri != null) {
                var q = data.veri;
                zxc('#imgTrfResim').attr("src", baseResimUrl + q);
            }
        }, function () {
            zxc('#imgTrfResim').attr("src", "#");
            zxc('#tdatagst').html(" ");
            fncModalAc("#mdlPrjResim");
            zxc(qq).html('Yükleniyor...')
        }, function () {
            zxc(qq).html('Resim Göster')
        })
}

function fncTopluOnayla() {
    var qq = this,
        ww = zxc(qq).ilkElement().dom,
        param = [];

    if (zxc('#pnlYol-1').attr('class') == 'tab-pane fade active show') {
        param = zxc('.chbTopIsl1').checkedListArray('data-id');
    }
    else if (zxc('#pnlYol-2').attr('class') == 'tab-pane fade active show') {
        param = zxc('.chbTopIsl2').checkedListArray('data-id');
    }
    else if (zxc('#pnlYol-3').attr('class') == 'tab-pane fade active show') {
        param = zxc('.chbTopIsl3').checkedListArray('data-id');
    }
    else if (zxc('#pnlYol-4').attr('class') == 'tab-pane fade active show') {
        param = zxc('.chbTopIsl4').checkedListArray('data-id');
    }
    if (param.length == 0)
        MesajVer('Toplu Onaylama İşlemi İçin Bir Seçim Yapılmadı!', MesajDurumu.Warning)
    else {
        PostJson('/api/Api_Aykome/SetProjeTopluIslem', param, function (data) {
        }, function () {
            zxc(ww).attr('class', 'bx bx-loader')
        }, function () {
            zxc(ww).attr('class', 'bx bx-check')
        })
    }
}

function fncPrjAddImg() {

}

function fncPrjIpt() {

}
function fncPrjYen() {

}


function fncOlrVerOpn() {
    var v = this, id = zxc(v).ustElement(2).attr('data-id');

    slcProjeID = id;
    if (slcProjeID != null) {
        imzaConfig = {
            imzaDataString: `${slcProjeID} projesi için olur veriliyor.`,
            islem_tipi: "ProjeyeOlurVermek",
            refid: slcProjeID
        }
        imzaRefModal = "#mdlOlurVer";
        zxc('#btnCadesImzala').html(' ');
        fncModalAc("#mdlImza");
        //fncModalAc('#mdlOlurVer')
    }
}
function fncOlurVer(e) {
    PostJson('/api/Api_Aykome/SetOlurVermek', {
        ProjeRef: parseInt(slcProjeID),
        OnayTip: 1,
        Mesaj: zxc("#txtOlurMesaj").value()
    }, function (data) {
        zxc('#OlurVerilecekTap-tab').classSil("active");
        zxc('#OlurVerilecekTap').attr("class", "tab-pane fade");
        slcProjeID = null;
        fncModalGizle();
        fncIlkAcilis(false);
    }, function () {
        zxc(e).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader')
    }, function () {
        zxc(e).attrSil('disabled').ilkElement().attr('class', 'bx bx-check')
    })
}

function fncTopluOlurVer(param) {
    PostJson('/api/Api_Aykome/SetProjeTopluOlurVer', param, function (data) {
        fncIlkAcilis(false);
    })
}

function fncOlrRedOpn() {
    var v = this, id = zxc(v).ustElement(2).attr('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc("#txtReddetmek").value(" ");

        imzaConfig = {
            imzaDataString: `${slcProjeID} projesi için red veriliyor.`,
            islem_tipi: "ProjeyeRedVermek",
            refid: slcProjeID
        }
        imzaRefModal = "#mdlReddetmek";
        zxc('#btnCadesImzala').html(' ');
        fncModalAc("#mdlImza");

        // fncModalAc('#mdlReddetmek')
    }
}
function fncRedVer(e) {
    var Mesaj = zxc("#txtReddetmek").value().trim();
    if (Mesaj == "") {
        MesajVer("Reddetme mesajınızı giriniz!", MesajDurumu.Warning);
        return;
    }
    PostJson('/api/Api_Aykome/SetRedVermek', {
        ProjeRef: parseInt(slcProjeID),
        OnayTip: 1,
        Mesaj: Mesaj
    }, function (data) {
        slcProjeID = null;
        fncModalGizle();
        fncIlkAcilis(false);
    }, function () {
        zxc(e).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader')
    }, function () {
        zxc(e).attrSil('disabled').ilkElement().attr('class', 'bx bx-check')
    })
}

//xxx
function fncProrefInfoGet(projeRef, KaziRef) {
    var v = this, id = zxc(v).ustElement(2).attr('data-id');
    slcProjeID = id;
    GetJson('/api/Api_Harita/GetKaziIngo/' + slcProjeID, function (data) {

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
                <td>${k[i].UZUNLUK.toString().replace(".", ",")}</td>
                <td>${k[i].EN.toString().replace(".", ",")}</td>
                <td>${k[i].DERINLIK.toString().replace(".", ",")}</td>
                <td>${k[i].ALAN.toString().replace(".", ",")}</td>
                <td>${k[i].HACIM}</td>
                <td>${k[i].ilcad}</td>
                <td>${k[i].MISIM}</td>
                <td>${k[i].CISIM}</td>
                <td>${k[i].YolAidiyetAd}</td>
                <td><button class="btn btn-sm btntrfplnget" data-id="${k[i].TRAFIKPLANLAMAREF}"><i class='bx bx-image'></i></button></td>
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
            zxc('.btntrfplnget').click(fncprjInfPlanRes)
        }
        fncModalAc("#mdlKaziInfo");
    }, function () {

    })
}

function fncprjInfPlanRes() {
    var qq = this,
        id = this.getAttribute('data-id');
    if (id != "")
        GetJson('/api/Api_Aykome/GetProjeResimBilgi/' + id, function (data) {
            if (data.veri != null) {
                fncModalGizle();
                var q = data.veri;
                zxc('#imgTrfResim2').attr("src", baseResimUrl + q);
                fncModalAc('#mdlPrjResim2')
            }
        }, function () {
            zxc('#imgTrfResim2').attr("src", "#");

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

function fncKaziyiBaslatOpn(q) {
    slcProjeID = q.getAttribute('data-id');
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Kazıyı Başlatma İşleminiz gerçekleşsin mi?")
        zxc('#btnonayEvnt').attr('onclick', "fncKaziyiBaslat()")
        fncModalAc('#mdlOnay')
    }
}
function fncKaziyiBitirOpn(q) {
    var id = q.getAttribute('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Kazıyı Bitirme İşleminiz gerçekleşsin mi?")
        zxc('#btnonayEvnt').attr('onclick', "fncKaziyiBitir()")
        fncModalAc('#mdlOnay')
    }
}

function fncKaziyiBaslat() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetKaziBaslat/' + slcProjeID, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}

function fncKaziyiBitir() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetKaziBitir/' + slcProjeID, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}

function fncDosyaMdlOpn(q) {
    var id = q.getAttribute('data-id');
    document.getElementById('lstDosya').innerHTML = "";
    if (id != "")
        GetJson('/api/Api_Aykome/GetProjeFiles/' + id, function (data) {
            if (data.veri.length == 0) {
                MesajVer("Yüklenmiş Bir Dosya Bulunamadı!", MesajDurumu.Warning);
                return;
            }
            if (data.veri != null) {
                var htm = "";
                for (var i = 0; i < data.veri.length; i++)
                    htm += '<div class="idsf"><a target="_blank" href="' + baseResimUrl + data.veri[i] + '" download>' + data.veri[i].substr(data.veri[i].lastIndexOf("/") + 1) + '</a></div>';
                document.getElementById('lstDosya').innerHTML = htm;
                fncModalAc("#mdlPrjDosya");
            }
        })
}

function fncIncelemeNotGrMdlOpn(qq) {
    slcProjeID = qq.getAttribute('data-id');
    var tip = qq.getAttribute('data-tip');
    if (slcProjeID != null) {
        zxc('#txtIncNothtm').html(' ');
        GetJson('/api/Api_Aykome/GetIncelemeNotu/' + slcProjeID + '/' + tip, function (data) {

            if (data.veri != null) {
                html = '';
                data.veri.forEach(q => {
                    html = html.concat(`<tr>
                                <td>${q.KurumAdi}/${q.BirimAdi}</td>
                                <td>${q.IncelemeDurumu}</td>
                                <td>${q.IncelemeNotu ?? ""}</td>
                                </tr>`);
                });
                zxc('#txtIncNothtm').html(html);
            }
            fncModalAc('#mdlInceleme');
        })
    }
}

function fncDagitimIncelendiOpn(q) {
    slcProjeID = q.getAttribute('data-id');
    if (slcProjeID != null) {
        zxc('#txtIncNot').value(' ');

        imzaConfig = {
            imzaDataString: `${slcProjeID} projesi için inceleme notu ekleme imzası.`,
            islem_tipi: "IncelemeNotuEklemek",
            refid: slcProjeID
        }
        imzaRefModal = "#mdlIncelemeGst";
        zxc('#btnCadesImzala').html(' ');
        fncModalAc("#mdlImza");
        // fncModalAc('#mdlIncelemeGst')
    }
}
function fncDagitimIncelendi(q) {
    var param = zxc('#txtIncNot').value();
    if (slcProjeID != "" && param != "")
        PostJson('/api/Api_Aykome/SetDagitimIncelendi/' + slcProjeID, param, function (data) {
            zxc('#DagitimdanGelenTap-tab').classSil("active");
            zxc('#DagitimdanGelenTap').attr("class", "tab-pane fade");
            fncModalGizle();
            fncIlkAcilis(false);
        })
}

function fncOnyRedOpn() {
    var v = this, id = zxc(v).ustElement(2).attr('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        fncModalAc('#mdlOnyReddetmek')
    }
}
function fncOnyRedVer(e) {
    var Mesaj = zxc("#txtOnyReddetmek").value().trim();
    if (Mesaj == "") {
        MesajVer("Reddetme mesajınızı giriniz!", MesajDurumu.Warning);
        return;
    }
    PostJson('/api/Api_Aykome/SetOnayciRedVermek', {
        ProjeRef: parseInt(slcProjeID),
        OnayTip: 1,
        Mesaj: Mesaj
    }, function (data) {
        slcProjeID = null;
        fncModalGizle();
        fncIlkAcilis(false);
    }, function () {
        zxc(e).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader')
    }, function () {
        zxc(e).attrSil('disabled').ilkElement().attr('class', 'bx bx-check')
    })
}

function fncIrsaliyeyGor() {
    var v = this,
        id = zxc(v).ustElement(2).attr('data-id');
    GetJson('/api/Api_Aykome/GetProjeIrsaliyeBilgi/' + id, function (data) {
        if (data.veri != null) {
            pdfCurUrl = baseResimUrl + data.veri;
            loadPDF(pdfCurUrl, 'canvasirsaliye');
            fncModalAc("#mdlIrsaliye2");
        }
    }, function () {
        document.getElementById("canvasirsaliye").innerHTML = "";
    });
}


//#region Projeyi Iptal Etmek ve Tekrar Basvurmak
function fncProjeyiIptalEtOpn(q) {
    var id = q.getAttribute('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Proje İptal Edilsin mi?");
        zxc('#btnonayEvnt').attr('onclick', "fncProjeyiIptalEt()");
        /* fncModalAc('#mdlOnay')*/
        imzaConfig = {
            imzaDataString: `${slcProjeID} projesi iptal ediliyor.`,
            islem_tipi: "ProjeyiIptalEtmek",
            refid: slcProjeID
            //,fncCallback: function () { fncIlkAcilis(false); }
        }
        imzaRefModal = '#mdlOnay';
        fncModalAc("#mdlImza");
    }
}

function fncProjeyiIptalEt() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetProjeyiIptalEt/' + slcProjeID, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}

function fncProjeyeTekrarBasvurOpn(q) {
    var id = q.getAttribute('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Projeye Tekrar Başvurulsun mu?");
        zxc('#btnonayEvnt').attr('onclick', "fncProjeyeTekrarBasvur()");
        /* fncModalAc('#mdlOnay')*/
        imzaConfig = {
            imzaDataString: `${slcProjeID} projeye tekrar basvuruluyor`,
            islem_tipi: "ProjeyeTekrarBasvurmak",
            refid: slcProjeID
            //,fncCallback: function () { fncIlkAcilis(false); }
        }
        imzaRefModal = '#mdlOnay';
        fncModalAc("#mdlImza");
    }
}

function fncProjeyeTekrarBasvur() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetProjeyeTekrarBasvur/' + slcProjeID, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}


//#endregion

//#region Projeyi Pasif-Aktif Yapmak
function fncProjeyiPasifEtOpn(q) {
    var id = q.getAttribute('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Proje Pasif Edilsin mi?");
        zxc('#btnonayEvnt').attr('onclick', "fncProjeyiPasifEt()");
        /* fncModalAc('#mdlOnay')*/
        imzaConfig = {
            imzaDataString: `${slcProjeID} projesi pasif ediliyor.`,
            islem_tipi: "ProjeyiPasifEtmek",
            refid: slcProjeID
        }
        imzaRefModal = '#mdlOnay';
        fncModalAc("#mdlImza");
    }
}

function fncProjeyiPasifEt() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetProjeAktifPasif/' + slcProjeID + '/0', function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}

function fncProjeyiAktifEtOpn(q) {
    var id = q.getAttribute('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Proje Aktif Edilsin mi?");
        zxc('#btnonayEvnt').attr('onclick', "fncProjeyiAktifEtOpn()");
        /* fncModalAc('#mdlOnay')*/
        imzaConfig = {
            imzaDataString: `${slcProjeID} projesi aktif ediliyor.`,
            islem_tipi: "ProjeyiAktifEtmek",
            refid: slcProjeID
        }
        imzaRefModal = '#mdlOnay';
        fncModalAc("#mdlImza");
    }
}

function fncProjeyiAktifEt() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetProjeAktifPasif/' + slcProjeID + '/1', function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}


//#endregion

//#region Oluru Geri Cek
function fncProjeyiOlurIptaEtOpn(q) {
    var id = q.getAttribute('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Olurunuz Geri Çekilsin mi?");
        zxc('#btnonayEvnt').attr('onclick', "fncProjeyiOlurIptaEt()");
        /* fncModalAc('#mdlOnay')*/
        imzaConfig = {
            imzaDataString: `${slcProjeID} projenin oluru geri cekiliyor`,
            islem_tipi: "ProjeOlurunuGeriCekmek",
            refid: slcProjeID
        }
        imzaRefModal = '#mdlOnay';
        fncModalAc("#mdlImza");
    }
}
function fncProjeyiOlurIptaEt() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetProjOlurunuGeriCek/' + slcProjeID, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}


//#endregion    

//#region Reddi Geri Cek
function fncProjeyiReddiIptaEtOpn(q) {
    var id = q.getAttribute('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Proje Reddi Geri Çekilsin mi?");
        zxc('#btnonayEvnt').attr('onclick', "fncProjeyiReddiIptaEt()");
        /* fncModalAc('#mdlOnay')*/
        imzaConfig = {
            imzaDataString: `${slcProjeID} projenin reddi geri cekiliyor`,
            islem_tipi: "ProjeReddiGeriCekmek",
            refid: slcProjeID
        }
        imzaRefModal = '#mdlOnay';
        fncModalAc("#mdlImza");
    }
}
function fncProjeyiReddiIptaEt() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetProjReddiniGeriCek/' + slcProjeID, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}

//#endregion

//#region Onayi Geri Cek

function fncProjeyiOnayiCekOpn(q) {
    var id = q.getAttribute('data-id');
    slcProjeID = id;
    if (slcProjeID != null) {
        zxc('#lblOnayMesaj').html("Proje'nin Onayı Geri Çekilsin mi?");
        zxc('#btnonayEvnt').attr('onclick', "fncProjeyiOnayiCek()");
        /* fncModalAc('#mdlOnay')*/
        imzaConfig = {
            imzaDataString: `${slcProjeID} projenin onayi geri cekiliyor`,
            islem_tipi: "ProjeOnayiGeriCekmek",
            refid: slcProjeID
        }
        imzaRefModal = '#mdlOnay';
        fncModalAc("#mdlImza");
    }
}
function fncProjeyiOnayiCek() {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetProjininOnayiniCek/' + slcProjeID, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        })
}

//#endregion  

//#region Onay

function fncMakbuzAc() {
    var v = this, id = zxc(v).ustElement(2).attr('data-id');
    slcProjeID = id;
    if (slcProjeID != null)
        GetJson('/api/Api_Aykome/GetMakbuzBilgi/' + slcProjeID, function (data) {
            if (data.MakbuzItems != null) {
                html = '';

                data.MakbuzItems.forEach(q => {
                    //if (q.OnaylananBaslagic == null) {
                    //    var bugun = new Date();
                    //    var onGunSonra = new Date(bugun);
                    //    onGunSonra.setDate(bugun.getDate() + 10);
                    //    q.OnaylananBaslagic = bugun.toISOString().slice(0, 10);
                    //    q.OnaylananBitis = onGunSonra.toISOString().slice(0, 10);
                    //}
                    //else {
                    //    q.OnaylananBaslagic = zxc.tarihParse(q.OnaylananBaslagic);
                    //    q.OnaylananBitis = zxc.tarihParse(q.OnaylananBitis);
                    //}
                    html = html.concat(`<tr>
                    <td>${q.CaddeSokak}</td>
                    <td>${zxc.tarihParse(q.PlanlananBaslagic)}</td>
                    <td>${zxc.tarihParse(q.PlanlananBitis)}</td>
         
                    </tr>`);
                });
                //       <td><input type="date" class="form-control form-control-sm inputIslem" value="${q.OnaylananBaslagic.substr(0, 10)}" /></td>
                //<td><input type="date" class="form-control form-control-sm inputIslem" value="${q.OnaylananBitis.substr(0, 10)}" /></td>
                zxc('#tdataMakbuz').html(html);
                if (data.Makbuztarih == null) {
                    var bugun = new Date();
                    data.Makbuztarih = bugun.toISOString().slice(0, 10);
                }

                document.getElementById("txtMakbuzTarhi").value = data.Makbuztarih.substr(0, 10);

                if (data.Makbuzno != null)
                    zxc('#txtMakbuzNo').value(data.Makbuzno);
                if (data.Makbuztutar != null) {
                    zxc('#txtMakbuzTutari').value(data.Makbuztutar.toString().replace(".", ","));
                }
            }
            fncModalAc("#mdlMakbuz");
        }, function () {
            zxc('#txtMakbuzTarhi,#txtMakbuzNo,#txtMakbuzTutari').value(" ");
            zxc('#tdataMakbuz').html(" ");
            zxc(v).attr("disabled", "disabled");
        }, function () {
            zxc(v).attrSil("disabled");
        });
}
function fncFormAc(v) {
    var MakbuzTarhi = zxc('#txtMakbuzTarhi').value(),
        MakbuzNo = zxc('#txtMakbuzNo').value(),
        MakbuzTutari = zxc('#txtMakbuzTutari').value().replace(",", ".");

    if (slcProjeID != null)
        PostJson('/api/Api_Aykome/GetRuhsatFormBilgi/' + slcProjeID, {
            MakbuzTarhi: new Date(MakbuzTarhi),
            MakbuzNo: MakbuzNo || null,
            MakbuzTutari: parseFloat(MakbuzTutari) || null
        }, function (data) {
            fncModalGizle();
            if (data.veri)
                document.getElementById("txtTalepTArihi").value = data.veri.substr(0, 10);
            zxc('#txtMakProjeNo').value(data.veri2);
            zxc('#txtMakMesaj1').value(data.veri3);
            zxc('#txtMakMesaj2').value(data.veri4);
            if (data.veri6) {
                zxc('#yolYipranma').dom.checked = data.veri6.YolYipRanmaBedel == "E" ? true : false;
                zxc('#ruhsatBedeli').dom.checked = data.veri6.RuhsatBedel == "E" ? true : false;
                zxc('#teminatBedeli').dom.checked = data.veri6.TeminatBedel == "E" ? true : false;
                zxc('#kaziDolguBedeli').dom.checked = data.veri6.KaziDolguBedel == "E" ? true : false;
                zxc('#kaplamaBedeli').dom.checked = data.veri6.KaplamaBedel == "E" ? true : false;
                zxc('#altyapikaziizinharci').dom.checked = data.veri6.AltyapiKaziIzinHarci == "E" ? true : false;
            }

            if (data.veri10 != null) {
                var html = '';
                data.veri10.forEach(gq =>
                    html = html.concat(` <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input chbpdfkurum" data-id="${gq.Key}" data-ad="${gq.Val}" id="excchn${gq.Key}">
                                        <label class="form-check-label" for="excchn${gq.Key}">${gq.Val}</label>
                                    </div>`));

                document.getElementById('pnlKurLstch').innerHTML = html;

                zxc('.chbpdfkurum,#txtMakgTar1,#txtMakgTar2,#txtMakKazGz,#txtKazGzrgs,#txtRuhsRad').change(function () {
                    fncNotAyarla()
                })
            }

            if (data.veri5 != null) {
                var html = '<option value="">Seç</option>';
                data.veri5.forEach(gq =>
                    html = html.concat(`<option value="${gq}">${gq}</option>`));
                document.getElementById('txtRuhstfiyatYili').innerHTML = html;

                zxc('#txtRuhstfiyatYili').selectbox(zxc.tarih.yil);
            }


            if (data.veri8 == true && data.veri9 == true) {
                var bugun = new Date();
                var onGunSonra = new Date(bugun);
                onGunSonra.setDate(bugun.getDate() + 10);
                var OnaylananBaslagic = bugun.toISOString().slice(0, 10);
                var OnaylananBitis = onGunSonra.toISOString().slice(0, 10);
                document.getElementById('txtOnayBasTarhi').value = OnaylananBaslagic.substr(0, 10);
                document.getElementById('txtOnayBitTarhi').value = OnaylananBitis.substr(0, 10);
                fncModalAc("#mdlOnayVer");
            }
            else if (data.veri8 == true && data.veri9 == false) {
                fncModalSor("Ruhsatın yayınlanmasını istiyor musunuz?", "fncRuhsatiYayinla(this)")
            }
            else if (data.veri8 == false && data.veri9 == false) {
                if (data.veri7 == null) {
                    var bugun = new Date();
                    var onGunSonra = new Date(bugun);
                    onGunSonra.setDate(bugun.getDate() + 10);
                    var OnaylananBaslagic = bugun.toISOString().slice(0, 10);
                    var OnaylananBitis = onGunSonra.toISOString().slice(0, 10);
                    document.getElementById('txtMakgTar1').value = OnaylananBaslagic.substr(0, 10);
                    document.getElementById('txtMakgTar2').value = OnaylananBitis.substr(0, 10);
                    fncModalAc("#mdlRuhsatOnayFrm");

                }
                else
                    fncModalSor("İrsaliyenin hazırlanmasını istiyor musunuz?", "fncIrsaliyeOlustur(this," + (data.veri6.RuhsatBedel == "E" ? true : false) + "," + zxc.tarih.yil + ")")
            }
            if (data.veri7 != null)
                newRuhsatUniqVal = data.veri7;

        }, function () {
            zxc('#txtTalepTArihi,#txtMakProjeNo,#txtMakMesaj1,#txtMakMesaj2,#txtMakaciklamav').value(" ");
            zxc(v).attr("disabled", "disabled");
        }, function () {
            zxc(v).attrSil("disabled");
        });
}

function fncFormAc2() {
    var qq = this;
    slcProjeID = zxc(qq).ustElement(2).attr('data-id')

    if (slcProjeID != null)
        GetJson('/api/Api_Aykome/GetRuhsatFormBilgi2/' + slcProjeID, function (data) {

            document.getElementById("txtTalepTArihi").value = data.veri.substr(0, 10);
            zxc('#txtMakProjeNo').value(data.veri2);
            zxc('#txtMakMesaj1').value(data.veri3);
            zxc('#txtMakMesaj2').value(data.veri4);

            zxc('#yolYipranma').dom.checked = data.veri6.YolYipRanmaBedel == "E" ? true : false;
            zxc('#ruhsatBedeli').dom.checked = data.veri6.RuhsatBedel == "E" ? true : false;
            zxc('#teminatBedeli').dom.checked = data.veri6.TeminatBedel == "E" ? true : false;
            zxc('#kaziDolguBedeli').dom.checked = data.veri6.KaziDolguBedel == "E" ? true : false;
            zxc('#kaplamaBedeli').dom.checked = data.veri6.KaplamaBedel == "E" ? true : false;
            zxc('#altyapikaziizinharci').dom.checked = data.veri6.AltyapiKaziIzinHarci == "E" ? true : false;


            if (data.veri5 != null) {
                var html = '<option value="">Seç</option>';
                data.veri5.forEach(gq =>
                    html = html.concat(`<option value="${gq}">${gq}</option>`));
                document.getElementById('txtRuhstfiyatYili').innerHTML = html;

                zxc('#txtRuhstfiyatYili').selectbox(zxc.tarih.yil);
            }

            if (data.veri8 == true && data.veri9 == true) {// irs+ yay+
                var bugun = new Date();
                var onGunSonra = new Date(bugun);
                onGunSonra.setDate(bugun.getDate() + 10);
                var OnaylananBaslagic = bugun.toISOString().slice(0, 10);
                var OnaylananBitis = onGunSonra.toISOString().slice(0, 10);
                document.getElementById('txtOnayBasTarhi').value = OnaylananBaslagic.substr(0, 10);
                document.getElementById('txtOnayBitTarhi').value = OnaylananBitis.substr(0, 10);
                fncModalAc("#mdlOnayVer");
            }

            else if (data.veri8 == true && data.veri9 == false) {// irs+ yay-
                fncModalSor("Ruhsatın yayınlanmasını istiyor musunuz?", "fncRuhsatiYayinla(this)")
            }
            else if (data.veri8 == false && data.veri9 == false) {//irs+ yay-

                if (data.veri7 == null) {
                    var bugun = new Date();
                    var onGunSonra = new Date(bugun);
                    onGunSonra.setDate(bugun.getDate() + 10);
                    var OnaylananBaslagic = bugun.toISOString().slice(0, 10);
                    var OnaylananBitis = onGunSonra.toISOString().slice(0, 10);
                    document.getElementById('txtMakgTar1').value = OnaylananBaslagic.substr(0, 10);
                    document.getElementById('txtMakgTar2').value = OnaylananBitis.substr(0, 10);
                    fncModalAc("#mdlRuhsatOnayFrm");

                }
                else
                    fncModalSor("İrsaliyenin hazırlanmasını istiyor musunuz?", "fncIrsaliyeOlustur(this," + (data.veri6.RuhsatBedel == "E" ? true : false) + "," + zxc.tarih.yil + ")")
            }
            if (data.veri7 != null)
                newRuhsatUniqVal = data.veri7;

            if (data.veri10 != null) {
                var html = '';
                data.veri10.forEach(gq =>
                    html = html.concat(` <div class="form-group form-check">
                                        <input type="checkbox" class="form-check-input chbpdfkurum" data-id="${gq.Key}" data-ad="${gq.Val}" id="excchn${gq.Key}">
                                        <label class="form-check-label" for="excchn${gq.Key}">${gq.Val}</label>
                                    </div>`));

                document.getElementById('pnlKurLstch').innerHTML = html;

                zxc('.chbpdfkurum,#txtMakgTar1,#txtMakgTar2,#txtMakKazGz,#txtKazGzrgs,#txtRuhsRad').change(function () {
                    fncNotAyarla()
                })
            }


        }, function () {
            zxc(qq).attr("disabled", "disabled");
        }, function () {
            zxc(qq).attrSil("disabled");
        });
}

function fncNotAyarla() {
    var not1 = '';
    if (zxc('#txtRuhsRad').dom.checked)
        not1 = `Yapılan tetkik neticesinde 
        Yukarıda boyut ve yeri belirtilmiş olan tranşe ${zxc.tarihParse(zxc('#txtMakgTar1').value())} ${zxc.tarihParse(zxc('#txtMakgTar2').value())} tarihleri arasında ${zxc('.chbpdfkurum').checkedList('data-ad', ',')} kurumları arası yönetmenlikle belirtilen kurallara uygun olarak açılacaktır.`;

    var not2 = '';
    if (zxc('#txtKazGzrgs').dom.checked)
        if (zxc('#txtMakKazGz').value() != "")
            not2 = `Kazı güzergahında ${zxc.tarihParse(zxc('#txtMakKazGz').value())} tarihinde diğer kurumların da çalışması olduğundan ortak programa alınmış olup AYKOME tarafından yapılacaktır.`;

    zxc('#txtMakaciklamav').value(`${not1}
${not2}`)
}

var newRuhsatUniqVal = null;
function fncRuhsatHesapla(qq) {
    var TarhA1 = zxc('#txtMakgTar1').value(),
        TarhA2 = zxc('#txtMakgTar2').value(),
        Tarhb = zxc('#txtMakKazGz').value(),
        Aciklama = zxc('#txtMakaciklamav').value(),
        Yill = zxc('#txtRuhstfiyatYili').selectboxSecilenIndex().value,
        RuhsatBedeli = zxc('#ruhsatBedeli').dom.checked;

    if (slcProjeID != "")
        PostJson('/api/Api_Aykome/SetRuhsatHesapla/' + slcProjeID, {
            YolYipranma: zxc('#yolYipranma').dom.checked,
            RuhsatBedeli: RuhsatBedeli,
            TeminatBedeli: zxc('#teminatBedeli').dom.checked,
            KaziDolguBedeli: zxc('#kaziDolguBedeli').dom.checked,
            KaplamaBedeli: zxc('#kaplamaBedeli').dom.checked,
            AltYapiKaziIzinHarci: zxc('#altyapikaziizinharci').dom.checked,
            Yil: Yill,
            CumleEdt: zxc('#txtRuhsRad').dom.checked,
            TarhA1: new Date(TarhA1),
            TarhA2: new Date(TarhA2),
            Tarhb: new Date(Tarhb),
            KaziGuzargah: zxc('#txtKazGzrgs').dom.checked,
            Aciklama: Aciklama
        }, function (data) {
            newRuhsatUniqVal = data.veri;
            fncModalSor("İrsaliyenin hazırlanmasını istiyor musunuz?", "fncIrsaliyeOlustur(this," + RuhsatBedeli + "," + Yill + ")");
        }, function () {
            newRuhsatUniqVal = null;
            zxc(qq).attr('disabled', 'disabled');
            zxc(qq).ilkElement().attr('class', 'bx bx-loader')
        }, function () {
            zxc(qq).attrSil('disabled');
            zxc(qq).ilkElement().attr('class', 'bx bx-check')
        });
}

function fncIrsaliyeOlustur(qq, RuhsatBedeli, Yil) {
    if (slcProjeID != "")
        PostJson('/api/Api_Aykome/GetIrsaliye',
            {
                ProjeRef: slcProjeID,
                newRuhsatUniqVal: newRuhsatUniqVal,
                RuhsatBedeli: RuhsatBedeli,
                Yil: Yil
            }, function (data) {

                if (data.veri != null) {
                    fncModalGizle();
                    pdfCurUrl = baseResimUrl + data.veri;
                    loadPDF(pdfCurUrl, 'canvasirsaliye');
                    fncModalAc("#mdlIrsaliye2");
                }
                //document.getElementById("canvasIrsaliye").innerHTML = "";
                //fncModalGizle();
                //var IrsaliyeOut = data.veri;
                //pdfData = fncSerIrsaliyePdf(IrsaliyeOut.Basvurusahibi, IrsaliyeOut.Projeno, IrsaliyeOut.AltyapiKaziIzniHarci, IrsaliyeOut.RuhsatBedeliYil, IrsaliyeOut.GenelToplam, IrsaliyeOut.Birim, IrsaliyeOut.TeminatToplam, IrsaliyeOut.YolYipToplam);
                //// pdfMake.createPdf(pdfData).download('Teslimat_Irsaliyesi.pdf');
                //pdfMake.createPdf(pdfData).getDataUrl(function (dataURL) {
                //    renderPDF(dataURL, document.getElementById("canvasIrsaliye"));
                //});
                //fncModalAc("#mdlIrsaliye");

            }, function () {
                zxc(qq).attr('disabled', 'disabled')
            }, function () {
                zxc(qq).attrSil('disabled')
            })
}

function fncSerIrsaliyePdf(Basvurusahibi, ProjeNo, AltyapiKaziIzniHarci, RuhsatBedeliYil, GenelToplam, Birim, TeminatToplam, YolYipToplam,
    TeminatToplamEk, YolYipToplamEk, AltyapiKaziIzniHarciEk, GenelToplamEk) {
    var logoBase64 = 'data:image/png;base64,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'; // logoBase64 içeriğini kendi base64 stringiniz ile değiştirin

    var ekk = '';
    if (TeminatToplamEk != undefined) {
        ekk = {
            table: {
                widths: ['*', '*', '*'],
                body: [
                    [
                        { text: 'Ek Hesap', style: 'tableHeader' },
                        { text: '', style: 'tableHeader' },
                        { text: '', style: 'tableHeader' }
                    ],
                    [
                        {
                            text: "",
                            style: 'tableCell'
                        },
                        { text: 'Geçici teminat', style: 'tableCell' },
                        { text: TeminatToplamEk, style: 'tableCell' }
                    ],
                    [
                        {
                            text: '',
                            rowSpan: 3,
                            style: 'tableCell'
                        },
                        { text: 'Yol Bozma bedeli (Kaplama bedeli) (406)', style: 'tableCell' },
                        { text: YolYipToplamEk, style: 'tableCell' }
                    ],
                    [
                        '',
                        { text: 'Altyapı Kazı İzni Harcı', style: 'tableCell' },
                        { text: AltyapiKaziIzniHarciEk, style: 'tableCell' }
                    ],
                    [
                        { text: '', style: 'tableCell' },
                        { text: '', style: 'tableCell' },
                        { text: GenelToplamEk, style: 'tableHeader' }
                    ]
                ]
            },
            margin: [0, 20, 0, 0],
            layout: 'lightHorizontalLines'
        };
    }

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
                                text: Basvurusahibi,
                                style: 'tableCell'
                            },
                            { text: 'Geçici teminat', style: 'tableCell' },
                            { text: TeminatToplam, style: 'tableCell' }
                        ],
                        [
                            {
                                text: 'PROJE NO: ' + ProjeNo,
                                rowSpan: 3,
                                style: 'tableCell'
                            },
                            { text: 'Yol Bozma bedeli (Kaplama bedeli) (406)', style: 'tableCell' },
                            { text: YolYipToplam, style: 'tableCell' }
                        ],
                        [
                            '',
                            { text: 'Altyapı Kazı İzni Harcı', style: 'tableCell' },
                            { text: AltyapiKaziIzniHarci, style: 'tableCell' }
                        ],
                        [
                            '',
                            { text: 'Belge Ücreti (350)', style: 'tableCell' },
                            { text: RuhsatBedeliYil, style: 'tableCell' }
                        ],
                        [
                            { text: '', style: 'tableCell' },
                            { text: '', style: 'tableCell' },
                            { text: GenelToplam, style: 'tableHeader' }
                        ]
                    ]
                },
                margin: [0, 20, 0, 0],
                layout: 'lightHorizontalLines'
            }, ekk,
            {
                text: 'KONYA BÜYÜKŞEHİR BELEDİYESİ BAŞKANLIĞI ALTYAPI YATIRIM HESABI: TR360001500158007300084495 YATIRILMASI',
                style: 'footer',
            },
            {
                table: {
                    widths: ['*', '*', '*', '*'],
                    body: [
                        [
                            { text: Birim + 'PROJE NO:' + ProjeNo, style: 'tableCell' },
                            { text: 'dan', style: 'tableCell' },
                            { text: GenelToplam, style: 'tableCell' },
                            { text: 'tahsil edilerek makbuzun verilmesi uygundur.', style: 'tableCell' },
                        ]
                    ]
                },
                margin: [0, 20, 0, 0],
                layout: 'lightHorizontalLines'
            },
            {
                text: zxc.tarih.full("dd.MM.yyyy"),
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
}

function fncIrsaliyeTamam() {
    fncModalSor("Ruhsatın yayınlanmasını istiyor musunuz?", "fncRuhsatiYayinla(this)")
}

function fncRuhsatiYayinla(qq) {
    if (slcProjeID != "")
        PostJson('/api/Api_Aykome/SetRuhsatYayinla',
            {
                ProjeRef: slcProjeID,
                newRuhsatUniqVal: newRuhsatUniqVal,
                RuhsatBedeli: true,
                Yil: new Date().getFullYear()
            }, function (data) {
                var bugun = new Date();
                var onGunSonra = new Date(bugun);
                onGunSonra.setDate(bugun.getDate() + 10);
                var OnaylananBaslagic = bugun.toISOString().slice(0, 10);
                var OnaylananBitis = onGunSonra.toISOString().slice(0, 10);
                document.getElementById('txtOnayBasTarhi').value = OnaylananBaslagic.substr(0, 10);
                document.getElementById('txtOnayBitTarhi').value = OnaylananBitis.substr(0, 10);
                fncModalGizle();
                fncModalAc("#mdlOnayVer");
            }, function () {
                zxc(qq).attr('disabled', 'disabled')
            }, function () {
                zxc(qq).attrSil('disabled')
            })
}

function fncRuhsatiOnayla(q) {
    if (slcProjeID != "")
        PostJson('/api/Api_Aykome/SetOnayVermek',
            {
                ProjeRef: slcProjeID,
                Obastar: zxc('#txtOnayBasTarhi').value(),
                Obittar: zxc('#txtOnayBitTarhi').value(),
                Mesaj: zxc('#txtOnayAciklama').value(),
                newRuhsatUniqVal: newRuhsatUniqVal,
                RuhsatBedeli: zxc('#ruhsatBedeli').dom.checked,
                Yil: zxc('#txtRuhstfiyatYili').selectboxSecilenIndex().value,
                Aciklama: zxc('#txtOnayAciklama').value(),
            }, function (data) {
                fncModalGizle();
                fncIlkAcilis(false);
            }, function () {
                zxc(q).attr('disabled', 'disabled')
            }, function () {
                zxc(q).attrSil('disabled')
            })
}

function filterLabels2() {
    const searchValue = document.getElementById('searchBox').value.toLowerCase();
    const formGroups = document.querySelectorAll('#pnlKurLstch .form-group');

    formGroups.forEach(group => {
        const label = group.querySelector('label').innerText.toLowerCase();
        if (label.includes(searchValue)) {
            group.style.display = 'block'; // Eşleşenleri göster
        } else {
            group.style.display = 'none'; // Eşleşmeyenleri gizle
        }
    });
}

function filterLabels() {
    const searchValue = document.getElementById('searchBox').value.toLowerCase();
    const formGroups = document.querySelectorAll('#pnlKurLstch .form-group');

    formGroups.forEach(group => {
        const label = group.querySelector('label');
        const labelText = label.innerText.toLowerCase();

        if (labelText.includes(searchValue) && searchValue !== "") {
            const startIndex = labelText.indexOf(searchValue);
            const endIndex = startIndex + searchValue.length;
            const originalText = label.innerText;

            const highlightedText = originalText.substring(0, startIndex) +
                '<span class="highlight">' +
                originalText.substring(startIndex, endIndex) +
                '</span>' +
                originalText.substring(endIndex);

            label.innerHTML = highlightedText;
            group.style.display = 'block';
        } else {
            label.innerHTML = label.innerText;
            group.style.display = searchValue === "" ? 'block' : 'none';
        }
    });
}

function fncProjeImzalmaIslem() {
    var q = this;
    slcProjeID = q.getAttribute('data-id');
    var islem = q.getAttribute('data-islem');
    if (slcProjeID != null) {
        imzaConfig = {
            imzaDataString: `${slcProjeID} projesi için onay veriliyor.`,
            islem_tipi: "ProjeyeOnayVermek",
            refid: slcProjeID,
            fncCallback: function () { fncIlkAcilis(false); }
        }
        imzaRefModal = null;
        fncModalAc("#mdlImza");
    }
}
function fncOnayiImzalmaIslem() {
    var q = this;
    slcProjeID = q.getAttribute('data-id');
    var islem = q.getAttribute('data-islem');
    if (slcProjeID != null) {
        imzaConfig = {
            imzaDataString: `${slcProjeID} onayli proje imzalanıyor.`,
            islem_tipi: "OnaylaniImzalamak",
            refid: slcProjeID,
            RefUserImza: document.getElementById('slcRefEimza').value == "" ? null : document.getElementById('slcRefEimza').value,
            fncCallback: function () { fncIlkAcilis(false); }
        }
        imzaRefModal = null;
        fncModalAc("#mdlImza");
    }
}


//#endregion

//#region Arazi

function fncAraziKontrolOpn(qq, readOnly = false) {
    var id = qq.getAttribute('data-id'),
        no = qq.getAttribute('data-no'),
        tip = qq.getAttribute('data-tip');

    if (tip == "1") {
        slcProjeID = id;
        GetJson('/api/Api_Aykome/GetAraziKontrol/' + slcProjeID, function (data) {
            if (data.veri != null) {
                if (data.veri.KontrolRef != "-1") {
                    zxc('#txtKaziKontrolID').value(data.veri.KontrolRef);

                    if (data.veri.ETKONTROL == "-1") {
                        zxc('#ETKONTROL').checked(false);
                        zxc('#ETKONTROLnot').checked(false);
                    }
                    else if (data.veri.ETKONTROL == "1")
                        zxc('#ETKONTROL').checked(true);
                    else
                        zxc('#ETKONTROLnot').checked(true);

                    if (data.veri.KPKONTROL == "-1") {
                        zxc('#KPKONTROL').checked(false);
                        zxc('#KPKONTROLnot').checked(false);
                    }
                    else if (data.veri.KPKONTROL == "1")
                        zxc('#KPKONTROL').checked(true);
                    else
                        zxc('#KPKONTROLnot').checked(true);

                    if (data.veri.YERKONTROL == "-1") {
                        zxc('#YERKONTROL').checked(false);
                        zxc('#YERKONTROLnot').checked(false);
                    }
                    else if (data.veri.YERKONTROL == "1")
                        zxc('#YERKONTROL').checked(true);
                    else
                        zxc('#YERKONTROLnot').checked(true);

                    if (data.veri.TARIHKONTROL == "-1") {
                        zxc('#TARIHKONTROL').checked(false);
                        zxc('#TARIHKONTROLnot').checked(false);
                    }
                    else if (data.veri.TARIHKONTROL == "1")
                        zxc('#TARIHKONTROL').checked(true);
                    else
                        zxc('#TARIHKONTROLnot').checked(true);

                    if (data.veri.TAMIRKONTROL == "-1") {
                        zxc('#TAMIRKONTROL').checked(false);
                        zxc('#TAMIRKONTROLnot').checked(false);
                    }
                    else if (data.veri.TAMIRKONTROL == "1")
                        zxc('#TAMIRKONTROL').checked(true);
                    else
                        zxc('#TAMIRKONTROLnot').checked(true);

                    zxc('#fieldNote').value(data.veri.ACIKLAMA);
                    zxc('#lblIncelemeSonucu').html(data.veri.UygunlukDurumu);
                    if (data.veri.File)
                        for (var i = 0; i < data.veri.File.length; i++) {
                            const container = document.createElement('div');
                            container.classList.add('imgresww');
                            container.setAttribute("data-src", data.veri.File[i].Data);
                            container.setAttribute("data-type", data.veri.File[i].Type);
                            container.setAttribute("data-name", data.veri.File[i].Name);

                            if (data.veri.File[i].Type.startsWith('image/')) {
                                const img = document.createElement('img');
                                img.src = baseResimUrl + data.veri.File[i].Data;
                                img.alt = data.veri.File[i].Name;
                                img.classList.add("arfimg");
                                container.appendChild(img);
                            }
                            else {
                                const video = document.createElement('video');
                                video.controls = true;
                                video.classList.add("arfimg");

                                const source = document.createElement('source');
                                source.src = baseResimUrl + data.veri.File[i].Data;
                                source.type = data.veri.File[i].Type;
                                video.appendChild(source);
                                container.appendChild(video);
                            }
                            const deleteBtn = document.createElement('span');
                            deleteBtn.textContent = 'Sil';
                            deleteBtn.classList.add('aslre');
                            deleteBtn.onclick = function () {
                                container.remove();
                            };
                            container.appendChild(deleteBtn);

                            document.querySelector('.ffeer5').appendChild(container);
                        }
                }
                else {
                    zxc('#txtKaziKontrolID').value("-1");
                }
                zxc('#txtdlength').value(data.veri.Uzunluk);
                zxc('#txtdwidth').value(data.veri.En);
                zxc('#txtddepth').value(data.veri.Derinlik);
            }
            if (readOnly)
                zxc('#btnmdlAraziKontrol').attr('hidden', 'hidden').attrSil('onclick');
            else
                zxc('#btnmdlAraziKontrol').attrSil('hidden').attr('onclick', 'fncAraziKaydetIlKasama(this)');

            fncModalAc('#mdlAraziKontrol');
        }, function () {
            zxc('#ETKONTROLnot').checked(false);
            zxc('#KPKONTROLnot').checked(false);
            zxc('#YERKONTROLnot').checked(false);
            zxc('#TARIHKONTROLnot').checked(false);
            zxc('#TAMIRKONTROLnot').checked(false);
            zxc('#ETKONTROL').checked(false);
            zxc('#KPKONTROL').checked(false);
            zxc('#YERKONTROL').checked(false);
            zxc('#TARIHKONTROL').checked(false);
            zxc('#TAMIRKONTROL').checked(false);
            zxc('#fieldNote').value(" ");
            document.querySelector('.ffeer5').innerHTML = "";
            zxc('#projectNo').value(no);
        }, function () {

        }, function () {
            fncModalAc('#mdlAraziKontrol');
        })
    }
}

async function handleFileUpload(event) {
    const files = event.target.files;
    if (files.length === 0) {
        return;
    }

    for (let i = 0; i < files.length; i++) {
        const file = files[i]; // Dosya referansını koruyun
        try {
            const base64Data = await convertFileToBase64Async(file);
            addMediaToDOM(base64Data, file.type, file.name);
        } catch (error) {
            console.error("Error processing file:", error);
        }
    }
    event.target.value = ''; // Clear the input
}

//function convertFileToBase64(file, callback) {
//    const reader = new FileReader();
//    reader.readAsDataURL(file);
//    reader.onload = function () {
//        callback(reader.result);
//    };
//}

function convertFileToBase64Async(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = () => reject(new Error("File reading error"));
        reader.readAsDataURL(file);
    });
}

function addMediaToDOM(base64Data, fileType, fileName) {
    const container = document.createElement('div');
    container.classList.add('imgresww');
    container.setAttribute("data-src", base64Data);
    container.setAttribute("data-type", fileType);
    container.setAttribute("data-name", fileName);

    if (fileType.startsWith('image/')) {
        const img = document.createElement('img');
        img.src = base64Data;
        img.alt = fileName;
        img.classList.add("arfimg");
        container.appendChild(img);
    } else if (fileType.startsWith('video/')) {

        const video = document.createElement('video');
        video.controls = true;
        video.classList.add("arfimg");

        const source = document.createElement('source');
        source.src = base64Data;
        source.type = fileType;
        video.appendChild(source);

        container.appendChild(video);
    }

    const deleteBtn = document.createElement('span');
    deleteBtn.textContent = 'Sil';
    deleteBtn.classList.add('aslre');
    deleteBtn.onclick = function () {
        container.remove();
    };
    container.appendChild(deleteBtn);

    document.querySelector('.ffeer5').appendChild(container);
}

function fncMustResmYuk() {
    var fil = this;
    // if (fncImageCheck(fil))
    fncFileToBase64(fil.files[0], function (q) {
        zxc(".ffeer5 ").ekle('<div class="imgdfvv"><div class="imgresww" data-id="' + q + '" data-title="' + fil.files[0].name + '" alt=""><span><img src="' + q + '" class="arfimg" name="File" /></span><a class="aslre" onclick="fncImgDels(this)">Sil</a></div></div>');
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
function fncImgDels(q) {
    zxc(q).ustElement(1).elementiSil();
}
function fncAraziKaydetIlKasama(q) {
    var ETKONTROL = zxc('#ETKONTROL').dom.checked,
        ETKONTROLnot = zxc('#ETKONTROLnot').dom.checked,
        ETKONTROLdeger = "-1",

        KPKONTROL = zxc('#KPKONTROL').dom.checked,
        KPKONTROLnot = zxc('#KPKONTROLnot').dom.checked,
        KPKONTROLdeger = "-1",

        YERKONTROL = zxc('#YERKONTROL').dom.checked,
        YERKONTROLnot = zxc('#YERKONTROLnot').dom.checked,
        YERKONTROLdeger = "-1",

        TARIHKONTROL = zxc('#TARIHKONTROL').dom.checked,
        TARIHKONTROLnot = zxc('#TARIHKONTROLnot').dom.checked,
        TARIHKONTROLdeger = "-1",

        TAMIRKONTROL = zxc('#TAMIRKONTROL').dom.checked,
        TAMIRKONTROLnot = zxc('#TAMIRKONTROLnot').dom.checked,
        TAMIRKONTROLdeger = "-1";

    if (ETKONTROL == true)
        ETKONTROLdeger = "1";
    else if (ETKONTROLnot == true)
        ETKONTROLdeger = "0";

    if (KPKONTROL == true)
        KPKONTROLdeger = "1";
    else if (KPKONTROLnot == true)
        KPKONTROLdeger = "0";

    if (YERKONTROL == true)
        YERKONTROLdeger = "1";
    else if (YERKONTROLnot == true)
        YERKONTROLdeger = "0";

    if (TARIHKONTROL == true)
        TARIHKONTROLdeger = "1";
    else if (TARIHKONTROLnot == true)
        TARIHKONTROLdeger = "0";

    if (TAMIRKONTROL == true)
        TAMIRKONTROLdeger = "1";
    else if (TAMIRKONTROLnot == true)
        TAMIRKONTROLdeger = "0";

    if (TAMIRKONTROLdeger == "-1" || TARIHKONTROLdeger == "-1" || YERKONTROLdeger == "-1" || KPKONTROLdeger == "-1" || ETKONTROLdeger == "-1") {
        fncAraziKaydet(q)
    }
    else {
        fncModalSor("Arazi Kontrolünü Bitirmek İstiyor Musunuz?</br>Evet Derseniz Proje Listeden Silinecektir.", "fncAraziKaydet(this)");
    }
}
function fncAraziKaydet(qq) {

    if (slcProjeID != "") {
        //var form = document.getElementById('landControlForm');
        //var formData = new FormData(form);

        //var object = {};
        //formData.forEach((value, key) => {
        //    object[key] = value;
        //});
        var ETKONTROL = zxc('#ETKONTROL').dom.checked,
            ETKONTROLnot = zxc('#ETKONTROLnot').dom.checked,
            ETKONTROLdeger = "-1",

            KPKONTROL = zxc('#KPKONTROL').dom.checked,
            KPKONTROLnot = zxc('#KPKONTROLnot').dom.checked,
            KPKONTROLdeger = "-1",

            YERKONTROL = zxc('#YERKONTROL').dom.checked,
            YERKONTROLnot = zxc('#YERKONTROLnot').dom.checked,
            YERKONTROLdeger = "-1",

            TARIHKONTROL = zxc('#TARIHKONTROL').dom.checked,
            TARIHKONTROLnot = zxc('#TARIHKONTROLnot').dom.checked,
            TARIHKONTROLdeger = "-1",

            TAMIRKONTROL = zxc('#TAMIRKONTROL').dom.checked,
            TAMIRKONTROLnot = zxc('#TAMIRKONTROLnot').dom.checked,
            TAMIRKONTROLdeger = "-1",

            ACIKLAMA = zxc('#fieldNote').value();

        if (ETKONTROL == true)
            ETKONTROLdeger = "1";
        else if (ETKONTROLnot == true)
            ETKONTROLdeger = "0";

        if (KPKONTROL == true)
            KPKONTROLdeger = "1";
        else if (KPKONTROLnot == true)
            KPKONTROLdeger = "0";

        if (YERKONTROL == true)
            YERKONTROLdeger = "1";
        else if (YERKONTROLnot == true)
            YERKONTROLdeger = "0";

        if (TARIHKONTROL == true)
            TARIHKONTROLdeger = "1";
        else if (TARIHKONTROLnot == true)
            TARIHKONTROLdeger = "0";

        if (TAMIRKONTROL == true)
            TAMIRKONTROLdeger = "1";
        else if (TAMIRKONTROLnot == true)
            TAMIRKONTROLdeger = "0";

        var uploadedFiles = [];
        var fg = document.querySelectorAll('.ffeer5 .imgresww');
        if (fg != null) {
            fg.forEach(deq => {
                uploadedFiles.push({
                    Name: deq.getAttribute('data-name'),
                    Type: deq.getAttribute('data-type'),
                    Data: deq.getAttribute('data-src')
                });
            })
        }
        //if (uploadedFiles.length > 0)
        //    object["File"] = uploadedFiles;

        PostJson('/api/Api_Aykome/SetAraziKontrol/' + slcProjeID, {
            KontrolRef: zxc('#txtKaziKontrolID').value(),
            ETKONTROL: ETKONTROLdeger,
            KPKONTROL: KPKONTROLdeger,
            YERKONTROL: YERKONTROLdeger,
            TARIHKONTROL: TARIHKONTROLdeger,
            TAMIRKONTROL: TAMIRKONTROLdeger,
            ACIKLAMA: ACIKLAMA,
            File: uploadedFiles
        }, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        }, function () {
            zxc(qq).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
        }, function () {
            zxc(qq).attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
        }, function () {
            zxc(qq).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
        })
    }
}

function fncDigerKazKontrol(q, w) {
    if (q.checked == true && zxc(w).dom.checked == true)
        zxc(w).dom.checked = false;
}
//#endregion

//#region Uygunluk Belgesi
function downloadAsWord() {
    // İçeriği al
    var content = document.getElementById("editableContent").innerHTML;

    // CSS stillerini tanımla
    var css = (
        'body {font-family: Arial, sans-serif; font-size: 16px; line-height: 1.6;} ' +
        'div {font-size: 16px;}'
    );

    // Word belgesi için HTML yapısı oluştur ve CSS ekle
    var preHtml = "<html xmlns:o='urn:schemas-microsoft-com:office:office' " +
        "xmlns:w='urn:schemas-microsoft-com:office:word' " +
        "xmlns='http://www.w3.org/TR/REC-html40'>" +
        "<head><meta charset='utf-8'><title>Uygunluk Belgesi</title>" +
        "<style>" + css + "</style></head><body>";
    var postHtml = "</body></html>";
    var html = preHtml + content + postHtml;

    // Blob oluştur ve kullanıcıya indirme işlemi başlat
    var blob = new Blob(['\ufeff', html], {
        type: 'application/msword'
    });

    // İndirme işlemi için bağlantı oluştur
    var url = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(html);
    var downloadLink = document.createElement("a");
    document.body.appendChild(downloadLink);

    downloadLink.href = url;
    downloadLink.download = 'Uygunluk_Belgesi.doc';
    downloadLink.click();

    document.body.removeChild(downloadLink);
}

function fncToplUygnOlstur(qq) {
    var ary = zxc('.chbUyBelhf').checkedListArray("data-id");
    if (ary.length == 0) {
        MesajVer('Hiç Bir seçim Yapmadınız!', MesajDurumu.Warning);
        return;
    }
    fncUygunlBlgOls(ary);
}


//function fncSahaKontrolSifOpn(qq) {
//    slcProjeID = qq.getAttribute('data-id');
//    fncModalSor("Saha Kontrol Yeniden Kontrol Edilsin mi?", "fncSahakOntrolSifirla(this)")
//}

//function fncSahakOntrolSifirla() {
//    if (slcProjeID != null)
//        GetJson('/api/Api_Aykome/SetAraziKontrolSifirla/' + slcProjeID, function (data) {
//            slcProjeID = null;
//            fncModalGizle();
//            fncIlkAcilis(false);
//        })
//}

function fncUygunlukBelgeOlstOpn(qq) {
    var id = qq.getAttribute('data-id'),
        ary = [];
    ary.push(id);
    fncUygunlBlgOls(ary);
}

function fncUygunlBlgOls(ary) {
    PostJson('/api/Api_Aykome/GetAraziKontrolUbelge', ary, function (data) {
        zxc('#editableContent').attr('contenteditable', 'true');
        zxc('#btnUyg1').attrSil('hidden');
        zxc('#btnUyg2').attr('hidden', 'hidden');
        if (data.veri4 != null && data.veri4.length > 0) {
            zxc('#editableContent').html(data.veri4[data.veri4.length - 1]);
            if (data.veri != null) {
                zxc('#lblUygPrjNoLst').html(data.veri.join());
                zxc('#lblUygPrjNoLst').attr("data-ary", data.veri3.join());
            }
            if (data.veri2 != null) {
                zxc('#lblUygPrjIlceLst').html(data.veri2.join());
            }
        }
        else {
            if (data.veri != null) {
                zxc('#lblUygPrjNoLst').html(data.veri.join());
                zxc('#lblUygPrjNoLst').attr("data-ary", data.veri3.join());
            }
            if (data.veri2 != null) {
                zxc('#lblUygPrjIlceLst').html(data.veri2.join());
            }
        }
        fncModalAc('#mdlUygunluk');
    }, function () {
        zxc('#lblUygPrjNoLst,#lblUygPrjIlceLst').html(" ");
    }, function () {

    }, function () {
        fncModalAc('#mdlUygunluk');
    })
}
function fncUygunlukYayinlaOpn(qq) {
    fncModalSor("Uygunluk Belgesi Yayınlansın mı?", "fncUygunlukYayinla(this)")
}

function fncUygunlukYayinla(qq) {
    var ary = zxc('#lblUygPrjNoLst').attr("data-ary");
    PostJson('/api/Api_Aykome/SetAraziKontrolUbelge', {
        Param1: ary,
        Param2: zxc('#editableContent').html(),
        Param3: ""
    }, function (data) {
        fncModalGizle();
        fncIlkAcilis(false);
    });
}

function fncUygunlukBelgeGorOpn(qq) {
    var id = zxc(qq).ustElement(2).attr('data-id'),
        ary = [];
    ary.push(id);
    slcProjeID = id;

    if (zxc(qq).attr('data-mod') == "2") {
        zxc('#btnUyg1,#btnUyg2').attr('hidden', 'hidden');
        zxc('#editableContent').attrSil('contenteditable');
    }
    else {
        zxc('#editableContent').attrSil('contenteditable');
        zxc('#btnUyg2').attrSil('hidden');
        zxc('#btnUyg1').attr('hidden', 'hidden');
    }
    PostJson('/api/Api_Aykome/GetAraziKontrolUbelge', ary, function (data) {

        if (data.veri4 != null && data.veri4.length > 0) {
            zxc('#editableContent').html(data.veri4[data.veri4.length - 1]);
        }
        else {
            if (data.veri != null) {
                zxc('#lblUygPrjNoLst').html(data.veri.join());
                zxc('#lblUygPrjNoLst').attr("data-ary", data.veri3.join());
            }
            if (data.veri2 != null) {
                zxc('#lblUygPrjIlceLst').html(data.veri2.join());
            }

        }
        fncModalAc('#mdlUygunluk');
    }, function () {
        zxc('#lblUygPrjNoLst,#lblUygPrjIlceLst').html(" ");
    }, function () {

    }, function () {
        fncModalAc('#mdlUygunluk');
    })

    //const tempDiv = document.createElement('div');
    //tempDiv.innerHTML = '<div>11111</div>';
    //document.body.appendChild(tempDiv);
    //const { jsPDF } = window.jspdf;
    //const doc = new jsPDF();
    //html2canvas(tempDiv, {
    //    onrendered: function (canvas) {
    //        const imgData = canvas.toDataURL('image/png');
    //        doc.addImage(imgData, 'PNG', 10, 10);
    //        doc.save('uygunluk-belgesi.pdf');
    //        document.body.removeChild(tempDiv);
    //    }
    //});
}

function fncUygunlukBelgeGorOpn2(qq) {
    var id = zxc(qq).ustElement(2).attr('data-id'),
        ary = [];
    ary.push(id);
    PostJson('/api/Api_Aykome/GetAraziKontrolUbelge', ary, function (data) {
        if (data.veri4 != null && data.veri4.length > 0)
            zxc('#pnlUygunlukIki').html(data.veri4[data.veri4.length - 1]);

        fncModalAc('#mdlUygunluk2');
    }, function () {
        zxc('#pnlUygunlukIki').html(" ");
    }, function () {

    }, function () {
        fncModalAc('#mdlUygunluk2');
    })
}

function fncUygunlukGeriAlOpn() {
    fncModalSor("Uygunluk Belgesi Güncellensin mı?", "fncUygunlukGeriAlOkk(this)")
}

function fncUygunlukGeriAlOkk(qq) {
    if (slcProjeID != null)
        GetJson('/api/Api_Aykome/SetUygunlukBelgesiGeriAl/' + slcProjeID, function (data) {
            slcProjeID = null;
            fncModalGizle();
            fncIlkAcilis(false);
        })
}
function fncUygunlukBelgeImzalaOpn() {
    fncModalSor("Uygunluk Belgesi İmzalansın mı?<br /> Burası Yapılmadı?", "")
}

function fncUygunlukBelgeImzaGorOpn() {
    fncModalSor("Uygunluk Belgesi Gör<br />Burası Yapılmadı", "")
}

//#endregion

//#region Ek HEsap

function fncRuhsatGuncelle() {
    var q = this,
        w = q.getAttribute('data-ek'),
        tr = q.getAttribute('data-tr'),
        hs = q.getAttribute('data-hs'),
        tp = q.getAttribute('data-tp'),
        kaziid = q.getAttribute('data-kaziid');
    slcProjeID = zxc(q).ustElement(2).attr('data-id');

    ////////////////////////////////////////////////////
    if (kaziid == KaziDurum.AktifKazi) {
        if (w == "false")
            zxc('#btnRgsGun001').attr('class', 'btn btn-primary w-100 mb-1').attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
        else
            zxc('#btnRgsGun001').attr('class', 'btn btn-danger w-100 mb-1').attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-lock');
    }
    else {
        zxc('#btnRgsGun001').attr('class', 'btn btn-danger w-100 mb-1').attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-lock');
    }
    ////////////////////////////////////////////////////
    if (kaziid == KaziDurum.AktifKazi || kaziid == KaziDurum.BitenKazi) {
        zxc('#btnRgsGun002').attr('class', 'btn btn-danger w-100 mb-1').attrSil('data-tip').attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-lock');
    }
    else {
        if (hs == "false")
            zxc('#btnRgsGun002').attr('class', 'btn btn-danger w-100 mb-1').attrSil('data-tip').attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-lock');
        else
            zxc('#btnRgsGun002').attr('class', 'btn btn-primary w-100 mb-1').attr('data-tip', tp).attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
    }
    ////////////////////////////////////////////////////
    if (kaziid == KaziDurum.AktifKazi) {
        if (tr == "false")
            zxc('#btnRgsGun003').attr('class', 'btn btn-danger w-100 mb-1').attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-lock');
        else
            zxc('#btnRgsGun003').attr('class', 'btn btn-primary w-100 mb-1').attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
    }
    else {
        zxc('#btnRgsGun003').attr('class', 'btn btn-danger w-100 mb-1').attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-lock');
    }

    fncModalAc('#mdlGuncelleSecenek');
}
function fncEkHesapOpn() {
    if (slcProjeID != null)
        GetJson('/api/Api_Aykome/GetEkRuhsatBilgileri/' + slcProjeID, function (data) {
            zxc('#pnlEkKaplamaLSt').html(html);

            document.querySelector('#mdlEkHesapMdl #txtRhstGuProjeNo').value = data.veri2;
            document.querySelector('#mdlEkHesapMdl #txtRhstGuOnayTarihi').value = zxc.tarihParse(data.veri5);
            document.querySelector('#mdlEkHesapMdl #txtRhstGuOnayBaslangicTarihi').value = zxc.tarihParse(data.veri6);
            document.querySelector('#mdlEkHesapMdl #txtRhstGuProjeTipi').value = data.veri3;
            document.querySelector('#mdlEkHesapMdl #txtRhstGuTalepEdenKurum').value = data.veri4;
            document.querySelector('#mdlEkHesapMdl #txtRhstGuOnayBitisTarihi').value = zxc.tarihParse(data.veri7);
            document.querySelector('#mdlEkHesapMdl #txtRhstGuKontrolEden').value = document.querySelector('.kkrm4').innerHTML;


            if (data.veri8 != null) {
                var html = '';
                data.veri8.forEach((q, ii) => {
                    var EkEn = '', EkBoy = '', EkDerinlik = '', EkAlan = '';
                    if (q.EkEn != null)
                        EkEn = q.EkEn.toString().replace(".", ",")
                    if (q.EkBoy != null)
                        EkBoy = q.EkBoy.toString().replace(".", ",")
                    if (q.EkDerinlik != null)
                        EkDerinlik = q.EkDerinlik.toString().replace(".", ",")
                    if (q.EkAlan != null)
                        EkAlan = q.EkAlan.toString().replace(".", ",")

                    html = html.concat(`<div class="row mb-1 bgr4e" >
                    <div class="col-md-1 d-flex align-items-center ">
                        <label for="txtEkEn">${ii + 1}</label>
                    </div>
                    <div class="col-md-6 d-flex align-items-center ">
                        <label for="txtEkEn">${q.Tanim}</label>
                    </div>
                    <div class="col-md-1">
                        <input type="text" data-tip-format="tutar" class="form-control form-control-sm text-end txtekalan1" value="${EkEn}">
                    </div>
                    <div class="col-md-1">
                        <input type="text" data-tip-format="tutar" class="form-control form-control-sm text-end txtekalan2" value="${EkBoy}">
                    </div>
                    <div class="col-md-1">
                        <input type="text" data-tip-format="tutar" class="form-control form-control-sm text-end txtekalan4" value="${EkDerinlik}">
                    </div>
                    <div class="col-md-2">
                        <input type="text" class="form-control form-control-sm text-end txtekalan3" data-ref="${q.ID}" value="${EkAlan}" readonly>
                    </div>
                </div>`);
                })
                zxc('#pnlEkKaplamaLSt').html(html);
                zxc('#txtKontrolEdenNotu').value(data.veri9);
            }

            zxc('.txtekalan1').blur(function () {
                var q = this,
                    w = zxc(q).ustElement().birSonrakiElement().ilkElement().value(),
                    e = zxc(q).ustElement().birSonrakiElement().birSonrakiElement().birSonrakiElement().ilkElement().dom,
                    r = q.value;

                if (r == "") {
                    zxc(e).value(" ");
                    return
                }
                else if (w)
                    zxc(e).value((parseFloat(w.replace(",", ".")) * parseFloat(q.value.replace(",", "."))).toFixed(2).replace(".", ","));

            });
            zxc('.txtekalan2').blur(function () {
                var q = this;
                w = zxc(q).ustElement().birOncekiElement().ilkElement().value(),
                    e = zxc(q).ustElement().birSonrakiElement().birSonrakiElement().ilkElement().dom,
                    r = q.value;

                if (r == "") {
                    zxc(e).value(" ");
                    return
                }
                else if (w)
                    zxc(e).value((parseFloat(w.replace(",", ".")) * parseFloat(q.value.replace(",", "."))).toFixed(2).replace(".", ","));

            });
            fncTxtKaplamaEvnt()
            fncModalGizle();
            fncModalAc('#mdlEkHesapMdl');
        })
}

function fncEkHesapHesapKaydet(qq) {
    if (slcProjeID) {
        var jsonArray = [],
            rows = document.querySelectorAll('#pnlEkKaplamaLSt .row'),
            hataMesaji = '';

        rows.forEach((row, index) => {
            var En = row.querySelector('.txtekalan1'),
                Uzunluk = row.querySelector('.txtekalan2'),
                Alan = row.querySelector('.txtekalan3'),
                Derinlik = row.querySelector('.txtekalan4');

            const isEnEmpty = En.value.trim() !== '' && (Uzunluk.value.trim() === '' || Derinlik.value.trim() === '');
            const isUzunlukEmpty = Uzunluk.value.trim() !== '' && (En.value.trim() === '' || Derinlik.value.trim() === '');
            const isDerinlikEmpty = Derinlik.value.trim() !== '' && (En.value.trim() === '' || Uzunluk.value.trim() === '');

            if (isEnEmpty == true || isUzunlukEmpty == true || isDerinlikEmpty == true)
                hataMesaji += `${index + 1} Satır da : Sadece <strong>"En"</strong>, <strong>"Uzunluk"</strong> ve <strong>"Derinlik"</strong> değerlerinden biri girilmişse diğer değerlerde girilmelidir.<br /> `;
            else if (Alan.value.trim() !== '') {
                var entry = {
                    "En": parseFloat(En.value.replace(",", ".")),
                    "Uzunluk": parseFloat(Uzunluk.value.replace(",", ".")),
                    "Alan": parseFloat(Alan.value.replace(",", ".")),
                    "Derinlik": parseFloat(Derinlik.value.replace(",", ".")),
                    "KaplamaRef": parseInt(Alan.getAttribute('data-ref'))
                };
                jsonArray.push(entry);
            }
        });
        if (jsonArray.length == 0) {
            hataMesaji += `Hesaplama için <strong>en az bir tane değer</strong> belirlenmeli!<br />`;
        }
        var nott = zxc('#txtKontrolEdenNotu').value();
        if (nott.trim() == '')
            hataMesaji += `<strong>Kontrol Eden Notu</strong> boş olmamalı!<br /> `;

        if (hataMesaji) {
            MesajVer('Hata Mesajları:<br /> ' + hataMesaji, MesajDurumu.Warning)
        }
        else {
            PostJson('/api/Api_Aykome/SetEkHesapHesapKaydet', {
                ProjeRef: parseInt(slcProjeID),
                ID: -1,
                KaplamaList: jsonArray,
                Nott: nott
            }, function (data) {
                newRuhsatUniqVal = data.veri;
                var RuhsatBedeli = data.veri2,
                    Yil = data.veri3;

                zxc('#mdlOnayVerEk').attr('data-yil', Yil).attr('data-ruhsatbedeli', RuhsatBedeli);

                var IrsaliyeHazir = data.veri4;
                var Yayinlansinmi = data.veri5;
                if (IrsaliyeHazir == false)
                    fncModalSor("<strong>Ek Hesap için </strong>İrsaliyenin hazırlanmasını istiyor musunuz?", "fncEkHspIrsaliyeOlustur(this," + RuhsatBedeli + "," + Yil + ")");
                else if (Yayinlansinmi == false)
                    fncModalSor("<strong>Ek Hesap için </strong>Ruhsatın yayınlanmasını istiyor musunuz?", "fncRuhsatiYayinlaEk(this)")
                else {
                    fncModalGizle();
                    fncModalAc("#mdlOnayVerEk");
                }
            }, function () {
                zxc(qq).attr('disabled', 'disabled').ilkElement('class', 'bx bx-loader')
            }, function () {
                zxc(qq).attrSil('disabled').ilkElement('class', 'bx bx-check')
            }, function () {
                zxc(qq).attrSil('disabled').ilkElement('class', 'bx bx-check')
            })
        }
    }
}

function fncEkHspIrsaliyeOlustur(qq, RuhsatBedeli, Yil) {
    if (slcProjeID != "")
        PostJson('/api/Api_Aykome/GetIrsaliyeEk',
            {
                ProjeRef: slcProjeID,
                newRuhsatUniqVal: newRuhsatUniqVal,
                RuhsatBedeli: RuhsatBedeli,
                Yil: Yil
            }, function (data) {
                document.getElementById("canvasIrsaliyeEk").innerHTML = "";
                fncModalGizle();
                var IrsaliyeOut = data.veri;
                var IrsaliyeEkOut = data.veri2;
                pdfData = fncSerIrsaliyePdf(IrsaliyeOut.Basvurusahibi, IrsaliyeOut.Projeno, IrsaliyeOut.AltyapiKaziIzniHarci, IrsaliyeOut.RuhsatBedeliYil, IrsaliyeOut.GenelToplam, IrsaliyeOut.Birim, IrsaliyeOut.TeminatToplam, IrsaliyeOut.YolYipToplam
                    , IrsaliyeEkOut.TeminatToplam, IrsaliyeEkOut.YolYipToplam, IrsaliyeEkOut.AltyapiKaziIzniHarci, IrsaliyeEkOut.GenelToplam);
                // pdfMake.createPdf(pdfData).download('Teslimat_Irsaliyesi.pdf');
                pdfMake.createPdf(pdfData).getDataUrl(function (dataURL) {
                    renderPDF(dataURL, document.getElementById("canvasIrsaliyeEk"));
                });
                fncModalAc("#mdlIrsaliyeEk");
            }, function () {
                zxc(qq).attr('disabled', 'disabled')
            }, function () {
                zxc(qq).attrSil('disabled')
            })
}

function fncIrsaliyeTamamEk() {
    fncModalSor("<strong>Ek Hesap için </strong>Ruhsatın yayınlanmasını istiyor musunuz?", "fncRuhsatiYayinlaEk(this)")
}

function fncRuhsatiYayinlaEk(qq) {
    if (slcProjeID != "")
        PostJson('/api/Api_Aykome/SetRuhsatYayinlaEk',
            {
                ProjeRef: slcProjeID,
                newRuhsatUniqVal: newRuhsatUniqVal,
                RuhsatBedeli: true,
                Yil: new Date().getFullYear()
            }, function (data) {
                var bugun = new Date();
                var onGunSonra = new Date(bugun);
                onGunSonra.setDate(bugun.getDate() + 10);
                var OnaylananBaslagic = bugun.toISOString().slice(0, 10);
                var OnaylananBitis = onGunSonra.toISOString().slice(0, 10);
                document.getElementById('txtOnayBasTarhiEk').value = OnaylananBaslagic.substr(0, 10);
                document.getElementById('txtOnayBitTarhiEk').value = OnaylananBitis.substr(0, 10);
                fncModalGizle();
                fncModalAc("#mdlOnayVerEk");
            }, function () {
                zxc(qq).attr('disabled', 'disabled')
            }, function () {
                zxc(qq).attrSil('disabled')
            })
}

function fncRuhsatiOnaylaEk(q) {
    if (slcProjeID != "")
        PostJson('/api/Api_Aykome/SetOnayVermekEk',
            {
                ProjeRef: slcProjeID,
                Obastar: zxc('#txtOnayBasTarhiEk').value(),
                Obittar: zxc('#txtOnayBitTarhiEk').value(),
                Mesaj: zxc('#txtOnayAciklamaEk').value(),
                newRuhsatUniqVal: newRuhsatUniqVal,
                RuhsatBedeli: zxc('#mdlOnayVerEk').attr('data-ruhsatbedeli') == "true" ? true : false,
                Yil: parseInt(zxc('#mdlOnayVerEk').attr('data-yil')),
                Aciklama: zxc('#txtOnayAciklamaEk').value(),
            }, function (data) {
                fncModalGizle();
                fncIlkAcilis(false);
            }, function () {
                zxc(q).attr('disabled', 'disabled')
            }, function () {
                zxc(q).attrSil('disabled')
            })
}



function fncHesapTarhOpn(q) {

    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/GetOnayTarihiniDat/' + slcProjeID, function (data) {
            fncModalGizle();
            document.getElementById('txtOnayBasTarhiGn').value = data.veri.substr(0, 10);
            document.getElementById('txtOnayBitTarhiGn').value = data.veri2.substr(0, 10);
            fncModalAc('#mdlOnaytarihGunc');
        }, function () {
            zxc(q).attr('disabled', 'disabled')
        }, function () {
            zxc(q).attrSil('disabled')
        })
}
function fncRuhsatiOnaylaGn(q) {
    if (slcProjeID != "")
        GetJson('/api/Api_Aykome/SetOnayTarihiniGunc/' + slcProjeID + '/' + zxc('#txtOnayBasTarhiGn').value() + '/' + zxc('#txtOnayBitTarhiGn').value(), function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        }, function () {
            zxc(q).attr('disabled', 'disabled')
        }, function () {
            zxc(q).attrSil('disabled')
        })
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


function fncHesapGunclOpn(v) {
    // 🔹 Tıklanan satırdan ProjeRef'i al
    slcProjeID = zxc(v).attr("data-id") || slcProjeID;

    // 🔹 Tip bilgisini kontrol et — yoksa "onaylanan" ata
    var tip = zxc(v).attr("data-tip") || "onaylanan";

    // 🔹 Butona tip bilgisini kaydet
    zxc('#btnRgsGun002').attr('data-tip', tip);

    // 🔹 ProjeID kontrolü
    if (slcProjeID != null && slcProjeID !== "") {
        GetJson('/api/Api_Aykome/GetRuhsatHesapDegBil/' + slcProjeID + '/' + tip, function (data) {
            fncModalGizle();

            if (data.veri2 != null) {
                var html = '<option value="">Seç</option>';
                data.veri2.forEach(gq => {
                    html += `<option value="${gq}">${gq}</option>`;
                });

                document.getElementById('txtRuhstfiyatYiliGun').innerHTML = html;
                zxc('#txtRuhstfiyatYiliGun').selectbox(data.veri3);
            }

            zxc('#yolYipranmaGun').dom.checked = data.veri.YolYipRanmaBedel == "E";
            zxc('#ruhsatBedeliGun').dom.checked = data.veri.RuhsatBedel == "E";
            zxc('#teminatBedeliGun').dom.checked = data.veri.TeminatBedel == "E";
            zxc('#kaziDolguBedeliGun').dom.checked = data.veri.KaziDolguBedel == "E";
            zxc('#kaplamaBedeliGun').dom.checked = data.veri.KaplamaBedel == "E";
            zxc('#altyapikaziizinharciGun').dom.checked = data.veri.AltyapiKaziIzinHarci == "E";

            // 🔹 Modal açılıyor
            fncModalAc('#mdlRuhHespGuncelle');

        }, function () {
            zxc(v).attr("disabled", "disabled");
        }, function () {
            zxc(v).attrSil("disabled");
        });
    } else {
        console.warn("⚠️ slcProjeID null veya boş! Satırdaki data-id kontrol edilmeli.");
    }
}


function fncHesapGunclKaydet(q) {
    if (slcProjeID != "")
        PostJson('/api/Api_Aykome/SetRuhsatHesapGuncelleme/' + slcProjeID + '/' + zxc('#btnRgsGun002').attr('data-tip'), {
            YolYipranma: zxc('#yolYipranmaGun').dom.checked,
            RuhsatBedeli: zxc('#ruhsatBedeliGun').dom.checked,
            TeminatBedeli: zxc('#teminatBedeliGun').dom.checked,
            KaziDolguBedeli: zxc('#kaziDolguBedeliGun').dom.checked,
            KaplamaBedeli: zxc('#kaplamaBedeliGun').dom.checked,
            AltYapiKaziIzinHarci: zxc('#altyapikaziizinharciGun').dom.checked,
            Yil: zxc('#txtRuhstfiyatYiliGun').selectboxSecilenIndex().value
        }, function (data) {
            fncModalGizle();
            fncIlkAcilis(false);
        }, function () {
            zxc(q).attr('disabled', 'disabled');
            zxc(q).ilkElement().attr('class', 'bx bx-loader')
        }, function () {
            zxc(q).attrSil('disabled');
            zxc(q).ilkElement().attr('class', 'bx bx-check')
        });
}

function fncModalSor(Govde, fncEvent) {
    zxc('#mdlSorBod').html(" ");
    zxc('#mdlSorBtn').attrSil('onclick');
    if (Govde)
        zxc('#mdlSorBod').html(Govde);
    if (fncEvent)
        zxc('#mdlSorBtn').attr('onclick', fncEvent);
    fncModalGizle();

    fncModalAc('#mdlSor');
}

function fncSekmedeAra(ProjeNo) {
    var q = document.querySelector('.tab-pane.fade.active.show .prjnoo[data-no="' + ProjeNo + '"]');
    if (q != null) {
        var tr = zxc(q).ustElement().dom;
        tr.scrollIntoView({ behavior: 'smooth' });
        gsap.fromTo(tr, { backgroundColor: "#ffcb003b" }, { backgroundColor: "#ffcb0075", duration: 1.5 });
        gsap.to(tr, { backgroundColor: "#ffffff", duration: 0.5, delay: 1 });
    }
    else
        MesajVer("Açık Sekmede Bir Sonuç Bulunamadı!", MesajDurumu.Warning);
}

//#region E_Imza

//function fncImzaStart() {
//    setTimeout(function () {
//        dangildanSertifikaOku();
//    }, 1000)
//    // zxc("#imzaBilgisiModalImzala").click(BelgEImzala);
//}

//const ImzaTipi = {
//    KaziRuhsati: "KaziRuhsati",
//    Irsaliye: "Irsaliye",
//    UygunlukBelgesi: "UygunlukBelgesi"
//}

//function fncImzaModalAc(ImzaTipi, refID) {
//    //zxc('#btnEimzalama').attr({
//    //    "data-imza-tipi": ImzaTipi,
//    //    "data-ref-id": refID
//    //});
//    //fncModalAc("#mdlEImza");
//    //zxc("#btnEimzalama").click(fncBelgEImzala);
//}

//var certf;
//function dangildanSertifikaOku() {

//    $("#spinnerAciklamaGir").text("Dangıl Üzerinden Sertifikalar Okunuyor. Lütfen Bekleyiniz...");
//    $(".islem-loading").toggleClass('sk-loading');


//    // Set ArkSigner license key.
//    // pwsigner.setLicenseKey('OFxam9q8GBxE80x0JxBWgnxa9doaSCpnPS6JGT/ref1J89XPzet+8/EhdlrFoxYCvSfQKhnQNtDVHNpXrflhTbuFWTqnmMXTGswBeZnzeVYri+QH2xhPrMAcH12Zm23HNbfhphM/S0FBDkf2CSw7sgjfQIK2vRKC9ukD0ZYpJztqtuUAu0QJkrPJXXtWSsWk0h/5ny/Klp7fPUL1AfDnRJpSQV94fhWzjFxehdaVlQy1JHFWl7X73AI8jBz/Dx2I+WhwkJ0M0GDEshhWLwlvgBtSeRG6J6PHUM03TWJedW5Df5K2yCxmLh7Kch1t2DRNamIYtLqr80iQZct+DE2snQ==');

//    // Assign ArkSigner init event.
//    pwsigner.initialize(onPWSigner_Initialize);

//    /////////////////////////////////////////////
//    // ArkSigner Callbacks
//    /////////////////////////////////////////////
//    function onPWSigner_Initialize(code, json) {
//        if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
//            $("#arkStatus").text("ArkSigner başarı ile yüklendi");

//            // List devices.
//            pwsigner.smartCard.listTerminals(onPWSigner_ListTerminals, {});
//        } else {
//            var _error = processErrorCode(code, json);
//            UyariVer("Hata", _error, false, 10000);
//        }
//    }
//    function onPWSigner_ListTerminals(code, json) {
//        if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
//            $("#arkStatus").text("ArkSigner device list success");

//            var terminals = pwsigner.parseJSON(json);

//            $.each(terminals, function (index, element) {

//                var o = new Option(Base64.decode(element.terminal), Base64.decode(element.slotId) + ',' + Base64.decode(element.library));
//                //$(o).html(Base64.decode(element.terminal));
//                $("#Cihaz_Id").append(o);
//                $("#Cihaz_Id:first-child").text(Base64.decode(element.terminal));
//                $("#Cihaz_Id:first-child").val(Base64.decode(element.slotId) + ',' + Base64.decode(element.library));

//                // List certs.
//                pwsigner.smartCard.listCertificates(onPWSigner_ListCertificates, {
//                    library: Base64.decode(element.library),
//                    slotId: Base64.decode(element.slotId)
//                });
//            });
//        } else {
//            var _error = processErrorCode(code, json);
//            UyariVer("Hata", _error, false, 10000);
//        }
//    }

//    function onPWSigner_ListCertificates(code, json) {

//        if (code == PWSigner.prototype.codes.RESPONSE_SUCCESSFUL) {
//            $("#arkStatus").text("ArkSigner cert list success");

//            var certs = pwsigner.parseJSON(json);

//            $(certs).each(function (index, element) {
//                var o = new Option(Base64.decode(element.commonName), Base64.decode(element.serialNumber) + ',' + hexToBase64(element.certificateHex));
//                //$(o).html(Base64.decode(element.commonName));
//                $("#Sertifika_Id").append(o);
//                $("#Sertifika_Id:first-child").text(Base64.decode(element.commonName));
//                $("#Sertifika_Id:first-child").val(Base64.decode(element.serialNumber) + "," + hexToBase64(element.certificateHex));

//            });
//        } else {
//            var _error = processErrorCode(code, json);
//            UyariVer("Hata", _error, false, 10000);
//        }
//    }
//    ////////////////////////////////////////////////////////////////
//    //   ArkSigner RESPONSE CODE MESSAGES
//    ////////////////////////////////////////////////////////////////
//    var textMessages = [];

//    textMessages[PWSigner.prototype.codes.RESPONSE_SUCCESSFUL] = 'Islem basari ile gerçeklestirilmistir.';
//    textMessages[PWSigner.prototype.codes.ERROR_NO_CLIENT] = 'ArkSigner Uygulamasi Bulunamamistir. Bilgisayariniza indirmek için <a href="http://arksigner.com/indir" target="_blank">tiklayiniz</a>';
//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_INITIALIZE_SIGNER] = 'ArkSigner Uygulamasi Baslatilamamistir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_LOAD_LICENSE] = 'ArkSigner Lisansi Geçersizdir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_START_PWSIGNER_CLIENT] = 'ArkSigner Uygulamasi Baslatilamamistir.';
//    textMessages[PWSigner.prototype.codes.ERROR_INVALID_CERTIFICATE] = 'Kullanmak istediginiz sertifika geçersizdir.';
//    textMessages[PWSigner.prototype.codes.ERROR_INVALID_CERTIFICATE_SERIAL_NUMBER] = 'Kullanmak istediginiz sertifikanin seri numarasi geçersizdir.';
//    textMessages[PWSigner.prototype.codes.ERROR_NO_SIGNING_CERTIFICATE_FOUND] = 'Herhangi bir imzalama sertifikasi bulunamamistir.';
//    textMessages[PWSigner.prototype.codes.ERROR_NO_TERMINAL_FOUND] = 'Takili herhangi bir akilli kart bulunamamistir.';
//    textMessages[PWSigner.prototype.codes.ERROR_NO_TERMINAL_FOR_PROVIDED_SLOT_ID_AND_CARD_TYPE] = 'Geçersiz slot numarasi ve kart tipi.';
//    textMessages[PWSigner.prototype.codes.ERROR_SIGNER_IS_NOT_INITIALIZED] = 'ArkSigner uygulamasi baslatilmamistir.';
//    textMessages[PWSigner.prototype.codes.ERROR_SMART_CARD_EXCEPTION] = 'Akilli kart uygulamasi hatasi.';
//    textMessages[PWSigner.prototype.codes.ERROR_UNDEFINED_SIGNER_EXCEPTION] = 'Tanimsiz hata. Site yöneticisi ile iletisime geçiniz.';

//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_LOAD_POLICY_FILE] = 'e-imza politikasi dosyasi yüklenememektedir.';

//    textMessages[PWSigner.prototype.codes.ERROR_INVALID_CMS_CONTENT_TO_SIGN] = 'Imzalanmak istenen veri geçersizdir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_SET_SIGNING_TIME] = 'Imzalama zamani set edilememektedir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_LOGIN_TO_THE_SIGNER] = 'Akilli karta login olunamamaktadir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_SIGN_CMS_DOCUMENT] = 'Veri imzalanamamaktadir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_LOGOUT_SIGNER] = 'Akilli karttan logout olunamamaktadir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CANNOT_VALIDATE_CERTIFICATE] = 'Imzalama sertifikasi dogrulanamamaktadir.';

//    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_REVOCATION_CHECK_FAILURE] = 'Imzalama sertifikasi geçerliligi kontrol edilememektedir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_SELF_CHECK_FAILURE] = 'Imzalama sertifikasi geçerliligi kontrol edilememektedir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_NO_TRUSTED_CERT_FOUND] = 'Akilli Kart Üzerinde Geçerli Imzalama Sertifikasi Bulunmamaktadir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_PATH_VALIDATION_FAILURE] = 'Imzalama sertifikasi zinciri dogrulanamamaktadir.';
//    textMessages[PWSigner.prototype.codes.ERROR_CERTIFICATE_NOT_CHECKED] = 'Imzalama sertifikasi geçerliligi kontrol edilememektedir.';
//    textMessages[PWSigner.prototype.codes.ERROR_INVALID_URL] = 'Lisans ile farkli bir adres üzerinden uygulamayi çalistirmaya çalisiyorsunuz.';
//    textMessages[PWSigner.prototype.codes.ERROR_INVALID_PIN] = 'Hatali sifre girdiniz.';
//    textMessages[PWSigner.prototype.codes.ERROR_NO_DRIVER_FOUND] = 'Yüklü driver bulunamamistir.';
//    textMessages[PWSigner.prototype.codes.ERROR_NO_EXTENSION] = 'You are currently using Chrome Browser. The PW WebSigner Extension is not installed yet. If you would like to sign documents, please install the extension first. If you confirm, a new tab with the installation page will be opened.';


//    textMessages[PWSigner.prototype.codes.ERROR_NOT_BROWSER_CHROME] = 'Lütfen Chrome tarayici kullaniniz.';
//    textMessages[PWSigner.prototype.codes.ERROR_DISCONNECT] = '';
//    textMessages[PWSigner.prototype.codes.ERROR_UNDEFINED] = 'Tanimsiz Hata. Lütfen web sitesi yöneticileri ile iletisime geçiniz.';
//    textMessages[PWSigner.prototype.codes.ERROR_PIN_LOCKED] = 'PIN bloke edilmis. Kullanmak için blokeyi kaldiriniz.';
//    textMessages[PWSigner.prototype.codes.ERROR_TASK_TIMEOUT] = 'Islem zaman asimina ugramistir.';
//    textMessages[PWSigner.prototype.codes.ERROR_NO_PRIVATE_KEY_FOUND_CORRESPONDING_TO_PUBLIC_KEY] = 'Seçili Sertifika ile iliskilendirilmis imzalama anahtari bulunamamistir. Sistem Yetkilisi ile iletisime geçiniz.';

//    function hexToBase64(str) {
//        $(".islem-loading").removeClass('sk-loading');
//        $('#imzaBilgisiModal').modal('show');
//        $("#imzaBilgisiModalImzala").prop("disabled", false);
//        return btoa(String.fromCharCode.apply(null,
//            str.replace(/\r|\n/g, "").replace(/([\da-fA-F]{2}) ?/g, "0x$1 ").replace(/ +$/, "").split(" "))
//        );
//    }

//    function processErrorCode(code, json) {
//        $(".islem-loading").removeClass('sk-loading');

//        $('#imzaBilgisiModal').modal('hide');

//        var text = textMessages[code];
//        if (!text) {
//            text = 'Tanimsiz hata: ' + code;
//        }
//        return text;
//    }

//    function createHexString(arr) {
//        var result = "";
//        var z;

//        for (var i = 0; i < arr.length; i++) {
//            var str = arr[i].toString(16);

//            z = 8 - str.length + 1;
//            str = Array(z).join("0") + str;

//            result += str;
//        }

//        return result;
//    }
//}

//function fncBelgEImzala() {
//    var q = this,
//        imzaTipi = zxc(q).attr('data-imza-tipi'),
//        refID = zxc(q).attr('data-ref-id');


//    var _certValue = $('#Sertifika_Id').val().split(',');
//    var sertifikaBase64 = _certValue[1];
//    var _pincode = $('#Sifre').val();

//    //formData = new FormData();

//    //formData.append("sertifikaBase64", sertifikaBase64);

//    //var file = document.getElementById("Dosya").files[0];
//    //formData.append("Dosya", file);

//    var param = {
//        ImzaTipi: imzaTipi,
//        refID: refID,
//        sertifikaBase64: sertifikaBase64
//    }
//    PostJson("/api/Imza/ImzaInitialize", param, function (resultData) {
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
//                            url: "/api/Imza/ImzaFinalize",
//                            dataType: "json",
//                            data: {
//                                'transactionUuid': transactionUUID,
//                                'signatureBase64': signatureBase64,
//                                'islemDurumId': 0
//                            },
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
//    })
//    //$.ajax({
//    //    type: "POST",
//    //    url: "/api/Imza/ImzaInitialize",
//    //    dataType: "json",
//    //  /*  data: formData,*/
//    //    data: param,
//    //    contentType: false,
//    //    processData: false,
//    //    async: false,
//    //    success: function (resultData) {

//    //    }
//    //});


//}
//#endregion



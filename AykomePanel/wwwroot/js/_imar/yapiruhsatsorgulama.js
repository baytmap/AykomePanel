
var  toplamKayit = 0, excData = [];

zxc.baslarken(function () {
    fncIlkAcilis(true);

    zxc("#btnVeriAra").click(function () {
        fncIlkAcilis();
    });
  
    zxc("#btnIkiYilDolRuh").click(fncOpnDtModal);
    zxc("#btnJeoloji").click(fncOpnDtModal2);
    fncTblHeight();
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
    var btnSarch = zxc("#btnVeriAra").dom;
    PostJson('/api/Api_Imar/GetYapiRuhsatLst', {
        Tanim: Tanim,
        IlceID: zxc('#slcIlce').selectboxSecilenIndex().value || null,
        MahalleID: zxc('#slcMahalle').selectboxSecilenIndex().value || null,
        CaddeSokakID: zxc('#slcCaddeSoka').selectboxSecilenIndex().value || null,
        RuhsatVerAmc: zxc('#slcRuhsatVerAmc').selectboxSecilenIndex().value || null,
        RuhsatVerKurumID: zxc('#slcRuhsatVerKurm').selectboxSecilenIndex().value || null,
        YapiSahibi: zxc('#txtYapiSahibi').value() || null,
        YapiMuteahhidi: zxc('#txtYapiMuteahhidi').value() || null,
        Pafta: zxc('#txtPafta').value() || null,
        Ada: zxc('#txtAda').value() || null,
        Parsel: zxc('#txtParsel').value() || null,

        //IsitmaSistemiID: zxc('#slcIsitmaSistemi').selectboxSecilenIndex().value || null,
        //YakitCinsiID: zxc('#slcYakitCinsi').selectboxSecilenIndex().value || null,
        //TasiyiciSitemID: zxc('#slcTasiyiciSitem').selectboxSecilenIndex().value || null,

        //YDKAdi: zxc('#txtYDKAdi').value() || null,
        //YDKYetkilisiAdi: zxc('#txtYDKYetkilisiAdi').value() || null,

        //ToplamYapiSayisi: zxc('#txtToplamYapiSayisi').value().trim() || null,
        //ToplamBBSayisi: zxc('#txtToplamBBSayisi').value().trim() || null,
        //ToplamDaireSayisi: zxc('#txtToplamDaireSayisi').value().trim() || null,
        //ToplamTalan1: zxc('#txtToplamTalan1').value().trim() || null,
        //ToplamTalan2: zxc('#txtToplamTalan2').value().trim() || null,
        //ToplamYapi1: zxc('#txtToplamYapi1').value().trim() || null,
        //ToplamYapi2: zxc('#txtToplamYapi2').value().trim() || null,
        //ToplamYapiSnf1: zxc('#txtToplamYapiSnf1').value().trim() || null,
        //ToplamYapiSnf2: zxc('#txtToplamYapiSnf2').value().trim() || null,
        //KotUstYuksek: zxc('#txtKotUstYuksek').value().trim() || null,
        //ToplamKatYuk1: zxc('#txtToplamKatYuk1').value().trim() || null,
        //ToplamKatYuk2: zxc('#txtToplamKatYuk2').value().trim() || null,
        //ToplM21: zxc('#txtToplM21').value().trim() || null,
        //ToplM22: zxc('#txtToplM22').value().trim() || null,
        //YapiMalyt1: zxc('#txtYapiMalyt1').value().trim() || null,
        //YapiMalyt2: zxc('#txtYapiMalyt2').value().trim() || null,
        //FDKMalyt1: zxc('#txtYapiFDKMalyt1').value().trim() || null,
        //FDKMalyt2: zxc('#txtYapiFDKMalyt2').value().trim() || null,

        IskanSlc: zxc('#rdyIskan1').dom.checked == true ? 1 : (zxc('#rdyIskan2').dom.checked == true ? 2 : (zxc('#rdyIskan3').dom.checked == true ? 3 : -1)) ,

        OnayTarihi: zxc('#txtOnayTarihi').value().trim() || null,
        OnayTarihi2: zxc('#txtOnayTarihi2').value().trim() || null,
        InsBasTar: zxc('#txtInsBasTar').value().trim() || null,
        InsBitTar: zxc('#txtInsBitTar').value().trim() || null,
        RuhGecTar: zxc('#txtRuhGecTar').value().trim() || null,
        ParselKullanimi: zxc('#txtParselKullanimi').value().trim() || null

        //PrMuMimar: zxc('#txtPrMuMimar').value().trim() || null,
        //PrMuStatik: zxc('#txtPrMuStatik').value().trim() || null,
        //PrMuElektirik: zxc('#txtPrMuElektirik').value().trim() || null,
        //PrMuMekanik: zxc('#txtPrMuMekanik').value().trim() || null,

        //FenniMesMimar: zxc('#txtFenniMesMimar').value().trim() || null,
        //FenniMesStatik: zxc('#txtFenniMesStatik').value().trim() || null,
        //FenniMesElektirik: zxc('#txtFenniMesElektirik').value().trim() || null,
        //FenniMesMekanik: zxc('#txtFenniMesMekanik').value().trim() || null
    }, function (data) {
        var html;
        if (Tanim) {
            if (data.veri2 != null) {
                html = '<option value="">Seç</option>';
                data.veri2.forEach(q =>
                    html = html.concat(`<option value="${q.ILCEREF}">${q.TANIM}</option>`));
                document.getElementById('slcIlce').innerHTML = html;
                document.getElementById('slcIlce').onchange = fncIlceSecildiginde;
            }
            if (data.veri3 != null) {
                html = '<option value="">Seç</option>';
                data.veri3.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcCaddeSoka').innerHTML = html;
            }
            if (data.veri4 != null) {
                html = '<option value="">Seç</option>';
                data.veri4.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcRuhsatVerAmc').innerHTML = html;
            }

            if (data.veri5 != null) {
                html = '<option value="">Seç</option>';
                data.veri5.forEach(q =>
                    html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
                document.getElementById('slcRuhsatVerKurm').innerHTML = html;
            }
            //if (data.veri6 != null) {
            //    html = '<option value="">Seç</option>';
            //    data.veri6.forEach(q =>
            //        html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            //    document.getElementById('slcIsitmaSistemi').innerHTML = html;
            //}

            //if (data.veri7 != null) {
            //    html = '<option value="">Seç</option>';
            //    data.veri7.forEach(q =>
            //        html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            //    document.getElementById('slcYakitCinsi').innerHTML = html;
            //}

            //if (data.veri8 != null) {
            //    html = '<option value="">Seç</option>';
            //    data.veri8.forEach(q =>
            //        html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            //    document.getElementById('slcTasiyiciSitem').innerHTML = html;
            //}
        }
        if (data.veri != null) {
            html = '';
            data.veri.forEach(q =>
                html = html.concat(`<tr>
                                    <td>${q.KayitNo}</td>
                                    <td>${q.KurumRef}</td>
                                    <td>${q.NumaratajRef}</td>
                                    <td>${q.AdaNo}</td>
                                    <td>${q.ParselNo}</td>
                                    <td>${q.RuhsatNo}</td>
                                    <td>${q.RuhsatTarihi}</td>
                                    <td>${q.RuhsatAmaci}</td>
                                    <td>${q.InsaatBitirmeTarihi}</td>
                                    <td>${q.YapiSahibi}</td>
                                    <td>${q.Ilce}</td>
                                    <td>${q.Mahalle}</td>
                                    <td>${q.CaddeSokak}</td>
                                    <td>${q.DisKapiNo}</td>
                                    <td>${q.IskanDurumu}</td>
                    </tr>`));
            zxc('#tblData').html(html);
            
            var ar2 = ["KayitNo", "KurumRef", "NumaratajRef", "AdaNo", "ParselNo", "RuhsatNo", "RuhsatTarihi", "RuhsatAmaci", "InsaatBitirmeTarihi", "YapiSahibi", "Ilce", "Mahalle", "CaddeSokak", "DisKapiNo", "IskanDurumu"];
            excData.push(ar2);
            data.veri.forEach(function (q) {
                var ar = [q.KayitNo, q.KurumRef, q.NumaratajRef, q.AdaNo, q.ParselNo, q.RuhsatNo, q.RuhsatTarihi, q.RuhsatAmaci, q.InsaatBitirmeTarihi, q.YapiSahibi, q.Ilce, q.Mahalle, q.CaddeSokak, q.DisKapiNo, q.IskanDurumu];
                excData.push(ar)
            });
        }
    }, function () {
        zxc("#btnVeriAra").attr('disabled', 'disabled');
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblData').html(" ");
        excData = [];
    }, function () {
        zxc("#btnVeriAra").attrSil('disabled');
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}

function fncIlceSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/AbsApi/GetMahalle/' + q, function (data) {
            if (data.veri != null) {
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.MAHALLEREF}">${q.TANIM}</option>`));
                document.getElementById('slcMahalle').innerHTML = html;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcMahalle').innerHTML = html;
        }, function () {
        })
    }
}

function fncOpnDtModal() {
    fncModalAc("#mdlVeri");

    zxc('#slcRuhsatTakipNo').value(q.RuhsatTakipNo);
    zxc('#slcNumaratajRef').value(q.NumaratajRef);
    zxc('#slcIl').value(q.Il);
    zxc('#slcIlce').value(q.Ilce);
    zxc('#slcBucak').value(q.Bucak);
    zxc('#slcKoy').value(q.Koy);
    zxc('#slcBelediye').value(q.Belediye);
    zxc('#slcMahalle').value(q.Mahalle);
    zxc('#slcCaddeSokak').value(q.CaddeSokak);
    zxc('#slcBinaNo').value(q.BinaNo);
    zxc('#slcBlokNo').value(q.BlokNo);
    zxc('#slcAdaNo').value(q.AdaNo);
    zxc('#slcParselNo').value(q.ParselNo);
    zxc('#slcZeminEmniyetSayisi').value(q.ZeminEmniyetSayisi);
    zxc('#slcYatakKatSayisi').value(q.YatakKatSayisi);
    zxc('#slcZeminGrubu').value(q.ZeminGrubu);
    zxc('#slcZeminSinifi').value(q.ZeminSinifi);
    zxc('#slcGuncelleyenAdiSoyad').value(q.GuncelleyenAdiSoyad);
    zxc('#slcGuncelleyenTarihi').value(q.GuncelleyenTarihi);
    zxc('#slcRuhsatVerenKurum').value(q.RuhsatVerenKurum);
    zxc('#slcRuhsatNo').value(q.RuhsatNo);
    zxc('#slcOnayKodu').value(q.OnayKodu);
    zxc('#slcVerilisAmaci').value(q.VerilisAmaci);
    zxc('#slcRuhsatOnayTarihi').value(q.RuhsatOnayTarihi);
    zxc('#slcIlkRuhsatNo').value(q.IlkRuhsatNo);
    zxc('#slcIlkRuhsatTarihi').value(q.IlkRuhsatTarihi);
    zxc('#slcImarPlaniOnayTarihi').value(q.ImarPlaniOnayTarihi);
    zxc('#slcParselasyonPlaniOnayTarihi').value(q.ParselasyonPlaniOnayTarihi);
    zxc('#slcImarDurumNo').value(q.ImarDurumNo);
    zxc('#slcImarDurumTarihi').value(q.ImarDurumTarihi);
    zxc('#slcParselinKullanmaAmaci').value(q.ParselinKullanmaAmaci);
    zxc('#slcParselinAlaniM2').value(q.ParselinAlaniM2);
    zxc('#slcTapuTescilBelegesiVerenKurumID').selectbox(q.TapuTescilBelegesiVerenKurumID);
    zxc('#slcTapuTescilBelegesiNoYevmiye').value(q.TapuTescilBelegesiNoYevmiye);
    zxc('#slcTapuTescilBelegesiTarihi').value(q.TapuTescilBelegesiTarihi);
    zxc('#slcZeminEtuduOnayTarihi').value(q.ZeminEtuduOnayTarihi);
    zxc('#slcCedRaporuOnyaTarihi').value(q.CedRaporuOnyaTarihi);
    zxc('#slcPlanlananInsaatBitirmeTarihi').value(q.PlanlananInsaatBitirmeTarihi);
    zxc('#slcRuhsatGecerlilikTarihi').value(q.RuhsatGecerlilikTarihi);

   

}

function fncOpnDtModal2() {
    fncModalAc("#mdlVeri2");
}
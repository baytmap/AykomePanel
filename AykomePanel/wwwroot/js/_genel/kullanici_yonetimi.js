
var veriList = [], slcUserID = null, id = null;

zxc.baslarken(function () {
    fncIlkAcilis(true);
    fncTblHeight();
    zxc('#btnKaydet').click(fncKullaniciEdit);
    zxc('#filMusteriFotograf').change(fncMustResmYuk);
    zxc('#btnSil').click(fncVerDelete);
    zxc('#btnMdlWfs').click(function () {
        slcUserID = null;
        document.getElementById('filMusteriFotograf').value = "";
        zxc('#slcKurum,#slcBirim').selectbox('-1')
        zxc('#txtAdiSoyadi,#txtKullaniciAdi,#txtKullaniciSifre').value(" ");
        zxc(".hesap-logo").html(' ');
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
    GetJson('/api/Api_Genel/GetKullaniciList/' + Tanim, function (data) {
        var html;
        if (data.veri != null) {
            veriList = data.veri;
            fncTblYazdir(data.veri)
        }
        if (data.veri2 != null) {
            html = '<option value="-1">Seç</option>';
            data.veri2.forEach(q => html = html.concat(`<option value="${q.Key}">${q.Val}</option>`));
            document.getElementById('slcKurum').innerHTML = html;
            document.getElementById('slcKurum').onchange = fncKurumSecildiginde;
        }
        if (data.veri3)
            rolLst = data.veri3;


    }, function () {
        zxc('.tblload:0').attrSil('hidden');
        zxc('#tblData').html(" ");
        veriList = [];
    }, function () {
        zxc('.tblload:0').attr('hidden', 'hidden');
    })
}

function fncTblYazdir(data) {
    html = '';
    var dt = data;
    for (var i = 0; i < dt.length; i++) {
        html = html.concat(`<tr data-id="${dt[i].id}">
                        <td class="wdt-kucuk"><img src="${dt[i].resim == null ? "/img/user-no-photo.jpg" : baseResimUrl + dt[i].resim}" class="imglarg rounded-circle imgPhoto"/></td>
                        <td class="wdt-kucuk">${dt[i].id}</td>
                        <td>${dt[i].AykBirim.KurumAd ?? ""}</td>
                        <td>${dt[i].AykBirim.Birim ?? ""}</td>
                        <td>${dt[i].adsoyad}</td>   
                        <td>${dt[i].kullaniciadi}</td>   
                        <td>${dt[i].gsmno}</td>   
                        <td>${dt[i].Aktif == true ? "<span class='badge text-bg-success'>Aktif</span>" : "<span class='badge text-bg-danger'>Pasif</span>"}</td>   
                        <td class="wdt-kucuk text-end">
                        <button input="button" class="btn btn-sm btn-warning btnEdt"><span class="bx bx-edit"></span></button>
                        </td>
                        </tr>`)
    }
    zxc('#tblData').html(html);
    zxc('.btnEdt').click(fncOpnDtModal);
   // zxc('.btnSil').click(fncOpnDeleteModal); <button input="button" class="btn btn-sm btn-danger btnSil"><span class="bx bxs-message-alt-x"></span></button>
}

function fncKullaniciEdit() {
    var hata = false,
        q = this,
        slcKurum = zxc('#slcKurum').dom,
        slcBirim = zxc('#slcBirim').dom,
        txtAdiSoyadi = zxc('#txtAdiSoyadi').dom,
        txtKullaniciAdi = zxc('#txtKullaniciAdi').dom,
        txtKullaniciSifre = zxc('#txtKullaniciSifre').dom,
        txtAktiflik = zxc('#txtAktiflik').dom.checked,
        resim = zxc('.imgresw').dom.src,
        gsmno = zxc('#txtgsmno').value();

    if (degerleriKontrolEt(slcKurum, slcKurum.value))
        hata = true;

    if (degerleriKontrolEt(slcBirim, slcBirim.value))
        hata = true;

    if (degerleriKontrolEt(txtAdiSoyadi, txtAdiSoyadi.value))
        hata = true;

    if (degerleriKontrolEt(txtKullaniciAdi, txtKullaniciAdi.value))
        hata = true;

    if (gsmno != "") {
        if (/^(90|0)?5\d{9}$/.test(gsmno) == false) {
            MesajVer("Çep Telefonu İçin Girilen Değer Geçersiz!", MesajDurumu.Warning);
            hata = true;
        }
    }

    if (slcUserID == null) {
        if (degerleriKontrolEt(txtKullaniciSifre, txtKullaniciSifre.value))
            hata = true;
        else {
            if (kontrolEt(txtKullaniciSifre.value) == false) {
                MesajVer("<div>En az 8 karakter uzunluğunda<br />Rakam, Büyük Harf,<br />Küçük Harf ve En az bir Özel Karakter İçermelidir</div>", MesajDurumu.Warning)
                hata = true;
            }
        }
    }
    if (hata == false) {
        PostJson('/api/Api_Genel/SetKullaniciEdid', {
            id: slcUserID === null ? slcUserID : parseInt(slcUserID),
            kullaniciadi: txtKullaniciAdi.value,
            sifre: txtKullaniciSifre.value,
            adsoyad: txtAdiSoyadi.value,
            resim: resim,
            birimid: slcBirim.value,
            gsmno: gsmno,
            aktif: txtAktiflik
        }, function (data) {
            slcUserID = null;
            var html;
            if (data.veri != null) {
                veriList = data.veri;
                fncModalGizle();
                fncTblYazdir(veriList)
            }
        }, function () {
            zxc(q).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
        }, function () {
            zxc(q).attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
        })
    }
}
function kontrolEt(sifre) {
    if (sifre.length < 8) {
        return false;
    }

    if (!/[A-Z]/.test(sifre)) {
        return false;
    }

    if (!/[a-z]/.test(sifre)) {
        return false;
    }

    if (!/[0-9]/.test(sifre)) {
        return false;
    }
    if (!/[^A-Za-z0-9]/.test(sifre)) {
        return false;
    }
    if (/\s/.test(sifre)) {
        return false;
    }
    return true;
}

function fncOpnDeleteModal() {
    var q = this;
    slcUserID = zxc(q).ustElement(1).attr('data-id');
    fncModalAc("#mdlSil");
}

function fncVerDelete() {
    var q = this;
    if (slcUserID != null) {
        GetJson('/api/Api_Genel/SetKullaniciDelete/' + slcUserID, function (data) {
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
    id = zxc(q).ustElement(1).attr('data-id');

    var curRow = veriList.find(q => q.id == id);
    if (curRow != null) {
        fncModalAc("#mdlVeri");

        document.getElementById('filMusteriFotograf').value = "";
        zxc('#slcKurum,#slcBirim').selectbox('-1')
        zxc('#txtAdiSoyadi,#txtKullaniciAdi,#txtKullaniciSifre').value(" ");
        zxc(".hesap-logo").html(' ');

        slcUserID = curRow.id;
        zxc('#txtAdiSoyadi').value(curRow.adsoyad);
        zxc('#txtgsmno').value(curRow.gsmno);
        zxc('#txtKullaniciAdi').value(curRow.kullaniciadi);
        zxc('#txtAktiflik').dom.checked = curRow.Aktif;

        if (curRow.resim != null && curRow.resim != "/img/user-no-photo.jpg")
            zxc(".hesap-logo").html('<div class="imgdfv"><img class="imgresw" src="' + baseResimUrl + curRow.resim + '" alt=""><a class="aslre" onclick="fncImgDels(this)">Sil</a></div>');

        zxc('#slcKurum').selectbox(curRow.AykBirim.KurumNo);
        if (curRow.AykBirim.KurumNo) {
            GetJson('/api/Api_Aykome/GetBirimList/' + curRow.AykBirim.KurumNo, function (data) {
                if (data.veri != null) {
                    var html = '<option value="-1">Seç</option>';
                    data.veri.forEach(q => html = html.concat(`<option value="${q.BirimId}">${q.Birim}</option>`));
                    document.getElementById('slcBirim').innerHTML = html;
                    zxc('#slcBirim').selectbox(curRow.birimid)
                }
            }, function () {
                var html = '<option value="-1">Yükleniyor...</option>';
                document.getElementById('slcBirim').innerHTML = html;
            })
        }
    }
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
            }
        }, function () {
            var html = '<option value="-1">Yükleniyor...</option>';
            document.getElementById('slcBirim').innerHTML = html;
        })
    }
}

function fncMustResmYuk() {
    var fil = this;
    if (fncImageCheck(fil))
        fncFileToBase64(fil.files[0], function (q) {
            zxc(".hesap-logo").html('<div class="imgdfv"><img class="imgresw" src="' + q + '" alt=""><a class="aslre" onclick="fncImgDels(this)">Sil</a></div>');
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
        MesajVer("Bir Hata Oluştu", "Bir Resim Formatı Yükleyiniz!", MesajDurumu.Alert);
}
function fncImgDels(q) {
    zxc(q).birOncekiElement().dom.src = "";
}

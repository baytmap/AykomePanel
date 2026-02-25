
var slcUniqID = -1;

zxc.baslarken(function () {
    // fncIlkAcilis(true);
    document.getElementById('txtYil').addEventListener('input', function () {
        document.getElementById('yilForm').submit();
    });
    zxc('#btnMdlWfs').click(function () {
        slcUniqID = -1;
    })

    zxc('#btnKaydet').click(function () {
        var hata = false,
            q = this,
            Sira = zxc('#txtSira').dom,
            Tanim = zxc('#txtTanim').dom,
            BirimFyt = zxc('#txtBirimFyt').dom,
            Birim = zxc('#txtBirim').dom,
            Yogunluk = zxc('#txtYogunluk').dom,
            Yil = zxc('#txtYil').dom,
            Aktif = zxc('#txtDurum').dom.checked;

        if (degerleriKontrolEt(Sira, Sira.value))
            hata = true;

        if (degerleriKontrolEt(Tanim, Tanim.value))
            hata = true;

        if (degerleriKontrolEt(BirimFyt, BirimFyt.value))
            hata = true;

        if (degerleriKontrolEt(Birim, Birim.value))
            hata = true;

        if (degerleriKontrolEt(Yogunluk, Yogunluk.value))
            hata = true;

        if (hata == false) {
            PostJson('/api/Api_Genel/SetKaplama', {
                id: parseInt(slcUniqID),
                Tanim: Tanim.value,
                Sira: Sira.value,
                BrmFyt: BirimFyt.value,
                Birim: Birim.value,
                Yogunluk: Yogunluk.value,
                Aktif: Aktif,
                Yil: Yil.value
            }, function (data) {
                window.location.reload();
            }, function () {
                zxc(q).attr('disabled', 'disabled').ilkElement().attr('class', 'bx bx-loader');
            }, function () {
                slcUniqID = -1;
                zxc(q).attrSil('disabled').ilkElement().attr('class', 'bx bx-check');
            })

        }
    });

    zxc('#btnSil').click(function () {
        var q = this;
        if (slcUniqID != null) {
            DeleteJson('/api/Api_Genel/SetKaplamaDelete/' + slcUniqID, function (data) {
                window.location.reload();
            }, function () {
                zxc(q).attr('disabled', 'disabled')
            }, function () {
                zxc(q).attrSil('disabled')
            })
        }
    });
    zxc('#btnOlustur1').click(function () {
        var q = this;
        GetJson('/api/Api_Genel/SetKaplamaEksi', function (data) {
            window.location.reload();
        }, function () {
            zxc(q).attr('disabled', 'disabled')
        }, function () {
            zxc(q).attrSil('disabled')
        })
    });

    zxc('#btnOlustur2').click(function () {
        var q = this;
        GetJson('/api/Api_Genel/SetKaplamaArti', function (data) {
            window.location.reload();
        }, function () {
            zxc(q).attr('disabled', 'disabled')
        }, function () {
            zxc(q).attrSil('disabled')
        })
    });

    zxc.fullclick('.btnSil', 'click', function () {
        var q = this.closest('.btnSil');
        slcUniqID = zxc(q).ustElement(1).attr('data-id');
        fncModalAc("#mdlSil");
    })

    zxc.fullclick('.btn-ackapa', 'click', function () {
        zxc('#txtSira,#txtTanim,#txtBirimFyt,#txtBirim,#txtYogunluk').value(" ");

        var q = this.closest('.btn-ackapa'),
            tr = zxc(q).ustElement(1).dom,
            td = zxc(tr).altElementler().dom;
        slcUniqID = zxc(tr).attr('data-id');
        zxc('#txtSira').value(td[2].innerHTML);
        zxc('#txtTanim').value(td[4].innerHTML);
        zxc('#txtBirimFyt').value(td[5].innerHTML);
        zxc('#txtBirim').value(td[6].innerHTML);
        zxc('#txtYogunluk').value(td[7].innerHTML);
        zxc('#txtDurum').dom.checked = zxc(td[8]).ilkElement().ilkElement().dom.checked;
        fncModalAc("#mdlEdit");
    })
})


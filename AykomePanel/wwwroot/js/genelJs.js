
"use strict";
(function () {
    fncMenuAyr();
    //let arrow = document.querySelectorAll(".arrow");
    //for (var i = 0; i < arrow.length; i++) {
    //    arrow[i].addEventListener("click", (e) => {
    //        let arrowParent = e.target.parentElement.parentElement;//selecting main parent of arrow
    //        arrowParent.classList.toggle("showMenu");
    //    });
    //}
    //let sidebar = document.querySelector(".sidebar");
    //let sidebarBtn = document.querySelector(".bx-menu");
    //sidebarBtn.addEventListener("click", () => {
    //    sidebar.classList.toggle("close");
    //});
})();

var baseResimUrl = "https://localhost:44398";


zxc.baslarken(function () {


    if (window.location.hostname === "localhost") {
        // Lokal ortam
        baseResimUrl = "https://localhost:7253";

    } else if (window.location.host === "192.168.148.40") {
        // Test ortamı
        baseResimUrl = "http://192.168.148.40:4141";

    } else if (window.location.host === "aykome.konya.bel.tr") {
        // Canlı ortam - normal port (443)
        baseResimUrl = "https://aykome.konya.bel.tr/ApiDeneme";

    } else if (window.location.host === "aykome.konya.bel.tr:444") {
        // Canlı ortam - özel port 444
        baseResimUrl = "https://aykome.konya.bel.tr:444/apiTest";

    } else {
        // Varsayılan
        baseResimUrl = "https://aykome.konya.bel.tr/ApiDeneme";
    }


    zxc(".btnFiltreClear").click(fncFilClear);

    zxc(".bx-menu").click(function () {
        var q = localStorage.getItem('Menu');
        if (q == null)
            localStorage.setItem('Menu', "true")
        else if (q == "true")
            localStorage.setItem('Menu', "false")
        else if (q == "false")
            localStorage.setItem('Menu', "true")
        fncMenuAyr();
    });
    //zxc(".arrow").click(function () {
    //    zxc(this).ustElement(1).classToggle('showMenu');
    //});
    zxc(".sli").click(function () {
        zxc(this).classToggle('showMenu');
    });
    zxc.fullclick(".imglarg", "click", fncImgBig);

    zxc('.opnModal').click(function () {
        var q = this,
            w = q.getAttribute('data-ref'),
            e = q.getAttribute('data-temizle');
        if (w) {
            if (e != undefined && e == "true") {
                try {
                    var r = document.querySelectorAll(w + ' .form-control');
                    for (var i = 0; i < r.length; i++)
                        r[i].value = '';

                    r = document.querySelectorAll(w + ' .form-select');
                    for (var i = 0; i < r.length; i++)
                        r[i].options[0].selected = true;

                    r = document.querySelectorAll(w + ' .yukimsd');
                    for (var i = 0; i < r.length; i++)
                        r[i].innerHTML = '';
                } catch (e) {

                }
            }



            fncModalAc(w);

        }
    });

    zxc('.litabclck').click(function () {
        var q = this,
            w = q.getAttribute('data-text'),
            w2 = q.getAttribute('data-text2');
        if (w2 == null)
            w2 = "";
        else
            w2 = ' <span class="fvt65">' + w2 + '</span>';
        if (w) {
            var e = zxc(q).ustElement(3).ilkElement().ilkElement().html(w + w2);
        }

    })


    zxc.fullclick(".coptr", "click", function () {
        var q = this,
            w = q.getAttribute('title');
        if (w)
            navigator.clipboard.writeText(w);
        MesajVer("Kopyalandı", MesajDurumu.Info);
    });

    zxc.fullclick(".chbAllChc", "change", function () {
        var q = this,
            e = q.checked,
            w = q.getAttribute('data-id');
        if (w)
            zxc('.' + w).checked(e)
    });


    fncTagEvents();

    zxc('.form-control').change(fncValidClear);

    document.querySelectorAll('.form-select').forEach((q) => {
        q.onchange = function () {
            var w = this;
            if (w.classList.contains('is-invalid')) {
                w.classList.remove('is-invalid');
                zxc(w.parentNode).sonElement().elementiSil();
            }
        };
    })

    var _sd = document.querySelectorAll('.fly-bod');
    if (_sd != null)
        for (var i = 0; i < _sd.length; i++)
            _sd[i].style.height = _sd[i].clientHeight + "px";

    zxc('.btn-grd-yen').click(function () {
        var q = this,
            tbl = q.getAttribute('data-tbl'),
            tap = q.getAttribute('data-tap'),
            btn = zxc(q).birSonrakiElement().dom;

        if (document.querySelector(tbl + ' .tractiv') != null)
            document.querySelector(tbl + ' .tractiv').classList.remove('tractiv');

        if (btn.hasAttribute('data-id'))
            btn.removeAttribute('data-id');

        if (document.querySelector(tap + ' .form-control') != null)
            document.querySelectorAll(tap + ' .form-control').forEach(q => q.value = "");

        if (document.querySelector(tap + ' .form-select') != null)
            document.querySelectorAll(tap + ' .form-select').forEach(q => q.value = "-1");

        if (document.querySelector(tap + ' .htmlclr') != null)
            document.querySelectorAll(tap + ' .htmlclr').forEach(q => q.innerHTML = "");

        if (document.querySelector(tap + ' .form-check-input') != null)
            document.querySelectorAll(tap + ' .form-check-input').forEach(q => {
                if (/aktif/.test(q.id))
                    q.checked = true;
                else
                    q.checked = false;
            });
    })

    document.querySelectorAll('.form-control[data-tip="format"]').forEach(function (q) {
        q.addEventListener('keypress', function (e) {
            var q = this,
                f = zxc(q).attr('data-format'),
                r = new RegExp(f),
                val = this.value;

            if ((e.key == "." && val.indexOf(".") != -1) ||
                (e.key == "," && val.indexOf(",") != -1)) {
                if (val.indexOf(".") != -1 || val.indexOf(",") != -1)
                    e.preventDefault();
            }
            else {
                val = val.substring(0, this.selectionStart) + e.key + val.substring(this.selectionStart, val.length);
                if (r.exec(val) == null)
                    e.preventDefault();
            }

        }, false)
    })

    document.querySelectorAll('.form-control[data-tip-format="tutar2"]').forEach(function (q) {
        q.addEventListener('keypress', function (e) {
            var q = this,
                r = new RegExp(/^\d+(\,\d{1,2})?$/),
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

    document.querySelectorAll('.form-control[data-tip-format="tutar"]').forEach(function (q) {
        q.addEventListener('keypress', function (e) {
            var q = this,
                r = new RegExp(/^\d+(\.\d{1,2})?$/),
                val = this.value;
            if (e.key == ".") {
                if (val.indexOf(".") != -1)
                    e.preventDefault();
            }
            else {
                val = val.substring(0, this.selectionStart) + e.key + val.substring(this.selectionStart, val.length);
                if (r.exec(val) == null)
                    e.preventDefault();
            }
        }, false)
    })

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

    zxc('.btn-full').click(function () {
        var q = this,
            w = zxc(q).ustElement(2).dom;
        if (w != undefined && zxc(w).classVarmi('modal-fullscreen'))
            zxc(w).classSil('modal-fullscreen')
        else {
            zxc(w).attrSil('style');
            zxc(w).classEkle('modal-fullscreen');
        }

    })

    GetJson('/api/Api_Genel/GetCalismaYili', function (data) {
        zxc('#aktYil').html(data.veri)
    })

    fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => {
            if (data.ip == "88.255.209.50") {
                if (document.querySelector('.logo-details img')) {
                    document.querySelector('.logo-details img').style.display = "none";
                }
            }
        })
        .catch(error => console.error('Hata:', error));
})



function fncFilClear() {
    var w = zxc(this).ustElement(1).birOncekiElement().dom;
    w.querySelectorAll('.tblsearch .form-control').forEach((q) => q.value = "");
    w.querySelectorAll('.tblsearch .form-select').forEach((q) => q.options[0].selected = true);
}

//#region Image Byt
function fncImgBig() {

    var q = this,
        src = '';

    if (q.hasAttribute('data-big'))
        src = q.getAttribute('data-big');

    else if (q.hasAttribute('src'))
        src = q.getAttribute('src');

    if (src != '') {
        zxc('.bce').classEkle('opn');

        zxc('.imgMod').css('display', 'flex').ilkElement().dom.src = src;

        document.body.style.overflow = "hidden";
        setTimeout(() => zxc('.imgMod').ilkElement().classEkle('scal3'), 200)
    }

}

function fncModImgCls() {
    const prms = new Promise((resolve, reject) => {
        zxc('.imgMod').ilkElement().classSil('scal3');
        setTimeout(() => {
            resolve();
        }, 250)
    });
    prms.then(q => {
        console.log(3);
        zxc('.imgMod').css('display', 'none');
        zxc('.bce').classSil('opn');
        document.body.style.overflow = "auto";
    });
}

//#endregion

//#region Excel

function fncExcel1(a, data) {
    var wwb = XLSX.utils.book_new();
    wwb.Props = {
        Title: "SheetJSTutorial",
        Subject: "Tes",
        Author: "RedStapler",
        CreatedDate: new Date(2024, 1, 1)
    };
    wwb.SheetNames.push(a);
    var wws = XLSX.utils.aoa_to_sheet(data);


    wwb.Sheets[a] = wws;
    //wwb["A1"].s =
    //{
    //    font: {
    //        sz: 14,
    //        bold: true,
    //        color: { rgb: "FFFFAA00" }
    //    },
    //    border: {
    //        top: { style: 'thick', color: { rgb: "FFFFAA00" } },
    //        left: { style: 'thick', color: { rgb: "FFFFAA00" } } }
    //    }
    //};
    var wbout = XLSX.write(wwb, { bookType: 'xlsx', type: 'binary' });
    saveAs(new Blob([s2ab(wbout)], { type: "application/octet-stream" }), a + '.xlsx');
}
function s2ab(s) {
    var buf = new ArrayBuffer(s.length);
    var view = new Uint8Array(buf);
    for (var i = 0; i < s.length; i++)
        view[i] = s.charCodeAt(i) & 0xFF;
    return buf;
}
//#endregion

//#region Modal
var myCurModal;
function fncModalAc(q, fnc) {

    //if (document.querySelector('.hesap-logo.act') != null) {
    //    zxc('.act').classSil('act');
    //}
    var qq = document.querySelectorAll('.modal-body .nav-link[data-text2]');
    if (qq.length != 0)
        qq.forEach((q, i) => q.removeAttribute('data-text2'));

    var hh = document.querySelector('.modal-body .nav-link');
    if (hh != null)
        zxc(hh).ustElement(2).birOncekiElement().ilkElement().html(hh.getAttribute('data-text'));

    myCurModal = new bootstrap.Modal(q, {
        keyboard: false
    })
    if (fnc)
        fnc();
    myCurModal.show();
}

function fncModalGizle() {
    if (myCurModal) {
        myCurModal.hide();

        var qq = document.querySelectorAll('.modal-body .nav-link[data-text2]');
        if (qq.length != 0)
            qq.forEach((q, i) => q.removeAttribute('data-text2'));

        var hh = document.querySelector('.modal-body .nav-link');
        if (hh != null)
            zxc(hh).ustElement(2).birOncekiElement().ilkElement().html(hh.getAttribute('data-text'));

    }
}

//#endregion

//#region Input Enter
function fncTagEvents() {
    document.querySelectorAll('.inputIslem').forEach(function (q) {
        if (q.hasAttribute('data-tip') && q.hasAttribute('data-ref')) {
            if (q.getAttribute('data-tip') == 'enter')
                zxc(q).keypress(fncTxtIslm);

            else if (q.getAttribute('data-tip') == 'select') {
                q.addEventListener('change', fncSlcxIslm, false);
            }
        }
    });
    // zxc('#txtMstp').keypress(fncTxtMstArm);
}

function fncTxtIslm(evt) {
    var q = this,
        t = q.getAttribute('data-tip'),
        r = q.getAttribute('data-ref');
    if (t == 'enter') {
        if (evt.which === 13)
            zxc(r).dom.click();
    }
    //if (t == 'enter') {
    //    if (evt.which === 13)
    //        zxc(r).dom.click();
    //}
    else if (t == 'focus')
        zxc(r).dom.focus();

    return false;
}

function fncSlcxIslm() {
    var q = this,
        r = q.getAttribute('data-ref');
    if (r)
        zxc(r).dom.click();
}

//#endregion



function MesajVer(q, w, autohide = true, delay = 5000) {
    zxc("#toastmes").html(q);
    //  zxc("#toastmesbas").html(b);
    var e;
    var d = zxc('#liveToast').dom,
        h = zxc(d).ilkElement().ilkElement();

    if (w == undefined)
        w = "1";

    if (w == "1" || w == 1) {
        zxc(d).ilkElement().attr("class", "d-flex  align-items-center ps-2 bgsuccess");
        zxc(h).attr("class", "bx bxs-badge-check text-success");
    }
    else if (w == "2" || w == 2) {
        zxc(d).ilkElement().attr("class", "d-flex  align-items-center ps-2 bgwarning");
        zxc(h).attr("class", "bx bxs-bug text-warning");
        autohide = false;
    }
    else if (w == "3" || w == 3) {
        zxc(d).ilkElement().attr("class", "d-flex  align-items-center ps-2 bgalert");
        zxc(h).attr("class", "bx bxs-error text-danger");
        autohide = false;
    }
    else if (w == "4" || w == 4) {
        zxc(d).ilkElement().attr("class", "d-flex  align-items-center ps-2 bgprimary");
        zxc(h).attr("class", "bx bx-checkbox-checked text-primary");
    }


    var toast = new bootstrap.Toast(d, {
        animation: true,
        autohide: autohide,
        delay: delay
    })
    toast.show()
}





function fncSelectSearch(h, w, f) {
    w = w.toLowerCase();
    var q = document.getElementById(h).options;
    for (var i = 0; i < q.length; i++) {
        var u = new RegExp("^" + w + "");
        if (u.test(q[i].text.toLowerCase())) {
            q[i].selected = true
            if (f != undefined)
                f(q[i].value, q[i].text);
            return;
        }
    }
    q[0].selected = true
}

function fncLiSearch(h, w, f) {
    w = w.toLowerCase();
    var q = document.getElementById(h).children;
    var list = [];
    for (var i = 0; i < q.length; i++) {
        var u = new RegExp("^" + w + "");
        if (u.test(q[i].getAttribute('data-deger').toLowerCase())) {
            list.push(q[i]);
            //if (f != undefined)
            //    f(q[i],i);
            //return;
        }
    }
    if (f != undefined)
        f(list);
}


function degerleriKontrolEt(d, v) {
    if (v == undefined)
        return;
    if (v != true && v != false)
        v = v.trim();

    var curDomClass = d.getAttribute('class'),
        t = d.getAttribute('data-validate-func'),
        m = d.getAttribute('data-validate-hint'),
        hata = false;

    if (t == 'required') {
        if (v == '') {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'selectbox') {
        if (v == '' || v == '-1') {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'minlength') {
        var h = d.getAttribute("data-validate-arg"),
            len = v.trim().length;
        if (h == undefined || isNaN(h) || len <= 0 || len > parseInt(h)) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'maxlength') {
        var h = d.getAttribute("data-validate-arg"),
            len = v.trim().length;
        if (h == undefined || isNaN(h) || len <= 0 || len < parseInt(h)) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'min') {
        var h = d.getAttribute("data-validate-arg");
        if (h == undefined || isNaN(h) || v.trim() === "" || parseInt(h) >= parseInt(v.trim())) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'max') {
        var h = d.getAttribute("data-validate-arg");
        if (h == undefined || isNaN(h) || v.trim() === "" || parseInt(h) <= parseInt(v.trim())) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'email') {
        if (/^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i.test(v) === false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'url') {
        if (/^(?:[a-z]+:)?\/\//i.test(v) == false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'date') {
        if (/^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(v) == false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'time') {
        if (/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v) == false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'datetime') {
        if (/\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])(T)(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v) == false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'number') {
        var h = (v - 0) == v && ('' + v).trim().length > 0;
        if (h === false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'digits') {
        if (/^\d+$/.test(v) == false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'hexcolor') {
        if (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(v) == false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'pattern') {
        var h = d.getAttribute("data-validate-arg"),
            reg = new RegExp(h);
        if (v == "" || h == undefined || reg.test(v) == false) {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'imagedialog') {
        if (v == '' || v == '#') {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    else if (t == 'fileUpload') {
        if (v == '' || v == '#') {
            _vLm(curDomClass, d, m);
            hata = true;
        }
    }
    return hata;
}

function _vLm(curDomClass, d, m) {
    if (d.classList.contains('is-invalid') == false) {
        d.setAttribute('class', curDomClass + ' is-invalid');
        zxc(d.parentNode).ekle(`<div class="invalid-feedback">${m}</div>`);
    }
}

function fncValidClear() {
    var q = this;
    if (zxc(q).classVarmi('is-invalid')) {
        if (degerleriKontrolEt(q, q.value) == false) {
            zxc(q).classSil('is-invalid');
            zxc(q).ustElement().sonElement().elementiSil();
        }
    }
}

function fncValidClr() {
    document.querySelectorAll('.is-invalid').forEach((q) => {
        q.classList.remove('is-invalid')
        var qw = q.nextElementSibling;
        if (qw)
            qw.parentNode.removeChild(qw)
    })
}

function fncValueClr(f) {
    document.querySelectorAll(f + ' .form-control.form-control-sm').forEach(q => {
        q.value = '';
    });
}

function fncbirSifirCss(q) {
    var w = '';
    if (q == "1") w = `<span class='clcevt'>${lngLst.evet}</span>`;
    else w = `<span class='clchyr'>${lngLst.hayir}</span>`;
    return w;
}

function fncClearDom(vtab, htmlClear = false) {
    var q1 = document.querySelectorAll(vtab + ' .form-control'),
        //q2 = document.querySelectorAll(vtab + ' .chckbtn'),
        q3 = document.querySelectorAll(vtab + ' .form-select'),
        q4 = document.querySelectorAll(vtab + ' tbody'),
        q5 = document.querySelectorAll(vtab + ' .hesap-logo');

    if (q1 != undefined)
        q1.forEach((q) => q.value = "");
    //if (q2 != null)
    //    q2.forEach((q) => q.checked = false);
    if (q3 != undefined)
        q3.forEach((q) => q.options[0].selected = true);

    if (htmlClear == true && q4 != undefined)
        q4.forEach((q) => q.innerHTML = "");

    if (q5 != undefined) {
        q5.forEach((q) => {
            q.classList.remove('act');
            q.classList.remove('is-invalid');
            zxc(q).ilkElement().attr('src', '#');
            zxc(q).ilkElement().birSonrakiElement().value(' ');
        })
    }
}



function convertImageToBase64(imgUrl, callback) {
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = image.naturalHeight;
        canvas.width = image.naturalWidth;
        ctx.drawImage(image, 0, 0);
        const dataUrl = canvas.toDataURL();
        callback && callback(dataUrl)
    }
    image.src = imgUrl;
}

function PostJson(UrlAdress, Parameters, FncSuccess, FncRequestStart, FncRequestEnd, fncNoData) {
    if (FncRequestStart)
        FncRequestStart();

    fetch(UrlAdress, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(Parameters)
    }).then(response => response.json())
        .then(function (result) {
            if (result.success == 1) {
                if (FncSuccess)
                    FncSuccess(result)
            } else {
                if (fncNoData)
                    fncNoData()
            }
            if (FncRequestEnd)
                FncRequestEnd();
            if (result.message != null && result.message.Durum)
                MesajVer(result.message.MesajMetni, result.message.Tip);
        }).catch(error => MesajVer(error, MesajDurumu.Alert));
}

function GetJson(UrlAdress, FncSuccess, FncRequestStart, FncRequestEnd, fncNoData) {
    if (FncRequestStart)
        FncRequestStart();

    fetch(UrlAdress, {
        method: 'GET',
    }).then(response => response.json()).then(function (result) {
        if (result.success == 1) {
            if (FncSuccess)
                FncSuccess(result)
        }
        else {
            if (fncNoData)
                fncNoData()
        }
        if (FncRequestEnd)
            FncRequestEnd();
        if (result.message != null && result.message.Durum)
            MesajVer(result.message.MesajMetni, result.message.Tip);
    }).catch(error => MesajVer(error, MesajDurumu.Alert));
}
function DeleteJson(UrlAdress, FncSuccess, FncRequestStart, FncRequestEnd) {
    if (FncRequestStart)
        FncRequestStart();

    fetch(UrlAdress, {
        method: 'DELETE',
    }).then(response => response.json()).then(function (result) {
        if (result.success == 1)
            if (FncSuccess)
                FncSuccess(result)
        if (FncRequestEnd)
            FncRequestEnd();
        if (result.message != null && result.message.Durum)
            MesajVer(result.message.MesajMetni, result.message.Tip);
    }).catch(error => MesajVer(error, MesajDurumu.Alert));
}
function fncMenuAyr() {
    var q = localStorage.getItem('Menu');
    if (q != null && q == "true") {
        zxc('.sidebar').classSil('close');
        var w = document.querySelector('.sidebar .sub-menu li a[href="' + window.location.pathname + window.location.search + '"]');
        if (w != null) {
            zxc(w).classEkle('active').ustElement(2).classEkle('showMenu');
        }
    }
    else if (q != null && q == "false") {
        zxc('.sidebar').classEkle('close')
    }
    else {
        var w = document.querySelector('.sidebar .sub-menu li a[href="' + window.location.pathname + window.location.search + '"]');
        if (w != null) {
            zxc(w).classEkle('active').ustElement(2).classEkle('showMenu');
        }
    }
}

function fncYetkiDurumu() {
    return new Promise((res, rec) => {
        GetJson('/api/Api_Genel/YetkimVarmi2', function (data) {
            res(data.veri);
        })
    });
}


function fncCalismaYili() {
    GetJson('/api/Api_Genel/GetCalismaYili', function (data) {
        zxc('#txtCalismaYili').value(data.veri)
        fncModalAc('#mdlCalismaYili');
    })

}

function fncCalismaYiliSet() {
    var yil = parseInt(zxc('#txtCalismaYili').value());
    GetJson('/api/Api_Genel/SetCalismaYili?Yil=' + yil, function (data) {
        fncModalGizle();
        window.location.reload();
    })
}
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
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
function fncYazdir() {
    if (pdfData)
        pdfMake.createPdf(pdfData).print();
}

function fncPdfIndr() {
    if (pdfData)
        pdfMake.createPdf(pdfData).download();
}
function fncPdfopen() {
    if (pdfData)
        pdfMake.createPdf(pdfData).open();
}

const RolEnum = {
    Basvuru: 1,
    Olur: 2,
    Onay: 3,
    Admin: 5,
    SahaKontrol: 6
};

const MesajDurumu = {
    Succes: 1,
    Warning: 2,
    Alert: 3,
    Info: 4
};

const KaziDurum = {
    PasifKazi: 0,
    AktifKazi: 1,
    BitenKazi: 2,
    BaslanmayanKazi: 3,
    OnaylananKazi: 4
};
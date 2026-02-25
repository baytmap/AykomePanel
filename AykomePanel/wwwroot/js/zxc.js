function zxc(dom, veri, adet) {
    if (dom)
        if (!(this instanceof zxc)) {
            if (typeof dom == "string") {
                this.veri = dom;
                this.dom = abc2(dom);
                this.adet = this.dom.length == undefined ? 1 : this.dom.length;
            }
            else
                this.dom = dom.dom || dom;
            return new zxc(this.dom, this.veri, this.adet);
        }
        else {
            this.veri = veri;
            this.dom = dom;
            this.adet = adet;
        }
}

zxc.z = function (a) {
    return document.getElementById(a);
}

zxc.parseJson = function (a) {
    return JSON.parse(a);
}

zxc.baslarken = function (f) {
    var onload = window.onload;
    if (typeof window.onload != 'function')
        window.onload = f;
    else {
        window.onload = function () {
            if (onload)
                onload();
            f();
        }
    }
}

zxc.fullclick = function (selector, type, handler) {
    document.addEventListener(type, (event) => {
        if (event.target.closest(selector)) {
            handler.call(event.target);
        }
    })
}
//.bind(this); .bind(event.target)
zxc.onscroll = function (f) {
    var onload = window.onscroll;
    if (typeof window.onscroll != 'function')
        window.onscroll = f;
    else {
        window.onscroll = function () {
            if (onscroll)
                onscroll();
            f();
        }
    }
}

zxc.boyutlanirken = function (f) {
    var onresize = window.onresize;
    if (typeof window.onresize != 'function')
        window.onresize = f;
    else {
        window.onresize = function () {
            if (onresize)
                onresize();
            f();
        }
    }
}

zxc.cikisYaparken = function (f) {
    var onload = window.onbeforeunload;
    if (typeof window.onbeforeunload != 'function')
        window.onbeforeunload = f;
    else {
        window.onbeforeunload = function () {
            if (onload)
                onload();
            f();
        }
    }
}

zxc.tusaBasilirsa = function (f) {
    var onk = window.onkeyup;
    if (typeof window.onkeyup != 'function')
        window.onkeyup = f;
    else {
        window.onkeyup = function () {
            if (onk)
                onk(event);
            f;
        }
    }
}

zxc.dongu = function (a, b) {
    for (var i = 0; i < a.length; i++)
        b(a[i], i);
}

zxc.scriptCheck = function (a) {
    var r = false;
    var sc = document.getElementsByTagName('script');
    for (var i = 0; i < sc.length; i++) {
        if (sc[i].src === window.location.href.replace(window.location.pathname, "/").concat(a))
            r = true;
    }
    return r;
}

zxc.scripAdd = function (a, b) {
    if (a != null) {
        var o = document.getElementsByTagName('HEAD').item(0),
            s = document.createElement("script");
        s.language = "javascript";
        s.type = "text/javascript";
        s.id = b;
        s.defer = true;
        s.text = a;
        o.appendChild(s);
    }
}

zxc.parseQuery = function (a) {
    var out = "";
    var val = window.location.search;
    if (val)
        val = val.replace("?", "");
    var ary = val.split('&');
    for (var i = 0; i < ary.length; i++) {
        var w = ary[i].split('=');
        if (w[0] == a) {
            out = decodeURIComponent(w[1]);
            break;
        }
    }
    return out;
}

zxc.cookie = {
    olustur: function (name, value, days) {
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            var expires = "; expires=" + date.toGMTString();
        }
        else var expires = "";
        document.cookie = name + "=" + value + expires + "; path=/";
    },
    goster: function (name) {
        var nameEQ = name + "=";
        var ca = document.cookie.split(';');
        for (var i = 0; i < ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    },
    sil: function (name) {
        zxc.cookie.olustur(name, "", -1);
    }
}

zxc.regexp = {
    number: function (a) {
        return /^-?\d+$/.test(a);

    },
    url: function (a) {
        return /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9]\.[^\s]{2,})/.test(a);
    },
    email: function (a) {
        return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(a);
    },
    userName: function (a) {
        return /^[a-zA-Z0-9]+$/.test(a);
    },
    gsm: function (a) {
        return /^[0]?\d{3}\s?\d{3}\s?(\d{4}|\d{2}\s\d{2})$/.test(a);
    }
}

zxc.tarih = {

    yil: new Date().getFullYear(),
    ay: String(new Date().getMonth() + 1).padStart(2, "0"),
    gun: String(new Date().getDate()).padStart(2, "0"),
    saat: new Date().getHours(),
    dakika: new Date().getMinutes(),
    saniye: new Date().getSeconds(),
    milisaniye: new Date().getMilliseconds(),
    full: function (fotmat) {
        var _snc = "";
        if (fotmat)
            _snc = fotmat.replace("yyyy", zxc.tarih.yil)
                .replace("MM", zxc.tarih.ay)
                .replace("dd", zxc.tarih.gun)
                .replace("hh", zxc.tarih.saat)
                .replace("mm", zxc.tarih.dakika)
                .replace("ss", zxc.tarih.saniye)
                .replace("ff", zxc.tarih.milisaniye)
        else
            _snc = zxc.tarih.gun + "." + zxc.tarih.ay + "." + zxc.tarih.yil + " " + zxc.tarih.saat + ":" + zxc.tarih.dakika + " " + zxc.tarih.saniye + "." + zxc.tarih.milisaniye;
        return _snc;
    }

}

zxc.browser = {
    appCodeName: navigator.appCodeName,
    appName: navigator.appName,
    appVersion: navigator.appVersion,
    connection: navigator.connection,
    cookieEnabled: navigator.cookieEnabled,
    deviceMemory: navigator.deviceMemory,
    geolocation: navigator.geolocation,
    language: navigator.language,
    languages: navigator.languages,
    mimeTypes: navigator.mimeTypes,
    onLine: navigator.onLine,
    platform: navigator.platform,
    storage: navigator.storage,
    userAgent: navigator.userAgent,
    appName: navigator.appName,
    hepsi: navigator
}

zxc.tarihParse = function (p, f) {

    var t = new Date(p);
    if (t.getFullYear() < 1971)
        return '';
    var snc = '';
    if (f == undefined) {
        snc = String(t.getDate()).padStart(2, "0") + '/' + String(t.getMonth() + 1).padStart(2, "0") + '/' + t.getFullYear();
        return snc;
    }
    if (f == 'MM/dd/yyyy')
        snc = String(t.getMonth() + 1).padStart(2, "0") + '/' + String(t.getDate()).padStart(2, "0") + '/' + t.getFullYear();

    else if (f == 'dd/MM/yyyy')
        snc = String(t.getDate()).padStart(2, "0") + '/' + String(t.getMonth() + 1).padStart(2, "0") + '/' + t.getFullYear();

    else if (f == 'MM/yyyy')
        snc = String(t.getMonth() + 1).padStart(2, "0") + '/' + t.getFullYear();

    else if (f == 'dd/MM')
        snc = String(t.getDate()).padStart(2, "0") + '/' + String(t.getMonth() + 1).padStart(2, "0");

    else if (f == 'MM/dd')
        snc = String(t.getMonth() + 1).padStart(2, "0") + '/' + String(t.getDate()).padStart(2, "0");

    else if (f == 'dd')
        snc = String(t.getDate()).padStart(2, "0");

    else if (f == 'yyyy')
        snc = t.getFullYear();

    else if (f == 'dd/MM/yyyy HH:mm')
        snc = String(t.getDate()).padStart(2, "0") + '/' + String(t.getMonth() + 1).padStart(2, "0") + '/' + t.getFullYear() + ' ' + String(t.getHours()).padStart(2, "0") + ':' + String(t.getMinutes()).padStart(2, "0");

    else if (f == 'MM/dd/yyyy HH:mm')
        snc = String(t.getMonth() + 1).padStart(2, "0") + '/' + String(t.getDate()).padStart(2, "0") + '/' + t.getFullYear() + ' ' + String(t.getHours()).padStart(2, "0") + ':' + String(t.getMinutes()).padStart(2, "0");

    else if (f == 'yyyy-MM-dd')
        snc = t.getFullYear() + '-' + String(t.getMonth() + 1).padStart(2, "0") + '-' + String(t.getDate()).padStart(2, "0");

    else if (f == 'HH:mm')
        snc = String(t.getHours()).padStart(2, "0") + ':' + String(t.getMinutes()).padStart(2, "0")
    else
        snc = String(t.getDate()).padStart(2, "0") + String(t.getMonth() + 1).padStart(2, "0") + '/' + '/' + t.getFullYear();
    return snc;
}

zxc.ajax = function (param) {
    var p =
    {
        adres: '',
        metot: 'POST',
        deger: undefined,
        tip: "application/x-www-form-urlencoded; charset=UTF-8",
        bitti: function () {

        },
        veriyok: function () {

        },
        baslangic: function () {

        },
        bitince: function () {

        },
        yuklenirken: function () {

        },
        header: undefined,
        hata: function () {

        }
    };

    for (var k in param) {
        if (k == "adres")
            p.adres = param[k];
        else if (k == "metot") {
            if (param[k].toLowerCase() == 'post' || param[k].toLowerCase() == 'get')
                p.metot = param[k];
        }
        else if (k == "deger")
            p.deger = param[k];
        else if (k == "tip") {
            if (param[k] == 'application/json' ||
                param[k] == 'application/x-www-form-urlencoded' ||
                param[k] == "multipart/form-data")
                p.tip = param[k];
        }
        else if (k == "bitti")
            p.bitti = param[k];
        else if (k == "veriyok")
            p.veriyok = param[k];
        else if (k == "baslangic")
            p.baslangic = param[k];
        else if (k == "bitince")
            p.bitince = param[k];
        else if (k == "yuklenirken")
            p.yuklenirken = param[k];
        else if (k == "hata")
            p.hata = param[k];

    }
    var xhr = xhro();
    xhr.open(p.metot, p.adres, true);

    if (p.bitti)
        xhr.onload = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    var res = this.responseText;
                    if (p.bitti != undefined) {
                        var ParseJsonVeri = JSON.parse(res);
                        try {
                            FnCotrSil(ParseJsonVeri)
                        } catch (e) {

                        }
                        if (ParseJsonVeri.message.kod == 1001 || ParseJsonVeri.message.kod == 1002)
                            p.bitti(ParseJsonVeri.veri);
                        else {
                            if (p.veriyok != undefined)
                                p.veriyok(ParseJsonVeri);
                        }
                    }
                }
            }
        };

    if (p.baslangic)
        xhr.onloadstart = p.baslangic;

    if (p.bitince)
        xhr.onloadend = p.bitince;

    if (p.tip)
        xhr.setRequestHeader("Content-Type", p.tip);

    if (p.hata)
        xhr.onerror = p.hata;
    if (p.yuklenirken)
        xhr.upload.onprogress = function (e) {
            p.yuklenirken(parseFloat((e.loaded / e.total) * 100));
        }

    if (p.header)
        for (var k in p.header)
            xhr.setRequestHeader(k, encodeURIComponent(p.header[k]));

    if (p.deger) {
        var pr = "";
        if (p.tip == 'application/x-www-form-urlencoded') {
            if (typeof p.deger == "object") {
                for (var i in p.deger)
                    pr = pr.concat(i + "=" + encodeURIComponent(p.deger[i]) + "&");
                pr = pr.substring(0, pr.length - 1);
            }
        }
        else
            pr = p.deger;

        xhr.send(pr);
    }
    else
        xhr.send();
}

zxc.fetch = function (param) {
    var p = {
        adres: '',
        method: 'POST',
        header: undefined,
        deger: undefined,
        bitti: function () { },
        hata: function () { }
    };

    // Parametreleri yükle
    for (var k in param) {
        if (k == "adres") p.adres = param[k];
        else if (k == "metot") p.method = param[k];
        else if (k == "header") p.header = param[k];
        else if (k == "deger") p.deger = param[k];
        else if (k == "bitti") p.bitti = param[k];
        else if (k == "hata") p.hata = param[k];
    }

    // Header boşsa JSON varsayılan
    if (p.header == undefined)
        p.header = { 'Content-Type': 'application/json;charset=utf-8' };

    // Eğer body bir obje ise JSON’a dönüştür
    if (p.deger && typeof p.deger === "object" &&
        p.header['Content-Type']?.includes("json")) {
        p.deger = JSON.stringify(p.deger);
    }

    fetch(p.adres, {
        method: p.method,
        headers: p.header,
        body: p.deger
    })
        .then(q => q.json())
        .then(function (data) {
            FnCotrSil(data);
            p.bitti(data);
        })
        .catch(function (e) {
            console.error("❌ Fetch hatası:", e);
            p.hata(e);
        });
};


zxc.fetchAsync = async function (param) {
    var p = {
        adres: '',
        method: 'POST',
        header: undefined,
        deger: undefined,
        bitti: function () { },
        hata: function () { }
    };

    for (var k in param) {
        if (k == "adres") p.adres = param[k];
        else if (k == "metot") p.method = param[k];
        else if (k == "header") p.header = param[k];
        else if (k == "deger") p.deger = param[k];
        else if (k == "bitti") p.bitti = param[k];
        else if (k == "hata") p.hata = param[k];
    }

    if (p.header == undefined)
        p.header = { 'Content-Type': 'application/json;charset=utf-8' };

    if (p.deger && typeof p.deger === "object" &&
        p.header['Content-Type']?.includes("json")) {
        p.deger = JSON.stringify(p.deger);
    }

    await fetch(p.adres, {
        method: p.method,
        headers: p.header,
        body: p.deger
    })
        .then(q => q.json())
        .then(function (data) {
            FnCotrSil(data);
            p.bitti(data);
        })
        .catch(function (e) {
            console.error("❌ FetchAsync hatası:", e);
            p.hata(e);
        });
};



zxc.resimToBase64 = function (resim) {
    return new Promise(function (resolve, reject) {
        var request = new XMLHttpRequest();
        request.open('GET', resim, true);
        request.responseType = 'blob';
        request.onload = function () {
            var reader = new FileReader();
            reader.readAsDataURL(request.response);
            reader.onload = function (e) {
                resolve(e.target.result);
            };
        };
        request.send();
        request.onerror = function () {
            reject({
                status: request.status,
                statusText: request.statusText
            });
        };
    });
}

function FnCotrSil(we) {
    if (we.message.gosterim != undefined && we.message.mesajMetni != "" && we.message.gosterim == true)
        MesajVer(we.message.mesajMetni, we.message.tip);

    if (we.message.kod == 1003) {
        var Cookies = document.cookie.split(';');
        for (var i = 0; i < Cookies.length; i++)
            document.cookie = Cookies[i] + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
        localStorage.clear();
        window.location.href = "/login"
    }
    else if (we.message.kod == 1004)
        window.location.href = "/panel"
}

var _ = zxc.prototype;

_.css = function (a, b) {
    if (this.dom.length == undefined) {
        if (P(a) === tip.String) {
            if (b)
                this.dom.style[a] = b;
            else {
                if (this.dom.style)
                    return this.dom.style[a];

                else if (this.dom.currentStyle)
                    return this.dom.currentStyle[a];
            }
        }
        else if (P(a) === tip.Object)
            for (var k in a)
                this.dom.style[k] = a[k];
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            if (P(a) === tip.String) {
                if (b)
                    d[i].style[a] = b;
                else {
                    if (d[i].style)
                        return d[i].style[a];

                    else if (d[i].currentStyle)
                        return d[i].currentStyle[a];
                }
            }
            else if (P(a) === tip.Object)
                for (var k in a)
                    d[i].style[k] = a[k];
    }

    return this;
}

_.cssKaldir = function (a) {
    if (this.dom.length == undefined) {
        if (P(a) === tip.String)
            this.dom.style.removeAttribute(a);
        else if (P(a) === tip.Array)
            for (var i = 0; i < a.length; i++)
                this.dom.style.removeAttribute(a[i]);
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            if (P(a) === tip.String)
                d[i].style.removeAttribute(a);
            else if (P(a) === tip.Array)
                for (var j = 0; j < a.length; j++)
                    d[i].style.removeAttribute(a[j]);
    }

    return this;

}

_.classVarmi = function (a) {
    if (this.dom.length == undefined)
        return this.dom.classList.contains(a);
    else
        return this.dom[0].classList.contains(a);
}

_.classSil = function (a) {
    if (this.dom.length == undefined) {
        if (P(a) === tip.String)
            this.dom.classList.remove(a);

        else if (P(a) === tip.Array)
            for (var l = 0; l < a.length; l++)
                this.dom.classList.remove(a[l]);
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            if (P(a) === tip.String)
                d[i].classList.remove(a);

            else if (P(a) === tip.Array)
                for (var l = 0; l < a.length; l++)
                    d[i].classList.remove(a[l]);
    }

    return this;
}

_.classEkle = function (a) {
    if (this.dom.length == undefined) {
        if (this.dom.classList)
            this.dom.classList.add(a);
        else
            this.dom.className += " " + a;
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            if (d[i].classList)
                d[i].classList.add(a);
            else
                d[i].className += " " + a;
    }
    return this;
}

_.classDegistir = function (a, b) {
    if (this.dom.length == undefined) {
        if (this.classVarmi(a))
            this.classSil(a);
        this.classEkle(b)
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++) {
            if (zxc(d[i]).classVarmi(a))
                zxc(d[i]).classSil(a)
            zxc(d[i]).classEkle(b)
        }
    }
    return this;
}

_.classToggle = function (a) {
    if (this.dom.length == undefined)
        this.dom.classList.toggle(a);
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            d[i].classList.toggle(a);
    }
    return this;
}

_.html = function (a) {
    var _deg = a;
    if (this.dom.length == undefined) {
        if (_deg != undefined)
            this.dom.innerHTML = _deg == " " ? "" : _deg;
        else
            return this.dom.innerHTML;
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++) {
            var _deg = a;
            if (_deg != undefined)
                d[i].innerHTML = _deg == " " ? "" : _deg;
            else
                return this.dom[0].innerHTML;
        }
    }
    return this;
}

_.value = function (a) {
    if (this.dom.length == undefined) {
        var _deg = a;
        if (_deg)
            this.dom.value = _deg == " " ? "" : _deg;
        else
            return this.dom.value;
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++) {
            var _deg = a;
            if (_deg)
                d[i].value = _deg == " " ? "" : _deg;
            else
                return this.dom[0].value;
        }
    }
    return this;
}

_.innerText = function (a) {
    if (this.dom.length == undefined) {
        if (a)
            this.dom.innerText = a;
        else
            return this.dom.innerText;
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            if (a)
                d[i].innerText = a;
            else
                return this.dom[0].innerText;
    }

    return this;
}

_.outerText = function (a) {
    if (this.dom.length == undefined) {
        if (a)
            this.dom.outerText = a;
        else
            return this.dom.outerText;
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            if (a)
                d[i].outerText = a;
            else
                return this.dom[0].outerText;
    }
    return this;
}

_.attr = function (a, b) {
    if (this.dom.length == undefined) {
        if (P(a) === tip.String) {
            if (b)
                this.dom.setAttribute(a, b);
            else
                return this.dom.getAttribute(a);
        }
        else if (P(a) === tip.Object)
            for (var k in a)
                this.dom.setAttribute(k, a[k]);
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            if (P(a) === tip.String) {
                if (b)
                    d[i].setAttribute(a, b);
                else
                    return this.dom[0].getAttribute(a);
            }
            else if (P(a) === tip.Object)
                for (var k in a)
                    d[i].setAttribute(k, a[k]);
    }


    return this;
}

_.attrVarmi = function (a) {
    return this.dom.length == undefined ? this.dom.hasAttribute(a) : this.dom[0].hasAttribute(a);
}

_.attrSil = function (a) {
    if (this.dom.length == undefined) {
        if (P(a) === tip.String)
            if (this.attrVarmi(a))
                this.dom.removeAttribute(a);

            else if (P(a) === tip.Array)
                for (var i = 0; i < a.length; i++)
                    this.dom.removeAttribute(a[i]);
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++) {
            if (P(a) === tip.String)
                if (d[i].getAttribute(a))
                    d[i].removeAttribute(a);

                else if (P(a) === tip.Array)
                    for (var l = 0; l < a.length; l++)
                        d[i].removeAttribute(a[l]);
        }
    }
    return this;
}

_.attrEkle = function (key, val) {
    if (this.dom.length == undefined) {
        /*  if (P(a) === tip.String) {*/
        if (this.dom.getAttribute(key)) {
            if (this.dom.getAttribute(key).indexOf(val) < 0)
                this.dom.setAttribute(key, this.dom.getAttribute(key) + ' ' + val);
        }
        else
            this.dom.setAttribute(key, val);
        //}
        //    if (this.attrVarmi(a) == false)
        //        this.dom.setAttribute(this.dom.getAttribute() + ' ' + val);
        //    else if (P(val) === tip.Array)
        //        for (var i = 0; i < a.length; i++)
        //            this.dom.setAttribute(this.dom.getAttribute() + ' ' + a[i]);
    }
    //else {
    //    var d = this.dom;
    //    for (var i = 0; i < d.length; i++)
    //        if (P(a) === tip.String)
    //            if (this.attrVarmi(a) == false)
    //                d[i].setAttribute(d[i].getAttribute() + ' ' + a);

    //            else if (P(a) === tip.Array)
    //                for (var l = 0; l < a.length; l++)
    //                    d[i].setAttribute(d[i].getAttribute() + ' ' + a[l]);
    //}
    return this;
}

_.altElementler = function (a) {
    if (this.dom.length == undefined) {
        if (/^\d+$/.test(a))
            this.dom = this.dom.children[parseInt(a)];
        else
            this.dom = this.dom.children;
    }
    else {
        if (/^\d+$/.test(a)) {
            var d = this.dom[0].children[a];
            this.dom = [];
            this.dom = d;
        }
        else
            if (this.dom.localName == "select") {
                if (/^\d+$/.test(a))
                    this.dom = this.dom.children[parseInt(a)];
                else
                    this.dom = this.dom.children;
            }
            else
                return this.dom[0].children;
    }
    return this;
}

_.ilkElement = function () {
    var d;
    if (this.dom.length != undefined)
        this.dom = this.dom[0];

    if (this.dom.firstElementChild)
        d = this.dom.firstElementChild;
    else
        d = this.altElementler(0);

    this.dom = d;
    return this;
}

_.aktifmi = function () {
    var q = true;
    if (this.dom.style.display == "none")
        q = false;
    return q;
}

_.sonElement = function () {
    var d;
    if (this.dom.length != undefined)
        this.dom = this.dom[0];

    if (this.dom.lastElementChild)
        d = this.dom.lastElementChild;
    else {
        var q = this.altElementler();
        d = q[q.length];
    }
    this.dom = d;
    return this;
}

_.birSonrakiElement = function (a) {
    var d;
    if (this.dom.length != undefined)
        this.dom = this.dom[0];

    if (/^\d+$/.test(a)) {
        var q = this.dom;
        for (var i = 0; i <= a; i++)
            q = q.nextElementSibling;
        d = q;
    }
    else
        d = this.dom.nextElementSibling;

    this.dom = d;
    return this;
}

_.birOncekiElement = function (a) {
    var d;
    if (this.dom.length != undefined)
        this.dom = this.dom[0];

    if (/^\d+$/.test(a)) {
        var q = this.dom;
        for (var i = 0; i <= a; i++)
            q = q.previousElementSibling;
        d = q;
    }
    else
        d = this.dom.previousElementSibling;
    this.dom = d;
    return this;
}

_.ustElement = function (a) {
    var d;
    if (this.dom.length != undefined)
        this.dom = this.dom[0];
    if (/^\d+$/.test(a)) {
        var q = this.dom;
        for (var i = 0; i <= a; i++)
            q = q.parentNode;
        d = q;
    }
    else
        d = this.dom.parentNode;
    this.dom = d;
    return this;
}

_.kontrol = function () {
    return this.dom.length == 1 ? this.dom[0] : this.dom;
}

_.click = function (f) {
    OlaySup("click", f);
    return this;
}

_.dblclick = function (f) {
    OlaySup("dblclick", f);
    return this;
}

_.keyup = function (f) {
    OlaySup("keyup", f);
    return this;
}

_.keypress = function (f) {
    OlaySup("keypress", f);
    return this;
}

_.keydown = function (f) {
    OlaySup("keydown", f);
    return this;
}

_.scroll = function (f) {
    OlaySup("scroll", f);
    return this;
}

_.change = function (f) {
    OlaySup("change", f);
    return this;
}

_.mouse = function (f1, f2) {
    OlaySup("mouseover", f1);
    OlaySup("mouseout", f2);
    return this;
}

_.blur = function (f) {
    OlaySup("blur", f);
    return this;
}

_.focusBlur = function (f1, f2) {
    OlaySup("focus", f1);
    if (f2)
        OlaySup("blur", f2);
    return this;
}

_.ekle = function (a, b) {
    var t = "";
    switch (b) {
        case 0: t = "beforebegin"; break;
        case 1: t = "afterbegin"; break;
        case 2: t = "afterend"; break;
        default: t = "beforeend"; break;
    }
    if (this.dom.length == undefined)
        this.dom.insertAdjacentHTML(t, a);
    else {
        var d = this.ldom;
        for (var i = 0; i < d.length; i++)
            d[i].insertAdjacentHTML(t, a);
    }
    return this;
}

_.elementiSil = function () {
    if (this.dom.length == undefined)
        this.dom.parentNode.removeChild(this.dom);
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            d[i].parentNode.removeChild(d[i]);
    }
    return this;
}

_.elementiSilOp = function () {
    if (this.dom.length == undefined) {
        var w = 9,
            dm = this.dom;
        var s = setInterval(function () {
            if (w == 0) {
                zxc(dm).elementiSil();
                clearInterval(s);
                return;
            }
            zxc(dm).css("opacity", "0." + w)
            w -= 1;
        }, 100)
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++) {
            var w = 9;
            var s = setInterval(function () {
                if (w == 0) {
                    zxc(d[i]).elementiSilthis(d[i]);
                    clearInterval(s);
                    return;
                }
                zxc(d[i]).css("opacity", "0." + w)
                w -= 1;
            }, 100)
        }
    }
    return this;
}

_.olaykaldir = function (a, b) {
    if (this.dom.length == undefined)
        this.dom.removeEventListener(a, b);
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            d[i].removeEventListener(a, b);
    }
    return this;
}

_.ekleBasina = function (a) {
    if (this.dom.length != undefined)
        this.dom = this.dom[0];
    this.dom.insertBefore(a, this.dom.firstChild);
    return this;
}

_.ekleSonuna = function (a) {
    if (this.dom.length != undefined)
        this.dom = this.dom[0];
    this.dom.appendChild(a);
    return this;
}

_.goster = function () {
    if (this.dom.length == undefined) {
        this.dom.style.display = "block";
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            d[i].style.display = "block";
    }
    return this;
}

_.gosterop = function () {
    var w = 0;
    var thy = this;
    this.css("opacity", "0").goster();
    var s = setInterval(function () {
        if (w >= 9) {
            thy.css("opacity", "1")
            clearInterval(s);
            return;
        }
        thy.css("opacity", "0." + w)
        w += 1;
    }, 100)
}

_.sakla = function () {
    if (this.dom.length == undefined)
        this.dom.style.display = "none";
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            d[i].style.display = "none";
    }
    return this;
}

_.saklaOp = function () {
    var w = 9;
    var thy = this;
    var s = setInterval(function () {
        if (w == 0) {
            thy.sakla();
            thy.css("opacity", "1")
            clearInterval(s);
            return;
        }
        thy.css("opacity", "0." + w)
        w -= 1;
    }, 100)
}

_.toogle = function () {
    if (this.css("display") === "block")
        this.sakla();
    else
        this.goster();
}

_.index = function () {
    var d, a;
    if (this.dom.length == undefined) {
        d = this.dom.parentNode.children;
        a = this.dom;
    }
    else {
        d = this.dom[0].parentNode.children;
        a = this.dom[0];
    }
    for (var i = 0; i < d.length; i++)
        if (d[i] == a)
            return i;
}

_.selectbox = function (a) {
    if (Array.isArray(this.dom) == false) {
        for (var w = 0; w < this.dom.length; w++) {
            if (a != undefined) {
                if (this.dom[w].value == a) {
                    this.dom[w].selected = true;
                    return this;
                }
            }
        }
        return this;
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++) {
            for (var w = 0; w < d[i].length; w++) {
                if (a != undefined) {
                    if (d[i][w].value == a) {
                        d[i][w].selected = true;
                        /* return this;*/
                    }
                }
            }
        }
    }
}

_.selectboxSecilen = function (txt, val) {
    var opt = this.dom.options;

    if (txt != undefined && val == undefined)
        for (var i = 0; i < opt.length; i++)
            if (opt[i].text == txt)
                return { value: opt[i].value, text: opt[i].text, index: i };

    if (txt == undefined && val != undefined)
        for (var i = 0; i < opt.length; i++)
            if (opt[i].value == val)
                return { value: opt[i].value, text: opt[i].text, index: i };

    if (txt == undefined && val == undefined) {
        var w = [];
        for (var i = 0; i < opt.length; i++)
            w.push({ value: opt[i].value, text: opt[i].text, index: i });
        return w;
    }

}

_.selectboxSecilenIndex = function () {
    var opt = this.dom.options;
    for (var i = 0; i < opt.length; i++)
        if (opt[i].selected == true)
            if (i == 0)
                return { value: 0, text: '', index: 0 };
            else
                return { value: parseInt(opt[i].value), text: opt[i].text, index: i };
}

_.options = function (a) {
    if (this.dom.length == undefined) {
        if (a != undefined)
            if (this.dom.options.length > a)
                this.dom.options[a].selected = true;
            else
                return this.dom.options;
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++) {
            if (a != undefined) {
                if (this.dom[i].options.length > a)
                    d[i].options[a].selected = true;
            }
            else
                return this.dom[0].options;
        }
    }
}

_.checked = function (a) {
    if (Array.isArray(this.dom) == false)
        this.dom.checked = a;
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            d[i].checked = a;

    }
}
_.checkedAttr = function (a, attr, val = []) {
    if (Array.isArray(this.dom) == false) {
        if (attr == undefined || attr == '')
            this.dom.checked = a;
        else
            for (var i = 0; i < val.length; i++) {
                if (this.dom.getAttribute(attr) == val[i])
                    this.dom.checked = a;
            }
    }
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++) {
            if (attr == undefined || attr == '')
                d[i].checked = a;
            else
                for (var r = 0; r < val.length; r++) {
                    if (d[i].getAttribute(attr) == val[r])
                        d[i].checked = a;
                }
        }
    }
}
_.checkedList = function (a, b) {

    var d = this.dom,
        o = '';
    for (var i = 0; i < d.length; i++)
        if (d[i].checked == true)
            o = o.concat(d[i].getAttribute(a), b)

    if (o != '')
        o = o.substring(o, o.length - 1);
    else
        if (d.checked)
            o = d.getAttribute(a)
    return o;
}
_.checkedListArray = function (a, b) {
    var d = this.dom,
        o = [];
    console.log(d.length);
    if (d.length == undefined && d.checked != undefined && d.checked == true && d.getAttribute(a) != undefined)
        o.push(parseInt(d.getAttribute(a)));
    else
        for (var i = 0; i < d.length; i++)
            if (d[i].checked == true) {
                var ff = d[i].getAttribute(a);
                if (ff != undefined && isNaN(ff))
                    o.push(ff);
                else
                    o.push(parseInt(ff));
            }

    //if (o != '')
    //    o = o.substring(o, o.length - 1);
    //else
    //    if (d.checked)
    //        o = d.getAttribute(a)
    return o;
}

_.checkedRemove = function () {

    var d = this.dom;
    for (var i = 0; i < d.length; i++)
        if (d[i].checked == true)
            d[i].checked = false;
    return this;
}

_.domAttrLst = function (a, b) {
    var d = this.dom,
        o = '';
    for (var i = 0; i < d.length; i++)
        o = o.concat(d[i].getAttribute(a), b)

    if (o != '')
        o = o.substring(o, o.length - 1);
    else
        if (d.length == undefined)
            o = d.getAttribute(a)
    return o;
}
_.domAttrLstArray = function (a) {
    var d = this.dom,
        o = [];
    for (var i = 0; i < d.length; i++)
        o.push(d[i].getAttribute(a));

    if (d.length == undefined)
        o.push(d.getAttribute(a))
    return o;
}
var abc2 = function (q) {

    if (typeof q != "string") {
        return q;
    }
    var u = new RegExp(/,/);
    var b = q.split(u);
    var rootDom,
        allDoms = [];
    for (let h = 0; h < b.length; h++) {
        var w = b[h].match(/[.|#]*[a-zA-Z0-9_-]+((:[0-9])|(:[true|false]+)|(\[[^.]+(='[^.]')*\]))*\s*/ig);
        rootDom = undefined;
        for (var i = 0; i < w.length; i++) {
            var select = w[i].trim();
            if (rootDom == undefined)
                if (i == w.length - 1)
                    rootDom = abc3(select, undefined, true);
                else
                    rootDom = abc3(select, rootDom, false);
            else
                if (i == w.length - 1)
                    rootDom = abc3(select, rootDom, true);
                else
                    rootDom = abc3(select, rootDom, false);

            if (i == w.length - 1)
                if (rootDom)
                    if (rootDom.length == undefined || rootDom.localName == "select")
                        allDoms.push(rootDom);
                    else
                        for (var jj = 0; jj < rootDom.length; jj++)
                            allDoms.push(rootDom[jj]);

        }
    }
    if (allDoms.length == 1)
        return allDoms[0];
    return allDoms;
}

var abc3 = function (select, rootDom, all) {

    var returnDom,
        prendDom,
        domLists = [];

    if (rootDom)
        prendDom = rootDom.children;

    if (/^#([a-z0-9-_.?]+)$/i.test(select)) {
        if (rootDom) {
            for (var i = 0; i < prendDom.length; i++)
                if (prendDom[i].id == select.replace("#", "")) {
                    returnDom = prendDom[i];
                    break;
                }
        }
        else
            returnDom = document.getElementById(select.replace("#", ""));
    }
    else if (/^\.[a-z0-9-_.]+$/i.test(select)) {
        if (rootDom) {
            for (var i = 0; i < prendDom.length; i++)
                if (prendDom[i].className == select.replace(".", "")) {
                    if (!all) {
                        returnDom = prendDom[i];
                        break;
                    }
                    else
                        domLists.push(prendDom[i]);
                }
        }
        else {
            if (!all)
                returnDom = document.getElementsByClassName(select.replace(".", ""))[0];
            else {
                var n = document.getElementsByClassName(select.replace(".", ""));
                for (var i = 0; i < n.length; i++)
                    domLists.push(n[i]);
            }
        }
    }
    else if (/^\.[a-z0-9-_.]+:\d+$/i.test(select)) {
        var n = select.match(/^\.([a-z0-9-_.]+):(\d+)$/i);
        returnDom = document.getElementsByClassName(n[1])[n[2]];
    }
    else if (/^\.[a-z0-9-_.]+:[true|false]+$/i.test(select)) {
        var n = select.match(/^\.([a-z0-9-_.]+):([true|false]+)$/i);
        if (rootDom) {
            for (var i = 0; i < prendDom.length; i++) {
                if (prendDom[i].checked == Bool(n[2])) {
                    if (!all) {
                        returnDom = prendDom[i];
                        break;
                    }
                    else
                        domLists.push(prendDom[i]);
                }
            }
        }
        else {
            var nn = document.getElementsByClassName(n[1]);
            for (var i = 0; i < nn.length; i++)
                if (nn[i].checked == Bool(n[2])) {
                    if (!all) {
                        returnDom = nn[i];
                        break;
                    }
                    else
                        domLists.push(nn[i]);
                }
        }
    }
    else if (/\.[a-z0-9-_.]+\[[a-z0-9-_.]+=["|']?[a-z0-9A-Z.-çüğöış]+/i.test(select)) {
        var n = select.match(/\.([a-z0-9-_.]+)\[([a-z0-9-_.]+)=["|']?([a-z0-9A-Z.-çüğöış]+)["|']?\]$/i);
        if (rootDom) {
            for (var i = 0; i < prendDom.length; i++) {
                if (prendDom[i].hasAttribute(n[2]))
                    if (prendDom[i].getAttribute(n[2]) == n[3]) {
                        if (!all) {
                            returnDom = prendDom[i];
                            break;
                        }
                        else
                            domLists.push(prendDom[i]);
                    }
            }
        }
        else {
            var nn = document.getElementsByClassName(n[1]);
            for (var i = 0; i < nn.length; i++)
                if (nn[i].hasAttribute(n[2]))
                    if (nn[i].getAttribute(n[2]) == n[3]) {
                        if (!all) {
                            returnDom = nn[i];
                            break;
                        }
                        else
                            domLists.push(nn[i]);
                    }
        }
    }
    else if (/\.[a-z0-9-_.]+\[[^.?]+\]$/i.test(select)) {
        var n = select.match(/\.([a-z0-9-_.]+)\[([^.?]+)\]$/i);
        if (rootDom) {
            for (var i = 0; i < prendDom.length; i++) {
                if (prendDom[i].hasAttribute(n[2]))
                    if (!all) {
                        returnDom = prendDom[i];
                        break;
                    }
                    else
                        domLists.push(prendDom[i]);
            }
        }
        else {
            var nn = document.getElementsByClassName(n[1]);
            for (var i = 0; i < nn.length; i++)
                if (nn[i].getAttribute(n[2]) == n[3]) {
                    if (!all) {
                        returnDom = nn[i];
                        break;
                    }
                    else
                        domLists.push(nn[i]);
                }
        }
    }
    else if (/^[a-z]+:\d+$/i.test(select)) {
        var n = select.match(/^([a-z0-9-_.]+):(\d+)$/i);
        if (rootDom) {
            for (var i = 0; i < prendDom.length; i++)
                if (prendDom[i].localName == n[1].toLowerCase())
                    if (i == parseInt(n[2])) {
                        if (!all)
                            returnDom = prendDom[i];
                        else
                            domLists.push(prendDom[i]);
                        break;
                    }
        }
        else {
            if (!all)
                returnDom = document.querySelector(select.toLowerCase())[parseInt(n[2])];
            else
                returnDom = document.querySelectorAll(select.toLowerCase())[parseInt(n[2])];
        }
    }
    else {
        var n;
        if (rootDom) {
            for (var i = 0; i < prendDom.length; i++) {
                if (prendDom[i].localName == select.toLowerCase()) {
                    if (!all)
                        returnDom = prendDom[i];
                    else
                        domLists.push(prendDom[i]);
                }
            }
        }
        else {
            if (!all)
                returnDom = document.querySelector(select.toLowerCase());
            else
                returnDom = document.querySelectorAll(select.toLowerCase());
        }
    }
    if (domLists.length > 0)
        return domLists;
    else
        return returnDom;
}

var OlaySup = function (isl, func) {
    if (this.dom.length == undefined)
        if (this.dom.addEventListener)
            this.dom.addEventListener(isl, func, false);
        else
            this.dom.attachEvent(isl, func);
    else {
        var d = this.dom;
        for (var i = 0; i < d.length; i++)
            if (d[i].addEventListener)
                d[i].addEventListener(isl, func, false);
            else
                d[i].attachEvent(isl, func);
    }
}

var P = function (a) {
    var t;
    var s = a.constructor.toString();
    if (s.indexOf("Array") != -1)
        t = tip.Array;
    else if (s.indexOf("Object") != -1)
        t = tip.Object;
    else if (s.indexOf("String") != -1)
        t = tip.String;
    else if (s.indexOf("Number") != -1)
        t = tip.Number;
    return t;
}

var tip = Object.freeze({ Array: 1, Object: 2, String: 3, Number: 4 });

var cls = function (a, b) {
    if (b) {
        var d = [];
        var q = zxc(b).altElementler();
        for (var i = 0; i < q.length; i++)
            if (zxc(q[i]).classVarmi(a))
                d.push(q[i]);
        return d
    }
    else
        if (document.getElementsByClassName)
            return document.getElementsByClassName(a);
        else
            return document.querySelectorAll('.' + a);
}

var Bool = function (a) {
    var q = a == "true" ? true : false
    return q;
}

var xhro = function () {
    if (window.XMLHttpRequest) {
        return new window.XMLHttpRequest;
    } else {
        try { return new ActiveXObject("MSXML2.XMLHTTP.3.0"); }
        catch (ex) { return null; }
    }
}

Array.prototype.groupBy = function (a) {
    var q = this, w = [];
    for (var i = 0; i < q.length; i++) {
        var f = q[i][a];
        if (w.indexOf(f) == -1)
            w.push(f);
    }
    var g = [];
    for (var i = 0; i < w.length; i++)
        g.push(q.filter(q => q[a] == w[i]));

    return g;
}

Array.prototype.groupByCount = function (a, b) {
    var q = this, r = 0;
    var g = q.groupBy(a);
    for (var i = 0; i < g.length; i++) {
        r = g[i].filter(f => f[a] == b).length;
        if (r > 0)
            break;
    }
    return r;
}

function createElement(tagName, attributes = {}, textContent = '') {
    var element = document.createElement(tagName);

    for (var attribute in attributes) {
        element.setAttribute(attribute, attributes[attribute]);
    }

    if (textContent !== '') {
        element.textContent = textContent;
    }

    return element;
}
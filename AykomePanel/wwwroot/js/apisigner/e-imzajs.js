zxc.baslarken(function () {
    setTimeout(function () {
        dangildanSertifikaOku();
    }, 1000)
    document.getElementById('btnImzalamaArks').onclick = fncCadesIleImzala2;
    fncGetImzaKullacilari()
})
var imzaRefModal = "";
var workingUrl = "";
var getSignerAppVersionsResult = {};
var logs = [];
 


var imzaConfig = {
    imzaDataString: "Yeni Proje Başvurusu İmzalama.",
    islem_tipi: "YeniProjeOlusturma",
    refid: -1,
    RefUserImza: null,
    fncCallback: null
};

var imzaDataString = "Ornek Imzalama Ornegi";

function dangildanSertifikaOku() {
    tryToConnect();


}


function addNumber(number) {
    var passwordField = document.getElementById("Sifre");
    passwordField.value += number;
}

function clearPassword() {
    var passwordField = document.getElementById("Sifre");
    passwordField.value = "";
}

function fncCadesIleImzala2() {
    var _pincode = $('#Sifre').val();
    if (_pincode == "" || document.getElementById('Sertifika_Id').value == "0") {
        MesajVer("E-İmza İşlemi Cihaz, Sertifika ve Şifre Giriniz!", MesajDurumu.Warning);
        return;
    }

    document.getElementById('btnCadesImzala').innerHTML = "İmzalama Başlatıldı";

    var _certValue = $('#Sertifika_Id').val().split(',');
    //  console.log(_certValue)
    var sertifikaBase64 = _certValue[1];
    var _slotId = parseInt(_certValue[2]) || 0;
   // var _slotId = _certValue[2] ? parseInt(_certValue[2]) : null;

    var _library = _certValue[3];


    var url1, url2

    if (window.location.hostname === 'localhost') {
        url1 = 'https://localhost:44330/SetCdesImzaInitialize2';
        url2 = 'https://localhost:44330/SetCdesImzaFinalize2';
    }
    else {
        url1 = 'https://aykome.konya.bel.tr/ApiImza/SetCdesImzaInitialize2';
        url2 = 'https://aykome.konya.bel.tr/ApiImza/SetCdesImzaFinalize2';
        //url1 = 'https://aykome.konya.bel.tr:444/imza/SetCdesImzaInitialize2';
        //url2 = 'https://aykome.konya.bel.tr:444/imza/SetCdesImzaFinalize2'; 
    }

    const eimzaParam = {
        sertifikaBase64: sertifikaBase64,
        imzaDataString: imzaConfig.imzaDataString,
        refid: imzaConfig.refid,
        refidList: imzaConfig.refidList,
        islem_tipi: imzaConfig.islem_tipi
    };
    //  console.log(eimzaParam);

    fetch(url1, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(eimzaParam)
    })
        .then(response => {
            //   console.log(response)
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(resultData => {
            // console.log("resultData=>", resultData);
            if (resultData.IslemSonucu) {
                var digestToBeSigned = resultData.Model.DigestBase64;
                var transactionUUID = resultData.Model.TransactionUU_Id;

                var signStepTwoRequest = {
                    keyId: resultData.Model.KeyID,
                    keySecret: resultData.Model.KeySecret,
                    state: resultData.Model.State,
                    pkcsLibrary: _library,
                    slot: _slotId,
                    pin: _pincode
                };
                //      console.log(signStepTwoRequest)

                var _certSerialNumber = _certValue[0];

                $.ajax({
                    url: "https://localsigner.onaylarim.com:8099/signStepTwo",
                    type: "POST",
                    contentType: "application/x-www-form-urlencoded",
                    data: JSON.stringify(signStepTwoRequest),
                    success: function (signStepTwoResult) {

                        //console.log("SignStepTwo response:", signStepTwoResult);
                        if (signStepTwoResult.error) {
                            if (signStepTwoResult.error.indexOf("INCORRECT_PIN") >= 0) {

                                MesajVer('Hata oluştu. e-İmza şifreniz yanlış.', MesajDurumu.Warning);

                            } else if (signStepTwoResult.error.indexOf("PIN_BLOCKED") >= 0) {

                                MesajVer('Hata oluştu. e-İmza şifreniz blokeli.', MesajDurumu.Warning);

                            } else {

                                MesajVer('Hata oluştu. ' + signStepTwoResult.error, MesajDurumu.Warning);

                            }

                            //  console.log("SIGNSTEPTWO isteği hata döndü: " + signStepTwoResult.error);

                        } else {

                            $('#loadingBar').removeClass("is-active");
                            $('#loadingBar').attr("data-curtain-text", "XAdES imza tamamlanıyor...");
                            $('#loadingBar').addClass("is-active");


                            fetch(url2, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                credentials: 'include',
                                body: JSON.stringify({
                                    'SignatureValue': signStepTwoResult.signedData,
                                    'islem_tipi': imzaConfig.islem_tipi,
                                    'refid': imzaConfig.refid,
                                    'refidList': imzaConfig.refidList,
                                    'keyId': resultData.Model.KeyID,
                                    'keySecret': resultData.Model.KeySecret,
                                    'operationId': resultData.Model.operationId,
                                    'RefUserImza': imzaConfig.RefUserImza == null ? null : parseInt(imzaConfig.RefUserImza)


                                })
                            })
                                .then(finalizeResponse => {
                                    if (!finalizeResponse.ok) {
                                        throw new Error('Network response was not ok ' + finalizeResponse.statusText);
                                    }
                                    return finalizeResponse.json();
                                })
                                .then(finalizeResult => {
                                    document.getElementById('btnCadesImzala').innerHTML = "Cades İle İmzala";
                                    if (finalizeResult.IslemSonucu) {
                                        zxc("#mdlImza").sakla();
                                        if (document.querySelector('.modal-backdrop') != null) {
                                            zxc(document.querySelector('.modal-backdrop')).elementiSil();
                                        }
                                        // fncModalAc("#mdlVeri");
                                        if (imzaRefModal)
                                            fncModalAc(imzaRefModal);

                                        if (imzaConfig.fncCallback && typeof imzaConfig.fncCallback === 'function') {
                                            imzaConfig.fncCallback();
                                        }
                                        zxc('#slcRefEimza').selectbox("");

                                    } else {
                                        MesajVer(finalizeResult.Mesaj, MesajDurumu.Warning);
                                    }
                                })
                                .catch(error => {
                                    MesajVer(error.message, error);
                                });
                        }
                    },
                    error: function (xhr, status, error) {


                        MesajVer('İmza atılırken bir sorun ile karşılaşılmıştır.', MesajDurumu.Warning);
                    }
                });

            } else {
                MesajVer(resultData.Mesaj, MesajDurumu.Warning);
            }
        })
        .catch(error => {
            MesajVer(error.message, error);
        });
}

function fncGetImzaKullacilari() {
    GetJson('/api/Api_Aykome/GetImzaKullacilari', function (data) {
        var html = '';
        if (data.veri != null) {
            var html = '<option value="">Seç</option>';
            data.veri.forEach(q => html = html.concat(`<option value="${q.Id}">${q.Ad}</option>`));
            document.getElementById('slcRefEimza').innerHTML = html;
            zxc('#pnlrefimza').attrSil('hidden');
            document.getElementById('slcRefEimza').onchange = function () {
                if (this.value == "")
                    imzaConfig.RefUserImza = null;
                else
                    imzaConfig.RefUserImza = this.value;
            }
        }
        else {
            zxc('#pnlrefimza').attr('hidden', 'hidden')
        }
    });
}



function tryToConnect() {
    getSignerAppVersions();
    localSignerPing(true, false).then(function (httpsOk) {
        if (httpsOk) {
            workingUrl = "https://localsigner.onaylarim.com:8099";
            localSignerReset();
        }
        else {
            localSignerPing(false, false).then(function (httpOk) {
                if (httpOk) {
                    workingUrl = "http://localsigner.onaylarim.com:8099";
                    localSignerReset();
                } else {
                    localSignerPing(false, true).then(function (localhostOk) {
                        if (localhostOk) {
                            workingUrl = "http://localhost:8099";
                            localSignerReset();
                        } else {
                            localSignerMode = "baglantiKurulamadi";
                            updateUI();
                        }
                    });
                }
            });
        }
    });
}
function log(msg) {
    logs.push(msg);
   // updateLogsArea();
}
function localSignerReset() {
    signerAppResetResult = null;
    operationId = "";
    localSignerMode = "working";
 
    updateUI();
   // console.log('workingUrl')
    log("e-İmza aracına RESET isteği gönderiliyor. Url:" + workingUrl + "/reset");
  //  console.log(workingUrl)
    $.get(workingUrl + "/reset")
        .done(function (result) {
          //  console.log(result)
            signerAppResetResult = result;
            localSignerMode = "varVeVersiyonYeni";
            log("e-İmza aracına RESET isteği döndü. varVeVersiyonYeni");
            updateUI();
        })
        .fail(function () {
            localSignerMode = "baglantiKurulamadi";
            updateUI();
        });
}

function localSignerPing(useHttps, useLocalhost) {
    var url = (useHttps ? "https" : "http") + (useLocalhost ? "://localhost:8099/ping" : "://localsigner.onaylarim.com:8099/ping");
    log("e-İmza aracına " + (useHttps ? "SSL" : "HTTP") + " PING isteği gönderiliyor. Url: " + url);
    return $.get(url).then(function (result) {
        log("e-İmza aracına PING isteği döndü.");
        if (!result.error) return true;
        return false;
    }).catch(function () {
        log("e-İmza aracına PING isteği gönderilemedi.");
        return false;
    });
}

function updateUI() {
   //console.log(localSignerMode)
    // Durum ve sertifika alanlarını güncelle
    if (localSignerMode === "working") {
        $("#statusArea").html(`
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-title">e-İmzalar aranıyor</h6>
                        <p class="text-muted">e-İmza aracı ve e-imza kartları aranıyor. Lütfen bekleyiniz.</p>

                    </div>
                </div>
            `);
    } else if (localSignerMode === "baglantiKurulamadi") {
        $("#statusArea").html(`
                <div class="card mb-3 border-danger">
                    <div class="card-body">
                        <h6 class="card-title text-danger">e-İmza Aracı Bulunamadı</h6>
                        <p class="text-muted">Aşağıdaki seçeneklerden birini tamamladıktan sonra yenile düğmesine basabilirsiniz</p>
                        <button onclick="tryToConnect()" class="btn btn-warning btn-sm">Yenile</button>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-6">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h6 class="card-title">e-İmza Aracını Aç</h6>
                                <p class="text-muted">e-İmza aracını bilgisayarınıza daha önce kurduysanız aşağıdaki butonu kullanarak açabilirsiniz.</p>
                                <button onclick="openSignerApp()" class="btn btn-warning btn-sm">Aç</button>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="card mb-3">
                            <div class="card-body">
                                <h6 class="card-title">e-İmza Aracını İndir</h6>
                                <p class="text-muted">e-İmza aracını bilgisayarınıza kurmak için aşağıdaki butonu kullanabilirsiniz.</p>
                                <a href="${getSignerAppVersionsResult.signerAgentWindowsUrl || '#'}" class="btn btn-warning btn-sm me-2">Windows</a>
                                <a href="${getSignerAppVersionsResult.signerAppMacUrl || '#'}" class="btn btn-warning btn-sm">Mac</a>
                            </div>
                        </div>
                    </div>
                </div>
            `);
    } else if (localSignerMode === "varVeVersiyonYeni") {
        updateCertificatesArea();
    }

    
}


function updateCertificatesArea() {
    var $sel = $("#Sertifika_Id");

    // Her çağrıldığında select2 temizlensin ve sadece "Seçiniz" kalsın
    $sel.find('option').remove();
    $sel.append(new Option("Seçiniz", "0", true, true));
    $sel.trigger("change.select2");
    $.ajax({
        url: "https://localsigner.onaylarim.com:8099/reset",
        method: "GET",
        dataType: "json"
        //,timeout: 7000
    })
        .done(function (result) {
          //  console.log("TIP:", typeof result, result);


            

            var certs = Array.isArray(result && result.certificates) ? result.certificates : [];
           // console.log(certs);
            // Boşsa sadece placeholder kalsın
            if (certs.length == 0) {
               // console.warn("Sertifika listesi boş veya alan adı farklı:", result);
                // Mevcut tüm seçenekleri temizle
                $sel.find('option').remove();

                // Sadece "Seçiniz" placeholder'ını tekrar ekle
                $sel.append(new Option("Seçiniz", "0", true, true));

                // Select2 arayüzünü yenile
                $sel.trigger("change.select2");

                return;
            }

            // Select2'ye eklenecek seçenekler
            certs.forEach(function (c) {
                var text = "TR - " + (c.citizenshipNo || c.tckn || "") + " - " + (c.personFullname || c.commonName || "");
                var value = (c.serialNumber || "") + "," + (c.data || "") + "," + (c.slot || "") + "," + (c.pkcsLibrary || "");
                $sel.append(new Option(text, value));
            });
            $sel.trigger("change.select2");



            $("#statusArea").html(`
                <div class="card mb-3">
                    <div class="card-body">
                        <h6 class="card-title">e-İmzalar Bulundu</h6>
                        <p class="text-muted">e-İmza aracı ve e-imza kartları bulundu. Lütfen seçiniz.</p>

                    </div>
                </div>
            `);

            //// İlk sertifikayı seç
            //var firstValue = $sel.find("option:eq(1)").val();
            //if (firstValue) $sel.val(firstValue);

            //$sel.trigger("change.select2").trigger("change");
        })
        .fail(function (xhr, status, err) {
            MesajVer(err, MesajDurumu.Warning);
            console.error("İstek başarısız:", status, err, xhr && xhr.responseText);
            // İstersen kullanıcıya mesaj göster:
            // MesajVer("Bağlantı kurulamadı.", MesajDurumu.Warning);
            $sel.trigger("change.select2");
        });

}
window.openSignerApp = function () {
    try {
        window.location.href = 'onaylarimsignerapp:"start"';
        tryToConnect();
    } catch (err) {
      //  console.log("open signer app error.", err);
    }
};
function getSignerAppVersions() {
    log("e-İmza aracı son sürümü alınıyor.");
    $.get("https://apitest.onaylarim.com/sign/GetSignerAppVersions")
        .done(function (result) {
            if (result.error) {
                log("Uygulama güncel sürümü alınırken hata oluştu.");
            } else {
                getSignerAppVersionsResult = result.result;
                log("Uygulama güncel sürümü alındı.");
            }
        })
        .fail(function () {
            log("Uygulama güncel sürümü alınırken hata oluştu.");
        });
}
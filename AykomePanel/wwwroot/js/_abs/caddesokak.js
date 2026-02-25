
var veriLst = [];

zxc.baslarken(function () {
    fncIlceYukle();
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

function fncIlceYukle() {
    GetJson('/api/AbsApi/getIlceee/', function (data) {
        if (data.veri != null) {
            html = '<option value="">Seç</option>';
            data.veri.forEach(q =>
                html = html.concat(`<option value="${q.ILCEREF}">${q.TANIM}</option>`));
            document.getElementById('slcIlce').innerHTML = html;
            document.getElementById('slcIlce').onchange = fncIlceSecildiginde;
        }
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
                document.getElementById('slcMahalle').onchange = fncMahalleSecildiginde;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('slcMahalle').innerHTML = html;
            document.getElementById('txtCaddeSokakAdi').innerHTML = html;
            zxc('#tblData').html(" ");
        })
    }
}


function fncMahalleSecildiginde() {
    var q = this.value;
    if (q != "") {
        GetJson('/api/AbsApi/GetCaddeSokakList2/' + q, function (data) {
            if (data.veri != null) {
                veriLst = data.veri;
                var html = '<option value="">Seç</option>';
                data.veri.forEach(q => html = html.concat(`<option value="${q.CaddeSokakKodu}">${q.CaddeSokakAdi}</option>`));
                document.getElementById('txtCaddeSokakAdi').innerHTML = html;
                document.getElementById('txtCaddeSokakAdi').onchange = fncCaddeSecildiginde;
            }
        }, function () {
            var html = '<option value="">Yükleniyor...</option>';
            document.getElementById('txtCaddeSokakAdi').innerHTML = html;
        }, function () {
        })
    }
}


function fncCaddeSecildiginde() {
    var q = this.value;
    zxc('#tblData').html(" ");

    if (q != "") {
        var vf = veriLst.find(g => parseInt(g.CaddeSokakKodu) == q);
        zxc('#tblData').html(`<tr>
        <td>${zxc('#slcIlce').selectboxSecilenIndex().text}</td>
        <td>${vf.MahalleAdi}</td>
        <td>${vf.CaddeSokakAdi}</td>
        <td>${vf.CaddeSokakKodu}</td>
        <td>${vf.CaddeSokak}</td>
        <td>${vf.TanitimNo}</td>
        <td>${vf.DieTanitimNo}</td>
        <td>${vf.MeclisKararNo}</td>
        <td>${zxc.tarihParse(vf.MeclisKararTarihi)}</td >
        <td>${vf.ValilikKararNo}</td>
        <td>${zxc.tarihParse(vf.ValilikKararTarihi)}</td>
        <td>${zxc.tarihParse(vf.VerilisTarihi)}</td>
        <td>${vf.CaddeSokakBilgisi}</td>
        <td> <a class="btn btn-sm btnsil" href="/Harita/HaritaPg?x=${vf.XKOOR}&y=${vf.YKOOR}"><span class="bx bx-map"></span>Harita</a></td>
        </tr>`);
    }
}

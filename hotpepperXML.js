let shopName;
let url;
let saveShop = [];
let saveUrl = [];
let s_content;

function loadXMLfile() {
    let searchName = document.getElementById('schName').value;
    searchName = searchName.replace(/　/g," ");
    document.getElementById('schName').value = searchName;
    let schUrl = "http://157.118.91.44/~s1957157/hotpepper/gourmet/v1/?key=a1e337b01c6069c8";
    schUrl += "&keyword=" + searchName;
    if(document.optChk.prv.checked === true) schUrl += "&private_room=1";
    if(document.optChk.course.checked === true) schUrl += "&course=1";
    if(document.optChk.wifi.checked === true) schUrl += "&wifi=1";
    if(document.optChk.frDr.checked === true) schUrl += "&free_drink=1";
    if(document.optChk.frEt.checked === true) schUrl += "&free_food=1";
    if(document.optChk.alc.checked === true) schUrl += "&shochu=1&sake=1&wine=1&cocktail=1";
    if(document.optChk.credit.checked === true) schUrl += "&card=1";
    if(document.optChk.parking.checked === true) schUrl += "&parking=1";
    if(document.optChk.bf.checked === true) schUrl += "&barrier_free=1";
    if(document.optChk.midnight.checked === true) schUrl += "&midnight=1&midnight_meal=1";
    if(document.optChk.nonsmoking.checked === true) schUrl += "&non_smoking=1";

    let pref = document.getElementById('pref');
    if(pref.value !== "") {
        schUrl += "&address=" + pref.value;
    }

    let rg = document.getElementById('rg');
    schUrl += "&range=" + rg.value;

    fetch(schUrl)
        .then((res) => {
            return (res.text());
        })
        .then((text) => {
            displayData(text);
        });
}

function displayData(text) {
    let target = document.getElementById('result');
    let i = 0;
    let html = "<table border=\"1\">";
    html += "<tr><th>名称</th><th>住所</th><th>候補</th></tr>";
    shopName = text.match(/<\/id><name>(.*?)(<\/name><logo_image>)/g);
    url = text.match(/<urls><pc>(.*?)<\/pc>/g);
    let adr = text.match(/<address>(.*?)<\/address>/g);
    if(shopName === null) {
        window.alert("検索結果がありません。");
    } else {
        for(i = 0; i< shopName.length; i++) {

            //不要な部分を正規表現で置換
            shopName[i] = shopName[i].replace(/<\/id><name>/g, "");
            shopName[i] = shopName[i].replace(/<\/name><logo_image>/g, "");
            url[i] = url[i].replace(/<urls><pc>/g, "");
            url[i] = url[i].replace(/<\/pc>/g, "");
            adr[i] = adr[i].replace(/<address>/g, "");
            adr[i] = adr[i].replace(/<\/address>/g, "");

            html += "<tr><td><a href='";
            html += url[i];
            html += "'>";
            html += shopName[i];
            html += "</a></td>";
            html += "<td>";
            html += adr[i];
            html += "</td><td>";
            html += "<button id=\"saver\" type=\"button\" onclick=\"saveNum(" + i + ")\">保存</button>";
            html += "</td></tr>";
        }
        html += "</table>";
        target.innerHTML = html;
    }
}

function saveNum(num) {
    s_content = document.getElementById('saved');
    saveShop[saveShop.length] = shopName[num];
    saveUrl[saveUrl.length] = url[num];

    drawSvContent();
}

function removeNum(num) {
    if(saveShop.length === 1) {
        saveShop.length = 0;
        saveUrl.length = 0;
        s_content.innerHTML = "";
    } else if (num === 0) {
        saveShop.shift();
        saveUrl.shift();
        drawSvContent();
    } else {
        saveShop.splice(num, num);
        saveUrl.splice(num, num);
        drawSvContent();
    }
}

function drawSvContent() {
    let saveHtml = "<h2>保存した候補</h2>";
    saveHtml += "<table border=\"1\">";
    saveHtml += "<tr><th>名称</th><th>操作</th></tr>";

    for (let i = 0; i < saveShop.length; i++) {
        saveHtml += "<tr><td><a href='";
        saveHtml += saveUrl[i];
        saveHtml += "'>";
        saveHtml += saveShop[i];
        saveHtml += "</td><td>";
        saveHtml += "<button id=\"saver\" type=\"button\" onclick=\"removeNum(" + i + ")\">削除</button>";
        saveHtml += "</td></tr>";
    }
    saveHtml += "</table>";
    saveHtml += "<button id=\"saver\" type=\"button\" onclick=\"saveBrowser()\">候補をブラウザに保存</button>";
    saveHtml += "<button id=\"saver\" type=\"button\" onclick=\"delAll()\">候補を全消去</button>";

    s_content.innerHTML = saveHtml;
}

function delAll() {
    saveShop.length = 0;
    saveUrl.length = 0;
    s_content.innerHTML = "";
}

function saveBrowser() {
    if(localStorage.getItem("savedShop") !== null) {
        if(confirm("前回保存した候補を上書きします。よろしいですか？") === true) {
            localStorage.setItem("savedShop", JSON.stringify(saveShop));
            localStorage.setItem("savedUrl", JSON.stringify(saveUrl));
            window.alert("ブラウザに候補を上書き保存しました。");
        } else {
            window.alert("キャンセルしました。")
        }
    } else {
        localStorage.setItem("savedShop", JSON.stringify(saveShop));
        localStorage.setItem("savedUrl", JSON.stringify(saveUrl));
        window.alert("ブラウザに候補を保存しました。");
    }
}

function loadBrowser() {
    let pastSaveShop = localStorage.getItem("savedShop");
    let pastSaveUrl = localStorage.getItem("savedUrl");
    pastSaveShop = JSON.parse(pastSaveShop);
    pastSaveUrl = JSON.parse(pastSaveUrl);
    let p_content = document.getElementById('past_saved');

    let pastSavedHtml = "<h2>前回保存した候補</h2>";
    if(pastSaveShop === null) {
        pastSavedHtml += "前回保存した候補はありません。"
    } else {
        pastSavedHtml += "<table border=\"1\">";
        pastSavedHtml += "<tr><th>名称</th></tr>";

        for(let i = 0; i < pastSaveShop.length; i++) {
            pastSavedHtml += "<tr><td><a href='";
            pastSavedHtml += pastSaveUrl[i];
            pastSavedHtml += "'>";
            pastSavedHtml += pastSaveShop[i];
            pastSavedHtml += "</td></tr>";
        }
        pastSavedHtml += "</table>";
    }

    p_content.innerHTML = pastSavedHtml;
}
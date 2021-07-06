function loadXMLfile() {
    fetch("http://157.118.91.44/TGUlocation.xml")
        .then((res) => {
            return (res.text());
        })
        .then((text) => {
            alert(text);
            displayData(text);
        });
}

function displayData(text) {
    let target = document.getElementById('result');
    let i = 0;
    let html = "<table border=\"1\">";
    html += "<tr><th>キャンパス</th><th>緯度</th><th>経度</th></tr>";
    let campus = text.match(/<campus>(.*?)<\/campus>/g);
    let lat = text.match(/<lat>(.*?)<\/lat>/g);
    let lng = text.match(/<lng>(.*?)<\/lng>/g);
    for(i = 0; i< campus.length; i++) {
        html += "<tr><td>";
        html += campus[i];
        html += "</td><td>";
        html += lat[i];
        html += "</td><td>";
        html += lng[i];
        html += "</td></tr>";
    }
    html += "</table>";
    target.innerHTML = html;
}
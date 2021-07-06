let a = new Array();
let b = new Array();
let c = new Array();
let d = [];
let count = 0;
let min;
let divList = new Array();
let divCount = 0;
let txt = "";
let txt2 = [];
let txt3 = [];



function addDiv() {
    c = [];
    divCount += 1;
    divList[(divCount - 1)] = '<div id="div' + divCount - 1 + '"></div>';
    main_tagaini_so();
    count = 0;
}

function main_tagaini_so() {
    a[divCount - 1] = window.prompt("１つ目の数字を入力してください");
    b[divCount - 1] = window.prompt("２つ目の数字を入力してください");

    tagainiso(a[divCount - 1], b[divCount - 1]);
}

function tagainiso(a, b) {
    let aM = 0;
    let bM = 0;

    if(a > b) {
        aM = a;
        bM = b;
    } else {
        aM = b;
        bM = a;
    }

    for(let i = 0; i <= bM; i++) {
        if(bM % i === 0 && aM % i === 0) {
                c[count] = i;
                count += 1;

        } else {
            continue;
        }
    }

    for (let k = 0; k <= (c.length - 1); k++) {
            let test = c[k];
            if (test !== 1 || k !== 0) {
            min = k;
            break;
        }
        }

    d[divCount - 1] = [];
    for(let i = 0; i < c.length; i++) {
        d[divCount - 1][i] = c[i];
    }

    kekka();
    resultView();
}

function kekka() {

    if(a[divCount] === "" || b[divCount] === "" || a[divCount] === null || b[divCount] === null || c[c.length-1] === undefined) {
        window.alert("半角数字で入力してください。");
    } else if(c[c.length -1] === c[min]) {
        window.alert("最大・最小公約数は" + c[c.length - 1] + "です。");
    } else {
            if((c[c.length - 1]) !== 1) {
                window.alert("最大公約数は" + c[c.length - 1] + "です。");

                if (min === undefined) {
                    window.alert("エラー");
                } else {
                    window.alert("最小公約数は" + c[min] + "です。");
                }
            } else if ((c[c.length - 1]) === 1) {
                window.alert(a[divCount-1]+" と " + b[divCount-1] +" は、互いに素です。");
            }
        }
}

function resultView()  {
    txt = "";
    for(let i = 0; i < divCount; i++) {
        txt += '<div id="' + i + '"></div>';
    }

    document.getElementById("result").innerHTML = txt;

    for( let i = 0; i < d.length; i++) {
        txt2[i] = "";
        txt3[i] = "";
        for(let n = 1; n < d[i].length; n++) {
            txt2[i] += '"' + d[i][n] + '"</br>';
        }
        if(d[i][(d[i].length - 1)] !== 1 && d[i][(d[i].length - 1)] !== undefined) {
            txt3[i] = '<p>' + a[i] + ' と ' + b[i] + ' の最大公約数は ' + d[i][(d[i].length - 1)] + ' です。' + '</p><p>' + '他にもこんな数で割れます：</p>' + txt2[i];
        } else if(d[i][(d[i].length - 1)] && d[i][(d[i].length - 1)] !== undefined) {
            txt3[i] = '<p>' + a[i] + ' と ' + b[i] + ' は、互いに素です。';
        } else {
            txt3[i] = 'エラーです。';
        }
        document.getElementById(i).innerHTML = '<p>' + (i + 1) + '：</p>' + txt3[i] + '<p>--------</p>';
    }
}

function cleanUp() {
    document.getElementById("result").innerHTML = "<p>未実行</p>";
    d = [];
    divCount = 0;
}
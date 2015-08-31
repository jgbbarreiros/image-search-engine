var KEYWORDS = ["beach", "birthday", "face", "indoor", "manmade-artificial", "manmade-manmade",
                "manmade-urban", "marriage", "nature", "no_people", "outdoor", "party", "people", "snow"];

/*
 *
 * Events
 *
 */

var search_engine = new SearchEngine();

function enter(e) {
    if(e.keyCode === 13) {
        search(null);
    }
    return false;
}

function search(data) {
    var search;
    if (data)
        search = data;
    else
        search = document.getElementById("search").value;
    if (!search)
        return;
    search_engine.setSearchWord(search);
    search_engine.resetColor();
    var paths = search_engine.getResults();
    if (paths === null) {
        document.getElementById("imgs-box").style.display = "none";
        document.getElementById("img-txt").innerHTML = search + " is not a valid search!";
        return;
    }
    document.getElementById("img-txt").innerHTML = "";
    document.getElementById("imgs-box").style.display = "inline-block";
    var imgs = document.getElementById("imgs-box").getElementsByTagName("img");
    $('#imgs-box').empty();
    for (var i = 0; i < 20; i++) {
        $('#imgs-box').append('<div class="img-box"><img src="' + paths[i] + '"></div>');
    }
}

function select_color(elem) {
    if (search_engine.searchClass === 'Manhattan')
        return;
    if (search_engine.searchClass === elem.title) {
        search_engine.resetColor();
    } else {
        search_engine.setColor(elem.title);
    }
    var paths = search_engine.getResults();
    if (paths === null)
        return;
    var imgs = document.getElementById("imgs-box").getElementsByTagName("img");
    $('#imgs-box').empty();
    for (var i = 0; i < 20; i++) {
        $('#imgs-box').append('<div class="img-box"><img src="' + paths[i] + '"></div>');
    }
}

function drop(ev) {
    document.getElementById("search").value = '';
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    search(data.split('\/').slice(3, data.length).join('-'));
}

window.onload = function() {
    for (var i = 0; i < KEYWORDS.length; i++) {
        $('#imgs-box').append('<div onclick="search(\'' + KEYWORDS[i] + '\')" style="background: url(imgs/Images/' + KEYWORDS[i].replace('-','\/') + '/img_1.jpg); background-size: cover;" class="catg-box"><h3>' + KEYWORDS[i] + '</h3></div>');
    }
}

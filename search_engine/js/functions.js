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
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = paths[i];
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
    for (var i = 0; i < imgs.length; i++) {
        imgs[i].src = paths[i];
    }
}

function drop(ev) {
    document.getElementById("search").value = '';
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    search(data.split('\/').slice(3, data.length).join('-'));
}

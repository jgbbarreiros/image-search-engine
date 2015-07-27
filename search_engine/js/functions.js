/*
 *
 * Events
 *
 */



/*color = "none";


this.loadXML = function () {
    var xmlhttp;
    if (window.XMLHttpRequest)
        xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", "xml/database.xml", false);
    xmlhttp.send();
    return xmlhttp.responseXML;
};
*/

function enter(e) {
    if(e.keyCode === 13) {
        var search_engine = new SearchEngine();
        var search = document.getElementById("search");
        search_engine.setSearchWord(search.value);
        search_engine.resetColor();
        var paths = search_engine.getResults();
        if (paths === null) {
            document.getElementById("imgs-box").style.display = "none";
            document.getElementById("img-txt").innerHTML = search.value + " is not a valid search!";
            return;
        }
        document.getElementById("img-txt").innerHTML = "";
        document.getElementById("imgs-box").style.display = "inline-block";
        var imgs = document.getElementById("imgs-box").getElementsByTagName("img");
        for (var i = 0; i < paths.length; i++) {
            imgs[i].src = "../data_base/" + paths[i];
        }
    }
    return false;
}
        /*var search = document.getElementById("search");
      	var word = search.value;
      	//alert(word);
      	//if (word.)
        var item = localStorage.getItem(word);
        img_txt = document.getElementById("img-txt");
        imgs_box = document.getElementById("imgs-box");
        if (item === null) {
            img_txt.innerHTML = word + " is not a valid search!";
            imgs_box.style.display = "none";
            return;
        }
        else if (window.DOMParser) {
            var parser = new DOMParser();
            var xmlDoc = parser.parseFromString(item, "text/xml");
        }
        imgs_box.style.display = "inline-block";
        img_txt.innerHTML = "";
        var xml = loadXML();
        var path = "../data_base/imgs/" + xml.getElementsByClassName(word)[0].getElementsByTagName("path")[0].childNodes[0].nodeValue;
        //alert("new src = " + path);
        var imgs = document.getElementById("imgs-box").getElementsByTagName("img");
        imgs[0].src = path;*/
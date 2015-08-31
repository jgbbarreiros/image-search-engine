function SearchEngine() {
    
    this.searchWord = undefined;
    this.searchClass = undefined;
    
    this.getResults = function() {
        var folder;
        if (isImage(this.searchWord)) {
            this.searchClass = "Manhattan";
            folder = 'moment';
            document.getElementById('nav-search-value').style.display = 'none';
            document.getElementById('nav-search-img').style.display = 'block';
            document.getElementById('nav-search-img').src = this.searchWord.replace(/-/g, '\/');
        } else {
            folder = 'color';
            document.getElementById('nav-search-img').style.display = 'none';
            document.getElementById('nav-search-value').style.display = 'block';
            document.getElementById('nav-search-value').innerHTML = this.searchWord;
        }
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        xmlhttp.open('GET', '/xml/' + folder + '/' + this.searchWord + '.xml', false);
        xmlhttp.setRequestHeader("content-type","text/xml");
        xmlhttp.send();
        var xml = xmlhttp.responseXML;
        if (xml === null)
            return null;
        var paths = [];
        var imgs = xml.getElementsByClassName(this.searchClass)[0].childNodes;
        for (var i = 0; i < imgs.length; i++) {
            var path = imgs[i].childNodes[0].nodeValue;
            paths.push(path);
        }
        return paths;
    };
    
    this.setSearchWord = function(sw) {
        this.searchWord = sw;
    };
    
    this.setColor = function(c) {
        this.searchClass = c;
        var buttons = document.getElementsByClassName("color-btn");
        for (var i = 0; i < buttons.length; i++) {
            if (buttons[i].title !== c)
                buttons[i].style.border = 'none';
            else
                buttons[i].style.border = 'solid 2px black';
        }
    };
    
    this.resetColor = function() {
        this.searchClass = "unordered";
        var buttons = document.getElementsByClassName("color-btn");
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].style.border = 'none';
        }
    };
    
    var isImage = function(word) {
        var parts = word.split(".");
        return (parts[parts.length - 1] == "jpg");
    };
}
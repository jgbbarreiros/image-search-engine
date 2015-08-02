function SearchEngine() {
    
    var search_word;
    var className;
    
    this.getResults = function() {
        var localStorageRow = localStorage.getItem(search_word);
        if (localStorageRow === null)
            return null;
        if (isImage(search_word))
            className = "Manhattan";
        var paths = [];
        var xml;
        if (window.DOMParser) {
            var parser = new DOMParser();
            xml = parser.parseFromString(localStorageRow, "text/xml");
        }
        var imgs = xml.getElementsByClassName(className)[0].childNodes;
        for (var i = 0; i < imgs.length; i++) {
            var path = imgs[i].childNodes[0].nodeValue;
            paths.push(path);
        }
        return paths;
    };
    
    this.setSearchWord = function(sw) {
        search_word = sw;
    };
    
    this.setColor = function(c) {
        className = c;
    };
    
    this.resetColor = function() {
        className = "unordered";
    };
    
    var isImage = function(word) {
        var parts = word.split(".");
        return (parts[parts.length - 1] == "jpg");
    };
}
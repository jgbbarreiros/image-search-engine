function SearchEngine() {
    
    this.search_word = undefined;
    this.className = undefined;
    
    this.getResults = function() {
        var localStorageRow = localStorage.getItem(this.search_word);
        if (localStorageRow === null)
            return null;
        if (isImage(this.search_word))
            this.className = "Manhattan";
        var paths = [];
        var xml;
        if (window.DOMParser) {
            var parser = new DOMParser();
            xml = parser.parseFromString(localStorageRow, "text/xml");
        }
        var imgs = xml.getElementsByClassName(this.className)[0].childNodes;
        for (var i = 0; i < imgs.length; i++) {
            var path = imgs[i].childNodes[0].nodeValue;
            paths.push(path);
        }
        return paths;
    };
    
    this.setSearchWord = function(sw) {
        this.search_word = sw;
    };
    
    this.setColor = function(c) {
        this.className = c;
    };
    
    this.resetColor = function() {
        this.className = "unordered";
    };
    
    var isImage = function(word) {
        var parts = word.split(".");
        return (parts[parts.length - 1] == "jpg");
    };
}
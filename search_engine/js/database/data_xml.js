function DataXML(file) {
    this.fileName = file;

    this.loadXML = function () {
        var xmlhttp;
        if (window.XMLHttpRequest)
            xmlhttp = new XMLHttpRequest();
        xmlhttp.open("GET", this.fileName, false);
        xmlhttp.send();
        return xmlhttp.responseXML;
    };

    this.readImages = function(num_imgs) {
        consoleLog.innerHTML = "reading images";
        var imgs = [];
        var xml = this.loadXML();
        var imgs_to_load = KEYWORDS.length*num_imgs;
        var imgs_loaded = 0;

        for (var i = 0; i < KEYWORDS.length; i ++) {
            var imgs_keyword = xml.getElementsByClassName(KEYWORDS[i].replace('-','\/'));
            for (var j = 0; j < num_imgs; j++) {
                var img = new Image();
                var path = "imgs/" + imgs_keyword[j].getElementsByTagName("path")[0].childNodes[0].nodeValue;
                img.onload = function() {
                    imgs_loaded += 1;
                    consoleLog.innerHTML = "images loaded " + imgs_loaded + " of " + imgs_to_load;
                    if (imgs_loaded == imgs_to_load) {
                        processImages(imgs);
                    }
                };
                img.src = path;
                var img_inf = {img: img, path: path};
                imgs.push(img_inf);
            }
        }
    };
}
function LocalStorageXML() {

    this.saveImagesXML = function(imgs) {
        localStorage.clear();
        saveColor(imgs);
        // saveMoments(imgs);
    };

    var saveColor = function(imgs) {
        for (var i = 0; i < KEYWORDS.length; i++) {
            var xmlRowString = '<' + KEYWORDS[i] + '>';
            var imgs_keyword = imgs.slice(i*NUM_IMG_PER_CATEGORY, i*NUM_IMG_PER_CATEGORY+NUM_IMG_PER_CATEGORY);
            
            xmlRowString += '<images class="unordered">';
            for (var j = 0; j < imgs_keyword.length; j++) {
                xmlRowString += '<path>' + imgs_keyword[j].path + '</path>';
            }
            xmlRowString += '</images>';
            
            for (var j = 0; j < COLORS.length; j++) {
                xmlRowString += '<images class="' + COLORS[j].name + '">';
                imgs_keyword.sort(
                    function (a, b) {
                        var keyA = a.hist[j];
                        var keyB = b.hist[j];
                        if (keyA < keyB) return 1;
                        if (keyA > keyB) return -1;
                        return 0;
                    }
                );
                for (var k = 0; k < imgs_keyword.length; k++) {
                    xmlRowString += '<path>' + imgs_keyword[k].path + '</path>';
                }
                xmlRowString += '</images>';
            }
            xmlRowString += '</' + KEYWORDS[i] + '>';
            var xmlhttp;
            if (window.XMLHttpRequest)
                xmlhttp = new XMLHttpRequest();
            xmlhttp.open("PUT", '/xml/color/' + KEYWORDS[i] + '.xml', false);
            xmlhttp.setRequestHeader("content-type", "text/xml");
            xmlhttp.send(xmlRowString);
        }
    };

    var saveMoments = function(imgs) {
        for (var i = 0; i < imgs.length; i++) {
            var xmlRowString = '<image class="Manhattan">';
            var manhattan = imgs[i].manhattan;
            manhattan.sort(
                function (a, b) {
                    var keyA = a.diff;
                    var keyB = b.diff;
                    if (keyA < keyB) return -1;
                    if (keyA > keyB) return 1;
                    return 0;
                }
            );
            for (var j = 0; j < manhattan.length; j++) {
                xmlRowString += '<path>' + manhattan[j].path + '</path>';
            }
            xmlRowString += '</image>';
            var xmlhttp;
            if (window.XMLHttpRequest)
                xmlhttp = new XMLHttpRequest();
            xmlhttp.open("PUT", '/xml/moment/' + imgs[i].path.replace(/\//g, '-') + '.xml', false);
            xmlhttp.setRequestHeader("content-type", "text/xml");
            xmlhttp.send(xmlRowString);
            // if (typeof(localStorage) == 'undefined')
            //     alert('Your browser does not support HTML5 localStorage. Try upgrading.');
            // else {
            //     try {
            //         localStorage.setItem(imgs[i].path, xmlRowString);
            //     }
            //     catch (e) {
            //         alert("save failed!");
            //         if (e == QUOTA_EXCEEDED_ERR)
            //             alert('Quota exceeded!');
            //     }
            // }
        }
    };

    this.readImagesXML = function() {
        for (var i = 0; i < KEYWORDS.length; i ++) {
            document.write("<h1>" + KEYWORDS[i] + "</h1>");
            var xmlhttp;
            if (window.XMLHttpRequest)
                xmlhttp = new XMLHttpRequest();
            xmlhttp.open('GET', '/xml/color/' + KEYWORDS[i] + '.xml', false);
            xmlhttp.setRequestHeader("content-type","text/xml");
            xmlhttp.send();
            var xmlDoc = xmlhttp.responseXML;
            for (var j = 0; j < COLORS.length; j++) {
                var imgs_color = xmlDoc.getElementsByClassName(COLORS[j].name)[0];
                document.write("<h2>" + COLORS[j].name + "</h2>");
                for (var k = 0; k < imgs_color.childNodes.length; k++) {
                    document.write("<p>" + imgs_color.childNodes[k].childNodes[0].nodeValue + "</p>");
                }
            }
        }
    };
}
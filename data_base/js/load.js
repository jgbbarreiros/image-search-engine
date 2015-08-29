var red    = new Color(204,   0,   0,    "red");
var orange = new Color(251, 148,  11, "orange");
var yellow = new Color(255, 255,   0, "yellow");
var green  = new Color(  0, 204,   0,  "green");
var teal   = new Color(  3, 192, 198,   "teal");
var blue   = new Color(  0,   0, 255,   "blue");
var purple = new Color(118,  44, 167, "purple");
var pink   = new Color(255, 152, 191,   "pink");
var white  = new Color(255, 255, 255,  "white");
var gray   = new Color(153, 153, 153,   "gray");
var black  = new Color(  0,   0,   0,  "black");
var brown  = new Color(136,  84,  24,  "brown");

var consoleLogHeader;
var consoleLog;
var canvas;
var NUM_IMG_PER_CATEGORY = 1;
var KEYWORDS = ["beach", "birthday", "face"];/*, "indoor", "manmade/artificial", "manmade/manmade",
                "manmade/urban", "marriage", "nature", "no_people", "outdoor", "party", "people", "snow"];*/
var COLORS = [red, orange, yellow, green, teal, blue, purple, pink, white, gray, black, brown];

function Color(r, g, b, name) {
    this.r = Math.floor(r);
    this.g = Math.floor(g);
    this.b = Math.floor(b);
    this.name = name;
    this.color = ["rgb(",this.r,",",this.g,",",this.b,")"].join("");
}

window.onload = function() {
    consoleLogHeader = document.getElementById("consoleLogHeader");
    consoleLog = document.getElementById("consoleLog");
    consoleLogHeader.innerHTML = "Running...";
    canvas = document.querySelector("canvas");
    var data_xml = new DataXML("/xml/database.xml");
    setTimeout(function() {
        data_xml.readImages(NUM_IMG_PER_CATEGORY); // images per category
    }, 0);
};

processImages = function(imgs) {
    processColor(imgs);
    processMoments(imgs);
    saveImages(imgs);
    consoleLogHeader.innerHTML = "Done!";

};

processColor = function(imgs) {
    var ipc = new ImageProcessingColor(canvas);
    for (var i = 0; i < imgs.length; i++) {
        consoleLog.innerHTML = "process color " + (i+1) + " of " + imgs.length;
        imgs[i].hist = ipc.colorHist(imgs[i].img);
    }
};

processMoments = function(imgs) {
    var ipm = new ImageProcessingMoments(canvas);
    for (var i = 0; i < imgs.length; i++) {
        consoleLog.innerHTML = "process moments " + (i+1) + " of " + imgs.length;
        imgs[i].moments = ipm.colorMoments(imgs[i].img);
    }

    for (var i = 0; i < imgs.length; i++) {
        imgs[i].manhattan = [];
        for (var j = 0; j < imgs.length; j++) {
            if (i != j) {
                imgs[i].manhattan.push({diff: ipm.Manhattan_distance(imgs[i].moments, imgs[j].moments), path: imgs[j].path});
            }
        }
    }
};

saveImages = function(imgs) {
    var ls_xml = new LocalStorageXML();
    ls_xml.saveImagesXML(imgs);
    ls_xml.readImagesXML();
};
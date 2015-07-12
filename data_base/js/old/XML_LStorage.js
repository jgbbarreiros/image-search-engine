function main()
{
	var xml_d = new XML_Data("xml/My_database.xml");
	var localS = new LocalStorageXML(xml_d);
	xml_d.readXML();
	localS.saveXMLLS();
	localS.readXMLLS();
}

function XML_Data(file) {
	this.filename = file;


	this.init = function () {
		this.readXML();
	};

	this.loadXML = function () {
		var xmlhttp;
		if (window.XMLHttpRequest) {
			xmlhttp = new XMLHttpRequest();
		}
		xmlhttp.open("GET", this.filename, false);
		xmlhttp.send();
		var xmlDoc = xmlhttp.responseXML;
		return xmlDoc;
	};

	this.readXML = function () {
		//var index = 0,
		//	infoImages = new Array(100);
		//var path = "",
		//	title = "";
		//for (var i = 0; i < )

		var xmlDoc = this.loadXML();
		var x = xmlDoc.getElementsByTagName("image");
		var num_Img = 1;
		for (var i = 0; i < x.length; i++) {
			document.write("<p>" + num_Img + "->" + x[i].getElementsByTagName("path")[0].childNodes[0].nodeValue + "</p>");
			num_Img++;
		}

	};
}

function LocalStorageXML(xml_d)
{
    this.xml_d= xml_d;
	this.cores = ["Azul", "Amarelo", "Vermelho", "Verde"];
	this.localStorageName = "birthday";

	this.saveXMLLS = function () {
		var xmlRowString = "<images>";

		var xmlDoc = this.xml_d.loadXML();
		var x = xmlDoc.getElementsByTagName("image");
		index = 0;
		for (var i = 0; i < this.cores.length; i++) {
			for (var j = 0; j < 4; j++) {
				var path = x[index].getElementsByTagName("path")[0].childNodes[0].nodeValue;
				index++;
				xmlRowString += '<image class="' + this.cores[i] + '"><path>' + path + '</path> </image>';
			}
		}
		xmlRowString += "</images>";

		// Grava a string "xmlRowString" para o armazenamento local
		if (typeof(localStorage) == 'undefined')
			alert('Your browser does not support HTML5 localStorage. Try upgrading.');
		else {
			try {
				localStorage.setItem(this.localStorageName, xmlRowString);
			}
			catch (e) {
				alert("save failed!");
				if (e == QUOTA_EXCEEDED_ERR)
					alert('Quota exceeded!');
			}
		}
	};

	this.readXMLLS = function () {
		var localStorageRow = localStorage.getItem(this.localStorageName);

		if (window.DOMParser) {
			var parser = new DOMParser();
			var xmlDoc = parser.parseFromString(localStorageRow, "text/xml");
		}
		var x = xmlDoc.getElementsByTagName("image");

		for (i = 0; i < x.length; i++) {
			if (x[i].attributes["class"].value == "Azul") {
				document.write("<p>" + x[i].getElementsByTagName("path")[0].childNodes[0].nodeValue + "</p>");
			}
		}

	};

}
	
	
	
    







    
    
   
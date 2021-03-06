var http = require('http');
var fs = require('fs');
var path = require('path');

console.log('Starting...');
var config = JSON.parse(fs.readFileSync('config.json'));
var host = config.host;
var port = config.port;

var server = http.createServer(function (req, res) {
	// recived request
	console.log('Request: ' + req.method + ' "' +req.url + '"');

	// GET request
	if (req.method === 'GET') {

		var url = (req.url === '/') ? '/index.html': req.url;
		// TODO
		// if url does not have extension assume as folder and display available files
		var ext = path.extname(url);
		var type = config.exts[ext];

		// if file extension is known/valid
		if (type) {
			fs.readFile('.' + url, function(err, data) {
				// if file is not found on the server
				if (err) {
					console.log('Page not found: ' + req.url.replace('\/',''));
					res.writeHead(404, {'content-type': 'text/plain'});
					res.end('Sorry, the page\/file "' + req.url.replace('\/','') +'" was not found!');
				}
				res.writeHead(200, {'content-type': type});
				res.end(data);
			});
		} else {
			console.log('Unknown file extension: "' + ext + '"');
			res.writeHead(404, {'content-type': 'text/plain'});
			res.end('Unknown file extension "' + ext + '"');
		}
	}

	// PUT request
	else if (req.method === 'PUT') {
		var body = '';
        req.setEncoding('utf8');
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            // console.log('Message: "' + body + '"');
            console.log('Message saved to: ' + req.url)
            fs.writeFileSync(req.url.replace('\/', ''), body);
            res.end();
        });
	}

	// POST request
	else if (req.method === "POST") {

        var body = '';
        req.setEncoding('utf8');
        req.on('data', function (data) {
            body += data;
        });
        req.on('end', function () {
            console.log('Message: "' + body + '"');
            res.end();
        });
    }

    else {
        res.writeHead(405, 'Method Not Supported', {'content-type': 'text/html'});
        return res.end('<!doctype html><html><head><title>405</title></head><body>405: Method Not Supported</body></html>');
    }
});

server.listen(port, host, function() {
	console.log('Listening ' + host + ':' + port);
});

var http = require('http')
  , path = require('path')
  , fs = require('fs')
  , formidable = require('formidable')
  , upload = require('./upload')
  , PORT = process.argv[2] || process.env.PORT || 3000;

http.createServer(function server (req, res) {
  if (req.url == '/upload' && req.method.toLowerCase() == 'post') {
    // parse a file upload
    (new formidable.IncomingForm()).parse(req, function(err, fields, files) {
      req.files = files;
      upload(req, res);
    });
    return;
  }
  res.writeHead(200, {'content-type': 'text/html'});
  fs.createReadStream('./index.html').pipe(res);
}).listen(PORT);
console.log('Express server listening on port ' + PORT);
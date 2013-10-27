var express = require('express')
  , upload = require('./upload')
  , http = require('http')
  , path = require('path')
  , fs = require('fs')
  , PORT = process.argv[2] || process.env.PORT || 3000;

var app = express();

// all environments
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);

app.get('/', function (req, res) {
  fs.createReadStream('./index.html').pipe(res);
});
app.post('/upload', upload);

http.createServer(app).listen(PORT, function(){
  console.log('Express server listening on port ' + PORT);
});
var fs = require('fs')
  , crypto = require('crypto')
  , path = require('path')
  , gm = require('gm')
  , getExt = /\.\w+/
  , cwd = process.cwd()
  , base64 = require('base64-stream')
  , through = require('through')


module.exports = function(req, res){
  var imageName, hash, no, ext

  if (!req.files || isEmpty(req.files)) {
    res.end('died')
    return
  }

  imageName = req.files.image.name

  if (!imageName) {
    console.log('error')
    res.send('error')
    return
  }

  ext = imageName.match(getExt)

  if (!ext) {
    res.end('died')
    return
  } 

  ext = ext[0]
  hash = crypto.createHash('sha1')
  hash.update(String(Math.floor(Math.random()*999999999) + 1))

  var fileName = hash.digest('hex').substring(0, 8) + ext
  var fullFilePath = req.files.image.path

  gm(fs.createReadStream(fullFilePath), fileName)
    .size({bufferStream: true}, function (err, size) {
      // console.log(err, size)
      this.resize(200, 200)
      this.stream(function(err, stdout, stderr) {
        res.writeHead(200)
        stdout.pipe(res)
        // .pipe(base64.encode()).pipe(through(function () {}))
        
        res.on('finish', function () {
          fs.unlink(fullFilePath)
          //  delete file from server async
        })
      })
    })
}

function isEmpty (obj) {
  return Object.keys(obj).length === 0 ? true : false
}
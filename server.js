var shoe = require('shoe');
var upnode = require('upnode');

var http = require('http');
var ecstatic = require('ecstatic')(__dirname + '/static');

var server = http.createServer(ecstatic);
server.listen(9999);

var sock = shoe(function (stream) {
  var u = upnode(function(client, conn){
    this.transform = function (s, cb) {
      var res = s.replace(/[aeiou]{2,}/, 'oo').toUpperCase();
      cb(res);
    };
    this.test = function(cb) {
      cb('test');
    };
  });
  u.pipe(stream).pipe(u);
});
sock.on('log', function(level, msg) {
  console.log(level + ": " + msg);
});
sock.install(server, '/dnode');

var domready = require('domready');
var shoe = require('shoe');
var upnode = require('upnode');

domready(function () {
  var result = document.getElementById('result');
  //var stream = shoe('/dnode');
  var createStream = shoe.bind(this, '/dnode');
  var up = upnode.connect({
    createStream: createStream
  });

  up(function(remote) {
    remote.transform('beep', function(s) {
      result.textContent = 'beep => ' + s;
    });
    remote.test(function(message) {
      result.textContent = message;
    });
  });


  setInterval(function () {
    up(function(remote) {
      remote.test(function(s) {
        console.log(s);
      });
    });
  }, 1000);
});

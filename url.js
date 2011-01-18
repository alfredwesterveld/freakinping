var sys = require('sys'),
wwwdude = require('wwwdude');

const EventEmitter = require('events').EventEmitter;
const client = wwwdude.createClient({
    headers: { 'User-Agent': 'wwwdude test 42' },
});

function Url(concurrency) {
  this.concurrency = concurrency;
  this.connected = 0;
  this.emitter = new EventEmitter;
}

var get = function(url) {
    var begin = new Date().getTime();
    
     client.get(url)
    .addListener('error', function (err) {
        console.log('received error from urlfetch ' + url + ' at ' + new Date().toLocaleTimeString());
        sys.puts('Network Error: ' + sys.inspect(err));
    }).addListener('success', function (data, resp) {
        this.connected--;
        var end = new Date().getTime();
        var timeSpent = end - begin;
        console.log('[url: ' + url + '] [Time spent: ' + timeSpent 
            + 'ms] [started: ] ' + new Date(begin).toLocaleTimeString()
            + '[ended: ' + new Date().toLocaleTimeString() + ']');
    }).send();
}

Url.prototype.fetch = function(url) {
    get(url);
}

module.exports.create = function(concurrency) {
    return new Url(concurrency || 1);
}

var ping = require('./ping').create(),
    redis = require("redis"),
    client = redis.createClient();

var getJob = function() {
    client.brpop('urls-queue', 0, function(err, reply) {
        if (err) {
            console.log(err);
        } else {
            console.log('received url from queue ' + reply[1] + ' at ' + new Date().toLocaleTimeString());
            ping.ping(reply[1]);
            getJob();
        }
    });
}

getJob();

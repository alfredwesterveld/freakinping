var redis = require("redis"),
    client = redis.createClient();

//var delay = 5 * 60 * 1000; // 5 minutes
var delay = 30 * 1000; // 5 seconds

var callback = function() {
    console.log(new Date().toLocaleTimeString());
    
    client.smembers('urls',  function (err, replies) {
        replies.forEach(function (reply, i) {
            //console.log("    " + i + ": " + reply);
            client.rpush('urls-queue', reply, function (err, reply) {
            });
        });
    });
}

setInterval(callback, delay);

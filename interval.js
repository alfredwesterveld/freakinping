var redis = require("redis"),
    client = redis.createClient();

var delay;

if (process.argv[2]) {
    delay = process.argv[2] * 1000;
} else {
    console.log('interval argument missing');
    process.exit();
}

console.log(delay);

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

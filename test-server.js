var port;

if (process.argv[2]) {
    port = process.argv[2];
} else {
    console.log('port argument missing');
    process.exit();
}

const PORT = port;
const HOST = 'localhost';
const express = require('express');
const app = module.exports = express.createServer();
app.use(express.staticProvider(__dirname + '/public'));

// to reconnect.
app.get('/ping', function(req, res) {
    console.log('ping');
    res.send('ping');
});

if (!module.parent) {
    app.listen(PORT, HOST);
    console.log("Express server listening on port %d", app.address().port)
}


#Alpha

This software is even before alpha state.

#Dependencies

This software depends on:

- node.js => nodejs.org
- redis => redis.io
- npm => https://github.com/isaacs/npm
- npm install redis hiredis => https://github.com/mranney/node_redis
- npm install express => https://github.com/visionmedia/express

#Add URLs

To add URLs which should be measured for response time for now just add them via redis-cli

    zadd urls 'http://localhost:1234/ping'
    
#Test server

test-server.js is a test server which hosts just a simple server which responds to GET /ping on port which you specify as argument
To start the server you use:
    node test-server 1234
    
Which in turn will host a test server(localhost only) on port 1234.
    
#Interval

Interval is a script which for now retrieves URLs which need to be measured for response time to the worker-queue at the specified interval.
You start it via
    node interval.js

#Worker(s)

The worker(s) takes an URL from the worker-queue(when available) and measures the response time. For now it just prints this information to screen.
It gets executed by:
    node worker.js

#TODOS

Like I mentoined before this software is still in alpha(pre). For now I would strongely encourage against using it against domains on the internet(you don't control) because there isn't any throttling yet. Below I like to keep track of a list of todos:

- Documentation is not up to the snuff.
- Should have tests.
- Should make npm package.
- Client throttling. The client should throttle in multiple ways like for example both request per domain as total requests. I am also wondering if there isn't any library(npm) which can handle this for me. I should do some research on this.

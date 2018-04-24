const  express = require('express'),
       app = express()

var http = require('http'),
    faye = require('faye');

var server = http.createServer(app),
        
    bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

app.use(express.static(__dirname + '/public'))

var client = new faye.Client('http://localhost:8000/faye')

/**
 * the client to SUBSCRIBE (listen in)
 * messages coming into the same CHANNEL (/messages)
 */
client.subscribe('/messages', function (newMessage) {
  console.log("New Message: ", newMessage)
 });

bayeux.attach(server);
server.listen(8000);
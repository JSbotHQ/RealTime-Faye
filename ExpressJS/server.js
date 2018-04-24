const  express = require('express'),
       app = express()

const http = require('http'),
      faye = require('faye');

const server = http.createServer(app),

      bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

app.use(express.static(__dirname + '/public'))

const client = new faye.Client('http://localhost:8000/faye')

const newmessage = (newMessage) => {
    console.log("New Message: ", newMessage)
}

/**
 * client to SUBSCRIBE (listen in server)
 * messages coming into the same CHANNEL (/messages)
 */
client.subscribe('/messages', newmessage);

bayeux.on('handshake',(clientId)=> {
    console.log(clientId)
    client.publish('/onlineUsers',clientId)
})

bayeux.attach(server);

server.listen(8000);
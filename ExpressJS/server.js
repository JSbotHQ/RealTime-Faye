const  express = require('express'),
       app = express()

const http = require('http'),
      faye = require('faye');
const bodyParser = require ('body-parser'),
      morgan = require ('morgan');
const server = http.createServer(app),
      bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});

app.use(morgan());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'))

const client = new faye.Client('http://localhost:8000/faye')

app.post('/message', function(req, res) {
    bayeux.getClient().publish('/channel', {text: req.body.message});
    res.send(200);
});

const newmessage = (newMessage) => {
    console.log("New Message: ", newMessage)
}

/**
 * client to SUBSCRIBE (listen in server)
 * messages coming into the same CHANNEL (/messages)
 */
client.subscribe(`/messages`, newmessage);

let connected_clients = []
bayeux.on(`handshake`,(clientId)=> {
    connected_clients.push(clientId)
    console.log(`connected`,connected_clients)
    client.publish(`/onlineUsers`,{text: connected_clients})
})

bayeux.on('disconnect',(clientId)=> {
    let index = connected_clients.indexOf(clientId);
    if (index > -1) {
        connected_clients.splice(index, 1);
    }
    console.log(`disconnected`,clientId)
})

bayeux.attach(server);

server.listen(8000);
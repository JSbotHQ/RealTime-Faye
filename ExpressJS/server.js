const  express = require('express'),
       app = express()
const _ = require('lodash')

const http = require('http'),
      faye = require('faye');

const bodyParser = require ('body-parser'),
      morgan = require ('morgan');

const server = http.createServer(app),

bayeux = new faye.NodeAdapter({ mount: '/faye', timeout: 45 });

app.use(morgan());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));

const client = new faye.Client('http://localhost:8000/faye')

/**
 * server side code for sending message to all user through server
 */
// app.post('/message', function(req, res) {
//     bayeux.getClient().publish('/channel', {text: req.body.message});
//     res.send(200);
// });

//HANDLERS
/**
 * get message and publish connected user
 * @param msg
 */
const newmessage = (msg) => {
    if (_.includes(connected_clients,msg.id)){
        client.publish('/message', msg.message)
    }
}

/**
 * get connected users
 * @type {Array}
 */
let connected_clients = []
const client_id = (clientId)=> {
    connected_clients.push(clientId)
    console.log(`connected`,connected_clients)
    client.publish(`/onlineUsers`,{text: connected_clients})
}

/**
 * get Disconnected users
 * @param clientId
 */
const disconnected = (clientId)=> {
    let index = connected_clients.indexOf(clientId);
    if (index > -1) {
        connected_clients.splice(index, 1);
    }
    console.log(`disconnected`,clientId)
}

/**
 * client to SUBSCRIBE (listen in server)
 * messages coming into the same CHANNEL (/messages)
 */

//LISTENERS
client.subscribe(`/message-serv`, newmessage);
bayeux.on(`handshake`,client_id)
bayeux.on('disconnect',disconnected)

// Routes for private chat(peer to peer)
app.get('/chat', (req, res)=>{
    res.sendFile('client.html', {root: './public'});
});

// Route for group chat (room chat)
app.get('/group', (req, res)=> {
    res.sendFile('group.html', {root: './public'});
});

bayeux.attach(server);

server.listen(8000);
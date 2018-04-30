// Hapi
const Hapi = require('hapi');

// Create a server with a host and port

const server = Hapi.server({
    host: 'localhost',
    port: 8000
});

const start = async () => {

    try {
        await server.register(require('inert'));

        await server.start();
    }
    catch (err) {
        console.log(err);
        process.exit(1);
    }

    console.log('Server running at:', server.info.uri);
};
start();

// Faye
const faye = require('faye');
const bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
const client = new faye.Client('http://localhost:8000/faye')
// Faye via Hapi
bayeux.attach(server.listener);

const newmessage = (msg) => {
    console.log("New Message: ", msg)
    client.publish('/message', msg.message)
}


////HANDLERS
/**
 * get new message in serverside and publish to user
 * @param msg
 */
const newmessage = (msg) => {
    console.log("New Message: ", msg)
    client.publish('/message', msg.message)
}

/**
 * connected users
 * @type {Array}
 */
let connected_clients = []
const connected = (clientId) => {
    connected_clients.push(clientId)
    console.log(`connected`, connected_clients)
    client.publish(`/onlineUsers`, {text: connected_clients})
}

/**
 * disconnected user
 * @param clientId
 */
let disconnected = (clientId) => {
    let index = connected_clients.indexOf(clientId);
    if (index > -1) {
        connected_clients.splice(index, 1);
    }
    console.log(`disconnected`, clientId)
}

/**
 * client to SUBSCRIBE (listen in server)
 * messages coming into the same CHANNEL (/messages)
 */
client.subscribe(`/message-serv`, newmessage);

bayeux.on(`handshake`, connected)
bayeux.on('disconnect',disconnected)



// Serve static file
// ROUTES
server.route({
    method: 'GET',
    path: '/chat',
    handler: (request, h) => h.file('./public/chat.html')
});
server.route({
    method: 'GET',
    path: '/group',
    handler: (request, h) => h.file('./public/group.html')
});




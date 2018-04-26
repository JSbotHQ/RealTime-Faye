'use strict'

const Service = require('trails/service')


/**
 * @module ServerService
 * @description TODO document Service
 */

module.exports = class ServerService extends Service {

    constructor(app) {

        super(app)
        this.faye = require('faye')
    }

    socketInit(http) {

        const server = http

        const bayeux = new this.faye.NodeAdapter({mount: '/faye', timeout: 45});

        const client = new this.faye.Client('http://localhost:8000/faye')

        const newmessage = (newMessage) => {
            console.log("New Message: ", newMessage)
        }

        /**
         * client to SUBSCRIBE (listen in server)
         * messages coming into the same CHANNEL (/messages)
         */

        client.subscribe(`/messages`, newmessage);

        let connected_clients = []
        bayeux.on(`handshake`, (clientId) => {
            connected_clients.push(clientId)
            console.log(`connected`, connected_clients)
            client.publish(`/onlineUsers`, {text: connected_clients})
        })

        bayeux.on('disconnect', (clientId) => {
            let index = connected_clients.indexOf(clientId);
            if (index > -1) {
                connected_clients.splice(index, 1);
            }
            console.log(`disconnected`, clientId)
        })

        bayeux.attach(server);

    }


}

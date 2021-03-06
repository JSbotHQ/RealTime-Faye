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

        this.http = http

        const bayeux = new this.faye.NodeAdapter({mount: '/faye', timeout: 45});

        const client = new this.faye.Client('http://localhost:8000/faye')

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

        bayeux.attach(http);
    }
}

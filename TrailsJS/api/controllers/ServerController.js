'use strict'

const Controller = require('trails/controller')

/**
 * @module ServerController
 * @description TODO document Controller.
 */
module.exports = class ServerController extends Controller {


    /**
     * Routes for private chat(peer to peer)
     * @param req
     * @param res
     */
    chat(req, res) {
        return res.sendFile('chat.html', {root: './public'});
    }

    /**
     * Routes for Group chat
     * @param req
     * @param res
     */
    group(req, res) {
        return res.sendFile('group.html', {root: './public'});
    }

}


'use strict'

const Controller = require('trails/controller')
const faye = require('faye');

/**
 * @module ServerController
 * @description TODO document Controller.
 */
module.exports = class ServerController extends Controller {

    message(req, res) {
        const bayeux = new faye.NodeAdapter({mount: '/faye', timeout: 45});
        bayeux.getClient().publish('/channel', {text: req.body.message});
        res.send(200);
    };

    chat(req,res){
        return res.sendFile('client.html', {root: './public'});
    }

    client1(req,res){
        return res.sendFile('client1.html', {root: './public'});
    }

    client2(req,res){
        return res.sendFile('client2.html', {root: './public'});
    }
}


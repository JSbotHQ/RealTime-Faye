/**
 * Routes Configuration
 * (trails.config.routes)
 *
 * Configure how routes map to views and controllers.
 *
 * @see http://trailsjs.io/doc/config/routes.js
 */

'use strict'

module.exports = [

  /**
   * Render the HelloWorld view
   */
  {
    method: 'GET',
    path: '/',
    handler: 'ViewController.helloWorld'
  },

  /**
   * Constrain the DefaultController.info handler to accept only GET requests.
   */
  {
    method: [ 'GET' ],
    path: '/api/v1/default/info',
    handler: 'DefaultController.info'
  },

  {
    method: [ 'POST' ],
    path: '/message',
    handler: 'ServerController.message'
  },
  {
    method: [ 'GET' ],
    path: '/chat',
    handler: 'ServerController.chat'
  },
  {
    method: [ 'GET' ],
    path: '/client1',
    handler: 'ServerController.client1'
  },
  {
    method: [ 'GET' ],
    path: '/client2',
    handler: 'ServerController.client2'
  }

]

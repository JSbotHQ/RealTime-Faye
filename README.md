# RealTime-Faye

#1. ExpressJS
  - `cd ExpressJS`
  - start the server by `npm start`.

  i. server to all connected client messaging
   - go to `http://localhost:8000/client1.html`.
   - go to `http://localhost:8000/client2.html`.

  client code logic:

        $('#fire').on('click',null, function() {
                   let url = 'http://localhost:8000/message';
                   let message = {message: 'Client 1: ' + $chat.val()};
                   let dataType = 'json';
                   $.ajax({
                       type: 'POST',
                       url: url,
                       data: message,
                       dataType: dataType,
                   });
                   $chat.val('');
        });

        client.subscribe('/channel', function(message) {
              $('#messages').append('<p>' + message.text + '</p>');
        });

  server code logic:

        app.post('/message', function(req, res) {
            bayeux.getClient().publish('/channel', {text: req.body.message});
            res.send(200);
        });

  ii. client to client messaging using server
   - go to `http://localhost:8000/client.html
   - here you can send message to all client

   client code logic:

    const newmessage = (newMessage) => {
         $("#messages-list").append("<li>" + newMessage.text + "</li>")
    }

     client.subscribe("/messages", newmessage)

    $(document).ready(() => {
        $("#submit-btn").click((evt) => {

             evt.preventDefault()

             const newMessage = $("#new-message").val()

             /**
             * publish new massage to channel(/messages)
             */
             client.publish("/messages", {text: newMessage})

           })
    })



   server code logic:


    const newmessage = (newMessage) => {
        console.log("New Message: ", newMessage)
    }

    client.subscribe(`/messages`, newmessage);
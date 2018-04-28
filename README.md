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


  iii. room messaging
   - go to `http://localhost:8000/group?room={name}`.
   - here you can enter any room name of your choice.
   - now send message to this room and it will be received by all clients in the channel.

   client code logic:

    client.subscribe('/'+room, (msg)=>{
        $('#messages').append($('<li>').text(msg.message));
    });

    sendMessage=()=>{
        let message = $('#m').val();
        client.publish('/'+room,{ message: message })
        $('#m').val('');
        return false;
    }

 #2. TrailsJS
   - `cd TrailsJS`
   - start the server by `npm start`.

   i. client to client messaging
    - go to `http://localhost:8000/client.html`.

   client code logic:

    $(document).ready(() => {

       $("#submit-btn").click((evt) => {

           evt.preventDefault()

           const newMessage = $("#new-message").val()

           client.publish("/messages", {text: newMessage})

       })
    })

    const newmessage = (newMessage) => {
         $("#messages-list").append("<li>" + newMessage.text + "</li>")
    }

    const updateOnlineUsers = (user) => {
         $("#online-list").append("<li>" + user.text + "</li>")
    }

     client.subscribe("/messages", newmessage)

     client.subscribe("/onlineUsers", updateOnlineUsers)

   server code logic:


    const newmessage = (newMessage) => {
        console.log("New Message: ", newMessage)
    }

    client.subscribe(`/messages`, newmessage);


   ii. room messaging
    - go to `http://localhost:8000/group?room={name}`.
    - here you can enter any room name of your choice.
    - now send message to this room and it will be received by all clients in the channel.

    client code logic:

    client.subscribe('/'+room, (msg)=>{
        $('#messages').append($('<li>').text(msg.message));
    });

    sendMessage=()=>{
        let message = $('#m').val();
        client.publish('/'+room,{ message: message })
        $('#m').val('');
        return false;
    }

 #3. HapiJS
   - `cd HapiJS`
   - start the server by `npm start`.

   i. client to client messaging
    - go to `http://localhost:8000/client.html`.
    - you can send message by clicking on any online client from right panel.

   client code logic:

   $(document).ready(() => {

      $("#submit-btn").click((evt) => {

          evt.preventDefault()

          const newMessage = $("#new-message").val()

          client.publish("/messages", {text: newMessage})

      })
   })

   const newmessage = (newMessage) => {
          $("#messages-list").append("<li>" + newMessage.text + "</li>")
   }

   const updateOnlineUsers = (user) => {
          $("#online-list").append("<li>" + user.text + "</li>")
   }

   client.subscribe("/messages", newmessage)

   client.subscribe("/onlineUsers", updateOnlineUsers)

   server code logic:

   const newmessage = (newMessage) => {
          console.log("New Message: ", newMessage)
   }

   client.subscribe(`/messages`, newmessage);

   ii. room messaging
    - go to `http://localhost:8000/group?room={name}`.
    - here you can enter any room name of your choice.
    - now send message to this room and it will be received by all clients in the channel.

     client code logic:

     client.subscribe('/'+room, (msg)=>{
          $('#messages').append($('<li>').text(msg.message));
     });

     sendMessage=()=>{
          let message = $('#m').val();
          client.publish('/'+room,{ message: message })
          $('#m').val('');
          return false;
     }
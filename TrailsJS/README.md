# RealTime-Faye

### 3. TrailsJS

  #### i. client to client messaging using server

   - go to `http://localhost:4003/client.html`
   - here you can send message to all client

   ##### client code logic:

    client.subscribe("/messages", (msg) => {
        console.log(msg)
    })

    client.publish("/messages", message)

   ##### server code logic:

    client.subscribe(`/messages`, (newMessage) => {
        console.log("New Message: ", newMessage)
    });


  #### ii. room messaging

   - go to `http://localhost:4003/group?room={name}`.
   - here you can enter any room name of your choice.
   - now send message to this room and it will be received by all clients in the channel.

   ##### client code logic:

    client.subscribe('/room-name', (msg)=>{
        console.log(msg)
    });

    client.publish('/room-name',{ message: message })

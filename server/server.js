const express= require('express');
const path= require('path');
var http= require('http');
var socketIO= require('socket.io');

var app= express();

var port= process.env.PORT||3000;

var publicPath= path.join(__dirname,'../public');

app.use(express.static(publicPath));

var server=  http.createServer(app);
var io= socketIO(server);


io.on('connection',(socket)=>{
    console.log('Tera baap aaya hai');

    socket.on('disconnect',()=>{
        console.log('Tera baap wps gaya');
    })


    //soket events are entented for a single user
    //io events are for all the connected users
    //socket.broadcast.emit events are for all the connected users except the one who initiated the event


    //This message will be shown tp the user who joined
    socket.emit("newMessage", {
        from:"Admin",
        text:"Welcome to the chat App"
    })


    //This message will be shown to the all the other users when the new user joins
    socket.broadcast.emit("newMessage",{
        from:"Admin",
        text:"New User joined"
    })
    socket.on("createMessage", (message)=>{
        console.log("New Message", message);
        io.emit("newMessage", {
            from:message.from,
            text:message.text,
            createdAt:new Date().getTime()
        })
    })
})


server.listen(port,()=>{
    console.log('Bhai tera full set hai at port 3000');
})
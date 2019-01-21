const express= require('express');
const path= require('path');
var http= require('http');
var socketIO= require('socket.io');
var {generateMessage, generateURLMessage}= require('./utils/message.js');

var app= express();

var port= process.env.PORT||3000;

var publicPath= path.join(__dirname,'../public');

app.use(express.static(publicPath));

var server=  http.createServer(app);
//converting the server to work with web sockets
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
    socket.emit("newMessage",generateMessage('Admin', 'Welcome to the chat App'));


    //This message will be shown to the all the other users when the new user joins
    socket.broadcast.emit("newMessage",generateMessage('Admin', 'New User Connected'))

    socket.on("createMessage", (message, callback)=>{
        console.log("New Message", message);
        //emits to everyone
        io.emit("newMessage",generateMessage(message.from, message.text));
        callback();
    })

    socket.on("createLocationMessage", (coords)=>{

        console.log(coords);
        io.emit("newLocationMessage", generateURLMessage('Admin',coords.latitude,coords.longitude));
    })
})


server.listen(port,()=>{
    console.log('Bhai tera full set hai at port 3000');
})
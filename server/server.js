const express= require('express');
const path= require('path');
var http= require('http');
var socketIO= require('socket.io');
var {generateMessage, generateURLMessage}= require('./utils/message.js');
var {isRealString}= require('./utils/validate.js')
var {Users}= require('./utils/user');

var users= new Users();
var app= express();

var port= process.env.PORT||3000;

var publicPath= path.join(__dirname,'../public');

app.use(express.static(publicPath));

var server=  http.createServer(app);
//converting the server to work with web sockets
var io= socketIO(server);


io.on('connection',(socket)=>{
    console.log('Tera baap aaya hai');
    //soket events are entented for a single user
    //io events are for all the connected users
    //socket.broadcast.emit events are for all the connected users except the one who initiated the event


   
    socket.on('join', (params, callback)=>{
        if(!isRealString(params.name)||!isRealString(params.room)){

          return  callback('Name and Room to join are required');
        }
       socket.join(params.room);
       users.removeUser(socket.id);
        users.addUser(socket.id, params.name, params.room);

        io.to(params.room).emit('updateUserList', users.getUserList(params.room));


        //This message will be shown tp the user who joined
        socket.emit("newMessage",generateMessage('Admin', 'Welcome to the chat App'));


        //This message will be shown to the all the other users when the new user joins
        socket.broadcast.to(params.room).emit("newMessage",generateMessage('Admin', `${params.name} Connected`))
        callback();
    })

    socket.on("createMessage", (message, callback)=>{
        var user= users.getUser(socket.id);
        if(user&&isRealString(message.text))
        //emits to everyone
        io.to(user.room).emit("newMessage",generateMessage(user.name, message.text));
        callback();
    })

    socket.on("createLocationMessage", (coords)=>{

        console.log(coords);
        var user= users.getUser(socket.id);
        if(user)
        io.to(user.room).emit("newLocationMessage", generateURLMessage(user.name,coords.latitude,coords.longitude));
    })

    socket.on('disconnect',()=>{
        var user= users.removeUser(socket.id);
        if(user){
            io.to(user.room).emit('updateUserList', users.getUserList(user.room));
            io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room !`));
        }
        console.log('Tera baap wps gaya');
    })

})


server.listen(port,()=>{
    console.log('Bhai tera full set hai at port 3000');
})
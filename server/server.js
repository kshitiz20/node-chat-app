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
})


server.listen(port,()=>{
    console.log('Bhai tera full set hai at port 3000');
})
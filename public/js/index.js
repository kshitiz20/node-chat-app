var socket= io('http://localhost:3000');

socket.on('connect', function(){
    console.log('Beta pahuch gaya');

    socket.on('newMessage',function(message){
        console.log("New Message ", message);
    })
   
})

socket.on('disconnect',function(){
    console.log('Beta wps gaya')
})
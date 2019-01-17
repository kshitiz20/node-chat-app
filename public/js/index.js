var socket= io('https://young-everglades-59564.herokuapp.com/');

socket.on('connect', function(){
    console.log('Beta pahuch gaya');

    socket.on('newMessage',function(message){
        console.log("New Message ", message);
    })
   
})

socket.on('disconnect',function(){
    console.log('Beta wps gaya')
})
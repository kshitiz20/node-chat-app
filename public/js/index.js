var socket= io();

socket.on('connect', function(){
    console.log('Beta pahuch gaya');

    socket.on('newMessage',function(message){
        console.log("New Message ", message);
        var li = $("<p></p>").text(`From:  ${message.from}   Message: ${message.text}`);   // Create with jQuery
        $('#messagesList').append(li);
    })
   
})

socket.on('disconnect',function(){
    console.log('Beta wps gaya')
})



$('#message-form').on("submit", (e)=>{
    e.preventDefault();
    
    socket.emit('createMessage', {
        from:'User',
        text:$('[name=message]').val()
    }, function(){

    })
})
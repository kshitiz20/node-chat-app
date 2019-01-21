var socket= io();

socket.on('connect', function(){
    console.log('Beta pahuch gaya');

    socket.on('newMessage',function(message){
        console.log("New Message ", message);
        var li = $("<p></p>").text(`From:  ${message.from}   Message: ${message.text}`);   // Create with jQuery
        $('#messagesList').append(li);
    })

    socket.on("newLocationMessage",function(message){
        console.log("New Message ", message);
        var li = $("<li></li>");
        var a=$('<a target="_blank">My Current Location</a>');
        li.text(`${message.from}:`);
        a.attr('href', message.url);
       li.append(a);
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

var locationButton= $('#send-location');
console.log(locationButton);
locationButton.on('click', ()=>{
    if(!navigator.geolocation){
        console.log('Browser doesnt support geolocation');
    }

    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        socket.emit('createLocationMessage', {
           longitude:position.coords.longitude,
           latitude:position.coords.latitude
        })
    
    }, (err)=>{
        alert("Unable to find location");
    })


})
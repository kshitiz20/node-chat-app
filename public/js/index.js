

var socket= io();

socket.on('connect', function(){
    console.log('Beta pahuch gaya');

    socket.on('newMessage',function(message){
        var formattedTime= moment(message.createdAt).format('h: mm');
        console.log("New Message ", message);
        var li = $("<p></p>").text(`From:  ${message.from}  ${formattedTime}  Message: ${message.text}`);   // Create with jQuery
        $('#messagesList').append(li);
    })

    socket.on("newLocationMessage",function(message){
        var formattedTime= moment(message.createdAt).format('h: mm');
        console.log("New Message ", message);
        var li = $("<li></li>");
        var a=$('<a target="_blank"> My Current Location</a>');
        li.text(`${message.from}: ${formattedTime} `);
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
        $('[name=message]').val(' ');
    })
})

var locationButton= $('#send-location');
console.log(locationButton);
locationButton.on('click', ()=>{
    if(!navigator.geolocation){
        console.log('Browser doesnt support geolocation');
    }
    locationButton.attr('disabled', 'disabled').text("Sending Location...");
    navigator.geolocation.getCurrentPosition((position)=>{
        console.log(position);
        locationButton.removeAttr('disabled', 'disabled').text("Send Location");
        socket.emit('createLocationMessage', {
           longitude:position.coords.longitude,
           latitude:position.coords.latitude
        })
    
    }, (err)=>{
        locationButton.removeAttr('disabled', 'disabled').text("Send Location")
        alert("Unable to find location");
    })


})
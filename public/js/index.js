

var socket= io();

socket.on('connect', function(){
    console.log('Beta pahuch gaya');

    socket.on('newMessage',function(message){
        var formattedTime= moment(message.createdAt).format('h: mm');
          console.log("New Message ", message);
        // var li = $("<p></p>").text(`From:  ${message.from}  ${formattedTime}  Message: ${message.text}`);   // Create with jQuery
        // $('#messagesList').append(li);

        var template= $("#message-template").html();
        
        var html= Mustache.render(template, {
            text:message.text,
            from:message.from,
            createdAt:formattedTime
        })


        $("#messagesList").append(html);


    })

    socket.on("newLocationMessage",function(message){
        var formattedTime= moment(message.createdAt).format('h: mm');
        console.log("New Message ", message);
       var template= $("#location-message-template").html();

       var html= Mustache.render(template, {
           from:message.from,
           url: message.url,
           createdAt:formattedTime
       })

       $("#messagesList").append(html);

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
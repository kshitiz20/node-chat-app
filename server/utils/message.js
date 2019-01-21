const generateMessage= (from, text)=>{
    messageObj={};
   return {
       from,
       text,
       createdAt: new Date().getTime()
   }
}

const generateURLMessage=(from, latitude, longitude)=>{
    return {from, url:`https://www.google.com/maps?q=${latitude},${longitude}`} 
}


module.exports= {
    generateMessage, generateURLMessage
}
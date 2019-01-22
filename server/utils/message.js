var moment= require('moment');

const generateMessage= (from, text)=>{
    messageObj={};
   return {
       from,
       text,
       createdAt: moment().valueOf()
   }
}

const generateURLMessage=(from, latitude, longitude)=>{
    return {from, url:`https://www.google.com/maps?q=${latitude},${longitude}`, createdAt: moment().valueOf()}; 
}


module.exports= {
    generateMessage, generateURLMessage
}
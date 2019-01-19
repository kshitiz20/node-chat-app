const generateMessage= (from, text)=>{
    messageObj={};
   return {
       from,
       text,
       createdAt: new Date().getTime()
   }
}


module.exports= {
    generateMessage
}
const express= require('express');
const path= require('path');

var app= express();

var port= process.env.PORT||3000;

var publicPath= path.join(__dirname,'../public');

app.use(express.static(publicPath));

// app.get('/',(req, res)=>{
//     res.send()
// })

app.listen(port,()=>{
    console.log('Bhai tera full set hai at port 3000');
})
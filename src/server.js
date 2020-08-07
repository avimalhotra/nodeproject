const express=require('express');
let app=express();
const path=require('path');
const nunjucks=require("nunjucks");

app.use(express.static(path.resolve(__dirname,'public')));

// configure
nunjucks.configure(path.resolve(__dirname,'public/views'),{
    express:app,
    autoscape:true,
    noCache:false,
    watch:true
}); 

const Pin=require('./models/pin');

const db=require('./mdb');

app.get('/',(req,res)=>{
    res.render('index.html',{});
   
});
app.get('/pincode',(req,res)=>{
    var pin=req.query.pin;


 Pin.find({pincode:pin},(err,data)=>{
         if(err){
             console.log("error")
         }
       else{
        res.render('pincode.html',{ data:data })
           
        }
     })
})


app.listen(3000,()=>{
    console.log(`server running at http://127.0.0.1:3000`);
});
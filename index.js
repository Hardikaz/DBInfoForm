 var express = require("express")
 var bodyParser=require("body-parser")
 var mongoose=require("mongoose")
 const app=express()

 app.use(bodyParser.json())
 app.use(express.static('public'))
 app.use(bodyParser.urlencoded({
    extended:true
 }))

 mongoose.connect('mongodb://Localhost:27017/mydb')
 var db=mongoose.connection;
 db.on('error',()=>console.log("Error while connection"));
 db.once('open',()=>console.log("Connected to the database"));

 app.post("/sign_up",(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var phone_no=req.body.phone_no;
    var password=req.body.password;

    var data= {
        "name": name,
        "email":email,
        "phone_no":phone_no,
        "password":password


    }
    db.collection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record inserted successfully");
     }
     );
     return res.redirect('signup_success.html');
 })

 

 app.get("/",(req,res)=>{
    res.send("Hello from the server")
    return res.redirect('index.html');
 }).listen(3000);

 console.log("Listening on port 3000");
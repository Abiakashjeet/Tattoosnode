var express = require("express");
const app =express();

var bodyparser =require("body-parser");
var mysql = require("mysql");
var connection = mysql.createConnection({
    host:"localhost",
    user:"root",
    port:3306,
    pass:"",
    database:"tattoos"
});

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.post('/Registration/',(req,res,next)=>{

    var data=req.body;
    var fname= data.fname;
    var lname= data.lname;
    var email=data.email;
    var pass= data.pass;

    connection.query("SELECT * FROM login_info WHERE email= ?",[email],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            res.json("User exists");
        }
        else{
            var inser_cmd ="INSERT INTO login_info (fname,lname,email,pass) values (?,?,?,?)";
            var values=[fname,lname,email,pass];
            console.log(result);
            console.log("executing:" + inser_cmd + "" + values);
    
            connection.query(inser_cmd,values,(err,results,fields)=>{
                connection.on("err",(err)=>{
                    console.log("[mysql error]",err);
                });
                res.json("registered !");
                console.log("successful.");
            });
        }


    });

});

app.post('/login/',(req,res,next)=>{

    var data=req.body;
    var email=data.email;
    var pass= data.pass; 

    connection.query("SELECT * FROM login_info WHERE email= ?",[email],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            console.log(result);
     
            if(password==result[0].password){
             res.json("user logged in");
             res.end;
     
            }
            else{
                res.json("wrong password");
                res.end;
            }
        }
         else{
             res.json("User not found");
             res.end;
        }


    });

});


app.post('/HomePage/',(req,res,next)=>{

    var data=req.body;
    var Review= data.Review;
    
    connection.query("SELECT * FROM product WHERE Review=?",[Review],function(err,result,fields){

        connection.on('error',(err)=>{
            console.log("[mysql error]",err);
        });

        if(result && result.length){
            res.json("Write Something Unique");
        }
        else{
            var Review ="INSERT INTO product (Review) values (?)";
            var values=[Review];
            console.log(result);
            console.log("executing:" + Review + "" + values);
    
            connection.query(Review,values,(err,results,fields)=>{
                connection.on("err",(err)=>{
                    console.log("[mysql error]",err);
                });
                res.json("Review added !");
                console.log("successful.");
            });
        }


    });

});

var server= app.listen(3000,function(){
    var port=server.address().port;
    console.log("server is running at http://localhost:%s",port);
});
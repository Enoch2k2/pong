var express = require("express");
var app     = express();
var path    = require("path");
app.use(express.static(__dirname+'/js'));
app.use(express.static(__dirname+'/css'));
app.use(express.static(__dirname));
//Lets define a port we want to listen to

//We need a function which handles requests and send response

app.get('/',function(req,res){
  res.sendFile('index.html');
  //__dirname : It will resolve to your project folder.
});

app.listen(8080);
console.log("Running on port: 8080")

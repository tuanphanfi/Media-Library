//ke and use express 
var express = require('express');
var app = express();

var showRe='';

app.set('view engine', 'pug')

//------------------------------------Mongodb connection ------------------------
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

//Connect to the database
MongoClient.connect(url,{ useNewUrlParser: true }, function (err, db){
    if(err) throw err;

    var dbObject = db.db("testMongo");
    dbObject.collection("testMongo").findOne({}, function(err, result){
        if (err) throw err;
        showRe=result;
        console.log(result);
        db.close();
    })
    console.log("Connect ok!");
});


//------------------------------------------------------------------------
app.get('/', function(req, res){
    res.render('index');
})
app.listen(8000, function(req, res){
    console.log(showRe);
})

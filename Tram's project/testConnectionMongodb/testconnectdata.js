var express = require('express'); //get require
var app=express();
var path = require('path')
app.use(express.static(path.join(__dirname, 'public')));
var showRe='';

app.set('view engine','pug');

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://127.0.0.1:27017/', { useNewUrlParser: true }, function (err, db) {
    if (err) {
        throw err;
    }
    else {
        console.log("Connected");
        var dbo = db.db("testbase");
        //Find all documents in the customers collection:
        dbo.collection("hihi").find({}).toArray(function (er, result) {
            if (er) throw er;
            showRe= result[0].author;
            console.log(result[0].author);
            db.close();

        });
    }
});
app.get('/header',function(req,res){
    res.render('header');
});
app.get('/footer',function(req,res){
    res.render('footer');
});
app.listen(3004,function(req,res)
{
    console.log("Running");
});
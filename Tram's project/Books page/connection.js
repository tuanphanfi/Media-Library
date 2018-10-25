var express =require('express');
var app = express();

// var data=[];

 app.set('view engine','pug');

// var MongoClient = require('mongodb').MongoClient;

// MongoClient.connect("mongodb://localhost:27017/",{ useNewUrlParser: true }, function(err, db) {
//   if(!err) {
//     console.log("success");
//     var dbo = db.db("mongo_test");
//     dbo.collection("book").find({}).toArray(function(er, result) {
//         if (er) throw er;
//         res.render('index',{'books':result})
//         db.close();
//     });
// }~
// });

app.get('/books', function(req, res){
    res.render('books');
});
app.get('/contact', function(req, res){
    res.render('contact');
});
app.get('/about', function(req, res){
    res.render('about');
});
app.get('/home', function(req, res){
    res.render('home');
});
app.listen(5000, function(req,res){
    console.log('Running');
});

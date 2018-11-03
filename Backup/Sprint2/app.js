//get mongodb module
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//output total array 
var myArray = [];

MongoClient.connect(url, {
    useNewUrlParser: true
}, (err, db) => {
    if (err) throw err;
    var dbo = db.db("myBooks");
    dbo.collection("books").find({}).toArray((err, result) => {
        if (err) throw err;
        myArray = result;
        
        db.close();
    });
});



/******************
 * Express NPM
 *****************/
//get express module
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const sort = require('./public/js/sort');
const test = require('./public/js/test');

//setting view engine as pug
app.set('view engine', 'pug');
// app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('public'));


app.get('/', (req, res) => {
    var bookArray = myArray;
    res.render('index', { bookArray });
});

var routeBookId;

app.get('/book/:id', function (req, res) {
    routeBookId = req.params.id;
    console.log(routeBookId);
    res.redirect('/book-desc');
});

app.get('/book', (req, res) => {
    var bookArray = myArray;

    res.render('book', { bookArray });
});


// app.get('/book/:id', function (req, res) {
//     routeBookId = req.params.id;
//     console.log(routeBookId);
//     res.redirect('/book-desc');
// });

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

app.get('/book-desc', (req, res) => {
    var bookArray = myArray;
    var bookId = routeBookId;
    console.log(bookArray[0]);
    res.render('book-desc', { bookArray, bookId });
});

app.get('/test', (req, res) => {
    var bookArray = myArray;
    var bookId = routeBookId;

    console.log(bookArray[0]);


    res.render('test', { bookArray, bookId });
});

app.get('/test1', (req, res) => {
   
    

});


app.listen(3000, (req, res) => {
    console.log("Running on localhost:3000");
})
//get mongodb module
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//output object
var aBook = {
    id: '',
    author: '',
    country: '',
    imageLink: '',
    link: '',
    pages: '',
    title: '',
    year: '',
}

//output total array 
var myArray = [];

MongoClient.connect(url, {
    useNewUrlParser: true
}, (err, db) => {
    if (err) throw err;
    var dbo = db.db("myBooks");
    dbo.collection("books").find({}).toArray((err, result) => {
        if (err) throw err;
        //get value from dbs into express
        //myArray = result;
        
        aBook['id'] = result[0]['_id'];
        aBook['author'] = result[0]['author'];
        aBook['country'] = result[0]['country'];
        aBook['imageLink'] = result[0]['imageLink'];
        aBook['link'] = result[0]['link'];
        aBook['pages'] = result[0]['pages'];
        aBook['title'] = result[0]['title'];
        aBook['year'] = result[0]['year'];


        db.close();
    });
});

//get express module
const express = require('express');
const app = express();

//setting view engine as pug


// app.get('/', (req, res) => {
//     res.locals.id = aBook['id'],
//     res.locals.author = aBook['author'],
//     res.locals.country = aBook['country'],
//     res.locals.imageLink = aBook['imageLink'],
//     res.locals.link = aBook['link'],
//     res.locals.pages = aBook['pages'],
//     res.locals.title = aBook['title'],
//     res.locals.year = aBook['year'],
//     res.render('index');
// });

app.get('/', (req,res)=>{
    
    res.render('index');
});

app.get('/books', (req,res)=>{
    res.render('books.pug');
});


app.get('/books/book1', (req,res)=>{
    res.locals.id = aBook['id'],
    res.locals.author = aBook['author'],
    res.locals.country = aBook['country'],
    res.locals.imageLink = aBook['imageLink'],
    res.locals.link = aBook['link'],
    res.locals.pages = aBook['pages'],
    res.locals.title = aBook['title'],
    res.locals.year = aBook['year'],
    res.render('book1.pug');
});

app.get('/about', (req,res)=>{
    res.render('about.pug');
});

app.get('/contact', (req,res)=>{
    res.render('contact.pug');
});



app.listen(3000, (req, res) => {
    console.log("Running on localhost:3000");
})
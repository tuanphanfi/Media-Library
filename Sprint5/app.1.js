//get mongodb module
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//output total array 
//Using global variable to access it through the whole project 
global.myArray = [];

var AZArray=[];
var ZAArray=[];
var AscYearArray=[];
var DesYearArray=[];

    MongoClient.connect(url, {
        useNewUrlParser: true
    }, (err, db) => {
        if (err) throw err;
        var dbo = db.db("myBooks");
        dbo.collection("books").find({}).toArray((err, result) => {
            if (err) throw err;
            myArray = result;
            console.log(myArray[0]);
            db.close();
        });
        dbo.collection("books").find({}).sort({title: 1}).toArray((err, result) => {
            if (err) throw err;
            AZArray = result;
            console.log(AZArray[0]);
            
            db.close();
        });
        dbo.collection("books").find({}).sort({title: -1}).toArray((err, result) => {
            if (err) throw err;
            ZAArray = result;
            
            db.close();
        });
            dbo.collection("books").find({}).sort({year: 1}).toArray((err, result) => {
                if (err) throw err;
                AscYearArray = result;
                
                db.close();
            });
            dbo.collection("books").find({}).sort({year: -1}).toArray((err, result) => {
                if (err) throw err;
                DesYearArray = result;
                
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
const cookieParser = require('cookie-parser');

//setting view engine as pug
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.static('public'));

/*************
    ROUTING        
*************/
var router = require('./routes');
app.use(router);


/*******************
 * HANDLING ERRORS *
 *******************/

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('subs/error');
});

/*-------------------------------------------------------------------------------------------------------- */
app.listen(8000, (req, res) => {
    console.log("Running on localhost:8000");
})
//get mongodb module
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";

//output total array 
var myArray = [];
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

app.get('/', (req, res) => {
    var bookArray = myArray;
    const user_email = req.cookies.user_email;
    res.render('home', { bookArray, user_email });
});

/*--------------------Books page and Book-desc--------------------*/
app.get('/books', (req, res) => {
    var bookArray = myArray;
    res.render('books', { bookArray });
});

app.post("/books",(req,res)=>{
    var bookArray=[];
    if(req.body.button=="AZ"){
        bookArray=AZArray;
    }
    else if(req.body.button=="ZA"){
        bookArray=ZAArray;
    }
    else if(req.body.button=="AscYear"){
        bookArray=AscYearArray;
    }
    else{
        bookArray=DesYearArray;
    }
    res.render("books",{bookArray});
})

//When clicking the image, activate the link
app.get('/book-desc/:id', (req, res) => {
    var bookArray = myArray;
    //Taking book id when an image clicked
    var bookId = req.params.id;
    
    //Checking if the id is taken
    console.log(bookId);
    
    res.render('book-desc', { bookArray, bookId });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/contact', (req, res) => {
    res.render('contact');
});

/**********************
 * USER LOG-IN REGISTER
 *********************/

app.get('/register', (req, res) => {


    res.render('subs/users/register', );
});

app.post('/register', (req, res) => {


    res.render('subs/users/registerSuccessful', );
});


app.get('/log-in', (req, res) => {

    
    res.render('subs/users/log-in', );
});

app.post('/log-in', (req, res) => {

    res.cookie('user_email', req.body['user_email']);
    console.log(req.body['user_email']);
    console.log(req.body['user_password']);
    res.redirect('/');
});



app.get('/log-out', (req, res) => {
    res.clearCookie('user_email');
    res.redirect('/');
});

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
    console.log("Running on localhost:3000");
})
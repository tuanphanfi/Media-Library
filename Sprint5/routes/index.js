//-------------------Create the route handler-------------------------
var express=require('express');
var router=express.Router();
//Bring in Models-----------------------
var bookSchema = require('../models/bookSchema');
var userSchema = require('../models/userSchema');
//--------------------Define the routes----------------------------------
router.get('/', (req, res) => {
    bookSchema.find({}, (err, bookArray)=>{
        if(err){
            console.log(err);
        }
        else{
            const user_email = req.cookies.user_email;
            res.render('index', { bookArray, user_email });
            console.log("Render index page");
        }
    })
});

/*--------------------Books page and Book-desc--------------------*/
router.get('/books', (req, res) => {
    bookSchema.find({}, (err, bookArray)=>{
        if(err){
            console.log(err);
        }
        else{
            res.render('books', { bookArray });
            console.log("Render books page")
        }
    }) 
});

//-------------------------Sorting books---------------------------------
router.post("/books",(req,res)=>{
    if(req.body.button=="AZ"){
        bookSchema.find({}).sort({title:1}).exec((err, bookArray)=>{
            res.render("books", {bookArray});
            console.log("Sorted a-z");
        })
    }
    else if(req.body.button=="ZA"){
        bookSchema.find({}).sort({title:-1}).exec((err, bookArray)=>{
            res.render("books", {bookArray});
            console.log("Sorted z-a");
        })
    }
    else if(req.body.button=="AscYear"){
        bookSchema.find({}).sort({year:1}).exec((err, bookArray)=>{
            res.render("books", {bookArray});
            console.log("Sorted asc year");
        })
    }
    else if(req.body.button=="DesYear"){
        bookSchema.find({}).sort({year:-1}).exec((err, bookArray)=>{
            res.render("books", {bookArray});
            console.log("Sorted des year");
        })
    }
})
//--------------------------------------------------------------------------------------
//When clicking the image, activate the link
router.get('/book-desc/:id', (req, res) => {
    bookSchema.find({}, (err, bookArray)=>{
        if(err){
            console.log(err);
        }
        else{
            //Taking book id when an image clicked
            var bookId = req.params.id;
            
            //Checking if the id is taken
            console.log(bookId);
            
            res.render('book-desc', { bookArray, bookId });
            console.log("Render book-desc page");
        }
    })
});
/*---------------------------------------------------------------------------*/
router.get('/about', (req, res) => {
    res.render('about');
});

router.get('/contact', (req, res) => {
    res.render('contact');
});

/**********************
 * USER LOG-IN REGISTER
 *********************/

router.get('/register', (req, res) => {


    res.render('subs/users/register', );
});

router.post('/register', (req, res) => {
    var userData = new userSchema();

    userData.name = req.body.name;
    userData.email = req.body.email;
    userData.password = req.body.password;
    userData.confirmPassword = req.body.confirmPassword;


    userSchema.create(userData);
    res.render('subs/users/registerSuccessful');
});


router.get('/log-in', (req, res) => {


    res.render('subs/users/log-in', );
});

router.post('/log-in', (req, res) => {
    userSchema.find({}, (err, users) => {
        console.log('User 0',users[0]);
        if (err) {
            console.log(err);
        } else {
            res.cookie('user_email', req.body['user_email']);
            console.log(req.body['user_email']);
            console.log(req.body['user_password']);
            res.redirect('/');        
        }
    });

    
});

router.get('/log-out', (req, res) => {
    res.clearCookie('user_email');
    res.redirect('/');
});

/*---------------------------------------------------------------------------*/

//Mounting the module into the main app.js
module.exports = router;
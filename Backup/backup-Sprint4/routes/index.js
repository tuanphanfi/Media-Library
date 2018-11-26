//-------------------Create the route handler-------------------------
var express=require('express');
var router=express.Router();

//--------------------Define the routes----------------------------------
router.get('/', (req, res) => {
    var bookArray = myArray;
    const user_email = req.cookies.user_email;
    res.render('index', { bookArray, user_email });
});

/*--------------------Books page and Book-desc--------------------*/
router.get('/books', (req, res) => {
    var bookArray = myArray;
    res.render('books', { bookArray });
});

router.post("/books",(req,res)=>{
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
router.get('/book-desc/:id', (req, res) => {
    var bookArray = myArray;
    //Taking book id when an image clicked
    var bookId = req.params.id;
    
    //Checking if the id is taken
    console.log(bookId);
    
    res.render('book-desc', { bookArray, bookId });
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


    res.render('subs/users/registerSuccessful', );
});


router.get('/log-in', (req, res) => {

    
    res.render('subs/users/log-in', );
});

router.post('/log-in', (req, res) => {

    res.cookie('user_email', req.body['user_email']);
    console.log(req.body['user_email']);
    console.log(req.body['user_password']);
    res.redirect('/');
});

router.get('/log-out', (req, res) => {
    res.clearCookie('user_email');
    res.redirect('/');
});

/*---------------------------------------------------------------------------*/

//Mounting the module into the main app.js
module.exports = router;
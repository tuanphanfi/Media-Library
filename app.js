//-------------------------------------Calling modules-------------------------
const express= require("express");


const app= express();

app.set("view engine", "pug");

//--------------------------------------Handling requests for pages------------------------
//-----------Index---------------------
app.get("/", (req,res)=> {
    res.locals.myTitle ="Index Page";
    res.render("index");
});

//-----------Home page------------------
app.get("/home", (req,res)=> {
    res.locals.myTitle = "Home Page";
    res.render("home");
});

//-----------About page-------------------
app.get("/about", (req,res)=> {
    res.locals.myTitle = "About Page";
    res.render("about");
});

//----------Contact page-------------------
app.get("/contact", (req,res)=> {
    res.locals.myTitle = "Contact Page";
    res.render("contact");
});

//----------Book page-----------------------
app.get("/book", (req,res)=> {
    res.locals.myTitle = "Book Page";
    res.render("book");
});

//--------------------------------------Choose a port to listent to------------------------
app.listen(5000, ()=>{
    console.log("Connection is now set!")
});
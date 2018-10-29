var express = require('express');
var app = express();

var data;

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));

var MongoClient = require('mongodb').MongoClient;

MongoClient.connect("mongodb://localhost:27017/", { useNewUrlParser: true }, function (err, db) {
    if (!err) {
        console.log("success");
        var dbo = db.db("mongo_test");
        dbo.collection("book").find({}).toArray(function (er, result) {
            if (er) throw er;
            //res.render('home', { 'books': result })
            data = result;
            console.log(data);
            db.close();
        });
    }
});

app.get('/books', function (req, res) {
    // var books_data;
    // for(var i=0; i<10;i++){
    //     // books_data[`name${i}`]=data[i].title;
    //     // books_data[`author${i}`]=data[i].author;
    //     // i++;
        
    // }
    res.render('books',{ data:data
    });
});
app.get('/contact', function (req, res) {
    res.render('contact');
});
app.get('/about', function (req, res) {
    res.render('about');
});
app.get('/', function (req, res) {
    res.render('home',{data:data
    });
});
app.get('/:id', function (req, res) {
    var book_id = req.params.id;
    var book_name="";
    var book_author="";
    var year="";
    for(var i=0; i<data.length; i++){
        if(data[i]._id==book_id){
            book_name=data[i].title;
            book_author=data[i].author;
            year=data[i].year;
            
        }
    }
    res.render('detail',{name: book_name, author: book_author
    });
});
app.listen(5000, function (req, res) {
    console.log('Running');
});

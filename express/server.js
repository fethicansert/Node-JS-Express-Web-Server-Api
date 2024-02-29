const express = require('express');
const app = express();  //Create express application
const path = require('path');
var cors = require('cors');
const  { logger }  = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');


const PORT = process.env.PORT || 3166;

//last one for ex of if I have react-app running on port localhost  port 5000  and I want take data from my back-end server
const whiteList = ['https://www.google.com', 'https://www.youtube.com', 'https//127.0.0.1:5000', 'https://moodle.ciu.edu.tr']; 
 
//Configuring CORS w/ Dynamic Origin
const corsOptions = {
    origin: (origin, callback) => {
        if( whiteList.indexOf(origin) !== -1 || !origin ) {  //checks if origin is in the whitelist
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS')); // Express will catch this on its own.
        }
    },
    optionsSuccessStatus: 200 
}

//I have middleware stack : use(myfunc) => use(express.urlencoded) => use(express.json()) => use(expres.static) => app.get()
// I have to use next() to jump one middlware function to another

//custom middleware logger
//app use takes a funtion to handle with request(handler function dappppp!)
app.use(logger);

//CORS Cross Origin Resource Sharing
app.use(cors(corsOptions)); //enable all cors request

//build-in middleware to handle urlencoded data
//which content type is:
//'Content-Type' : 'application/x-www-form-urlencoded'
app.use(express.urlencoded({ extended: false })); //build in function use next in side of them

//serve json files
app.use(express.json());


//serve static files like css image and javascript file
app.use(express.static(path.join(__dirname, 'public'))); //it's use serve-static node package


//express automaticly send status code and content type
app.get('^/$|/index(.html)?', (req, res) => { 
    //videodaki gibi yap sonra documentationa cevir kaz !!!
    res.sendFile(path.join(__dirname, 'views', 'index.html')); //__dirname if this file express/views
});

app.get('/new-page(.html)?',(req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'new-page.html')); //__dirname if this file express/views
});

//if page old than redirect new page
app.get('/old-page(.html)?',(req, res) => {
    res.redirect(301, '/new-page.html'); //status code 302 default
});

//Route Handlers
app.get('/hello(.html)?', (req, res, next) => {
    console.log("Getting Hello Atemmted");
    next();
}, (req, res) => {
    res.send("Hello Hell Niga");
});

//custom 404 page app.all() for routing I dind't use app.use() beacuse it's for middleware function
//all is can used for all method get post delete

app.all('*',(req, res) => { 
    res.status(404);
    if(req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if(req.accepts('json')) {
        res.json({error: '404 Not Found'});
    } else {
        res.type('txt').send('404 Not Found');
    }
});

app.use(errorHandler);

app.listen(PORT ,() => console.log(`Server running on port ${PORT}`));


//////

//chaning route handlers
const one = (req, res, next) => {
    console.log('one');
    next();
}

const two = (req, res, next) => {
    console.log('two');
    next();
}

const three = (req, res) => {
    console.log('three');
    res.send("Finineshed");
}

app.get('/chain(.html)?', [one, two, three]);

//? What happend if requested file not found ?
//Expres send html file with <p>Cannot GET /"requestede file name"</p>

//? What is purpose of signs(^$(.html)?) in the .get(path) ?
//() parantezies and questions means make this parantezies part optional
//(.html)? you can write .html or not np we server the file

//? How redirect works?
//if requested url not founded than we can redirect this request to another given url
//redirect not takes path to sendFile it's takes url to redirect(request) to given urls

//? Normalt express sende status code automatliy why we use statuscode in redirect method ?
//Beacuse it's send 302 => 302 means page moved to new location temporarly
//But we need permanently one
//301 page permanently moved to a new location

// 301 redirect indicates that a page has permanently moved to a new location, meanwhile, 
// a 302 redirect says that the page has moved to a new location, but that it is only temporary.

// ? What is route handler ?
// Route handler is a method that takes url and send response accordingly to given path

// ? What is handler function ?
// When we use .get method it's takes path and function
// This function(handler function) where we *handle request and send response to client.

// ? What is routing in express ?
// Routing refers to determining how an application responds to a client request to a particular endpoint,

//Uglulamadan servere gelen istegin server tarafindan belli bir endpointi(index.html) nasil response(yanit) verecegini belirlemek.

//What is middleware ?

//Client request data from express app express app has two ends request and response middle of two express has middleware functions
//to jump one funnction to another we use next() if we don't use next() flow goes to response
//request revieved => middleware - midleeware - middleware => response//

//What is origin ?
//localhost:3400 it's orgin and www.google.com is origin orgin istegin ne uzerinden yapildigini gosterir

//What is CORS (Cross-Origin-Resource-Sharing)

//How enable all cors request and how enable specific middleware function - sinnle route

// app.use(cors()) for all request

// app.get('^/$|/index(.html)?', cors() ,(req, res) => {  only for GETting index.html 
//     //videodaki gibi yap sonra documentationa cevir kaz !!!
//     res.sendFile(path.join(__dirname, 'views', 'index.html')); //__dirname if this file express/views
// });


//what is arr.indexOf() function does ?

//Neden origin undefined doner ?
//Bunun nedeni bulundgumuz serverden ayni servere istek atmamizdir
//Boyle yapinca origin header verilmez ve undefined doner

//Write one route handler ?


//What happend if I don't use errorHandler ?
//app.use((err, req, res, next) => errorHandler(err, req, res, next)); This one

//What is app ?

//Expalin all function that use ? ex app.listen app.get app.use


//router means I send request with url and endpoint as response

//midlware for other thinks example 
//app.use((req, res, next) => doSomething(req,res,next));
//It's a function thans handle with request and send response
//use is midleware function that work if before middleware function use next()

//Midleware function needs to use next not route functions




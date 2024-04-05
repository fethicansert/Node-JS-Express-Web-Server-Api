require('dotenv').config(); // Loads .env file contents into process.env
const express = require('express');
const app = express();         //Create express application
const path = require('path');
const cors = require('cors');
const  { logger }  = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const corsOptions = require('./config/corsOptions');
const notFoundHandler = require('./middleware/notFoundHandler');
const verifyJWT = require('./middleware/veriyfJWT');
const cookieParser = require('cookie-parser');
const credentials = require('./middleware/credentials');
// const verifyLogin = require('./middleware/verifyLogin');
const PORT = process.env.PORT || 3166;
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');


//Connect to MongoDB 
connectDB();

//write all request logs 
app.use(logger);

//Bunu tam anlamadim CORS'la ilgili bi problem icin olmasi lazim yorum satiri birakacam hata cikarsa normale cevir!!!
//Handle options credential check - before CORS
//and fetch cookies credentials requirment
app.use(credentials);

//enable all CORS(Cross Orgin Resource Sharing) request which orgins in whitelist
app.use(cors(corsOptions)); 

//server form-data
app.use(express.urlencoded({ extended: false })); 

//serve json files => parses request body
app.use(express.json());

//Parse to Cookie, than we can use it like => req.cookies
app.use(cookieParser());

//serve static files like css image and javascript file => it's use serve-static node package
app.use('/', express.static(path.join(__dirname, 'public'))); 

//routing request comging to  root '/' => localhost:8000/ = localhost:8000/new-page ...
app.use('/', require('./routes/root')); 

//routing request coming to 'www.domain.com/register'
app.use('/register', require('./routes/register'));

//routing request coming to 'www.domain.com/auth'
app.use('/auth', require('./routes/auth'));

//refresh access token
app.use('/refresh', require('./routes/refresh'));

//logout (deleting access token from client and refresh token in cookies on browser)
app.use('/logout', require('./routes/logout'));


app.use('/users',verifyJWT, require('./routes/api/users'));

// verify accesstoken  for API

//routing request coming to 'www.domain.com/employees'
app.use('/employees', verifyJWT, require('./routes/api/employees')); 

//we use .all instead .use beaucse .all for routing and  for all methods(get,post,put and delete)
//checks all type of requsts if request url not macth to routers send '404 Not Found '
app.all('*', notFoundHandler);  

app.use(errorHandler);

//if connected to mongoDB than we start to listen request on server === > once yani bir kez dinle on olsa hep dinleyecek
mongoose.connection.once('open', () => {
    console.log("Connected to MongoDB");
    app.listen(PORT ,() => console.log(`Server running on port ${PORT}`));
})



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
//Origin Sourece of Request Who making this request

//What is CORS (Cross-Origin-Resource-Sharing) ans SOP(Sama-Origin-Policy)
//CORS give as options to relax SOP

//How enable all cors request and how enable specific middleware function - sinnle route

// app.use(cors()) for all request

// app.get('^/$|/index(.html)?', cors() ,(req, res) => {  only for GETting index.html 
//     //videodaki gibi yap sonra documentationa cevir kaz !!!
//     res.sendFile(path.join(__dirname, 'views', 'index.html')); //__dirname if this file express/views
// });


//what is arr.indexOf() function does ?
//indexOf argument olarak verilen degerin index degerini dondurur eger verilen argument array iciderinde yoksa -1 donder
//indexOf ile belirli bi degerin array icinde var olup olmadigini check edebiliriz
//const arr = ['apple', 'banana', 'orange']
//arr.indexOf('banana) => 1 yes :(
//arr.indexOf('dragonfruit') => -1 no :)

//Neden origin undefined doner ?
//Bunun nedeni bulundgumuz serverden ayni servere istek atmamizdir
//Boyle yapinca origin header verilmez ve undefined doner

//Write one route handler ?


//What happend if I don't use errorHandler ?
//app.use((err, req, res, next) => errorHandler(err, req, res, next)); This one
//Express automaticly handle error and error file

//What is app ?

//Expalin all function that use ? ex app.listen app.get app.use


//router means I send request with url and endpoint as response

//midlware for other thinks example 
//app.use((req, res, next) => doSomething(req,res,next));
//It's a function thans handle with request and send response
//use is midleware function that work if before middleware function use next()

//Midleware function needs to use next not route functions


//main server file uzerinde asagidaki gibi kalabalik yapmamak icin nasil bi method uygulayabilirz

//express automaticly send status code and content type
// app.get('^/$|/index(.html)?', (req, res) => { 
//     //videodaki gibi yap sonra documentationa cevir kaz !!!
//     res.sendFile(path.join(__dirname, 'views', 'index.html')); //__dirname if this file express/views
// });

// app.get('/new-page(.html)?',(req, res) => {
//     res.sendFile(path.join(__dirname, 'views', 'new-page.html')); //__dirname if this file express/views
// });

// //if page old than redirect new page
// app.get('/old-page(.html)?',(req, res) => {
//     res.redirect(301, '/new-page.html'); //status code 302 default
// });

//Ayri bi route.js olustur orda expressden new router object olustur  // const router = express.Router()
//routing kodlarini oraya yaz router.get('bla bla', (blaFunction to handler route))
//en sonda module.export ile router exportla module.exports = router
//main server file da kullan app.use('/', require('bla bla path/router));

/////////////////////////////////////////////////


//Why we use .route ?

//Beacuse if we don't we have to write like this

// router.get('path', Do something)
// router.post('path', Do something)
// router.put('path', Do someting)
// router.delete('path', Do something)

//we can use just route and . to write all of them wtih  clean and less code


//what res.json() do ?
//Sends a JSON response. 
//This method sends a response (with the correct content-type)
//that is the parameter converted to a JSON string using JSON.stringify().

//what JSON.stringfy do ?
//The JSON.stringify() method converts JavaScript objects into strings.
//When sending data to a web server the data has to be a string.

//it's converts JS object to json(string)
//Data should be in string format when exchanging data!!!

//What express.json do ? for handling with json we need expres.json I don't know how it's work but we need !
//It's parse incoming request json payload (body) than we don't needed to parse manualy
//We can use req.body directly

//Explain obj.entries and for(const value in obj) ?

//obj.entries loop on obj and return key and value pairs in array
//const obj = { name: 'zizi',lastname: 'zozo',age: 100 }
//Object.entries(obj)
//[ [ 'name', 'zizi' ], [ 'lastname', 'zozo' ], [ 'age', 100 ] ]

//for(const key in obj) ile objenin keylerini loop yapabilirz ve bunun sayesinde obj[key] ile obj iceriklerine erisebiliriz

//Why I sending status code (404) to browser if don't what happend;
//We have to send 404 to inform browser request is not success
//Also software can use this status code to decide if request is suc or not

//What is whitelist why we need cors (CROSS ORGIN RESOURCE SHARING)



//Create object has function in it?
//like this 
// const data = {
//     employees: require('../model/employee.json'),
//     setEmployeess: function(data){ this.employees = data }
// };


//What is 404 status code where to use it ? check employeeController I used there


//what arr.find() finction do ?

//find verilen statemente gore array itemlerini kontrol eder ve statemente uyan ilk elemeni dondurur
//[1,2,3,4,5,6].find(item => item > 5) => 6 donecektir
//[1,2,3,4,5,6,7].find(item => item > 5) => 6 donecektir cunku statementte uyan ilk elementi dondurur


//How sort method works ? sort default asscending cogalan - azdan coga
//if I use string in array like => ["Fethi", "Ahmet", "Zeynep", "Burak"] 
//sort function look for utf-16 code units order
//for strings it's okay it going to give => ["Ahemt", "Burak", "Fethi", "Zeynep"]

//if I use numbers [74, 18, 10, 5, 84, 24, 105]
//and use sort() we going to have [10, 105, 18, 24, 5, 74, 84] 
//we don't want this it's happend cuase we don't give sort function if we don't give sort function 
//sort will return all arr items to string than you can relazie why 105 smaller than 18
//When we compare 105 to 18 in string check fisrt '1' to '1' same than '0' to '8',  0 is small than it means 105 small :)

//How arr.some() how .some() works?

//What is 409 statuc code 
//A 409 status code is used to indicate a conflict with the current state of a resource, 
//such as when trying to create or update a resource that already exists or has conflicting information.

//What is endpoint ?
//An endpoint is a URL which allows you to access a (web) service running on a server.


//what is JWT => 
//JWT it's a authorization standart
//JWT server tarafinda access ve refresh token olusturur
//access ve refresh token kullaniciya gonderilip orda guvenli bi sekilde depolanir
//refresh token  ayni zamanda veritabaninda da depolanir
//kullanici veritabinindaki bir veriye ulasmak istediginde username ve password kontrol edilmez
//Onun yerine access token kullanilir 

//Explain access token and refresh token
//access token bi kisa sureli bilet gibi bir seydir o bizde kullanicida kalir ve
//bi yerden birsey almak istedigimizde onu kullaniriz
//access token ile servere istek atariz ve o kim oldugumuzu access token ile anlar


//How split() works ? //Bolmek ayirmak
//Split can divide str in the pices and put them in array as array item with giving argument
//const str = 'hello best warzone player';
// console.log(str.split(" "));

// const str2 = 'hello-worst-warzone-player';
// console.log(str2.split('-'));



//await fsPromises.writeFile(path.join(__dirname, '..', 'model', 'user.json'), userDB.users); 
//this give me a error why 
//ERROR
// The first argument must be of type string or an instance of Buffer, ArrayBuffer, or Array or an Array-like Object. Received an instance of Object

//Answer
// JSON.stringify(userDB.users)


//What is sercure and httpOnly sameSite and maxAge option in res.cookie() method



// //What Object.values() do ?
// const user = {
//     username : "nobody",
//     password : "yesbody"   
// };

// console.log(Object.values(user)); => [ 'nobody', 'yesbody' ]

//it takes the all object properties values and put in the array


//what str.startWith() do ?
//checks if str start with given argument
// const str = 'Bearer 1312casd12321xsz';
// str.startsWith('Bearer') true
// str.startsWith('Bearerz') false


//What is ? operator optional chanining ?
// const user = {
//     username: 'Bob',
//     age: 25,
//     address: { //thin address is optional can not be given in user obj
//         town: 'Lefkosa'
//     }
// }
//when we want to try to access to address propertie of user we can use optinal chaining to not cause an error
// const user1 = {
//     username: 'Bob',
//     age: 25,
//     //no address properties
// }
// user1.address.town will give error can not read properties of undefined beacuse address === undefined
// we can use ? operator optional chaining
// user1.address?.town will return undefined beacuse address === undefined
// address varsa bir sonrakine gec yokse undefined
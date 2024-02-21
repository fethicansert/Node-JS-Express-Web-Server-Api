const http = require('http');   //Common JS Modules
const path = require('path');
const EventEmitter = require('events');
const fs = require('fs');
const fsPromises = require('fs/promises')
const myEmitter = new EventEmitter();


//Creating PORT
const PORT = process.env.PORT || 3700;

//Creation of Server
const server = http.createServer((req, res) => {
    console.log(`Reuest URL:${req.url} Reuest Method:${req.method}`);//it's will log the requested url and method in this server with given port
    
    let pathFile;

    // if(req.url === '/' || req.url === '/index.html'){
    //     res.statusCode = 200; //send the statusCode 200 beauce we have this file
    //     res.setHeader('Content-Type','text/html'); //set response content type type of data we sending
    //     pathFile = path.join(__dirname, 'views', 'index.html'); //create path of file
    //     fs.readFile(pathFile,'utf8',(err, data) => { //read the file
    //         // console.log(data);
    //         res.end(data) //send to file as data --- as text ? WTF
    //     })
    // }

    // switch(req.url) {
    //     case '/' :
    //         res.statusCode = 200;
    //         res.setHeader('Content-Type','text/html');
    //         pathFile = path.join(__dirname, 'views', 'index.html');
    //         fs.readFile(pathFile, 'utf8', (err, data) => {
    //             res.end(data);
    //         });
    //         break;
    //     default :
    //         res.statusCode = 404;
    //         res.setHeader('Content-Type','text/html');
    //         pathFile = path.join(__dirname, 'views', 'error_404.html');
    //         fs.readFile(pathFile, 'utf8', (err, data) => {
    //             res.end(data);
    //         });

    // }
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})



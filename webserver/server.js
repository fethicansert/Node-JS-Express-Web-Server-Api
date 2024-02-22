const http = require('http');   //Common JS Modules
const path = require('path');
const EventEmitter = require('events');
const fs = require('fs');
const fsPromises = require('fs/promises')
const myEmitter = new EventEmitter();
const logEvents = require('./logEvents');

//Creating PORT
const PORT = process.env.PORT || 3700;

const serveFile = async (filePath, contentType, response) => {
    try {
        //HomeWork use Content-Length to header to
        const rawData = await fsPromises.readFile(
            filePath, 
            !contentType.includes('image') ? 'utf8' : '' //if content tpye not includes image use utf8 encoding if not do not encode file(image)
        );
        const data = contentType === 'application/json' ? JSON.parse(rawData) : rawData;
        const fileName = path.parse(filePath).name;
        response.writeHead(fileName !== '404' ? 200 : 404, //writeHead(statusCode, statusMessage, headers) 
                        { 'Content-Type': contentType });  //statusCode = 200 || 400 - headers = {'Content-Type': contentType} 
        response.end(
            contentType === 'application/json' ? JSON.stringify(data) : data
        )                                       
    } catch(err) {
        console.error(err);
        myEmitter.emit('log', `${err.name}: ${err.message}`, 'errLog.txt')
        response.statusCode = 500; //server side error
        response.end(); //end the response finalize the response stream
    }
}

//Creation of Server
const server = http.createServer( async (req, res) => {
    console.log(`Reuest URL:${req.url} Reuest Method:${req.method}`);//it's will log the requested url and method when request happend to server with specific port
    myEmitter.emit('log', `Request URL:${req.url} Request Method:${req.method}`, 'reqLog.txt');
    let contentType; //content type is important beacuse it's tell what is the tpye of my file and browser decide what to do with this file
    const extension = path.extname(req.url) //.html .css .png .jpg

    // console.log(extension);
    // console.log(req.url);

    //Checking extensions to decide which content type to use
    switch(extension){
        case '.css':
            contentType = 'text/css';
            break;
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.json':
            contentType = 'application/json';
            break;
        case '.jpg':
            contentType = 'image/jpg';
            break;
        case '.png':
            contentType = 'image/png';
            break;
        case '.txt':
            contentType = 'text/plain';
            break;
        default:
            contentType = 'text/html'; 
    }

    //Request URL'yi serverde kullanabilecel bit filePath haline ceviriyoruz
    let filePath = 
        contentType === 'text/html' && req.url === '/' 
        ? path.join(__dirname, 'views', 'index.html')
        : contentType === 'text/html' && req.url.slice(-1) === '/' 
            ? path.join(__dirname, 'views', req.url, 'index.html') 
            : contentType === 'text/html'   
                ? path.join(__dirname, 'views', req.url) 
                : path.join(__dirname, req.url);

    console.log(`FilePath: ${filePath}`);
    //.html extensionu olmayan filepath'a .html ekleyip serverin directory veya file i bulabilecegi hale getiriyoruz
   if(!extension && req.url.slice(-1) !== '/') filePath += '.html';

   
   //if file exist we use serveFile to server file to browser from server
   if(fs.existsSync(filePath)){
        serveFile(filePath, contentType, res);
   } else { //if file doesn't exist than we should check some statement to do redirect(301) or send not found(404) to browser
        const fileBaseName = path.parse(filePath).base;
        switch(fileBaseName){
            case 'old-page.html':
                res.writeHead(301, {location: '/new-page.html'}); //The writeHead method is used to send the response header to the client.    
                res.end();
                break;
            case 'www-page.html':
                res.writeHead(301,{location:'/'});    ////301 redirect location kullanilarak servere tekrar istek atilir
                res.end();
                break;
            default:
               const errorFile = path.join(__dirname, 'views', '404.html');  //404 not found
               serveFile(errorFile, 'text/html' ,res);
        }
   }
});

server.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
})

myEmitter.on('log',(msg, path) => logEvents(msg, path));


//text/html icin 3 dogru istek olabilir
//1-) sadece '/' var ise bunu index.html'e yonlendirdik => localhost:3700/
//2-) eger subdire(url sonunda / olmasi gerekir) bir istek varsa subdirdeki index.html'e yonlendirdik => localhost:3700/subdir/index.htlm
//3-) direk olacal view's dosyasinin icine bir istek olabilir => localhost:3700/index.html localhost/3700
//ve son olarak webserver dosyasinin icindeki herhangi bir content-type gelebilir css image jpg data


//What is write writeHead and .end

//writeHead used to send response header not the body
//write use to send response body 
//write and writeHead not end the response
//we should use .end method to end to response

//The end method is used to finalize the response and send it back to the client. 
//After calling end, no further data can be written to the response.

//response.writeHead(200, { 'Content-Type': 'text/plain' });
// response.write('Hello, World!');
// response.end(); //I can use .end send before the closing stream




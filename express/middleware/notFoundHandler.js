const path = require('path');

//send error 404 according to accept header
const notFoundHandler = (req, res) => {
    res.status(400) ////I have to send status code to inform browers it's error
    if(req.accepts('html')){
        res.sendFile(path.join(__dirname, '..', 'views', '404.html')); //req accepts html
    } else if(req.accepts('json')) {   //req accepts json 
        res.sendStatus(404);
    } else {
        res.type('txt').send('404 Not Found'); //req accepts json 
    }
}

module.exports = notFoundHandler;


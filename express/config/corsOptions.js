//Configuring CORS w/ Dynamic Origin

const allowedOrigins = require('./allowedOrigins');

//before real request send to server preflight send to server if CORS option are OK
//if requst orgin not in the allowedOrgins give CORS error
const corsOptions = {
    origin:(origin, callback) =>{
        if(allowedOrigins.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by COORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;



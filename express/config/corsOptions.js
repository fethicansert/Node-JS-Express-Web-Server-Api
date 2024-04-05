//Configuring CORS w/ Dynamic Origin

const allowedOrigins = require('./allowedOrigins');

//if requst orgin not in the whitelist give CORS error
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



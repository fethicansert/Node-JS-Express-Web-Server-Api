//Configuring CORS w/ Dynamic Origin

const whiteList = [ //This orgins allwed to send requst to server others get CORS error
    'https://www.google.com',  
    'https://www.youtube.com', 
    'https//127.0.0.1:5000', 
    'https://moodle.ciu.edu.tr'
]; 
 
//if requst orgin not in the whitelist give CORS error
const corsOptions = {
    origin:(origin, callback) =>{
        if(whiteList.indexOf(origin) !== -1 || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by COORS'));
        }
    },
    optionsSuccessStatus: 200
}

module.exports = corsOptions;



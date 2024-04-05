const allowedOrigins = require('../config/allowedOrigins');

//Eger origin allowedOrigins listesinde ise response headera "Access-Control-Allow-Credentials":true veriyoruz ki CORS da problem cikmasib
//Browser bu headeri gormek istiyor
const credentials = (req, res, next) => {
    const origin = req.headers.origin;
    if(allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Credentials", true);
    }
    next();
}


module.exports = credentials;
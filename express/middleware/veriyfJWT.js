const jwt = require('jsonwebtoken');

const verfiyJWT = (req, res, next) => {

    const authHeader = req.headers.authorization || req.headers.Authorization; //authorization can starts with 'a' or 'A';

    //checks if authorization header exist and if authheader exist check if it's start with Bearer
    if(!authHeader?.startsWith('Bearer ')) return res.status(401).json({ message: "No Authorization Header Founded!" });
    
    //'Beared TokenString' => split() and take token inside of arr
    const token = authHeader.split(" ")[1]; 

    //verify access token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if(err) return res.status(403).json({ message: "You don't have permission to access this resource" });  //you don't have permission to access this resource' or invalid token
            console.log(decoded.UserInfo);
            req.user = decoded.UserInfo.username;
            req.roles = decoded.UserInfo.roles;
            next();
        });
}

module.exports = verfiyJWT
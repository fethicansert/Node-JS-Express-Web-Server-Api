const userDB = {
    users: require('../model/users.json'),
    setUsers: function(data) { this.users = data }
};

const jwt = require('jsonwebtoken');


const verifyLogin = (req, res, next) => {

    const cookies = req.cookies;
    
    if(!cookies?.jwt) return res.status(301).redirect('/index');

    const token = cookies.jwt;
    
    jwt.verify(
        token,
        process.env.REFRESH_TOKEN_SECRET,
        (err ,decoded) => {
            if(err) return res.sendStatus(403);
            req.user = decoded.username;
            console.log(`* ${decoded.username} verifyied`);
            next();
        });
}

module.exports = verifyLogin;
const User = require('../model/User');
const jwt = require('jsonwebtoken');


const handleRefreshToken = async (req, res) => {

    //check if browser send jwt token
    const cookies = req.cookies;
    if (!cookies?.jwt) return res.sendStatus(401); 
   
    //set refreshToken
    const refreshToken = cookies.jwt; 

    //find user with refreshToken
    const foundUser = await User.findOne({ refreshToken }).exec(); 
    if (!foundUser) return res.sendStatus(401); //Unauthorized

    console.log(foundUser);
    //verify token if OK send new access token
    jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
        (err, decoded) => {
            //check if founded username and decoded refreshtoken username match
            if (err || foundUser.username !== decoded.username) {
                console.log(err);
                return res.sendStatus(403); //Unauthorized
            }
            const roles = Object.values(foundUser.roles);
            const user = foundUser.username;
            const accessToken = jwt.sign(
                { 
                    "UserInfo": {
                        "username": decoded.username,
                        "roles": roles
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: "10s" }
            );
            res.json({ accessToken, roles, user });
        }
    )

}

module.exports = { handleRefreshToken }
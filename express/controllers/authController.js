const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleAuth = async (req, res) => {
    //Check user authorization
    const { user, pwd } = req.body;  //get username and password from request body

    if(!user || !pwd) return res.status(400).json({error : "Username and password are required!"}); //check if thet existed

    const foundUser = await User.findOne({ username: user }).exec() //check if user registered

    if(!foundUser) return res.status(401).json({error: "Username not founded"}); //Unauthorized
    
    const match = await bcrypt.compare(pwd, foundUser.password); //comparing passwords

    if(match) {
        //Create JWT (JSON WEB TOKEN)
        
        //set roles
        const roles = Object.values(foundUser.roles).filter(role => {
            // console.log(role);
            return Boolean(role)
        }); // .filter(role => Boolean(role)) //Bollean eger deger truthy ise true olacak falsy ise false ve buna gore filternecek
        
        console.log(roles);
        //Creatate Access Token
        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": foundUser.username,
                    "roles": roles      //We just send roles code not all the propertie of roles cause of security
                }  
            }, 
            process.env.ACCESS_TOKEN_SECRET,    
            { expiresIn: "10s" });              

        //Create refresh Token   refresh token just use for refresh the access token
        const refreshToken = jwt.sign(
            { "username" : foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "1d" });
    
        //Save refresh token with current user
        
        try {
            foundUser.refreshToken = refreshToken;
            const result = await foundUser.save();
                        
            res.cookie("jwt", refreshToken, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000}) //we should use { secure: true } in production it only serve cookies on https
            res.json({ accessToken, roles });
        } catch(e) {
            console.log(e);
        }

    } else {
        res.status(401).json({ error: "Incorrect Password"}) //Unauthorized
    }
}

module.exports = { handleAuth }
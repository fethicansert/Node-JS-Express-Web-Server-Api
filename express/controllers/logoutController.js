const User = require('../model/User'); 

const handleLogout = async (req ,res) => {
    //On client also delete access token

    //chech if req has jwt cookies
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(401).json({ message: "No JWT Acess Token Cookies Founded!" }); //change to res.sendStatus(204)

    //take the refresh token in cookies
    const refreshToken = cookies.jwt; 

    //check if refreshToken in DB
    const foundUser = await User.findOne({ refreshToken }).exec();

    //jwt cookies gonderilmis ama user kayitli olmayabilir cookies yinede silinir
    if(!foundUser){
        res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000} );
        res.sendStatus(204);
    }

    //Delete the refresh token in database
    try {
        foundUser.refreshToken = '';
        const result = await foundUser.save();

        console.log(result);
        //Clear jwt cookie
        res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000} );
        res.status(200).json({ message: `${foundUser.username} logut.` });
    } catch(e) {
        console.log(e);
    }
}

module.exports = { handleLogout }


//A 204 status code is used when the server successfully processes the request, but there is no content to return to the client.
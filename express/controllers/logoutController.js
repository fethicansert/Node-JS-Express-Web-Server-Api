const User = require('../model/User'); 

const handleLogout = async (req ,res) => {
   

    //chech if req jwt cookies exixst
    const cookies = req.cookies;
    if(!cookies?.jwt) return res.status(204); 

    //take the refresh token in cookies
    const refreshToken = cookies.jwt; 

    //check if any user has current refreshToken in DB
    const foundUser = await User.findOne({ refreshToken }).exec();

    //jwt cookies exist but not founded in DB still delete cookie
    if(!foundUser){
        res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000} ); //options should be same
        res.sendStatus(204);
    }

    //Delete the refresh token in database
    try {
        foundUser.refreshToken = ''; //set token to empty string in foundUser
        const result = await foundUser.save(); //save user back to DB

        //On client also delete access token
        //Clear jwt cookie
        res.clearCookie("jwt", { httpOnly: true, maxAge: 24 * 60 * 60 * 1000} );
        res.status(204).json({ message: `${foundUser.username} logut.` });
    } catch(e) {
        console.log(e);
    }
}

module.exports = { handleLogout }


//A 204 status code is used when the server successfully processes the request, but there is no content to return to the client.
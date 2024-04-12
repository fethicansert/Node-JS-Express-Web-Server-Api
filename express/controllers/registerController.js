const User = require('../model/User');
const bcrypt = require('bcrypt');

const newUserHandler = async (req, res) => {
    const { user, pwd } = req.body;
    
    if (!user || !pwd) return res.status(400).json({"message" : "Username and password are required."});

    // check for duplicate username in the database
    const duplicate = await User.findOne({ username: user }).exec() // exec() for execute 
    if (duplicate) return res.status(409).json({ message: "Username already exist" });

    try {
        //encyrpt the password
        const hashedPwd = await bcrypt.hash(pwd, 10);
      
        //create and store the user
        const result = await User.create({
            "username": user,
            "password": hashedPwd
        });

        console.log(result);

        res.sendStatus(201);

    } catch(err) {
        res.status(500).json({ "message": err.message} );
    }
};

module.exports =  { newUserHandler }

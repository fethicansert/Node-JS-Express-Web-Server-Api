const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find({}).exec();
    if(!users) return res.json({message: "No users founeded."});
    res.json(users);
}





module.exports = { getAllUsers }
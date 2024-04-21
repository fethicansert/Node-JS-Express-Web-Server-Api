const User = require('../model/User');

const getAllUsers = async (req, res) => {
    const users = await User.find({}).exec();
    if (!users) return res.json({ message: "No users founeded." });
    res.json(users);
}


const addQuestion = async (req, res) => {


    const { user, questionId } = req.body;

    if (!user || !questionId) return res.status(400).json({ error: "Something Missing !" });

    const foundUser = await User.findOne({ username: user }).exec();

    if (!foundUser) return res.sendStatus(401);

    //Check if question already in the users quesitons list
    const duplicate = foundUser.questions.find(currentQuestionID => currentQuestionID === questionId); 
    if(duplicate) return res.status(409).json({error: 'Question alreday in the study list !'});

    try {
        foundUser.questions.push(questionId);
        const result = await foundUser.save();
        console.log(result);
    } catch (err) {
        console.log(err);
        res.sendStatus(400);
    }
   
    return res.sendStatus(200);
}




module.exports = { getAllUsers, addQuestion }
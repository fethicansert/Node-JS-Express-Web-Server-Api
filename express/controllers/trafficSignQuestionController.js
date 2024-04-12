const TrafficSingQuestion = require('../model/TrafficSingQuestion');

const getAllTrafficSignQuestions = async (req, res) => {
    const trafficSingQuestions = await TrafficSingQuestion.find({});
    if(!trafficSingQuestions) return res.status(204).json({message: "No Traffic Sing Found !"});
    res.json(trafficSingQuestions);
};

const createTraffinSingQuestion = async (req, res) => {
    //check if all choices come to server if exists
    if(!req.body.image || !req.body.choiceA || !req.body.choiceB || !req.body.choiceC || !req.body.choiceB){
        return res.status(400).json({ message: "Missing Data" });
    }

    //check if Traffic Sign Question alreay exist
    const duplicate = await TrafficSingQuestion.findOne({image: req.body.image}).exec();

    if(duplicate) return res.status(409).json({message: "Traffic Sign already in the database"});

    //try to Create Traffic Sing Question
    try {
        //create Traffic Sing Question instance
        const newTrafficSingQuestion = new TrafficSingQuestion({
            image: req.body.image,
            choices: [
                req.body.choiceA,
                req.body.choiceB,
                req.body.choiceC,
                req.body.choiceD
            ]
        });

        //Save to DB
        const result = await newTrafficSingQuestion.save();
        res.status(201).json(result);
    } catch(err) {
        console.log(err);
    }
}


module.exports = {
    getAllTrafficSignQuestions,
    createTraffinSingQuestion
}
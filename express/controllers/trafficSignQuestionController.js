const TrafficSingQuestion = require('../model/TrafficSingQuestion');


const getAllTrafficSignQuestions = async (req, res) => {

    //get random  questions with given size
    const trafficSingQuestions = await TrafficSingQuestion.aggregate([{ $sample: { size: 20 } }]);
    if (!trafficSingQuestions) return res.status(204).json({ message: "No Traffic Sing Found !" });

    res.json(trafficSingQuestions);
};

const getTrafficSignQuestions = async (req, res) => {

    if (!req?.params?.soru) return res.status(400).json({ error: 'Soru parameter required' });
    
    //get random and filtered questions with given size
    const trafficSingQuestions = await TrafficSingQuestion.aggregate([
        { $match: { type: req.params.soru } },
        { $sample: { size: 20 } }
    ]);

    if (!trafficSingQuestions) return res.status(204).json({ message: "No Traffic Sing Found !" });
    res.json(trafficSingQuestions);
};

const createTraffinSingQuestion = async (req, res) => {
    //check if all choices come to server if exists
    if (!req.body.image || !req.body.choiceA || !req.body.choiceB || !req.body.choiceC || !req.body.choiceB || !req.body.type) {
        return res.status(400).json({ message: "Missing Data" });
    }

    //check if Traffic Sign Question alreay exist
    const duplicate = await TrafficSingQuestion.findOne({ image: req.body.image }).exec();

    if (duplicate) return res.status(409).json({ message: "Traffic Sign already in the database" });

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
            ],
            type: req.body.type
        });

        //Save to DB
        const result = await newTrafficSingQuestion.save();
        res.status(201).json(result);
        // console.log(result);
    } catch (err) {
        console.log(err);
    }
}


module.exports = {
    getAllTrafficSignQuestions,
    createTraffinSingQuestion,
    getTrafficSignQuestions
}
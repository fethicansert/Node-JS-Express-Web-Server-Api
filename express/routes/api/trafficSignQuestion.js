const express = require("express");
const router = express.Router();
const trafficSignQuestionController = require('../../controllers/trafficSignQuestionController');

router.route('/')
    .get(trafficSignQuestionController.getAllTrafficSignQuestions)
    .post(trafficSignQuestionController.createTraffinSingQuestion)
    .put()
    .delete()


router.route('/:id')
    .get();

module.exports = router;
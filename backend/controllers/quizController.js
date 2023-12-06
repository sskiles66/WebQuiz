import Quiz from "../models/quizModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Auth user & get token
// @route POST /api/quiz/auth
// @access Public
const getScores = (async (req, res) => {
    try {
        const answers = await Quiz.find({});

        res.status(200).json(answers);
    } catch (err) {
        console.error("Cant get scores");
    }
});

const postScores = (async (req, res) => {
    try {
        const {currentScore, userId} = req.body;
        const date = new Date();

        const quiz = await Quiz.create({
            currentScore,
            userId,
            date,
        });

        if (quiz) {
            res.status(201).json({
                quizScores: quiz.quizScores,
            });
        }
    } catch (err) {
        console.error("Cant send scores");
    }
});

const userSummary = (async (req, res) => {
    try {
        const {userId} = req.body;

        const summary = await Quiz.find({userId: userId});

        res.status(200).json({summary});
    } catch (err) {
        console.error(err);
        res.status(404).json({message: "Not found"});
    }
});

export {
    getScores,
    postScores,
    userSummary,
};
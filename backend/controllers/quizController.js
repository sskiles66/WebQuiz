import Quiz from "../models/quizModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Auth user & get token
// @route POST /api/quiz/auth
// @access Public
const getScores = (async (req, res) => {
    try {
        const answers = await Quiz.find({});

        res.status(200).json(answers)
    } catch (err) {
        console.error("Cant get scores")
    }
});

const postScores = (async (req, res) => {
    try {
        const {currentScore, userId} = req.body;
        console.log(currentScore, "1")
        console.log(userId, "userID")
        const date = new Date()

        // console.log(currentScore, "1")

        const quiz = await Quiz.create({
            currentScore,
            userId,
            date
        })

        console.log(quiz, "quiz")

        if (quiz) {
            console.log(quiz)

            res.status(201).json({
                quizScores: quiz.quizScores,
            })
        }
    } catch (err) {
        console.error("Cant send scores")
    }
});

export {
    getScores,
    postScores
};
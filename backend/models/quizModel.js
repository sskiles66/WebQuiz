import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
    currentScore: {type: Number, required: true},
});

const Quiz = mongoose.model("Quiz", quizSchema);

export default Quiz;
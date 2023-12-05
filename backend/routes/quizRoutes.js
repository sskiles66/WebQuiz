import express from "express";
import {getScores, postScores} from "../controllers/quizController.js";

const router = express.Router();

router.route("/")
    .post(postScores)
    .get(getScores);

export default router;
import express from "express";
import {getScores, postScores, userSummary} from "../controllers/quizController.js";

const router = express.Router();

router.route("/")
    .post(postScores)
    .get(getScores);
router.route("/summary")
    .get(userSummary)

export default router;
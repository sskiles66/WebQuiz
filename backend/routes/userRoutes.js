import express from "express";
import {authUser, getUsers, logoutUser, registerUser} from "../controllers/userController.js";

const router = express.Router();

router.route("/")
    .get(getUsers)
    .post(registerUser);
router.post("/logout", logoutUser);
router.post("/auth", authUser);

export default router;
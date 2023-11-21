import express from "express"
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  deleteUser,
  updateUser
} from "../controllers/userController.js"

const router = express.Router();

router.route("/")
  .get(getUsers)
  .post(registerUser);
router.post("/logout", logoutUser);

export default router;
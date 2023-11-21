// import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js"
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Auth user & get token
// @route POST /api/users/login
// @access Public
const authUser = (async (req, res) => {
  const {email, password} = req.body;

  const user = await User.findOne({email});

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email
    })
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
  const {name, email, password} = req.body;

  const userExist = await User.findOne({email});

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Private
const logoutUser = (async (req, res) => {
  res.send("Logout User");

  /*res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({message: "Logged out successfully"});*/
});


// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = (async (req, res) => {
  res.send("Get Users");
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUsers,
};
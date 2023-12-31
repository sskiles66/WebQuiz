import User from "../models/userModel.js";
import asyncHandler from "../middleware/asyncHandler.js";

// @desc Auth user & get token
// @route POST /api/users/auth
// @access Public
const authUser = (async (req, res) => {
    try {
        const {email, password} = req.body;

        const user = await User.findOne({email});

        if (user && (await user.matchPassword(password))) {

            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(401).json({message: "Invalid email or password"});
        }
    } catch (err) {
        res.status(500).json({message: "Invalid email or password"});
    }
});

// @desc Register user & give token
// @route POST /api/users
// @access Public
const registerUser = asyncHandler(async (req, res) => {
    try {
        const {name, email, password} = req.body;

        const userExist = await User.findOne({email});

        if (userExist) {
            res.status(400).json({message: "User already exists"});
        }

        const user = await User.create({
            name,
            email,
            password,
        });

        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                email: user.email,
            });
        } else {
            res.status(400).json({message: "Invalid user data"});
        }
    } catch (err) {
        res.status(500).json({message: "Invalid user data"});
    }
});

// @desc Logout user / clear cookie
// @route POST /api/users/logout
// @access Public
const logoutUser = (async (req, res) => {
    res.clearCookie("jwt");

    res.status(200).json({message: "Logged out successfully"});
});


// @desc Get users
// @route GET /api/users
// @access Private/Admin
const getUsers = (async (req, res) => {
    const users = await User.find({}).select("-password");

    res.status(200).json(users);
});

export {
    authUser,
    registerUser,
    logoutUser,
    getUsers,
};
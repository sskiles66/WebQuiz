import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, index: true},
    password: {type: String, required: true},
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await this.password === enteredPassword;
};

const User = mongoose.model("User", userSchema);

export default User;
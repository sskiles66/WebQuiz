import dotenv from "dotenv";
import colors from "colors";
import users from "./data/users.js";
import User from "./models/userModel.js";
import connectDB from "./database/db.js";

dotenv.config();

connectDB();

const importData = async () => {
    try {
        await User.deleteMany();

        await User.insertMany(users);

        console.log(colors.green.inverse("Data Imported!"));
        process.exit();
    } catch (err) {
        console.error(colors.red.inverse(`${err}`));
    }
};

const destroyData = async () => {
    try {
        await User.deleteMany();

        console.log("Data Destroyed!".red.inverse);
        process.exit();
    } catch (err) {
        console.error(`${err}`.red.inverse);
    }
};

if (process.argv[2] === "-d") {
    destroyData();
} else {
    importData();
}
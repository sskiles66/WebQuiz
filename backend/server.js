import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import connectDB from "./database/db.js";

dotenv.config();

const app = express();

// Cors middleware
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));

// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Connect to MongoDB
connectDB();

app.get("/", (req, res) => {
    res.send("Server is ready");
});

app.use("/api/users", userRoutes);

app.listen(process.env.PORT || 6969, () => {
    console.log(`Server at http://localhost:${process.env.PORT || 5000}`);
});
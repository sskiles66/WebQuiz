import express from "express"
import dotenv from "dotenv"

dotenv.config()

const app = express()

app.get("/", (req, res) => {
  res.send("Server is ready")
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Serve at http://localhost:${process.env.PORT || 5000}`)
});
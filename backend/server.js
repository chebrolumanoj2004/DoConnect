const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

app.get("/debug", (req, res) => {
  res.send("DEBUG ROUTE WORKING");
});


app.use(cors());
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("DoConnect API Running");
});

const authRoutes = require("./routes/authRoutes");


app.get("/api/test", (req, res) => {
  res.send("API main route working");
});

const questionRoutes = require("./routes/questionRoutes");
const answerRoutes = require("./routes/answerRoutes");
const commentRoutes = require("./routes/commentRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/comments", commentRoutes);


const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
module.exports = app;
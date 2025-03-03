require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const port = process.env.PORT || 7316;
const mongodbUrl = process.env.MONGODB_URL || "mongodb://localhost:27017/QUIZ";

mongoose
.connect(mongodbUrl)
.then(() => console.log("Connected to MongoDB"))
.catch((error) =>{
    console.error("MongoDB connection failed: ", error.message);
})

const app = express();
app.use(express.json(), cors());

// Default Route
app.get("/", (req, res) =>{
    res.json({message: "Server is running"});
});

// Import and use route
const questionRoutes = require("./routes/question_routes");
app.use("/v1/questions", questionRoutes)


const startingTime = Date.now();
app.listen(port, ()=>{
    const endingTime = Date.now()
    console.log(`Server is running on http://localhost:${port}, Time taken: ${endingTime - startingTime}ms`)
})
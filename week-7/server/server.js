//  TODO: Can you create backend with standard folder structure like: week-4/hard ???
const express = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const dotenv = require("dotenv");
const { userRouter } = require('./routes/user');
const { adminRouter } = require('./routes/admin');
const { connectToDatabase } = require("./db/db");
dotenv.config();
// Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env
const app = express();

app.use(express.json());

const secret = process.env.JWT_SECRERT;  // This should be in an environment variable in a real application
const port = process.env.PORT;

app.use("/users", userRouter)
app.use("/admin", adminRouter)

app.listen(port, () => {
    // Connect to MongoDB
    mongoose.connect(process.env.MONGO_URI); 
    console.log('Server is listening on port 3000');
});
// User routes

const { Router } = require("express");
const userRouter = Router();
const { User } = require("../db/db");
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const SECRET = process.env.JWT_SECRET;

userRouter.post('/signup', async (req, res) => {
    // logic to sign up user
    const requiredBody = z.object({
        email: z.email(),
        password: z.string().min(3).max(30),
        firstName: z.string(),
        lastName: z.string()
    })
    const result = requiredBody.safeParse(req.body)

    if (!result.success) {
        res.json({
        message: "Incorrect format: " + result.error.issues[0].message
        })
        return
    }
    /*
        receive req.body from script.js (submit button of signup)
        {
            email: email (from signup-email),
            password: password (from signup-password),
            firstName: firstName,
            lastName: lastName
        }
    */
    const { email, password, firstName, lastName } = req.body;
    // check if email already exists
    try {
        const user = await User.findOne({ email });
        if (user) {
        return res.status(403).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newUser = new User({ email, password: hashedPassword, firstName, lastName });
        await newUser.save();
        /* 
        const user = await User.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName, lastName
        })
        */

        const token = jwt.sign({ userId: newUser._id }, SECRET, { expiresIn: '1h' }); 
        res.json({ message: 'User created successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

userRouter.post('/login', async (req, res) => {
    // logic to log in user
      const { email, password } = req.body; 
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({ message: "Invalid email" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(403).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: "1h" });
    res.json({ message: "Logged in successfully", token });

  } catch (error) {
    res.status(500).json({ message: "Error signing in", error: error.message });
  }
});

userRouter.get('/courses', (req, res) => {
    // logic to list all courses
    res.json("hello")
});

userRouter.post('/courses/:courseId', (req, res) => {
    // logic to purchase a course
});

userRouter.get('/purchasedCourses', (req, res) => {
    // logic to view purchased courses
});

module.exports = {
    userRouter: userRouter
}
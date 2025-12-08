// Admin routes

const { Router } = require("express");
const adminRouter = Router();
const { Admin } = require("../db/db");
const { z } = require('zod');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
dotenv.config();
const SECRET = process.env.JWT_SECRET;

adminRouter.post('/signup', async (req, res) => {
    // logic to sign up admin
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
        const user = await Admin.findOne({ email });
        if (user) {
        return res.status(403).json({ message: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        const newAdmin = new Admin({ email, password: hashedPassword, firstName, lastName });
        await newAdmin.save();
        /* 
        const user = await Admin.create({
            email: email,
            password: password,
            firstName: firstName,
            lastName, lastName
        })
        */

        const token = jwt.sign({ userId: newAdmin._id }, SECRET, { expiresIn: '1h' }); 
        res.json({ message: 'Admin created successfully', token });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

adminRouter.post('/login', async (req, res) => {
    // logic to log in admin
          const { email, password } = req.body; 
  try {
    const user = await Admin.findOne({ email });
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

adminRouter.post('/courses', (req, res) => {
    // logic to create a course
});

adminRouter.put('/courses/:courseId', (req, res) => {
    // logic to edit a course
});

adminRouter.get('/courses', (req, res) => {
    // logic to get all courses
});

module.exports = {
    adminRouter: adminRouter
}
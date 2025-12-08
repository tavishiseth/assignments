// User routes

const { Router } = require("express");
const userRouter = Router();

userRouter.post('/signup', (req, res) => {
    // logic to sign up user
});

userRouter.post('/login', (req, res) => {
    // logic to log in user
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
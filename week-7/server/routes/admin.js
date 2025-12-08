// Admin routes

const { Router } = require("express");
const adminRouter = Router();

adminRouter.post('/signup', (req, res) => {
    // logic to sign up admin
});

adminRouter.post('/login', (req, res) => {
    // logic to log in admin
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
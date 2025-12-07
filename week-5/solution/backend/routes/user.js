const express = require('express');
const jwt = require('jsonwebtoken');
const { authenticateJwt, SECRET } = require("../middleware/user");
const { User } = require("../db");
const router = express.Router();
//const app = express()
// app.use(express.json())

router.post('/signup', async (req, res) => {
    /*
      receive req.body from script.js (submit button of signup)
      {
          username: username (from signup-username),
          password: password (from signup-password)
      }
  */
  const { username, password } = req.body;
  // check if username already exists
  try {
    const user = await User.findOne({ username });
    if (user) {
      return res.status(403).json({ message: 'User already exists' });
    }

    const newUser = new User({ username, password });
    await newUser.save();
    /*
       await User.insertOne({
        username: username,
        password: password
      })
    */

    const token = jwt.sign({ userId: newUser._id }, SECRET, { expiresIn: '1h' }); 
    res.json({ message: 'User created successfully', token });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

router.post('/signin', async (req, res) => {
  const { username, password } = req.body; 
  try {
    const user = await User.findOne({ username, password });
    /* 
       const user = await User.create({
        username: username,
        password: password
      })
    */

    if (user) {
      const token = jwt.sign({ userId: user._id }, SECRET, { expiresIn: '1h' });

      res.json({ message: 'Logged in successfully', token });
    } else {
      res.status(403).json({ message: 'Invalid username or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error });
  }
});

module.exports = router;

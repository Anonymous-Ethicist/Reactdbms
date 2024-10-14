const express = require('express');
const router = express.Router();
const userController = require('./userController');
const bcrypt = require('bcrypt');

// Register a new user
router.post('/register', async (req, res) => {
    try {
      const newUser = await userController.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error); // Log the error to the console for debugging
  
      if (error.code === 11000 && error.keyPattern && error.keyPattern.username) {
        // Duplicate username error
        res.status(400).json({ error: 'Username already exists. Please choose a different username.' });
      } else {
        // Other errors
        res.status(500).json({ error: 'Internal Server Error' });
      }
    }
  });
  router.post('/login', async (req, res) => {
    try {
      const { username, password } = req.body;
  
      // Find user by username
      const user = await userController.findUserByUsername(username);
  
      if (!user) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Compare passwords
      const passwordMatch = await bcrypt.compare(password, user.password);
  
      if (!passwordMatch) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
  
      // Passwords match, consider the user as logged in
      // You might want to generate a token here for further authentication
  
      res.status(200).json({ message: 'Login successful' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

// Login route and other authentication routes

module.exports = router;

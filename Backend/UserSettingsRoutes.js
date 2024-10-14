const express = require('express');
const router = express.Router();
const UserSettings = require('./userSettings');
const { calculateBMR } = require('./utils');
const { findUserByUsername } = require('./userController');

// Create or update user settings
router.post('/settings/:username', async (req, res) => {
  try {
    const { height, weight, goal, activityLevel, age, gender } = req.body;
    const username = req.params.username;

    // Find user by username
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if user settings already exist
    let userSettings = await UserSettings.findOne({ user: user._id });

    if (!userSettings) {
      // If settings don't exist, create a new one
      userSettings = new UserSettings({
        user: user._id,
        height,
        weight,
        goal,
        activityLevel,
        age,
        gender,
      });
    } else {
      // If settings exist, update them
      userSettings.height = height;
      userSettings.weight = weight;
      userSettings.goal = goal;
      userSettings.activityLevel = activityLevel;
      userSettings.age = age;
      userSettings.gender = gender;
    }

    // Calculate BMR
    const bmr = calculateBMR(weight, height, age, gender, activityLevel);
    userSettings.bmr = bmr;

    await userSettings.save();

    res.status(200).json(userSettings);
  } catch (error) {
    console.error('Error saving user settings:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

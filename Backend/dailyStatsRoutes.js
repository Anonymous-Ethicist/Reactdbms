const express = require('express');
const router = express.Router();
const DailyStats = require('./dailyStats');
const Food = require('./foods');
const UserSettings = require('./userSettings');
const { findUserByUsername } = require('./userController');

// Update daily stats based on food consumption
router.post('/fopo', async (req, res) => {
  try {
    const { foodName, quantity } = req.body;
    const username = req.params.username;

    // Find user by username
    const user = await findUserByUsername(username);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Find food by name
    const food = await Food.findOne({ name: foodName });

    if (!food) {
      return res.status(404).json({ error: 'Food not found' });
    }

    // Find user settings
    const userSettings = await UserSettings.findOne({ user: user._id });

    if (!userSettings) {
      return res.status(400).json({ error: 'User settings not found' });
    }

    // Calculate calories and protein consumed
    const caloriesConsumed = quantity * food.caloriesPerGram;
    const proteinConsumed = quantity * food.proteinPerGram;

    // Calculate calories left
    const caloriesLeft = userSettings.bmr - caloriesConsumed;

    // Calculate protein goal (1.6 times body weight)
    const proteinGoal = 1.6 * userSettings.weight;

    // Calculate protein left
    const proteinLeft = proteinGoal - proteinConsumed;

    // Get the current date
    const currentDate = new Date().setHours(0, 0, 0, 0);

    // Find the existing daily stats entry for the current date
    const existingDailyStats = await DailyStats.findOne({ user: user._id, date: currentDate });

    // If an entry already exists, update it; otherwise, create a new one
    if (existingDailyStats) {
      // Update existing entry
      existingDailyStats.caloriesConsumed += caloriesConsumed;
      existingDailyStats.proteinConsumed += proteinConsumed;
      existingDailyStats.caloriesLeft = caloriesLeft;
      existingDailyStats.proteinLeft = proteinLeft;

      // Save the updated entry
      await existingDailyStats.save();

      res.status(200).json(existingDailyStats);
    } else {
      // Create a new entry
      const newDailyStats = new DailyStats({
        user: user._id,
        date: currentDate,
        caloriesConsumed,
        proteinConsumed,
        caloriesLeft,
        proteinGoal,
        proteinLeft,
      });

      // Save the new entry
      await newDailyStats.save();

      res.status(201).json(newDailyStats);
    }
  } catch (error) {
    console.error('Error updating daily stats:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

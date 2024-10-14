// foodRoutes.js
const express = require('express');
const router = express.Router();
const Food = require('./foods');

// Search for foods based on a query
router.get('/foods', async (req, res) => {
  try {
    const query = req.query.query; // Get the search query from the request
    const regex = new RegExp(query, 'i'); // Case-insensitive search

    // Use the regex to find matching foods in the database
    const foods = await Food.find({ name: regex });

    res.status(200).json(foods);
  } catch (error) {
    console.error('Error searching for foods:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

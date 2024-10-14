const express = require('express');
const cors = require('cors');
const { connectToDatabase, disconnectFromDatabase } = require('./db');
const bodyParser = require('body-parser');
const authRoutes = require('./authRoutes');
const foodRoutes = require('./foodRoutes');
const userSettingRoutes = require('./UserSettingsRoutes'); // Update import
const dailyStatsRoutes=require('./dailyStatsRoutes');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


// Connect to the database
connectToDatabase();

// Routes
app.use('/auth', authRoutes);
app.use('/api', foodRoutes);
app.use('/user', userSettingRoutes); // Update route
app.use('/stats', dailyStatsRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Handle SIGINT (Ctrl+C) to disconnect from the database before exiting
process.on('SIGINT', async () => {
  await disconnectFromDatabase();
  process.exit();
});

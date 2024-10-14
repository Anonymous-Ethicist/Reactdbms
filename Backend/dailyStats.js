const mongoose = require('mongoose');

const dailyStatsSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
     required: true,
  },
  caloriesConsumed: {
    type: Number,
    default: 0,
  },
  proteinConsumed: {
    type: Number,
    default: 0,
  },
  caloriesLeft: {
    type: Number,
    default: 0,
  },
  proteinGoal: {
    type: Number,
    default: 0,
  },
  proteinLeft: {
    type: Number,
    default: 0,
  },
});

const DailyStats = mongoose.model('DailyStats', dailyStatsSchema);

module.exports = DailyStats;

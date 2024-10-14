const mongoose = require('mongoose');

const userSettingsSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  height: { type: Number, required: true },
  weight: { type: Number, required: true },
  goal: { type: String, enum: ['lose', 'gain', 'maintain'], required: true },
  activityLevel: { type: String, enum: ['active', 'inactive', 'moderatelyActive'], required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['male', 'female', 'other'], required: true },
  bmr: { type: Number },
});

const UserSettings = mongoose.model('UserSettings', userSettingsSchema);

module.exports = UserSettings;

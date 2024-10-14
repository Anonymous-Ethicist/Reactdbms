// foodController.js
const Food = require('./foods');

const getAllFoods = async () => {
  try {
    const foods = await Food.find();
    return foods;
  } catch (error) {
    throw new Error('Error fetching foods');
  }
};

// Add other CRUD operations as needed

module.exports = { getAllFoods };

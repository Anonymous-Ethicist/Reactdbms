// utils.js
const calculateBMR = (weight, height, age, gender, activityLevel) => {
    // BMR calculation based on Harris-Benedict equation
    let bmr;
  
    if (gender.toLowerCase() === 'male') {
      // For males
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else if (gender.toLowerCase() === 'female') {
      // For females
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    } else {
      throw new Error('Invalid gender');
    }
  
    // Adjust BMR based on activity level
    switch (activityLevel.toLowerCase()) {
      case 'sedentary':
        bmr *= 1.2;
        break;
      case 'moderatelyactive':
        bmr *= 1.55;
        break;
      case 'active':
        bmr *= 1.9;
        break;
      default:
        throw new Error('Invalid activity level');
    }
  
    return bmr;
  };
  
  module.exports = { calculateBMR };
  
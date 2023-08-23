const jwt = require('jsonwebtoken');

// Function to generate a JWT token
const generateJWT = (userId, userRole) => {
  // Define the payload for the JWT token
  const payload = {
    id: userId,
    role: userRole,
  };

  // Generate the JWT token with the secret key
  const token = jwt.sign(payload, process.env.SECRETKEY, { expiresIn: '1h' }); // Token expires in 1 hour

  return token;
};

const generateRandomCode =() => {
  const min = 1000; // Minimum 4-digit number
  const max = 9999; // Maximum 4-digit number
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
  generateJWT,
  generateRandomCode
};
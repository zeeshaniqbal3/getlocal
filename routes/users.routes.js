const express = require("express");
const router = express.Router();

const userController = require('../controllers/userController');

router.post('/signup', userController.signup);

router.post('/signin', userController.signin);
  
  // Read all records
router.get('/read', userController.getAll);
  
// Update a record
router.post('/update/:id', userController.updateprofile);
   
  // Forgot Password API route
router.post('/forgot-password', userController.forgetpassword);
//router.post('/reset-password', userController.resetpassword);
router.get('/switchrole', userController.switchrole);
  
module.exports = router;   
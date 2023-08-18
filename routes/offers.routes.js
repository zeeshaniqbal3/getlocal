const express = require("express");
const router = express.Router();
const multer = require('multer');
const offerController = require('../controllers/offers.controller');

// Set up storage configuration for Multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// Create a Multer instance with the storage configuration
const upload = multer({ storage: storage });

router.post('/create', upload.single('file'), offerController.create);
  
  
  
module.exports = router;
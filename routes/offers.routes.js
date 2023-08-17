const express = require("express");
const router = express.Router();
const multer = require('multer');

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

router.post('/create', upload.single('file'), (req, res) => {
  const file = req.file.filename;
  

    const {title, price,features, about, location } = req.body;
  
    const query = 'INSERT INTO offer (title, price, pictures,features, about, location) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [title, price, file,features, about, location], (err, result) => {
      console.log(shfh);
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Record created successfully' });
      }
    });
  });
  
  
module.exports = router;
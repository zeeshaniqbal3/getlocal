const express = require("express");
const router = express.Router();

const db = require('../config/db');

router.post('/signup', (req, res) => {
    
    const { name, email, password } = req.body;
    console.log(req.body)
    const query = 'INSERT INTO user (name, email,password) VALUES (?, ?, ?)';
    db.query(query, [name, email, password], (err, result) => {

      if (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Record created successfully' });
      }
    });
  });

  router.post('/signin', (req, res) => {
    
    const { email, password } = req.body;
    
    const query = 'SELECT * FROM User WHERE email = ? AND password = ?';
    db.query(query, [ email, password], (err, result) => {
      if (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: "signin successfully",  result : result });
      }  
    });
  });
  
  // Read all records
  router.get('/read', (req, res) => {
    const query = 'SELECT * FROM User';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
  });
  
  // Update a record
  router.post('/update/:id', (req, res) => {
    const { name, email, password } = req.body;
    const profileId = req.params.id;
    const query = 'UPDATE User SET name = ?, email = ?, password = ? WHERE id = ?';
    db.query(query, [name, email, password, profileId], (err, result) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Record updated successfully' });
      }
    });
  });
  
module.exports = router;   
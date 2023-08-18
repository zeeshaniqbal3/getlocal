const offerController = {};
const db = require('../config/db');
 
offerController.create = async (req, res) => {
    const file = req.file;
  

    const {title, price,features, about, location } = req.body;
  
    const query = 'INSERT INTO offer (title, price, pictures,features, about, location) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [title, price, file.filename,features, about, location], (err, result) => {
      
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Record created successfully' });
      }
    });

}


module.exports = offerController;
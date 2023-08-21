const offerController = {};
const db = require('../config/db');
 
offerController.create = async (req, res) => {
    const files =req.files.map(file => file.filename);
   const file =[JSON.stringify(files)]
    const {title, price, features, about, location } = req.body;
    console.log(title, price, file,features, about, location);
    const query = 'INSERT INTO offer (title, price, picture,features, about, location) VALUES (?, ?, ?, ?, ?, ?)';
    
    db.query(query, [title, price,file ,features, about, location], (err, result) => {
      
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Record created successfully' });
      }
    });

}


module.exports = offerController;
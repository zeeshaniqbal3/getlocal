const offerController = {};
const db = require('../db/connection');
 
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
offerController.getAll = async (req, res) => {
  const query = 'SELECT * FROM offer';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(results);
    }
  });
};
offerController.search = async (req,res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
      return res.status(400).send('Keyword parameter is missing.');
  }

  const sql = 'SELECT * FROM offer WHERE title LIKE ? OR about LIKE ?';
  const keywordParam = `%${keyword}%`;

  db.query(sql, [keywordParam, keywordParam], (err, results) => {
      if (err) {
          console.error('Error querying the database:', err);
          res.status(500).send('Internal Server Error');
          return;
      }

      res.json(results);
  });
}
offerController.delete= async(req,res) =>{
  const id = req.params.id;
  db.query('DELETE FROM offers WHERE id = ?',[id]);
  res.send("offer deleted");
};
userController.update = async (req, res) => {
  try {
      const { title, price, about,features,location } = req.body;
      const profileId = req.params.id;
      const query = 'UPDATE user SET title = ?, price = ?, about = ?,features=?, location=? WHERE id = ?';
      db.query(query, [title, price, about,features,location, profileId], (err, result) => {
        if (err) {
          res.status(500).json({ error: err.message });
        } else {
          res.json({ message: 'Record updated successfully' });
        }
      });
    } catch (ex) {
      console.log('ex', ex);
    }
};


module.exports = offerController;
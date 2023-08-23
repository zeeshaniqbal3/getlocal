const userController = {};
const db = require('../db/connection');
const bcrypt = require('bcryptjs');
const jsonwebtoken =  require('jsonwebtoken');
const { generateJWT ,generateRandomCode } = require('../utils/helpers');
const { switchrole } = require('../middleware/authenticate');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

// Generate a random token
const generateToken = () => crypto.randomBytes(20).toString('hex');

// Create a nodemailer transporter (configure your email provider)
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.email,
    pass: process.env.gpass,
  },
});


userController.getAll = async (req, res) => {
    const query = 'SELECT * FROM User';
    db.query(query, (err, results) => {
      if (err) {
        res.status(500).json({ error: err.message });
      } else {
        res.json(results);
      }
    });
};

userController.signup = async (req, res) => {
    const { name, email, password,role } = req.body;
    const resetToken = generateToken();
    const resetTokenExpiry = Date.now() + 3600000; 
    console.log(req.body)
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
 

    const query = 'INSERT INTO user (name, email,password,role,reset_token,reset_token_expiry) VALUES (?, ?, ?,?,?,?)';
    db.query(query, [name, email, hash,role,resetToken,resetTokenExpiry], (err, result) => {

      if (err) {
        console.log(err)
        res.status(500).json({ error: err.message });
      } else {
        res.json({ message: 'Record created successfully' });
      }
    });
};

userController.signin = async (req, res) => {
    const { email, password } = req.body;
    
    const query = 'SELECT * FROM user WHERE email = ? ';
    const result=db.query(query, [ email]);
        if (result) {
          const matchpassword= bcrypt.compare(password, result.password)
          if (matchpassword) {
            const token = generateJWT(result.id, result.role);
           res.send({ message: 'Successfully Logged in', token: token , id:token.role});

           console.log(token,'uuuuuuuuuuuuuuuuuuuuu')
         } 
         
         else {
           console.log('password doesnot match');
   
           res.status(401).send({ message: 'Wrong email or Password' });
           

          }
         } else {
            res.status(401).send({
              Error: 'This user doesnot exists. Please signup first'
            
            
           
              // great, allow this user access
                  
      
           
            });
  }

};


userController.updateprofile = async (req, res) => {
    try {
        const { name, email, password,role } = req.body;
        const profileId = req.params.id;
        const query = 'UPDATE user SET name = ?, email = ?, password = ?,role=? WHERE id = ?';
        db.query(query, [name, email, password,role, profileId], (err, result) => {
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

userController.forgetpassword = async (req, res) => {
  try {
    const { email } = req.body;

  // Generate and save reset token
  const resetToken = generateToken();
  const resetTokenExpiry = Date.now() + 3600000; // Token expires in 1 hour

  db.query('UPDATE user SET reset_token = ?, reset_token_expiry = ? WHERE email = ?', [resetToken, resetTokenExpiry, email], (err, result) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ message: 'An error occurred' });
    } else {
      // Send reset email
      const mailOptions = {
        from: process.env.email,
        to: email,
        subject: 'Password Reset',
        text: `Click the following link to reset your password: http://localhost:3000/reset/${resetToken}`,
      };

      transporter.sendMail(mailOptions, (mailErr, info) => {
        if (mailErr) {
          console.error('Email sending error:', mailErr);
          res.status(500).json({ message: 'An error occurred' });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Password reset email sent' });
        }
      });
    }
  });
  } catch (error) {
    console.log('error', error);
    return res.status(500).send(error);
  }
};

userController.resetpassword = async (req, res) => {
  const { resetToken, newPassword } = req.body;

  db.query('SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > ?', [resetToken, Date.now()], (err, rows) => {
    if (err) {
      console.error('Database error:', err);
      res.status(500).json({ message: 'An error occurred' });
    } else if (rows.length === 0) {
      res.status(400).json({ message: 'Invalid or expired token' });
    } else {
      const userId = rows[0].id;

      // Update user's password
      db.query('UPDATE user SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?', [newPassword, userId], (updateErr, updateResult) => {
        if (updateErr) {
          console.error('Database error:', updateErr);
          res.status(500).json({ message: 'An error occurred' });
        } else {
          res.status(200).json({ message: 'Password reset successfully' });
        }
      });
    }
  });
};
userController.switchrole = async(req,res) =>{
  const id= switchrole;
 const result= db.query('SELECT * FROM user WHERE id=?',[id]);
 if(result.role=="vendor"){
  db.query('UPDATE user SET role = "user"')
 }
 else{
  db.query('UPDATE user SET role = "vendor"')
 }

}
module.exports = userController;
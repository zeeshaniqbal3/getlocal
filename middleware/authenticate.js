const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY); 
    req.user = decoded; 
    next();
  } catch (err) {
    next(err);
  }
};
const verifyvendor = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (decoded.role !== 'vendor') {
      return res.status(403).json({ message: 'Access denied. vendor privileges required.' });
    }

    req.user = decoded;
    next();
  } catch (err) {
    next(err);
  }
};
const switchrole = (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);


   const id=decoded.id
    return id;

  } catch (err) {
    next(err);
  }
};
module.exports = {
  verifyToken,
  verifyvendor,
  switchrole
};
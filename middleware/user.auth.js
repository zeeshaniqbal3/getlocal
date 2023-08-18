const jwt = require('jsonwebtoken');

module.exports = (req,res, next) => {
    try{  
        const tokens = req.cookies.jwt;
        console.log("hello");
        console.log(token,'tokennnnnnnnnnnnnn');
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.userData = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        });
    }
       
};
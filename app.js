const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
require('dotenv').config({ path: "./sample.env" });

const cors = require('cors');
const bodyParser = require('body-parser')
app.use(
    bodyParser.urlencoded({
      extended: true
    })
  );
  
  app.use(bodyParser.json()); // to support JSON-encoded bodies
  
// Requiring Routes

const UsersRoutes = require('./routes/users.routes');
const vendorsRoutes = require('./routes/vendors.routes');       
const offersRoutes = require('./routes/offers.routes'); 
// connection to mysql



const fs = require('fs');
fs.readdirSync(__dirname + "/models").forEach(function(file) {
    require(__dirname + "/models/" + file);
});

// in case you want to serve images 

app.use(express.static("public"));

app.get('/',  function (req, res) {
  res.status(200).send({
    message: 'Express backend server'});
});

app.set('port', (process.env.PORT))

app.use(cors());

// Routes which should handle requests
app.use("/users",UsersRoutes);
app.use("/vendors",vendorsRoutes);
app.use("/offers",offersRoutes);

server.listen(app.get('port'));
console.log('listening on port',app.get('port'));

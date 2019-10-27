require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();
const verify = require('./verify');
const db = require('./db');
const cors = require('cors');
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});
app.post('/login', (req,res) => {
  let {email,password} = req.body;
  console.log(req.body);
  if(email && password) {
    try {
      res.json( verify.CheckLogin(email,password) );
    }
    catch(e) {
      res.status(401).json({
        msg: "Wrong login data."
      })
    }
  }
  else {
    res.status(401).json({
      msg: "Wrong json format."
    })
  }
})
app.get('/table', (req,res) => {
  let {email, token} = req.body;
  if(verify.VerifyToken(email, token)) {
    res.json( db.GetTable(email) );
  }
  else {
    res.status(401).json({
      msg: "Wrong token!"
    });
  }
})
app.post('/signup', (req,res) => {
  let {email,password} = req.body;
  if( db.CheckIfCanCreateUser(email,password) ) {
    try {
      db.CreateUser(email,password);
      res.json({
        success: true,
        msg: "OK"
      })
    }
    catch(e) {
      res.json({
        success: false,
        msg: "Cannot create such user."
      })
    }
  }
  else {
    res.json( {
      success: false,
      msg: "User already exists!"
    } )
  }
})
app.post('/verify', (req,res) => {
  let {email,token} = req.body;
  if( verify.VerifyToken(email,token)) {
    res.json({
      success: true
    });
  }
  else {
    res.json({success: false}).status(401);
  }
})
app.listen(port);
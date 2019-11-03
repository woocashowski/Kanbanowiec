require('dotenv').config()
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8080;
const app = express();
const cors = require('cors');
const router = require('./router');

app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(cors());
app.use('/', router);
app.listen(port);
console.log("Server started on port " + port);
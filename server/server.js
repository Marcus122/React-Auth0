/* ===== ./server.js ===== */
var express = require('express');
var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var router = require('./router');

require('dotenv').config();

//DB Setup
mongoose.connect('mongodb://' + process.env.DB_HOST + '/' + process.env.DB_DATABASE);

app.use(cors());
app.use(bodyParser.json({type: '*/*'}));
router(app);

app.listen(3090);
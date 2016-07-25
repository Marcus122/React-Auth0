var express = require('express');
var app = express();
var jwt = require('express-jwt');
var bodyParser = require('body-parser');
 
app.use(bodyParser.json());

var authenticate = jwt({
  secret: new Buffer("", 'base64'),
  audience: ""
});

//Updating needs authorisation
app.post('/api/post/:id', authenticate, function(req, res) {
  res.json({ success: true });
});

app.get('/api/getPosts', function(req, res) {
  res.json({ success: true });
});

app.listen(8081);
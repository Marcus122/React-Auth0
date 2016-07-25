var express = require('express');
var app = express();
var jwt = require('express-jwt');
var bodyParser = require('body-parser');
 
app.use(bodyParser.json());

var authenticate = jwt({
  secret: new Buffer("3wo8FMW7BI0K2IddH_h54exvldCkm7k42beznOHZ54WMofiZ5bvwAZvLJdm6EogP", 'base64'),
  audience: "7kXfnR65i6pMiRPN7N7fWLAjlqlCflqZ"
});

//Updating needs authorisation
app.post('/api/post/:id', authenticate, function(req, res) {
  res.json({ success: true });
});

app.get('/api/getPosts', function(req, res) {
  res.json({ success: true });
});

app.listen(8081);
var jwt = require('express-jwt');
var Posts = require('./controllers/posts');
require('dotenv').config();

var authenticate = jwt({
  secret: new Buffer(process.env.AUTH0_SECRET, 'base64'),
  audience: process.env.AUTH0_CLIENT_ID
});

module.exports = function(app){
    app.get('/api/posts', Posts.recentPosts);

    app.get('/api/userPosts', authenticate, Posts.getUserPosts);
    app.post('/api/posts', authenticate, Posts.createPost);

    app.use(function (err, req, res, next) {
        if (err.name === 'UnauthorizedError') {
            res.status(401).json({error:"Unauthorized"});
        }
    });
}
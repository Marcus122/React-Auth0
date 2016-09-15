const Post = require('../models/post');

exports.getUserPosts = function(req,res,next){
    const id = req.user.sub;
    Post.find({user:id})
    .then(posts =>{
         res.json(posts);
    })
    .catch(err =>{
        return next(err);
    })
}

exports.createPost = function(req,res,next){
    const id = req.user.sub;
    const post = new Post({
        user:id,
        title:req.body.title,
        content:req.body.content
    })
    post.save()
    .then(() =>{
         res.json(post);
    })
    .catch(err =>{
        return next(err);
    })
}

exports.recentPosts = function(req,res,next){
    Post.find().sort({date: -1}).limit(12).exec()
    .then(posts =>{
         res.json(posts);
    })
    .catch(err =>{
        return next(err);
    })
}
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Define our model
const postSchema = new Schema({
    user:{type:String, index: true},
    title:{type:String},
    content:{type:String},
    date:{type:Date,default:Date.now}
});

//Create the model class
const ModelClass = mongoose.model('post',postSchema);

//Export the model
module.exports = ModelClass;
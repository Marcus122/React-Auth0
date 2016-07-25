var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var fields = {
	user: {type:String},
    title: {type:String},
	content: {type:String},
	active: { type: Boolean, default: false },
	created: { type: Date , default: Date.now }
};

var postSchema = new Schema(fields);
postSchema.index({ user:1 });

postSchema.statics.fineByUser = function(user,cb){
	postSchema.find({user:user},cb);
}
module.exports = mongoose.model('posts', postsSchema);
var mongoose = require('mongoose');
var User = require('./user')
var Schema = mongoose.Schema;

var postSchema = new Schema({
    postCreator : {type: Schema.Types.ObjectId, ref: 'User'},
    title: String,
    content: String,
    answers: Number,
    views: Number,
    date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Post', postSchema)
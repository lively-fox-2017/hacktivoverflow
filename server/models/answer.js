var mongoose = require('mongoose');
var User = require('./user')
var Post = require('./post')
var Schema = mongoose.Schema;

var answerSchema = new Schema({
    answerCreator : {type: Schema.Types.ObjectId, ref: 'User'},
    Post : {type: Schema.Types.ObjectId, ref: 'Post'},    
    content: String,
    votes: Number,
    date: { type: Date, default: Date.now() }
})

module.exports = mongoose.model('Answer', answerSchema)
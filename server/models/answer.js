const mongoose = require('mongoose');
mongoose.connection.openUri(`${process.env.APPDB}`,(err)=>{
  if (err) {
    console.log(err);
  }
});
var Schema = mongoose.Schema;


var AnswerSchema = new Schema({
    // questionId : { type:String },
    questionId : { type: Schema.Types.ObjectId, ref: 'Questions' },
    answer     : { type:String },
    date       : { type:Date, default:Date.now },
    userId     : { type: Schema.Types.ObjectId, ref: 'Users' },
    like       : [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    dislike    : [{ type: Schema.Types.ObjectId, ref: 'Users' }],
});

module.exports = mongoose.model('Answers', AnswerSchema);

const mongoose = require('mongoose');
mongoose.connection.openUri(`${process.env.APPDB}`,(err)=>{
  if (err) {
    console.log(err);
  }
});
var Schema = mongoose.Schema;


var QuestionSchema = new Schema({
    question  : { type:String },
    date      : { type:Date, default:Date.now },
    userId    : { type: Schema.Types.ObjectId, ref: 'Users' },
    answerId  : [{ type: Schema.Types.ObjectId, ref: 'Answers' }],
    like      : [{ type: Schema.Types.ObjectId, ref: 'Users' }],
    dislike   : [{ type: Schema.Types.ObjectId, ref: 'Users' }],
});

module.exports = mongoose.model('Questions', QuestionSchema);

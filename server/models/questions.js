const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connection.openUri('mongodb://localhost:3000/hacktivoverflow');
mongoose.Promise = global.Promise;

const questionSchema = new Schema({
  askBy: { type: Schema.Types.ObjectId, ref: 'User' },
  askAt: { type: Date, default: Date.now },
  title: String,
  content:String,
  answers:[{ type: Schema.Types.ObjectId, ref: 'Answer' }],
  voters:  [{
            voter:{ type: Schema.Types.ObjectId, ref: 'User' },
            votedAt: { type: Date, default: Date.now }
          }]
});


const Question = mongoose.model('Question', questionSchema);
module.exports = Question;

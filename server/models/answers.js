const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connection.openUri('mongodb://localhost:3000/hacktivoverflow');
mongoose.Promise = global.Promise;

const answerSchema = new Schema({
  answerBy:{ type: Schema.Types.ObjectId, ref: 'User' },
  answerAt: { type: Date, default: Date.now },
  answer: String,
  voters: [{
            voter:{ type: Schema.Types.ObjectId, ref: 'User' },
            votedAt: { type: Date, default: Date.now }
          }]
});


const Answer = mongoose.model('Answer', answerSchema);
module.exports = Answer;

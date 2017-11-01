require('dotenv').config();
const mongoose = require('mongoose');

mongoose.connection.openUri(process.env.MONGO_URI);

const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  content: {
    type: String,
    required: [true, 'Content is required']
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  by: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  question: {
    type: Schema.Types.ObjectId,
    ref: 'Question'
  },
  voter: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('Answer', AnswerSchema);

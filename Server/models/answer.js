const mongoose = require('mongoose')
const url = `mongodb://localhost/${process.env.NODE_ENV}`
mongoose.connection.openUri(url)

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Question"
  },
  answer: {
    type: String,
    required: true
  },
  voters: Array,
  createdAt: Date,
  updatedAt: Date
})

const answerModel = mongoose.model('Answer', schema)

module.exports = answerModel

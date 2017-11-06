const mongoose = require('mongoose')
const url = `mongodb://localhost/${process.env.NODE_ENV}`
// const url = 'mongodb://terrathe2:terrathe2@ds149495.mlab.com:49495/hacktivoverflow'
mongoose.connection.openUri(url)

const schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  title: {
    type: String,
    required: true
  },
  question: {
    type: String,
    required: true
  },
  voters: Array,
  createdAt: Date,
  updatedAt: Date
})

const questionModel = mongoose.model('Question', schema)

module.exports = questionModel

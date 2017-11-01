const mongoose = require('mongoose')
const url = `mongodb://localhost/${process.env.NODE_ENV}`
mongoose.connection.openUri(url)

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  secret: String,
})

const userModel = mongoose.model('User', schema)

module.exports = userModel

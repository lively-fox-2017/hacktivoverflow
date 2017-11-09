const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connection.openUri('mongodb://localhost/hacktivoverflow');
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  userid:{type: String, index: true, unique: true, required: true },
  // name :String,
  password:{type: String, unique: true, required: true },
  salt: String,
  // imgUrl:String
});


const User = mongoose.model('User', userSchema);

module.exports = User;

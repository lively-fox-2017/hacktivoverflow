const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.connection.openUri('mongodb://localhost/hacktivoverflow');
mongoose.Promise = global.Promise;

const userSchema = new Schema({
  userid:String,
  name :String,
  email:String,
  imgUrl:String

});


const User = mongoose.model('User', userSchema);

module.exports = User;

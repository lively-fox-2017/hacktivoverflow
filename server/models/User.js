require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connection.openUri(process.env.MONGO_URL);

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  bio: String,
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (str) {
        return /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(str);
      }
    },
    required: [true, 'Email is required']
  },
  password: {
    type: String,
    required: [true, 'Password is required']
  },
  fb_id: String
});

UserSchema.pre('save', function (next) {

  const saltRounds = 8;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;

  next();

});

module.exports = mongoose.model('User', UserSchema);

var FB = require('fb')
var idvalidator = require('mongoose-id-validator')
var encrypt = require('../helpers/cryptoHelper')
var mongoose = require('mongoose')
var jwt = require('jsonwebtoken')
var jwtDecoder = require('../helpers/jwtDecodeHelper')
var Schema = mongoose.Schema
var connectionUrl = 'mongodb://localhost/hacktivoverflow_dev'
mongoose.connect(connectionUrl, {
  useMongoClient: true
})
mongoose.Promise = global.Promise

var userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true
  }
})

userSchema.plugin(idvalidator)

var User = mongoose.model('User', userSchema)

class Model {
  static read() {
    return new Promise((resolve, reject) => {
      User.find({}).then((data) => {
        if (data.length)
          resolve({
            message: 'Data Found',
            data
          })
        else
          reject({
            message: 'Data Not Found'
          })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static readOne(id) {
    id = jwtDecoder(id)
    return new Promise((resolve, reject) => {
      User.findOne({
        "_id": id
      }).then((data) => {
        if (data)
          resolve({
            message: 'Data Found',
            data
          })
        else
          reject({
            message: 'Data Not Found'
          })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static create(insert) {
    return new Promise((resolve, reject) => {
      insert.password = encrypt(insert.password)
      User.create({
        username: insert.username,
        email: insert.email,
        password: insert.password
      }).then((data) => {
        resolve({
          message: 'Create Success',
          data
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static update(update) {
    update._id = jwtDecoder(update._id)
    return new Promise((resolve, reject) => {
      if (update.password) {
        update.password = encrypt(update.password)
      }
      User.findOneAndUpdate({
        "_id": update._id
      }, update, {
        new: true
      }).then((data) => {
        resolve({
          message: 'Update Success',
          data
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static delete(id) {
    return new Promise((resolve, reject) => {
      User.findOneAndRemove({
        "_id": id
      }).then((data) => {
        resolve({
          message: 'Delete Success',
          data
        })
      }).catch((err) => {
        reject(err)
      })
    })
  }
  static login(username, password) {
    return new Promise((resolve, reject) => {
      User.findOne({
        username: username
      }).then((data) => {
        password = encrypt(password)
        if (data.password === password) {
          var token = jwt.sign({
            username: data.username,
            email: data.email,
            _id: data._id
          }, process.env.JWT_KEY);
          resolve({
            message: 'Login Success',
            token
          })
        } else {
          reject({
            message: 'Login Gagal'
          })
        }
      }).catch((err) => {
        reject({
          message: 'Login Gagal',
          err
        })
      })
    })
  }
  static loginFb(fb_id, accessToken) {
    return new Promise((resolve, reject) => {
      FB.options({
        accessToken: accessToken,
        appId: 507229999655345,
        appSecret: 'dafb592c0501e8bb92072d1e0c700607'
      });
      FB.api('/me?fields=name,email', function(res) {
        if (res && res.error) {
          if (res.error.code === 'ETIMEDOUT') {
            console.log('request timeout facebook')
            reject({message:'request timeout'});
          } else {
            console.log('error facebook', res.error)
            reject({message:'Failed to auth with facebook', err:res.error});
          }
        } else {
          if (fb_id != res.id) {
            reject({
              message: 'Access Token not Valid'
            })
          } else {
            User.findOne({
              email: res.email
            }).then((data) => {
              if (data) {
                var token = jwt.sign({
                  username: data.username,
                  email: data.email,
                  _id: data._id
                }, process.env.JWT_KEY);
                resolve({
                  message: 'Login Success FB',
                  token
                })
              } else {
                var insert = {
                  email: res.email,
                  username: res.id,
                  password: '1',
                }
                Model.create(insert).then((data) => {
                  var token = jwt.sign({
                    username: data.username,
                    email: data.email,
                    _id: data._id
                  }, process.env.JWT_KEY);
                  resolve({
                    message: 'Login Success FB',
                    token
                  })
                }).catch((err) => {
                  reject({message: 'Gagal Register FB Account', err})
                })
              }
            }).catch((err) => {
              console.log(err)
              reject({message:'Gagal Login', err})
            })
          }
        }
      })
    })
  }
}

module.exports = Model;

let user = require('../models/user-model')
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
require('dotenv').config()

const FB = require('fb');
fb = new FB.Facebook();

const loginfb = (req,res) => {
  const fbToken = req.body.fbtoken
  console.log('ini balikannya', fbToken)
  FB.api('me', { fields: ['id', 'name', 'email', 'picture.type(large)'], access_token: fbToken }, function (response) {
    let data = response.name
    user.findOne({
      username:data
    })
    .then(data => {
      if (data==null) {
        console.log('belum ada data');
          user.create({
            username:response.name,
            password:'PassDefault',
            email:'Non Email'
          })
          .then((user)=>{
              var token = jwt.sign({
                _id:data._id,
                username: data.username,
                email: data.email
              },process.env.DB_HOST);
              res.send(token)
            })
            .catch((err)=>{
            console.log(err)
          })
        // var tokensementara = jwt.sign({
        //   id:response.id,
        //   username: response.name
        // },process.env.DB_HOST);
        // res.send(tokensementara)
      } else {
        var token = jwt.sign({
          _id:data.id,
          username: data.username
        },process.env.DB_HOST);
        res.send(token)
      }

    })
  })
}

module.exports = {
  loginfb
}

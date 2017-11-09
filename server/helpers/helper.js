//
let question = require('../models/question-model')
var mongoose = require('mongoose');
//
const jwt = require('jsonwebtoken');
require('dotenv').config()
var auth = (req,res,next) => {
  jwt.verify(req.headers.token, process.env.DB_HOST,(err,decoded)=>{
    if (!err) {
      req.username = decoded.username
      console.log(decoded.username);
      console.log(req.username);
      next()
    }
    else {
      res.send(err)
    }
  })
}

var authEdited = (req,res,next) => {
  jwt.verify(req.headers.token, process.env.DB_HOST,(err,decoded)=>{
    question.findById({
      _id:req.params.id
    }).populate('idgrup','nama').populate('iduser','username').then((data)=>{
      if (decoded.username == data.iduser[0].username) {
        next()
      }
      else {
        res.send('ga bisa')
      }
    })
  })
}

module.exports = {
  auth,
  authEdited
};

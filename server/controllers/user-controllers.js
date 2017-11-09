let user = require('../models/user-model')
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
require('dotenv').config()
//---------------------------------------------------- createUser(v)
const addUser = (req,res) => {
  let hash = bcrypt.hashSync(req.body.password, salt);
  user.create({
    username:req.body.username,
    password:hash,
    email:req.body.email
  }).then((user)=>{
    res.send(user)
  }).catch((err)=>{
    res.send(err)
  })
}
//-------------------------------------------------------- getUser(v)
const getUser = (req,res) => {
  user.find().then((user)=>{
    res.send(user)
  }).catch((err)=>{
    res.send(err)
  })
}
//----------------------------------------------------- fine data(v)
const findUser = (req,res) => {
  let filter = jwt.verify(req.headers.token, process.env.DB_HOST,(err,decoded)=>{
    return decoded._id
    console.log(decoded._id);
  })
  user.findById({
    _id:filter
  }).then((user)=>{
    console.log(user);
    res.send(user)
  }).catch((err)=>{
    res.send(err)
  })
}
// const findUser = (req,res) => {
//   user.findById({
//     _id:req.params.id
//   }).then((user)=>{
//     res.send(user)
//   }).catch((err)=>{
//     res.send(err)
//   })
// }
//----------------------------------------------------- edit data(v)
const editUser = (req,res) => {
  let hash = bcrypt.hashSync(req.body.password, salt);
  user.update({
    _id:req.params.id
  },{
    username:req.body.username,
    password:hash,
    email:req.body.email
  }).then((user)=>{
    res.send(user)
  }).catch((err)=>{
    res.send(err)
  })
}
//----------------------------------------------------- delete data(v)
const deleteUser = (req,res) => {
  user.remove({
    _id:req.params.id
  }).then((user)=>{
    res.send(user)
  }).catch((err)=>{
    res.send(err)
  })
}
//----------------------------------------------------- login data(v)
const loginUser = (req,res) => {
  // console.log('ini bodynya', req.body)
  user.findOne({
    username:req.body.username
  })
  .then(data => {
    if (bcrypt.compareSync(req.body.password,data.password)) {
      var token = jwt.sign({
        _id:data._id,
        username: data.username,
        email: data.email
      },process.env.DB_HOST);
      res.send(token)
    } else {
      res.send('Fail')
    }
  })
  .catch((err)=>{
    res.send('Fail')
  })
}
//-------------------------------------------------- modle Export(v)
module.exports = {
  getUser,
  addUser,
  findUser,
  editUser,
  deleteUser,
  loginUser
}

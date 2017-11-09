let question = require('../models/question-model')
var mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
require('dotenv').config()
//--------------------------------------------------create question(v)
const addQuestion = (req,res) => {
  let idusertoken = jwt.verify(req.headers.token,process.env.DB_HOST,(err,decoded)=>{
    return decoded._id
    console.log(decoded._id);
  })
  //ceritanya untuk menarik langsung iduser...
  question.create({
    judul:req.body.judul,
    pertanyaan:req.body.pertanyaan,
    idgrup:req.body.idgrup,
    iduser:idusertoken
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//-----------------------------------------get question(v)
const getQuestion = (req,res) => {
  question.find().populate('idgrup','nama').populate('iduser','username').populate('vote','username').then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//---------------------------------get personal question(v)
const getPersonalQuestion = (req,res) => {
  console.log(req.headers);
  let filter = jwt.verify(req.headers.token, process.env.DB_HOST,(err,decoded)=>{
    return decoded._id
    console.log(decoded._id);
  })
  question.find({iduser:filter}).populate('idgrup','nama').populate('iduser','username').populate('vote','username').then((data)=>{
    res.send(data)
    console.log(filter);
  }).catch((err)=>{
    res.send(err)
  })
}
//------------------------------------get data question(v)
const findQuestion = (req,res) => {
  console.log(req)
  question.findById({
    _id:req.params.id
  }).populate('idgrup','nama').populate('iduser','username').populate('vote','username').then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//-------------------------------------- edit question(v)
const editQuestion = (req,res) => {
  // let idusertoken = jwt.verify(req.headers.token,process.env.DB_HOST,(err,decoded)=>{ return decoded._id})
  console.log(req.body);
  question.update({
    _id:req.params.id
  },{
    judul:req.body.judul,
    pertanyaan:req.body.pertanyaan,
    idgrup:req.body.idgrup,
    // iduser:idusertoken,
    iduser:req.body.iduser,
    vote:req.body.vote
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//--------------------------------------delet question(v)
const deleteQuestion = (req,res) => {
  console.log(req.params);
  question.remove({
    _id:req.params.id
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//------------------------------------------------------
module.exports = {
  addQuestion,
  getQuestion,
  findQuestion,
  editQuestion,
  deleteQuestion,
  getPersonalQuestion
}

let answer = require('../models/answer-model')
var mongoose = require('mongoose');
//--------------------------------------------------create question(v)
const addAnswer = (req,res) => {
  // console.log(req.body)
  answer.create({
    jawaban:req.body.jawaban,
    iduser:req.body.iduser,
    idquestion:req.body.idquestion,
    vote:req.body.vote
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//-------------------------------get Answer per Question(v)
const getAnswer = (req,res) => {
  // console.log('ini paramsnya', req.params)
  answer.find({idquestion:req.params.id}).populate('iduser','username').populate('idquestion','judul').populate('vote','username').then((data)=>{
    // console.log(data);
    res.send(data)
  }).catch((err)=>{
    console.log(err);
    res.send(err)
  })
}
//------------------------------------------get Answer(v)
const getAnswerAll = (req,res) => {
  answer.find().populate('iduser','username').populate('idquestion','judul').populate('vote','username').then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//------------------------------------get data question(v)
const findAnswer = (req,res) => {
  answer.findById({
    _id:req.params.id
  }).populate('iduser','username').populate('idquestion','judul').then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//-------------------------------------- edit question(v)
const editAnswer = (req,res) => {
  console.log(req.body)
  answer.update({
    _id:req.params.id
  },{
    jawaban:req.body.jawaban,
    iduser:req.body.iduser,
    idquestion:req.body.idquestion,
    vote:req.body.vote
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//--------------------------------------delet question(v)
const deleteAnswer = (req,res) => {
  answer.remove({
    _id:req.params.id
  }).then((data)=>{
    res.send(data)
  }).catch((err)=>{
    res.send(err)
  })
}
//------------------------------------------------------
module.exports = {
  addAnswer,
  getAnswer,
  findAnswer,
  editAnswer,
  deleteAnswer,
  getAnswerAll
}

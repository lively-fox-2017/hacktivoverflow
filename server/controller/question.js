const question = require('../models/question');
const token = require('../helper/jwt');

class Question {
  static findAll(req,res,next){
    console.log('here');
    question.find({
    })
    .populate('userId')
    .populate('answerId')
    .populate('like')
    .populate('dislike')
    .sort({date: -1})
    .then(rows=>{
      res.status(200).json({
        "message":"data founded",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static create(req,res,next){
    question.create({
      question:req.body.question,
      userId:req.body.userId,
    })
    .then(rows=>{
      res.status(200).json({
        "message":"data created",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static findById(req,res,next){
    console.log('asdfasd ds=======f',req.params);
    question.findById(req.params.id)
    .populate('userId')
    .populate('answerId')
    .populate('like')
    .populate('dislike')
    .sort({date: -1})
    .then(rows=>{
      res.status(200).json({
        "message":"data founded",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static findByUserId(req,res,next){
    // console.log('asdfasd dsf',req.params.token);
    question.find({
      userId:token.verify(req.params.token).userId
    })
    .populate('userId')
    .populate('answerId')
    .populate('like')
    .populate('dislike')
    .sort({date: -1})
    .then(rows=>{
      res.status(200).json({
        "message":"data founded",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static update(req,res,next){
    question.findOneAndUpdate({
      _id:req.params.id
    },{
      question:req.body.question
    })
    .then(rows=>{
      res.status(200).json({
        "message":"data updated",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static delete(req,res,next){
    // console.log('masuk sini',(req.body.token));
    question.findOneAndRemove({
      _id:req.params.id,
      userId:token.verify(req.body.token).userId,
    })
    .then(rows=>{
      // console.log('masukk setelah remove');
      res.status(200).json({
        "message":"deleteting data succesfull",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static like(req,res,next){
    question.findByIdAndUpdate(req.params.id,
      {$push:{"like": req.body._id}},
      {safe: true, upsert: true}
    )
    .then(rows=>{
      res.status(200).json({
        "message":"data updated",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static unlike(req,res,next){
    question.findByIdAndUpdate(req.params.id,
      {$pull:{"like": req.body._id}},
      {safe: true, upsert: true}
    )
    .then(rows=>{
      res.status(200).json({
        "message":"data updated",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static dislike(req,res,next){
    question.findByIdAndUpdate(req.params.id,
      {$push:{"dislike": req.body._id}},
      {safe: true, upsert: true}
    )
    .then(rows=>{
      res.status(200).json({
        "message":"data updated",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static undislike(req,res,next){
    question.findByIdAndUpdate(req.params.id,
      {$pull:{"dislike": req.body._id}},
      {safe: true, upsert: true}
    )
    .then(rows=>{
      res.status(200).json({
        "message":"data updated",
        "data":rows
      });
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
}

module.exports = Question

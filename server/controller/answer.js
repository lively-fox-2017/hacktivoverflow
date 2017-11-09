const answer = require('../models/answer');
const question = require('../models/question')
const token = require('../helper/jwt');

class Answer {
  static findAll(req,res,next){
    // console.log('here');
    answer.find({
    })
    .populate('questionId')
    .populate('userId')
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
    answer.create({
      questionId:req.body.questionId,
      answer:req.body.answer,
      userId:token.verify(req.body.token).userId,
    })
    .then(rowsAnswer=>{
      // console.log(rowsAnswer);
      question.findByIdAndUpdate(req.body.questionId,
        {$push:{"answerId": rowsAnswer._id}},
        {safe: true, upsert: true}
      )
      .then(rowsQuestions=>{
        res.status(200).json({
          "message":"data created",
          "data":rowsAnswer
        });
      })
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static findByQuestionId(req,res,next){
    // console.log('by questionId',req.params.id);
    answer.find({
      questionId:req.params.id
    })
    .populate('questionId')
    .populate('userId')
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
    answer.find({
      userId:token.verify(req.params.token).userId
    })
    .populate('questionId')
    .populate('userId')
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
    answer.findOneAndUpdate({
      _id:req.params.id
    },{
      answer:req.body.answer,
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
    answer.findOneAndRemove({
      _id:req.params.id,
      userId:token.verify(req.body.token).userId,
    })
    .then(rowsAnswer=>{
      question.findByIdAndUpdate(rowsAnswer.questionId,
        {$pull:{"like": token.verify(req.body.token).userId}},
        {safe: true, upsert: true}
      )
      .then(rowsQuestions=>{
        res.status(200).json({
          "message":"deleteting data succesfull",
          "data":rowsAnswer
        });
      })
    })
    .catch(err=>{
      res.status(400).json(err)
    })
  }
  static like(req,res,next){
    // let userId=token.verify(req.body.token).userId

    answer.findByIdAndUpdate(req.params.id,
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
    // let userId=token.verify(req.body.token).userId

    answer.findByIdAndUpdate(req.params.id,
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
    // let userId=token.verify(req.body.token).userId

    answer.findByIdAndUpdate(req.params.id,
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
    // let userId=token.verify(req.body.token).userId

    answer.findByIdAndUpdate(req.params.id,
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

module.exports = Answer

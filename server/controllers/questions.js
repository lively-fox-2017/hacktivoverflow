var Question = require('../models/questions');
var Answer = require('../models/answers');
var User= require('../models/users');
const mongoose = require('mongoose');
var jwt = require('jsonwebtoken');



class QuestionController{
  static getAll(req,res){
    Question.find({})
    .populate('askBy').populate({path: 'answers' , populate: { path :'answerBy' }})
    .then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static getDetail(req,res){
    Question.find({_id: req.params.questionid})
    .populate('askBy').populate({path: 'answers' , populate: { path :'answerBy' }})
    .then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static getID(req,res){
    User.findOne({userid:req.params.id}).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }


  static addNew(req,res){
    const decoded = jwt.verify(req.headers.tokenjwt,process.env.SECRET)
    let insert={
      askBy:decoded.userid,
      title:req.body.title,
      content:req.body.content
    }
    Question.create(insert)
    .then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)
    })

  }


  static addAnswer(req,res){
    const decoded = jwt.verify(req.headers.tokenjwt,process.env.SECRET)
    let answer={
      _id:new mongoose.Types.ObjectId,
      answerBy: decoded.userid,
      answer: req.body.answer
    }

    Promise.all([
      Answer.create(answer),
      Question.findByIdAndUpdate(req.params.id,
        {$push:{'answers':answer._id}},{safe: true, upsert: true})
    ]).then(result=>{
      res.status(200).json(answer)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static addVote(req,res){
    const decoded = jwt.verify(req.headers.tokenjwt,process.env.SECRET)
    let vote={
      voter: decoded.userid,
    }
    Question.findByIdAndUpdate(req.params.id,
      {$push:{'voters': vote }},{safe: true, upsert: true}
    ).then(result=>{
      res.status(200).json(vote)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static downVote(req,res){
    const decoded = jwt.verify(req.headers.tokenjwt,process.env.SECRET)

    Question.findByIdAndUpdate(req.params.id,
      {$pull:{'voters': {'voter':decoded.userid} }},{safe: true, multi: true}
    ).then(result=>{
      res.status(200).json(vote)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static addVoteAnswer(req,res){
    const decoded = jwt.verify(req.headers.tokenjwt,process.env.SECRET)
    let vote={
      voter: decoded.userid,
    }
    Answer.findByIdAndUpdate(req.params.id,
      {$push:{'voters': vote }},{safe: true, upsert: true}
    ).then(result=>{
      res.status(200).json(vote)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static downVoteAnswer(req,res){
    const decoded = jwt.verify(req.headers.tokenjwt,process.env.SECRET)

    Answer.findByIdAndUpdate(req.params.id,
      {$pull:{'voters': {'voter':decoded.userid} }},{safe: true, multi: true}
    ).then(result=>{
      res.status(200).json(vote)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }

  static editData(req,res){
    let condition={
      userid : req.params.id
    }
    let newData={
        $set:{
          name :req.body.name,
          email:req.body.email,
          imgUrl:req.body.imgUrl
        }
      }
      User.update(condition,newData).then(result=>{
        if(result.n==1){
          User.findOne({userid:req.params.id}).then(result=>{
            res.status(200).json(result)
          }).catch(err=>{
            res.status(500).json(err)
          })
        }else{
          res.status(500).json('data not found')
        }
      }).catch(err=>{
        res.status(500).json(err)
      })
      }

  static deleteData(req,res){
    let condition={
      userid : req.params.id
    }
    User.findOneAndRemove(condition).then(result=>{
      res.status(200).json(result)
    }).catch(err=>{
      res.status(500).json(err)

    })
    }
}

module.exports = QuestionController;

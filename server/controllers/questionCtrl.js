const Question = require('../models/question')
class QuestionCtrl {
  static read (req, res, next) {
    Question.read().then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static readOne (req, res, next) {
    Question.readOne(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static upVote (req, res, next) {
    Question.upVote(req.params.id, req.body.user).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      console.log(err)
      res.status(500).send(err)
    })
  }
  static downVote (req, res, next) {
    Question.downVote(req.params.id, req.body.user).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static create (req, res, next) {
    Question.create(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
  static update (req, res, next) {
    req.body._id = req.params.id
    Question.update(req.body).then((data) => {
      res.status(200).send(data)
    }).catch((err) =>{
      res.status(500).send(err)
    })
  }
  static delete (req, res, next) {
    Question.delete(req.params.id).then((data) => {
      res.status(200).send(data)
    }).catch((err) => {
      res.status(500).send(err)
    })
  }
}

module.exports = QuestionCtrl;
